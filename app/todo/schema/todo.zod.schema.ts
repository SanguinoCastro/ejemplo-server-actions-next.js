import { z } from 'zod';

export const TodoZodSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, {
      message: 'El título debe tener mínimo un carácter',
    })
    .max(100, {
      message: 'El título sólo puede tener un máximo de 100 cáracteres',
    })
    .nonempty({
      message: 'El título es requerido',
    }),
});
