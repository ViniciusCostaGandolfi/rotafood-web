import { Component, EventEmitter, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { AddressAutocompleteGoogleMapsComponent } from '../../../shared/address-autocomplete-google-maps/address-autocomplete-google-maps.component';
import { MatButtonModule } from '@angular/material/button';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Address } from '../../../core/interfaces/address';
import { FormRoutineTestService } from '../../../core/services/form-routine-test/form-routine-test.service';
import { HttpClientModule } from '@angular/common/http';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { mookAddress } from '../../../core/mooks/address';
import { Cvrp } from '../../../core/interfaces/cvrp';

@Component({
  selector: 'app-routing-forms',
  standalone: true,
  imports: [
    MatIconModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatButtonModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
    AddressAutocompleteGoogleMapsComponent
  ],
  providers: [
    FormRoutineTestService
  ],

  templateUrl: './routing-forms.component.html',
  styleUrl: './routing-forms.component.scss'
})
export class RoutingFormsComponent {

  public testRoutineForms = new FormGroup({
    numberOfOrders: new FormControl<number>(10, [Validators.required, Validators.min(5)]),
    address: new FormControl<Address>(mookAddress, [Validators.required])
  });

  public loading = false; // To track the loading state
  public errorMessage: string | null = null; //
  public addressErrorMessage: string | null = null; //
  @Output() 
  public cvrp = new EventEmitter<Cvrp>();


  constructor(
    public routingService: FormRoutineTestService
  ) {}
  
  onAddressSelected(address: Address) {
    this.testRoutineForms.controls['address'].setValue(address);
  }
  
  onSubmit() {
    this.errorMessage = null;
    if (this.testRoutineForms.valid) {
      this.loading = true;
      this.addressErrorMessage = null;
      const numberOfOrders = this.testRoutineForms.value.numberOfOrders as number;
      const address = this.testRoutineForms.value.address as Address;
      this.routingService.autoGenerateRoutes(numberOfOrders, address)
        .subscribe({
          next: (response) => {
            const cvrp_response = response as Cvrp;
            this.cvrp.emit(cvrp_response);
            this.loading = false;
          },
          error: (error) => {
            console.error('Error:', error);
            this.errorMessage = 'Ocorreu um erro interno de servidor :('; // Set error message
            this.loading = false;
          }
        });
      
    } else {
      this.addressErrorMessage = 'Selecione um endereço completo com rua e número'; // Set form validation error message
    }
  }
}