import { Component, OnInit,Inject } from '@angular/core';
import { Dish } from '../shared/dish';
//import { DISHES } from '../shared/dishes';
import { DishService } from '../services/dish.service';
import { flyInOut } from '../animations/app.animation';



@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
    },
    animations: [
      flyInOut()
    ]
})

export class MenuComponent implements OnInit {

  dishes: Dish[];
  errMess: string;

  //selectedDish: Dish;

 
  
  constructor(private dishservice:DishService, 
    @Inject('BaseURL') private baseURL) { }

  ngOnInit() {
    
    // this.dishservice.getDishes()
    //   .then(dishes => this.dishes = dishes);
    this.dishservice.getDishes().subscribe(dishes => this.dishes=dishes,
      errmess => this.errMess = <any>errmess);
  }

  //  onSelect(dish: Dish) {
  //   this.selectedDish = dish;
  // }
}
