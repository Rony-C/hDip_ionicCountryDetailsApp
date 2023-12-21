import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HttpOptions } from '@capacitor/core';
import { MyHttpService } from '../services/my-http-service.service';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-country-details',
  templateUrl: './country-details.page.html',
  styleUrls: ['./country-details.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule],
})
export class CountryDetailsPage implements OnInit {

  /**
   * Setting variables and their types
   * 
   */
  countries: any[] = [];
  languages: any[] = [];
  countryName!: string;
  countryUrl!: string;

  weather!: any;
  firstCurrency!: any;
  disabled: boolean = true;
  hidden: boolean = true;

  latitude!: string;
  longitude!: string;
  /**
   * Storing weather API key as a variable
   */
  weatherApiKey: string = "MJMYVAWEL4WAZBYXCRW739ANY";

  inputValue!: number;
  conversionResult!: number;
  currency!: any;
  /**
   * Storing currency API key as a variable
   */
  currencyApiKey: string = "0a905d8cb5414b498c2f1bf7";

  /**
   * Setting URLs for each Http call that needs to be made
   */
  countryOptions: HttpOptions = {
    url: "https://restcountries.com/v3.1/name/",
  };
  weatherOptions: HttpOptions = {
    url: "",
  };
  currencyOptions: HttpOptions = {
    url: "",
  }

  constructor(private mhs: MyHttpService, private ds: DataService) { }

  /**
   * Setting the initial input value to 0
   * Calling getCountryDetails on initialisation
   */
  ngOnInit() {
    this.inputValue = 0;
    this.getCountryDetails();
  }

  /**
   * Get weather details from API call using information from other HTTP calls
   */
  public async getWeatherDetails() {
    this.weatherOptions.url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${this.latitude},${this.longitude}?key=${this.weatherApiKey}`;

    var result = await this.mhs.get(this.weatherOptions);
    this.weather = result.data;
    }

  /**
   * Get currency and conversion details from API call
   */
  public async getCurrencyDetails() {
    const currencyCode = this.saveCurrencyCode(this.countries);
      this.currencyOptions.url = `https://v6.exchangerate-api.com/v6/${this.currencyApiKey}/pair/${currencyCode}/EUR/${this.inputValue}`;

      var result = await this.mhs.get(this.currencyOptions);
      this.currency = result.data;
      this.conversionResult = this.currency.conversion_result;
  }

  /**
   * Saves the currency code for the country select by the user and returns it
   * @param countries 
   * @returns Currency code for the country selected by user
   */
  private saveCurrencyCode(countries: any[]): string {
    const currencies = countries[0]?.currencies || {};
    return Object.keys(currencies)[0] || '';
  }

  /**
   * Gets country details based on name stored under key cn
   * Appends the value of cn to the country URL to get country information
   * Uses this information in subsequent API calls
   */
  public async getCountryDetails() {
    this.countryName = await this.ds.get("cn");

      this.countryOptions.url = this.countryOptions.url.concat(this.countryName);

      var result = await this.mhs.get(this.countryOptions);
      this.countries = result.data;

      this.latitude = result.data[0].latlng[0];
      this.longitude = result.data[0].latlng[1];

      this.firstCurrency = result.data[0].currencies[0];

      this.getWeatherDetails();
  }

  /**
   * Linked to button click to show the converted amount to the user
   */
  convertToEuro() {
    this.hidden = false;
    this.getCurrencyDetails();
  }

  /**
   * Used to get the names of each language a country has
   * @param obj Languages object from country response
   * @returns the value of the object, a countries languages
   */
  getObjectValues(obj: any): string[] {
    return Object.values(obj);
  }
  
  /**
   * Used to get the key, currency code, of the first currency of a country
   * @param obj Currency object from country response
   * @returns the first currency code
   */
  getObjectKeys(obj: any): string[] {
    return Object.keys(obj);
  }
}
