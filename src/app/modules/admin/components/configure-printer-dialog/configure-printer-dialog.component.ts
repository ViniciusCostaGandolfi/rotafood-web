import { Component } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LocalPrinterService } from '../../../../core/services/local-printer/local-printer.service';
import { PrintDto } from '../../../../core/interfaces/merchant/print';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-configure-printer-dialog',
  templateUrl: './configure-printer-dialog.component.html',
  styleUrl: './configure-printer-dialog.component.scss'
})
export class ConfigurePrinterDialogComponent {
  extensionLink = environment.PRINTER_EXTENSION_LINK;
  printers: string[] = [];
  msg = '';
  widthMmAvailable = [48, 58, 80]
  form = new FormGroup({
    printerName: new FormControl<string | null>(null),
    widthMm: new FormControl(58),
    marginPt: new FormControl(0, [Validators.required, Validators.min(0), Validators.max(30)]),
    useStyle: new FormControl(false)
  })

  constructor(
    private localPrinterService: LocalPrinterService,
    private dialogRef: MatDialogRef<ConfigurePrinterDialogComponent>

  ) {}

  ngOnInit() {
    const localConfgs = this.localPrinterService.getConfig();
    if (localConfgs) {
      this.form.patchValue(localConfgs)
    }

    this.getPrinters()
  }

  getPrinters() {
    this.localPrinterService.listPrinters().subscribe({
      next: (resp) => {
        this.printers = resp;
      },
      error: () => this.printers = []
    })
  }

  testPrint() {
    if (this.form.invalid) return;

    const dto: PrintDto = {
      printerName: this.form.value.printerName!,
      widthMm:     this.form.value.widthMm!,
      marginPt:    this.form.value.marginPt!,
      useStyle:    this.form.value.useStyle!,
      text:        `*** ROTAFOOD TESTE ***\nPedido: #000\n1x Combo Teste\nTotal: R$ 0,00\n\nObrigado!\n`
    };

    this.msg = 'Enviando para impressão...';

    this.localPrinterService.print(dto).subscribe({
      next: () => this.msg = 'Impressão de teste enviada ✔️',
      error: () => this.msg = 'Falha ao imprimir 😥'
    });
  }

  saveConfigs() {
    if (this.form.invalid) return;

    const cfg: PrintDto = {
      printerName: this.form.value.printerName!,
      widthMm:     this.form.value.widthMm!,
      marginPt:    this.form.value.marginPt!,
      useStyle:    this.form.value.useStyle!,
      text:        '' 
    };

    this.localPrinterService.saveConfig(cfg);
    this.dialogRef.close(cfg);
  }



    

}
