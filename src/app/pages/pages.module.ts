import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';


// Componentes
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { PagesComponent } from './pages.component';

// Módulos
import { SharedModule } from '../shared/shared.module';

// ng2-charts
import { ChartsModule } from 'ng2-charts';


// Rutas hijas
import { PAGES_ROUTES } from './pages.routes';

// Temporal
import { IncrementadorComponent } from '../components/incrementador/incrementador.component';
import { GraficaDonaComponent } from '../components/grafica-dona/grafica-dona.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';


@NgModule({
    declarations: [
    PagesComponent,
    DashboardComponent,
    ProgressComponent,
    Graficas1Component,
    IncrementadorComponent,
    GraficaDonaComponent,
    AccountSettingsComponent
    ],
    exports: [
    DashboardComponent,
    ProgressComponent,
    Graficas1Component,
    ],
    imports: [
    SharedModule,
    PAGES_ROUTES,
    FormsModule,
    ChartsModule
    ]
})
export class PagesModule { }
