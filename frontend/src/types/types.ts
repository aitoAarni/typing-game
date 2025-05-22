import { z } from "zod";
import { WordDefinitionSchema } from "./TypeGuards";

export type WordDefinition = z.infer<typeof WordDefinitionSchema>

export type User = {
    id: string
    username: string
    emai: string

}