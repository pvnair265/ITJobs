import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate'
})
export class TruncatePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    console.log(args);
    console.log(value);
    return value.substring(0,args)+ '...';
  }

}
