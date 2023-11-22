import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { AddCardComponent } from './components/add-card/add-card.component';
import { SelectCollectionComponent } from './components/select-collection/select-collection.component';
import { AuthGuard } from './services/auth.guard';
import { CardsComponent } from './components/cards/cards.component';
import { UserAuthGuard } from './services/user-auth.guard';
import { FavoriteCardsComponent } from './components/favorite-cards/favorite-cards.component';
import { CardDetailsComponent } from './components/card-details/card-details.component';
import { ProgressBarComponent } from './components/progress-bar/progress-bar.component';
import { UsersListComponent } from './components/users-list/users-list.component';





const routes: Routes = [
  {path: "", component: HomeComponent },
  {path: "header", component: HeaderComponent},
  {path: "footer", component: FooterComponent},
  {path: "signup/user", component: SignupComponent},
  {path: "signup/user/edit", component: SignupComponent,canActivate: [UserAuthGuard]},
  {path: "signup/admin", component: SignupComponent},
  {path: "login", component: LoginComponent},
  {path: "add-card", component: AddCardComponent,canActivate: [AuthGuard]},
  {path: "edit-card/:id", component: AddCardComponent,canActivate: [AuthGuard]},
  {path: "select-collection", component: SelectCollectionComponent},
  {path: "cards", component:CardsComponent,canActivate: [UserAuthGuard] },
  {path: "cards/rom", component:CardsComponent,canActivate: [UserAuthGuard] },
  {path: "cards/originals", component:CardsComponent,canActivate: [UserAuthGuard] },
  {path: "cards/stars", component:CardsComponent,canActivate: [UserAuthGuard] },
  {path: "favorite-cards", component: FavoriteCardsComponent},
  {path: "card-details/:id", component: CardDetailsComponent},
  {path: "progress-bar", component: ProgressBarComponent},
  {path: "users-list", component: UsersListComponent ,canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
