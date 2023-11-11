import { z } from "zod";

const User = z.object({
	username: z.string(),
	password: z.string()
})

type User = z.infer<typeof User>;

export { User };
