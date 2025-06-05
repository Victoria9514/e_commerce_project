import { Pipe, PipeTransform } from '@angular/core';
import { IProduct } from '@models/product.model';
import { Observable, map } from 'rxjs';

@Pipe({
  name: 'filterProduct',
})
export class FilterProductPipe implements PipeTransform {
  transform(
    products: Observable<IProduct[]>,
    searchTerm: string
  ): Observable<IProduct[]> {
    if (!searchTerm) return products;
    const text = searchTerm.toLowerCase();
    return products.pipe(
      map((value) =>
        value.filter(
          (pr) =>
            pr.title.toLowerCase().includes(text) ||
            pr.title.toLowerCase().startsWith(text)
        )
      )
    );
  }
}
