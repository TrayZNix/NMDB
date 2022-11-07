import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginAssistantComponent } from "./components/dropdowns/user-dropdown/loginAssistant.component";

// layouts
import { AdminComponent } from "./layouts/admin/admin.component";
import { AuthComponent } from "./layouts/auth/auth.component";

// admin views
import { PeliculasComponent } from "./views/admin/peliculas/peliculas.component";
import { FavoritesComponent } from "./views/admin/favorites/favorites.component";
import { ActorsComponent } from "./views/admin/actors/actors.component";
import { ReviewsComponent } from "./views/admin/reviews/reviews.component";

// auth views
import { LoginComponent } from "./views/auth/login/login.component";
import { RegisterComponent } from "./views/auth/register/register.component";

// no layouts views
import { IndexComponent } from "./views/index/index.component";
import { LandingComponent } from "./views/landing/landing.component";
import { ProfileComponent } from "./views/profile/profile.component";
import { PeliculaDetailsComponent } from "./views/admin/pelicula-details/pelicula-details.component";
import { DetallesActorComponent } from "./views/admin/actors/detalles-actor/detalles-actor.component";


const routes: Routes = [
  // admin views
  {
    path: "",
    component: AdminComponent,
    children: [
      { path: "peliculas", component: PeliculasComponent },
      { path: "pelicula/:id", component: PeliculaDetailsComponent },
      { path: "actors", component: ActorsComponent },
      { path: "actors/:id", component: DetallesActorComponent },
      { path: "favorites", component: FavoritesComponent },
      { path: "reviews", component: ReviewsComponent },
      { path: "", redirectTo: "peliculas", pathMatch: "full" },
    ],
  },
  // auth views
  {
    path: "auth",
    component: AuthComponent,
    children: [
      { path: "login", component: LoginAssistantComponent },
      // { path: "register", component: RegisterComponent },
      { path: "", redirectTo: "login", pathMatch: "full" },
    ],
  },
  // // no layout views
  // { path: "profile", component: ProfileComponent },
  // { path: "landing", component: LandingComponent },
  // { path: "", component: IndexComponent },
  // { path: "**", redirectTo: "", pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
