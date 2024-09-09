import { Component } from '@angular/core';
import { NgOtpInputModule } from  'ng-otp-input';
import { ModalService } from 'ngx-modal-ease'
@Component({
  selector: 'app-google-authenticator-model',
  standalone: true,
  imports: [NgOtpInputModule],
  templateUrl: './google-authenticator-model.component.html'
})
export class GoogleAuthenticatorModelComponent {
  constructor(private modalService: ModalService) {}
  closeModal() {
    this.modalService.close('CreateBankAccountModalComponent')
  }
  
}
