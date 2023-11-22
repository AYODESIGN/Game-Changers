import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class CardRatingService {

  private apiUrl =  `${environment.baseUrl}/api/rating`; // Update the API URL for ratings

  constructor(private http: HttpClient) { }

  // Add or update a rating for a card
  addOrUpdateRating(cardId: string, userId: string, rating: number): Observable<{ rated: boolean }> {
    const requestBody = {
      cardId,
      userId,
      rating
    };

    return this.http.post<{ rated: boolean }>(`${this.apiUrl}`, requestBody);
  }

  // Get ratings for a card
  getRatingsForCard(cardId: string): Observable<{ ratings: any[] }> {
    return this.http.get<{ ratings: any[] }>(`${this.apiUrl}s/${cardId}`);
  }

  // Get ratings for a user
  getRatingsForUser(userId: string): Observable<{ userRatings: any[] }> {
    return this.http.get<{ userRatings: any[] }>(`${this.apiUrl}/user/${userId}`);
  }


// Get all ratings for all cards
getAllRatings(): Observable<{ ratings: any[] }> {
  return this.http.get<{ ratings: any[] }>(`${this.apiUrl}/get/all`);
}
}