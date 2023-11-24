import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from 'src/app/services/users.service';
// import swal from 'sweetalert';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errorMsg= false
  constructor(
    private formBuilder: FormBuilder,
    private usersService: UsersService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      pwd: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(12)]],
        });

  }

  // login() {
  //   this.usersService.login(this.loginForm.value).subscribe((response) => {
  //       console.log(response.user);
  //       console.log(response.msg);
  
  //       if (response.msg === "2") {
  //         sessionStorage.setItem('jwt', response.user);
  //         swal('Success!', 'Login successful!', 'success');
 
  //         if (response.role === 'admin') {
  //           console.log(response.role);
  //           this.router.navigate(['/add-card']);
  //         } else if (response.role === 'user') {
  //           this.router.navigate(['']);
  //         }
  //       } else {
  //         // Handle login failure case here
  //         swal('Error!', 'Login failed. Please check your credentials.', 'error');

  //       }
  //     },
  //     (error) => {
  //       console.error('An error occurred:', error);
  //       swal('Error!', 'An error occurred while logging in.', 'error');
  //     }
  //   );
  // }  

  login() {
  this.usersService.login(this.loginForm.value).subscribe(
    (response) => {
      console.log(response.user);
      console.log(response.msg);

      if (response.msg === "2") {
        sessionStorage.setItem('jwt', response.user);

        // Use standard alert for success message
        window.alert('Success! Login successful!');

        if (response.role === 'admin') {
          console.log(response.role);
          this.router.navigate(['/add-card']);
        } else if (response.role === 'user') {
          this.router.navigate(['']);
        }
      } else {
        // Use standard alert for login failure message
        window.alert('Error! Login failed. Please check your credentials.');
      }
    },
    (error) => {
      console.error('An error occurred:', error);

      // Use standard alert for general error message
      window.alert('Error! An error occurred while logging in.');
    }
  );
}

   }
