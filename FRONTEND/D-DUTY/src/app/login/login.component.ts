import { Component } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms'
import {ToastrService} from 'ngx-toastr'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private builder: FormBuilder, private toast: ToastrService){}

  // loginForm=this.builder.group({
  //   email:this.builder.control('', Validators.required),
  //   password:this.builder.control('', Validators.required)
  // })

  // proceedLogin(){
  //   if(this.loginForm.valid){

  //   }else{
  //     this.toast.warning('Please enter valid credentials!')
  //   }
  // }
}
