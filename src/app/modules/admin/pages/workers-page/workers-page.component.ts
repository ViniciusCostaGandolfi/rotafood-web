import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MerchantUserDto } from '../../../../core/interfaces/merchant/owner-create';
import { WorkerUpdateOrCreateDialogComponent } from '../../components/update-or-create/worker-update-or-create-dialog/worker-update-or-create-dialog.component';
import { MerchantUsersService } from '../../../../core/services/merchant-users/merchant-users.service';



@Component({
  selector: 'app-workers-page',
  templateUrl: './workers-page.component.html',
  styleUrls: ['./workers-page.component.scss']
})
export class WorkersPageComponent implements OnInit {

  workers: MerchantUserDto[] = [];

  constructor(
    private readonly merchantUsersService: MerchantUsersService,
    private readonly dialog: MatDialog,
    private readonly snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.loadWorkers();
  }


  loadWorkers(): void {
    this.merchantUsersService.list().subscribe({
      next: (data) => {
        this.workers = data;
      },
      error: () => {
        this.snackBar.open('Erro ao carregar funcionários', 'Fechar', { duration: 3000 });
      }
    });
  }


  openCreateDialog(): void {
    const dialogRef = this.dialog.open(WorkerUpdateOrCreateDialogComponent, {
      width: '500px',
      data: null 
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadWorkers();
      }
    });
  }


  openEditDialog(worker: MerchantUserDto): void {
    const dialogRef = this.dialog.open(WorkerUpdateOrCreateDialogComponent, {
      width: '500px',
      data: worker 
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadWorkers();
      }
    });
  }

  deleteWorker(workerId: string): void {
    const confirmDelete = confirm('Tem certeza que deseja deletar este funcionário?');
    if (!confirmDelete) return;

    this.merchantUsersService.delete(workerId).subscribe({
      next: () => {
        this.snackBar.open('Funcionário deletado com sucesso!', 'Fechar', { duration: 3000 });
        this.loadWorkers();
      },
      error: () => {
        this.snackBar.open('Erro ao deletar funcionário', 'Fechar', { duration: 3000 });
      }
    });
  }
}
