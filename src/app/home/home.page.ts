import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { HttpOptions } from '@capacitor/core';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { MyHttpService } from '../services/my-http-service.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule],
})

export class HomePage implements OnInit{
  /**
   * Setting variables and their types
   */
  countries!: any[];
  selectedCountry: any;
  countryName!: string;
  allCountriesURL!: string;
  countryUrl!: string;

  /**
   * Defining URL to query with HttpService
   * Sending header to prevent CORS where possible
   */
  options: HttpOptions = {
    url: "https://restcountries.com/v3.1/all",
    headers: {'Access-Control-Allow-Origin': '*'}
  }

  /**
   * 
   * @param mhs Http Service set, used for http queries
   * @param ds Data Service set, used for storing information 
   * @param router Set, used for moving between pages
   */
  constructor(private mhs: MyHttpService, private ds: DataService, 
    private router: Router) {}
  
  /**
   * Countries array created and getCountries method called on initialisaiton
   */  
  ngOnInit(){
      this.countries = [];
      this.getCountries();
  }

  /**
   * getCountries method makes http call to display countries in list on home page
   */
  async getCountries(){
    var result = await this.mhs.get(this.options);
    this.countries = result.data;
  }

  /**
   * setCountryDetails saves the country name to storage
   * Routes the user to the country page they picked
   * @param country Country name taken from option picked by user
   */
  async openCountryDetails(country: any){
    //cn is the key used to identify the country value picked by the user
    this.selectedCountry = country;
    this.ds.set('cn', this.selectedCountry.name.common);
    //Routers user to the country details page
    this.router.navigate(['/country-details']);
  }
}
