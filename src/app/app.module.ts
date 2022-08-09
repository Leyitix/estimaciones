import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthService, ScreenService, AppInfoService } from './shared/services';
import { BrowserModule } from '@angular/platform-browser';
import { DevExtremeModule } from 'devextreme-angular';
import { FooterModule, ResetPasswordFormModule, CreateAccountFormModule, ChangePasswordFormModule, LoginFormModule } from './shared/components';
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from '@angular/core';
import { NotificationsService } from './shared/services/notifications.service';
import { SideNavOuterToolbarModule, SideNavInnerToolbarModule, SingleCardModule } from './layouts';
import { ToastComponent } from './shared/components/toast/toast.component';
import { UnauthenticatedContentModule } from './unauthenticated-content';

import { MaestrosModule } from './pages/features/maestros/maestros.module';
import { VisualizarProyectoModule } from './pages/features/creacion-proyecto/visualizar-proyecto.module';


@NgModule({
  declarations: [
    AppComponent,
    ToastComponent
  ],
  imports: [
    BrowserModule,
    SideNavOuterToolbarModule,
    SideNavInnerToolbarModule,
    SingleCardModule,
    FooterModule,
    ResetPasswordFormModule,
    CreateAccountFormModule,
    ChangePasswordFormModule,
    LoginFormModule,
    UnauthenticatedContentModule,
    AppRoutingModule,
    MaestrosModule,
    HttpClientModule,
    DevExtremeModule,
    VisualizarProyectoModule
  ],
  providers: [
    AuthService,
    ScreenService,
    AppInfoService,
    NotificationsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
