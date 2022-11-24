import {Component,  OnInit} from '@angular/core';
import { favoriteMovieservice } from './app.servicesFavorite';
import { SearchComponent } from './app.componentSearch';
import {Observable} from "rxjs/Observable";
import { moviesearchservice } from  './app.servicesSearch';


@Component({
  templateUrl: './app.favorite.html',
  styleUrls: ['./app.component.css'],
  providers: [ favoriteMovieservice, SearchComponent,moviesearchservice ]
})

export class FavoriteComponent implements OnInit {
  favoriteMovieResult = [];
  genreResult;
  titleAlgin:string;
  showEdit = false;
  editRowId;
  isEdit;


  // Intialize constructor
  constructor(private favoriteMovieservice:favoriteMovieservice, private SearchComponent:SearchComponent){
  }

  // Intialize all movies on loading of page
  ngOnInit(){
    this.onGetMovie();
  }

  //convert Genre cords to string
  onGenre(allGenre){
   return (this.SearchComponent.onGenre(allGenre));
  };

  // Get all movies
  onGetMovie(){
    this.favoriteMovieservice
      .getFavMovies()
      .subscribe(movieNameResult => {
        for(let d of movieNameResult){
          this.favoriteMovieResult.push(d)};
      });
  }

  // Update movie
  OnUpdate( movieData){
   this.editRowId=0;
    const movie = {movie: movieData};

    this.favoriteMovieservice
      .updateMovie(movie,movieData.id).subscribe(
      data => {

          this.SearchComponent.messageSuccess(movieData.title + " movie is updated");
          console.log("Items updated in the list");
        },
        error => {
          console.error("Error saving movie!");
        }
      );
  }

  OnRemove(movie) {
    if (confirm("Are you sure you want to delete " + movie.title + "?")) {
      this.favoriteMovieservice
        .deleteMovie(movie.id)
        .subscribe(data =>{
            let index = this.favoriteMovieResult.indexOf(movie, 0);
            if (index > -1) {
              this.favoriteMovieResult.splice(index, 1);
            }
          this.SearchComponent.messageSuccess(movie.title + " movie is removed from the Favorite List");
          console.log("items deleted");
        },
        error => {
          console.log("Error in items deleted")
        });
    }
  }


}
