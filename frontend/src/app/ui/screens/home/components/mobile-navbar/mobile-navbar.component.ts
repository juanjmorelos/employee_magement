import { Component, Input } from '@angular/core';
import { UserData as User } from '../../../../../domain/models/entities/user.entitie';

@Component({
  selector: 'mobile-navbar',
  standalone: true,
  imports: [],
  templateUrl: './mobile-navbar.component.html',
  styleUrl: './mobile-navbar.component.css'
})
export class MobileNavbarComponent {
  @Input({required: true})
  user!: User

}
