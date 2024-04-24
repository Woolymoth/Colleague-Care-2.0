import { Component } from '@angular/core';
import { collection, collectionData, Firestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-chedual-creator',
  templateUrl: './chedual-creator.component.html',
  styleUrls: ['./chedual-creator.component.css']
})
export class ChedualCreatorComponent {

  constructor(private readonly firestore: Firestore) {
    this.fetchColleagues();
    this.fetchChores();
    this.createSchedule();
  }

  fetchColleagues(): void {
    const colleaguesRef = collection(this.firestore, 'colleagues');
    collectionData(colleaguesRef).subscribe(colleagues => {
      // Do whatever you want with the fetched colleagues here
      console.log("Colleagues:", colleagues);
    });
  }

  fetchChores(): void {
    const choresRef = collection(this.firestore, 'chores');
    collectionData(choresRef).subscribe(chores => {
      // Do whatever you want with the fetched chores here
      console.log("Chores:", chores);
    });
  }

  createSchedule(): void {
    const colleaguesRef = collection(this.firestore, 'colleagues');
    collectionData(colleaguesRef).subscribe(colleagues => {
      const choresRef = collection(this.firestore, 'chores');
      collectionData(choresRef).subscribe(chores => {
        const numWeeks = colleagues.length;
        const startOfWeek = this.getStartOfWeek();

        chores.forEach(chore => {
          const choreSchedule = [];
          const shuffledColleagues = this.shuffleArray(colleagues);

          for (let i = 0; i < numWeeks; i++) {
            const weekNumber = startOfWeek + i;
            const colleagueIndex = i % shuffledColleagues.length;
            const colleague = shuffledColleagues[colleagueIndex];
            const week = {
              weekNumber: weekNumber,
              colleague: colleague,
              chore: chore
            };
            choreSchedule.push(week);
          }

          console.log("Chore Schedule for", chore['chore_name'], ":", choreSchedule);
        });
      });
    });
  }

  getStartOfWeek(): number {
    const today = new Date();
    const startOfWeek = new Date(today.getFullYear(), 0, 1);
    const todayNumber = today.getTime();
    const startOfWeekNumber = startOfWeek.getTime();
    const weekNumber = Math.ceil((((todayNumber - startOfWeekNumber) / 86400000) + startOfWeek.getDay() + 1) / 7);
    return weekNumber;
  }

  shuffleArray(array: any[]): any[] {
    // Fisher-Yates shuffle algorithm
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
}
