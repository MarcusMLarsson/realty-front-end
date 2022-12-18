import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Properties } from 'src/app/models/Properties';

@Injectable({
  providedIn: 'root',
})
export class PropertyService {
  public url: string;

  constructor(public http: HttpClient) {}

  property(topRight: string, bottomLeft: string): Observable<Properties[]> {
    this.url = `https://realty-back-end.azurewebsites.net/api/property?topRight=${topRight}&bottomLeft=${bottomLeft}`;

    return this.http.get<Properties[]>(this.url);
  }
}
