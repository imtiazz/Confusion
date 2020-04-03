import { Component, OnInit } from '@angular/core';
import {LeaderService} from '../services/leader.service';
import {Leader} from '../shared/leader';
import {FeaturedLeaderService} from '../services/featured-leader.service';





@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  leaders:Leader[];
  featuredLeader:Leader;

  constructor(private leaderservice:LeaderService, private featuredLeaderService: FeaturedLeaderService ) { }

  ngOnInit() {
    this.leaders=this.leaderservice.getLeader();
    this.featuredLeader=this.featuredLeaderService.getFeaturedLeader();


  }

}
