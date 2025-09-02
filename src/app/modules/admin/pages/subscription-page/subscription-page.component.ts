import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../../../environments/environment';
import { MerchantService } from '../../../../core/services/merchant/merchant.service';
import { StripePaymentStatusDto } from '../../../../core/interfaces/payment/stripe-dto';
import { PaymentsService } from '../../../../core/services/payments/payments.service';

@Component({
  selector: 'app-subscription-page',
  templateUrl: './subscription-page.component.html',
  styleUrl: './subscription-page.component.scss'
})
export class SubscriptionPageComponent {
  isLoading = false
  isTrialExpired = false;
  isSubscriptionActive = false;
  daysToFinishFreeTrial = 0;
  stripeLink = environment.STRIPE_PRODUCT_LINK;

  paymentStatus?: StripePaymentStatusDto;

  constructor(
    private merchantService: MerchantService,
    private paymentsService: PaymentsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.merchantService.get().subscribe((merchant) => {
      if (merchant?.createdAt) {
        const createdAt = new Date(merchant.createdAt);
        const hoje = new Date();

        const msPorDia = 1000 * 60 * 60 * 24;
        const diffInMs = hoje.getTime() - createdAt.getTime();
        const diffInDias = Math.floor(diffInMs / msPorDia);

        this.isTrialExpired = diffInDias > 3;
        this.daysToFinishFreeTrial = Math.max(0, 30 - diffInDias);
      }
    });

    this.isLoading = true;

    const sessionId = this.route.snapshot.queryParamMap.get('session_id');
    this.paymentsService.validatePayment(sessionId || undefined).subscribe({
      next: (res) => {
        this.paymentStatus = res;
        this.isSubscriptionActive = res.active;
        this.isLoading = false;
      },
      error: () => {
        this.isSubscriptionActive = false;
        this.isLoading = false;
      }
    });
  }
}
