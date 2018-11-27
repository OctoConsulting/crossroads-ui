import { Observable, from } from 'rxjs';
import { map, distinctUntilChanged } from 'rxjs/operators';

export function mapDistinct<T> (mappingFn: (model: any) => T) {
  return function <U> (source: Observable<U>): Observable<T> {
    return from(source).pipe(map(mappingFn), distinctUntilChanged());
  };
}

