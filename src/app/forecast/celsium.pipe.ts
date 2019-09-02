import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'celsium'
})
export class CelsiumPipe implements PipeTransform {

  transform(value: any, displaySign: boolean): string {
    let celsiumValue = (+value - 273.15).toFixed(0);
    if (displaySign) {
      celsiumValue += '℃';
    } else {
      celsiumValue += '°';
    }
    return celsiumValue;
  }

}
