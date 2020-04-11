import { Injectable } from '@angular/core';
import {Leader} from '../shared/leader';
//import {LEADERS} from '../shared/leaders';
import { HttpClient } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FeaturedLeaderService {

  constructor(private http: HttpClient) { }

  getFeaturedLeader(): Observable<Leader> {
    //return LEADERS.filter((feature) => (feature.featured))[0];
    //return this.http.get<Dish>(baseURL + 'dishes/' + id);
    return this.http.get<Leader[]>(baseURL+'leadership?featured=true').pipe(map(leaders=>leaders[0]));
   // return this.http.get<Dish[]>(baseURL + 'dishes?featured=true').pipe(map(dishes => dishes[0]));


  }
}
