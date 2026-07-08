export type StatusLivro =
  |  "QUERO_LER"
  | "LENDO"
  | "LIDO";

export interface Livro {
    id: number;
    titulo: string;
    autor: string;
    imagem?: string;
    status: StatusLivro;
    review?: string;
    nota?: number;
}

export interface LivroGoogle{
    titulo: string;
    autor:string;
    imagem: string | null;
}

export interface CreateLivroDTO  {
    titulo: string;
    autor: string;
    imagem?: string;
    status: StatusLivro;
    review?: string;
    nota?: number;
}

export interface UpdateLivroDTO  {
    titulo?: string;
    autor?: string;
    imagem?: string;
    status?:StatusLivro;
    review?:string;
    nota?: number;
}