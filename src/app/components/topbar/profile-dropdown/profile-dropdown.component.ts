import { NgClass } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DataService } from '@service/data.service';
import { AuthzApiService } from '@service/authz/authz-api.service';
@Component({
  selector: 'app-profile-dropdown',
  standalone: true,
  imports: [NgClass, RouterLink],
  templateUrl: './profile-dropdown.component.html'
})
export class ProfileDropdownComponent implements OnInit {
  isOpen = false
  userName: string = '';
  userEmail: string = '';
  constructor(private dataService:DataService, private authService:AuthzApiService){}
  ngOnInit(): void {
    this.get_user_info();
    // this.userName = this.dataService.getUserName();   
    // this.userEmail = this.dataService.getUserEmail();
  }

  async get_user_info()
  {       
      // this.userName='mani1';     
      // this.userEmail ='mani@gmail.com';     
      await this.authService.userInfo().then(
        async (response) => {        
          if(response && response.code == 200)
          {             
             this.userName = response.data.first_name ? response.data.first_name : '--';          
             this.userEmail = response.data.email ? response.data.email : '--';           
          }
          else
          {
            // this.toastrService.error(response.data?.message);
          }
        },
        (err) => {
            // this.toastrService.error('Error Occurred!');
        }
      ); 
  }


  toggleOpen() {
    this.isOpen = !this.isOpen
  }
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    // Check if the click event target is not within the sidebar
    if (!document.querySelector('#profile')!.contains(event.target as Node) && !document.querySelector('#profile-btn')!.contains(event.target as Node)) {
      this.isOpen = false // Close the sidebar
    }
  }
  logout() {
    // localStorage.removeItem('AccessToken');
    // localStorage.removeItem('authToken');
    // Optionally, you can also clear all local storage items:
    localStorage.clear();
  }

}
