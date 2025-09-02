import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { AddressAutocompleteComponent } from '../address-autocomplete/address-autocomplete.component';
import { CommonModule } from '@angular/common';
import { AddressDto } from '../../core/interfaces/shared/address';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-select-address-dialog',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogModule,
    AddressAutocompleteComponent,
    CommonModule,
    MatSelectModule

  ],
  templateUrl: './select-address-dialog.component.html',
  styleUrl: './select-address-dialog.component.scss'
})
export class SelectAddressDialogComponent {

  addresses: AddressDto[] = [];

  selectedAddress: AddressDto | null = null;

  constructor (
    private ref: MatDialogRef<SelectAddressDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { addresses:  AddressDto[] }
  ) {
    if (data.addresses) {
      this.addresses = data.addresses;
    }
  }
  patchAddressSelected(addr: AddressDto | null) {
    this.selectedAddress = addr

  }

  onSubmit() {
    if (this.selectedAddress) {
      this.ref.close(this.selectedAddress);
    }
  }

}
