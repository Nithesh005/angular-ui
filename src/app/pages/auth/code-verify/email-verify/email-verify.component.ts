import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthzApiService } from '@service/authz/authz-api.service';
import { ToastrService } from 'ngx-toastr';
import { DataSharedService } from '../../../../shared/data-shared.service';


@Component({
  selector: 'app-email-verify',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './email-verify.component.html'
})
export class EmailVerifyComponent implements OnInit {
  email: any;
  verify_email_form!:FormGroup;
  constructor(private fb:FormBuilder, private dataShareService: DataSharedService,private router: Router, private authService: AuthzApiService, private toastrService: ToastrService,private route:ActivatedRoute){}  

  ngOnInit(): void {
    this.email = this.route.snapshot.paramMap.get('email');
    this.verify_email_form = this.fb.group({
      code: ['', [Validators.required,Validators.minLength(6)]]
    });
  }
  
  async onSubmit()
  {   
    this.dataShareService.showLoader(true)
    this.verify_email_form.markAllAsTouched()
    if (this.verify_email_form.valid) {
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


  async resentCode()
  {
    // this.dataShareService.showLoader(true)
    if (this.email) {
      let payload = {
        email_id : this.email    
      }
      await this.authService.SendEmailCode(payload).then(
        async (response) => {
          if (response && response.code == 200 && response.data) {
            this.toastrService.success(response.data.message);
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

  navigate_login()
  {    
    this.router.navigateByUrl('auth/sign-in'); 
  }

}
