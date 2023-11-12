import { z } from "zod";

const User = z.object({
	username: z.string(),
	password: z.string(),
	plotsRenting: z.string().array().optional()
})

type User = z.infer<typeof User>;

export { User };
