import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../../core/services/auth/auth.service';
import { DialogErrorContentComponent } from '../../shared/dialog-error-content/dialog-error-content.component';
import { MerchantCreateDto } from '../../core/interfaces/merchant/merchant-create';
import { OwnerCreateDto } from '../../core/interfaces/merchant/owner-create';
import { MerchantOwnerCreationDto } from '../../core/interfaces/shared/auth';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MerchantType } from '../../core/enums/merchant-type';
import { AddressDto } from '../../core/interfaces/shared/address';
import { merchantTypesMock } from '../../core/mocks/merchant-type';
import { DocumentType } from '../../core/enums/document-type';
import { formatPhone } from '../../core/helpers/format-phone';
import { CommonModule } from '@angular/common';
import { DefaultLayoutComponent } from '../../shared/default-layout/default-layout.component';
import { DefaultFormContainerComponent } from '../../shared/default-form-container/default-form-container.component';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { SpinnerButtonComponent } from '../../shared/spinner-button/spinner-button.component';
import { MatStepperModule } from '@angular/material/stepper';
import { AddressAutocompleteComponent } from '../../shared/address-autocomplete/address-autocomplete.component';


@Component({
  selector: 'app-register',
  providers: [
    AuthService
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  standalone: true,
    imports: [
      CommonModule,
      DefaultLayoutComponent,
      DefaultFormContainerComponent,
      MatInputModule,
      MatSelectModule,
      ReactiveFormsModule,
      SpinnerButtonComponent,
      MatStepperModule,
      AddressAutocompleteComponent
    ]
})
export class RegisterComponent  {

  public stripeSucess = false
  public merchantTypesMock = merchantTypesMock;
  public isLoading = false;
  public merchantForm = new FormGroup({
      name: new FormControl<string>('', Validators.required),
      phone: new FormControl<string>('', Validators.required),
      merchantType: new FormControl<MerchantType>(MerchantType.RESTAURANT, [Validators.required]),
      description: new FormControl<string>('', Validators.required),
      documentType: new FormControl<DocumentType>(DocumentType.CPF, Validators.required),
      document: new FormControl<string>('', Validators.required),
      address: new FormControl<AddressDto | null>(null, Validators.required)
    })
  
  public userForm = new FormGroup({
      name: new FormControl<string>('', Validators.required),
      email: new FormControl<string>('', [Validators.required, Validators.email]),
      phone: new FormControl<string>('', Validators.required),
      password: new FormControl<string>('', Validators.required),
    })
  



  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly dialog: MatDialog
    ) {}


  onPhoneInputChangeUser(value: string) {
      const formatted = formatPhone(value);
      if (this.userForm.controls.phone.value !== formatted) {
        this.userForm.controls.phone.setValue(formatted, { emitEvent: false });
      }
  }

  onPhoneInputChangeMerchant(value: string) {
    const formatted = formatPhone(value);
    if (this.merchantForm.controls.phone.value !== formatted) {
      this.merchantForm.controls.phone.setValue(formatted, { emitEvent: false });
    }
}
  

  addressFound(address: AddressDto) {
    this.merchantForm.controls.address.setValue(address);
  }


  onSubmit() {
      if (this.userForm && this.merchantForm) {
          const MerchantOwnerCreationDto: MerchantOwnerCreationDto = {
            merchant: this.merchantForm.value as MerchantCreateDto,
            owner: this.userForm.value as OwnerCreateDto
          }
          this.isLoading = true;
          this.authService.createMerchant(MerchantOwnerCreationDto).subscribe({
            next: () => {
              this.isLoading = false;
              this.router.navigate(['/admin']);
            },
            error: (error) => {
              console.error('Error:', error);
              this.dialog.open(DialogErrorContentComponent, {data: {
                message: error.error || "Erro ao criar a conta!"
              }})
              this.isLoading = false;
            }
          });
      }
  }
}
