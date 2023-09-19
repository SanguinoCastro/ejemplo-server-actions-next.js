'use server';

import { prisma } from '@/libs/prismadb';
import { revalidatePath } from 'next/cache';

import { ZodError } from 'zod';
import { TodoZodSchema } from '../schema/todo.zod.schema';

import { auth } from '@clerk/nextjs';

interface TodoResponse {
  success: boolean;
  message: string;
}

export const createTodo = async (title: string): Promise<TodoResponse> => {
  const { userId }: { userId: string | null } = auth();

  if (!userId) {
    return {
      success: false,
      message: 'Usuario no encontrado (backend)',
    };
  }

  try {
    TodoZodSchema.parse({ title });

    await prisma.todo.create({
      data: {
        title,
        userId,
      },
    });
    revalidatePath('/todo');
    return {
      success: true,
      message: 'Tarea creada exitosamente (backend)',
    };
  } catch (error) {
    if (error instanceof ZodError) {
      return {
        success: false,
        message: error.issues[0].message,
      };
    }

    return {
      success: false,
      message: 'Error al crear la tarea (backend)',
    };
  }
};

export const removeTodo = async (id: string) => {
  if (!id || !id.trim()) {
    return {
      error: 'La Id es requerida (backend)',
    };
  }

  try {
    await prisma.todo.delete({
      where: {
        id,
      },
    });
    revalidatePath('/todo');
    return {
      success: true,
    };
  } catch (error) {
    return {
      error: 'Error al tratar de eliminar la tarea (Backend)',
    };
  }
};
