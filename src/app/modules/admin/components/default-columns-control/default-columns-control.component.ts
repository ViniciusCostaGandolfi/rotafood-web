import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ColumnConfig } from '../../../../core/interfaces/catalog/column-config';

@Component({
  selector: 'app-default-columns-control',
  templateUrl: './default-columns-control.component.html',
  styleUrl: './default-columns-control.component.scss'
})
export class DefaultColumnsControlComponent {

  @Input() columnsConfig: ColumnConfig[] = []
  @Input() path: string = ''
  @Output() columnsChange = new EventEmitter<string[]>()

  public displayedColumns = this.columnsConfig.map((item) => item.key);

  toggleColumnVisibility(columnKey: string): void {
    const column = this.columnsConfig.find(c => c.key === columnKey);
    if (column) {
      column.visible = !column.visible;
    }
    this.displayedColumns = this.columnsConfig.filter(c => c.visible).map(c => c.key);

    this.columnsChange.emit(this.displayedColumns)
  }

}
