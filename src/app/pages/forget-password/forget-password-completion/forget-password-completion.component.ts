import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { ActivatedRoute, Router, RouterLink } from '@angular/router'
import { AuthzApiService } from '@service/authz/authz-api.service'
import { ToastrService } from 'ngx-toastr'

@Component({
  selector: 'app-forget-password-completion',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './forget-password-completion.component.html'
})
export class ForgetPasswordCompletionComponent {
  passwordVisible = false
  email: string | undefined;
  resetForm!: FormGroup
  passwordVisibleForReset = false;
  reset_loading: boolean = false;
  resend_loading: boolean = false;
  forget_password_resend_loading: boolean = false;

  toggleVisibility() {
    this.passwordVisible = !this.passwordVisible
  }
  toggleVisibilityForReset() {
    this.passwordVisibleForReset = !this.passwordVisibleForReset
  }
  constructor(private fb: FormBuilder, private router: Router, private activateRoute: ActivatedRoute,
    private authService: AuthzApiService, private toastrService: ToastrService) {
    this.email =  decodeURIComponent(this.activateRoute.snapshot.queryParams['email']);
    if(this.email){
      this.email = this.email.replace(' ', '+')
    }
  }

  ngOnInit() {
    this.resetForm = this.fb.group({
      code: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(4)]],
      confirm_password: ['', [Validators.required]]
    })
  }

  async forgetResend(){
    // alert("test")
    let payload: any = {}
    if (this.email) {
      this.forget_password_resend_loading = true;
      await this.authService.initiateForgetPassword(this.email).then(
        async (response) => {
          if (response && response.code == 200 && response.data) {
            this.toastrService.success(response.data?.message);
          } else {
            this.toastrService.error(response.data?.message);
          }
        },
        (err) => {
          this.toastrService.error('Error Occurred!');
        }
      );
      this.forget_password_resend_loading = true;
    } else {
      this.toastrService.error('Email Id must not be empty');
      this.forget_password_resend_loading = true;
    }  
    payload.email = this.email
    // payload.isEmail = true
    if(!this.email){
      this.toastrService.warning("Email Id must not be empty");
      return;
    }
    this.resend_loading=true;
    await this.authService.forgetResend(payload).then(      
      async (response) => {
        if (response && response.code == 200 && response.data) {
          this.resend_loading=false;
          this.toastrService.success(response.data?.message);
        } else {
          this.resend_loading=false;
          this.toastrService.error(response.data?.message);
        }
      },
      (err) => {
        this.resend_loading=false;
        this.toastrService.error('Error Occurred!');
      }
    );
  }
  
  async onSubmit() {
    this.resetForm.markAllAsTouched();  
    if (this.resetForm.valid) {
      this.reset_loading = true;
  
      let payload = {
        "email_id": this.email,
        "password": this.resetForm.get('password')?.value,
        "code": this.resetForm.get('code')?.value
      };
  
      try {
        const response = await this.authService.forgotPassword(payload);
  
        if (response && response.code === 200 && response.data) {
          this.toastrService.success(response.data?.message);
          this.router.navigateByUrl('/auth/sign-in');
        } else {
          this.toastrService.error(response.data?.message);
        }
      } catch (err) {
        this.toastrService.error('Error Occurred!');
      } finally {
        this.reset_loading = false; // Ensure reset_loading is set to false in all cases
      }
  
    } else {
      this.toastrService.success("Error Occurred");
      this.reset_loading = false; // Reset loading state if the form is invalid
    }
  }
  

  backToReset(){
      this.router.navigateByUrl('/auth/password/reset')
  }
}
