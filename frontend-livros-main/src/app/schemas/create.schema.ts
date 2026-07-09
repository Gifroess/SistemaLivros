import {z} from "zod"

export const createSchema = z.object({
    email: z.email("Email inválido"),
    senha: z.string().min(6,"Senha precisa no mínimo 6 caracteres"),
    confirmacaoSenha: z.string()
}).refine((d) => d.senha === d.confirmacaoSenha , {
    message: "As senhas não coincide",
    path: [
        "confirmacaoSenha",
    ],
});
