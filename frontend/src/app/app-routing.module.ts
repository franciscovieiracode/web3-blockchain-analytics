import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './components/auth/register/register.component';
import { HomePageComponent } from './components/landing-page/home-page/home-page.component';

const routes: Routes = [
  {path:'', component: HomePageComponent},
  {path:'register', component: RegisterComponent},
  {path:'**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
