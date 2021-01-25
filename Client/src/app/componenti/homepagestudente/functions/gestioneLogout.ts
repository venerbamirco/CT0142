//funzione per effettuare il logout e reindirizzati alla pagina di login
export function logout(): void {
    this.us.logout();
    this.router.navigate(['/']);
}