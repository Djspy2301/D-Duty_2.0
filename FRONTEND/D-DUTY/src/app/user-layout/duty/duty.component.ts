import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { UserService } from '../user-service/user.service';

@Component({
  selector: 'app-duty',
  templateUrl: './duty.component.html',
  styleUrls: ['./duty.component.css'],
})
export class DutyComponent {
  constructor(private userService: UserService) {}

  datasource: any;
  usersList: any;

  ngOnInit(): void {
    this.getIdOfUser();
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  id = this.userService.getIdByUserLogin();

  _id: any;
  getIdOfUser() {
    this.userService.getIdByUser(this.id).subscribe((res: any) => {
      this._id = res;
      this.loadDuty();
    });
  }

  loadDuty() {
    this.userService.getDutyById(this._id).subscribe((res) => {
      this.usersList = res;
      this.datasource = new MatTableDataSource(this.usersList);
      this.datasource.paginator = this.paginator;
      this.datasource.sort = this.sort;
      // console.log(this.usersList);
    });
  }

  displayedColumns: string[] = ['user', 'name', 'email', 'deg', 'date', 'time'];

  transform(time: string): string {
    // Assuming time is in the format 'HH:mm'
    const parts = time.split(':');
    let hours = parseInt(parts[0], 10);
    const minutes = parts[1];
    const ampm = hours >= 12 ? 'PM' : 'AM';

    if (hours > 12) {
      hours -= 12;
    }

    return `${hours}:${minutes} ${ampm}`;
  }
}
