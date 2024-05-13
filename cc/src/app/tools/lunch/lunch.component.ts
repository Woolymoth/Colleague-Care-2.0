import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthService } from '../auth';

@Component({
  selector: 'app-lunch',
  templateUrl: './lunch.component.html',
  styleUrls: ['./lunch.component.css']
})
export class LunchComponent implements OnInit {
  suggestions: any[] = [];
  suggestionText: string = '';
  selectedSuggestionId: string | null = null;
  voted: boolean = false;
  isLoading: boolean = false;
  errorMessage: string = '';

  constructor(
    private firestore: AngularFirestore, 
    public authService: AuthService
  ) { }

  ngOnInit(): void {
    this.loadSuggestions();
    this.checkIfVotedToday();
  }

  loadSuggestions() {
    const currentDate = new Date();
    const currentDateStr = currentDate.toISOString().split('T')[0];
    this.firestore.collection('lunch', ref => ref.where('date', '==', currentDateStr))
      .valueChanges({ idField: 'id' }).subscribe((data: any[]) => {
        this.suggestions = data;
      });
  }

  createSuggestion() {
    if (this.suggestionText.trim().length === 0) {
      this.errorMessage = 'Cannot create an empty suggestion.';
      return; // Exit the function if there is no text.
    }

    this.isLoading = true; // Set loading state to true
    this.authService.userEmail.subscribe((email: string | null) => {
      if (email && !this.voted) {
        const currentDate = new Date();
        this.firestore.collection('lunch').add({
          suggestion: this.suggestionText,
          date: currentDate.toISOString().split('T')[0],
          createdBy: email,
          votes: 1,
          voters: [email]
        }).then(() => {
          this.loadSuggestions();
          this.suggestionText = '';
          this.voted = true; // Prevent further suggestions/votes
        }).catch(error => {
          console.error('Error creating suggestion:', error);
          this.errorMessage = 'Failed to create suggestion.';
        }).finally(() => {
          this.isLoading = false; // Reset loading state
        });
      } else {
        this.errorMessage = 'User not authenticated or already voted.';
        this.isLoading = false;
      }
    });
  }

  selectSuggestion(id: string) {
    this.selectedSuggestionId = id;
  }

  triggerVote() {
    if (!this.selectedSuggestionId) {
      this.errorMessage = "No suggestion selected.";
      return;
    }

    const suggestion = this.suggestions.find(s => s.id === this.selectedSuggestionId);
    if (suggestion && !this.voted) {
      this.vote(suggestion);
    } else {
      this.errorMessage = "Invalid selection or already voted.";
    }
  }

  vote(suggestion: any) {
    this.authService.userEmail.subscribe((email: string | null) => {
      if (email && this.canVote(suggestion)) {
        this.firestore.doc(`lunch/${suggestion.id}`).update({
          votes: suggestion.votes + 1,
          voters: [...suggestion.voters, email]
        }).then(() => {
          this.loadSuggestions();
          this.voted = true; // Update voted state
        }).catch(error => {
          console.error('Error voting:', error);
          this.errorMessage = 'Failed to vote.';
        });
      }
    });
  }

  canVote(suggestion: any): boolean {
    return !this.voted && !suggestion.voters.includes(this.authService.userEmail);
  }
  getTotalVotes(): number {
    let totalVotes = 0;
    this.suggestions.forEach(suggestion => {
        totalVotes += suggestion.votes;
    });
    return totalVotes;
}
getPercentage(votes: number): number {
  const totalVotes = this.getTotalVotes();
  return totalVotes > 0 ? Math.round((votes / totalVotes) * 100) : 0;
}

  checkIfVotedToday() {
    const currentDate = new Date();
    const currentDateStr = currentDate.toISOString().split('T')[0];
    this.authService.userEmail.subscribe(email => {
      if (email) {
        this.firestore.collection('lunch', ref => ref
          .where('date', '==', currentDateStr)
          .where('voters', 'array-contains', email))
          .get().subscribe((result) => {
            this.voted = !result.empty;
          });
      }
    });
  }
}
