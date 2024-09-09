import { CommonModule } from '@angular/common'
import { Component, OnInit } from '@angular/core'
import { RouterLink } from '@angular/router'
import { DropdownComponent } from '@component/shared/dropdown/dropdown.component'
import { TopBannerComponent } from '@component/shared/top-banner/top-banner.component'
import { AuthzApiService } from '@service/authz/authz-api.service'
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, FormsModule } from '@angular/forms'
import { ToastrService } from 'ngx-toastr'


@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, RouterLink, TopBannerComponent, DropdownComponent, FormsModule, ReactiveFormsModule],
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {
  countries = ['USA', 'UK', 'Canada']
  privacy = ['Anyone', 'Friends', 'Friends of Friends']
  profileForm!: FormGroup
  imagePreview: string | ArrayBuffer | null = 'assets/images/placeholder.png'; // Default image preview
  isChecked: boolean = false;
  confirm_delete_checked_status: boolean = true;
  email:any;
  previewUrl: string | ArrayBuffer | null = null;
  selectedFile: File | null = null;
  isFileValid: boolean = false;
 
  constructor(private fb: FormBuilder, private authService: AuthzApiService,private toastrService: ToastrService){}
  ngOnInit(): void {     
      this.profileForm = this.fb.group({
          profile_photo: [null] ,
          first_name: [''],
          last_name: [''],
          email: [''],
          phone: [''],
          gender: [''],
          tagline: [''],
          location: [''],
          address1: [''],
          address2: [''],
          zipcode: [''],
          profile_photo_visibility:['']
      });
      this.get_user_info();
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

//  profile pic section start
 // Handle the file selection
 onFileSelected(event: Event): void {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files.length) {
    const file = input.files[0];

    // Check file type for PNG and JPEG
    if (!file.type.match('image/png') && !file.type.match('image/jpeg')) {
      this.toastrService.error('Only PNG or JPEG images are allowed');
      return;
    }

    this.selectedFile = file;

    // File Preview
    const reader = new FileReader();
    reader.onload = () => {
      this.previewUrl = reader.result;
    };
    reader.readAsDataURL(file);
  }
}

// Cancel the file upload
onCancel(): void {
  this.previewUrl = null;
  this.selectedFile = null;
}

// Submit the file payload
onSubmit(): void {
  if (this.selectedFile) {
    const formData = new FormData();
    formData.append('profilePic', this.selectedFile);

    // Send this formData to your API via a service (e.g., apiService)
    this.toastrService.success('Profile picture uploaded successfully');
    // Implement API service call here
  } else {
    this.toastrService.warning('Please select a file to upload');
  }
}
//  profile pic section end


  async get_user_info()
  {   
      // this.profileForm.get('first_name')?.setValue('mani');
      // this.profileForm.get('last_name')?.setValue('K');
      // this.profileForm.get('email')?.setValue('mani@gmail.com');
      // this.profileForm.get('phone')?.setValue('9874563210');
      // this.profileForm.get('gender')?.setValue('M');
      await this.authService.userInfo().then(
        async (response) => {        
          if(response && response.code == 200)
          {             
              this.profileForm.get('first_name')?.setValue(response.data.first_name ? response.data.first_name : '');
              this.profileForm.get('last_name')?.setValue(response.data.last_name ? response.data.last_name : '');
              this.profileForm.get('email')?.setValue(response.data.email ? response.data.email : '');
              this.email=response.data.email ? response.data.email : '';
              this.profileForm.get('phone')?.setValue(response.data.mobile_number ? response.data.mobile_number : '');
              this.profileForm.get('gender')?.setValue(response.data.gender ? response.data.gender : '');
              this.profileForm.get('tag_line')?.setValue(response.data.tag_line ? response.data.tag_line : '');
              this.profileForm.get('location')?.setValue(response.data.location ? response.data.location : '');
              this.profileForm.get('address1')?.setValue(response.data.address1 ? response.data.address1 : '');
              this.profileForm.get('address2')?.setValue(response.data.address2 ? response.data.address2 : '');
              this.profileForm.get('zipcode')?.setValue(response.data.pin_code ? response.data.pin_code : '');
              this.profileForm.get('profile_photo_visibility')?.setValue(response.data.profile_photo_visibility ? response.data.profile_photo_visibility : '');
          }else{
            // this.toastrService.error(response.data?.message);
          }
        },
        (err) => {
            // this.toastrService.error('Error Occurred!');
        }
      ); 
  }

  async  profile_form_submit()
  {
    let payload = {
      "first_name": this.profileForm.get('first_name')?.value,
      "last_name": this.profileForm.get('last_name')?.value,      
      "email": this.profileForm.get('email')?.value,      
      "phone": this.profileForm.get('phone')?.value,
      "gender": this.profileForm.get('gender')?.value,      
      //"tagline": this.profileForm.get('tagline')?.value,      
      "location": this.profileForm.get('location')?.value,      
      "address1": this.profileForm.get('address1')?.value,      
      "address2": this.profileForm.get('address2')?.value,      
      "zipcode": this.profileForm.get('zipcode')?.value,
      "profile_photo_visibility": this.profileForm.get('profile_photo_visibility')?.value
    };    
    await this.authService.UpdateUserInfo(payload).then(
      async (response) => {
        console.log(response);
        if (response && response.code == 200) {
          this.toastrService.success(response.status);
          // console.log(response.data.token.AccessToken);
          // localStorage.setItem("AccessToken", response.data.token.AccessToken)
          // this.router.navigateByUrl('/dashboards/dashboards/user')
        }
        // else if (response && response.code == 404 && response.data.message=="Incorrect username or password.") {
        else if (response && response.code == 404) {
          // this.toastrService.error(response.data?.message);
        }
        // else if (response && !response.data.Mobile_Verified && !response.data.Email_Verified) {
        //   this.toastrService.error(response.data?.message);
        //   // this.router.navigateByUrl(`auth/mobile-verify/${response.data.mobile_number}`)
        //   this.router.navigateByUrl(`auth/code-verify/${payload.email_id}/${response.data.mobile_number}`)
        //   // code-verify/:email/:mobile_number
        // } 
        else if (response && !response.data.Email_Verified) {
          // this.router.navigateByUrl(`auth/email-verify/${payload.email_id}`)
          // this.toastrService.error(response.data?.message);
          // code-verify/:email/:mobile_number
        } 
        else if (response && !response.data.Mobile_Verified) {
          // this.toastrService.error(response.data?.message);
          // this.router.navigateByUrl(`auth/mobile-verify/${response.data.mobile_number}`)
          // code-verify/:email/:mobile_number
        }
        
        else {
          // this.router.navigateByUrl(`auth/code-verify/${payload.email_id}/${response.data.mobile_number}`)
          // this.toastrService.error(response.data?.message);
        }
      },
      (err) => {
        // this.toastrService.error('Error Occurred!');
      }
    );
  }

  checkStatus()
  {
    if(this.isChecked)
    {
      this.confirm_delete_checked_status=true;
      // alert('Checkbox is checked.')      
    } else {
      this.confirm_delete_checked_status=false;
      // alert('Checkbox is not checked.')
    }
  
  }

  delete_account()
  {
    let payload = {       
      "email": this.email,      
    }; 
    console.log('payload delete',payload);
    return;   
  }
}
