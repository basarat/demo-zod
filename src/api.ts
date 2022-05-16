import { Router } from 'express';
import { z } from 'zod';
export const api = Router();

const payloadSchema = z.object({
  message: z.string()
}).strict();

type Payload = z.infer<typeof payloadSchema>;

let payload: Payload = {
  "message": "Like && Subscribe"
};

api.get('/', (_req, res) => {
  res.send(payload);
});

api.post('/', (req, res) => {
  const parsed = payloadSchema.safeParse(req.body);

  if (!parsed.success) {
    res.status(400).send({
      error: parsed.error
    });
    return;
  }

  payload.message = parsed.data.message;

  res.send(payload);
});