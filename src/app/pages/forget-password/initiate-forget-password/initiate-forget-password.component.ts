import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { ActivatedRoute, Router, RouterLink } from '@angular/router'
import { AuthzApiService } from '@service/authz/authz-api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-initiate-forget-password',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './initiate-forget-password.component.html'
})
export class InitiateForgetPasswordComponent {
  passwordVisible = false;
  passwordVisibleForReset = false;
  emailForm!: FormGroup
  loading: boolean = false;
  toggleVisibility() {
    this.passwordVisible = !this.passwordVisible
  }

  toggleVisibilityForReset() {
    this.passwordVisibleForReset = !this.passwordVisibleForReset
  }
  constructor(private fb: FormBuilder, private router: Router, private activateRoute: ActivatedRoute,
    private authService: AuthzApiService, private toastrService: ToastrService) {}

  ngOnInit() {
    this.emailForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    })
  }

  async onSubmit() {
    this.emailForm.markAllAsTouched()
    if (this.emailForm.valid) {
      this.loading = true;
      await this.authService.initiateForgetPassword(this.emailForm.get('email')?.value).then(
        async (response) => {
          if (response && response.code == 200 && response.data) {
            this.toastrService.success(response.data?.message);
            this.router.navigate(['/auth/password/reset/completion'], { queryParams: {'email': this.emailForm.get('email')?.value }})
          } else {
            this.toastrService.error(response.data?.message);
          }
        },
        (err) => {
          this.toastrService.error('Error Occurred!');
        }
      );
      this.loading = true;
    } else {
      this.toastrService.error('Email Id must not be empty');
      this.loading = true;
    }
    
  }
}
