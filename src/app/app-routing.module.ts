import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { ForgetpasswordComponent } from './components/forgetpassword/forgetpassword.component';
import { ResetpasswordComponent } from './components/resetpassword/resetpassword.component';
import { HomeComponent } from './components/home/home.component';
import { FriendsComponent } from './components/friends/friends.component';
import { authTokenGuard } from './guards/auth-token.guard';
import { NetworkComponent } from './components/network/network.component';
import { SettingComponent } from './components/setting/setting.component';
import { UsersComponent } from './components/users/users.component';
import { rolePermissionAdminGuard } from './guards/role-permission.guard';
import { LogoutComponent } from './components/logout/logout.component';

const routes: Routes = [
  {path:"register", component:RegisterComponent},
  {path:"login", component:LoginComponent},
  {path:"forgetpassword", component:ForgetpasswordComponent},
  {path:"resetpassword", component:ResetpasswordComponent},
  {path: "home", component: HomeComponent, canActivate:[authTokenGuard]},
  {path: "friends", component: FriendsComponent, canActivate:[authTokenGuard]},
  {path: "network", component: NetworkComponent, canActivate:[authTokenGuard]},
  {path: "setting", component: SettingComponent, canActivate:[authTokenGuard]},
  {path: "allusers", component: UsersComponent, canActivate:[authTokenGuard, rolePermissionAdminGuard ]},
  {path: "logout", component: LogoutComponent, canActivate:[authTokenGuard ]},
  {path:"", component:LoginComponent},



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
