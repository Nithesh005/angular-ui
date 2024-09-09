import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import { ModalService } from 'ngx-modal-ease'

@Component({
  selector: 'app-create-bank-account-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './create-bank-account-modal.component.html'
})
export class CreateBankAccountModalComponent {
  flipped=false
  constructor(private modalService: ModalService) {}
  closeModal() {
    this.modalService.close('CreateBankAccountModalComponent')
  }
  handleFlip(){
    this.flipped=!this.flipped
  }
}
