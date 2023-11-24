import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  error: any; // Add this property

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

  login() {
    this.usersService.login(this.loginForm.value).subscribe(
      (response) => {
        console.log(response.user);
        console.log(response.msg);

        if (response.msg === "2") {
          sessionStorage.setItem('jwt', response.user);
          this.error = null; // Reset the error when login is successful

          if (response.role === 'admin') {
            console.log(response.role);
            this.router.navigate(['/add-card']);
          } else if (response.role === 'user') {
            this.router.navigate(['']);
          }
        } else {
          // Set the error when login fails
          this.error = 'Login failed. Please check your credentials.';
        }
      },
      (error) => {
        console.error('An error occurred:', error);
        this.error = 'An error occurred while logging in.';
      }
    );
  }
}
