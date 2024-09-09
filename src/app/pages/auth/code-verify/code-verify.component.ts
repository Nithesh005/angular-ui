import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthzApiService } from '@service/authz/authz-api.service';
import { ToastrService } from 'ngx-toastr';
import { DataSharedService } from '../../../shared/data-shared.service';
@Component({
  selector: 'app-code-verify',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './code-verify.component.html'
})
export class CodeVerifyComponent {

  codeForm!: FormGroup
  email: string | undefined;
  mobile: string | undefined;
  isMobileVerify: boolean = true
  isEmailVerify: boolean = false;
  session_id: string | undefined;

  verify_email_form!:FormGroup;
  verify_mobile_form!:FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private activateRoute: ActivatedRoute, private authService: AuthzApiService, private toastrService: ToastrService, private dataShareService: DataSharedService) {
    
    this.session_id = this.activateRoute.snapshot.queryParams['session_id'];

    // console.log("email", this.email)
  }

  ngOnInit() {
    this.activateRoute.paramMap.subscribe(params => {
      // this.email = params.get('email') || '';
      this.mobile = params.get('mobile') || '';
    });
    // this.email = this.route.snapshot.paramMap.get('email');
    this.createForm()
    this.verify_email_form = this.fb.group({
      code: ['', [Validators.required,Validators.minLength(6)]]
    });

    this.verify_mobile_form = this.fb.group({
      mobile_verify_code: ['', [Validators.required,Validators.minLength(6)]]
    });
  }

  // email verify section start
  async email_verify_onSubmit()
  {     
    this.dataShareService.showLoader(true)
    this.verify_email_form.markAllAsTouched()
    if(this.verify_email_form.valid)
      {
      let payload = {
        email_id : this.email,    
        code : this.verify_email_form.get('code')?.value      
      }
      await this.authService.codeVerify(payload).then(
        async (response) => {
          if (response && response.code == 200 && response.data) {
            this.toastrService.success(response.data.message);
             this.router.navigateByUrl('/auth/sign-in')
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
  async mobile_number_verify_onSubmit()
  {   
    this.dataShareService.showLoader(true)
    this.verify_mobile_form.markAllAsTouched()
    if (this.verify_mobile_form.valid) {
      let payload = {
        mobile_number : this.mobile,    
        code : this.verify_mobile_form.get('mobile_verify_code')?.value      
      }
      await this.authService.codeMobileVerify(payload).then(
        async (response) => {
          if (response && response.code == 200 && response.data) {
            this.toastrService.success(response.data.message);
             this.router.navigateByUrl('/auth/sign-in')
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

  validateInput(event: any) {
    const input = event.target.value;
    event.target.value = input.replace(/[^0-9]/g, ''); 
  }

  // email verify section end


  createForm(){
    this.codeForm = this.fb.group({
      code: ['', Validators.required]
    })
  }

  async resentCode(){
    let payload: any = {}
    if(this.isMobileVerify)
    {
      payload.mobile = "+91"+ this.mobile
      payload.session_id = this.session_id
      payload.isEmail = false
      if(!this.mobile){
        this.toastrService.warning("Mobile Number must not be empty");
        return;
      }
    } else {
      payload.email = this.email
      payload.isEmail = true
      if(!this.email){
        this.toastrService.warning("Email Id must not be empty");
        return;
      }
    }

    // await this.authService.resentCode(payload).then(
    //   async (response) => {
    //     if (response && response.code == 200 && response.data) {
    //       this.toastrService.success(response.data?.message);
    //     } else {
    //       this.toastrService.error(response.data?.message);
    //     }
    //   },
    //   (err) => {
    //     this.toastrService.error('Error Occurred!');
    //   }
    // );
  }

  onSubmit() {
    this.codeForm.markAllAsTouched()
    if (this.codeForm.valid) {
      console.log(this.codeForm.value)
      if(!this.isMobileVerify){
        this.isEmailVerify = true
      }
      this.codeVerify()
    } else {
      console.log('Error')
    }
  }

  async codeVerify(){
    let payload :any = { }
    if(!this.isMobileVerify){
      payload = {
        email_id: this.email,
        code: this.codeForm.get('code')?.value,
      }
      await this.authService.codeVerify(payload).then(
        async (response) => {
          console.log("res", response)
          if (response && response.code == 200 && response.data) {
            // this.isEmailVerify = false;
            if(this.isEmailVerify && !this.isMobileVerify){
              this.toastrService.success(response.data.message);
              this.router.navigateByUrl('/auth/sign-in')
            } else {
              this.createForm()
            }
          } else {
            this.toastrService.error(response.data?.message);
          }
        },
        (err) => {
          this.toastrService.error('Error Occurred!');
        }
      );
    } else {
      payload = {
        mobile_number: "+91"+this.mobile,
        code: this.codeForm.get('code')?.value,
        session_id: this.session_id
      }
      await this.authService.codeMobileVerify(payload).then(
        async (response) => {
          console.log("res", response)
          if (response && response.code == 200 && response.data) {
            this.isEmailVerify = true;
            this.isMobileVerify = false;
            this.toastrService.success("Mobile Number Verified Successfully");
            this.codeForm.get('code')?.setValue('')
            this.codeForm.updateValueAndValidity();
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

}
