import { Component, OnDestroy, OnInit } from '@angular/core';
import { Team } from '../interfaces/team';
import { filter, Observable, Subscription, switchMap, throwError } from 'rxjs';
import { TeamState } from '../store/teams.store';
import { TeamQuery } from '../store/teams.query';
import { FirebaseApiService } from '../services/firebase-api.service';
import { Order } from '@datorama/akita';

@Component({
  selector: 'app-team-list',
  templateUrl: './team-list.component.html',
  styleUrls: ['./team-list.component.css']
})
export class TeamListComponent implements OnInit, OnDestroy {

  teamToBeUpdated: Team | any;
  isUpdateActivated = false;
  listTeamSub?: Subscription;
  deleteTeamSub?: Subscription;
  updateTeamSub?: Subscription;
  pstate?: TeamState;

  teams$: Observable<Team[]> = this.teamQuery.selectAll({
       sortBy: 'points',
       sortByOrder: Order.DESC
     });

  allTeams?:Team[];

  constructor(private TeamService: FirebaseApiService, private teamQuery: TeamQuery) {
  }

  ngOnDestroy(): void {
    if(this.listTeamSub){
      this.listTeamSub.unsubscribe();
    }
    if(this.deleteTeamSub){
      this.deleteTeamSub.unsubscribe();
    }
    if(this.updateTeamSub){
      this.updateTeamSub.unsubscribe();
    }
  }

  ngOnInit() {
    this.listTeamSub = this.teamQuery.selectAreTeamsLoaded$.pipe(
      filter(areTeamsLoaded => !areTeamsLoaded),
      switchMap(areTeamsLoaded => {
        if(!areTeamsLoaded){
          return this.TeamService.getTeams();
        }else return '';
      })
    ).subscribe(result => {});
  }

  deleteTeam(id: string) {
    this.deleteTeamSub = this.TeamService.deleteTeam(id).subscribe(result => {
      console.log(result);
    });
  }

  getTeam(name: string) {
    this.deleteTeamSub = this.TeamService.getTeamsByName(name).subscribe(result => {
      console.log(result);
    });
  }

  showUpdateForm(team: Team) {
    this.isUpdateActivated = true;
    this.teamToBeUpdated = {...team};
  }

  updateTeam(updateForm: { value: Team; }) {
    var team = this.calculatePoints(updateForm.value)
    this.updateTeamSub = this.TeamService.updateTeam(
      this.teamToBeUpdated.id, team).subscribe(result => {
        console.log(result);
    });

    this.isUpdateActivated = false;
    this.teamToBeUpdated = null;    
  }

  calculatePoints(team: Team){
    var draws = Number(team.draws)
    var wins = Number(team.wins)
    var points= ((wins * 3) + draws)

    team.points = points.toString()
    return team;
  }

}
