"use client";

import { useRef } from "react";
import { useRouter } from "next/navigation";
import { Livro } from "@/tipos/livro";

import { deleteLivro } from "@/services/livro.services";
import LivroCard from "../LivroCard/LivroCard";
import '@/componentes/LivrosGrid/LivroGrid.css'

interface Props {
  livros: Livro[];
}

export default function LivroGrid({ livros }: Props) {

  const router = useRouter();

  async function handleDelete (id: number) {
    await deleteLivro(id);
    router.refresh();
  }
    
  const queroLer = livros.filter(
    (livro) => livro.status === "QUERO_LER"
  );

  const lendo = livros.filter(
    (livro) => livro.status === "LENDO"
  );

  const lidos = livros.filter(
    (livro) => livro.status === "LIDO"
  );

  function Categoria({
    titulo,
    livrosStatus,
  }: {
    titulo: string;
    livrosStatus: Livro[];
  }) {
    const scrollRef = useRef<HTMLDivElement>(null);

    const moverEsquerda = () => {
      scrollRef.current?.scrollBy({
        left: -700,
        behavior: "smooth",
      });
    };

    const moverDireita = () => {
      scrollRef.current?.scrollBy({
        left: 700,
        behavior: "smooth",
      });
    };

    if (livrosStatus.length === 0) return null;

    return (
      <section className="categoria">

        <h2>{titulo}</h2>

        <div className="carrossel-container">

          <button
            className="seta seta-esquerda"
            onClick={moverEsquerda}
          >
            ❮
          </button>

          <div
            className="scroll-livros"
            ref={scrollRef}
          >
            {livrosStatus.map((livro) => (
              <LivroCard
                key={livro.id}
                livro={livro}
                onDelete={handleDelete}
              />
            ))}
          </div>

          <button
            className="seta seta-direita"
            onClick={moverDireita}
          >
            ❯
          </button>

        </div>

      </section>
    );
  }

  return (
    <div className="biblioteca">

      <Categoria
        titulo="📚 Quero Ler"
        livrosStatus={queroLer}
      />

      <Categoria
        titulo="📖 Estou Lendo"
        livrosStatus={lendo}
      />

      <Categoria
        titulo="✅ Lidos"
        livrosStatus={lidos}
      />

    </div>
  );
}
