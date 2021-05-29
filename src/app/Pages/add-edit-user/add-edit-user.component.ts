import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AbstractControlOptions, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { CommonService } from 'src/app/Services/common.service';




@Component({
  selector: 'app-add-edit-user',
  templateUrl: './add-edit-user.component.html',
  styleUrls: ['./add-edit-user.component.scss']
})
export class AddEditUserComponent implements OnInit {
  form!: FormGroup;
  isAddMode!: boolean;
  id!: string;
  loading = false;
  submitted = false;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private service: CommonService) {

  }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;

    // password not required in edit mode
    const passwordValidators = [Validators.minLength(6)];
    if (this.isAddMode) {
      passwordValidators.push(Validators.required);
    }


    this.form = this.formBuilder.group({
      UserId: ['', Validators.required],
      FirstName: ['', Validators.required],
      LastName: ['', Validators.required],
      Email: ['', [Validators.required, Validators.email]],
      IsActive: [''],
      PCode: ['', [Validators.minLength(6), this.isAddMode ? Validators.required : Validators.nullValidator]],
      confirmPassword: ['', this.isAddMode ? Validators.required : Validators.nullValidator],
      UserAction: ['']

    }, { validators: this.checkPasswords });

    this.form.patchValue({ IsActive: 'true', tc: true });
    if (!this.isAddMode) {
      var ParameterDyna = {
        PostData: { "UserId": this.id },
        Url: this.service.API_URL + "GetUser"
      };
      console.log('11', ParameterDyna);
      this.service.ApiPost(ParameterDyna, (result: any): void => {
        this.form.patchValue(result);
        console.log(result.IsActive);
        this.form.patchValue({ IsActive: result.IsActive == false ? 'false' : 'true', tc: true });

      });
      /*this.userService.getById(this.id)
        .pipe(first())
        .subscribe(x => this.form.patchValue(x));*/
    }
  }
  onSubmit() {
    debugger;
    this.submitted = true;

    // reset alerts on submit


    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    this.loading = true;
    if (this.isAddMode) {
      this.createUser();
    } else {
      this.updateUser();
    }
  }
  private createUser() {
    this.form.controls["UserAction"].setValue("A");
    this.form.controls["IsActive"].setValue(this.form.controls["IsActive"].value == "true" ? true : false);
    console.log(this.form.value);
    var ParameterDyna = {
      PostData: this.form.value,
      Url: this.service.API_URL + "AddUpdateDeleteUser"
    };
    console.log('11', ParameterDyna);
    this.service.ApiPost(ParameterDyna, (result: any): void => {
      debugger;
      if (result.IsValid) {
        this.router.navigate(["/users"]);
      }
    });
    /*this.userService.create(this.form.value)
      .pipe(first())
      .subscribe(() => {
        this.router.navigate(['../'], { relativeTo: this.route });
      })
      .add(() => this.loading = false);*/
  }

  private updateUser() {
    this.form.controls["UserAction"].setValue("U");
    this.form.controls["IsActive"].setValue(this.form.controls["IsActive"].value == "true" ? true : false);
    console.log(this.form.value);
    var ParameterDyna = {
      PostData: this.form.value,
      Url: this.service.API_URL + "AddUpdateDeleteUser"
    };
    console.log('11', ParameterDyna);
    this.service.ApiPost(ParameterDyna, (result: any): void => {
      debugger;
      if (result.IsValid) {
        this.router.navigate(["/users"]);
      }
    });
    /*this.userService.update(this.id, this.form.value)
      .pipe(first())
      .subscribe(() => {
        this.router.navigate(['../../'], { relativeTo: this.route });
      })
      .add(() => this.loading = false);*/
  }
  checkPasswords(group: FormGroup) { // here we have the 'passwords' group     
    const password = group.get('PCode').value;
    const confirmPassword = group.get('confirmPassword').value;
    if (password != confirmPassword) {
      group.get('confirmPassword').setErrors({ mustMatch: true });

    }
    else {
      group.get('confirmPassword').setErrors(null);
    }
    return null;
    //return password === confirmPassword ? null : { mustMatch: true }
  }
  setActiveStatus(value) {
    this.form.controls["rdoActive"].setValue = value;

  }
  get f() { return this.form.controls; }


}
