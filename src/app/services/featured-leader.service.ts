import { Injectable } from '@angular/core';
import {Leader} from '../shared/leader';
import {LEADERS} from '../shared/leaders';

@Injectable({
  providedIn: 'root'
})
export class FeaturedLeaderService {

  constructor() { }

  getFeaturedLeader(): Leader {
    return LEADERS.filter((feature) => (feature.featured))[0];
  }
}
