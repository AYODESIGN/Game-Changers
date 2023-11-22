import { Component, OnInit } from '@angular/core';
import { CardServiceService } from 'src/app/services/card-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  cards: any[];
  constructor(    private cardSevice: CardServiceService
    ) { }

  ngOnInit() {
    this.getCards()
  }

  getCards() {
    this.cardSevice.getLimitedCards().subscribe((response) => {
      console.log(response);
      this.cards = response.cards;
      
    });
  }

}
