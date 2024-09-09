import { Component, TemplateRef, ViewChild } from '@angular/core';
import { NgxLoadingModule } from 'ngx-loading';
import { ngxLoadingAnimationTypes } from 'ngx-loading';
import { DataSharedService } from '../../shared/data-shared.service';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

const PrimaryWhite = '#ffffff';

@Component({
  selector: 'app-custom-loader',
  standalone: true,
  imports: [RouterLink, NgxLoadingModule, CommonModule],

  templateUrl: './custom-loader.component.html'
})
export class CustomLoaderComponent {

  @ViewChild('customLoadingTemplate', { static: false })
  customLoadingTemplate!: TemplateRef<any>;
  
  public ngxLoadingAnimationTypes = ngxLoadingAnimationTypes;
  public loading = false;
  public primaryColour = PrimaryWhite;
  public loadingTemplate!: TemplateRef<any>;
  public config = {
    animationType: ngxLoadingAnimationTypes.none,
    primaryColour: this.primaryColour,
    tertiaryColour: this.primaryColour,
    backdropBorderRadius: '3px',
  };

  constructor(private dataShareService: DataSharedService) {
    this.dataShareService.isShowLoader.subscribe((value: boolean) => {
      this.loading = value
    })
  }


}
