//funzione per effettuare il logout
export function logout(): void {
    this.us.logout();
    this.router.navigate(['/']);
}