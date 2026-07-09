import LivroGrid from "@/componentes/LivrosGrid/LivrosGrid";
import { getLivros } from "@/services/livro.services";
import Link from "next/link";
import styles from "@/app/page.module.css";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Home() {

    const cookieStore = await cookies();
    const cookieHeader = cookieStore.toString();

    const token = cookieStore.get("token");

    if (!token) {
        redirect("/login");
    }

    const livros = await getLivros(cookieHeader);

    return (
        <main className={styles.home}>

            <header className={styles.homeHeader}>
                <div>
                    <h1> 📚 Livros</h1>
                    <p>Gerencie seus livros</p>
                </div>

                <Link
                    href="/livros/criar"
                    className={styles.btnAdd}
                >
                    + Adicionar Livro
                </Link>

            </header>

            <LivroGrid livros={livros} />

        </main>
    );
}
