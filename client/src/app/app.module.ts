import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {  RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { InfiniteScrollModule } from 'angular2-infinite-scroll';
import { NotFound } from './app.componentNotFound';
import { SearchComponent } from './app.componentSearch';
import { FavoriteComponent } from './app.componentFavorite';
import { FlashMessagesModule } from 'ngx-flash-messages';

const appRoutes: Routes = [
  { path: 'search', component: SearchComponent },
  { path: '', redirectTo: 'search', pathMatch: 'full' },
  { path: 'favorite', component: FavoriteComponent },
  { path: '**', component: NotFound }
];

@NgModule({
  declarations: [ AppComponent, SearchComponent, FavoriteComponent,NotFound ],
  imports: [ RouterModule.forRoot(appRoutes),BrowserModule, FormsModule, HttpModule, InfiniteScrollModule , FlashMessagesModule ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
