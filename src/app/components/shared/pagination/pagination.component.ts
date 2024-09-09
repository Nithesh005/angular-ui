import { CommonModule } from '@angular/common'
import { Component, Input } from '@angular/core'

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pagination.component.html'
})
export class PaginationComponent {
  @Input() startIndex!: number
  @Input() endIndex!: number
  @Input() totalData!: number
  @Input() currentPage!: number
  @Input() totalPages!: number
  @Input() nextPage!: () => void
  @Input() prevPage!: () => void
  @Input() paginate!: (page: number) => void

  pages:number[] = []
  ngOnInit() {
    this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1)
  }
}
