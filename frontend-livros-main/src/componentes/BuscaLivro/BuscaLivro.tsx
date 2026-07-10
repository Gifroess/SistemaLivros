"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

import { LivroGoogle } from "@/tipos/livro";
import { buscarLivrosGoogle } from "@/services/livro.services";

import "./BuscaLivro.css";

interface BuscaLivroProps{
    onSelect: (livro:LivroGoogle) => void;
}

export function BuscaLivro({ onSelect }: BuscaLivroProps) {
  const [busca, setBusca] = useState("");
  const [resultados, setResultados] = useState<LivroGoogle[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {

    if (!busca.trim()) {
      setResultados([]);
      setLoading(false);
      return;
    }

    const timeout = setTimeout(async () => {

      try {
        setLoading(true);

      const livros = await buscarLivrosGoogle(busca);

        setResultados(livros);
      } catch (error) {
        console.error("Erro ao buscar livros:", error);
        setResultados([]);
      } finally {
        setLoading(false);
      }

    }, 500);

    return () => clearTimeout(timeout);

}, [busca]);

  function selecionarLivro(livro: LivroGoogle) {

    onSelect(livro);

    setBusca("");

    setResultados([]);

  

  return (
    <div className="busca-container">

      <input
        type="text"
        placeholder="Pesquisar livro..."
        value={busca}
        onChange={(e) => setBusca(e.target.value)}
      />

      {loading && <p>Buscando livros...</p>}

      {!loading && busca.trim() && resultados.length === 0 && (
        <p>Nenhum livro encontrado.</p>)}

      <div className="resultados">

        {resultados.map((livro, index) => (

          <div
            className="resultado-card"
            key={`${livro.titulo}-${livro.autor}-${index}`}
          >

            {livro.imagem ? (

              <Image
                src={livro.imagem}
                alt={`Capa do livro ${livro.titulo}`}
                width={70}
                height={100}
                className="resultado-img"
              />

            ) : (

              <div className="sem-imagem">
                Sem capa
              </div>

            )}

            <div className="resultado-info">

              <h3>{livro.titulo}</h3>

              <p>{livro.autor}</p>

            </div>

            <button
              type="button"
              onClick={() => selecionarLivro(livro)}
            >
              Selecionar
            </button>

          </div>

        ))}

      </div>

    </div>
  );
}
}
