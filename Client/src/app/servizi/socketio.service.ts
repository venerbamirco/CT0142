import { Injectable } from "@angular/core";
import { PersonaService } from "./persona.service";
import { Observable } from "rxjs";
import * as io from "socket.io-client";

@Injectable({
  providedIn: "root"
})
export class SocketioService {

  private socket: SocketIOClient.Socket;

  constructor(private us: PersonaService) { }

  connect(): Observable<any> {
    this.socket = io(this.us.getUrl());
    return new Observable((observer) => {
      this.socket.on("broadcast", (m) => {
        console.log("Messaggio ricevuto: " + JSON.stringify(m));
        observer.next(m);
      });
      this.socket.on("error", (err) => {
        console.log("Errore socket: " + err);
        observer.error(err);
      });
      return () => {
        this.socket.disconnect();
      }
    });

  }
}
