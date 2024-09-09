import { CommonModule } from '@angular/common'
import { Component, OnInit } from '@angular/core'
import { ModalService } from 'ngx-modal-ease'
import { OptionsHorizComponent } from '@component/shared/options-horiz/options-horiz.component'
import { TopBannerComponent } from '@component/shared/top-banner/top-banner.component'
import { providersTabData } from '@data/payment/providers'
import { PaymentModalComponent } from '@component/shared/payment-modal/payment-modal.component'
@Component({
  selector: 'app-payment-providers',
  standalone: true,
  imports: [TopBannerComponent, OptionsHorizComponent, CommonModule, PaymentModalComponent],
  templateUrl: './payment-providers.component.html'
})
export class PaymentProvidersComponent implements OnInit {
  constructor(private modalService: ModalService) {}
  ngOnInit(): void {
    
  }

  providers = providersTabData
  activeTab = this.providers[0].title
  chatShow=false
  setActiveTab(title:string){
    this.activeTab=title
  }
  openPaymentModal(service_provider_title:any,service_provider_key:any) {   
    this.modalService.open(PaymentModalComponent, {
      modal: {
        enter: 'enter-going-down 0.3s ease-out',
        leave: 'fade-out 0.5s'
      },
      overlay: {
        leave: 'fade-out 0.5s'
      },
      data: {
        title: service_provider_title,
        key: service_provider_key,
        type: 'Angular modal library'
      }
    })
  }

  
}
