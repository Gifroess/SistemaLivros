export class GoogleBooksService {
    async buscarLivroExterno(termoBusca: string) {
        const url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(termoBusca)}&maxResults=5`;
        const resposta = await fetch(url);
        
        if (!resposta.ok) {
            throw new Error("Erro ao consultar a API do Google Books.");
        }
        
        const dados = await resposta.json();
        
        if (!dados.items) {
            return [];
        }

        return dados.items.map((item: any) => ({
            titulo: item.volumeInfo.title,
            autor: item.volumeInfo.authors ? item.volumeInfo.authors.join(", ") : "Autor desconhecido",
            imagem: item.volumeInfo.imageLinks ? item.volumeInfo.imageLinks.thumbnail : null
        }));
    }
}