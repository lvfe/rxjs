import { tap } from './tap';
import { EmptyError } from '../util/EmptyError';
/* tslint:disable:no-unused-variable */
import { Observable } from '../Observable';
/* tslint:enable:no-unused-variable */

/**
 * If the source observable completes without emitting a value, it will emit
 * an error. The error will be created at that time by the optional
 * `errorFactory` argument, otherwise, the error will be {@link ErrorEmpty}.
 *
 * @example
 *
 * const click$ = fromEvent(button, 'click');
 *
 * clicks$.pipe(
 *   takeUntil(timer(1000)),
 *   throwIfEmpty(
 *     () => new Error('the button was not clicked within 1 second')
 *   ),
 * )
 * .subscribe({
 *   next() { console.log('The button was clicked'); },
 *   error(err) { console.error(err); },
 * });
 * @param {Function} [errorFactory] A factory function called to produce the
 * error to be thrown when the source observable completes without emitting a
 * value.
 */
export const throwIfEmpty =
  <T>(errorFactory: (() => any) = defaultErrorFactory) => tap<T>({
    hasValue: false,
    next(this: any) { this.hasValue = true; },
    complete(this: any) {
      if (!this.hasValue) {
        throw errorFactory();
      }
    }
  } as any);

export function defaultErrorFactory() {
  return new EmptyError();
}
