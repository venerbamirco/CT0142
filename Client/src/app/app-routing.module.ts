import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { LoginComponent } from "./componenti/login/login.component";
import { RegistrazioneComponent } from "./componenti/registrazione/registrazione.component";
import { PassworddimenticataComponent } from "./componenti/passworddimenticata/passworddimenticata.component";
import { ModificapasswordComponent } from "./componenti/modificapassword/modificapassword.component";
import { HomepagemoderatoreComponent } from "./componenti/homepagemoderatore/homepagemoderatore.component";
import { HomepagestudenteComponent } from "./componenti/homepagestudente/homepagestudente.component";
import { HomepagenonloggatoComponent } from "./componenti/homepagenonloggato/homepagenonloggato.component";

const routes: Routes = [
  { path: "", redirectTo: "/login", pathMatch: "full" },
  { path: "login", component: LoginComponent },
  { path: "registrazione", component: RegistrazioneComponent },
  { path: "passworddimenticata", component: PassworddimenticataComponent },
  { path: "modificapassword", component: ModificapasswordComponent },
  { path: "homepagemoderatore", component: HomepagemoderatoreComponent },
  { path: "homepagestudente", component: HomepagestudenteComponent },
  { path: "homepagenonloggato", component: HomepagenonloggatoComponent }
];

@NgModule( {
  imports: [ RouterModule.forRoot( routes ) ],
  exports: [ RouterModule ]
} )
export class AppRoutingModule { }
