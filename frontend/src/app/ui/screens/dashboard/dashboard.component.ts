import { Component } from '@angular/core';
import { InfoCardComponent } from './components/info-card/info-card.component';
import { UserFornComponent } from './components/user-forn/user-forn.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [InfoCardComponent, UserFornComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

}
