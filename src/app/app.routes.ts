import { Routes } from '@angular/router';
import { DigitalFinancialPlanPageComponent } from './features/digital-financial-plan/presentation/page/digital-financial-plan-page.component';

export const routes: Routes = [
  {
    path: 'home', component: DigitalFinancialPlanPageComponent
  },
  {
    path: '**', redirectTo: '/home', pathMatch: 'full'
  },
  {
    path: 'home-lazy-load', loadComponent: () => import('./features/digital-financial-plan/presentation/page/digital-financial-plan-page.component').then(mod => mod.DigitalFinancialPlanPageComponent),
  }
];
