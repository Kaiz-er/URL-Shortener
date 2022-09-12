import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as Constants from '../helpers/constants';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ShortenerService {
  constructor(private http: HttpClient) {}

  outputUrl = '';

  createShortUrl(longUrl: any): Observable<any> {
    const req = {
      url: longUrl,
    };
    return this.http.post(environment.endpoint + Constants.URL_MAP_PATH, req);
  }
}
