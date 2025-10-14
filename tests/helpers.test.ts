import { expect, test } from 'vitest';
import { Stringable } from '../src/Stringable';
import { str } from '../src/helpers';

test('str', () => {
    const string = new Stringable('foo');

    expect(str(string.toString())).toBeInstanceOf(Stringable);
    expect(str('foo').toString()).toBe(string.toString());
});
