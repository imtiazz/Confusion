import { Component, OnInit, Inject } from '@angular/core';
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

  constructor(private leaderservice:LeaderService, private featuredLeaderService: FeaturedLeaderService,
    @Inject('BaseURL') private baseURL ) { }

  ngOnInit() {
    // this.leaders=this.leaderservice.getLeader();
    //this.leaderservice.getLeader().then(leaders => this.leaders=leaders);
    this.leaderservice.getLeader().subscribe(leaders => this.leaders=leaders);
   // this.featuredLeader=this.featuredLeaderService.getFeaturedLeader();
  }

}
