export interface LoginDTO
{
    email: string;
    senha: string;
}

export interface CreateDTO
{
    email: string;
    senha: string;
    confirmacaoSenha: string;
}

export interface LoginResponse {
  token: string;
}
