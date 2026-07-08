import {Livro, LivroGoogle, CreateLivroDTO, UpdateLivroDTO} from "@/tipos/livro";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL;

export async function getLivros(cookieHeader?: string): Promise<Livro[]>
{
    const response = await fetch(`${API_URL}/livros`,{
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

export async function buscarLivrosGoogle(termo: string): Promise<LivroGoogle[]> 
{
    const response = await fetch(`${API_URL}/livros/busca/google?q=${encodeURIComponent(termo)}`,
        {
            credentials: "include",
        }
    );
    
    if (!response.ok) {
        throw new Error("Erro ao buscar livro");
    }

    return response.json();

}

export async function getLivro(id: string, cookieHeader?: string): Promise<Livro> {
  
 
    const response = await fetch(`${API_URL}/livros/${id}`,{
        headers: {
            Cookie: cookieHeader ?? ""
        }
    });

    if (!response.ok) {
        throw new Error("Não autenticado");
    }

    return response.json();
}

export async function createLivro(livro: CreateLivroDTO): Promise<void>
{
    const response = await fetch(`${API_URL}/livros`,{
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(livro),
    });

    if (!response.ok) {
        throw new Error("Erro");
    }
}


export async function updateLivro(id: number, livro: UpdateLivroDTO): Promise<void>
{
    const response = await fetch(`${API_URL}/livros/${id}`,{
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(livro),
    });

    if (!response.ok) {
        throw new Error("Erro");
    }
}

export async function deleteLivro(id: number): Promise<void>
{
    await fetch(`${API_URL}/livros/${id}`,{
        method: "DELETE",
        credentials: "include",
    });
}