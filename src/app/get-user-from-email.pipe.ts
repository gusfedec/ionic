import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'getUserFromEmail',
})
export class GetUserFromEmail implements PipeTransform {
  transform(value: string): string {
    var user = value.split('@')[0];
    return user;
  }
}
