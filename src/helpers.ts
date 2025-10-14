import { Stringable } from './Stringable';

export function str(value?: string): Stringable {
    return new Stringable(value);
}
