import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CountriesService } from '../../services/countries.service';
import { switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-country-page',
  templateUrl: './country-page.component.html',
  styles: ``
})
export class CountryPageComponent implements OnInit {


  constructor( 
    private activatedRoute: ActivatedRoute,
    private countriesService: CountriesService,
    private router: Router ){ }

  ngOnInit(): void {

    this.activatedRoute.params
      // .subscribe ( ({ id }) => {
      //   this.searchCountry(id);
      // });
      // .subscribe( this.searchCountry );

      .pipe(
        // tap( console.log )
        switchMap( ({id}) => this.countriesService.searchCountryByAlphaCode( id ) )
      )
      .subscribe( country => {
        
        // console.log( {country} );
        if( !country ) {
          return this.router.navigateByUrl('');
        }

        console.log('Tenemos un país!!');
        return;
      });
    
  }

  // searchCountry( code: string) {
  //   this.countriesService.searchCountryByAlphaCode( code )
  //         .subscribe( country => {
  //           console.log( { country } );
  //         });
  // }
  // searchCountry( params: Params) {
  //   this.countriesService.searchCountryByAlphaCode( params['id'] )
  //     .subscribe( country => {
  //       console.log( { country } );
  //     });
  // }

  

}
