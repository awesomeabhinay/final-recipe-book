import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  ngOnInit(): void{
    firebase.initializeApp({
      apiKey: "AIzaSyCbmsxbEqDUE5-yIqIxkN5bF0vEIZFjso0",
      authDomain: "recipe-book-d43b8.firebaseapp.com",
    });
  }

}
