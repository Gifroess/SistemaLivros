"use client";

import { createSchema } from "@/app/schemas/create.schema";
import { create } from "@/services/auth.services";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";
import '@/componentes/LoginForm/LoginForm.css';
import Image from "next/image";

export default function CreateForm()
{

    const router = useRouter();

    const [email, setEmail] =  useState("");
    const [senha, setSenha] =  useState("");
    const [confirmacaoSenha, setConfirmacaoSenha] = useState("");

    async function handleSubmit(e : React.SyntheticEvent)
    {
        
        e.preventDefault();
        
        const result = createSchema.safeParse({
            email,
            senha,
            confirmacaoSenha,
        });

        if (!result.success) {
            toast.error(
                result.error.issues[0].message
            );

            return;
        }
        try {
            await create({email,senha, confirmacaoSenha: confirmacaoSenha});
            toast.success("Usuário criado com sucesso");
            router.push('/login');  
        } catch (error) {
            toast.error("Erro ao criar usuário");
        }
    }

    return(

        <form method="POST" onSubmit={handleSubmit} className="login-form">
            <h2>Criar Conta</h2>
            <div className="div-input">
                <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                aria-label="Email"
                />
            </div>
            <div className="div-input">
                <input 
                type="password" 
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                placeholder="Senha"
                aria-label="Senha"
                />
            </div>
            <div className="div-input">
                <input type="password"
                    value={confirmacaoSenha}
                    onChange={(e) => setConfirmacaoSenha(e.target.value)}
                    placeholder="Confirmar Senha"
                    aria-label="Confirmar Senha" 
                />
            </div>

            <button type="submit">Criar Conta</button>
        </form>
    )


}
