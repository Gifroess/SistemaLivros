import FilmeForm from "@/componentes/FilmeForm/FilmeForm";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";


export default async function CriarFilmePage() {

    const cookieStore = await cookies();
  
    const token = cookieStore.get("token");
  
    if(!token)
      redirect('/login');

  return (
    <>
      <FilmeForm />
    </>
  );
}