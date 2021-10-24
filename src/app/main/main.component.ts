import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter
} from '@angular/core';
import { CountryService } from '../country.service';
import { Country } from '../country';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  inputValue: string = '';
  allCountries!: Country[];
  filteredCountries: Country[] = [];
  regions: string[] = ['Africa', 'America', 'Asia', 'Europe', 'Oceania'];
  selectedRegion: string = '';

  @Input('darkTheme') darkTheme: boolean = false;
  @Output() countryEvent = new EventEmitter();
  @Output() infoEvent = new EventEmitter();

  selectedCountry: string = '';
  showInfo: boolean = false;
  countryToSend: any;

  constructor(private countryService: CountryService) {}

  ngOnInit(): void {
    this.getAllCountries();
    this.filterCountries();
  }

  selectRegion(event: any) {
    this.selectedRegion = event.target.value;
    this.filterCountries();
  }

  getAllCountries() {
    this.countryService.getAllCountries().subscribe((data) => {
      this.allCountries = data;
      this.filterCountries();
    });
  }

  filterCountries() {
    this.filteredCountries =
      this.inputValue === ''
        ? this.allCountries
        : this.allCountries.filter((country) => {
            this.inputValue =
              this.inputValue.charAt(0).toUpperCase() +
              this.inputValue.slice(1);
            return country.name.includes(this.inputValue);
          });

    this.regions.forEach((region) => {
      if (this.selectedRegion === region) {
        //console.log(this.selectedRegion);
        this.filteredCountries = this.allCountries.filter((country) => {
          return country.region.includes(region);
        });
        this.filteredCountries =
          this.inputValue === ''
            ? this.filteredCountries
            : this.filteredCountries.filter((country) => {
                this.inputValue =
                  this.inputValue.charAt(0).toUpperCase() +
                  this.inputValue.slice(1);
                return country.name.includes(this.inputValue);
              });
      }
    });
  }

  sendCountry(name: string) {
    this.countryService.getCountryInfo(name).subscribe((data) => {
      this.countryToSend = data;
      this.countryEvent.emit(this.countryToSend);
    });
  }
  sendShowInfo() {
    this.infoEvent.emit(this.showInfo);
  }
}
