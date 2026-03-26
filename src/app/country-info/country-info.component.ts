import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CountryService } from '../country.service';
import { Country } from '../country';

@Component({
  selector: 'app-country-info',
  templateUrl: './country-info.component.html',
  styleUrls: ['./country-info.component.scss'],
})
export class CountryInfoComponent implements OnInit {
  country!: Country;
  currencies: string = '';
  languages: string[] = [];
  borders: string[] = [];
  found: string[] = [];
  allCountries!: Country[];
  darkTheme: boolean = false;
  nativeName: string = '';

  constructor(
    private route: ActivatedRoute,
    private service: CountryService,
  ) {}

  ngOnInit(): void {
    const code = this.route.snapshot.paramMap.get('code');
    if (!code) return;

    // carica tutti i paesi per poter filtrare quello corretto
    this.service.getAllCountries().subscribe((data: Country[]) => {
      this.allCountries = data;
      this.country = data.find((c) => c.cca3 === code)!;
      if (this.country) this.processCountryData();
    });
  }

  processCountryData() {
    // currencies
    this.currencies = this.country.currencies
      ? Object.entries(this.country.currencies)
          .map(([code, cur]: [string, any]) => `${cur?.name || code} (${code})`)
          .join(', ')
      : 'N/A';

    // languages
    this.languages = this.country.languages
      ? Object.values(this.country.languages)
      : [];

    // borders
    this.borders = this.country.borders || [];

    // nomi dei paesi confinanti
    this.found = this.allCountries
      .filter((c) => this.borders.includes(c.cca3))
      .map((c) => c.name.common);

    // native name
    if (this.country.name.nativeName) {
      const firstKey = Object.keys(this.country.name.nativeName)[0];
      this.nativeName = this.country.name.nativeName[firstKey]?.official || '';
    }
  }
}
