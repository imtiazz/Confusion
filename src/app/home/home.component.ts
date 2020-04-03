import { Component, OnInit } from '@angular/core';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { Promotion } from '../shared/promotion';
import { PromotionService } from '../services/promotion.service';
import {Leader} from '../shared/leader';
import {FeaturedLeaderService} from '../services/featured-leader.service';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  dish:Dish;
  promotion:Promotion;
  featuredLeader:Leader;

  constructor(private dishservice: DishService,
    private promotionservice: PromotionService,
    private featuredLeaderService: FeaturedLeaderService ) { }

  ngOnInit() {
    this.dish = this.dishservice.getFeaturedDish();
    this.promotion = this.promotionservice.getFeaturedPromotion();
    this.featuredLeader=this.featuredLeaderService.getFeaturedLeader();
  }

}
