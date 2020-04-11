import { Injectable } from '@angular/core';
import { Promotion } from '../shared/promotion';
import { PROMOTIONS } from '../shared/promotions';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';



@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  constructor(private http: HttpClient) { }

   getPromotions(): Observable<Promotion[]> {
    //return of(PROMOTIONS).pipe(delay(2000));
    return this.http.get<Promotion[]>(baseURL + 'promotions');

  }

  getPromotion(id: string):Observable< Promotion> {
   // return of(PROMOTIONS.filter((promo) => (promo.id === id))[0]).pipe(delay(2000));
   return this.http.get<Promotion>(baseURL + 'promotions/' + id);
    
  }

  getFeaturedPromotion(): Observable<Promotion> {
    //return of(PROMOTIONS.filter((promotion) => promotion.featured)[0]).pipe(delay(2000));
    //return this.getDishes().pipe(map(dishes => dishes.map(dish => dish.id)));
    return this.http.get<Promotion[]>(baseURL + 'promotions?featured=true').pipe(map(promotions => promotions[0]));
  
    
  }
}
