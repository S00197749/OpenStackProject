import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { Team } from '../interfaces/team';
import { FirebaseApiService } from '../services/firebase-api.service';
import { TeamStore } from '../store/teams.store';

@Component({
  selector: 'app-add-team',
  templateUrl: './add-team.component.html',
  styleUrls: ['./add-team.component.css']
})
export class AddTeamComponent {

  createTeamSub?: Subscription;

  constructor(private store: TeamStore, private teamService: FirebaseApiService, private router: Router) { }


  onSubmit(submittedForm: { value: { name: string; manager: string; year_est: any; }; invalid: any; }) {
    if (submittedForm.invalid) {
      return;
    }
    const team: Team = {id: "",name: submittedForm.value.name, manager: submittedForm.value.manager, year_est: submittedForm.value.year_est,
    wins: '0', losses: '0', draws: '0', points: '0'};
    this.createTeamSub = this.teamService.addTeam(team).subscribe(result => {
      this.router.navigateByUrl('/teams');
    });
  }

}
