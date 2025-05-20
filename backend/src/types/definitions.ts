import { z } from "zod"

export const definitionSchema = z.object({
    word: z.string(),
    definition: z.string(),
    sentence: z.string(),
})

export type Definition = z.infer<typeof definitionSchema>
