import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ByCountryPageComponent } from './pages/by-country-page/by-country-page.component';
import { ByRegionPageComponent } from './pages/by-region-page/by-region-page.component';
import { ByCapitalPageComponent } from './pages/by-capital-page/by-capital-page.component';
import { CountryPageComponent } from './pages/country-page/country-page.component';
import { AllCountryPageComponent } from './pages/all-country-page/all-country-page.component';

const routes: Routes = [
    {
        path: '',
        component: AllCountryPageComponent
    },
    {
        path: 'by-country',
        component: ByCountryPageComponent
    },
    {
        path: 'by-region',
        component: ByRegionPageComponent
    },
    {
        path: 'by-capital',
        component: ByCapitalPageComponent
    },
    {
        path: 'by/:id',
        component: CountryPageComponent
    },
    {
        path: '**',
        redirectTo: ''
    }

]


// El método 'forChild()' es utilizado para crear un módulo de enrutamiento secundario. Esto significa que el módulo de enrutamiento secundario se utilizará para definir las rutas de un módulo específico, en lugar de definir las rutas de la aplicación completa. Esto es útil cuando se desea dividir la aplicación en módulos más pequeños y manejables, cada uno con su propio conjunto de rutas.

@NgModule({
    imports: [
        RouterModule.forChild( routes )
    ],
    exports: [
        RouterModule
    ],
})
export class CountriesRoutingModule { }
