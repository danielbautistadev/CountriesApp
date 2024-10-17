import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HomePageComponent } from './pages/home-page/home-page.component';
import { AboutPageComponent } from './pages/about-page/about-page.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ContactPageComponent } from './pages/contact-page/contact-page.component';
import { ServicesPageComponent } from './pages/services-page/services-page.component';
import { PortfolioPageComponent } from './pages/portfolio-page/portfolio-page.component';
import { SearchBoxComponent } from './components/search-box/search-box.component';
import { NavigationBarComponent } from './components/navigationBar/navigation-bar.component';




@NgModule({
  declarations: [
    HomePageComponent,
    AboutPageComponent,
    SidebarComponent,
    ContactPageComponent,
    ServicesPageComponent,
    PortfolioPageComponent,
    SearchBoxComponent,
    NavigationBarComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    HomePageComponent,
    AboutPageComponent,
    ContactPageComponent,
    SidebarComponent,
    ServicesPageComponent,
    PortfolioPageComponent,
    SearchBoxComponent,
    NavigationBarComponent
  ]
})
export class SharedModule { }
