import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthzApiService } from '@service/authz/authz-api.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-additional-info',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './additional-info.component.html'
})
export class AdditionalInfoComponent {
  codeForm!: FormGroup;
  error: string | undefined;
  mobile: string | undefined;
  isSendOTP: boolean = false
  session_id: string | undefined;
  access_token: string | undefined;
  
  constructor(private fb: FormBuilder, private router: Router, private activateRoute: ActivatedRoute, private authService: AuthzApiService, private toastrService: ToastrService) {
    // this.mobile = this.activateRoute.snapshot.queryParams['mobile_number'];
    this.error = this.activateRoute.snapshot.queryParams['error'];
    this.access_token = this.activateRoute.snapshot.queryParams['access_token'];
    this.mobile = decodeURIComponent(this.activateRoute.snapshot.queryParams['mobile_number']);
    if(this.mobile){
      this.mobile = this.mobile.replace(' ', '+')
    }
  }

  ngOnInit() {
    if(this.error && !this.mobile){
      this.createFormWithMobile()
    } else if(this.error && this.mobile){
      this.createCodeForm();
      this.sendOtp()
    } else if(this.access_token){
      this.router.navigateByUrl('/dashboards/user')
    }
  }

  createFormWithMobile(){
    this.codeForm = this.fb.group({
      mobile_number: ['',[
        Validators.required,
        Validators.pattern('^[0-9]{10}$')
      ]],
      code: ['', Validators.required]
    })
  }

  createCodeForm(){
    this.codeForm = this.fb.group({
      code: ['', Validators.required]
    })
  }
  
  async resentCode(){
    let payload: any = {}
      payload.mobile = this.mobile
      payload.session_id = this.session_id
      if(!this.mobile){
        this.toastrService.warning("Mobile Number must not be empty");
        return;
      }

    await this.authService.resentCode(payload).then(
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
  }

  onSubmit() {
    this.codeForm.markAllAsTouched()
    if (this.codeForm.valid) {
      console.log(this.codeForm.value)
      this.codeVerify()
    } else {
      console.log('Error')
    }
  }
  
  async sendOtp(){
    this.mobile = this.mobile ? this.mobile : "+91"+ this.codeForm.get('mobile_number')?.value;
    let payload :any = { }
      payload = {
        mobile: this.mobile
      }
      await this.authService.sendOtp(payload).then(
        async (response) => {
          console.log("res", response)
          if (response && response.code == 200 && response.data) {
            this.isSendOTP = true;
            this.codeForm.get('code')?.setValue('')
            this.codeForm.updateValueAndValidity();
            this.session_id = response.data.Details
          } else {
            this.toastrService.error(response.data?.message);
          }
        },
        (err) => {
          this.toastrService.error('Error Occurred!');
        }
      );
  }

  async codeVerify(){
    let payload :any = { }
      payload = {
        mobile_number: this.mobile,
        code: this.codeForm.get('code')?.value,
        session_id: this.session_id
      }
      await this.authService.codeMobileVerify(payload).then(
        async (response) => {
          console.log("res", response)
          if (response && response.code == 200 && response.data) {

            this.toastrService.success("Mobile Number Verified Successfully");
            // this.codeForm.get('code')?.setValue('')
            // this.codeForm.updateValueAndValidity();
            this.router.navigateByUrl('/auth/sign-in')
            // if(this.isEmailVerify && this.isMobileVerify){
            //   this.toastrService.success(response.data.message);
            //   this.router.navigateByUrl('/auth/sign-in')
            // } else {
            //   this.createForm()
            // }
          } else {
            this.toastrService.error(response.data?.message);
          }
        },
        (err) => {
          this.toastrService.error('Error Occurred!');
        }
      );

    
  }

}
