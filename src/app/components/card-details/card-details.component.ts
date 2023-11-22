import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CardServiceService } from 'src/app/services/card-service.service';

@Component({
  selector: 'app-card-details',
  templateUrl: './card-details.component.html',
  styleUrls: ['./card-details.component.css']
})
export class CardDetailsComponent implements OnInit {
  progress: number = 12;
  color: string = '#488aff';
  id: string;
  value: number = 9.090909090909091;
  card: any;
  defaultColor: string;
  topValue: number;
 bottomValue:number;
  rightValue:number;
  leftValue:number;
  overAll: number;
  showDescription: boolean = true;
cardBack:string;
roh: boolean = false; 
original: boolean = false; 
stars: boolean = false; 
actor: any;

  constructor(
    private cardService: CardServiceService,
    private activatedRoute: ActivatedRoute,
    private cdr: ChangeDetectorRef // Inject ChangeDetectorRef

  ) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.params.id;
    this.getCard(this.id);
  
    }

    toggleDescription() {
      this.showDescription = !this.showDescription;
    }

  getCard(id) {

    this.cardService.getCardById(id).subscribe((response) => {
      console.log(response.cards[0].top);
      this.card = response.cards[0];
      this.topValue = this.card.top ;
      this.bottomValue = this.card.bottom ;
      this.leftValue = this.card.left;
      this.rightValue = this.card.right ;
      this.overAll = (this.topValue + this.bottomValue + this.leftValue + this.rightValue);
      this.cdr.detectChanges();
      this.backCard()

    });

  }

  get topColor(): string {
  if (this.card && this.value !== undefined) {
    this.topValue = this.card.top * this.value;

    if (this.topValue >= 0 && this.topValue <= 20) {
      return '#CD7F32'; // Replace with the color you want
    } else if (this.topValue > 20 && this.topValue <= 35) {
      return '#628C0D'; // Replace with the color you want
    } else if (this.topValue > 35 && this.topValue <= 50) {
      return '#DE3163'; // Replace with the color you want
    } else if (this.topValue > 50 && this.topValue <= 65) {
      return '#014AC3'; // Replace with the color you want
    } else if (this.topValue > 65 && this.topValue <= 80) {
      return '#FFD700'; // Replace with the color you want
    } else if (this.topValue > 80 && this.topValue <= 90) {
      return '#FFA500'; // Replace with the color you want
    } else if (this.topValue > 90 && this.topValue <= 100) {
      return '#FF0000'; // Replace with the color you want
    } else {
      return '#800080'; // Replace with the color you want
    }
  } else {
    return this.defaultColor;
  }
}

  get bottomColor(): string {
    if (this.card && this.value !== undefined) {
      this.bottomValue = this.card.bottom * this.value;
  
      if (this.bottomValue >= 0 && this.bottomValue <= 20) {
        return '#CD7F32'; // Light Bronze
      } else if (this.bottomValue > 20 && this.bottomValue <= 35) {
        return '#628C0D'; // Dark Bronze
      } else if (this.bottomValue > 35 && this.bottomValue <= 50) {
        return '#DE3163'; // Light Silver
      } else if (this.bottomValue > 50 && this.bottomValue <= 65) {
        return '#014AC3'; // Dark Silver
      } else if (this.bottomValue > 65 && this.bottomValue <= 80) {
        return '#FFD700'; // Gold
      } else if (this.bottomValue > 80 && this.bottomValue <= 90) {
        return '#FFA500'; // Orange
      } else if (this.bottomValue > 90 && this.bottomValue <= 100) {
        return '#FF0000'; // Red
      } else {
        return '#800080'; // Purple
      }
      
    } else {
      return this.defaultColor;
    }
  }
  
  get rightColor(): string {
    if (this.card && this.value !== undefined) {
      this.rightValue = this.card.right * this.value;
      if (this.rightValue >= 0 && this.rightValue <= 20) {
        return '#CD7F32'; // Replace with the color you want
      } else if (this.rightValue > 20 && this.rightValue <= 35) {
        return '#628C0D'; // Replace with the color you want
      } else if (this.rightValue > 35 && this.rightValue <= 50) {
        return '#DE3163'; // Replace with the color you want
      } else if (this.rightValue > 50 && this.rightValue <= 65) {
        return '#014AC3'; // Replace with the color you want
      } else if (this.rightValue > 65 && this.rightValue <= 80) {
        return '#FFD700'; // Replace with the color you want
      } else if (this.rightValue > 80 && this.rightValue <= 90) {
        return '#FFA500'; // Replace with the color you want
      } else if (this.rightValue > 90 && this.rightValue <= 100) {
        return '#FF0000'; // Replace with the color you want
      } else {
        return '#800080'; // Replace with the color you want
      }
    } else {
      return this.defaultColor;
    }
  }
  
  get leftColor(): string {
    if (this.card && this.value !== undefined) {
      this.leftValue = this.card.left * this.value;
      if (this.leftValue >= 0 && this.leftValue <= 20) {
        return '#CD7F32'; // Replace with the color you want
      } else if (this.leftValue > 20 && this.leftValue <= 35) {
        return '#628C0D'; // Replace with the color you want
      } else if (this.leftValue > 35 && this.leftValue <= 50) {
        return '#DE3163'; // Replace with the color you want
      } else if (this.leftValue > 50 && this.leftValue <= 65) {
        return '#014AC3'; // Replace with the color you want
      } else if (this.leftValue > 65 && this.leftValue <= 80) {
        return '#FFD700'; // Replace with the color you want
      } else if (this.leftValue > 80 && this.leftValue <= 90) {
        return '#FFA500'; // Replace with the color you want
      } else if (this.leftValue > 90 && this.leftValue <= 100) {
        return '#FF0000'; // Replace with the color you want
      } else {
        return '#800080'; // Replace with the color you want
      }
    } else {
      return this.defaultColor;
    }
  }

  backCard(){
    console.log(this.card.collections)
    if (this.card.collections =='Stars') {
      this.cardBack = '../../../assets/images/SU.png'
      console.log(this.cardBack)
      this.stars = true 
      if (this.card.gender == 'F') {
        this.actor = 'Actress'
        
      }else 
      this.actor = 'Actor'
       }
        else if (this.card.collections =='Realms of Heroes') {
        this.cardBack = '../../../assets/images/RoH.png'
        console.log(this.cardBack)
        this.roh = true
  }
   else if (this.card.collections =='Original') {
    this.cardBack = '../../../assets/images/Original.png'
    console.log(this.cardBack)
    this.original = true
  }


}
}