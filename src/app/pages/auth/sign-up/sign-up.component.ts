import { CommonModule } from '@angular/common'
import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup,  ReactiveFormsModule, Validators } from '@angular/forms'
import { Router, RouterLink } from '@angular/router'
import { AuthzApiService } from '@service/authz/authz-api.service'
import { ToastrService } from 'ngx-toastr'

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './sign-up.component.html'
})
export class SignUpComponent implements OnInit {
  passwordVisible = false
  signUpForm!: FormGroup
  toggleVisibility() {
    this.passwordVisible = !this.passwordVisible
  }

  constructor(private fb: FormBuilder, private router:Router, private authService: AuthzApiService, private toastrService: ToastrService) {}

  ngOnInit() {
    this.signUpForm = this.fb.group({
      firstname: ['', [Validators.required, Validators.minLength(2)]],
      lastname: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]]
    })
  }

  async onSubmit() {
    this.signUpForm.markAllAsTouched()
    if (this.signUpForm.valid) {
      let payload = {
        "first_name": this.signUpForm.get('firstname')?.value,
        "user_type":"user", 
        "email": this.signUpForm.get('email')?.value,
        "username":this.signUpForm.get('email')?.value,
        "password":this.signUpForm.get('password')?.value,
        "confirm_password": this.signUpForm.get('password')?.value
      };
      await this.authService.register(payload).then(
        async (response) => {
          console.log("while sign up",response);
          if (response && Object.keys(response).length > 0 && response.data.email) {
            this.toastrService.success(response.data.message);
            // localStorage.setItem("AccessToken", response.data.AccessToken)
            this.router.navigateByUrl(`auth/email-verify/${response.data.email}`)
            // this.router.navigate(['/auth/email-verify'], { queryParams: {'email': response.data.email}})
          } else {
            this.toastrService.error(response.data?.message);
          }
        },
        (err) => {
          this.toastrService.error('Error Occurred!');
        }
      );
      
    } else {
      this.toastrService.error('Error Occurred!');
    }
  }
}
