import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../auth.services';
import { Route, Router, RouterLink } from '@angular/router';
import { CommonModule, NgIf } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule, RouterLink, NgIf],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login implements OnInit {

  loginForm: FormGroup;
  loading: boolean = false;
  error: string='';

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router ){
    this.loginForm=formBuilder.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(5)]]
      }
    )
  }

  public ngOnInit(): void {
    if(this.authService.isLoggedIn()){
      this.router.navigate(['/dashboard'])
    }
  }


  onSubmit(): void{
    if(this.loginForm.valid){
      this.loading=true;
      this.error='';

      const loginData=this.loginForm.value;      

      this.authService.login(loginData).subscribe(
        {
          next: (res)=>{
            console.log(res);
            
            localStorage.setItem('token', res.token);
            
            localStorage.setItem('user', JSON.stringify(res.user));
            
            this.loading=false;
            this.router.navigate(['/dashboard']);
          },

          error: (err)=>{
            this.error=err.error?.message || 'Login Failed';
            this.loading=false;
          }
        }
      )

    }
  }

}
