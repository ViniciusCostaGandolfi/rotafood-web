import { MatPaginatorIntl } from '@angular/material/paginator';
import { Injectable } from '@angular/core';

@Injectable()
export class CustomPaginatorProvider extends MatPaginatorIntl {
  constructor() {
    super();
    this.nextPageLabel = 'Próxima página';
    this.previousPageLabel = 'Página anterior';
    this.itemsPerPageLabel = '';
    this.getRangeLabel = this.customRangeLabel;
  }

  private customRangeLabel(page: number, pageSize: number, length: number): string {
    if (length === 0 || pageSize === 0) {
      return `0 de ${length}`;
    }
    length = Math.max(length, 0);
    const startIndex = page * pageSize;
    const endIndex = startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize;
    return `${startIndex + 1} - ${endIndex} de ${length}`;
  }
}
