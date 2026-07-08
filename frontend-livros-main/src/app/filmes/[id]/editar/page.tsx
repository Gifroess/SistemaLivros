import FilmeForm from "@/componentes/LivroForm/LivroForm";
import { getFilme } from "@/services/livro.services";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";


interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditarFilmePage({
  params,
}: Props) {
  const { id } = await params;

  const cookieStore = await cookies();

  const cookieHeader = cookieStore.toString();

  const token = cookieStore.get("token");

  if(!token)
    redirect('/login');

  const filme = await getFilme(id, cookieHeader);

  return (
    <>
      <FilmeForm filme={filme} />
    </>
  );
}