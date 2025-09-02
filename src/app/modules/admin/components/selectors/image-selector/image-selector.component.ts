import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SelectImageDialogComponent } from './select-image-dialog/select-image-dialog.component';
import { ImageDto } from '../../../../../core/interfaces/shared/image';
import { WindowWidthService } from '../../../../../core/services/window-width/window-width.service';

@Component({
  selector: 'app-image-selector',
  templateUrl: './image-selector.component.html',
  styleUrls: ['./image-selector.component.scss'],
})
export class ImageSelectorComponent {
  @Input()
  imagePath: string | null | undefined = null

  @Input()
  isLogo: boolean = false;

  isMobile = false;
  
  @Output()
  onSelectedImageChange = new EventEmitter<string>()

  constructor(private readonly dialog: MatDialog,
    private readonly windowService: WindowWidthService,
      ) { }
    
    
      ngOnInit() {
        this.windowService.isMobile().subscribe(isMobile => this.isMobile = isMobile);
      }
    

  openImageDialog(): void {
    const dialogRef = this.dialog.open(SelectImageDialogComponent, {
      width: this.isMobile ? '100%' : '90%',
      height: this.isMobile ? '100%' : '90%',
    });

    dialogRef.afterClosed().subscribe((result: ImageDto | null) => {
      if (result) {
        this.imagePath = result.path;
        this.onSelectedImageChange.emit(this.imagePath)
      }
    });
  }

  clearSelectedImage(): void {
    this.imagePath = null;
  }
}
