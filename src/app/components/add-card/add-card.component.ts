import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CardServiceService } from 'src/app/services/card-service.service';
// import swal from 'sweetalert';


@Component({
  selector: 'app-add-card',
  templateUrl: './add-card.component.html',
  styleUrls: ['./add-card.component.css']
})
  cardForm: FormGroup;
  rankRef: string;
  sum: any;
  selectedGender: string = ''
  imagePreview:any;
  editMode: boolean = false; 
  id: string
  title: string = "Add Card Form"
  card: any



  constructor(
    private formBuilder: FormBuilder,
    private cardSevice: CardServiceService,
    private activatedRoute: ActivatedRoute

    ) { }

  ngOnInit() {

      this.cardForm = this.formBuilder.group({
        id: [''],
        collections: ['', [Validators.required]],
        number: ['', [Validators.required]],
        name: ['', [Validators.required]],
        gender: [this.selectedGender, [Validators.required]],
        country: ['', [Validators.required]],
        team: ['', []],
        main: ['', [Validators.required]],
        sub: ['', [Validators.required]],
        description: ['', [Validators.required]],
        top: ['', [Validators.required]],
        bottom: ['', [Validators.required]],
        left: ['', [Validators.required]],
        right: ['', [Validators.required]],
        rank: [''], // This will be updated with the sum
        img: [this.imagePreview, [Validators.required]],
      });
    
      this.cardForm.get('top').valueChanges.subscribe(() => this.updateRank());
      this.cardForm.get('bottom').valueChanges.subscribe(() => this.updateRank());
      this.cardForm.get('left').valueChanges.subscribe(() => this.updateRank());
      this.cardForm.get('right').valueChanges.subscribe(() => this.updateRank());
    
      this.cardForm.get('gender').valueChanges.subscribe(() => this.updateGender());
    
      this.id = this.activatedRoute.snapshot.paramMap.get('id');
      if (this.id) {
        this.editMode = true;
        this.title = 'Edit Card Form';
        this.cardSevice.getCardById(this.id).subscribe((response) => {
          console.log(response.cards[0]);
          this.card = response.cards[0];
          this.imagePreview = this.card.img;
    
          // Update form controls for editing
          this.cardForm.patchValue({
            id: this.card._id,
            collections: this.card.collections,
            number: this.card.number,
            name: this.card.name,
            gender: this.card.gender,
            main: this.card.main,
            sub: this.card.sub,
            description: this.card.description,
            top: this.card.top,
            bottom: this.card.bottom,
            left: this.card.left,
            right: this.card.right,
            img: this.imagePreview
          });
    
          this.updateRank();
        });
      }
    }
  
  async onSubmit() {
    // Your form submission logic goes here
    console.log(this.cardForm.value);
    
    // Wait for the image to be fully set before proceeding
    await new Promise(resolve => setTimeout(resolve, 0));
    
    this.cardSevice.addcard(this.cardForm.value, this.cardForm.value.img).subscribe();
    this.cardForm.reset(); // Reset form values
    this.cardForm.get('img').setValue(null); // Reset file input
    // swal('Success!', 'Card added!', 'success');
  }

  async edit(){
    console.log(this.cardForm.value);
    await new Promise(resolve => setTimeout(resolve, 0));
    
    this.cardSevice.editCard(this.cardForm.value, this.cardForm.value.img).subscribe();
    this.cardForm.reset(); // Reset form values
    this.cardForm.get('img').setValue(null); // Reset file input
    // swal('Success!', 'Card added!', 'success');
  }

  
  

  // Custom method to update the "rank" field with the sum
  updateRank() {
    const top = parseFloat(this.cardForm.value.top) || 0;
    const bottom = parseFloat(this.cardForm.value.bottom) || 0;
    const left = parseFloat(this.cardForm.value.left) || 0;
    const right = parseFloat(this.cardForm.value.right) || 0;

     this.sum = top + bottom + left + right;
    this.cardForm.patchValue({ rank: this.sum });
    
  this.rankCalculator()
  }

  rankCalculator() {
    if (this.sum >= 33) {
      this.rankRef = "SS";
    } else if (this.sum >= 31) {
      this.rankRef = "S";
    } else if (this.sum >= 24) {
      this.rankRef = "A";
    } else if (this.sum >= 20) {
      this.rankRef = "B";
    } else if (this.sum >= 15) {
      this.rankRef = "C";
    } else {
      // Handle cases where none of the conditions are met
      this.rankRef = "Unknown";
    }
  }
  updateGender() {
    console.log('Selected gender:', this.selectedGender);
    // You can perform any additional logic here if needed
  }  


  onImageSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.cardForm.patchValue({ img: file });
    this.cardForm.updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
      console.log(this.imagePreview);
    };
    reader.readAsDataURL(file);
  }
 }

