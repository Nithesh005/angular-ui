import { CommonModule } from '@angular/common'
import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup,  ReactiveFormsModule, Validators } from '@angular/forms'
import { Router, RouterLink } from '@angular/router'
import { AutocompleteComponent } from '@component/shared/autocomplete/autocomplete.component'
import { DropdownComponent } from '@component/shared/dropdown/dropdown.component'
import { AuthzApiService } from '@service/authz/authz-api.service'
import { ToastrService } from 'ngx-toastr'
import { stateData } from '../../../data/dropdown-lists/state'

@Component({
  selector: 'app-merchant-signup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink,DropdownComponent, AutocompleteComponent],
  templateUrl: './merchant-signup.component.html'
})
export class MerchantSignupComponent {
  passwordVisible = false
  passwordVisibleForConfirmPsw = false
  stateOptions = stateData;
  // cityOptions = ['India', 'USA', 'Germany']
  userType = ['Select', 'User', 'Merchant']
  isMerchant: boolean = false
  signUpForm!: FormGroup

  constructor(private fb: FormBuilder, private router:Router, private authService: AuthzApiService, private toastrService: ToastrService) {}

  ngOnInit() {
    this.createUserForm('')
  }

  handleDataFromDropdown(user_type: string){
    this.isMerchant = user_type == 'Merchant' ? true : false
    
    // if(this.isMerchant){
    //   this.createForm(user_type)
    // } else{
    //   this.createUserForm(user_type)
    // }
    // this.signUpForm.updateValueAndValidity();
  }

  handleDataFromCity(city: string){
    this.signUpForm.get('city')?.setValue(city);
    this.signUpForm.updateValueAndValidity();
  }

  handleDataFromstate(state: string){
    this.signUpForm.get('state')?.setValue(state);
    this.signUpForm.updateValueAndValidity();
  }

  createForm(user_type: string){
    this.signUpForm = this.fb.group({
      first_name: ['', [Validators.required, Validators.minLength(2)]],
      last_name: ['', [Validators.required, Validators.minLength(2)]],
      user_type: [user_type, Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobile_number: ['', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10),
        Validators.pattern('^[0-9]{10}$')
      ]],
      state: ['',Validators.required],
      city: ['India',Validators.required],
      company_name: ['',Validators.required],
      company_website: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(4)]],
      confirm_password: ['', Validators.required]
    })
  }

  createUserForm(user_type: string){
    this.signUpForm = this.fb.group({
      first_name: ['', [Validators.required, Validators.minLength(2)]],
      last_name: ['', [Validators.required, Validators.minLength(2)]],
      user_type: [user_type, Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobile_number: ['',[
        Validators.minLength(10),
        Validators.required,
        Validators.pattern('^[0-9]{10}$')
      ]],
      state: [''],
      city: [''],
      company_name: [''],
      company_website: [''],
      password: ['', [Validators.required, Validators.minLength(4)]],
      confirm_password: ['', Validators.required]
    })
  }


  toggleVisibility() {
    this.passwordVisible = !this.passwordVisible
  }

  toggleVisibilityForConfirmPsw() {
    this.passwordVisibleForConfirmPsw = !this.passwordVisibleForConfirmPsw
  }

  async onSubmit() {
    this.signUpForm.markAllAsTouched()
    if (this.signUpForm.valid && this.signUpForm.value.user_type !== 'Select') {
      let payload = {
        "first_name": this.signUpForm.get('first_name')?.value,
        "last_name": this.signUpForm.get('last_name')?.value,
        "user_type": this.signUpForm.get('user_type')?.value,
        "email": this.signUpForm.get('email')?.value,
        "username":this.signUpForm.get('email')?.value, // dont have to be shown in the UI
        "mobile_number": "+91" + this.signUpForm.get('mobile_number')?.value,
        "state": "",
        "city": "",
        "company_name": "",
        "company_website": "",
        "password":this.signUpForm.get('password')?.value,
        "confirm_password": this.signUpForm.get('password')?.value
      };
      await this.authService.register(payload).then(
        async (response) => {
          if (response && Object.keys(response).length > 0 && response.data.email) {
            // localStorage.setItem('email', response.data.email)
            // localStorage.setItem('user_type', this.signUpForm.value.user_type)
            // localStorage.setItem("AccessToken", response.data.AccessToken)
            this.toastrService.success(response.data.message);
            this.router.navigateByUrl(`auth/email-verify/${response.data.email}`)
            // this.router.navigate(['/auth/email-verify'], { queryParams: {'email': this.signUpForm.get('email')?.value, mobile: this.signUpForm.get('mobile_number')?.value, session_id: response.data.session_id }})
            // this.router.navigate(['/auth/email-verify'], { queryParams: {'email': this.signUpForm.get('email')?.value}})
          } else {
            this.toastrService.error(response.data?.message);
          }
        },
        (err) => {
          this.toastrService.error('Error Occurred!');
        }
      );      
    } else {
      console.log('Form is invalid', this.signUpForm);
      if (this.signUpForm.value.user_type === 'Select') {
        this.signUpForm.controls['user_type'].setErrors({ 'selectInvalid': true });
      }
    }
  }
  validatecharacterInput(event: any) {
    const input = event.target.value;
    // Replace non-alphabetic characters with an empty string
    event.target.value = input.replace(/[^a-zA-Z]/g, ''); 
  }

  validateInput(event: any) {
    const input = event.target.value;
    event.target.value = input.replace(/[^0-9]/g, ''); 
  }
}