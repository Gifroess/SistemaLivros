

import "@/componentes/Footer/Footer.css";
export default function Footer(){
    return(
        <footer className='footer'>
            <section>
                <p style={{textAlign: "center"}}>
                    Feito por{" "}
                    <a href="https://github.com/Gifroess" target="_blank">
                        Giovana Fróes
                    </a>
                    ,{" "}
                    <a href="https://github.com/montorisabela" target="_blank">
                        Isabela Montor
                    </a>{" "}
                    e{" "}
                    <a href="https://github.com/nottfael" target="_blank">
                        Rafael Leite
                    </a>
                    <br></br>
                                <a style={{textAlign: "center"}} href="https://www.flaticon.com/free-icons/estate" title="estate icons">Estate icons created by hqrloveq - Flaticon</a>
    
                </p>

            </section>
        </footer>
    );
}
