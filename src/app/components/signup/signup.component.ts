
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from 'src/app/services/users.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import jwt_decode from 'jwt-decode';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  title:string = "Admin Registration"
  //form Id
  signupForm: FormGroup;
  imagePreview: any;
  pdfPreview: any;
  selectedFile: any;
  fileName: any;
  id: any
  editMode:boolean = false;
  userId:String
  userDecoded: any;
  
// current url by boolean
  currentUrl: String
  user = false
  admin = false
 
  
  constructor(
    private formBuilder: FormBuilder,
    private usersService: UsersService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private sanitizer: DomSanitizer
    ) { }
    
      ngOnInit() {
        this.currentUrl = window.location.pathname;
        console.log(this.currentUrl);
    
        if (this.currentUrl === '/signup/user') {
          this.editMode = false
          this.user = true;
          this.title = 'User Registration';
          console.log('user', this.title);
          this.signupForm = this.formBuilder.group({
            username: ['', [Validators.required, Validators.minLength(3)]],
            email: ['', [Validators.required, Validators.email]],
            pwd: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(12)]],
            address: ['', [Validators.required, Validators.minLength(5)]],
            phone: ['', [Validators.required, Validators.pattern('^[0-9]*$'), Validators.minLength(8)]],
            img: [''],
            role: ['user'],
            openSea: [''],
            twitter: [''],
            wallet: [''],


          });
        } else if (this.currentUrl === '/signup/user/edit'){
          this.editMode = true
          this.title = 'Edit Profile';
          console.log(this.title)

          const token = sessionStorage.getItem('jwt');  
          if (token) {
             this.userDecoded = jwt_decode(token);
             this.imagePreview = this.userDecoded.img
             this.signupForm = this.formBuilder.group({
          
              userId: [this.userDecoded.userId],
              username: [this.userDecoded.username, [Validators.required, Validators.minLength(3)]],
              address: [this.userDecoded.address, [Validators.required, Validators.minLength(5)]],
              phone: [this.userDecoded.phone, [Validators.required, Validators.pattern('^[0-9]*$'), Validators.minLength(8)]],
              img: [this.imagePreview],
              role: ['user'],
              openSea: [this.userDecoded.openSea],
              twitter: [this.userDecoded.twitter],
              wallet: [this.userDecoded.wallet],
  
            
          });
      }


         

        } else if (this.currentUrl === '/signup/admin') {
          this.admin = true;
          this.title = 'Admin Registration';
          console.log('admin', this.title);
          this.signupForm = this.formBuilder.group({
            username: ['', [Validators.required, Validators.minLength(3)]],
            // lastName: ['', [Validators.required, Validators.minLength(3)]],
            email: ['', [Validators.required, Validators.email]],
            phone: ['', [Validators.required, Validators.pattern('^[0-9]*$'), Validators.minLength(8)]],
            pwd: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(12)]],
            address: ['', [Validators.required, Validators.minLength(5)]],
            img: [''],
            role: ['admin'],
            openSea: [''],
            twitter: [''],
          

          });
        }
      }
   
    
  
    
      signup() {
        console.log("HERE OBJECT", this.signupForm.value);
        this.usersService.signupUser(this.signupForm.value, this.signupForm.value.img).subscribe();
        this.router.navigate(['/login']);
      }

      edit() {
        console.log("HERE OBJECT", this.signupForm.value);
        
        // Check if a file is selected
        const file = this.signupForm.value.img;
        
        // If no file is selected, use the existing image from the token
        if (!file) {
          this.signupForm.patchValue({ img: this.userDecoded.img });
        }
      
        this.usersService.editUser(this.signupForm.value, this.signupForm.value.img).subscribe(
          (response) => {
            // Assuming your API returns the updated user and the new token
            const updatedUser = response.updatedUser;
            const newToken = response.newToken;
      
            // Store the new token in session storage
            sessionStorage.setItem('jwt', newToken);
      
            // Redirect or perform any other actions as needed
            this.router.navigate(['/']); // Redirect to the user's profile page, for example
          },
          (error) => {
            console.error("Error updating user:", error);
          }
        );
      }
      
      

     
      
      
    
      onImageSelected(event: Event) {
        const file = (event.target as HTMLInputElement).files[0];
        this.signupForm.patchValue({ img: file });
        this.signupForm.updateValueAndValidity();
        const reader = new FileReader();
        reader.onload = () => {
          this.imagePreview = reader.result as string;
          console.log(this.imagePreview);
        };
        reader.readAsDataURL(file);
      }
      decodeToken(token: string) {
        return jwt_decode(token);
      }
    }