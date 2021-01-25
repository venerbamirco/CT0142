//classe per la gestione dell utente
export class Utente {
    idUser?: number;
    ruolo?: string[];
    nome?: string;
    cognome?: string;
    username?: string;
    email?: string;
    areaGeografica?: string;
    astePartecipate?: number[];
    password?: string;
    confermaPassword?: string;
    remember?: boolean;

    //inizializzzazione utente
    constructor(utente?: Utente) {
        this.ruolo = [];
        this.astePartecipate = [];
        if (utente) {
            if (utente.idUser) this.setIdUser(utente.idUser);
            if (utente.nome) this.setNome(utente.nome);
            if (utente.cognome) this.setCognome(utente.cognome);
            if (utente.ruolo) this.setRuolo(utente.ruolo);
            if (utente.username) this.setUsername(utente.username);
            if (utente.email) this.setEmail(utente.email);
            if (utente.areaGeografica) this.setAreaGeografica(utente.areaGeografica);
            if (utente.astePartecipate) this.setAstePartecipate(utente.astePartecipate);
            if (utente.remember) this.setRemember(utente.remember);
        }
    }

    //funzione per vedere se l utente e uno studente
    isStudente(): boolean {
        var flag: number = 0;
        this.ruolo.forEach((ruoloSingolo) => {
            if (ruoloSingolo === "Studente") {
                flag = 1;
            }
        });
        if (flag === 1) return true;
        else return false;
    }

    //funzione per vedere se l utente e un moderatore
    isModeratore(): boolean {
        var flag: number = 0;
        this.ruolo.forEach((ruoloSingolo) => {
            if (ruoloSingolo === "Moderatore") {
                flag = 1;
            }
        });
        if (flag === 1) return true;
        else return false;
    }

    //metodo setter per impostare il nome
    setNome(nome: string): void {
        this.nome = nome;
    }

    //metodo setter per impostare il cognome
    setCognome(cognome: string): void {
        this.cognome = cognome;
    }

    //metodo setter per impostare lo username
    setUsername(username: string): void {
        this.username = username;
    }

    //metodo setter per impostare l email
    setEmail(email: string): void {
        this.email = email;
    }

    //metodo setter per impostare l area geografica
    setAreaGeografica(areaGeografica: string): void {
        this.areaGeografica = areaGeografica;
    }

    //metodo setter per impostare le aste partecipate
    setAstePartecipate(astePartecipate: number[]): void {
        this.astePartecipate.forEach((asta) => {
            if (!this.astePartecipate.includes(asta)) {
                this.astePartecipate.push(asta);
            }
        });
    }

    //metodo setter per impostare le aste partecipate
    setRuolo(ruoli: string[]): void {
        ruoli.forEach((ruolo) => {
            if (!this.ruolo.includes(ruolo)) {
                this.ruolo.push(ruolo);
            }
        });
    }

    //metodo setter per impostare il flag di remember
    setRemember(remember: boolean): void {
        this.remember = remember;
    }

    public getIdUser(): number {
        return this.idUser;
    }

    public setIdUser(idUser): void {
        this.idUser = idUser;
    }

    public getRuolo(): string[] {
        return this.ruolo;
    }

    public getNome(): string {
        return this.nome;
    }

    public getCognome(): string {
        return this.cognome;
    }

    public getUsername(): string {
        return this.username;
    }

    public getEmail(): string {
        return this.email;
    }

    public getAreaGeografica(): string {
        return this.areaGeografica;
    }

    public getAstePartecipate(): number[] {
        return this.astePartecipate;
    }

    public getRemember(): boolean {
        return this.remember;
    }

}