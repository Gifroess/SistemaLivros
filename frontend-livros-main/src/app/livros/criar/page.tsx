import LivroForm from "@/componentes/LivroForm/LivroForm";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";


export default async function CriarLivroPage() {

    const cookieStore = await cookies();
  
    const token = cookieStore.get("token");
  
    if(!token)
      redirect('/login');

  return (
    <>
      <LivroForm />
    </>
  );
}