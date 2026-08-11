const { default: z } = require("zod");

const registerSchema = z.object({
  name: z.string().trim().min(2).max(50),
  email: z.email().string().trim().min(5).max(255).toLowerCase(),
  password:z.string().min(6)
});

export { registerSchema };
