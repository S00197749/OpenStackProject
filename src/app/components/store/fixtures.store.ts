import { Injectable } from '@angular/core';
import { ID, EntityStore, StoreConfig, EntityState } from '@datorama/akita';
import { Fixture } from '../interfaces/fixture';

export interface FixtureState extends EntityState<Fixture, string> {
    areFixturesLoaded: boolean;
}

export function createInitialState(): FixtureState {
  return {
    areFixturesLoaded: false
  };
}

@Injectable({
  providedIn: 'root'
})
@StoreConfig({ name: 'fixtures' })
export class FixtureStore extends EntityStore<FixtureState> {

    constructor() {
        super(createInitialState());
    }

    loadFixtures(fixtures: Fixture[], areFixturesLoaded: boolean) {
      this.set(fixtures);
      console.log(fixtures)
      this.update(state => ({
        ...state,
        areFixturesLoaded
      }));
    }
}