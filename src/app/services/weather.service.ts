import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  URI: string = '';
  apiKey = 'INTRODUCE UR API KEY FROM OPEN WEATHER API';
  

  constructor(private http: HttpClient) {
  this.URI = `https://api.openweathermap.org/data/2.5/weather?&appid=${this.apiKey}&q=`
  }

  // functions
  getWeather(cityName: string) {
    return this.http.get(`${this.URI}${cityName}`);
  }
}
