# Stringable

[![publish](https://github.com/balboacodes/stringable/actions/workflows/publish.yml/badge.svg)](https://github.com/balboacodes/stringable/actions/workflows/publish.yml)

## About Stringable

Stringable is a TypeScript port of [Laravel's](https://github.com/laravel/laravel) string helpers. It aims to bring a small dose of the expressive and elegant syntax Laravel is known for to the TypeScript community. It has no third-party dependencies, is fully-typed, and includes all of Laravel's tests ported to [Vitest](https://github.com/vitest-dev/vitest). While most helper methods have been ported over, some exceptions were made:

- Methods that require third-party packages like Markdown, UUID, Pluralizer, etc.
- Methods that are not documented on Laravel's docs page
- Methods that are Laravel-specific like: \_\_, e, etc.

## Installation

`npm i @balboacodes/stringable`

## Usage

Stringable consists of two classes: `Str` and `Stringable`. `Str` provides methods via a static interface, while `Stringable` provides a fluent interface via method chaining.

### `Str`

```ts
import { Str } from '@balboacodes/stringable';

const slice = Str.after('This is my name', 'This is '); // 'my name'
```

### `Stringable`

```ts
import { Str } from '@balboacodes/stringable';

const slice = Str.of('This is my name').after('This is ').title(); // 'My Name'
```

`Stringable` is also available via a `str` helper.

```ts
import { str } from '@balboacodes/stringable';

const slice = str('This is my name').after('This is ').title(); // 'My Name'
```

## Documentation

Documentation for the methods can be found on Laravel's [Strings documentation](https://laravel.com/docs/12.x/strings) page. Just translate PHP's syntax to JS like shown above.

## Related

If you like this package and are looking for array helpers, check out the [Arrayable](https://github.com/balboacodes/arrayable) package.
