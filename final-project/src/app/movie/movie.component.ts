import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit {
  type = ''
  id = ''
  url = ''
  username = ''
  review = ''
  rating : any;
  movies : any;
  movie : any;
  reviews: any;
  constructor(private route: ActivatedRoute, private http : HttpClient) { }

  ngOnInit(): void {
    this.type = this.route.snapshot.params['type']
    this.id = this.route.snapshot.params['id']
    if (this.type === 'trending') {
      this.url = 'http://localhost:4200/assets/data/trending-movies.json';
    }
    if (this.type === 'theatre') {
      this.url = 'http://localhost:4200/assets/data/theatre-movies.json';
    }
    if (this.type === 'popular') {
      this.url = 'http://localhost:4200/assets/data/popular-movies.json';
    }
    this.getMovie();
  }
  getMovie(){
    this.http.get(this.url).subscribe((movies) => {
      this.movies = movies
      let index = this.movies.findIndex(
        (movie: {id: string} ) => movie.id == this.id
      );
      if(index > -1){
        this.movie = this.movies[index]
        this.reviews = this.movies[index].reviews
      }
    })
  }
  addReview(){
      let newReview = {
        author : this.username,
        published_on: new Date(),
        review: this.review,
        rating: this.rating
      }
      this.reviews = [...this.reviews, newReview]
  }
}
