import { Injectable } from '@angular/core';
import { QueryEntity, QueryConfig, Order } from '@datorama/akita';
import { FixtureState, FixtureStore } from './fixtures.store';

@QueryConfig({
  sortBy: '',
  sortByOrder: Order.ASC
})

@Injectable({
  providedIn: 'root'
})
export class FixtureQuery extends QueryEntity<FixtureState> {

  selectAreFixturesLoaded$ = this.select(state => {
    console.log(state.areFixturesLoaded);
    return state.areFixturesLoaded;
  });

  constructor(protected override store: FixtureStore) {
    super(store);
  }
}