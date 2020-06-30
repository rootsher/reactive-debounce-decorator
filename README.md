# reactive-debounce-decorator

## installation

```sh
$ npm install --save reactive-debounce-decorator
```

## usage

* example service and Debounce usage:

```ts
import { Debounce } from 'reactive-debounce-decorator';

class ProductService {
  @Debounce(1000) // ms
  request() {
    return of(1);
  }
}
```

* try more than once in 1000ms:

```ts
const productService = new ProductService();

// first subscribe (one per second is allowed):
productService.request().subscribe(value => console.log(value));
// the rest will throw errors (unless we delay them in time):
productService.request().subscribe(value => console.log(value), error => console.error('@', error));
productService.request().subscribe(value => console.log(value), error => console.error('@', error));
productService.request().subscribe(value => console.log(value), error => console.error('@', error));
```

* add setTimeout (to delay the subscribe - over one second):

```ts
setTimeout(() => {
    // it's just gonna work!
    productService.request().subscribe(value => console.log(value));
}, 2000);
```
