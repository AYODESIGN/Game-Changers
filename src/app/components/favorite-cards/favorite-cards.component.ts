import { Component, OnInit } from '@angular/core';
import { CardLikeService } from 'src/app/services/card-like.service';
import jwt_decode from 'jwt-decode';


@Component({
  selector: 'app-favorite-cards',
  templateUrl: './favorite-cards.component.html',
  styleUrls: ['./favorite-cards.component.css']
})
export class FavoriteCardsComponent implements OnInit {
tokenDecoded:any;
  cards:any;
  cardIdArray:any;
  constructor(private cardLikeService:CardLikeService) { }

  ngOnInit() {
    const token = sessionStorage.getItem('jwt');
    if (token) {

       this.tokenDecoded = this.decodeToken(token)

    this.cardLikeService.getLikesForUser(this.tokenDecoded.userId).subscribe((response)=>{
      this.cards = response.userLikes
      console.log(response.userLikes)
      this.cardIdArray = this.cards.map(item => item.cardId);
      console.log(this.cardIdArray)
    })
  }

}

decodeToken(token: string) {
  return jwt_decode(token);
}
  }