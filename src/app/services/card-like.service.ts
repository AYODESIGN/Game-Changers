import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class CardLikeService {

  private apiUrl = `${environment.baseUrl}/api/like`;

  constructor(private http: HttpClient) { }

  // Add or remove a like for a card
  toggleLike(cardId: string, userId: string): Observable<{ liked: boolean }> {
    const requestBody = {
      cardId,
      userId
    };

    return this.http.post<{ liked: boolean }>(`${this.apiUrl}`, requestBody);
  }

  // Get likes for a card
  getLikesForCard(cardId: string): Observable<{ likes: any[] }> {
    return this.http.get<{ likes: any[] }>(`${this.apiUrl}s/${cardId}`);
  }

  // Get likes for a user
  getLikesForUser(userId: string): Observable<{ userLikes: any[] }> {
    return this.http.get<{ userLikes: any[] }>(`${this.apiUrl}/user/${userId}`);
  }
  // Get all likes for all cards
getAllLikes(): Observable<{ likes: any[] }> {
  return this.http.get<{ likes: any[] }>(`${this.apiUrl}/get/all`);
}
}
