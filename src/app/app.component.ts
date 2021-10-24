import { Component, OnInit } from '@angular/core';
import { CountryService } from './country.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'rest-countries-api';
  darkTheme: boolean = false
  countryInfo:any;
  showInfo: any;
  constructor(private countryService: CountryService){}

  ngOnInit(){ }

  isDarkTheme(val: boolean){
    this.darkTheme = val;
    return val;
  }

  loadCountryInfo(val: string) {
    this.countryInfo = val;
  }

  receiveShowInfo(val:boolean){
    this.showInfo = val;
  }
}
