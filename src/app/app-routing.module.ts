import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginFormComponent, ResetPasswordFormComponent, CreateAccountFormComponent, ChangePasswordFormComponent } from './shared/components';
import { AuthGuardService } from './shared/services';
import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { DxDataGridModule, DxFormModule } from 'devextreme-angular';
import { MaestroProyectosComponent } from './pages/features/maestros/maestro-proyectos/maestro-proyectos.component';
import { MaestroModulosComponent } from './pages/features/maestros/maestro-modulos/maestro-modulos.component';
import { MaestroFuncionalidadesComponent } from './pages/features/maestros/maestro-funcionalidades/maestro-funcionalidades.component';
import { VisualizarProyectoComponent } from './pages/features/creacion-proyecto/creacion/visualizar-proyecto.component';
import { MaestroFasesComponent } from './pages/features/maestros/maestro-fases/maestro-fases.component';
import { MaestroTareasComponent } from './pages/features/maestros/maestro-tareas/maestro-tareas.component';
import { MaestroFuncionalidadesTareasComponent } from './pages/features/maestros/maestro-funcionalidades-tareas/maestro-funcionalidades-tareas.component';
import { ConfiguracionProyectoComponent } from './pages/features/maestros/configuracion-proyecto/configuracion-proyecto.component';

const routes: Routes = [
  {
    path: 'maestro-modulos',
    component: MaestroModulosComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'maestro-proyectos',
    component: MaestroProyectosComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'maestro-funcionalidades',
    component: MaestroFuncionalidadesComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'maestro-fases',
    component: MaestroFasesComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'maestro-tareas',
    component: MaestroTareasComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'maestro-funcionalidades-tareas',
    component: MaestroFuncionalidadesTareasComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'creacion-proyecto',
    component: VisualizarProyectoComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'configuracion-proyecto',
    component: ConfiguracionProyectoComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'login-form',
    component: LoginFormComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'reset-password',
    component: ResetPasswordFormComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'create-account',
    component: CreateAccountFormComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'change-password/:recoveryCode',
    component: ChangePasswordFormComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true }), DxDataGridModule, DxFormModule],
  providers: [AuthGuardService],
  exports: [RouterModule],
  declarations: [
    HomeComponent,
    ProfileComponent
  ]
})
export class AppRoutingModule { }
