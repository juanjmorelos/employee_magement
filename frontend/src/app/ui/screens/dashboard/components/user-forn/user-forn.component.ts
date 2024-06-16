import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'user-forn',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-forn.component.html',
  styleUrl: './user-forn.component.css'
})
export class UserFornComponent {
  @Input()
  editable: Boolean = false
  @Input()
  blank: Boolean = false
}
