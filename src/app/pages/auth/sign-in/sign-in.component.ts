import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { Router, RouterLink } from '@angular/router'
import { AuthzApiService } from '@service/authz/authz-api.service'
import { NgxLoadingModule } from 'ngx-loading'
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { DataSharedService } from '../../../shared/data-shared.service'
import { URLHelper } from '../../../shared/helpers/UrlHelpers'


@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, CommonModule, NgxLoadingModule],
  templateUrl: './sign-in.component.html'
})
export class SignInComponent {
  passwordVisible = false
  loading: boolean = false;
  signInForm!: FormGroup
  toggleVisibility() {
    this.passwordVisible = !this.passwordVisible
  }

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthzApiService, private toastrService: ToastrService, private dataShareService: DataSharedService) { }

  ngOnInit() {
    this.dataShareService.showLoader(false)
    this.signInForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]]
    })
  }

  async onSubmit() {       
    this.dataShareService.showLoader(true)
    this.signInForm.markAllAsTouched()
    if (this.signInForm.valid) {
      this.loading = true;
      let payload = {
        email_id: this.signInForm.get('email')?.value,
        password: this.signInForm.get('password')?.value
      }
      // console.log(payload);
      
      await this.authService.login(payload).then(
        async (response) => {
          console.log(response);
          if (response && response.code == 200) {
            this.toastrService.success(response.status);
            // console.log(response.data.token.AccessToken);
            localStorage.setItem("AccessToken", response.data.token.AccessToken)
            this.router.navigateByUrl('/dashboards/dashboards/user')
          }
          // else if (response && response.code == 404 && response.data.message=="Incorrect username or password.") {
          else if (response && response.code == 404) {
            this.toastrService.error(response.data?.message);
          }
          // else if (response && !response.data.Mobile_Verified && !response.data.Email_Verified) {
          //   this.toastrService.error(response.data?.message);
          //   // this.router.navigateByUrl(`auth/mobile-verify/${response.data.mobile_number}`)
          //   this.router.navigateByUrl(`auth/code-verify/${payload.email_id}/${response.data.mobile_number}`)
          //   // code-verify/:email/:mobile_number
          // } 
          else if (response && !response.data.Email_Verified) {
            this.router.navigateByUrl(`auth/email-verify/${payload.email_id}`)
            this.toastrService.error(response.data?.message);
            // code-verify/:email/:mobile_number
          } 
          else if (response && !response.data.Mobile_Verified) {
            this.toastrService.error(response.data?.message);
            this.router.navigateByUrl(`auth/mobile-verify/${response.data.mobile_number}`)
            // code-verify/:email/:mobile_number
          }
         
          else {
            // this.router.navigateByUrl(`auth/code-verify/${payload.email_id}/${response.data.mobile_number}`)
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
    this.loading = false; 
  }

  socialProvider() {
    let baseUrl = URLHelper.getBaseURL();
    window.location.href = "https://social.ezbillpay.in/oauth2/authorize?identity_provider=Google&redirect_uri=https://client.ezbillpay.in&response_type=TOKEN&client_id=2fk0anr6odenh3eusp2fibnaka&scope=email%20openid%20phone"
  }

}
