import { Component, ElementRef, signal, ViewChild, viewChild, WritableSignal } from '@angular/core';
import { AppbarComponent } from "../../../../shared/components/appbar/appbar.component";
import { ApiService } from '../../../../shared/services/api-service/api.service';
import { HttpResponse } from '@angular/common/http';
import { CardInfoModel } from '../../models/card-info-model';
import { CardInfoComponent } from '../components/card-info/card-info.component';
import { CommonModule } from '@angular/common';
import { FooterComponent } from "../../../../shared/components/footer/footer.component";
import { ReviewObjectiveComponent } from "../components/review-objective/review-objective.component";
import { MatIconModule } from '@angular/material/icon';
import { CardRecommendedComponent } from "../components/card-recommended/card-recommended.component";
import { LoadingComponent } from "../../../../shared/components/loading/loading.component";
import { AlertComponent } from "../../../../shared/components/alert/alert.component";


@Component({
  selector: 'app-digital-financial-plan-page',
  standalone: true,
  imports: [
    CommonModule,
    AppbarComponent,
    CardInfoComponent,
    FooterComponent,
    MatIconModule,
    ReviewObjectiveComponent,
    CardRecommendedComponent,
    LoadingComponent,
    AlertComponent
],
  templateUrl: './digital-financial-plan-page.component.html',
  styleUrl: './digital-financial-plan-page.component.scss'
})
export class DigitalFinancialPlanPageComponent {
  constructor(private apiService : ApiService){}

  signalData : WritableSignal<CardInfoModel> = signal<CardInfoModel>({
    listCard : []
  })

  isLoading : WritableSignal<boolean> = signal<boolean>(false);
  isError: WritableSignal<boolean> = signal<boolean>(false);

  isScrollLeftDisabled = signal<boolean>(false);
  isScrollRightDisabled = signal<boolean>(false);
  carousel =  viewChild.required<ElementRef>('carousel');

  scrollCarousel(direction: string) {
    const cardWidth = 300;

    if (direction === 'next') {
      this.carousel()?.nativeElement.scrollBy({
        left: cardWidth,
        behavior: 'smooth',
      });
    } else if (direction === 'prev') {
      this.carousel()?.nativeElement.scrollBy({
        left: -cardWidth,
        behavior: 'smooth',
      });
    }
  }


  checkScroll() {
    setTimeout(() => {
      const container = this.carousel()?.nativeElement;
      this.isScrollLeftDisabled.set(container.scrollLeft === 0);
      this.isScrollRightDisabled.set(
        container.scrollWidth ===
          Math.round(container.scrollLeft) + container.clientWidth
      );
    }, 500);
  }


  ngAfterViewInit() {
    this.checkScroll();
    this.carousel()?.nativeElement.addEventListener('scroll', () => {
      this.checkScroll();
    });
    window.addEventListener('resize', () => {
      this.checkScroll();
    });
  }



  ngOnInit(): void {
    this.isLoading.set(true);
    this.getData();

  }



  getData(): void{
    this.apiService.get('/cards').subscribe({
        next: (response: HttpResponse<CardInfoModel>) => {
          if (response.status === 200 && response.body) {
            this.signalData.set(response.body);
            console.log('Datos recibidos:', this.signalData());
            setTimeout(() => {
              this.isLoading.set(false);
            }, 500);

          }else {
            console.log('fallo en la peticion');
            setTimeout(() => {
              this.isLoading.set(false);
              this.isError.set(true);
            }, 500);
          }

        },
        error: (error) => {
          console.error('Ocurrió un error:', error);
          this.isError.set(true);
          this.isLoading.set(false);

        }
      });
  }
}


