import { Injectable } from '@angular/core';
import { TeamStore, TeamState } from './teams.store';
import { QueryEntity, QueryConfig, Order } from '@datorama/akita';

@QueryConfig({
  sortBy: 'points',
  sortByOrder: Order.ASC
})

@Injectable({
  providedIn: 'root'
})
export class TeamQuery extends QueryEntity<TeamState> {

  selectAreTeamsLoaded$ = this.select(state => {
    console.log(state.areTeamsLoaded);
    return state.areTeamsLoaded;
  });

  constructor(protected override store: TeamStore) {
    super(store);
  }
}