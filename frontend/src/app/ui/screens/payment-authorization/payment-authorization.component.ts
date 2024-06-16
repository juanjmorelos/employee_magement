import { Component, Inject, Input } from '@angular/core';
import { TitleComponent } from '../../shared/components/title/title.component';

@Component({
  selector: 'app-payment-authorization',
  standalone: true,
  imports: [TitleComponent],
  templateUrl: './payment-authorization.component.html',
  styleUrl: './payment-authorization.component.css'
})
export class PaymentAuthorizationComponent {
  @Input()
  title: string = "Autorizar pagos de nómina"
}
