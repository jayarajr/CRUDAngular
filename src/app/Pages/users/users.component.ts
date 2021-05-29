import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/Services/common.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  Users: any;

  constructor(private service: CommonService, private router: Router) { }

  ngOnInit() {
    this.FillUser();
  }
  FillUser() {

    var ParameterDyna = {
      PostData: {
      },
      Url: this.service.API_URL + "GetAllUsers"
    };

    this.service.ApiPost(ParameterDyna, (result: any): void => {

      this.Users = result;
    });
  }
  deleteUser(id: string) {

    var ParameterDyna = {
      PostData: { "UserId": id, "UserAction": "D" },
      Url: this.service.API_URL + "AddUpdateDeleteUser"
    };
    this.service.AlertConfirm("Are you sure want to delete the user", (result: any): void => {
      this.service.ApiPost(ParameterDyna, (result: any): void => {
        debugger;
        this.service.AlertSuccess("User Deleted Successfully!!!")
        window.location.reload();

      });
    });
    // const user = this.users.find(x => x.id === id);
    // if (!user) return;
    // user.isDeleting = true;
    // this.userService.delete(id)
    //     .pipe(first())
    //     .subscribe(() => this.users = this.users.filter(x => x.id !== id));
  }
}
