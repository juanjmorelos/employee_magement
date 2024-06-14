import { Component, ContentChild, Input } from '@angular/core';

@Component({
  selector: 'info-card',
  standalone: true,
  imports: [],
  templateUrl: './info-card.component.html',
  styleUrl: './info-card.component.css'
})
export class InfoCardComponent {
  @Input()
  title: string = ""
  @Input()
  value: string = ""
  @Input()
  subtitle: string = ""
  @Input()
  child: boolean = false
}
