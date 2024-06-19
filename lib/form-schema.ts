import * as z from "zod";

const formSchema = z.object({
  name: z.string().min(3, { message: "Server name is required" }),
  imageUrl: z.string().min(3, { message: "Server image is required" }),
});

export { formSchema };
