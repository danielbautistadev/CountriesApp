import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomePageComponent } from './shared/pages/home-page/home-page.component';
import { AboutPageComponent } from './shared/pages/about-page/about-page.component';
import { ContactPageComponent } from './shared/pages/contact-page/contact-page.component';
import { ServicesPageComponent } from './shared/pages/services-page/services-page.component';
import { PortfolioPageComponent } from './shared/pages/portfolio-page/portfolio-page.component';

const routes: Routes = [
    // {
    //     path: '',
    //     component: HomePageComponent
    // },
    {
        path: 'about',
        component: AboutPageComponent
    },
    {
        path: 'services',
        component: ServicesPageComponent
    },
    {
        path: 'portfolio',
        component: PortfolioPageComponent
    },
    {
        path: 'contact',
        component: ContactPageComponent
    },
    {
        path: 'countries',
        // La propiedad 'loadChildren' se utiliza para cargar de forma perezosa el módulo de países. Esto significa que el módulo de países solo se cargará cuando se acceda a la ruta '/countries'. Esto puede mejorar el rendimiento de la aplicación al cargar solo los módulos necesarios en cada momento.
        loadChildren: () => import('./countries/countries.module').then( m => m.CountriesModule)
    },
    {
        path: '**',
        redirectTo: 'countries'
    }
]

// El método 'forRoot' se utiliza para configurar las rutas principales de la aplicación.

@NgModule({
    imports: [
        RouterModule.forRoot( routes )
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule { }
