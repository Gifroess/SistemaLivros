"use client";

import '@/componentes/FilmeForm/FilmeForm.css'
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Livro } from "@/tipos/livro";
import {
  createLivro,
  updateLivro,
} from "@/services/livro.services"

interface Props {
  livro?: Livro;
}

export default function LivroForm({ livro }: Props) {
  const router = useRouter();

    const [titulo, setTitulo] = useState(
    livro?.titulo ?? ""
    );

    const [imagem, setImagem] = useState(
    livro?.imagem ?? ""
    );

    const [nota, setNota] = useState(
    livro?.nota ?? 0
    );
   
    async function handleSubmit( e: React.SyntheticEvent) {
        e.preventDefault();

        const payload = {
            titulo,
            imagem,
            nota,
        };

        if (livro) {
            await updateLivro( livro.id, payload);
        } else {
            await createLivro(payload);
        }

        router.push("/");
        router.refresh();
    }

    return (
        <form onSubmit={handleSubmit} className="livro-form">
        <h1>
        {livro
            ? "Editar Livro"
            : "Novo Livro"}
        </h1>
        <div className="form-input">
            <input
                value={titulo}
                onChange={(e) =>
                setTitulo(e.target.value)
            }
            placeholder="Título"
        />
        </div>
        <div className="form-input">
            <input
                value={imagem}
                onChange={(e) =>
                setImagem(e.target.value)
                }
            placeholder="URL Imagem"
        />
        </div>
        <div className="form-input">
            <input
                type="number"
                defaultValue={nota}
                onChange={(e) =>
                setNota(Number(e.target.value))
                }
            />
        </div>
        <button type="submit">
            Salvar
        </button>
        </form>
    );
}