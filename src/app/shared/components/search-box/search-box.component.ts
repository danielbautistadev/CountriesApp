import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { debounceTime, Subject, Subscription } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles: ``
})
export class SearchBoxComponent implements OnInit, OnDestroy {

  private debouncer: Subject<string> = new Subject<string>();
  private debounceSuscription?: Subscription;

  @Input() 
  public placeholder: string = '';

  // @Output()
  // public onValue = new EventEmitter<string>();

  @Output()
  public onDebounce = new EventEmitter<string>();

  ngOnInit(): void {
    this.debounceSuscription = this.debouncer
    .pipe( debounceTime(300) )
    .subscribe( data => {
      // console.log('debouncer value', data);
      this.onDebounce.emit( data );
    } );
  }

  // public valueEmitter( term: string) {
  //   this.onValue.emit(term);
  // }

  ngOnDestroy(): void {
    this.debounceSuscription?.unsubscribe(); // 👈️ Evita fugas de memoria
  }

  onKeyPress( searchTerm: string) { 
    // console.log(searchTerm);
    // El método 'next' sirve para emitir un valor al Observable al que está suscrito el 'debouncer'
    this.debouncer.next(searchTerm); 
    
  }

}
