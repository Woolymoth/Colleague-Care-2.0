import { Component } from '@angular/core';
import { collection, collectionData, addDoc, query, where, getDocs, Firestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-chedual-creator',
  templateUrl: './chedual-creator.component.html',
  styleUrls: ['./chedual-creator.component.css']
})
export class ChedualCreatorComponent {
  schedule: any[] = [];
  displayedSchedule: any[] = [];
  currentPage = 0;
  pageSize = 5;
  maxPage = 0;

  constructor(private readonly firestore: Firestore) {
    this.createSchedule();
  }

  async createSchedule(): Promise<void> {
    const choresRef = collection(this.firestore, 'chores');
    const colleaguesRef = collection(this.firestore, 'colleagues');

    const choreDocs = await getDocs(choresRef);
    const choreData = choreDocs.docs.map(doc => doc.data());

    const colleagueDocs = await getDocs(colleaguesRef);
    const colleagueData = colleagueDocs.docs.map(doc => doc.data());

    const currentWeek = this.getWeekNumber(new Date());

    for (const chore of choreData) {
      const existingSchedule = await this.getExistingSchedule(chore, currentWeek);
      if (!existingSchedule) {
        const shuffledColleagues = this.shuffleArray(colleagueData);
        const choreSchedule = this.generateChoreSchedule(shuffledColleagues, currentWeek, chore);
        await this.saveSchedule(choreSchedule);
      }
    }

    await this.fetchSchedule();
  }

  async fetchSchedule(): Promise<void> {
    const currentWeek = this.getWeekNumber(new Date());
    const scheduleRef = collection(this.firestore, 'schedule');
    const q = query(scheduleRef, where("weekNumber", "==", currentWeek));
    const querySnapshot = await getDocs(q);
    this.schedule = querySnapshot.docs.map(doc => doc.data());
    this.maxPage = Math.ceil(this.schedule.length / this.pageSize) - 1;
    this.updateDisplayedSchedule();
  }

  async getExistingSchedule(chore: any, currentWeek: number): Promise<any> {
    const scheduleRef = collection(this.firestore, 'schedule');
    const q = query(scheduleRef, 
                    where("chore.chore_name", "==", chore.chore_name),
                    where("weekNumber", "==", currentWeek));
    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty;
  }

  async saveSchedule(schedule: any[]): Promise<void> {
    const scheduleRef = collection(this.firestore, 'schedule');

    for (const week of schedule) {
      try {
        await addDoc(scheduleRef, week);
      } catch (e) {
        console.error('Error adding document: ', e);
      }
    }
  }

  generateChoreSchedule(colleagues: any[], currentWeek: number, chore: any): any[] {
    const choreSchedule = [];
    for (let i = 0; i < colleagues.length; i++) {
      const weekNumber = currentWeek + i;
      const colleagueIndex = i % colleagues.length;
      const colleague = colleagues[colleagueIndex];
      const week = {
        weekNumber: weekNumber,
        colleague: colleague,
        chore: chore
      };
      choreSchedule.push(week);
    }
    return choreSchedule;
  }

  getWeekNumber(date: Date): number {
    const startOfYear = new Date(date.getFullYear(), 0, 1);
    const daysSinceStartOfYear = Math.floor((date.getTime() - startOfYear.getTime()) / (24 * 3600 * 1000));
    const daysUntilThursday = (11 - startOfYear.getDay()) % 7; 
    const daysSinceFirstThursday = daysSinceStartOfYear - daysUntilThursday;
    return Math.ceil((daysSinceFirstThursday + 1) / 7);
  }

  shuffleArray(array: any[]): any[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  toggleDetails(event: any): void {
    event.expanded = !event.expanded;
  }

  nextPage(): void {
    if (this.currentPage < this.maxPage) {
      this.currentPage++;
      this.updateDisplayedSchedule();
    }
  }

  prevPage(): void {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.updateDisplayedSchedule();
    }
  }

  updateDisplayedSchedule(): void {
    const startIndex = this.currentPage * this.pageSize;
    this.displayedSchedule = this.schedule.slice(startIndex, startIndex + this.pageSize);
  }
}
