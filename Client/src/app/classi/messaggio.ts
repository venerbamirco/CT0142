//classe per la gestione del messaggio
export class Messaggio {
    idMessaggio?: number;
    idInserzione: number;
    messaggioRiferimento?: number;
    oggetto?: string;
    contenuto?: string;
    data?: Date;
    mittente: number;
    //destinatario =0 se pubblico e quindi non rivolto a nessuna persona specifica
    destinatario: number;

    constructor(messaggio?: Messaggio) {
        if (messaggio) {
            if (messaggio.idMessaggio) this.setIdMessaggio(messaggio.idMessaggio);
            if (messaggio.messaggioRiferimento) this.setMessaggioRiferimento(messaggio.messaggioRiferimento);
            if (messaggio.oggetto) this.setOggetto(messaggio.oggetto);
            if (messaggio.contenuto) this.setContenuto(messaggio.contenuto);
            if (messaggio.data) this.setData(messaggio.data);
            this.setIdInserzione(messaggio.idInserzione);
            this.setMittente(messaggio.mittente);
            this.setDestinatario(messaggio.destinatario);
        }
    }

    public getIdMessaggio(): number {
        return this.idMessaggio;
    }

    public setIdMessaggio(idMessaggio: number): void {
        this.idMessaggio = idMessaggio;
    }

    public getIdInserzione(): number {
        return this.idInserzione;
    }

    public setIdInserzione(idInserzione: number): void {
        this.idInserzione = idInserzione;
    }

    public getMessaggioRiferimento(): number {
        return this.messaggioRiferimento;
    }

    public setMessaggioRiferimento(messaggioRiferimento: number): void {
        this.messaggioRiferimento = messaggioRiferimento;
    }

    public getOggetto(): string {
        return this.oggetto;
    }

    public setOggetto(oggetto: string): void {
        this.oggetto = oggetto;
    }

    public getContenuto(): string {
        return this.contenuto;
    }

    public setContenuto(contenuto: string): void {
        this.contenuto = contenuto;
    }

    public getData(): Date {
        return this.data;
    }

    public getDataFormatoStringa(): String {
        return new Date(this.data).toLocaleDateString("en-GB");
    }

    public getOraFormatoStringa(): String {
        return new Date(this.data).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: false })
    }

    public setData(data: Date): void {
        this.data = data;
    }

    public getMittente(): number {
        return this.mittente;
    }

    public setMittente(mittente: number): void {
        this.mittente = mittente;
    }

    public getDestinatario(): number {
        return this.destinatario;
    }

    public setDestinatario(destinatario: number): void {
        this.destinatario = destinatario;
    }

}