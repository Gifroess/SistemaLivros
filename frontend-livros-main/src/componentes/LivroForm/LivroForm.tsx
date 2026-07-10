"use client";

import '@/componentes/LivroForm/LivroForm.css'
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {BuscaLivro} from "../BuscaLivro/BuscaLivro"
import { Livro, LivroGoogle, StatusLivro } from "@/tipos/livro";
import {createLivro, updateLivro} from "@/services/livro.services"

interface Props {
  livro?: Livro;
}

export default function LivroForm({ livro }: Props) {
  const router = useRouter();

    const [titulo, setTitulo] = useState(
    livro?.titulo ?? ""
    );

    const [autor, setAutor] = useState(
    livro?.autor ?? ""
    );

    const [status, setStatus] = useState<StatusLivro>(
    livro?.status ?? "QUERO_LER"
    );

    const [review, setReview] = useState(
    livro?.review ?? ""
    );

    const [imagem, setImagem] = useState(
    livro?.imagem ?? ""
    );

    const [nota, setNota] = useState(
    livro?.nota ?? 0
    );

    //  const livros = await buscarLivrosGoogle(busca);

    //  setResultados(livros);
   
    async function handleSubmit( e: React.SyntheticEvent) {
        e.preventDefault();

        const payload = {
            titulo,
            autor,
            imagem,
            status,
            review,
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

    function selecionarLivro(livro: LivroGoogle){

        setTitulo(livro.titulo);

        setAutor(livro.autor);

        setImagem(livro.imagem ?? "");
    }

    return (
        <form onSubmit={handleSubmit} className="livro-form">
        <h1>
        {livro
            ? "Editar Livro"
            : "Novo Livro"}
        </h1>
        {!livro && (
            <BuscaLivro
                onSelect={selecionarLivro}
            />
        )}

        {titulo && (

        <div className="livro-selecionado">

            <h3>Livro selecionado</h3>

            {imagem ? (

                <Image
                    src={imagem}
                    alt={titulo}
                    width={120}
                    height={180}
                />

            ) : (

                <div className="sem-imagem">

                    Sem capa

                </div>

            )}

            <h2>{titulo}</h2>

            <p>{autor}</p>

        </div>

        )}
        <div className="form-input">

        <label>Status</label>

        <select

        value={status}

        onChange={(e)=> setStatus(e.target.value as StatusLivro)}

        >

        <option value="QUERO_LER"> Quero ler </option>

        <option value="LENDO"> Lendo </option>

        <option value="LIDO"> Lido </option>

        </select>

        </div>

        <div className="form-input">

        <label>Nota</label>

        <input type="number" min={0} max={5} step={0.5} value={nota} onChange={(e)=>setNota(Number(e.target.value))}/>

        </div>

        <div className="form-input">

        <label>Review</label>

        <textarea rows={5} value={review} onChange={(e)=> setReview(e.target.value)}/>

        </div>

        <button type="submit" disabled={!titulo}>
            {livro ? "Atualizar Livro": "Salvar livro"}
        </button>
        </form>
    );
}