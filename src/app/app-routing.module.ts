import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'registration',
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
    loadChildren: () =>
      import('./botones-principales/botones-principales.module').then(
        (m) => m.BotonesPrincipalesPageModule
      ),
    //canActivate: [AuthGuard],
  },
  {
    path: 'subida/:cosas',
    loadChildren: () =>
      import('./subida/subida.module').then((m) => m.SubidaPageModule),
  },
  {
    path: 'graficos',
    loadChildren: () => import('./graficos/graficos.module').then( m => m.GraficosPageModule)
  },
  {
    path: 'mis-fotos',
    loadChildren: () => import('./mis-fotos/mis-fotos.module').then( m => m.MisFotosPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
