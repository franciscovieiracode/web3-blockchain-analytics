import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomePageComponent } from './components/landing-page/home-page/home-page.component';
import { PrivacyComponent } from './components/terms-and-privacy/privacy/privacy.component';
import { TermsOfUseComponent } from './components/terms-and-privacy/terms-of-use/terms-of-use.component';
import { TransactionlistComponent } from './components/transactions/transactionlist/transactionlist.component';
import { CardanoComponent } from './components/wallets/cardano/cardano.component';
import { CoinbaseComponent } from './components/wallets/coinbase/coinbase.component';
import { EthereumComponent } from './components/wallets/ethereum/ethereum.component';
import { LoginStatusGuard } from './guards/login-status.guard';

const routes: Routes = [
  {path:'', component: HomePageComponent, canActivate:[LoginStatusGuard]},
  {path:'login', component: LoginComponent},
  {path:'register', component: RegisterComponent},
  {path:'terms',component:TermsOfUseComponent},
  {path:'privacy', component:PrivacyComponent},
  {path:'cardano', component:CardanoComponent},
  {path:'coinbase', component:CoinbaseComponent},
  {path:'dashboard', component:DashboardComponent},
  {path:'ethereum', component:EthereumComponent},
  {path:'transactions', component:TransactionlistComponent},
  {path:'**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
