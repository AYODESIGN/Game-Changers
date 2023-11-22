import { Component, OnInit, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import swal from 'sweetalert';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css',
]
})
export class HeaderComponent implements OnInit {
  decodedToken: any;
  admin: boolean = false;
  user: boolean = false;
  showDropdown = false;

  constructor(  
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private location: Location,) { }

  ngOnInit() {
    this.isLoggedIn();
      let token = sessionStorage.getItem("jwt");
      if (token) {
        this.decodedToken = this.decodeToken(token);
  }
  console.log(this.decodedToken)
      console.log(token)
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

logout() {
  // Use SweetAlert to display logout confirmation
  swal({
    title: 'Logout Confirmation',
    text: 'Are you sure you want to log out?',
    icon: 'warning',
    buttons: ['Cancel', 'Yes, Logout'],
    dangerMode: true,
  }).then((confirmed) => {
    if (confirmed) {
      // User confirmed logout, clear the JWT token and display logout success message
      sessionStorage.removeItem('jwt');
      this.admin = false;
      this.user = false;
    
      // Use SweetAlert to display logout success message
      swal('Logged Out!', 'You have been successfully logged out.', 'success');
      this.router.navigate(['/login']);
    }
  });
}


toggleProfileDropdown() {
  this.showDropdown = !this.showDropdown;
}

decodeToken(token: string) {
  return jwt_decode(token);
}

 }