export interface Livro {
    id: number;
    titulo: string;
    autor: string;
    imagem?: string;
    status: string;
    review?: string;
    nota?: number;
}

export interface CreateLivroDTO  {
    titulo: string;
    autor: string;
    imagem?: string;
    status: string;
    review?: string;
    nota?: number;
}

export interface UpdateLivroDTO  {
    titulo?: string;
    autor?: string;
    imagem?: string;
    status?:string;
    review?:string;
    nota?: number;
}