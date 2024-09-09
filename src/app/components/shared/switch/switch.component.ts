import { CommonModule } from '@angular/common'
import { Component, Input } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { GoogleAuthenticatorModelComponent } from '../google-authenticator-model/google-authenticator-model.component'
import { ModalService } from 'ngx-modal-ease'

@Component({
  selector: 'app-switch',
  standalone: true,
  imports: [CommonModule,FormsModule,GoogleAuthenticatorModelComponent],
  templateUrl: './switch.component.html'
})
export class SwitchComponent {
  @Input() isChecked?:boolean = false 
  @Input() label:string = ''
  constructor(private modalService: ModalService) {}

  open_google_authenticator_model() {    
    if(this.isChecked==false)
    {
      this.modalService.open(GoogleAuthenticatorModelComponent, {
        modal: {
          enter: 'enter-going-down 0.3s ease-out',
          leave: 'fade-out 0.5s'
        },
        overlay: {
          leave: 'fade-out 0.5s'
        },
        data: {
          type: 'Angular modal library'
        }
      })
    }
    
  }
}
