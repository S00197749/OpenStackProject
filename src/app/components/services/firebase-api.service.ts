import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Team } from '../interfaces/team';
import { Observable, throwError } from 'rxjs';
import { retry, catchError, tap } from 'rxjs/operators';
import { TeamStore } from '../store/teams.store';
import { FixtureStore } from '../store/fixtures.store';
import { Fixture } from '../interfaces/fixture';

@Injectable({
  providedIn: 'root'
})
export class FirebaseApiService {

  apiURL = 'https://us-central1-football-league-ls.cloudfunctions.net';
  
  teamStore: TeamStore;
  fixtureStore: FixtureStore;

  constructor(private http: HttpClient, teamStore: TeamStore, fixtureStore: FixtureStore) { 
    this.http = http,
    this.teamStore = teamStore;
    this.fixtureStore = fixtureStore;
  }

  httpOption = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  getTeams(): Observable<Team[]>{
    return this.http.get<Team[]>(this.apiURL + '/getTeams?sortBy=points', {responseType: 'json'})
    .pipe(
      tap(teams=>this.teamStore.loadTeams(teams, true)),
      retry(1),
      catchError(this.handleError)     
    );
  }

  getTeamsByName(name: string): Observable<Team[]>{    
    return this.http.get<Team[]>(this.apiURL + '/getTeamsByName?name=' + name)
    .pipe(
      tap(teams=>this.teamStore.loadTeams(teams, true)),
      retry(1),
      catchError(this.handleError)
    );
  }
 
  addTeam(newTeam: Team): Observable<Team>{
    return this.http.post<Team>(this.apiURL + '/addTeam?name=' + newTeam.name + '&manager=' 
    + newTeam.manager + '&year_est=' + newTeam.year_est + '&wins=' + newTeam.wins
    + '&losses=' + newTeam.losses + '&draws=' + newTeam.draws + '&points=' + newTeam.points, null)
    .pipe(
      tap(team => {
        this.teamStore.add([team])
      }),
      retry(1),
      catchError(this.handleError)
    )
  }

  deleteTeam(id:string): Observable<Team>{
    return this.http.delete<Team>(this.apiURL + '/deleteTeam?id=' + id)
    .pipe(
      tap(result => {
        this.teamStore.remove(id)
      }),
      retry(1),
      catchError(this.handleError)
    )
  }

  updateTeam(id: string, team: Team): Observable<any>{
    return this.http.put(this.apiURL + '/updateTeam?id=' + id + '&name=' + team.name + '&manager=' 
    + team.manager + '&year_est=' + team.year_est + '&wins=' + team.wins
    + '&losses=' + team.losses + '&draws=' + team.draws + '&points=' + team.points, null)
    .pipe(
      tap(result => {
        this.teamStore.update(id, team)
      }),
      retry(1),
      catchError(this.handleError)
    )
  }

  getFixtures(): Observable<Fixture[]>{
    return this.http.get<Fixture[]>(this.apiURL + '/getFixtures?sortBy=homeTeam')
    .pipe(
      tap(fixtures=>this.fixtureStore.loadFixtures(fixtures, true)),
      retry(1),
      catchError(this.handleError)
    );
  }

  addFixture(fixture: Fixture): Observable<Fixture>{
    return this.http.post<Fixture>(this.apiURL + '/addFixture' + '?homeTeam=' 
    + fixture.homeTeam + '&awayTeam=' + fixture.awayTeam + '&homeScore=' + fixture.homeScore
    + '&awayScore=' + fixture.awayScore, null)
    .pipe(
      tap(result => {
        this.fixtureStore.add([fixture])
      }),
      retry(1),
      catchError(this.handleError)
    )
  }

  deleteFixture(id:string): Observable<Fixture>{
    return this.http.delete<Fixture>(this.apiURL + '/deleteFixture?id=' + id)
    .pipe(
      tap(result => {
        this.fixtureStore.remove(id)
      }),
      retry(1),
      catchError(this.handleError)
    )
  }

  updateFixture(id: string, fixture: Fixture): Observable<Fixture>{
    console.log(id);
    console.log(fixture);
    return this.http.put<Fixture>(this.apiURL + '/updateFixture?id=' + id + '&homeTeam=' 
    + fixture.homeTeam + '&awayTeam=' + fixture.awayTeam + '&homeScore=' + fixture.homeScore
    + '&awayScore=' + fixture.awayScore, null)
    .pipe(
      tap(result => {
        this.fixtureStore.update(id, fixture)
      }),
      retry(1),
      catchError(this.handleError)
    )
  }

  handleError(error: { error: { message: string; }; status: any; message: any; }){
    let errorMessage = '';
    if(error.error instanceof ErrorEvent){
      errorMessage = error.error.message;
    }else{
      errorMessage =  `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
}
