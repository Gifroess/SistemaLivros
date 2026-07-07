import {Filme, CreateFilmeDTO, UpdateFilmeDTO} from "@/tipos/filme";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL;

export async function getFilmes(cookieHeader?: string): Promise<Filme[]>
{
    const response = await fetch(`${API_URL}/filmes`,{
        headers: {
            Cookie: cookieHeader ?? "",
        }
    });
    
    if (!response.ok) {
        throw new Error("Não autenticado");
    }

    const dados = await response.json();

    return dados;

}

export async function getFilme(id: string, cookieHeader?: string): Promise<Filme> {
  
 
    const response = await fetch(`${API_URL}/filmes/${id}`,{
        headers: {
            Cookie: cookieHeader ?? ""
        }
    });

    if (!response.ok) {
        throw new Error("Não autenticado");
    }

    return response.json();
}

export async function createFilmes(filme: CreateFilmeDTO): Promise<void>
{
    const response = await fetch(`${API_URL}/filmes`,{
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(filme),
    });

    if (!response.ok) {
        throw new Error("Erro");
    }
}


export async function updateFilme(id: number, filme: UpdateFilmeDTO): Promise<void>
{
    const response = await fetch(`${API_URL}/filmes/${id}`,{
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(filme),
    });

    if (!response.ok) {
        throw new Error("Erro");
    }
}

export async function deleteFilme(id: number): Promise<void>
{
    await fetch(`${API_URL}/filmes/${id}`,{
        method: "DELETE",
        credentials: "include",
    });
}