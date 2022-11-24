

import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import 'rxjs/add/operator/map';

@Injectable()
export class moviesearchservice{

  constructor (private http:Http){ }

  getGenre(){
    const genre = "https://api.themoviedb.org/3/genre/movie/list?api_key=43ce31ddc01cb6dd032b68cfe5c07088&language=en-US";
    return this.http.get(genre).map((response:Response) => response.json());
  }

  getMovie(movieName,num){
    const url='https://api.themoviedb.org/3/search/movie?api_key=43ce31ddc01cb6dd032b68cfe5c07088&language=en-US&query='+movieName+'&page='+num+'&include_adult=false';
    return this.http.get(url).map((response:Response) => response.json());
  }

}
