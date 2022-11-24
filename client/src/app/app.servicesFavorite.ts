import { Injectable, Inject } from "@angular/core";
import {  Http, Response, Headers, RequestOptions } from "@angular/http";
import 'rxjs/add/operator/map';
import {Observable} from "rxjs/Observable";

@Injectable()
export class favoriteMovieservice{

  url =  "http://localhost:4500/favorite/";

  constructor (public http: Http){
  }

  getFavMovies(){
    return this.http.get(this.url).map((response:Response) => response.json());
  }

  createMovie(movie){
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.url, movie, headers)
  }

  updateMovie(movie, movieID) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    console.log(this.url + movieID);
    console.log(movie);
    return this.http.put(this.url + movieID, movie, headers);
  }

  deleteMovie(movieId) {
    return this.http.delete(this.url+ movieId);
  }
}
