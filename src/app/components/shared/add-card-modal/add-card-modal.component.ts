import { Component } from '@angular/core';
import { ModalService } from 'ngx-modal-ease';

@Component({
  selector: 'app-add-card-modal',
  standalone: true,
  imports: [],
  templateUrl: './add-card-modal.component.html'
})
export class AddCardModalComponent {
  constructor(private modalService:ModalService){}
  closeModal(){
    this.modalService.close('AddCardModalComponent')
  }
}
