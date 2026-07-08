"use client";

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

  const livrosMap = livros.map((f) => {
    return <LivroCard 
        key={f.id}
        livro={f}
        onDelete={handleDelete}
    />
  }); 

  return (
    <div className="grid">
      {livrosMap}
    </div>
  );
}