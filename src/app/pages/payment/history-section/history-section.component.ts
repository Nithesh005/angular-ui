import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import { DropdownComponent } from '@component/shared/dropdown/dropdown.component'
import { OptionsVerticalComponent } from '@component/shared/options-vertical/options-vertical.component'
import { TopBannerComponent } from '@component/shared/top-banner/top-banner.component'
import { latestTransactions } from '@data/transactions/latestTransactions'
import { TableService } from '@service/table.service'
@Component({
  selector: 'app-history-section',
  standalone: true,
  imports: [TopBannerComponent, DropdownComponent, OptionsVerticalComponent, CommonModule],
  templateUrl: './history-section.component.html'
})
export class HistorySectionComponent {
  transactions
  pages:number[]=[]
  constructor() {
    this.transactions = new TableService()
    this.transactions.initialize(latestTransactions, 14)
  }
  
  areAllItemsChecked(): boolean {
    return this.transactions.tableData.length > 1 && this.transactions.tableData.every((item) => item.isChecked)
  }

  ngOnInit(){
    this.pages = Array.from({ length: this.transactions.totalPages }, (_, i) => i + 1)
  }
}
