import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../firebase.service';
import { DateAdapter } from '@angular/material/core';
@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.css'],
})
export class SearchFormComponent implements OnInit {
  me: any;
  loaded: boolean = false;
  constructor(
    private firebaseService: FirebaseService,
    private dateAdapter: DateAdapter<any>
  ) {
    this.dateAdapter.setLocale('en-GB'); // dd/mm/yyyy
  }

  ngOnInit(): void {}
  search(name: string, birthDate: string): void {
    console.log('looking for: ', name, birthDate);
    if (!name || !birthDate) return;

    this.firebaseService.getMe(name, birthDate).then((x) => {
      this.me = x;
      console.log('me: ', this.me);
      this.loaded = true;
    });
  }

  add(name: string, birthDate: string, address: string): void {
    console.log('looking for: ', name, birthDate);
    this.firebaseService.add(name, birthDate, address);
    this.search(name, birthDate);
  }
}
