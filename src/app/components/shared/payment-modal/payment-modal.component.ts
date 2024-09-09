import { CommonModule } from '@angular/common'
import { Component, OnInit } from '@angular/core'
import { DropdownComponent } from '../dropdown/dropdown.component'
import { CalendarModule } from 'primeng/calendar'
import { FormsModule,ReactiveFormsModule } from '@angular/forms'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalService } from 'ngx-modal-ease'
import { AuthzApiService } from '@service/authz/authz-api.service'
import { ToastrService } from 'ngx-toastr'
@Component({
  selector: 'app-payment-modal',
  standalone: true,
  imports: [CommonModule, DropdownComponent, CalendarModule, FormsModule,ReactiveFormsModule],
  templateUrl: './payment-modal.component.html'
})
export class PaymentModalComponent implements OnInit{
  paymentForm: any;
  title: string='';
  key: string='';
  selectedBoard: any = null;
  date: Date | undefined
  currencies = ['ASSAM','BIHAR','GOA']
  selectedBillerName: any;
  selectedBillerId: any;
  // boards = ['APDCL Smart Prepaid Recharge', 'Assam Power Distribution Company Ltd'];

  // billerNames = this.boards.map(board => board.billerName);
  // boards = [
  //   {
  //     "billerId": "DEPA00000NATES",
  //     "billerName": "Department of Power, Government of Arunachal Pradesh",
  //     "customerParams": [
  //       {
  //         "dataType": "NUMERIC",
  //         "maxLength": "",
  //         "minLength": "",
  //         "optional": "false",
  //         "paramName": "Consumer Number",
  //         "regex": "^[0-9]{11}$"
  //       }
  //     ]
  //   },
  //   {
  //     "billerId": "NDMC00000DEL02",
  //     "billerName": "New Delhi Municipal Council (NDMC)",
  //     "customerParams": [
  //       {
  //         "dataType": "NUMERIC",
  //         "maxLength": "10",
  //         "minLength": "7",
  //         "optional": "false",
  //         "paramName": "Consumer Number",
  //         "regex": ""
  //       }
  //     ]
  //   }
  // ];    bro 2 min , ok
  // boards:any=[];
  // billerNames:any;
  billerNames: string[] = [];
  boards: any[] = [];
  customerParams_input_fields:any[]=[];
  constructor(private modalService:ModalService, private authzApiService:AuthzApiService,private fb: FormBuilder, private toastrService:ToastrService){}
  ngOnInit(): void {
      if(this.key)
      {
         
          this.get_service();
      }
      this.paymentForm = this.fb.group({ billerID: [''],billerName: ['', Validators.required]});
      // this.paymentForm = this.fb.group({
      //   billerID: [''],
      //   billerName: ['', Validators.required],
      //   caNumber: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      // });
  }
  
  openPaymentModal()
  {
      this.modalService.close('OpenAccountModalComponent')
  }

  get_service()
  {
   
    this.authzApiService.GetService(this.key).then((res: any) => {
      // Handle the successful response        
      if(res.code==200)      
      {  
        console.log("service data : ",res.data);    
        this.boards = res.data;         
        this.billerNames = ['', ...this.boards.map((board: any) => board.billerName)];
        //  console.log(this.billerNames);        
      }
      if(res.status==404)
      {
         
      }
    }).catch((err) => {
      // Handle any errors
      console.error('An error occurred:', err);
    });
    
  } 

  onBillerNameChange(selectedBillerName: string) {
    if (selectedBillerName === 'Select your option') {
      // Clear selection and form controls
      this.selectedBillerId = null;
      this.paymentForm.get('billerID')?.setValue(null);
      this.paymentForm.get('billerName')?.setValue('');  
      // Clear all dynamic controls and their values
      this.customerParams_input_fields.forEach((field: any) => {
        this.paymentForm.removeControl(field.paramName);
      });
      this.customerParams_input_fields = [];      
      // Optionally reset the form
      this.paymentForm.reset();
    } else {
      // Find the selected board
      this.selectedBoard = this.boards.find((board: any) => board.billerName === selectedBillerName);
      this.selectedBillerId = this.selectedBoard ? this.selectedBoard.billerId : null;
  
      if (this.selectedBoard) {
        // Set the selected biller ID and name
        this.paymentForm.get('billerID')?.setValue(this.selectedBillerId);
        this.paymentForm.get('billerName')?.setValue(selectedBillerName);
  
        // Update dynamic controls based on the selected board
        this.customerParams_input_fields = this.selectedBoard.customerParams;
        
        // Remove existing dynamic controls
        this.customerParams_input_fields.forEach((field: any) => {
          if (!this.paymentForm.get(field.paramName)) {
            const validators = [];
  
            if (field.optional === 'false') {
              validators.push(Validators.required);
            }
            if (field.minLength) {
              validators.push(Validators.minLength(+field.minLength));
            }
            if (field.maxLength) {
              validators.push(Validators.maxLength(+field.maxLength));
            }
            if (field.regex) {
              validators.push(Validators.pattern(field.regex));
            }
  
            this.paymentForm.addControl(field.paramName, this.fb.control('', validators));
          }
        });
      }
    }
  }
  
  

  fetch_bill_form_submit() {  
    if (this.paymentForm.valid) {
      // Gather form values
      const formData = this.paymentForm.value;  
      // Transform customerParams based on form controls and customerParams_input_fields
      const customerParams = this.customerParams_input_fields.map(field => ({
        name: field.paramName,
        value: formData[field.paramName]
      }));  
      // Construct the payload
      const payload = {
        billerId: this.selectedBillerId,
        customerParams: customerParams
      };  

      // const payload = {
      //   bill_amount:'70',
      //   billerId: this.selectedBillerId,
      //   customerParams: customerParams
      // };  
      // this.authzApiService.MakePayment().then(
      //    async (response) => {

      // });
      // console.log('Payload:', payload);  
      // Process form data, e.g., send to API
      this.authzApiService.FetchBill(payload).then(
        async (response) => {
          console.log('fetch bill response',response.code);
          if (response.code==200) {
            // this.toastrService.success(response.data.message);
            // window.open(response.url, '_blank');   
               const payload = {
                bill_amount:response.data.amount,
                billerId: this.selectedBillerId,
                customerParams: customerParams
              };  
              this.authzApiService.MakePayment(payload).then(
                 async (response) => {

              });
                
          } else if(response.code==404) {
            this.toastrService.error(response.data);
            const payload = {
              bill_amount:"52",
              billerId: this.selectedBillerId,
              customerParams: customerParams
            };  
            this.authzApiService.MakePayment(payload).then(
               async (response) => {

            });
          }
        },
        (err) => {
          this.toastrService.error('Error Occurred!');
        }
      );
    } else {
      // Handle form errors
      this.paymentForm.markAllAsTouched(); // This will trigger validation messages
    }
  }
  
   // Method to generate example value based on regex
   generateExample(regex: string): string {
    if (!regex) return 'N/A';

    try {
      // Create a RegExp object to parse the regex pattern
      const regexObj = new RegExp(regex);

      // Generate example values based on common patterns
      if (regex === '^[0-9]{10}$') return '1234567890'; // Numeric 10 digits
      if (regex === '^[a-zA-Z0-9]{5,10}$') return 'abc123'; // Alphanumeric between 5 and 10 characters
      if (regex === '^[A-Z]{2}[0-9]{4}$') return 'AB1234'; // 2 uppercase letters followed by 4 digits

      // Handle other regex patterns
      const example = 'example';
      return example;

    } catch (e) {
      console.error('Invalid regex pattern', e);
      return 'Invalid pattern';
    }
  }


  
  getErrorMessage(controlName: string, regex: string): string {
    const control = this.paymentForm.get(controlName);
    if (control?.hasError('required')) {
      return 'This field is required.';
    } else if (control?.hasError('minlength')) {
      return `Minimum length is ${control.errors.minlength.requiredLength}.`;
    } else if (control?.hasError('maxlength')) {
      return `Maximum length is ${control.errors.maxlength.requiredLength}.`;
    } else if (control?.hasError('pattern')) {
      return 'Invalid format.';
    }
    return '';
  }
  

  async fetch_bill_form_submit_old() {
    // window.open('https://www.example.com', '_blank');
    // Mark all controls as touched to trigger validation messages
    this.paymentForm.markAllAsTouched();  
    if(this.paymentForm.valid)
    {     
        // Handle form submission here
        // console.log('Form submitted:', this.paymentForm.value);        
        let payload = {
          "billerID": this.paymentForm.get('billerID')?.value,
          "customerParams": [{"name":"Consumer Number","value":this.paymentForm.get('caNumber')?.value}],       
        };

        // "customerParams":[{"name": "Consumer Number", "value": "054760011140"}]

          console.log('pay load data', payload);     
        // this.modalService.close(); 
        await this.authzApiService.FetchBill(payload).then(
          async (response) => {
            if (response && Object.keys(response).length > 0 && response.data.email) {
              this.toastrService.success(response.data.message);          
            } else {
              this.toastrService.error(response.data?.message);
            }
          },
          (err) => {
            this.toastrService.error('Error Occurred!');
          }
        );
    } 
    else
    {
      
      // Handle validation errors
      // console.log('Form is invalid');
    }
  }

}
