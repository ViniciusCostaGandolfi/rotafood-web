import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ImagesService } from '../../../../../../core/services/images/images.service';
import { ImageDto } from '../../../../../../core/interfaces/shared/image';

@Component({
  selector: 'app-select-image-dialog',
  templateUrl: './select-image-dialog.component.html',
  styleUrls: ['./select-image-dialog.component.scss'],
})
export class SelectImageDialogComponent implements OnInit {
  previewUrl: string | null = null;
  selectedFile: File | null = null;
  images: ImageDto[] = [];
  selectedImage: ImageDto | null = null;
  isLoading = false

  constructor(
    private readonly imagesService: ImagesService,
    private readonly dialogRef: MatDialogRef<SelectImageDialogComponent>
  ) {}

  ngOnInit(): void {
    this.loadImages();
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.selectedFile = input.files[0];
      this.previewUrl = URL.createObjectURL(this.selectedFile);
    }
  }

  uploadImage(): void {
    if (this.selectedFile) {
      this.isLoading = true
      this.imagesService.uploadImage(this.selectedFile).subscribe({
        next: (imageDto) => {
          this.selectedFile = null;
          this.previewUrl = null;
          this.images.push(imageDto);
          this.selectedImage = imageDto;
          this.isLoading = false
          this.onSave()
        },
        error: (err) => {
          this.isLoading = false
          console.error('Erro ao fazer upload da imagem:', err)
        },
        
      });
    }
  }

  loadImages(): void {
    this.imagesService.getImages().subscribe({
      next: (images) => {this.images = images},
      error: (err) => console.error('Erro ao carregar imagens:', err),
    });
  }

  deleteImage(image: ImageDto): void {
    this.imagesService.deleteImage(image.id).subscribe({
      next: () => this.images = this.images.filter(img => img.id !== image.id),
      error: (err) => console.error('Erro ao deletar imagem:', err),
    });
  }
  resetUpload(): void {
    this.selectedFile = null;
    this.previewUrl = null;
  }
  onSelectImage(image: ImageDto): void {
    this.selectedImage = image
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
  }
  
  onFileDropped(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
  
    if (event.dataTransfer?.files && event.dataTransfer.files[0]) {
      const file = event.dataTransfer.files[0];
      if (this.validateFile(file)) {
        this.selectedFile = file;
        this.previewUrl = URL.createObjectURL(file);
      } else {
        this.selectedFile = null;
        this.previewUrl = null;
        alert('Formato inválido! Aceitamos apenas PNG ou JPG.');
      }
    }
  }
  
  validateFile(file: File): boolean {
    return file.type === 'image/png' || file.type === 'image/jpeg';
  }
  

  onSave(): void {
    this.dialogRef.close(this.selectedImage);
    this.selectedImage = null;
  }
}
