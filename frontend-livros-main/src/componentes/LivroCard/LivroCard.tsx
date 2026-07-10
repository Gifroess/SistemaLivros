"use client";

import Link from "next/link";
import Image from "next/image";

import { Livro } from "@/tipos/livro";

import "@/componentes/LivroCard/LivroCard.css";

interface LivroCardProps {
  livro: Livro;
  onDelete: (id: number) => void;
}

export default function LivroCard({
  livro,
  onDelete,
}: LivroCardProps) {
  return (
    <div className="card">
      {livro.imagem ? (
        <Image
          src={livro.imagem}
          alt={`Capa do livro ${livro.titulo}`}
          width={180}
          height={250}
          className="card-img"
        />
      ) : (
        <div className="sem-imagem">
          Sem capa
        </div>
      )}

      <div className="card-info">
        <h2>{livro.titulo}</h2>

        <p className="review">
          {livro.review || "Sem review"}
        </p>

        <p className="nota">
          ⭐ {livro.nota ?? 0}
        </p>

        <div className="btn-acoes">
          <Link href={`/livros/${livro.id}/editar`}>
            Editar
          </Link>

          <button
            type="button"
            onClick={() => onDelete(livro.id)}
          >
            Excluir
          </button>
        </div>
      </div>
    </div>
  );
}