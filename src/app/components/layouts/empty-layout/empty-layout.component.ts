import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-empty-layout',
  standalone: true,
  imports: [RouterOutlet, RouterModule],
  templateUrl: './empty-layout.component.html'
})
export class EmptyLayoutComponent {

}
