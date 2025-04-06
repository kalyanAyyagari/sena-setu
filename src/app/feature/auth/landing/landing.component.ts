import { Component } from '@angular/core';
import { LoginComponent } from "../login/login.component";
import { SignupComponent } from "../signup/signup.component";
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [LoginComponent, SignupComponent, CommonModule, MatCardModule, MatTabsModule,],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss'
})
export class LandingComponent {

}
