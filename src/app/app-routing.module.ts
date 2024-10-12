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
        loadChildren: () => import('./countries/countries.module').then( m => m.CountriesModule)
    },
    {
        path: '**',
        redirectTo: 'countries'
    }
]

@NgModule({
    imports: [
        RouterModule.forRoot( routes )
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule { }
