import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'genrelistWithComma'
})
export class GenrelistWithCommaPipe implements PipeTransform {

    transform(value?: any, args?: any): any {
        return value.join(', ');
    }

}
