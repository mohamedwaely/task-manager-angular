import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../auth.services';
import { Route, Router, RouterLink } from '@angular/router';
import { CommonModule, NgIf } from '@angular/common';


@Component({
  selector: 'app-register',
  imports: [CommonModule, ReactiveFormsModule, RouterLink, NgIf],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register implements OnInit {
  
  registerForm: FormGroup;
  loading = false
  error = ''

  
  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router){
      this.registerForm=this.formBuilder.group({
        username: ['', [Validators.required, Validators.minLength(3)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(5)]]

      })
  }

  ngOnInit(): void {
    if(this.authService.isLoggedIn()){
      this.router.navigate(['/dashboard'])
    }
  }

  onSubmit(): void{
    if(this.registerForm.valid){
      this.loading=true
      this.error=''

      const formData=this.registerForm.value;
      this.authService.register(formData).subscribe(
        {
          next: (res) => {
            // localStorage.setItem('token', res.token);
            // localStorage.setItem('user', JSON.stringify(res.user));
            this.loading=false;
            this.router.navigate(['/login']);
            
          },

          error: (err) => {
            this.error=err.error?.message || 'Registration Failed';
            this.loading=false;
          }

        }
      )
    }
  }


}
