import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Fixture } from '../interfaces/fixture';
import { FirebaseApiService } from '../services/firebase-api.service';
import { FixtureStore } from '../store/fixtures.store';

@Component({
  selector: 'app-add-fixture',
  templateUrl: './add-fixture.component.html',
  styleUrls: ['./add-fixture.component.css']
})
export class AddFixtureComponent{

  createFixtureSub?: Subscription;

  constructor(private store: FixtureStore, private fixtureService: FirebaseApiService, private router: Router) { }


  onSubmit(submittedForm: { value: { homeTeam: string; awayTeam: string; }; invalid: any; }) {
    if (submittedForm.invalid) {
      return;
    }
    const fixture: Fixture = {id: "", homeTeam: submittedForm.value.homeTeam, awayTeam: submittedForm.value.awayTeam, homeScore: '0', awayScore: '0'};
    this.createFixtureSub = this.fixtureService.addFixture(fixture).subscribe(result => {
      this.router.navigateByUrl('/fixtures');
    });
  }

}
