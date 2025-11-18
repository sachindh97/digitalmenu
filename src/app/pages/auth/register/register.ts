
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { RippleModule } from 'primeng/ripple';
import {AuthService} from '../../service/auth.service'
@Component({
  selector: 'app-register',
    imports: [ButtonModule, CheckboxModule, InputTextModule, PasswordModule, FormsModule, RouterModule, RippleModule],
  templateUrl: './register.html',
  styleUrl: './register.scss',
  providers:[AuthService]
})
export class Register {
    email: string = '';

    password: string = '';

    checked: boolean = false;
    constructor(private authservice:AuthService){}
    register(){
      let data={
        email:this.email,
        password:this.password
      }
      this.authservice.userRegister(data).subscribe((result:any)=>{
          console.log(result,'res##');
      });
    }
}
