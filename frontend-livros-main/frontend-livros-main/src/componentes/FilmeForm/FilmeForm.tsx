"use client";

import '@/componentes/FilmeForm/FilmeForm.css'
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Filme } from "@/tipos/filme";
import {
  createFilmes,
  updateFilme,
} from "@/services/filme.services"

interface Props {
  filme?: Filme;
}

export default function FilmeForm({ filme }: Props) {
  const router = useRouter();

    const [titulo, setTitulo] = useState(
    filme?.titulo ?? ""
    );

    const [imagem, setImagem] = useState(
    filme?.imagem ?? ""
    );

    const [nota, setNota] = useState(
    filme?.nota ?? 0
    );
   
    async function handleSubmit( e: React.SyntheticEvent) {
        e.preventDefault();

        const payload = {
            titulo,
            imagem,
            nota,
        };

        if (filme) {
            await updateFilme( filme.id, payload);
        } else {
            await createFilmes(payload);
        }

        router.push("/");
        router.refresh();
    }

    return (
        <form onSubmit={handleSubmit} className="filme-form">
        <h1>
        {filme
            ? "Editar Filme"
            : "Novo Filme"}
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