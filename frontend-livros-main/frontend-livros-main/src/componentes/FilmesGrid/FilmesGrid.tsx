"use client";

import { useRouter } from "next/navigation";
import { Filme } from "@/tipos/filme";

import { deleteFilme } from "@/services/filme.services";
import FilmeCard from "../FilmeCard/FilmeCard";
import '@/componentes/FilmesGrid/FilmeGrid.css'

interface Props {
  filmes: Filme[];
}

export default function FilmeGrid({ filmes }: Props) {

  const router = useRouter();

  async function handleDelete (id: number) {
    await deleteFilme(id);
    router.refresh();
  }

  const filmesMap = filmes.map((f) => {
    return <FilmeCard 
        key={f.id}
        filme={f}
        onDelete={handleDelete}
    />
  }); 

  return (
    <div className="grid">
      {filmesMap}
    </div>
  );
}