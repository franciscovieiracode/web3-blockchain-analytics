import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './components/landing-page/header/header.component';
import { HomePageComponent } from './components/landing-page/home-page/home-page.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { LoginComponent } from './components/auth/login/login.component';
import { LoginStatusComponent } from './components/auth/login-status/login-status.component';
import { TermsOfUseComponent } from './components/terms-and-privacy/terms-of-use/terms-of-use.component';
import { PrivacyComponent } from './components/terms-and-privacy/privacy/privacy.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomePageComponent,
    RegisterComponent,
    LoginComponent,
    LoginStatusComponent,
    TermsOfUseComponent,
    PrivacyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
  ],
  providers: [LoginStatusComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
