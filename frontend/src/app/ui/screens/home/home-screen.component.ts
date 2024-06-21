import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { MobileNavbarComponent } from './components/mobile-navbar/mobile-navbar.component';
import { RouterModule } from '@angular/router';
import { UserData } from '../../../domain/models/entities/user.entitie';


@Component({
  selector: 'home-screen',
  standalone: true,
  imports: [RouterOutlet, MobileNavbarComponent, RouterModule],
  templateUrl: './home-screen.component.html',
  styleUrl: './home-screen.component.css'
})
export class HomeScreenComponent implements OnInit{
  user?: UserData
  constructor(private routes: Router) {}

  ngOnInit(): void {
    const userData = localStorage.getItem('userData');
    if (!userData) {
      this.routes.navigate(['/']);
    } else {
      this.user = JSON.parse(userData)
    }
  }

  logout() {
    localStorage.removeItem("userData")
    this.routes.navigate(['/']);
  }
}
