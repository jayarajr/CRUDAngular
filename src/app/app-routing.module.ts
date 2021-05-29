import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddEditUserComponent } from './Pages/add-edit-user/add-edit-user.component';
import { LoginComponent } from './Pages/login/login.component';
import { UsersComponent } from './Pages/users/users.component';

const routes: Routes = [{ path: '', component: LoginComponent, data: { title: 'Welcome to Login' } },
{ path: 'Login', component: LoginComponent, data: { title: 'Welcome to Login' } },
{ path: 'users', component: UsersComponent, data: { title: 'Users' } },
{ path: 'add', component: AddEditUserComponent, data: { title: 'Add User' } },
{ path: 'users/edit/:id', component: AddEditUserComponent, data: { title: 'Edit User' } }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
