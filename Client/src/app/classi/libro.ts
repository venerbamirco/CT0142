//classe per la gestione del libro
export class Libro {
    idLibro?: number;
    nome?: string;
    corsoDiStudi?: string;
    universita?: string;
    autore?: number;
    annoPubblicazione?: number;
    edizione?: number;
    isbn?: string;

    constructor(libro?: Libro) {
        if (libro) {
            if (libro.idLibro) this.setIdLibro(libro.idLibro);
            if (libro.nome) this.setNome(libro.nome);
            if (libro.corsoDiStudi) this.setCorsoDiStudi(libro.corsoDiStudi);
            if (libro.universita) this.setUniversita(libro.universita);
            if (libro.autore) this.setAutore(libro.autore);
            if (libro.annoPubblicazione) this.setAnnoPubblicazione(libro.annoPubblicazione);
            if (libro.edizione) this.setEdizione(libro.edizione);
            if (libro.isbn) this.setIsbn(libro.isbn);
        }
    }

    public getIdLibro(): number {
        return this.idLibro;
    }

    public setIdLibro(idLibro): void {
        this.idLibro = idLibro;
    }

    public getNome(): string {
        return this.nome;
    }

    public setNome(nome): void {
        this.nome = nome;
    }

    public getCorsoDiStudi(): string {
        return this.corsoDiStudi;
    }

    public setCorsoDiStudi(corsoDiStudi): void {
        this.corsoDiStudi = corsoDiStudi;
    }

    public getUniversita(): string {
        return this.universita;
    }

    public setUniversita(universita): void {
        this.universita = universita;
    }

    public getAutore(): number {
        return this.autore;
    }

    public setAutore(autore): void {
        this.autore = autore;
    }

    public getAnnoPubblicazione(): number {
        return this.annoPubblicazione;
    }

    public setAnnoPubblicazione(annoPubblicazione): void {
        this.annoPubblicazione = annoPubblicazione;
    }

    public getEdizione(): number {
        return this.edizione;
    }

    public setEdizione(edizione): void {
        this.edizione = edizione;
    }

    public getIsbn(): string {
        return this.isbn;
    }

    public setIsbn(isbn): void {
        this.isbn = isbn;
    }

}