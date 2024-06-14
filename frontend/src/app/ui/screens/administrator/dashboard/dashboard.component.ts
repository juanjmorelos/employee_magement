import { Component } from '@angular/core';
import { InfoCardComponent } from './components/info-card/info-card.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [InfoCardComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

}
