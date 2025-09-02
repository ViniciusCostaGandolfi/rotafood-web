import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ColumnConfig } from '../../../../core/interfaces/catalog/column-config';

@Component({
  selector: 'app-default-table-header',
  templateUrl: './default-table-header.component.html',
  styleUrl: './default-table-header.component.scss'
})
export class DefaultTableHeaderComponent {

  @Input() form!: FormControl<any>;
  @Input() column!: ColumnConfig;
  @Output() searchEvent = new EventEmitter<string | undefined>();
  

  onSearch(key?: string): void {
    this.searchEvent.emit(key);
  }

}
