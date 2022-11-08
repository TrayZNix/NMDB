import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

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

// components for views and layouts

import { AdminNavbarComponent } from "./components/navbars/admin-navbar/admin-navbar.component";
import { AuthNavbarComponent } from "./components/navbars/auth-navbar/auth-navbar.component";
import { CardBarChartComponent } from "./components/cards/card-bar-chart/card-bar-chart.component";
import { CardLineChartComponent } from "./components/cards/card-line-chart/card-line-chart.component";
import { CardPageVisitsComponent } from "./components/cards/card-page-visits/card-page-visits.component";
import { CardProfileComponent } from "./components/cards/card-profile/card-profile.component";
import { CardActorsComponent } from "./components/cards/card-settings/card-actors.component";
import { CardSocialTrafficComponent } from "./components/cards/card-social-traffic/card-social-traffic.component";
import { CardStatsComponent } from "./components/cards/card-stats/card-stats.component";
import { CardTableComponent } from "./components/cards/card-table/card-table.component";
import { FooterAdminComponent } from "./components/footers/footer-admin/footer-admin.component";
import { FooterComponent } from "./components/footers/footer/footer.component";
import { FooterSmallComponent } from "./components/footers/footer-small/footer-small.component";
import { HeaderStatsComponent } from "./components/headers/header-stats/header-stats.component";
import { IndexNavbarComponent } from "./components/navbars/index-navbar/index-navbar.component";
import { MapExampleComponent } from "./components/maps/map-example/map-example.component";
import { IndexDropdownComponent } from "./components/dropdowns/index-dropdown/index-dropdown.component";
import { TableDropdownComponent } from "./components/dropdowns/table-dropdown/table-dropdown.component";
import { PagesDropdownComponent } from "./components/dropdowns/pages-dropdown/pages-dropdown.component";
import { NotificationDropdownComponent } from "./components/dropdowns/notification-dropdown/notification-dropdown.component";
import { SidebarComponent } from "./components/sidebar/sidebar.component";
import { UserDropdownComponent } from "./components/dropdowns/user-dropdown/user-dropdown.component";
import { HttpClientModule } from "@angular/common/http";
import { TarjetaActorComponent } from "./views/admin/actors/tarjeta-actor/tarjeta-actor.component";
import { FilmsTableComponent } from "./components/cards/films-table/films-table.component";
import { PeliculaDetailsComponent } from "./views/admin/pelicula-details/pelicula-details.component";
import { RouterModule } from "@angular/router";
import { DetallesActorComponent } from "./views/admin/actors/detalles-actor/detalles-actor.component";
import { CardFavoritesTableComponent } from "./components/cards/card-favorites-table/card-favorites-table.component";
import { ActoresService } from "./Services/actores.service";
import { AuthService } from "./Services/auth.service";
import { FavoriteFilmsService } from "./Services/favorite-films.service";
import { CastSlideComponent } from "./components/cards/cast-slide/cast-slide.component";

@NgModule({
  declarations: [
    AppComponent,
    PeliculasComponent,
    CardBarChartComponent,
    CardLineChartComponent,
    IndexDropdownComponent,
    PagesDropdownComponent,
    TableDropdownComponent,
    NotificationDropdownComponent,
    UserDropdownComponent,
    SidebarComponent,
    FooterComponent,
    FooterSmallComponent,
    FooterAdminComponent,
    CardPageVisitsComponent,
    CardProfileComponent,
    CardActorsComponent,
    CardSocialTrafficComponent,
    CardStatsComponent,
    CardTableComponent,
    HeaderStatsComponent,
    MapExampleComponent,
    AuthNavbarComponent,
    AdminNavbarComponent,
    IndexNavbarComponent,
    AdminComponent,
    AuthComponent,
    FavoritesComponent,
    ActorsComponent,
    ReviewsComponent,
    LoginComponent,
    RegisterComponent,
    IndexComponent,
    LandingComponent,
    ProfileComponent,
    TarjetaActorComponent,
    FilmsTableComponent,
    PeliculaDetailsComponent,
    DetallesActorComponent,
    CardFavoritesTableComponent,
    CastSlideComponent
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, RouterModule],
  providers: [ActoresService, AuthService, FavoriteFilmsService],
  bootstrap: [AppComponent],
})
export class AppModule {}
