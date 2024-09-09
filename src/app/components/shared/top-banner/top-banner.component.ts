import { Component, Input } from '@angular/core'
import { ModalService } from 'ngx-modal-ease'
import { DialogModule } from 'primeng/dialog'
import { OpenAccountModalComponent } from '../open-account-modal/open-account-modal.component'

// Recommended for animation support
@Component({
  selector: 'app-top-banner',
  standalone: true,
  imports: [DialogModule],
  templateUrl: './top-banner.component.html'
})
export class TopBannerComponent {
  constructor(private modalService: ModalService) {}

  @Input() title?: string
  currentTitle = ''
  visible: boolean = false

  ngOnInit() {
    this.currentTitle = this.title ? this.title : 'Dashboard'
  }
  openModal() {
    this.modalService.open(OpenAccountModalComponent, {
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
