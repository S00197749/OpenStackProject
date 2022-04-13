import { Injectable } from '@angular/core';
import { Team } from '../interfaces/team';
import { ID, EntityStore, StoreConfig, EntityState } from '@datorama/akita';

export interface TeamState extends EntityState<Team, string> {
  areTeamsLoaded: boolean;
}

export function createInitialState(): TeamState {
  return {
    areTeamsLoaded: false
  };
}

@Injectable({
  providedIn: 'root'
})
@StoreConfig({ name: 'teams' })
export class TeamStore extends EntityStore<TeamState> {

    constructor() {
        super(createInitialState());
    }

    loadTeams(teams: Team[], areTeamsLoaded: boolean) {
      this.set(teams);
      console.log(teams)
      this.update(state => ({
        ...state,
        areTeamsLoaded
      }));
    }
}