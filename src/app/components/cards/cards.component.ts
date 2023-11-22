import { CardLikeService } from './../../services/card-like.service';
import { ChangeDetectorRef, Component, HostListener, Input, OnInit } from '@angular/core';
import { CardServiceService } from 'src/app/services/card-service.service';
import { FormBuilder, FormGroup ,ReactiveFormsModule} from '@angular/forms';
import jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';
import { CardRatingService } from 'src/app/services/card-rating.service';





@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit {
  @Input() cards : any
  formGender: FormGroup;
  originalCards: any[]; // Store the original data
  country: string[] = [];


  currentUrl:string;
  filterMale: boolean = false; // Track the male filter
  filterFemale: boolean = false; // Track the female filter
  // Inside your component
  likes: any;
  like:any;
  userId:any
  selectedRatings: { [cardId: string]: number } = {};
  cardCounts: { [cardId: string]: number } = {}; // Add this line
  averageRatings: { [cardId: string]: number } = {};
  filterByMostRated: boolean = false;
filterByLeastRated: boolean = false;
filterByMostLiked: boolean = false;
filterByLeastLiked: boolean = false;
allLikes:any
 likesAggregation: { [cardId: string]: number } = {};
 main: any
 sub: any
 selectedMain: string | null = null;
 selectedSub: string | null = null;
 admin: boolean = false;
  user: boolean = false;
  decodedToken: any;
rom: boolean = false;
originals: boolean = false;
stars: boolean = false;
filterSS: boolean = false;
filterS: boolean = false;
filterA: boolean = false;
filterB: boolean = false;
filterC: boolean = false;
filterForm: FormGroup;

public showScrollButton: boolean = false;




  constructor(
    private cardService: CardServiceService,
    private cardLikeService:CardLikeService,
    private router: Router,
    private cardRating : CardRatingService,
    private formBuilder: FormBuilder, // Add this line
    private changeDetectorRef: ChangeDetectorRef

  ) {}

  ngOnInit() {
    const token = sessionStorage.getItem('jwt');  
    if (token) {
      const decodedToken: any = jwt_decode(token);
      this.userId = decodedToken.userId;

       }
       this.isLoggedIn()
    this.currentUrl = window.location.pathname;
    console.log(this.currentUrl);

    if (this.currentUrl == '/cards/rom') {
      this.getCards('Realms of Heroes')
      this.rom =true
    } else if (this.currentUrl == '/cards/originals') {
      this.getCards('Original')
      this.originals = true
      console.log("Original")
    } else if (this.currentUrl == '/cards/stars') {
      this.getCards('Stars')
      this.stars = true
      console.log("stars")
    }
    

    this.getUserLikes()

    this.getAllLikes()
    this.filterForm = this.formBuilder.group({
      country: [''],
      // Add other filter controls as needed
    });
  }

  getAllLikes(){
    this.cardLikeService.getAllLikes().subscribe((response)=>{
      this.allLikes = response.likes;
      console.log("all likes",this.allLikes)
    })
  }

  getUserLikes(){
    this.cardLikeService.getLikesForUser(this.userId).subscribe((response) => {
      // Update the specific card's like status in the 'likes' object
      this.likes = response
      this.calculateLikesForCards() 
      console.log(response)
    });


  }


  isLiked(cardId: string): boolean {
    // Check if the cardId exists in the 'likes' object
    return this.likes && this.likes.userLikes.some(like => like.cardId._id === cardId && like.liked === true);
  }
  

  // Function to handle liking/unliking a card
toggleLike(cardId: string) {
  this.cardLikeService.toggleLike(cardId, this.userId).subscribe((response) => {
    console.log(cardId);
    this.getAllLikes();
    this.getUserLikes()

  });

  }
  
// Function to handle liking/unliking a card

  getCards(collection) {
    console.log(collection)
    this.cardService.getCardsByCollection(collection).subscribe((response) => {
      console.log(response);
      this.originalCards = response.cards; // Store the original data
      this.cards = this.originalCards.slice(); // Make a copy for filtering
      this.main = Array.from(new Set(this.cards.map(card => card.main)));
      console.log(this.main)
      this.sub = Array.from(new Set(this.cards.map(card => card.sub)));
      console.log(this.sub)
      if (this.originals) {
        this.country = Array.from(new Set(this.cards.map(card => card.country)));
        console.log(this.country)

      }
      this.calculateLikesForCards()

    this.getAverageRatings();


    });
  }

  sortCardsDesc(): void {
    this.cards = this.cards.sort((a, b) => a.rank - b.rank);
  }

  sortCardsAsc() {
    this.cards = this.cards.sort((a, b) => b.rank - a.rank);
  }

 filterRanks() {
    // Filter data based on filter variables
    this.cards = this.originalCards.filter(card => {
     // Map the numerical rank to the corresponding string rank
     const rankString = this.mapRankToString(card.rank);
  
      // Check if any rank filter is selected
      const rankFilterSelected =
        this.filterSS || this.filterS || this.filterA || this.filterB || this.filterC;
  
      // Check if the card's rank matches any selected rank filters
      const rankMatches = (
        (this.filterSS && rankString === 'SS') ||
        (this.filterS && rankString === 'S') ||
        (this.filterA && rankString === 'A') ||
        (this.filterB && rankString === 'B') ||
        (this.filterC && rankString === 'C')
      );
  
      if (this.originals) {
        // Additional conditions for other filters
        const mainMatches = !this.selectedMain || card.main === this.selectedMain;
        const subMatches = !this.selectedSub || card.sub === this.selectedSub;
        const countryMatches = !this.filterForm.value.country || card.country === this.filterForm.value.country;
  
        const genderMatches = (!this.filterMale || card.gender === 'M') && (!this.filterFemale || card.gender === 'F');
  
        // Return true only if all conditions are met
        return rankFilterSelected ? rankMatches && mainMatches && subMatches && countryMatches && genderMatches : mainMatches && subMatches && countryMatches && genderMatches;
      } else {
        // Additional conditions for other filters
        const mainMatches = !this.selectedMain || card.main === this.selectedMain;
        const subMatches = !this.selectedSub || card.sub === this.selectedSub;
        const genderMatches = (!this.filterMale || card.gender === 'M') && (!this.filterFemale || card.gender === 'F');
  
        // Return true only if all conditions are met
        return rankFilterSelected ? rankMatches && mainMatches && subMatches && genderMatches : mainMatches && subMatches && genderMatches;
      }
    });
  }
  
  
  

mapRankToString(rank: number): string {
  if (rank >= 33) {
    return 'SS';
  } else if (rank > 30) {
    return 'S';
  } else if (rank > 24) {
    return 'A';
  } else if (rank > 19) {
    return 'B';
  } else if (rank >= 15) {
    return 'C';
  } else {
    return 'Unknown';
  }
}

  
  

 viewCard(id){
    this.router.navigate([`/card-details/${id}`]);

  }

  onRatingChange(cardId: string, rating: number) {
    this.selectedRatings[cardId] = rating;
    this.cardRating.addOrUpdateRating(cardId, this.userId, rating).subscribe((response) => {
      // Update the user's rating
      console.log(response);
      this.getAverageRatings(); // Recalculate average ratings
    });
  }


  getAverageRatings() {
  this.cardRating.getAllRatings().subscribe((response) => {
    const ratings = response.ratings;

    const cardRatings = {}; // To store ratings for each card
    this.cardCounts = {}; // To store the count of ratings for each card

    // Calculate average ratings
    ratings.forEach((rating) => {
      if (!cardRatings[rating.cardId]) {
        cardRatings[rating.cardId] = 0;
        this.cardCounts[rating.cardId] = 0;
      }

      cardRatings[rating.cardId] += rating.rating;
      this.cardCounts[rating.cardId]++;
    });
console.log(this.cards)
    // Include cards without ratings
    this.cards.forEach((card) => {
      if (!cardRatings[card._id]) {
        cardRatings[card._id] = 0;
        this.cardCounts[card._id] = 0;
      }
    });

    Object.keys(cardRatings).forEach((cardId) => {
      this.averageRatings[cardId] = this.cardCounts[cardId] > 0
        ? cardRatings[cardId] / this.cardCounts[cardId]
        : 0; // Set to 0 if there are no ratings

      console.log(this.averageRatings[cardId]);
    });

    // Update the cards array with the calculated average ratings
    this.cards = this.cards.map((card) => ({
      ...card,
      averageRating: this.averageRatings[card._id] || 0,
    }));

 
  });
}


  filteredByMain() {
    let filteredCards = this.originalCards.slice(); // Use this.originalCards as the base for filtering
  
    // Apply main filter
    if (this.selectedMain) {
      filteredCards = filteredCards.filter(card => card.main === this.selectedMain);
      this.updateSelectedSub(this.selectedMain);
    }
  
    this.cards = filteredCards;
  }
  
  updateSelectedSub(main: string) {
    if (main) {
      // Filter the unique subs for the selected main
      const subsForMain = Array.from(new Set(this.originalCards
        .filter(card => card.main === main)
        .map(card => card.sub)
      ));
  
      // If subsForMain is not empty, set the selectedSub to the first sub
      this.sub = subsForMain
    
  }
}
  
  filteredBySub() {
    let filteredCards = this.originalCards.slice(); // Use this.originalCards as the base for filtering
  
    // Apply main filter
    if (this.selectedMain) {
      filteredCards = filteredCards.filter(card => card.main === this.selectedMain);
    }
  
    // Apply sub filter
    if (this.selectedSub) {
      filteredCards = filteredCards.filter(card => card.sub === this.selectedSub);
    }
  
    this.cards = filteredCards;
    console.log(this.cards)
  }

  filterByCountry() {
    // Filter data based on filter variables
    this.cards = this.originalCards.filter(card => {
      const countryFilter =
        (!this.filterForm.value.country || card.country === this.filterForm.value.country) &&
        (!this.selectedMain || card.main === this.selectedMain) &&
        (!this.selectedSub || card.sub === this.selectedSub);
  
      return countryFilter;
      // Adjust the filtering logic based on your specific needs
    });
  
    this.changeDetectorRef.detectChanges();
  }
  
  resetFilters() {
    // Reset other filters if needed
    if (this.currentUrl == '/cards/rom') {
      this.getCards('Realms of Heroes');
      this.rom = true;
    } else if (this.currentUrl == '/cards/originals') {
      this.getCards('Original');
      this.originals = true;
      console.log("Original");
    } else if (this.currentUrl == '/cards/stars') {
      this.getCards('Stars');
      this.stars = true;
      console.log("stars");
    }
  
    this.filterMale = false;
    this.filterFemale = false;
    this.selectedMain = null;
    this.selectedSub = null;
    // this.filterForm.value.country = 'Select Country';
    this.filterSS = false;
    this.filterS = false;
    this.filterA = false;
    this.filterB = false;
    this.filterC = false;
  }
  

  filterByGender(gender: string) {
    if (gender === 'M') {
      this.filterMale = true;
      this.filterFemale = !this.filterMale;
    } else if (gender === 'F') {
      this.filterMale = false;
      this.filterFemale = !this.filterMale;
    } else {
      // Handle any other logic if needed
    }
    

    this.filterData();
  }  

 
  filterData() {
    // Filter data based on filter variables
    const filteredCards = this.originalCards.filter(card => {
      const genderFilter = 
        (!this.filterMale || card.gender === 'M') &&
        (!this.filterFemale || card.gender === 'F');
  
      const countryFilter =
        (!this.filterForm.value.country || card.country === this.filterForm.value.country) &&
        (!this.selectedMain || card.main === this.selectedMain) &&
        (!this.selectedSub || card.sub === this.selectedSub);
  
      return genderFilter && countryFilter;
      // Adjust the filtering logic based on your specific needs
    });
  
    // Update the displayed cards with the filtered results
    this.cards = filteredCards.slice();
    console.log(this.cards);
  }
  
  
   
  applyFilters() {
    if (this.filterByMostRated) {
      this.sortCardsByRatingDesc();
    } else if (this.filterByLeastRated) {
      this.sortCardsByRatingAsc();
    } else if (this.filterByMostLiked) {
      this.filterByMostLikes();
    } else if (this.filterByLeastLiked) {
      this.filterByLeastLikes();
    } else {
      // No filter selected, reset the cards to their original state
      this.resetFilters();
    }
  }
  
  filterByMostLikes() {
    // Use this.cards instead of this.originalCards
    this.likesAggregation = {}; // Initialize the likes aggregation
    Object.values(this.allLikes).forEach((like: any) => {
      const cardId = like.cardId;
      this.likesAggregation[cardId] = (this.likesAggregation[cardId] || 0) + 1;
    });
  
    this.cards = this.cards.slice().sort((a, b) => {
      const likesA = this.likesAggregation[a._id] || 0;
      const likesB = this.likesAggregation[b._id] || 0;
      return likesB - likesA;
    });
  }
  
  filterByLeastLikes() {
    // Use this.cards instead of this.originalCards
    this.likesAggregation = {}; // Initialize the likes aggregation
    Object.values(this.allLikes).forEach((like: any) => {
      const cardId = like.cardId;
      this.likesAggregation[cardId] = (this.likesAggregation[cardId] || 0) + 1;
    });
  
    this.cards = this.cards.slice().sort((a, b) => {
      const likesA = this.likesAggregation[a._id] || 0;
      const likesB = this.likesAggregation[b._id] || 0;
      return likesA - likesB;
    });
  }

sortCardsByRatingDesc(): void {
  this.getAverageRatings();
  const ratingsBeforeSorting = this.cards.map(card => this.averageRatings[card._id]);
  console.log('Ratings before sorting:', ratingsBeforeSorting);  // Log ratings before sorting

  this.cards = this.cards.sort((a, b) => this.averageRatings[b._id] - this.averageRatings[a._id]);

  const ratingsAfterSorting = this.cards.map(card => this.averageRatings[card._id]);
  console.log('Ratings after sorting:', ratingsAfterSorting);  // Log ratings after sorting

  console.log(this.averageRatings);
}

sortCardsByRatingAsc(): void {
  
  const ratingsBeforeSorting = this.cards.map(card => this.averageRatings[card._id]);
  console.log('Ratings before sorting:', ratingsBeforeSorting);  // Log ratings before sorting

  this.cards = this.cards.sort((a, b) => this.averageRatings[a._id] - this.averageRatings[b._id]);

  const ratingsAfterSorting = this.cards.map(card => this.averageRatings[card._id]);
  console.log('Ratings after sorting:', ratingsAfterSorting);  // Log ratings after sorting

  console.log(this.averageRatings);
}


  toggleMostRatedFilter() {
    this.filterByMostRated = !this.filterByMostRated;
  
    // Ensure that only one of the filters is true at a time
    if (this.filterByMostRated) {
      this.filterByLeastRated = false;
    }
  
    console.log('Most Rated Filter:', this.filterByMostRated);
    this.applyFilters();
  }
  
  toggleLeastRatedFilter() {
    this.filterByLeastRated = !this.filterByLeastRated;
  
    // Ensure that only one of the filters is true at a time
    if (this.filterByLeastRated) {
      this.filterByMostRated = false;
    }
  
    console.log('Least Rated Filter:', this.filterByLeastRated);
    this.applyFilters();
  }

 calculateLikesForCards() {
  if (!this.allLikes) {
    console.log('allLikes is not defined or null.');
    return;
  }

  this.likesAggregation = {}; // Initialize the likes aggregation

  Object.values(this.allLikes).forEach((like: any) => {
    const cardId = like.cardId; // Assuming cardId is the key for each like
    this.likesAggregation[cardId] = (this.likesAggregation[cardId] || 0) + 1;
  });

  if (this.originalCards) {
    // Update the originalCards array with the total likes
    this.originalCards = this.originalCards.map((card) => {
      const cardId = card._id; // Assuming the card's ID matches the cardId in likes
      const likes = this.likesAggregation[cardId] || 0;
      return { ...card, likes };
    });
    
    // Update the displayed cards (this.cards) with the filtered or unfiltered results
    if (this.filterMale || this.filterFemale) {
      this.filterData();
    } else {
      this.cards = this.originalCards.slice();
    }
  }
}


 toggleFilterDropdown() {
  let dropdown = document.getElementById("filterDropdown");
  if (dropdown.style.display === "flex") {
    dropdown.style.display = "none";
  } else {
    dropdown.style.display = "flex";
  }
}


isLoggedIn(): boolean {
  let token = sessionStorage.getItem('jwt');
  if (token) {
    this.decodedToken = this.decodeToken(token);
    if (this.decodedToken.role == 'admin') {
      this.admin = true;
    

    }
    if (this.decodedToken.role == 'user') {
      this.user = true;
  
  
    }
    
    return true;
  }
  return false;
}

decodeToken(token: string) {
  return jwt_decode(token);
}

editCard(id){
  this.router.navigate([`edit-card/${id}`]); 

}

@HostListener('window:scroll', [])
onWindowScroll() {
  this.showScrollButton = window.scrollY > 100;
}

scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}



}
