import FilmeGrid from "@/componentes/FilmesGrid/FilmesGrid";
import { getFilmes } from "@/services/filme.services";
import Link from "next/link";
import styles from '@/app/page.module.css';
import { cookies } from "next/headers";
import { redirect } from "next/navigation";


export default async function Home() {
  
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();

  const token = cookieStore.get("token");

  if(!token)
  {
    redirect('/login');
  }

  const filmes = await getFilmes(cookieHeader);

  return (
    <main className={styles.home}>
      <header className={styles.homeHeader}>
          <div>
              <h1> 🎬 Filmes</h1>
              <p>Gerencie seus filmes</p>
          </div>

          <Link href="/filmes/criar" className={styles.btnAdd}>
            + Adicionar Filme
          </Link>
      </header>
      <FilmeGrid filmes={filmes} />
    </main>
  );
}