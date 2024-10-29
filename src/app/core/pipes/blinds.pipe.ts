import {Pipe, PipeTransform} from "@angular/core";


@Pipe({
  standalone: true,
  name: 'blinds'
})

export class BlindsPipe implements PipeTransform {

  transform(value: [number, number] | null| undefined, separator: string): string {
    if (!value || value.length !== 2) {
      return '';
    }
    return value.join(separator);
  }

}
