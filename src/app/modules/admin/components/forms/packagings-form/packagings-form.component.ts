import {
  Component,
  OnInit,
  OnChanges,
  OnDestroy,
  Input,
  Output,
  EventEmitter,
  SimpleChanges
} from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { PackagingType, packagingTypeToString } from '../../../../../core/enums/packagiong-type';
import { PackagingDto } from '../../../../../core/interfaces/catalog/packaging';
import { ProductPackagingDto } from '../../../../../core/interfaces/catalog/product-packaging';
import { validateProductPackaging } from '../../../../../core/helpers/product-packging-validate';
import { MatDialog } from '@angular/material/dialog';
import { PackagingUpdateOrCreateDialogComponent } from '../../update-or-create/packaging-update-or-create-dialog/packaging-update-or-create-dialog.component';
import { DefaultPackagingSelectorDialogComponent } from '../../selectors/default-packaging-selector-dialog/default-packaging-selector-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PackagingsService } from '../../../../../core/services/packagings/packagings.service';



@Component({
  selector: 'app-packagings-form',
  templateUrl: './packagings-form.component.html'
})
export class PackagingsFormComponent implements OnInit, OnChanges, OnDestroy {

  packagingTypeOptions: PackagingType[] = Object.values(PackagingType);

  packagingOptions: PackagingDto[] = [];

  @Input() initial: {
    packagingType: PackagingType;
    productPackaging?: ProductPackagingDto;
  } | null = null;


  @Output() valueChange = new EventEmitter<{
    packagingType: PackagingType;
    productPackaging?: ProductPackagingDto;
  }>();




  form!: FormGroup;
  packagingTypeToString = packagingTypeToString; 

  private destroy$ = new Subject<void>();

  constructor(
    private dialog: MatDialog,
    private snackbar: MatSnackBar,
    public packagingsService: PackagingsService,
  ) {}


  ngOnInit(): void {
    this.buildForm();
  }

  loadPackagings() {
    this.packagingsService.getAll().subscribe({
      next: response => {
        this.packagingOptions = response;
      },
      error: errors => {
        this.snackbar.open(errors.error, 'Fechar');
      }
    });
  }


  ngOnChanges(c: SimpleChanges): void {
    if (c['initial'] && !c['initial'].firstChange) {
      this.buildForm();
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }


  onPackagingSelected(ctrl: AbstractControl, pkg: PackagingDto): void {
    ctrl.get('packaging')?.setValue(pkg);
    this.emitValue();
  }


  private buildForm(): void {
    this.destroy$.next();

    const { packagingType, productPackaging } =
      this.initial ?? { packagingType: PackagingType.PACKAGING };

    this.form = new FormGroup(
      {
        packagingType: new FormControl(packagingType, Validators.required),
        productPackaging: new FormGroup({
          id: new FormControl(productPackaging?.id),
          packaging: new FormControl(productPackaging?.packaging ?? null),
          quantityPerPackage: new FormControl(
            productPackaging?.quantityPerPackage ?? 1,
            [Validators.required, Validators.min(1)]
          )
        })
      },
      { validators: validateProductPackaging() }
    );

    this.form.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.emitValue());

    this.emitValue(); // valor inicial
  }

  private emitValue(): void {
    const pType = this.form.get('packagingType')?.value as PackagingType;
    const pPkg =
      pType === PackagingType.PACKAGING
        ? (this.form.get('productPackaging')?.value as ProductPackagingDto)
        : undefined;

    this.valueChange.emit({ packagingType: pType, productPackaging: pPkg });
  }

  get productPackagingCtrl(): FormGroup {
    return this.form.get('productPackaging') as FormGroup;
  }

  updatePackaging(packaging?: PackagingDto) {
    this.dialog
      .open(PackagingUpdateOrCreateDialogComponent, {
        width: '90vw',
        height: '90vh',
        data: packaging
      })
      .afterClosed()
      .subscribe(() => {
        this.loadPackagings();
      });
  }

  createPackagingDialog() {
    this.dialog
      .open(DefaultPackagingSelectorDialogComponent, {
        width: '90vw',
        height: '90vh',
        data: { searchTerm: 'Saco' }
      })
      .afterClosed()
      .subscribe(() => {
        this.loadPackagings();
      });
  }
}
