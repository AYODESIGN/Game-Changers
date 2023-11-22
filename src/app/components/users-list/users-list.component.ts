import { UsersService } from './../../services/users.service';
import { Component, OnInit } from '@angular/core';
import { CardLikeService } from 'src/app/services/card-like.service';
import { CardRatingService } from 'src/app/services/card-rating.service';
import swal from 'sweetalert';


@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {
users : any
ratings:any
likes:any
  constructor(
    private userService:UsersService,
    private cardLikeService:CardLikeService,
    private cardRating : CardRatingService,
  ) { }

  ngOnInit() {
    this.getAllRatings()
    this.getAllLikes()
    this.getAllUsers()
  }
getAllUsers(){
  this.userService.getAllUsers().subscribe((response)=>{
    console.log(response)
    this.users = response;
    this.calculateRatingCounts()
    this.calculateLikeCounts()
  })
}

getAllLikes(){
  this.cardLikeService.getAllLikes().subscribe((response)=>{
    console.log(response)
    this.likes = response.likes
    this.calculateLikeCounts()
console.log(this.likes)
 })
}

getAllRatings(){
  this.cardRating.getAllRatings().subscribe((response)=>{
    console.log(response)
    this.ratings = response.ratings
    this.calculateRatingCounts()
console.log(this.ratings)
  })

}



deleteUser(id) {
  swal({
    title: 'Deleting User Confirmation',
    text: 'Are you sure you want to delete this user?',
    icon: 'warning',
    buttons: ['Cancel', 'Yes, Delete'],
    dangerMode: true,
  }).then((willDelete) => {
    if (willDelete) {
      // User clicked "Yes, Delete"
      this.userService.deleteUserById(id).subscribe((response) => {
        console.log(response);
        // Optionally show another SweetAlert for success
        swal('Success', 'User deleted successfully', 'success');
      });
    } else {
      // User clicked "Cancel" or closed the alert
      swal('Cancelled', 'User was not deleted', 'error');
    }
  });
  this.getAllUsers()
}

calculateRatingCounts() {
  if (this.users && this.ratings) {
    this.users.forEach((user) => {
      const userId = user._id;
      // Filter ratings for the current user
      const userRatings = this.ratings.filter((rating) => rating.userId === userId);
      // Set the rating count in the user object
      user.ratingCount = userRatings.length;
    });
  }
}
calculateLikeCounts() {
  if (this.users && this.likes) { // Change 'this.ratings' to 'this.likes'
    this.users.forEach((user) => {
      const userId = user._id;
      // Filter likes for the current user
      const userLikes = this.likes.filter((like) => like.userId === userId); // Change 'rating' to 'like'
      // Set the like count in the user object
      user.likeCount = userLikes.length; // Change 'ratingCount' to 'likeCount'
    });
  }
}

}
