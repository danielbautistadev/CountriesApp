import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, tap, map, of } from 'rxjs';
import { Country } from '../interfaces/country';

@Injectable({ providedIn: 'root' })

export class CountriesService {

    private apiUrl: string = 'https://restcountries.com/v3.1';

    constructor(private http: HttpClient) { }

    searchCapital( term: string ): Observable<Country[]> {
        const url: string = `${this.apiUrl}/capital/${term}`;
        return this.http.get<Country[]>( url )
            .pipe(
                // tap( countries => console.log("Tag1",countries) ),
                // map( countries => [] ),
                // tap( countries => console.log("Tag2",countries) )
                catchError( error => of([]))
            );
    }

    searchCountry( term: string ): Observable<Country[]> {
        const url: string = `${this.apiUrl}/name/${term}`;
        return this.http.get<Country[]>(url)
            .pipe(
                catchError( error => of([]) )
            )
    }

    searchRegion( region: string ): Observable<Country[]> {
        const url: string = `${this.apiUrl}/region/${region}`;
        return this.http.get<Country[]>(url)
            .pipe(
                catchError( error => of([]) )
            )
    }
    
}