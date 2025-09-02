import { Component, Inject, OnInit } from '@angular/core';
import {  FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MerchantOrderEstimateDto } from '../../../../core/interfaces/merchant/merchant-order-estimate';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FullMerchantDto } from '../../../../core/interfaces/merchant/full-merchant';
import { MerchantService } from '../../../../core/services/merchant/merchant.service';

@Component({
  selector: 'app-merchant-order-estimate-dialog',
  templateUrl: './merchant-order-estimate-dialog.component.html',
  styleUrls: ['./merchant-order-estimate-dialog.component.scss']
})
export class MerchantOrderEstimateDialogComponent implements OnInit {
  isLoading = false
  estimateForm!: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<MerchantOrderEstimateDialogComponent>,
    private merchantService: MerchantService,
    private snackbar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: FullMerchantDto
  ) {}

  ngOnInit(): void {
    this.estimateForm = new FormGroup({
      id: new FormControl(this.data?.orderEstimate?.id),
      pickupMinMinutes: new FormControl(this.data?.orderEstimate?.pickupMinMinutes ?? 10, [Validators.required, Validators.min(1)]),
      pickupMaxMinutes: new FormControl(this.data?.orderEstimate?.pickupMaxMinutes ?? 30, [Validators.required, Validators.min(1)]),
      deliveryMinMinutes: new FormControl(this.data?.orderEstimate?.deliveryMinMinutes ?? 20, [Validators.required, Validators.min(1)]),
      deliveryMaxMinutes: new FormControl(this.data?.orderEstimate?.deliveryMaxMinutes ?? 45, [Validators.required, Validators.min(1)])
    });
  }

  onSave(): void {
     if (this.data) {
          this.isLoading = true
          const merchant = this.data
          merchant.orderEstimate = this.estimateForm.value as MerchantOrderEstimateDto | undefined
          this.merchantService.update(merchant).subscribe({
          next: (response) => {
            if (response.orderEstimate) {
              this.estimateForm.patchValue({
                id: response.orderEstimate?.id,
                pickupMinMinutes: response.orderEstimate?.pickupMinMinutes,
                pickupMaxMinutes: response.orderEstimate?.pickupMaxMinutes,
                deliveryMinMinutes: response.orderEstimate?.deliveryMinMinutes,
                deliveryMaxMinutes: response.orderEstimate?.deliveryMaxMinutes,
              })
            }
            this.snackbar.open(`Dados atualizados`, "Fechar", {duration: 2000})
            this.isLoading = false

          },
          error: (errors) => {
            this.snackbar.open(`Erro ${errors.error.status} - ${errors.error.details}`, "Fechar", {duration: 3000})
            this.isLoading = false
          }
        })
      }
    }

  onCancel(): void {
    this.dialogRef.close();
  }
}
