import { Component, OnDestroy, OnInit } from '@angular/core';
import { Order } from '@datorama/akita';
import { filter, Observable, Subscription, switchMap } from 'rxjs';
import { Team } from '../interfaces/team';
import { FirebaseApiService } from '../services/firebase-api.service';
import { TeamQuery } from '../store/teams.query';
import { TeamState } from '../store/teams.store';

@Component({
  selector: 'app-league-table',
  templateUrl: './league-table.component.html',
  styleUrls: ['./league-table.component.css']
})
export class LeagueTableComponent implements OnInit, OnDestroy {

  isUpdateActivated = false;
  listTeamSub?: Subscription;
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
}
