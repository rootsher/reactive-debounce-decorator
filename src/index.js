import{ throwError } from 'rxjs';

function Debounce(wait = 0) {
  return (_target, property, descriptor) => {
    let busy = false;

    return {
      enumerable: descriptor.enumerable,
      configurable: descriptor.configurable,
      get: function () {
        Object.defineProperty(this, property, {
          ...descriptor,
          value: (...args) => {
            if (busy) {
              return throwError(new Error(`Only one request per ${wait}ms.`));
            }

            const $value = descriptor.value.apply(this, args);

            setTimeout(() => busy = false, wait);

            busy = true;

            return $value;
          }
        });

        return this[property];
      }
    }
  }
}
