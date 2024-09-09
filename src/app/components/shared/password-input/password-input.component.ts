import { Component, Input } from '@angular/core'

@Component({
  selector: 'app-password-input',
  standalone: true,
  imports: [],
  templateUrl: './password-input.component.html'
})
export class PasswordInputComponent {
  @Input() label:string='Password'
  isVisible = false
  toggleVisibility() {
    this.isVisible = !this.isVisible
  }
}
