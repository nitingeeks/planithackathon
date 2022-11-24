import { Component, Input } from '@angular/core';
import { moviesearchservice } from  './app.servicesSearch';
import { favoriteMovieservice } from './app.servicesFavorite';
import {Observable} from "rxjs/Observable";
import { FlashMessagesService } from 'ngx-flash-messages';

@Component({
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ moviesearchservice, favoriteMovieservice ]
})

export class SearchComponent {
  searchText:string;
  movieNameResult = [];
  genreResult;
  totalPages;
  favoriteMovieAdded;
  show = false;
  num = 1;

  // Intialize constructor
  constructor(private moviesearchservice:moviesearchservice,private favoriteMovieservice:favoriteMovieservice,private FlashMessagesService: FlashMessagesService){
    this.moviesearchservice
      .getGenre()
      .subscribe(movieNameResult => {
        this.genreResult = movieNameResult.genres;
      });
  }

  messageSuccess(text) {
    this.FlashMessagesService.show(text, {
      classes: ['alert', 'alert-success'],
      timeout: 3000, // Default is 3000
    });
  }

  // For infinte scrolling
  onScroll () {
    this.num ++;
    console.log(this.num);
    this.show = true;
    this.OnSearch();
  }



  // Search from the app.Search Services
  OnSearch(){
    this.show = true;
    this.moviesearchservice
      .getMovie(this.searchText,this.num)
      .subscribe(movieNameResult => {
        for(let d of movieNameResult.results){ this.movieNameResult.push(d)};
        this.totalPages = movieNameResult.total_pages;
      });
  }


  // For adding favorite movie to favorite page
  OnFavorite(movieData){
    let movie = {movie: movieData};
    this.favoriteMovieservice
      .createMovie(movie)
        .subscribe(data =>{
            // Send message to the browser
            this.messageSuccess(movieData.title + " Movie is added in the Favorite List");
          },
          error => {
            console.log("Error in items Deleted")
          });

  }

  // Search from genre Api
  onGenre(allGenre) {
    let arr = [];
    for (let genre of allGenre){
      for (let i= 0; i < this.genreResult.length; i++){
        if ( this.genreResult[i].id == genre ){
          arr.push(this.genreResult[i].name);
        }
      }
    }
    return arr;
  }
}
