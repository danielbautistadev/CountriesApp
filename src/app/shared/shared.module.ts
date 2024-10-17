import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AboutPageComponent } from './pages/about-page/about-page.component';
import { ContactPageComponent } from './pages/contact-page/contact-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { NavigationBarComponent } from './components/navigationBar/navigation-bar.component';
import { PortfolioPageComponent } from './pages/portfolio-page/portfolio-page.component';
import { SearchBoxComponent } from './components/search-box/search-box.component';
import { ServicesPageComponent } from './pages/services-page/services-page.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';




@NgModule({
  declarations: [
    AboutPageComponent,
    ContactPageComponent,
    HomePageComponent,
    LoadingSpinnerComponent,
    NavigationBarComponent,
    PortfolioPageComponent,
    SearchBoxComponent,
    ServicesPageComponent,
    SidebarComponent,
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    AboutPageComponent,
    ContactPageComponent,
    HomePageComponent,
    LoadingSpinnerComponent,
    NavigationBarComponent,
    PortfolioPageComponent,
    SearchBoxComponent,
    ServicesPageComponent,
    SidebarComponent,
  ]
})
export class SharedModule { }
