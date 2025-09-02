import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ProductsService } from '../../../../../core/services/products/products.service';
import { ProductDto } from '../../../../../core/interfaces/catalog/product';



@Component({
  selector: 'app-product-selector-dialog',
  templateUrl: './product-selector-dialog.component.html'
})
export class ProductSelectorDialogComponent {
  products: ProductDto[] = [];

  constructor(
    private readonly dialogRef: MatDialogRef<ProductSelectorDialogComponent>,
    private readonly productsService: ProductsService
  ) {}

  ngOnInit(): void {
    this.loadAllProducts();
  }

  loadAllProducts(): void {
    this.productsService.getAll().subscribe({
      next: (data) => this.products = data,
      error: (error) => console.error(error)
    });
  }

  selectProduct(product: ProductDto): void {
    this.dialogRef.close(product);
  }

  closeDialog(): void {
    this.dialogRef.close(null);
  }
}
