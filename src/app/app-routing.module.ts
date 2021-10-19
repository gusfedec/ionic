import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { BackGuard } from './back.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'registration',
    canActivate: [BackGuard],
    loadChildren: () =>
      import('./registration/registration.module').then(
        (m) => m.RegistrationPageModule
      ),
  },
  /* {
    path: 'verify-email',
    loadChildren: () =>
      import('./verify-email/verify-email.module').then(
        (m) => m.VerifyEmailPageModule
      ),
  }, */
  {
    path: 'login',
    canActivate: [BackGuard],
    loadChildren: () =>
      import('./login/login.module').then((m) => m.LoginPageModule),
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./dashboard/dashboard.module').then((m) => m.DashboardPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'messagelogin',
    loadChildren: () =>
      import('./messagelogin/messagelogin.module').then(
        (m) => m.MessageloginPageModule
      ),
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./home/home.module').then((m) => m.HomePageModule),
  },
  {
    path: 'botones-principales',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./botones-principales/botones-principales.module').then(
        (m) => m.BotonesPrincipalesPageModule
      ),
    //canActivate: [AuthGuard],
  },
  {
    path: 'subida/:cosas',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./subida/subida.module').then((m) => m.SubidaPageModule),
  },
  {
    path: 'graficos',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./graficos/graficos.module').then((m) => m.GraficosPageModule),
  },
  {
    path: 'mis-fotos',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./mis-fotos/mis-fotos.module').then((m) => m.MisFotosPageModule),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
