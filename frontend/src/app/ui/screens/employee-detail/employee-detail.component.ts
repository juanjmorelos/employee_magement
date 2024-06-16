import { Component } from '@angular/core';
import { InfoCardComponent } from '../dashboard/components/info-card/info-card.component';
import { UserFornComponent } from '../dashboard/components/user-forn/user-forn.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-employee-detail',
  standalone: true,
  imports: [InfoCardComponent, UserFornComponent, RouterModule],
  templateUrl: './employee-detail.component.html',
  styleUrl: './employee-detail.component.css'
})
export class EmployeeDetailComponent {

}
