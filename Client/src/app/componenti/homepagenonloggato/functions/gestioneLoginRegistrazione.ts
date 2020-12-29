//funzione per il reindirizzamento nella pagina del login
export function effettuaLogin(): void {
    //vado nella pagina del login
    this.router.navigate(["/login"]);
}

//funzione per il reindirizzamento nella pagina della registrazione
export function effettuaRegistrazione(): void {
    //vado nella pagina del login
    this.router.navigate(["/registrazione"]);
}