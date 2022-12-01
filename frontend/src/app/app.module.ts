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
import { EthereumComponent } from './components/wallets/ethereum/ethereum.component';
import { CoinbaseComponent } from './components/wallets/coinbase/coinbase.component';
import { CardanoComponent } from './components/wallets/cardano/cardano.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PieChartComponent } from './components/dashboard/pie-chart/pie-chart.component';
import { LinearChartComponent } from './components/dashboard/linear-chart/linear-chart.component';
import { DetailesComponent } from './components/dashboard/detailes/detailes.component';
import { DatePickerComponent } from './components/dashboard/date-picker/date-picker.component';
import { CryptoDetailsComponent } from './components/dashboard/crypto-details/crypto-details.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { TransactionlistComponent } from './components/transactions/transactionlist/transactionlist.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomePageComponent,
    RegisterComponent,
    LoginComponent,
    LoginStatusComponent,
    TermsOfUseComponent,
    PrivacyComponent,
    EthereumComponent,
    CoinbaseComponent,
    CardanoComponent,
    DashboardComponent,
    PieChartComponent,
    LinearChartComponent,
    DetailesComponent,
    DatePickerComponent,
    CryptoDetailsComponent,
    TransactionlistComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    NgApexchartsModule
  ],
  providers: [LoginStatusComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
