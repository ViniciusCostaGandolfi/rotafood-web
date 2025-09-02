import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MerchantUserCreateDto, MerchantUserDto, MerchantUserUpdateDto } from '../../../../../core/interfaces/merchant/owner-create';
import { MerchantUserRole } from '../../../../../core/enums/merchant-user-role';
import { MerchantUsersService } from '../../../../../core/services/merchant-users/merchant-users.service';


@Component({
  selector: 'app-worker-update-or-create-dialog',
  templateUrl: './worker-update-or-create-dialog.component.html',
  styleUrls: ['./worker-update-or-create-dialog.component.scss']
})
export class WorkerUpdateOrCreateDialogComponent implements OnInit {

  workerForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.required]),
    password: new FormControl('', []),
    role: new FormControl(MerchantUserRole.ADMIN, [Validators.required])
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: MerchantUserDto | null,
    private readonly dialogRef: MatDialogRef<WorkerUpdateOrCreateDialogComponent>,
    private readonly snackBar: MatSnackBar,
    private readonly merchantUsersService: MerchantUsersService,
  ) {}

  ngOnInit(): void {
    if (this.data) {
      this.workerForm.patchValue({
        name: this.data.name,
        email: this.data.email,
        phone: this.data.phone,
        role: this.data.role
      });
      this.workerForm.get('password')?.clearValidators();
      this.workerForm.get('password')?.updateValueAndValidity();
    } else {
      this.workerForm.get('password')?.addValidators([Validators.required]);
      this.workerForm.get('password')?.updateValueAndValidity();
    }
  }

  onSubmit(): void {
    if (this.workerForm.invalid) {
      return;
    }

    if (this.data) {
      const updateDto: MerchantUserUpdateDto = {
        name: this.workerForm.value.name!,
        email: this.workerForm.value.email!,
        phone: this.workerForm.value.phone!,
        role: this.workerForm.value.role!,
      };
      this.merchantUsersService.update(this.data.id, updateDto).subscribe({
        next: (updated) => {
          this.snackBar.open('Funcionário atualizado com sucesso!', 'Fechar', { duration: 3000 });
          this.dialogRef.close(updated);
        },
        error: (err) => {
          this.snackBar.open(err?.error || 'Erro ao atualizar funcionário', 'Fechar', { duration: 3000 });
        }
      });
    } else {
      const createDto: MerchantUserCreateDto = {
        name: this.workerForm.value.name!,
        email: this.workerForm.value.email!,
        phone: this.workerForm.value.phone!,
        password: this.workerForm.value.password!,
        role: this.workerForm.value.role!,
      };
      this.merchantUsersService.create(createDto).subscribe({
        next: (created) => {
          this.snackBar.open('Funcionário criado com sucesso!', 'Fechar', { duration: 3000 });
          this.dialogRef.close(created);
        },
        error: (err) => {
          this.snackBar.open(err?.error || 'Erro ao criar funcionário', 'Fechar', { duration: 3000 });
        }
      });
    }
  }
}
