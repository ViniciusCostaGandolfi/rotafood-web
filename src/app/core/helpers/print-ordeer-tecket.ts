import { FullOrderDto } from "../interfaces/order/full-order";
import { OrderStatusMap } from "../interfaces/order/order-enum";

export function printOrderTicket(order: FullOrderDto): void {
  const iframe = document.createElement('iframe');
  iframe.style.position = 'absolute';
  iframe.style.width = '0px';
  iframe.style.height = '0px';
  iframe.style.border = 'none';
  document.body.appendChild(iframe);

  // Obter o documento do iframe
  const doc = iframe.contentWindow?.document;
  if (doc) {
    doc.open();
    doc.write(`
      <!DOCTYPE html>
      <html lang="pt">
      <head>
        <meta charset="UTF-8">
        <title>Impressão do Pedido</title>
        <style>
          /* 
            O 'size: 48mm auto' pede para a página ter 48mm de largura 
            e altura automática (típico para impressoras térmicas). 
          */
          @page {
            size: 48mm auto; 
            margin: 0;
          }
          body {
            font-family: 'Courier New', monospace;
            width: 48mm;
            margin: 0;
            padding: 8px;
          }
          h1, h2, h3, p {
            margin: 4px 0; 
            text-align: center;
          }
          .separator {
            border-top: 1px dashed black; 
            margin: 8px 0;
          }
          table {
            width: 100%; 
            border-collapse: collapse;
          }
          th, td {
            font-size: 14px; 
            padding: 2px; 
            text-align: left;
          }
          .text-right {
            text-align: right;
          }
          .total {
            font-size: 16px; 
            font-weight: bold;
          }
        </style>
      </head>
      <body>
        <h4>Pedido ${order.merchantSequence}</h4>
        <p><strong>Status:</strong> ${OrderStatusMap[order.status]}</p>
        <p><strong>Data:</strong> ${order.createdAt?.toLocaleString()}</p>
        <div class="separator"></div>

        <h3>Itens do Pedido</h3>
        <table>
          <thead>
            <tr>
              <th>Qtd</th>
              <th>Item</th>
              <th class="text-right">Preço</th>
            </tr>
          </thead>
          <tbody>
            ${
              order.items.map(item => `
                <tr>
                  <td>${item.quantity}x</td>
                  <td>${item.item.name}</td>
                  <td class="text-right">R$ ${item.totalPrice.toFixed(2)}</td>
                </tr>
                ${
                  item.options?.map(option => `
                    <tr>
                      <td></td>
                      <td style="font-size: 12px;">+ ${option.option.name}</td>
                      <td class="text-right" style="font-size: 12px;"> ${option.totalPrice.toFixed(2)}</td>
                    </tr>
                  `).join('')
                }
              `).join('')
            }
          </tbody>
        </table>
        <div class="separator"></div>
        <h3>Total</h3>
        <p class="total">R$ ${order.total.orderAmount.toFixed(2)}</p>

        <script>
          window.onload = function() {
            setTimeout(() => {
              window.print();
              setTimeout(() => {
                parent.document.body.removeChild(parent.document.querySelector('iframe'));
              }, 500);
            }, 500);
          };
        </script>
      </body>
      </html>
    `);
    doc.close();
  }
}
