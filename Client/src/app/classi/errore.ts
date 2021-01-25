export class Errore {
    statusCode?: number;
    endpoint?: string;
    method?: string;
    error?: boolean;
    message?: string;
    reason?: string;

    //inizializzzazione errore
    constructor(errore?: Errore) {
        if (errore) {
            if (errore.statusCode) this.setStatusCode(errore.statusCode);
            if (errore.endpoint) this.setEndpoint(errore.endpoint);
            if (errore.method) this.setMethod(errore.method);
            if (errore.error) this.setError(errore.error);
            if (errore.message) this.setMessage(errore.message);
            if (errore.reason) this.setReason(errore.reason);
        }
    }

    //metodo setter per impostare statusCode
    public setStatusCode(statusCode: number): void {
        this.statusCode = statusCode;
    }

    //metodo setter per impostare endpoint
    public setEndpoint(endpoint: string): void {
        this.endpoint = endpoint;
    }

    //metodo setter per impostare method
    public setMethod(method: string): void {
        this.method = method;
    }

    //metodo setter per impostare error
    public setError(error: boolean): void {
        this.error = error;
    }

    //metodo setter per impostare message
    public setMessage(message: string): void {
        this.message = message;
    }

    //metodo getter per return message
    public getMessage(): string {
        return this.message;
    }

    //metodo setter per impostare reason
    public setReason(reason: string): void {
        this.reason = reason;
    }

    //metodo getter per return reason
    public getReason(): string {
        if (this.reason) {
            console.log(this.reason);
            var json: any = JSON.parse(this.reason);
            console.log(json);
            return JSON.stringify(json.error.message);
        }
        else return "";

    }
}
