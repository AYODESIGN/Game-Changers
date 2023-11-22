import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CardServiceService {

  private apiUrl = 'http://localhost:4000/api/card';


  constructor(private http: HttpClient) { }

  addcard(card: any, img: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('collections', card.collections);
    formData.append('number', card.number);
    formData.append('gender', card.gender);
    formData.append('country', card.country);
    formData.append('team', card.team);
    formData.append('main', card.main);
    formData.append('sub', card.sub);
    formData.append('rank', card.rank);
    formData.append('name', card.name);
    formData.append('top', card.top);
    formData.append('bottom', card.bottom);
    formData.append('left', card.left);
    formData.append('right', card.right);
    formData.append('description', card.description);
    formData.append('img', img);
  
    return this.http.post<any>(`${this.apiUrl}/add`, formData);
  }
  getAllCards(){
    return this.http.get<any>( `${this.apiUrl}/get/all`);
  }
  getCardsByCollection(collection: string) {
    return this.http.get<any>(`${this.apiUrl}/get/${collection}`);
  }
  
  getLimitedCards(){
    return this.http.get<any>( `${this.apiUrl}/home/limit`);
  }
  getCardById(id){
    return this.http.get<any>( `${this.apiUrl}/${id}`);
  }


  editCard(card: any, img: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('id', card.id);
    formData.append('collections', card.collections);
    formData.append('number', card.number);
    formData.append('gender', card.gender);
  
    // Check if the values are provided before appending to the formData
    if (card.country) {
      formData.append('country', card.country);
    }
  
    if (card.team) {
      formData.append('team', card.team);
    }
  
    formData.append('main', card.main);
    formData.append('sub', card.sub);
    formData.append('rank', card.rank);
    formData.append('name', card.name);
    formData.append('top', card.top);
    formData.append('bottom', card.bottom);
    formData.append('left', card.left);
    formData.append('right', card.right);
    formData.append('description', card.description);
    formData.append('img', img);
  
    return this.http.post<any>(`${this.apiUrl}/edit`, formData);
  }
  
}
