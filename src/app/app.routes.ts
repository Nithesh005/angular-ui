import { Routes } from '@angular/router'
import { DefaultLayoutComponent } from './components/layouts/default-layout/default-layout.component'
import { Style01Component } from './pages/dashboards/style-01/style-01.component'
import { SignUpComponent } from './pages/auth/sign-up/sign-up.component'
import { SignInComponent } from './pages/auth/sign-in/sign-in.component'
import { SignInQrcodeComponent } from './pages/auth/sign-in-qrcode/sign-in-qrcode.component'
import { AuthLayoutComponent } from './components/layouts/auth-layout/auth-layout.component'
import { ErrorComponent } from './pages/auth/error/error.component'
import { EmptyLayoutComponent } from '@component/layouts/empty-layout/empty-layout.component'
import { InitiateForgetPasswordComponent } from '@pages/forget-password/initiate-forget-password/initiate-forget-password.component'
import { ForgetPasswordCompletionComponent } from '@pages/forget-password/forget-password-completion/forget-password-completion.component'
import { HelpCenterComponent } from '@pages/support/help-center/help-center.component'
import { PrivacyPolicyComponent } from '@pages/support/privacy-policy/privacy-policy.component'
import { ContactUsComponent } from '@pages/support/contact-us/contact-us.component'
import { CodeVerifyComponent } from '@pages/auth/code-verify/code-verify.component'
import { MerchantSignupComponent } from '@pages/auth/merchant-signup/merchant-signup.component'
import { AdditionalInfoComponent } from '@pages/auth/additional-info/additional-info.component'
import { PaymentProvidersComponent } from '@pages/payment/payment-providers/payment-providers.component'
import { PaymentOverviewComponent } from '@pages/payment/payment-overview/payment-overview.component'
import { ProfileComponent } from '@pages/settings/profile/profile.component'
import { SecurityComponent } from '@pages/settings/security/security.component'
import { EmailVerifyComponent } from '@pages/auth/code-verify/email-verify/email-verify.component'
import { QrCodeSectionComponent } from '@pages/payment/qr-code-section/qr-code-section.component'
import { CreateSectionComponent } from '@pages/payment/create-section/create-section.component'
import { HistorySectionComponent } from '@pages/payment/history-section/history-section.component'
// guard
import { authGuard } from './guard/auth.guard'
export const routes: Routes = [
  {
    path: '',
    pathMatch:'full',
    redirectTo:'auth/sign-in'
  },
  {
    path: 'dashboards',
    component: DefaultLayoutComponent,
    children: [
      {
        path: 'dashboards',
        children: [
          { path: 'user', component: Style01Component },
        ]
      }
    ]
  },
      // {
      //   path: 'payment',
      //   children: [
      //     { path: 'payment-overview', component: PaymentOverviewComponent},
      //     { path: 'payment-providers', component: PaymentProvidersComponent},
      //   ]
      // },
      // {
      //   path: 'settings',
      //   children: [
      //     { path: 'profile', component: ProfileComponent},
      //     { path: 'security', component: SecurityComponent}
      //   ]
      // },

  {
    path: 'auth',
    component: AuthLayoutComponent,
    children: [
      { path: 'sign-in', component: SignInComponent },
      { path: 'additional-info', component: AdditionalInfoComponent },
      { path: 'sign-up', component: MerchantSignupComponent },
      { path: 'code-verify', component: CodeVerifyComponent },
      { path: 'password/reset', component: InitiateForgetPasswordComponent },
      { path: 'password/reset/completion', component: ForgetPasswordCompletionComponent },
      { path: 'signin-qrcode', component: SignInQrcodeComponent },
      { path: 'email-verify/:email', component: EmailVerifyComponent},
      { path: 'mobile-verify/:mobile', component: CodeVerifyComponent},
      // { path: 'code-verify/:email/:mobile_number', component: CodeVerifyComponent },
    ]
  },
  {
    path: 'payment',
    component: DefaultLayoutComponent,
    children: [
      {      
       path: 'payment-provider', component: PaymentProvidersComponent },
      {      
       path: 'qr-code', component: QrCodeSectionComponent },
      {      
       path: 'payment-link/create', component: CreateSectionComponent },
      {      
       path: 'payment-link/history', component: HistorySectionComponent },

      ]
      },
  {
    path: 'settings',
    component: DefaultLayoutComponent,
    children: [
      { path: 'profile', component: ProfileComponent },
      { path: 'security', component: SecurityComponent },
      ]
      },
  {
    path: 'support',
    component: DefaultLayoutComponent,
    children: [
      { path: 'help-center', component: HelpCenterComponent },
      { path: 'privacy-policy', component: PrivacyPolicyComponent },
      { path: 'contact-us', component: ContactUsComponent },
      ]
      },

  {
    path: 'not-found',
    pathMatch:'full',
    component: ErrorComponent
  },
  {
    path: '**',
    redirectTo:'not-found',
    pathMatch:'full',
  }
  
]
