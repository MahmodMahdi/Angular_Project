import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'square',
})
export class SquarePipe implements PipeTransform {
  // transform(value: number, ...args: unknown[]): unknown {
   transform(value: number,power: number=2): unknown {
  // return value**2;
    return Math.pow(value,power)
  }
}
