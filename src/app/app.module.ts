
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { FooterComponent } from './components/footer/footer.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { AddCardComponent } from './components/add-card/add-card.component';
import { SelectCollectionComponent } from './components/select-collection/select-collection.component';
import { JwtInterceptor } from './services/jwt-interceptor.service';
import { AuthGuard } from './services/auth.guard';
import { CardsComponent } from './components/cards/cards.component';
import { UserAuthGuard } from './services/user-auth.guard';
import { FavoriteCardsComponent } from './components/favorite-cards/favorite-cards.component';
import { CardDetailsComponent } from './components/card-details/card-details.component';
import { ProgressBarComponent } from './components/progress-bar/progress-bar.component';
import { AppRoutingModule } from './app-routing.module';
import { UsersListComponent } from './components/users-list/users-list.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { CountryPipe } from './pipes/country.pipe';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    FooterComponent,
    SignupComponent,
    LoginComponent,
    AddCardComponent,
    SelectCollectionComponent,
    CardsComponent,
    FavoriteCardsComponent,
    CardDetailsComponent,
    ProgressBarComponent,
    UsersListComponent,
    CountryPipe,
  ],
  
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgCircleProgressModule.forRoot({
      radius: 100,
      outerStrokeWidth: 16,
      innerStrokeWidth: 8,
      outerStrokeColor: "#5D3FD3",
      innerStrokeColor: "#AA336A",
      animationDuration: 300,
            lazy: false
    })
  ],
 
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: JwtInterceptor,
    multi: true,
  }, AuthGuard, UserAuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
