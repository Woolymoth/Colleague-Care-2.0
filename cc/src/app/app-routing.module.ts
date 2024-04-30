import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FirstPageComponent } from './pages/first-page/first-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { FormPageComponent } from './pages/form-page/form-page.component';
import { DisplayPageComponent } from './pages/display-page/display-page.component';
import { AuthGuard } from './tools/auth-guard';

const routes: Routes = [
  {
    path: "",
    component: FirstPageComponent
  },
  {
    path: "login",
    component: LoginPageComponent
  },
  {
    path: "form",
    component: FormPageComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "display",
    component: DisplayPageComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
