//funzione per azzerare i flag delle chat
export function azzeramentoFlagChat(): void {
    this.chatSingolaPersona = false;
    this.chatPrivataInserzione = false;
    this.chatPubblicaInserzione = false;
}

//funzione per usare la chat singola persona
export function setChatSingolaPersona(): void {
    this.chatSingolaPersona = true;
    this.chatPrivataInserzione = false;
    this.chatPubblicaInserzione = false;
}

//funzione per usare la chat privata dell inserzione
export function setChatPrivataInserzione(): void {
    this.chatSingolaPersona = false;
    this.chatPrivataInserzione = true;
    this.chatPubblicaInserzione = false;
}

//funzione per usare la chat pubblica dell inserzione
export function setChatPubblicaInserzione(): void {
    this.chatSingolaPersona = false;
    this.chatPrivataInserzione = false;
    this.chatPubblicaInserzione = true;
}