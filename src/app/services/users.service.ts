import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';



@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private apiUrl = `${environment.baseUrl}/api/users`;

  constructor(private http: HttpClient) { }

  signupUser(user: any, img: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('username', user.username);
    // formData.append('lastName', user.lastName);
    formData.append('email', user.email);
    formData.append('pwd', user.pwd);
    formData.append('address', user.address);
    formData.append('phone', user.phone);
    formData.append('img', img);
    formData.append('role', user.role);
    formData.append('openSea', user.openSea);
    formData.append('twitter', user.twitter);
    formData.append('wallet', user.wallet);

    return this.http.post<any>(`${this.apiUrl}/signup/user`, formData);
  }

 
  signupAdmin(parentObj){
    return this.http.post(`${this.apiUrl}/signup/admin`, parentObj)
  }
  


  login(user){
    return this.http.post<{msg: string, role: string, user:any, }>(this.apiUrl + "/login" , user)
  }


  getAllUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}`);
  }

  getUserById(userId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/users/${userId}`);
  }

  deleteUserById(userId: string): Observable<{ msg: string }> {
    return this.http.delete<{ msg: string }>(`${this.apiUrl}/users/${userId}`);
  }

  editUser(user: any, img: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('userId', user.userId);
    formData.append('username', user.username);
    formData.append('address', user.address);
    formData.append('phone', user.phone);
    formData.append('img', img);
    formData.append('role', user.role);
    formData.append('openSea', user.openSea);
    formData.append('twitter', user.twitter);
    formData.append('wallet', user.wallet);

    return this.http.post<any>(`${this.apiUrl}/edit`, formData);
  }


}