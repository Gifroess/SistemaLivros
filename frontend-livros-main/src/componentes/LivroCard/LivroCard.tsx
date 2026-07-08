"use client";

import Link from "next/link";
import { Livro } from "@/tipos/livro"
import '@/componentes/LivroCard/LivroCard.css";
import Image from "next/image";

interface LivroCardProps {
  livro: Livro;
  onDelete: (id: number) => void;
}

export default function LivroCard({ livro, onDelete}: LivroCardProps) {
  return (
    <div className="card">

      <Image
        src={livro.imagem}
        alt={livro.titulo} 
        width={300}
        height={450}
        className="card-img"
      />

      <h2>{livro.titulo}</h2>

      <p>⭐ {livro.nota}</p>

      <div className="btn-acoes">
        <Link href={`/livros/${livro.id}/editar`}>
          Editar
        </Link>

        <button onClick={() => onDelete?.(livro.id)}>
          Excluir
        </button>
      </div>
    </div>
  );
}