import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
import { Address } from 'ngx-google-places-autocomplete/objects/address';
import { WeatherService } from 'src/app/services/weather.service'

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.scss']
})
export class MainContentComponent implements OnInit {

  wth;
  checked = false;
  formattedAdress = '';
  todayNumber: number = Date.now();
  todayDate: string = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  @ViewChild("placesRef") placesRef : GooglePlaceDirective;

  constructor(private weather: WeatherService, private _snackBar: MatSnackBar) {}

  ngOnInit() {
    this.getWeather( 'Barcelona');
  }

  // functions
  public handleAddressChange(address: Address) {
    
}

  night(){
    if (this.todayDate >= '19:00' || this.todayDate < '07:00'){
          const menu = document.getElementById('menu');
          const searchBtn = document.getElementById('searchBtn');
          const input = document.getElementById('input');
          menu.style.color = "#fff";
          searchBtn.style.backgroundColor = "rgba(255, 255, 255, 0.25)";
          input.style.color = "#fff"
          return true
        }
    return false
        
  }

  getWeather(city: string) {
    this.weather.getWeather(city)
        .subscribe(
          res=> {
            this.wth = res},
          err => {
            if( err.status === 400){
              this.openSnackBar('You could not connect to the network', 'Close');
            }else if (err.status === 404 ) {
              this.openSnackBar('Try to specify the country code correctly', 'Close');
            }
          }
        );
  }

  searchWeather(city: HTMLInputElement) {
      this.getWeather(city.value);

      city.value = "";

      city.focus();

      return false;
    }


  clear() {
      if(this.wth.weather.main == 'Clear'){
        return true
      }
    }
  
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 4000,
    });
  }

}
  
