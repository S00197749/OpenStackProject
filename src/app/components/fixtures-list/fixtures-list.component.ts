import { Component, OnDestroy, OnInit } from '@angular/core';
import { filter, Observable, Subscription, switchMap } from 'rxjs';
import { Fixture } from '../interfaces/fixture';
import { FirebaseApiService } from '../services/firebase-api.service';
import { FixtureQuery } from '../store/fixtures.query';
import { FixtureState } from '../store/fixtures.store';

@Component({
  selector: 'app-fixtures-list',
  templateUrl: './fixtures-list.component.html',
  styleUrls: ['./fixtures-list.component.css']
})
export class FixturesListComponent implements OnInit, OnDestroy {

  fixtureToBeUpdated: Fixture | any;
  isUpdateActivated = false;
  listFixtureSub?: Subscription;
  deleteFixtureSub?: Subscription;
  updateFixtureSub?: Subscription;
  pstate?: FixtureState;

  fixtures$: Observable<Fixture[]> = this.fixtureQuery.selectAll();

  allFixtures?:Fixture[];

  constructor(private FixtureService: FirebaseApiService, private fixtureQuery: FixtureQuery) {
  }

  ngOnDestroy(): void {
    if(this.listFixtureSub){
      this.listFixtureSub.unsubscribe();
    }
    if(this.deleteFixtureSub){
      this.deleteFixtureSub.unsubscribe();
    }
    if(this.updateFixtureSub){
      this.updateFixtureSub.unsubscribe();
    }
  }

  ngOnInit() {
    this.listFixtureSub = this.fixtureQuery.selectAreFixturesLoaded$.pipe(
      filter(areFixturesLoaded => !areFixturesLoaded),
      switchMap(areFixturesLoaded => {
        if(!areFixturesLoaded){
          return this.FixtureService.getFixtures();
        }else return '';
      })
    ).subscribe(result => {});
  }

  deleteFixture(id: string) {
    this.deleteFixtureSub = this.FixtureService.deleteFixture(id).subscribe(result => {
      console.log(result);
    });
  }

  showUpdateForm(team: Fixture) {
    this.isUpdateActivated = true;
    this.fixtureToBeUpdated = {...team};
  }

  updateFixture(updateForm: { value: Fixture; }) {
    this.updateFixtureSub = this.FixtureService.updateFixture(
      this.fixtureToBeUpdated.id, updateForm.value).subscribe(result => {
        console.log(result);
    });

    this.isUpdateActivated = false;
    this.fixtureToBeUpdated = null;
  }

}
