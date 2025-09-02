import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  OnChanges,
  SimpleChanges,
  OnDestroy
} from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { OptionGroupDto } from '../../../../../core/interfaces/order/option-group';
import { ItemOptionGroupDto } from '../../../../../core/interfaces/catalog/product-option-group';
import { CatalogContext, catalogContextToString } from '../../../../../core/enums/catalog-context';
import { Status } from '../../../../../core/enums/status';
import { OptionGroupsService } from '../../../../../core/services/option-groups/option-groups.service';
import { OptionGroupType } from '../../../../../core/enums/option-group-type';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { OptionGroupUpdateOrCreateDialogComponent } from '../../update-or-create/option-group-update-or-create-dialog/option-group-update-or-create-dialog.component';
import { CopyOptionGroupsDialogComponent } from '../../copy-option-groups-dialog/copy-option-groups-dialog.component';
import { WindowWidthService } from '../../../../../core/services/window-width/window-width.service';



const integerValidator = () => Validators.pattern(/^\d+$/);

@Component({
  selector: 'app-option-groups-form',
  templateUrl: './option-groups-form.component.html'
})
export class OptionGroupsFormComponent
  implements OnInit, OnChanges, OnDestroy
{

  availableGroups: OptionGroupDto[] = [];

  isMobile = false;

  @Input() initialItemGroups: ItemOptionGroupDto[] | null = null;


  @Output() valueChange = new EventEmitter<ItemOptionGroupDto[]>();


  complementsForm!: FormGroup; 
  private destroy$ = new Subject<void>();

  constructor(
    private optionGroupService: OptionGroupsService,
    private snackbar: MatSnackBar,
    private dialog: MatDialog,
    private windowService: WindowWidthService
  ) {}


  ngOnInit(): void {
    this.windowService.isMobile().subscribe(isMobile => (this.isMobile = isMobile));
    this.buildForm();
    this.loadOptionGroups()
  }

  openCopyDialog(): void {
    this.dialog.open(CopyOptionGroupsDialogComponent, {
          width: '90%',
          height: '90%',
          data: { currentGroups: this.groupsArray.value }
        })
        .afterClosed()
        .subscribe((copied: ItemOptionGroupDto[] | undefined) => {
          console.log(copied)
          if (!copied?.length) { return; }
  
          copied.forEach(src => {
            const grpId = src.optionGroup.id;
            if (this.groupsArray.controls
                  .some(c => c.get('optionGroup')?.value?.id === grpId)) {
              return;            
            }
  
            this.groupsArray.push(this.createGroupForm({
              id: undefined,
              optionGroup: src.optionGroup,
              min: src.min ?? 1,
              max: src.max ?? 1,
              index: this.groupsArray.length,
              status: src.status ?? Status.AVAILIABLE
            }));
          });
  
          this.reindex();
          this.emitValue();
        });
  }  


  updateOrCreateOptionGroupDialog(optionGroup?: OptionGroupDto) {
    this.dialog
      .open(OptionGroupUpdateOrCreateDialogComponent, {
        width: this.isMobile ? '100%' : '90%',
        height: this.isMobile ? '100%' : '90%',
        data: optionGroup
      })
      .afterClosed()
      .subscribe((newOptionGroup?: ItemOptionGroupDto) => {
        this.loadOptionGroups();
        if (newOptionGroup) {
          const index = this.groupsArray.controls.findIndex(control =>
            control.get('optionGroup')?.value?.id === newOptionGroup.id
          );
          if (index !== -1) {
            this.groupsArray
              .at(index)
              .get('optionGroup')
              ?.setValue(newOptionGroup);
          }
        }
      });
  }

  loadOptionGroups() {
      this.optionGroupService.getAll(OptionGroupType.DEFAULT).subscribe({
        next: response => {
          this.availableGroups = response;
        },
        error: errors => {
          this.snackbar.open(errors.error, 'Fechar');
        }
      });
    }
  

  ngOnChanges(ch: SimpleChanges): void {
    if (ch['initialItemGroups'] && !ch['initialItemGroups'].firstChange) {
      this.buildForm();
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }


  get groupsArray(): FormArray {
    return this.complementsForm.get('ItemOptionGroups') as FormArray;
  }


  addItemOptionGroup(): void {
    this.groupsArray.push(this.createGroupForm());
    this.emitValue();
  }

  removeOptionGroup(idx: number): void {
    this.groupsArray.removeAt(idx);
    this.reindex();
    this.emitValue();
  }

  moveUp(idx: number): void {
    if (idx > 0) {
      const ctrl = this.groupsArray.at(idx);
      this.groupsArray.removeAt(idx);
      this.groupsArray.insert(idx - 1, ctrl);
      this.reindex();
      this.emitValue();
    }
  }

  moveDown(idx: number): void {
    if (idx < this.groupsArray.length - 1) {
      const ctrl = this.groupsArray.at(idx);
      this.groupsArray.removeAt(idx);
      this.groupsArray.insert(idx + 1, ctrl);
      this.reindex();
      this.emitValue();
    }
  }

  onGroupSelected(ctrl: AbstractControl, group: OptionGroupDto): void {
    ctrl.get('optionGroup')?.setValue(group);
    this.emitValue();
  }


  private buildForm(): void {
    this.destroy$.next();

    const groups =
      this.initialItemGroups && this.initialItemGroups.length
        ? this.initialItemGroups
        : [];

    this.complementsForm = new FormGroup({
      hasComplements: new FormControl(groups.length > 0),
      ItemOptionGroups: new FormArray(groups.map((g) => this.createGroupForm(g)))
    });

    this.complementsForm.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.emitValue());

    this.emitValue();
  }

  private emitValue(): void {
    const optionGroups: ItemOptionGroupDto[] = this.groupsArray.value.map(
      (g: ItemOptionGroupDto, idx: number) => ({
        ...g,
        index: idx
      })
    );

    this.valueChange.emit(optionGroups);
  }

  private reindex(): void {
    this.groupsArray.controls.forEach((ctrl, i) =>
      ctrl.get('index')?.setValue(i, { emitEvent: false })
    );
  }

  private createGroupForm(
    g: ItemOptionGroupDto = {} as ItemOptionGroupDto
  ): FormGroup {
    return new FormGroup({
      id: new FormControl(g.id),
      optionGroup: new FormControl(g.optionGroup ?? null, Validators.required),
      index: new FormControl(g.index ?? -1),
      min: new FormControl(g.min ?? 1, [
        Validators.required,
        Validators.min(0),
        integerValidator()
      ]),
      max: new FormControl(g.max ?? 1, [
        Validators.required,
        Validators.min(1),
        integerValidator()
      ]),
      status: new FormControl(g.status ?? Status.AVAILIABLE)
    });
  }


  contextLabel(c: CatalogContext) {
    return catalogContextToString[c];
  }

}
