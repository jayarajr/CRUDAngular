import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { CommonService } from 'src/app/Services/common.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;

  constructor(private formBuilder: FormBuilder, private service: CommonService, private router: Router) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }
    var ParameterDyna = {
      PostData: {
        UserId: this.f.username.value,
        PCode: this.f.password.value

      },
      Url: this.service.API_URL + "AuthenticateUser"
    };
    console.log('11', ParameterDyna);
    this.service.ApiPost(ParameterDyna, (result: any): void => {
      debugger;
      if (!result.IsActive) {
        this.service.AlertError(result.ErrorMessage);
      }
      if (result.IsValid) {
        // this.service.AlertSuccess(result.SuccessMessage);
        this.service.alertWithAutoClose(result.SuccessMessage, (result: any): void => {
          this.router.navigate(["/users"]);
        });

      }
    });
  }

}
