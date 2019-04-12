import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatstamp'
})
export class FormatstampPipe implements PipeTransform {

  transform(value: number, args?: string): string | number {
    if(args === "ts") {
      return value <= 9 ? "0" + value : value;
    }
    if(args === "ms") {
      return value <= 9 ? value + "00" : value <= 99 ? value + "0" : value;
    }
  }

}
