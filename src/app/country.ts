export class Country {
  name: {
    common: string;
    official: string;
    nativeName?: {
      [key: string]: {
        official: string;
        common: string;
      };
    };
  } = { common: '', official: '' };
  officialName: string = '';
  flags: { [key: string]: string } = {};
  population: number = 0;
  region: string = '';
  subregion: string = '';
  capital: string = '';
  nativeName: { [key: string]: { official: string; common: string } } = {};
  topLevelDomain: string = '';
  currencies: { [code: string]: { name: string; symbol: string } } = {};
  languages: { [key: string]: string } = {};
  cca3: string = '';
  borders: string[] = [];
}
