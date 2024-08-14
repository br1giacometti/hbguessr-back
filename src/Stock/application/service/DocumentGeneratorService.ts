import { Injectable } from '@nestjs/common';
import Afip from '@afipsdk/afip.js';
import { HttpService } from '@nestjs/axios';
import QRCode from 'qrcode';
import { AxiosResponse } from 'axios';
import { firstValueFrom, lastValueFrom, map, Observable } from 'rxjs';
import { join } from 'path';
import { readFileSync } from 'fs';
import Handlebars from 'handlebars';
import { ConfigService } from '@nestjs/config';

@Injectable()
export default class DocumentGeneratorService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  public async getDatosCmpBase64ByAfipService(
    datosCmpBase64: string,
  ): Promise<any> {
    const observable = this.httpService
      .get('https://www.afip.gob.ar/fe/qr/', {
        params: {
          p: datosCmpBase64,
        },
      })
      .pipe(map((response) => response));

    const respuestaAfip = await lastValueFrom(observable);
    const responseUrl = respuestaAfip.request?.res?.responseUrl;
    return responseUrl;
  }

  public async crearQr(
    puntoDeVenta: number,
    importeTotal: number,
    nroCmp: number,
    caeNumero: number,
  ): Promise<string> {
    const fecha = new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .split('T')[0];

    const data = {
      ver: 1,
      fecha: fecha,
      cuit: 20359999470,
      ptoVta: puntoDeVenta,
      tipoCmp: 6,
      nroCmp: nroCmp,
      importe: importeTotal,
      moneda: 'PES',
      ctz: 1,
      tipoDocRec: 99,
      nroDocRec: 0,
      tipoCodAut: 'E',
      codAut: caeNumero, //codigo autorizacion otorgado por afip
    };

    const jsonString = JSON.stringify(data);

    // Codificar la cadena en Base64
    const dataAsBase64 = Buffer.from(jsonString).toString('base64');

    try {
      const responseAfip = await this.getDatosCmpBase64ByAfipService(
        dataAsBase64,
      );
      const qrCodeUrl = await QRCode.toDataURL(responseAfip);
      return qrCodeUrl; // Devuelve la URL del QR Code
    } catch (err) {
      console.error(err);
      throw err; // Re-throw error to be handled by caller
    }
  }

  public padNumber(num, size) {
    let s = num.toString();
    while (s.length < size) s = '0' + s;
    return s;
  }

  public async crearPdf(data, caeFchaVto, cae, respQr): Promise<string> {
    // const html = require('fs').readFileSync('./bill.html', 'utf8');
    const filePath = join(
      process.cwd(),
      'src',
      'Stock',
      'application',
      'html',
      'bill.html',
    );
    let html = null;
    let htmlData = null;

    const dataForHtml = {
      cuit: data?.cuit,
      IIBB: this.formatCuit(data?.cuit),
      personaFiscal: 'GIACOMETTI BRUNO',
      PtoVta: data?.PtoVta,
      tipoFactura: 'B',
      empresa: 'KIOSKING',
      domicilioFiscal: 'DARRAGUEIRA 504 - BARADERO',
      domicilioFiscal2: 'C.P.: 2942 - BUENOS AIRES',
      condicionIva: 1,
      puntoVenta: data?.puntoVenta,
      comprobanteNumero: data?.CbteDesde,
      fechaEmision: data?.fecha,
      ingresosBrutos: 1,
      inicioActividades: 1,
      periodoDesde: data?.FchServDesde,
      periodoHasta: data?.FchServHasta,
      fechaVtoPago: 1,
      clienteCuit: null,
      clienteNombre: null,
      clienteCondicionIva: null,
      clienteDomicilio: null,
      condicionVenta: 2,
      subtotal: 2,
      otrosTributos: null,
      cae: cae,
      fechaVtoCae: caeFchaVto,
      fechaTicket: data?.fechaTicket,
      horaTicket: data?.horaTicket,
      ImpTotal: data?.ImpTotal,
      qrCodeUrl: respQr,
    };

    try {
      html = readFileSync(filePath, 'utf8');
      const template = Handlebars.compile(html);
      console.log('temp', template);
      htmlData = template(dataForHtml);
      console.log('result>>>>>>>>>>.', dataForHtml);
    } catch (error) {
      console.log(error);
    }
    let afip = new Afip({
      CUIT: this.configService.get<string>('CUIT_AFIP'),
      cert: this.configService.get<string>('CERT_AFIP'),
      key: this.configService.get<string>('KEY_AFIP'),
      access_token: this.configService.get<string>('TOKEN_AFIP'),
      production: true,
    });

    // Nombre para el archivo (sin .pdf)
    const name = 'kioskingTicket';

    // Opciones para el archivo
    const options = {
      width: 3.1, // Ancho de pagina en pulgadas. Usar 3.1 para ticket
      marginLeft: 0.1, // Margen izquierdo en pulgadas. Usar 0.1 para ticket
      marginRight: 0.1, // Margen derecho en pulgadas. Usar 0.1 para ticket
      marginTop: 0.1, // Margen superior en pulgadas. Usar 0.1 para ticket
      marginBottom: 0.1, // Margen inferior en pulgadas. Usar 0.1 para ticket
    };

    // Creamos el PDF
    const res = await afip.ElectronicBilling.createPDF({
      html: htmlData ?? html,
      file_name: name,
      options: options,
    });

    // Mostramos la url del archivo creado
    console.log(res.file);
    return res.file;
  }

  public formatCuit(cuit: string): string {
    if (cuit.length !== 11) {
      throw new Error('El CUIT debe tener 11 dígitos');
    }

    const part1 = cuit.slice(0, 2);
    const part2 = cuit.slice(2, 10);
    const part3 = cuit.slice(10);

    return `${part1}-${part2}-${part3}`;
  }
}
