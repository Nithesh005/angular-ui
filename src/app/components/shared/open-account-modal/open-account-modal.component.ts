import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import { DropdownComponent } from '../dropdown/dropdown.component'
import { CalendarModule } from 'primeng/calendar'
import { FormsModule } from '@angular/forms'
import { ModalService } from 'ngx-modal-ease'

@Component({
  selector: 'app-open-account-modal',
  standalone: true,
  imports: [CommonModule, DropdownComponent, CalendarModule, FormsModule],
  templateUrl: './open-account-modal.component.html'
})
export class OpenAccountModalComponent {
  date: Date | undefined
  currencies = ['USD', 'GBP', 'YEN', 'JPN']
  status = ['active', 'inactive']
  constructor(private modalService:ModalService){}
  closeModal(){
    this.modalService.close('OpenAccountModalComponent')
  }
}
