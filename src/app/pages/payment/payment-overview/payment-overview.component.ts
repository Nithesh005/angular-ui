import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import { CreateBankAccountModalComponent } from '@component/shared/create-bank-account-modal/create-bank-account-modal.component'
import { DropdownComponent } from '@component/shared/dropdown/dropdown.component'
import { OptionsHorizComponent } from '@component/shared/options-horiz/options-horiz.component'
import { OptionsVerticalComponent } from '@component/shared/options-vertical/options-vertical.component'
import { TopBannerComponent } from '@component/shared/top-banner/top-banner.component'
import { recentPaymentData } from '@data/payment/recentPayments'
import { ChartOptions } from '@pages/dashboards/style-01/style-01.component'
import { TableService } from '@service/table.service'
import { NgApexchartsModule } from 'ng-apexcharts'
import { ModalService } from 'ngx-modal-ease'

@Component({
  selector: 'app-payment-overview',
  standalone: true,
  imports: [TopBannerComponent, DropdownComponent, OptionsVerticalComponent,OptionsHorizComponent, CommonModule, NgApexchartsModule],
  templateUrl: './payment-overview.component.html'
})
export class PaymentOverviewComponent {
  actionsData = [
    {
      id: 1,
      title: 'Make Transfer',
      desc: '365 Credits',
      icon: 'las text-2xl xxl:text-3xl la-exchange-alt'
    },
    {
      id: 2,
      title: 'Pay for QR Code',
      desc: '500+ Service Provider',
      icon: 'las text-2xl xxl:text-3xl la-qrcode'
    },
    {
      id: 3,
      title: 'Pay for Paypal',
      desc: '32 Credits',
      icon: 'lab text-2xl xxl:text-3xl la-paypal'
    }
  ]
  overviewChartOptions!:ChartOptions
  recentPayments
  pages:number[]=[]
  constructor(private modalService:ModalService){
    this.recentPayments=new TableService()
    this.recentPayments.initialize(recentPaymentData,8)
  }

  ngOnInit(){
    this.overviewChartOptions = {
      series: [
        {
          name: 'This Year',
          type: 'line',
          data: [38, 120, 80, 42, 30, 75, 36, 35, 78, 80, 40, 80]
        },
        {
          name: 'Previous Years',
          type: 'line',
          data: [94, 32, 20, 135, 68, 22, 40, 43, 30, 64, 50, 87]
        },
        {
          name: 'Last 5 Years',
          type: 'line',
          data: [10, 40, 34, 50, 48, 61, 68, 90, 148, 48, 90, 30]
        }
      ],
      chart: {
        height: 330,
        type: 'line',
        toolbar: {
          show: false
        }
      },
      legend: {
        show: true,
        position: 'bottom',
        itemMargin: {
          horizontal: 15
        },
        markers: {
          width: 6,
          height: 6,
          offsetX: -6
        }
      },
      colors: ['#63CC8A', '#FFC861', '#4371E9'],
      stroke: {
        width: [3, 3, 3],
        curve: 'smooth',
        lineCap: 'round'
      },
      xaxis: {
        type: 'category',
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        tickAmount: 12,

        axisTicks: {
          show: false
        },
        axisBorder: {
          show: false
        }
      },
      yaxis: {
        min: 0,
        max: 150,
        tickAmount: 5,
        labels: {
          offsetX: -17,
        }
      },
      fill: {
        opacity: 1
      },
      grid: {
        padding: {
          left: -10,
          bottom: 15
        },
        show: true
      }
    }
    this.pages = Array.from({ length: this.recentPayments.totalPages }, (_, i) => i + 1)
  }

  openModal(){
    this.modalService.open(CreateBankAccountModalComponent, {
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
