import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-home-component',
  standalone: true,
  imports: [MatCardModule, MatIconModule, MatListModule],
  templateUrl: './home-component.component.html',
  styleUrl: './home-component.component.css'
})
export class HomeComponentComponent {
  constructor() { }

  ngOnInit(): void {
    // This is where you would call a service to fetch user data and transactions.
  }
}