import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { AppRoutingModule } from "./app-routing.module";

import { AppComponent } from "./app.component";
import { LoginComponent } from "./componenti/login/login.component";
import { RegistrazioneComponent } from "./componenti/registrazione/registrazione.component";
import { PassworddimenticataComponent } from "./componenti/passworddimenticata/passworddimenticata.component";
import { ModificapasswordComponent } from './componenti/modificapassword/modificapassword.component';
import { HomepagemoderatoreComponent } from './componenti/homepagemoderatore/homepagemoderatore.component';
import { HomepagestudenteComponent } from './componenti/homepagestudente/homepagestudente.component';
import { HomepagenonloggatoComponent } from './componenti/homepagenonloggato/homepagenonloggato.component';

import { PersonaService } from "./servizi/persona.service";
import { LibroService } from "./servizi/libro.service";
import { MessaggioService } from "./servizi/messaggio.service";
import { InserzioneService } from "./servizi/inserzione.service";
import { SocketioService } from "./servizi/socketio.service";
import { StatisticheService } from "./servizi/statistiche.service";


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrazioneComponent,
    PassworddimenticataComponent,
    ModificapasswordComponent,
    HomepagemoderatoreComponent,
    HomepagestudenteComponent,
    HomepagenonloggatoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    { provide: PersonaService, useClass: PersonaService },
    { provide: LibroService, useClass: LibroService },
    { provide: MessaggioService, useClass: MessaggioService },
    { provide: InserzioneService, useClass: InserzioneService },
    { provide: SocketioService, useClass: SocketioService },
    { provide: StatisticheService, useClass: StatisticheService }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
