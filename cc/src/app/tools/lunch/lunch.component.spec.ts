import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-lunch',
  templateUrl: './lunch.component.html',
  styleUrls: ['./lunch.component.css']
})
export class LunchComponent implements OnInit {
  suggestions: any[] = [];
  suggestionText: string = '';
  voted: boolean = false;

  constructor(private firestore: AngularFirestore) { }

  ngOnInit(): void {
    this.loadSuggestions();
  }

  loadSuggestions() {
    // Fetch suggestions from Firestore based on the current date
    const currentDate = new Date();
    const currentDateStr = currentDate.toISOString().split('T')[0]; // Get current date in format 'YYYY-MM-DD'
    this.firestore.collection('lunch', ref => ref.where('date', '==', currentDateStr)).valueChanges().subscribe((data: any[]) => {
      this.suggestions = data;
    });
  }

  createSuggestion() {
    // Create a new suggestion document in Firestore
    const currentDate = new Date();
    const currentUser = ''; // Get current user's email
    this.firestore.collection('lunch').add({
      suggestion: this.suggestionText,
      date: currentDate.toISOString().split('T')[0],
      createdBy: currentUser,
      votes: 1,
      voters: [currentUser]
    }).then(() => {
      this.loadSuggestions();
      this.suggestionText = '';
    }).catch(error => {
      console.error('Error creating suggestion:', error);
    });
  }

  vote(suggestion: any) {
    // Add vote to the selected suggestion document in Firestore
    const currentUser = ''; // Get current user's email
    this.firestore.doc(`lunch/${suggestion.id}`).update({
      votes: suggestion.votes + 1,
      voters: [...suggestion.voters, currentUser]
    }).then(() => {
      this.loadSuggestions();
      this.voted = true;
    }).catch(error => {
      console.error('Error voting:', error);
    });
  }

  canVote(suggestion: any): boolean {
    // Check if the current user can vote for the suggestion
    const currentUser = ''; // Get current user's email
    return !this.voted && !suggestion.voters.includes(currentUser);
  }
}
