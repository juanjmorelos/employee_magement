import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MobileNavbarComponent } from '../components/mobile-navbar/mobile-navbar.component';



@Component({
  selector: 'home-screen',
  standalone: true,
  imports: [RouterOutlet, MobileNavbarComponent],
  templateUrl: './home-screen.component.html',
  styleUrl: './home-screen.component.css'
})
export class HomeScreenComponent {

}
