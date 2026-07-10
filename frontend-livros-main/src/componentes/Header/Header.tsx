import "@/componentes/Header/Header.css";
import { cookies } from "next/headers";
import Link from "next/link";
import LogoutButton from "../LogoutButton/LogoutButton";
import Image from "next/image";

export default async function Header(){

    //Verificar se está logado
    const cookieStore = await cookies();

    const token = cookieStore.get('token');

    return(
        <header className='header'>
                <nav>
                    <ul>
                        <li>
                            <Link href="/" className="home-link">
                                <Image
                                    src="/assets/home.png"
                                    alt=""
                                    width={28}
                                    height={28}
                                />

                                <span>Home</span>
                            </Link>
                        </li>
                    </ul>    
                </nav>
                <div>
                    <ul>
                        {
                        !token && (
                            <>
                            <li>
                                <Link href="/login">Login</Link>
                            </li>

                            <li>
                                <Link href="/create">Criar Conta</Link> 
                            </li>
                            </>
                        )
                        }
                        {
                        token && (
                            <li>
                                <LogoutButton />
                            </li>
                        )
                        }
                    </ul>
                </div>
        </header>
    )
}
