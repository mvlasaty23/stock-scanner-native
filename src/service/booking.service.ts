import { Observable, of } from 'rxjs';

interface BookingResponse {
  productGroup?: string;
  amount?: number;
  uom?: string;
  unknownBarcode: boolean;
}

// TODO: integrate API
export function bookByBarcode$(barcode: string): Observable<BookingResponse> {
  return of({ unknownBarcode: true });
  //return of({productGroup: 'Milch', amount: 1, uom: 'l', unknownBarcode: false});
}

export function bookManually$(
  productGroup: string,
  amount: number,
  uom: string,
  barcode?: string
): Observable<BookingResponse> {
  return of({ productGroup: 'Milch', amount: 1, uom: 'l', unknownBarcode: false });
}
