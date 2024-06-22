import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface SelectData {
  value: string,
  label: string
}

@Component({
  selector: 'info-card',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './info-card.component.html',
  styleUrl: './info-card.component.css'
})
export class InfoCardComponent {
  @Input()
  title: string = ""
  @Input()
  subtitle2: string = ""
  @Input()
  value: string = ""
  @Input()
  subtitle: string = ""
  @Input()
  child: boolean = false
  @Input()
  editable:boolean = false
  @Input()
  data: SelectData[] = []
}
