import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { Country } from '../country';
import { CountryService } from '../country.service';

@Component({
  selector: 'app-country-info',
  templateUrl: './country-info.component.html',
  styleUrls: ['./country-info.component.scss'],
})
export class CountryInfoComponent implements OnInit, OnChanges {
  @Input('clickedCountry') clickedCountry: any;
  @Input('showInfo') showInfo: any;
  @Input('darkTheme') darkTheme: boolean = false;
  country: any;
  currencies: any;
  languages: [string] = [''];
  borders: [string] = [''];
  allCountries!: Country[];
  found: [string] = [''];

  constructor(private service: CountryService) {}

  ngOnInit(): void {
    this.languages.shift();
    this.borders.shift();
    this.found.shift();
    this.getAllCountries();

  }
  ngOnChanges() {
    if (this.clickedCountry) {
      this.country = this.clickedCountry[0];
      //console.log(this.country);
      this.currencies = this.country['currencies'][0].name;
      this.country['languages'].forEach((ele: any) => {
        this.languages.push(ele.name);
      });

      if (this.country['borders']) {
        this.borders = this.country['borders'];

        this.country['borders'].forEach((ele: any) => {
          if (this.borders.length <= 2) {
            this.borders.push(ele);
          }
        });
      }
    }

    if(this.allCountries){
      this.foundBorders()
    }
  }

  /* keyvalue:0 TypeError resolver */
  returnZero(){
    return 0;
  }

  getAllCountries() {
    this.service.getAllCountries().subscribe((data) => {
      this.allCountries = data;
    });
  }

  foundBorders(){
    this.allCountries.find((country:any)=> {
      this.borders.forEach(border => {
        if(country.alpha3Code === border){
          this.found.push(country.name);
        }
      })
    })
  }
}
