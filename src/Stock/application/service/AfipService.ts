import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import Afip from '@afipsdk/afip.js';
import { firstValueFrom } from 'rxjs';
import { ConfigService } from '@nestjs/config';
import DocumentGeneratorService from './DocumentGeneratorService';
import { CreateStockMovementDto } from 'Stock/infrastructure/dto/StockMovement/CreateStockMovementDto';
import StockMovementService from './StockMovementService';
const fs = require('fs');

@Injectable()
export default class AfipService {
  constructor(
    private readonly configService: ConfigService,
    @Inject(forwardRef(() => StockMovementService))
    private readonly stockMovementService: StockMovementService,
    private readonly documentGeneratorService: DocumentGeneratorService,
  ) {}

  public async generarFacturaB(
    puntoDeVenta: number,
    stockMovement: CreateStockMovementDto,
  ) {
    const tipo_de_factura = 6; // 6 = Factura B

    // Certificado (Puede estar guardado en archivos, DB, etc)

    let afip = new Afip({
      CUIT: this.configService.get<string>('CUIT_AFIP'),
      cert: this.configService.get<string>('CERT_AFIP'),
      key: this.configService.get<string>('KEY_AFIP'),
      access_token: this.configService.get<string>('TOKEN_AFIP'),
      production: true,
    });

    const last_voucher = await afip.ElectronicBilling.getLastVoucher(
      puntoDeVenta,
      tipo_de_factura,
    );

    const numero_de_factura = last_voucher + 1;

    const fecha = new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .split('T')[0];

    const fechaActual = new Date();

    const fechaTicket = fechaActual.toLocaleDateString('es-AR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });

    const horaTicket = fechaActual.toLocaleTimeString('es-AR', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });

    const data = {
      CantReg: 1, // Cantidad de facturas a registrar
      PtoVta: puntoDeVenta,
      CbteTipo: tipo_de_factura,
      Concepto: 1,
      DocTipo: 99,
      DocNro: 0,
      CbteDesde: numero_de_factura,
      CbteHasta: numero_de_factura,
      CbteFch: parseInt(fecha.replace(/-/g, '')),
      FchServDesde: fecha,
      FchServHasta: fecha,
      FchVtoPago: null,
      ImpTotal: stockMovement.value,
      ImpTotConc: 0, // Importe neto no gravado
      ImpNeto: this.calcularPrecioNeto(stockMovement.value),
      ImpOpEx: 0,
      ImpIVA: this.calcularIvaAgregado(stockMovement.value),
      ImpTrib: 0, //Importe total de tributos
      MonId: 'PES', //Tipo de moneda usada en la factura ('PES' = pesos argentinos)
      MonCotiz: 1, // Cotización de la moneda usada (1 para pesos argentinos)
      domicilioFiscal: 'DARRAGUEIRA 504 - BARADERO',
      cuit: this.configService.get<string>('CUIT_AFIP'),
      fechaTicket: fechaTicket,
      horaTicket: horaTicket,
      Iva: [
        // Alícuotas asociadas a la factura
        {
          Id: 5, // Id del tipo de IVA (5 = 21%)
          BaseImp: this.calcularPrecioNeto(stockMovement.value),
          Importe: this.calcularIvaAgregado(stockMovement.value),
        },
      ],
    };

    try {
      //generamos la factura
      const res = await afip.ElectronicBilling.createVoucher(data);

      console.log('empezando a crear qr..');
      console.log('CAE ENVIADO: ', res.CAE);

      const respQr = await this.documentGeneratorService.crearQr(
        puntoDeVenta,
        stockMovement.value,
        numero_de_factura,
        parseInt(res.CAE, 10), // Convierte res.CAE a número
      );

      console.log('pdf flux');
      const pdf = await this.documentGeneratorService.crearPdf(
        data,
        res?.CAEFchVto,
        res?.CAE,
        respQr,
      );
      console.log(pdf);

      //const response = await firstValueFrom(this.httpService.post(url, data));

      console.log('resp>', res);
      return pdf;
    } catch (error) {
      throw new Error(`Error al autenticar con AFIP: ${error.message}`);
    }
  }

  public calcularPrecioNeto(precioConIva: number): number {
    const IVA = 0.21;
    const precioNeto = precioConIva / (1 + IVA);
    return parseFloat(precioNeto.toFixed(2));
  }

  public calcularIvaAgregado(precioConIva: number): number {
    const IVA = 0.21;
    const precioNeto = precioConIva / (1 + IVA);
    const ivaAgregado = precioConIva - precioNeto;
    return parseFloat(ivaAgregado.toFixed(2));
  }
}
