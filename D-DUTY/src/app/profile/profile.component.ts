import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';
import { UserService } from '../user-layout/user-service/user.service';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  standalone: true,
  imports: [MaterialModule, CommonModule],
})
export class ProfileComponent {
  constructor(
    private userServisce: UserService,
    private authService: AuthService
  ) {}

  id = sessionStorage.getItem('user');
  role = this.authService.getUserRole();
  user: any = {};
  ngOnInit() {
    this.userServisce.getProfileByUser(this.id).subscribe((res) => {
      this.user = res;
    });
  }
}
