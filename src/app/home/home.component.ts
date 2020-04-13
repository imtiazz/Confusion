import { Component, OnInit, Inject } from '@angular/core';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { Promotion } from '../shared/promotion';
import { PromotionService } from '../services/promotion.service';
import {Leader} from '../shared/leader';
import {FeaturedLeaderService} from '../services/featured-leader.service';
import { flyInOut } from '../animations/app.animation';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
    },
  animations: [
      flyInOut()
    ]
})
export class HomeComponent implements OnInit {

  dish:Dish;
  promotion:Promotion;
  featuredLeader:Leader;

  constructor(private dishservice: DishService,
    private promotionservice: PromotionService,
    private featuredLeaderService: FeaturedLeaderService,
    @Inject('BaseURL') private baseURL) { }

  ngOnInit() {

    //this.dish = this.dishservice.getFeaturedDish();
    //this.dishservice.getFeaturedDish().then(dish => this.dish=dish)
    this.dishservice.getFeaturedDish().subscribe(dish => this.dish=dish);
    // this.promotion = this.promotionservice.getFeaturedPromotion();
    //this.promotionservice.getFeaturedPromotion().then(promotion => this.promotion=promotion);
    this.promotionservice.getFeaturedPromotion().subscribe(promotion => this.promotion=promotion);
    //this.featuredLeader=this.featuredLeaderService.getFeaturedLeader();
    this.featuredLeaderService.getFeaturedLeader().subscribe(featuredLeader => this.featuredLeader=featuredLeader);
  }
}
