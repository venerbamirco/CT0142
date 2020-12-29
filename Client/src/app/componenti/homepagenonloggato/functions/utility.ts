//funzione per verificare se un utente e gia dentro alla lista
export function isUtentePresente(idUtente: number, lista: number[]): boolean {
    //per ciascun utente presente nella lista
    for (let i = 0; i < lista.length; ++i) {
        //confronto se e gia nella lista allora vero
        if (lista[i] === idUtente) {
            return true;
        }
    }
    //se non presente falso
    return false;
}