import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/authService';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, CommonModule],
  templateUrl: './login-page.html',
  styleUrls: ['./login-page.css']
})
export class LoginPageComponent implements OnInit{

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private authService: AuthService ){}

  id: any;
  loginErrorMessage: string = '';

  loginForm= new FormGroup({
    email: new FormControl('',  [Validators.required, Validators.email]),
    password:new FormControl('',  [Validators.required]),
    role: new FormControl('', [Validators.required]) 
  })
  get getEmail(){
    return this.loginForm.controls['email'];
  }
  get getPassword(){
    return this.loginForm.controls['password'];
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe({
      next:(params)=>{        
        this.getEmail.setValue('');
        this.getPassword.setValue('');
      }
    })
  }

  authHandler(event: Event){
    event.preventDefault();
    if(this.loginForm.status === 'VALID'){
      const roleId = this.loginForm.value.role
      this.authService.login(this.loginForm.value).subscribe({
        next: ()=>{
          switch (roleId) {
            case '0':
              this.router.navigate(['/admin/dashboard']);
              break;
            case '1':
              this.router.navigate(['/student/dashboard']);
              break;
            default:
              this.loginErrorMessage = 'Unknown role selected.';
          }
        },
        error: (err) => {
          console.error('Login failed', err)
          this.loginErrorMessage = 'Invalid credentials. Please double-check your email and password.';
        }
      })
    }else{
      console.log('Form is invalid');
      this.loginErrorMessage = 'Invalid credentials. Please double-check your email and password.';
    }
  }

}
