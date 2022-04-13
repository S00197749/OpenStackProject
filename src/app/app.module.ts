import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import{ HttpClientModule }from'@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TeamListComponent } from './components/team-list/team-list.component';
import { AddTeamComponent } from './components/add-team/add-team.component';
import { RouterModule } from '@angular/router';
import { FixturesListComponent } from './components/fixtures-list/fixtures-list.component';
import { LeagueTableComponent } from './components/league-table/league-table.component';
import { AddFixtureComponent } from './components/add-fixture/add-fixture.component';

const routes = [
  {
    path: 'table',
    component: LeagueTableComponent
  },
  {
    path: 'teams',
    component: TeamListComponent
  },
  {path: 'add-team', component: AddTeamComponent},
  {path: 'add-fixture', component: AddFixtureComponent},
  {path: 'fixtures', component: FixturesListComponent},
  {path: '**', redirectTo: '/table'},
];

@NgModule({
  declarations: [
    AppComponent,
    TeamListComponent,
    AddTeamComponent,
    FixturesListComponent,
    LeagueTableComponent,
    AddFixtureComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
