import { str, Str } from '../src/Str';
import { Stringable } from '../src/Stringable';
import { base64_encode } from '../src/utils';
import { expect, test } from 'vitest';

test.each([
    ['hannah', 'han', 'nah'],
    ['hannah', 'n', 'nah'],
    ['ééé hannah', 'han', 'nah'],
    ['hannah', 'xxxx', 'hannah'],
    ['hannah', '', 'hannah'],
    ['han0nah', '0', 'nah'],
])('after(%s, %s) => %s', (subject: string, search: string, expected: string) => {
    expect(Str.after(subject, search)).toBe(expected);
});

test('afterLast', () => {
    expect(Str.afterLast('yvette', 'yve')).toBe('tte');
    expect(Str.afterLast('yvette', 't')).toBe('e');
    expect(Str.afterLast('ééé yvette', 't')).toBe('e');
    expect(Str.afterLast('yvette', 'tte')).toBe('');
    expect(Str.afterLast('yvette', 'xxxx')).toBe('yvette');
    expect(Str.afterLast('yvette', '')).toBe('yvette');
    expect(Str.afterLast('yv0et0te', '0')).toBe('te');
    expect(Str.afterLast('----foo', '---')).toBe('foo');
});

test('apa', () => {
    expect(Str.apa('tom and jerry')).toBe('Tom and Jerry');
    expect(Str.apa('TOM AND JERRY')).toBe('Tom and Jerry');
    expect(Str.apa('Tom And Jerry')).toBe('Tom and Jerry');
    expect(Str.apa('back to the future')).toBe('Back to the Future');
    expect(Str.apa('BACK TO THE FUTURE')).toBe('Back to the Future');
    expect(Str.apa('Back To The Future')).toBe('Back to the Future');
    expect(Str.apa('this, then that')).toBe('This, Then That');
    expect(Str.apa('THIS, THEN THAT')).toBe('This, Then That');
    expect(Str.apa('This, Then That')).toBe('This, Then That');
    expect(Str.apa('bond. james bond.')).toBe('Bond. James Bond.');
    expect(Str.apa('BOND. JAMES BOND.')).toBe('Bond. James Bond.');
    expect(Str.apa('Bond. James Bond.')).toBe('Bond. James Bond.');
    expect(Str.apa('self-report')).toBe('Self-Report');
    expect(Str.apa('Self-report')).toBe('Self-Report');
    expect(Str.apa('SELF-REPORT')).toBe('Self-Report');
    expect(Str.apa('as the world turns, so are the days of our lives')).toBe(
        'As the World Turns, So Are the Days of Our Lives',
    );
    expect(Str.apa('AS THE WORLD TURNS, SO ARE THE DAYS OF OUR LIVES')).toBe(
        'As the World Turns, So Are the Days of Our Lives',
    );
    expect(Str.apa('As The World Turns, So Are The Days Of Our Lives')).toBe(
        'As the World Turns, So Are the Days of Our Lives',
    );
    expect(Str.apa('to kill a mockingbird')).toBe('To Kill a Mockingbird');
    expect(Str.apa('TO KILL A MOCKINGBIRD')).toBe('To Kill a Mockingbird');
    expect(Str.apa('To Kill A Mockingbird')).toBe('To Kill a Mockingbird');
    expect(Str.apa('Être écrivain commence par être un lecteur.')).toBe('Être Écrivain Commence par Être un Lecteur.');
    expect(Str.apa('Être Écrivain Commence par Être un Lecteur.')).toBe('Être Écrivain Commence par Être un Lecteur.');
    expect(Str.apa('ÊTRE ÉCRIVAIN COMMENCE PAR ÊTRE UN LECTEUR.')).toBe('Être Écrivain Commence par Être un Lecteur.');
    expect(Str.apa("c'est-à-dire.")).toBe("C'est-à-Dire.");
    expect(Str.apa("C'est-à-Dire.")).toBe("C'est-à-Dire.");
    expect(Str.apa("C'EsT-À-DIRE.")).toBe("C'est-à-Dire.");
    expect(Str.apa('устное слово – не воробей. как только он вылетит, его не поймаешь.')).toBe(
        'Устное Слово – Не Воробей. Как Только Он Вылетит, Его Не Поймаешь.',
    );
    expect(Str.apa('Устное Слово – Не Воробей. Как Только Он Вылетит, Его Не Поймаешь.')).toBe(
        'Устное Слово – Не Воробей. Как Только Он Вылетит, Его Не Поймаешь.',
    );
    expect(Str.apa('УСТНОЕ СЛОВО – НЕ ВОРОБЕЙ. КАК ТОЛЬКО ОН ВЫЛЕТИТ, ЕГО НЕ ПОЙМАЕШЬ.')).toBe(
        'Устное Слово – Не Воробей. Как Только Он Вылетит, Его Не Поймаешь.',
    );
    expect(Str.apa('')).toBe('');
    expect(Str.apa('   ')).toBe('   ');
});

test('before', () => {
    expect(Str.before('hannah', 'nah')).toBe('han');
    expect(Str.before('hannah', 'n')).toBe('ha');
    expect(Str.before('ééé hannah', 'han')).toBe('ééé ');
    expect(Str.before('hannah', 'xxxx')).toBe('hannah');
    expect(Str.before('hannah', '')).toBe('hannah');
    expect(Str.before('han0nah', '0')).toBe('han');
    expect(Str.before('', '')).toBe('');
    expect(Str.before('', 'a')).toBe('');
    expect(Str.before('a', 'a')).toBe('');
    expect(Str.before('foo@bar.com', '@')).toBe('foo');
    expect(Str.before('foo@@bar.com', '@')).toBe('foo');
    expect(Str.before('@foo@bar.com', '@')).toBe('');
});

test('beforeLast', () => {
    expect(Str.beforeLast('yvette', 'tte')).toBe('yve');
    expect(Str.beforeLast('yvette', 't')).toBe('yvet');
    expect(Str.beforeLast('ééé yvette', 'yve')).toBe('ééé ');
    expect(Str.beforeLast('yvette', 'yve')).toBe('');
    expect(Str.beforeLast('yvette', 'xxxx')).toBe('yvette');
    expect(Str.beforeLast('yvette', '')).toBe('yvette');
    expect(Str.beforeLast('yv0et0te', '0')).toBe('yv0et');
    expect(Str.beforeLast('', 'test')).toBe('');
    expect(Str.beforeLast('yvette', 'yvette')).toBe('');
    expect(Str.beforeLast('laravel framework', ' ')).toBe('laravel');
    expect(Str.beforeLast('yvette\tyv0et0te', '\t')).toBe('yvette');
});

test('between', () => {
    expect(Str.between('abc', '', 'c')).toBe('abc');
    expect(Str.between('abc', 'a', '')).toBe('abc');
    expect(Str.between('abc', '', '')).toBe('abc');
    expect(Str.between('abc', 'a', 'c')).toBe('b');
    expect(Str.between('dddabc', 'a', 'c')).toBe('b');
    expect(Str.between('abcddd', 'a', 'c')).toBe('b');
    expect(Str.between('dddabcddd', 'a', 'c')).toBe('b');
    expect(Str.between('hannah', 'ha', 'ah')).toBe('nn');
    expect(Str.between('[a]ab[b]', '[', ']')).toBe('a]ab[b');
    expect(Str.between('foofoobar', 'foo', 'bar')).toBe('foo');
    expect(Str.between('foobarbar', 'foo', 'bar')).toBe('bar');
    expect(Str.between('123456789', '123', '6789')).toBe('45');
    expect(Str.between('nothing', 'foo', 'bar')).toBe('nothing');
});

test('betweenFirst', () => {
    expect(Str.betweenFirst('abc', '', 'c')).toBe('abc');
    expect(Str.betweenFirst('abc', 'a', '')).toBe('abc');
    expect(Str.betweenFirst('abc', '', '')).toBe('abc');
    expect(Str.betweenFirst('abc', 'a', 'c')).toBe('b');
    expect(Str.betweenFirst('dddabc', 'a', 'c')).toBe('b');
    expect(Str.betweenFirst('abcddd', 'a', 'c')).toBe('b');
    expect(Str.betweenFirst('dddabcddd', 'a', 'c')).toBe('b');
    expect(Str.betweenFirst('hannah', 'ha', 'ah')).toBe('nn');
    expect(Str.betweenFirst('[a]ab[b]', '[', ']')).toBe('a');
    expect(Str.betweenFirst('foofoobar', 'foo', 'bar')).toBe('foo');
    expect(Str.betweenFirst('foobarbar', 'foo', 'bar')).toBe('');
});

test('camel', () => {
    expect(Str.camel('Laravel_p_h_p_framework')).toBe('laravelPHPFramework');
    expect(Str.camel('Laravel_php_framework')).toBe('laravelPhpFramework');
    expect(Str.camel('Laravel-phP-framework')).toBe('laravelPhPFramework');
    expect(Str.camel('Laravel  -_-  php   -_-   framework   ')).toBe('laravelPhpFramework');

    expect(Str.camel('FooBar')).toBe('fooBar');
    expect(Str.camel('foo_bar')).toBe('fooBar');
    // Test cache.
    expect(Str.camel('foo_bar')).toBe('fooBar');
    expect(Str.camel('Foo-barBaz')).toBe('fooBarBaz');
    expect(Str.camel('foo-bar_baz')).toBe('fooBarBaz');

    expect(Str.camel('')).toBe('');
    expect(Str.camel('LARAVEL_PHP_FRAMEWORK')).toBe('lARAVELPHPFRAMEWORK');
    expect(Str.camel('   laravel   php   framework   ')).toBe('laravelPhpFramework');

    expect(Str.camel('foo1_bar')).toBe('foo1Bar');
    expect(Str.camel('1 foo bar')).toBe('1FooBar');
});

test('charAt', () => {
    expect(Str.charAt('Привет, мир!', 1)).toBe('р');
    expect(Str.charAt('「こんにちは世界」', 4)).toBe('ち');
    expect(Str.charAt('Привет, world!', 8)).toBe('w');
    expect(Str.charAt('「こんにちは世界」', -2)).toBe('界');
    expect(Str.charAt('「こんにちは世界」', -200)).toBe(false);
    expect(Str.charAt('Привет, мир!', 100)).toBe(false);
});

test('chopEnd', () => {
    expect(Str.chopEnd('path/to/file.php', '.php')).toBe('path/to/file');
    expect(Str.chopEnd('.php-.php', '.php')).toBe('.php-');
    expect(Str.chopEnd('path/to/file.php', '.ph')).toBe('path/to/file.php');
    expect(Str.chopEnd('path/to/file.php', 'foo.php')).toBe('path/to/file.php');
    expect(Str.chopEnd('path/to/file.php', '.php-')).toBe('path/to/file.php');
    expect(Str.chopEnd('path/to/file.php', ['.html', '.php'])).toBe('path/to/file');
    expect(Str.chopEnd('path/to/file.php', ['.php', 'file'])).toBe('path/to/file');
    expect(Str.chopEnd('path/to/php.php', '.php')).toBe('path/to/php');
    expect(Str.chopEnd('✋🌊', '🌊')).toBe('✋');
    expect(Str.chopEnd('✋🌊', '✋')).toBe('✋🌊');
});

test('chopStart', () => {
    expect(Str.chopStart('http://laravel.com', 'http://')).toBe('laravel.com');
    expect(Str.chopStart('http://-http://', 'http://')).toBe('-http://');
    expect(Str.chopStart('http://laravel.com', 'htp:/')).toBe('http://laravel.com');
    expect(Str.chopStart('http://laravel.com', 'http://www.')).toBe('http://laravel.com');
    expect(Str.chopStart('http://laravel.com', '-http://')).toBe('http://laravel.com');
    expect(Str.chopStart('http://laravel.com', ['https://', 'http://'])).toBe('laravel.com');
    expect(Str.chopStart('http://www.laravel.com', ['http://', 'www.'])).toBe('www.laravel.com');
    expect(Str.chopStart('http://http-is-fun.test', 'http://')).toBe('http-is-fun.test');
    expect(Str.chopStart('🌊✋', '🌊')).toBe('✋');
    expect(Str.chopStart('🌊✋', '✋')).toBe('🌊✋');
});

test.each([
    ['Taylor', 'ylo', true, true],
    ['Taylor', 'ylo', true, false],
    ['Taylor', 'taylor', true, true],
    ['Taylor', 'taylor', false, false],
    ['Taylor', ['ylo'], true, true],
    ['Taylor', ['ylo'], true, false],
    ['Taylor', ['xxx', 'ylo'], true, true],
    ['Taylor', ['xxx', 'ylo'], true, false],
    ['Taylor', 'xxx', false, false],
    ['Taylor', ['xxx'], false, false],
    ['Taylor', '', false, false],
    ['', '', false, false],
])(
    'contains("%s", %p, %s, %s)',
    (haystack: string, needles: string | string[], expected: boolean, ignoreCase: boolean = false) => {
        expect(Str.contains(haystack, needles, ignoreCase)).toBe(expected);
    },
);

test.each([
    ['Taylor Otwell', ['taylor', 'otwell'], false, false],
    ['Taylor Otwell', ['taylor', 'otwell'], true, true],
    ['Taylor Otwell', ['taylor'], false, false],
    ['Taylor Otwell', ['taylor'], true, true],
    ['Taylor Otwell', ['taylor', 'xxx'], false, false],
    ['Taylor Otwell', ['taylor', 'xxx'], false, true],
])(
    'containsAll("%s", %p, %s, %s)',
    (haystack: string, needles: string[], expected: boolean, ignoreCase: boolean = false) => {
        expect(Str.containsAll(haystack, needles, ignoreCase)).toBe(expected);
    },
);

test('deduplicate', () => {
    expect(Str.deduplicate(' laravel   php  framework ')).toBe(' laravel php framework ');
    expect(Str.deduplicate('whaaat', 'a')).toBe('what');
    expect(Str.deduplicate('/some//odd//path/', '/')).toBe('/some/odd/path/');
    expect(Str.deduplicate('ムだだム', 'だ')).toBe('ムだム');
    expect(Str.deduplicate(' laravell    foreverrr  ', [' ', 'l', 'r'])).toBe(' laravel forever ');
});

test.each([['Tar', 'ylo', true, true]])(
    'doesntContain("%s", %p, %s, %s)',
    (haystack: string, needles: string | string[], expected: boolean, ignoreCase: boolean = false) => {
        expect(Str.doesntContain(haystack, needles, ignoreCase)).toBe(expected);
    },
);

test('doesntEndWith', () => {
    expect(Str.doesntEndWith('jason', 'on')).toBe(false);
    expect(Str.doesntEndWith('jason', 'jason')).toBe(false);
    expect(Str.doesntEndWith('jason', ['on'])).toBe(false);
    expect(Str.doesntEndWith('jason', ['no', 'on'])).toBe(false);
    expect(Str.doesntEndWith('jason', 'no')).toBe(true);
    expect(Str.doesntEndWith('jason', ['no'])).toBe(true);
    expect(Str.doesntEndWith('jason', '')).toBe(true);
    expect(Str.doesntEndWith('', '')).toBe(true);
    expect(Str.doesntEndWith('jason', 'N')).toBe(true);
    expect(Str.doesntEndWith('7', ' 7')).toBe(true);
    expect(Str.doesntEndWith('a7', '7')).toBe(false);
    // Test for multibyte string support.
    expect(Str.doesntEndWith('Jönköping', 'öping')).toBe(false);
    expect(Str.doesntEndWith('Malmö', 'mö')).toBe(false);
    expect(Str.doesntEndWith('Jönköping', 'oping')).toBe(true);
    expect(Str.doesntEndWith('Malmö', 'mo')).toBe(true);
    expect(Str.doesntEndWith('你好', '好')).toBe(false);
    expect(Str.doesntEndWith('你好', '你')).toBe(true);
    expect(Str.doesntEndWith('你好', 'a')).toBe(true);
});

test('doesntStartWith', () => {
    expect(Str.doesntStartWith('jason', 'jas')).toBe(false);
    expect(Str.doesntStartWith('jason', 'jason')).toBe(false);
    expect(Str.doesntStartWith('jason', ['jas'])).toBe(false);
    expect(Str.doesntStartWith('jason', ['day', 'jas'])).toBe(false);
    expect(Str.doesntStartWith('jason', 'day')).toBe(true);
    expect(Str.doesntStartWith('jason', ['day'])).toBe(true);
    expect(Str.doesntStartWith('jason', 'J')).toBe(true);
    expect(Str.doesntStartWith('jason', '')).toBe(true);
    expect(Str.doesntStartWith('', '')).toBe(true);
    expect(Str.doesntStartWith('7', ' 7')).toBe(true);
    expect(Str.doesntStartWith('7a', '7')).toBe(false);
    // Test for multibyte string support.
    expect(Str.doesntStartWith('Jönköping', 'Jö')).toBe(false);
    expect(Str.doesntStartWith('Malmö', 'Malmö')).toBe(false);
    expect(Str.doesntStartWith('Jönköping', 'Jonko')).toBe(true);
    expect(Str.doesntStartWith('Malmö', 'Malmo')).toBe(true);
    expect(Str.doesntStartWith('你好', '你')).toBe(false);
    expect(Str.doesntStartWith('你好', '好')).toBe(true);
    expect(Str.doesntStartWith('你好', 'a')).toBe(true);
});

test('endsWith', () => {
    expect(Str.endsWith('jason', 'on')).toBe(true);
    expect(Str.endsWith('jason', 'jason')).toBe(true);
    expect(Str.endsWith('jason', ['on'])).toBe(true);
    expect(Str.endsWith('jason', ['no', 'on'])).toBe(true);
    expect(Str.endsWith('jason', 'no')).toBe(false);
    expect(Str.endsWith('jason', ['no'])).toBe(false);
    expect(Str.endsWith('jason', '')).toBe(false);
    expect(Str.endsWith('', '')).toBe(false);
    expect(Str.endsWith('jason', 'N')).toBe(false);
    expect(Str.endsWith('7', ' 7')).toBe(false);
    expect(Str.endsWith('a7', '7')).toBe(true);

    // Multibyte string support.
    expect(Str.endsWith('Jönköping', 'öping')).toBe(true);
    expect(Str.endsWith('Malmö', 'mö')).toBe(true);
    expect(Str.endsWith('Jönköping', 'oping')).toBe(false);
    expect(Str.endsWith('Malmö', 'mo')).toBe(false);
    expect(Str.endsWith('你好', '好')).toBe(true);
    expect(Str.endsWith('你好', '你')).toBe(false);
    expect(Str.endsWith('你好', 'a')).toBe(false);
});

test('excerpt', () => {
    expect(Str.excerpt('This is a beautiful morning', 'beautiful', { radius: 5 })).toBe('...is a beautiful morn...');
    expect(Str.excerpt('This is a beautiful morning', 'this', { radius: 5 })).toBe('This is a...');
    expect(Str.excerpt('This is a beautiful morning', 'morning', { radius: 5 })).toBe('...iful morning');
    expect(Str.excerpt('This is a beautiful morning', 'day')).toBeNull();
    expect(Str.excerpt('This is a beautiful! morning', 'Beautiful', { radius: 5 })).toBe('...is a beautiful! mor...');
    expect(Str.excerpt('This is a beautiful? morning', 'beautiful', { radius: 5 })).toBe('...is a beautiful? mor...');
    expect(Str.excerpt('', '', { radius: 0 })).toBe('');
    expect(Str.excerpt('a', 'a', { radius: 0 })).toBe('a');
    expect(Str.excerpt('abc', 'B', { radius: 0 })).toBe('...b...');
    expect(Str.excerpt('abc', 'b', { radius: 1 })).toBe('abc');
    expect(Str.excerpt('abcd', 'b', { radius: 1 })).toBe('abc...');
    expect(Str.excerpt('zabc', 'b', { radius: 1 })).toBe('...abc');
    expect(Str.excerpt('zabcd', 'b', { radius: 1 })).toBe('...abc...');
    expect(Str.excerpt('zabcd', 'b', { radius: 2 })).toBe('zabcd');
    expect(Str.excerpt('  zabcd  ', 'b', { radius: 4 })).toBe('zabcd');
    expect(Str.excerpt('z  abc  d', 'b', { radius: 1 })).toBe('...abc...');
    expect(Str.excerpt('This is a beautiful morning', 'beautiful', { omission: '[...]', radius: 5 })).toBe(
        '[...]is a beautiful morn[...]',
    );
    expect(
        Str.excerpt(
            'This is the ultimate supercalifragilisticexpialidocious very looooooooooooooooooong looooooooooooong beautiful morning with amazing sunshine and awesome temperatures. So what are you gonna do about it?',
            'very',
            { omission: '[...]' },
        ),
    ).toBe(
        'This is the ultimate supercalifragilisticexpialidocious very looooooooooooooooooong looooooooooooong beautiful morning with amazing sunshine and awesome tempera[...]',
    );

    expect(Str.excerpt('taylor', 'y', { radius: 0 })).toBe('...y...');
    expect(Str.excerpt('taylor', 'Y', { radius: 1 })).toBe('...ayl...');
    expect(Str.excerpt('<div> The article description </div>', 'article')).toBe('<div> The article description </div>');
    expect(Str.excerpt('<div> The article description </div>', 'article', { radius: 5 })).toBe(
        '...The article desc...',
    );
    expect(Str.excerpt('<div> The article description </div>'.replace(/<\/?[^>]+(>|$)/g, ''), 'article')).toBe(
        'The article description',
    );
    expect(Str.excerpt('')).toBe('');
    expect(Str.excerpt('The article description', undefined, { radius: 1 })).toBe('T...');
    expect(Str.excerpt('The article description', '', { radius: 8 })).toBe('The arti...');
    expect(Str.excerpt(' ')).toBe('');
    expect(Str.excerpt('The article description', ' ', { radius: 4 })).toBe('The arti...');
    expect(Str.excerpt('The article description', 'description', { radius: 4 })).toBe('...cle description');
    expect(Str.excerpt('The article description', 'T', { radius: 0 })).toBe('T...');
    expect(Str.excerpt('What is the article?', 'What', { omission: '?', radius: 2 })).toBe('What i?');

    expect(Str.excerpt('åèö - 二 sān 大åèö', '二 sān', { radius: 4 })).toBe('...ö - 二 sān 大åè...');
    expect(Str.excerpt('åèö - 二 sān 大åèö', 'åèö', { radius: 4 })).toBe('åèö - 二...');
    expect(Str.excerpt('åèö - 二 sān 大åèö', 'åèö - 二 sān 大åèö', { radius: 4 })).toBe('åèö - 二 sān 大åèö');
    expect(Str.excerpt('åèö - 二 sān 大åèö', 'åèö - 二 sān 大åèö', { radius: 4 })).toBe('åèö - 二 sān 大åèö');
    expect(Str.excerpt('㏗༼㏗', '༼', { radius: 0 })).toBe('...༼...');
    expect(Str.excerpt('㏗༼㏗', '༼', { radius: 0 })).toBe('...༼...');
    expect(Str.excerpt('Como você está', 'ê', { radius: 2 })).toBe('...ocê e...');
    expect(Str.excerpt('Como você está', 'Ê', { radius: 2 })).toBe('...ocê e...');
    expect(Str.excerpt('João Antônio ', 'jo', { radius: 2 })).toBe('João...');
    expect(Str.excerpt('João Antônio', 'JOÃO', { radius: 5 })).toBe('João Antô...');
    expect(Str.excerpt('', '/')).toBeNull();
});

test('finish', () => {
    expect(Str.finish('ab', 'bc')).toBe('abbc');
    expect(Str.finish('abbcbc', 'bc')).toBe('abbc');
    expect(Str.finish('abcbbcbc', 'bc')).toBe('abcbbc');
});

test('flushCache', () => {
    const snakeCacheProp = 'snakeCache';

    Str.flushCache();

    expect((Str as any)[snakeCacheProp]).toEqual({});

    Str.snake('Taylor Otwell');

    expect((Str as any)[snakeCacheProp]).not.toEqual({});

    Str.flushCache();

    expect((Str as any)[snakeCacheProp]).toEqual({});
});

test('fromBase64', () => {
    expect(Str.fromBase64(base64_encode('foo'))).toBe('foo');
    expect(Str.fromBase64(base64_encode('foobar'), true)).toBe('foobar');
});

test('headline', () => {
    expect(Str.headline('jefferson costella')).toBe('Jefferson Costella');
    expect(Str.headline('jefFErson coSTella')).toBe('Jefferson Costella');
    expect(Str.headline('jefferson_costella uses-_Laravel')).toBe('Jefferson Costella Uses Laravel');
    expect(Str.headline('jefferson_costella uses__Laravel')).toBe('Jefferson Costella Uses Laravel');
    expect(Str.headline('laravel_p_h_p_framework')).toBe('Laravel P H P Framework');
    expect(Str.headline('laravel _p _h _p _framework')).toBe('Laravel P H P Framework');
    expect(Str.headline('laravel_php_framework')).toBe('Laravel Php Framework');
    expect(Str.headline('laravel-phP-framework')).toBe('Laravel Ph P Framework');
    expect(Str.headline('laravel  -_-  php   -_-   framework   ')).toBe('Laravel Php Framework');
    expect(Str.headline('fooBar')).toBe('Foo Bar');
    expect(Str.headline('foo_bar')).toBe('Foo Bar');
    expect(Str.headline('foo-barBaz')).toBe('Foo Bar Baz');
    expect(Str.headline('foo-bar_baz')).toBe('Foo Bar Baz');
    expect(Str.headline('öffentliche-überraschungen')).toBe('Öffentliche Überraschungen');
    expect(Str.headline('-_öffentliche_überraschungen_-')).toBe('Öffentliche Überraschungen');
    expect(Str.headline('-öffentliche überraschungen')).toBe('Öffentliche Überraschungen');
    expect(Str.headline('sindÖdeUndSo')).toBe('Sind Öde Und So');
    expect(Str.headline('orwell 1984')).toBe('Orwell 1984');
    expect(Str.headline('orwell   1984')).toBe('Orwell 1984');
    expect(Str.headline('-orwell-1984 -')).toBe('Orwell 1984');
    expect(Str.headline(' orwell_- 1984 ')).toBe('Orwell 1984');
});

test('is', () => {
    expect(Str.is('/', '/')).toBe(true);
    expect(Str.is('/', ' /')).toBe(false);
    expect(Str.is('/', '/a')).toBe(false);
    expect(Str.is('foo/*', 'foo/bar/baz')).toBe(true);
    expect(Str.is('*@*', 'App\\Class@method')).toBe(true);
    expect(Str.is('*@*', 'app\\Class@')).toBe(true);
    expect(Str.is('*@*', '@method')).toBe(true);

    // Case sensitive.
    expect(Str.is('*BAZ*', 'foo/bar/baz')).toBe(false);
    expect(Str.is('*FOO*', 'foo/bar/baz')).toBe(false);
    expect(Str.is('A', 'a')).toBe(false);

    // Case insensitive.
    expect(Str.is('A', 'a', true)).toBe(true);
    expect(Str.is('*BAZ*', 'foo/bar/baz', true)).toBe(true);
    expect(Str.is(['A*', 'B*'], 'a/', true)).toBe(true);
    expect(Str.is(['A*', 'B*'], 'f/', true)).toBe(false);
    expect(Str.is('FOO', 'foo', true)).toBe(true);
    expect(Str.is('*FOO*', 'foo/bar/baz', true)).toBe(true);
    expect(Str.is('foo/*', 'FOO/bar', true)).toBe(true);

    // Arrays.
    expect(Str.is(['a*', 'b*'], 'a/')).toBe(true);
    expect(Str.is(['a*', 'b*'], 'b/')).toBe(true);
    expect(Str.is(['a*', 'b*'], 'f/')).toBe(false);
    expect(Str.is('*/foo', 'blah/baz/foo')).toBe(true);

    // Empty patterns.
    expect(Str.is([], 'test')).toBe(false);
});

test('isJson', () => {
    expect(Str.isJson('1')).toBe(true);
    expect(Str.isJson('[1,2,3]')).toBe(true);
    expect(Str.isJson('[1,   2,   3]')).toBe(true);
    expect(Str.isJson('{"first": "John", "last": "Doe"}')).toBe(true);
    expect(Str.isJson('[{"first": "John", "last": "Doe"}, {"first": "Jane", "last": "Doe"}]')).toBe(true);

    expect(Str.isJson('1,')).toBe(false);
    expect(Str.isJson('[1,2,3')).toBe(false);
    expect(Str.isJson('[1,   2   3]')).toBe(false);
    expect(Str.isJson('{first: "John"}')).toBe(false);
    expect(Str.isJson('[{first: "John"}, {first: "Jane"}]')).toBe(false);
    expect(Str.isJson('')).toBe(false);
    expect(Str.isJson(null)).toBe(false);
    expect(Str.isJson([])).toBe(false);
});

test('isMatch', () => {
    expect(Str.isMatch('/.*,.*!/', 'Hello, Laravel!')).toBe(true);
    expect(Str.isMatch('/^.*$(.*)/', 'Hello, Laravel!')).toBe(true);
    expect(Str.isMatch('/laravel/i', 'Hello, Laravel!')).toBe(true);
    expect(Str.isMatch('/^(.*(.*(.*)))/', 'Hello, Laravel!')).toBe(true);

    expect(Str.isMatch('/H.o/', 'Hello, Laravel!')).toBe(false);
    expect(Str.isMatch('/^laravel!/i', 'Hello, Laravel!')).toBe(false);
    expect(Str.isMatch('/laravel!(.*)/', 'Hello, Laravel!')).toBe(false);
    expect(Str.isMatch('/^[a-zA-Z,!]+$/', 'Hello, Laravel!')).toBe(false);

    expect(Str.isMatch(['/.*,.*!/', '/H.o/'], 'Hello, Laravel!')).toBe(true);
    expect(Str.isMatch(['/^laravel!/i', '/^.*$(.*)/'], 'Hello, Laravel!')).toBe(true);
    expect(Str.isMatch(['/laravel/i', '/laravel!(.*)/'], 'Hello, Laravel!')).toBe(true);
    expect(Str.isMatch(['/^[a-zA-Z,!]+$/', '/^(.*(.*(.*)))/'], 'Hello, Laravel!')).toBe(true);
});

test('isUrl', () => {
    expect(Str.isUrl('https://laravel.com')).toBe(true);
    expect(Str.isUrl('http://localhost')).toBe(true);
    expect(Str.isUrl('invalid url')).toBe(false);
});

test('kebab', () => {
    expect(Str.kebab('LaravelPhpFramework')).toBe('laravel-php-framework');
    expect(Str.kebab('Laravel Php Framework')).toBe('laravel-php-framework');
    expect(Str.kebab('Laravel ❤ Php Framework')).toBe('laravel❤-php-framework');
    expect(Str.kebab('')).toBe('');
});

test('lcfirst', () => {
    expect(Str.lcfirst('Laravel')).toBe('laravel');
    expect(Str.lcfirst('Laravel framework')).toBe('laravel framework');
    expect(Str.lcfirst('Мама')).toBe('мама');
    expect(Str.lcfirst('Мама мыла раму')).toBe('мама мыла раму');
});

test('length', () => {
    expect(Str.length('foo bar baz')).toBe(11);
});

test('limit', () => {
    expect(Str.limit('Laravel is a free, open source PHP web application framework.', 10)).toBe('Laravel is...');
    expect(Str.limit('这是一段中文', 6)).toBe('这是一...');
    expect(Str.limit('Laravel is a free, open source PHP web application framework.', 15, '...', true)).toBe(
        'Laravel is a...',
    );

    const string = 'The PHP framework for web artisans.';

    expect(Str.limit(string, 7)).toBe('The PHP...');
    expect(Str.limit(string, 10, '...', true)).toBe('The PHP...');
    expect(Str.limit(string, 7, '')).toBe('The PHP');
    expect(Str.limit(string, 10, '', true)).toBe('The PHP');
    expect(Str.limit(string, 100)).toBe('The PHP framework for web artisans.');
    expect(Str.limit(string, 100, '...', true)).toBe('The PHP framework for web artisans.');
    expect(Str.limit(string, 20, '...', true)).toBe('The PHP framework...');

    const nonAsciiString = '这是一段中文';

    expect(Str.limit(nonAsciiString, 6)).toBe('这是一...');
    expect(Str.limit(nonAsciiString, 6, '...', true)).toBe('这是一...');
    expect(Str.limit(nonAsciiString, 6, '')).toBe('这是一');
    expect(Str.limit(nonAsciiString, 6, '', true)).toBe('这是一');
});

test('lower', () => {
    expect(Str.lower('FOO BAR BAZ')).toBe('foo bar baz');
    expect(Str.lower('fOo Bar bAz')).toBe('foo bar baz');
});

test('ltrim', () => {
    const escape = (s: string) => s.replace(/[-\\^]/g, '\\$&');

    const ltrimDefaultChars = [' ', '\n', '\r', '\t', '\v'];
    const ltrimDefaultClass = ltrimDefaultChars.map(escape).join('');
    const defaultLtrimRegex = new RegExp(`^[${ltrimDefaultClass}]+`);

    expect(Str.ltrim(' foo    bar ')).toBe('foo    bar ');
    expect(Str.ltrim('   123    ')).toBe('123    ');
    expect(Str.ltrim('だ')).toBe('だ');
    expect(Str.ltrim('ム')).toBe('ム');
    expect(Str.ltrim('   だ    ')).toBe('だ    ');
    expect(Str.ltrim('   ム    ')).toBe('ム    ');

    expect(
        Str.ltrim(`
                foo bar
            `),
    ).toBe(`foo bar
            `);

    expect(Str.ltrim(' \xE9 ')).toBe('\xE9 ');

    // Loop to test each default trim char.
    for (const char of ltrimDefaultChars) {
        const testStr = ` ${char} `;

        expect(Str.ltrim(testStr)).toBe(testStr.replace(defaultLtrimRegex, ''));

        const padded = `${char} foo bar ${char}`;

        expect(Str.ltrim(padded)).toBe(padded.replace(defaultLtrimRegex, ''));
    }
});

test('mask', () => {
    expect(Str.mask('taylor@email.com', '*', 3)).toBe('tay*************');
    expect(Str.mask('taylor@email.com', '*', 0, 6)).toBe('******@email.com');
    expect(Str.mask('taylor@email.com', '*', -13)).toBe('tay*************');
    expect(Str.mask('taylor@email.com', '*', -13, 3)).toBe('tay***@email.com');
    expect(Str.mask('taylor@email.com', '*', -17)).toBe('****************');
    expect(Str.mask('taylor@email.com', '*', -99, 5)).toBe('*****r@email.com');
    expect(Str.mask('taylor@email.com', '*', 16)).toBe('taylor@email.com');
    expect(Str.mask('taylor@email.com', '*', 16, 99)).toBe('taylor@email.com');
    expect(Str.mask('taylor@email.com', '', 3)).toBe('taylor@email.com');
    expect(Str.mask('taylor@email.com', 'something', 3)).toBe('taysssssssssssss');
    expect(Str.mask('这是一段中文', '*', 3)).toBe('这是一***');
    expect(Str.mask('这是一段中文', '*', 0, 2)).toBe('**一段中文');
    expect(Str.mask('maan@email.com', '*', 2, 1)).toBe('ma*n@email.com');
    expect(Str.mask('maan@email.com', '*', 2, 3)).toBe('ma***email.com');
    expect(Str.mask('maan@email.com', '*', 2)).toBe('ma************');
    expect(Str.mask('maria@email.com', '*', 4, 1)).toBe('mari*@email.com');
    expect(Str.mask('tamara@email.com', '*', 5, 1)).toBe('tamar*@email.com');
    expect(Str.mask('maria@email.com', '*', 0, 1)).toBe('*aria@email.com');
    expect(Str.mask('maria@email.com', '*', -1, 1)).toBe('maria@email.co*');
    expect(Str.mask('maria@email.com', '*', -1)).toBe('maria@email.co*');
    expect(Str.mask('maria@email.com', '*', -15)).toBe('***************');
    expect(Str.mask('maria@email.com', '*', 0)).toBe('***************');
});

test('match', () => {
    expect(Str.match('/bar/', 'foo bar')).toBe('bar');
    expect(Str.match('/foo (.*)/', 'foo bar')).toBe('bar');
    expect(Str.match('/nothing/', 'foo bar')).toBe('');
    expect(Str.match('/pattern/', '')).toBe('');
});

test('matchAll', () => {
    expect(Str.matchAll('/bar/', 'bar foo bar')).toEqual(['bar', 'bar']);
    expect(Str.matchAll('/f(\\w*)/', 'bar fun bar fly')).toEqual(['un', 'ly']);
    expect(Str.matchAll('/nothing/', 'bar fun bar fly')).toEqual([]);
    expect(Str.matchAll('/pattern/', '')).toEqual([]);
});

test('padBoth', () => {
    expect(Str.padBoth('Alien', 10, '_')).toBe('__Alien___');
    expect(Str.padBoth('Alien', 10)).toBe('  Alien   ');
    expect(Str.padBoth('❤MultiByte☆', 16)).toBe('  ❤MultiByte☆   ');
    expect(Str.padBoth('❤MultiByte☆', 16, '❤☆')).toBe('❤☆❤MultiByte☆❤☆❤');
});

test('padLeft', () => {
    expect(Str.padLeft('Alien', 10, '-=')).toBe('-=-=-Alien');
    expect(Str.padLeft('Alien', 10)).toBe('     Alien');
    expect(Str.padLeft('❤MultiByte☆', 16)).toBe('     ❤MultiByte☆');
    expect(Str.padLeft('❤MultiByte☆', 16, '❤☆')).toBe('❤☆❤☆❤❤MultiByte☆');
});

test('padRight', () => {
    expect(Str.padRight('Alien', 10, '-=')).toBe('Alien-=-=-');
    expect(Str.padRight('Alien', 10)).toBe('Alien     ');
    expect(Str.padRight('❤MultiByte☆', 16)).toBe('❤MultiByte☆     ');
    expect(Str.padRight('❤MultiByte☆', 16, '❤☆')).toBe('❤MultiByte☆❤☆❤☆❤');
});

test('password', () => {
    const pwDefault = Str.password();

    expect(pwDefault.length).toBe(32);

    const pwNoSpaces = Str.password();

    expect(pwNoSpaces.includes(' ')).toBe(false);

    const pwWithSpaces = Str.password(32, true, true, true, true);

    expect(pwWithSpaces.includes(' ')).toBe(true);

    const pwHasNumber = Str.password();
    const hasNumber = '0123456789'.split('').some((digit) => pwHasNumber.includes(digit));

    expect(hasNumber).toBe(true);
});

test('position', () => {
    expect(Str.position('Hello, World!', 'W')).toBe(7);
    expect(Str.position('This is a test string.', 'test')).toBe(10);
    expect(Str.position('This is a test string, test again.', 'test', 15)).toBe(23);
    expect(Str.position('Hello, World!', 'Hello')).toBe(0);
    expect(Str.position('Hello, World!', 'World!')).toBe(7);
    expect(Str.position('This is a tEsT string.', 'tEsT', 0)).toBe(10);
    expect(Str.position('Hello, World!', 'W', -6)).toBe(7);
    expect(Str.position('Äpfel, Birnen und Kirschen', 'Kirschen', -10)).toBe(18);
    expect(Str.position('@%€/=!"][$', '$', 0)).toBe(9);
    expect(Str.position('Hello, World!', 'w', 0)).toBe(false);
    expect(Str.position('Hello, World!', 'X', 0)).toBe(false);
    expect(Str.position('', 'test')).toBe(false);
    expect(Str.position('Hello, World!', 'X')).toBe(false);
});

test('random', () => {
    expect(Str.random().length).toBe(16);

    const randomInteger = Math.floor(Math.random() * 100) + 1;

    expect(Str.random(randomInteger).length).toBe(randomInteger);
    expect(typeof Str.random()).toBe('string');
});

test('whether the number of generated characters is equally distributed', () => {
    const results: { [key: string]: string } = {};

    for (let i = 0; i < 620000; i++) {
        const random = Str.random(1);

        results[random] = (results[random] ?? 0) + 1;
    }

    for (const count of Object.values(results)) {
        expect(count).toBeGreaterThanOrEqual(9500);
        expect(count).toBeLessThanOrEqual(10500);
    }
});

test('randomStringFactory', () => {
    Str.createRandomStringsUsing((length) => `length:${length}`);

    expect(Str.random(7)).toBe('length:7');
    expect(Str.random(7)).toBe('length:7');

    Str.createRandomStringsNormally();

    expect(Str.random()).not.toBe('length:7');
});

test('remove', () => {
    expect(Str.remove('o', 'Foobar')).toBe('Fbar');
    expect(Str.remove('bar', 'Foobar')).toBe('Foo');
    expect(Str.remove('F', 'Foobar')).toBe('oobar');
    expect(Str.remove('f', 'Foobar')).toBe('Foobar');
    expect(Str.remove('f', 'Foobar', false)).toBe('oobar');
    expect(Str.remove(['o', 'a'], 'Foobar')).toBe('Fbr');
    expect(Str.remove(['f', 'b'], 'Foobar')).toBe('Fooar');
    expect(Str.remove(['f', 'b'], 'Foobar', false)).toBe('ooar');
    expect(Str.remove(['f', '|'], 'Foo|bar')).toBe('Foobar');
});

test('repeat', () => {
    expect(Str.repeat('Hello', 0)).toBe('');
    expect(Str.repeat('Hello', 1)).toBe('Hello');
    expect(Str.repeat('a', 5)).toBe('aaaaa');
    expect(Str.repeat('', 5)).toBe('');
});

test('replace', () => {
    expect(Str.replace('baz', 'laravel', 'foo bar baz')).toBe('foo bar laravel');
    expect(Str.replace('baz', 'laravel', 'foo bar Baz', false)).toBe('foo bar laravel');
    expect(Str.replace('?', '8.x', 'foo bar baz ?')).toBe('foo bar baz 8.x');
    expect(Str.replace('x', '8.x', 'foo bar baz X', false)).toBe('foo bar baz 8.x');
    expect(Str.replace(' ', '/', 'foo bar baz')).toBe('foo/bar/baz');
    expect(Str.replace(['?1', '?2', '?3'], ['foo', 'bar', 'baz'], '?1 ?2 ?3')).toBe('foo bar baz');
    expect(Str.replace(['?1', '?2', '?3'], ['foo', 'bar', 'baz'], ['?1', '?2', '?3'])).toEqual(['foo', 'bar', 'baz']);
});

test('replaceArray', () => {
    expect(Str.replaceArray('?', ['foo', 'bar', 'baz'], '?/?/?')).toBe('foo/bar/baz');
    expect(Str.replaceArray('?', ['foo', 'bar', 'baz'], '?/?/?/?')).toBe('foo/bar/baz/?');
    expect(Str.replaceArray('?', ['foo', 'bar', 'baz'], '?/?')).toBe('foo/bar');
    expect(Str.replaceArray('x', ['foo', 'bar', 'baz'], '?/?/?')).toBe('?/?/?');
    expect(Str.replaceArray('?', ['foo?', 'bar', 'baz'], '?/?/?')).toBe('foo?/bar/baz');
    expect(Str.replaceArray('?', [1, 2].map((i) => ['foo', 'bar'][i - 1]).filter(Boolean), '?/?')).toBe('foo/bar');
    expect(Str.replaceArray('?', ['foo', 'bar'], '?/?')).toBe('foo/bar');
});

test('replaceEnd', () => {
    expect(Str.replaceEnd('bar', 'qux', 'foobar foobar')).toBe('foobar fooqux');
    expect(Str.replaceEnd('bar?', 'qux?', 'foo/bar? foo/bar?')).toBe('foo/bar? foo/qux?');
    expect(Str.replaceEnd('bar', '', 'foobar foobar')).toBe('foobar foo');
    expect(Str.replaceEnd('xxx', 'yyy', 'foobar foobar')).toBe('foobar foobar');
    expect(Str.replaceEnd('', 'yyy', 'foobar foobar')).toBe('foobar foobar');
    expect(Str.replaceEnd('xxx', 'yyy', 'fooxxx foobar')).toBe('fooxxx foobar');

    // Test for multibyte string support.
    expect(Str.replaceEnd('ö', 'xxx', 'Malmö Jönköping')).toBe('Malmö Jönköping');
    expect(Str.replaceEnd('öping', 'yyy', 'Malmö Jönköping')).toBe('Malmö Jönkyyy');
});

test('replaceFirst', () => {
    expect(Str.replaceFirst('bar', 'qux', 'foobar foobar')).toBe('fooqux foobar');
    expect(Str.replaceFirst('bar?', 'qux?', 'foo/bar? foo/bar?')).toBe('foo/qux? foo/bar?');
    expect(Str.replaceFirst('bar', '', 'foobar foobar')).toBe('foo foobar');
    expect(Str.replaceFirst('xxx', 'yyy', 'foobar foobar')).toBe('foobar foobar');
    expect(Str.replaceFirst('', 'yyy', 'foobar foobar')).toBe('foobar foobar');
    expect(Str.replaceFirst('0', '1', '0')).toBe('1');

    // Test for multibyte string support.
    expect(Str.replaceFirst('ö', 'xxx', 'Jönköping Malmö')).toBe('Jxxxnköping Malmö');
    expect(Str.replaceFirst('', 'yyy', 'Jönköping Malmö')).toBe('Jönköping Malmö');
});

test('replaceLast', () => {
    expect(Str.replaceLast('bar', 'qux', 'foobar foobar')).toBe('foobar fooqux');
    expect(Str.replaceLast('bar?', 'qux?', 'foo/bar? foo/bar?')).toBe('foo/bar? foo/qux?');
    expect(Str.replaceLast('bar', '', 'foobar foobar')).toBe('foobar foo');
    expect(Str.replaceLast('xxx', 'yyy', 'foobar foobar')).toBe('foobar foobar');
    expect(Str.replaceLast('', 'yyy', 'foobar foobar')).toBe('foobar foobar');

    // Test for multibyte string support.
    expect(Str.replaceLast('ö', 'xxx', 'Malmö Jönköping')).toBe('Malmö Jönkxxxping');
    expect(Str.replaceLast('', 'yyy', 'Malmö Jönköping')).toBe('Malmö Jönköping');
});

test('replaceMatches', () => {
    expect(Str.replaceMatches('/baz/', 'bar', 'foo baz bar')).toBe('foo bar bar');
    expect(Str.replaceMatches('/404/', 'found', 'foo baz baz')).toBe('foo baz baz');
    expect(Str.replaceMatches(['/bar/', '/baz/'], ['XXX', 'YYY'], 'foo bar baz')).toBe('foo XXX YYY');

    let result = Str.replaceMatches('/ba(.)/', (match) => 'ba' + match[1].toUpperCase(), 'foo baz bar');

    expect(result).toBe('foo baZ baR');

    result = Str.replaceMatches('/(\\d+)/', (match) => String(Number(match[1]) * 2), 'foo 123 bar 456');

    expect(result).toBe('foo 246 bar 912');
    expect(Str.replaceMatches('/ba(.)/', 'ba$1', 'foo baz baz', 1)).toBe('foo baz baz');

    result = Str.replaceMatches('/ba(.)/', (match) => 'ba' + match[1].toUpperCase(), 'foo baz baz bar', 1);

    expect(result).toBe('foo baZ baz bar');
});

test('replaceStart', () => {
    expect(Str.replaceStart('bar', 'qux', 'foobar foobar')).toBe('foobar foobar');
    expect(Str.replaceStart('bar?', 'qux?', 'foo/bar? foo/bar?')).toBe('foo/bar? foo/bar?');
    expect(Str.replaceStart('foo', 'qux', 'foobar foobar')).toBe('quxbar foobar');
    expect(Str.replaceStart('foo/bar?', 'qux?', 'foo/bar? foo/bar?')).toBe('qux? foo/bar?');
    expect(Str.replaceStart('foo', '', 'foobar foobar')).toBe('bar foobar');

    // Test for multibyte string support.
    expect(Str.replaceStart('Jö', 'xxx', 'Jönköping Malmö')).toBe('xxxnköping Malmö');
    expect(Str.replaceStart('', 'yyy', 'Jönköping Malmö')).toBe('Jönköping Malmö');
});

test('reverse', () => {
    expect(Str.reverse('raBooF')).toBe('FooBar');
    expect(Str.reverse('őtüzsineT')).toBe('Teniszütő');
    expect(Str.reverse('☆etyBitluM❤')).toBe('❤MultiByte☆');
});

test('rtrim', () => {
    const escape = (s: string) => s.replace(/[-\\^]/g, '\\$&');

    const rtrimDefaultChars = [' ', '\n', '\r', '\t', '\v'];
    const rtrimDefaultClass = rtrimDefaultChars.map(escape).join('');
    const defaultRtrimRegex = new RegExp(`[${rtrimDefaultClass}]+$`);

    expect(Str.rtrim(' foo    bar ')).toBe(' foo    bar');
    expect(Str.rtrim('   123    ')).toBe('   123');
    expect(Str.rtrim('だ')).toBe('だ');
    expect(Str.rtrim('ム')).toBe('ム');
    expect(Str.rtrim('   だ    ')).toBe('   だ');
    expect(Str.rtrim('   ム    ')).toBe('   ム');
    expect(
        Str.rtrim(`
                foo bar
            `),
    ).toBe(`
                foo bar`);

    expect(Str.rtrim(' \xE9 ')).toBe(' \xE9');

    for (const char of rtrimDefaultChars) {
        const testStr = ` ${char} `;

        expect(Str.rtrim(testStr)).toBe(testStr.replace(defaultRtrimRegex, ''));

        const padded = `${char} foo bar ${char}`;

        expect(Str.rtrim(padded)).toBe(padded.replace(defaultRtrimRegex, ''));
    }
});

test('snake', () => {
    expect(Str.snake('LaravelPHPFramework')).toBe('laravel_p_h_p_framework');
    expect(Str.snake('LaravelPhpFramework')).toBe('laravel_php_framework');
    expect(Str.snake('LaravelPhpFramework', ' ')).toBe('laravel php framework');
    expect(Str.snake('Laravel Php Framework')).toBe('laravel_php_framework');
    expect(Str.snake('Laravel    Php      Framework   ')).toBe('laravel_php_framework');
    expect(Str.snake('LaravelPhpFramework', '__')).toBe('laravel__php__framework');
    expect(Str.snake('LaravelPhpFramework_', '_')).toBe('laravel_php_framework_');
    expect(Str.snake('laravel php Framework')).toBe('laravel_php_framework');
    expect(Str.snake('laravel php FrameWork')).toBe('laravel_php_frame_work');
    expect(Str.snake('foo-bar')).toBe('foo-bar');
    expect(Str.snake('Foo-Bar')).toBe('foo-_bar');
    expect(Str.snake('Foo_Bar')).toBe('foo__bar');
    expect(Str.snake('ŻółtaŁódka')).toBe('żółtałódka');
});

test('squish', () => {
    expect(Str.squish(' laravel   php  framework ')).toBe('laravel php framework');
    expect(Str.squish('laravel\t\tphp\n\nframework')).toBe('laravel php framework');
    expect(
        Str.squish(`
            laravel
            php
            framework
        `),
    ).toBe('laravel php framework');
    expect(Str.squish('   laravel   php   framework   ')).toBe('laravel php framework');
    expect(Str.squish('   123    ')).toBe('123');
    expect(Str.squish('だ')).toBe('だ');
    expect(Str.squish('ム')).toBe('ム');
    expect(Str.squish('   だ    ')).toBe('だ');
    expect(Str.squish('   ム    ')).toBe('ム');
    expect(Str.squish('laravelㅤㅤㅤphpㅤframework')).toBe('laravel php framework');
    expect(Str.squish('laravelᅠᅠᅠᅠᅠᅠᅠᅠᅠᅠphpᅠᅠframework')).toBe('laravel php framework');
});

test('start', () => {
    expect(Str.start('test/string', '/')).toBe('/test/string');
    expect(Str.start('/test/string', '/')).toBe('/test/string');
    expect(Str.start('//test/string', '/')).toBe('/test/string');
});

test('startsWith', () => {
    expect(Str.startsWith('jason', 'jas')).toBe(true);
    expect(Str.startsWith('jason', 'jason')).toBe(true);
    expect(Str.startsWith('jason', ['jas'])).toBe(true);
    expect(Str.startsWith('jason', ['day', 'jas'])).toBe(true);
    expect(Str.startsWith('jason', 'day')).toBe(false);
    expect(Str.startsWith('jason', ['day'])).toBe(false);
    expect(Str.startsWith('jason', 'J')).toBe(false);
    expect(Str.startsWith('jason', '')).toBe(false);
    expect(Str.startsWith('', '')).toBe(false);
    expect(Str.startsWith('7', ' 7')).toBe(false);
    expect(Str.startsWith('7a', '7')).toBe(true);
    expect(Str.startsWith('Jönköping', 'Jö')).toBe(true);
    expect(Str.startsWith('Malmö', 'Malmö')).toBe(true);
    expect(Str.startsWith('Jönköping', 'Jonko')).toBe(false);
    expect(Str.startsWith('Malmö', 'Malmo')).toBe(false);
    expect(Str.startsWith('你好', '你')).toBe(true);
    expect(Str.startsWith('你好', '好')).toBe(false);
    expect(Str.startsWith('你好', 'a')).toBe(false);
});

test('studly', () => {
    expect(Str.studly('laravel_p_h_p_framework')).toBe('LaravelPHPFramework');
    expect(Str.studly('laravel_php_framework')).toBe('LaravelPhpFramework');
    expect(Str.studly('laravel-phP-framework')).toBe('LaravelPhPFramework');
    expect(Str.studly('laravel  -_-  php   -_-   framework   ')).toBe('LaravelPhpFramework');
    expect(Str.studly('fooBar')).toBe('FooBar');
    expect(Str.studly('foo_bar')).toBe('FooBar');

    // Test cache.
    expect(Str.studly('foo_bar')).toBe('FooBar');
    expect(Str.studly('foo-barBaz')).toBe('FooBarBaz');
    expect(Str.studly('foo-bar_baz')).toBe('FooBarBaz');

    expect(Str.studly('öffentliche-überraschungen')).toBe('ÖffentlicheÜberraschungen');
});

test('substr', () => {
    expect(Str.substr('БГДЖИЛЁ', -1)).toBe('Ё');
    expect(Str.substr('БГДЖИЛЁ', -2)).toBe('ЛЁ');
    expect(Str.substr('БГДЖИЛЁ', -3, 1)).toBe('И');
    expect(Str.substr('БГДЖИЛЁ', 2, -1)).toBe('ДЖИЛ');
    expect(Str.substr('БГДЖИЛЁ', 4, -4)).toBe('');
    expect(Str.substr('БГДЖИЛЁ', -3, -1)).toBe('ИЛ');
    expect(Str.substr('БГДЖИЛЁ', 1)).toBe('ГДЖИЛЁ');
    expect(Str.substr('БГДЖИЛЁ', 1, 3)).toBe('ГДЖ');
    expect(Str.substr('БГДЖИЛЁ', 0, 4)).toBe('БГДЖ');
    expect(Str.substr('БГДЖИЛЁ', -1, 1)).toBe('Ё');
    expect(Str.substr('Б', 2)).toBe('');
});

test('substrCount', () => {
    expect(Str.substrCount('laravelPHPFramework', 'a')).toBe(3);
    expect(Str.substrCount('laravelPHPFramework', 'z')).toBe(0);
    expect(Str.substrCount('laravelPHPFramework', 'l', 2)).toBe(1);
    expect(Str.substrCount('laravelPHPFramework', 'z', 2)).toBe(0);
    expect(Str.substrCount('laravelPHPFramework', 'k', -1)).toBe(1);
    expect(Str.substrCount('laravelPHPFramework', 'a', 1, 2)).toBe(1);
    expect(Str.substrCount('laravelPHPFramework', 'a', 1, -2)).toBe(3);
    expect(Str.substrCount('laravelPHPFramework', 'a', -10, -3)).toBe(1);
});

test('substrReplace', () => {
    expect(Str.substrReplace('1200', ':', 2, 0)).toBe('12:00');
    expect(Str.substrReplace('The Framework', 'Laravel ', 4, 0)).toBe('The Laravel Framework');
    expect(Str.substrReplace('Laravel Framework', '– The PHP Framework for Web Artisans', 8)).toBe(
        'Laravel – The PHP Framework for Web Artisans',
    );
});

test('swap', () => {
    expect(Str.swap({ PHP: 'PHP 8', awesome: 'fantastic' }, 'PHP is awesome')).toBe('PHP 8 is fantastic');
    expect(Str.swap({ 'ⓐⓑ': 'baz' }, 'foo bar ⓐⓑ')).toBe('foo bar baz');
});

test('take', () => {
    expect(Str.take('abcdef', 2)).toBe('ab');
    expect(Str.take('abcdef', -2)).toBe('ef');
    expect(Str.take('abcdef', 0)).toBe('');
    expect(Str.take('', 2)).toBe('');
    expect(Str.take('abcdef', 10)).toBe('abcdef');
    expect(Str.take('abcdef', 6)).toBe('abcdef');
    expect(Str.take('üöä', 1)).toBe('ü');
});

test('title', () => {
    expect(Str.title('jefferson costella')).toBe('Jefferson Costella');
    expect(Str.title('jefFErson coSTella')).toBe('Jefferson Costella');
    expect(Str.title('')).toBe('');
    expect(Str.title('123 laravel')).toBe('123 Laravel');
    expect(Str.title('❤laravel')).toBe('❤Laravel');
    expect(Str.title('laravel ❤')).toBe('Laravel ❤');
    expect(Str.title('laravel123')).toBe('Laravel123');
    expect(Str.title('Laravel123')).toBe('Laravel123');

    const longString = 'lorem ipsum ' + 'dolor sit amet '.repeat(1000);
    const expectedResult = 'Lorem Ipsum ' + 'Dolor Sit Amet '.repeat(1000);

    expect(Str.title(longString)).toBe(expectedResult);
});

test('toBase64', () => {
    expect(Str.toBase64('foo')).toBe(base64_encode('foo'));
    expect(Str.toBase64('foobar')).toBe(base64_encode('foobar'));
});

test('trim', () => {
    expect(Str.trim('   foo bar   ')).toBe('foo bar');
    expect(Str.trim('foo bar   ')).toBe('foo bar');
    expect(Str.trim('   foo bar')).toBe('foo bar');
    expect(Str.trim('foo bar')).toBe('foo bar');
    expect(Str.trim(' foo bar ', '')).toBe(' foo bar ');
    expect(Str.trim(' foo bar ', ' ')).toBe('foo bar');
    expect(Str.trim('-foo  bar_', '-_')).toBe('foo  bar');
    expect(Str.trim(' foo    bar ')).toBe('foo    bar');
    expect(Str.trim('   123    ')).toBe('123');
    expect(Str.trim('だ')).toBe('だ');
    expect(Str.trim('ム')).toBe('ム');
    expect(Str.trim('   だ    ')).toBe('だ');
    expect(Str.trim('   ム    ')).toBe('ム');
    expect(
        Str.trim(`
                foo bar
            `),
    ).toBe('foo bar');

    expect(
        Str.trim(`
                foo
                bar
            `),
    ).toBe(`foo
                bar`);

    expect(Str.trim(' \xE9 ')).toBe('\xE9');

    const trimDefaultChars = [' ', '\n', '\r', '\t', '\v'];

    for (const char of trimDefaultChars) {
        expect(Str.trim(` ${char} `)).toBe('');
        expect(Str.trim(` ${char} `)).toBe(` ${char} `.trim());
        expect(Str.trim(`${char} foo bar ${char}`)).toBe('foo bar');
        expect(Str.trim(`${char} foo bar ${char}`)).toBe(`${char} foo bar ${char}`.trim());
    }
});

test('ucfirst', () => {
    expect(Str.ucfirst('laravel')).toBe('Laravel');
    expect(Str.ucfirst('laravel framework')).toBe('Laravel framework');
    expect(Str.ucfirst('мама')).toBe('Мама');
    expect(Str.ucfirst('мама мыла раму')).toBe('Мама мыла раму');
});

test('ucsplit', () => {
    expect(Str.ucsplit('Laravel_p_h_p_framework')).toEqual(['Laravel_p_h_p_framework']);
    expect(Str.ucsplit('Laravel_P_h_p_framework')).toEqual(['Laravel_', 'P_h_p_framework']);
    expect(Str.ucsplit('laravelPHPFramework')).toEqual(['laravel', 'P', 'H', 'P', 'Framework']);
    expect(Str.ucsplit('Laravel-phP-framework')).toEqual(['Laravel-ph', 'P-framework']);
    expect(Str.ucsplit('ŻółtaŁódka')).toEqual(['Żółta', 'Łódka']);
    expect(Str.ucsplit('sindÖdeUndSo')).toEqual(['sind', 'Öde', 'Und', 'So']);
    expect(Str.ucsplit('ÖffentlicheÜberraschungen')).toEqual(['Öffentliche', 'Überraschungen']);
});

test('unwrap', () => {
    expect(Str.unwrap('"value"', '"')).toBe('value');
    expect(Str.unwrap('"value', '"')).toBe('value');
    expect(Str.unwrap('value"', '"')).toBe('value');
    expect(Str.unwrap('foo-bar-baz', 'foo-', '-baz')).toBe('bar');
    expect(Str.unwrap('{"some": "json"}', '{', '}')).toBe('"some": "json"');
});

test('upper', () => {
    expect(Str.upper('foo bar baz')).toBe('FOO BAR BAZ');
    expect(Str.upper('foO bAr BaZ')).toBe('FOO BAR BAZ');
});

test('wordCount', () => {
    expect(Str.wordCount('Hello, world!')).toBe(2);
    expect(Str.wordCount('Hi, this is my first contribution to the Laravel framework.')).toBe(10);
    expect(Str.wordCount('мама')).toBe(0);
    expect(Str.wordCount('мама мыла раму')).toBe(0);

    const russian = 'абвгдеёжзийклмнопрстуфхцчшщъыьэюяАБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ';

    expect(Str.wordCount('мама', russian)).toBe(1);
    expect(Str.wordCount('мама мыла раму', russian)).toBe(3);
    expect(Str.wordCount('МАМА', russian)).toBe(1);
    expect(Str.wordCount('МАМА МЫЛА РАМУ', russian)).toBe(3);
});

test('wordWrap', () => {
    expect(Str.wordWrap('Hello World', 3, '<br />')).toBe('Hello<br />World');
    expect(Str.wordWrap('Hello World', 3, '<br />', true)).toBe('Hel<br />lo<br />Wor<br />ld');
    expect(Str.wordWrap('❤Multi Byte☆❤☆❤☆❤', 3, '<br />')).toBe('❤Multi<br />Byte☆❤☆❤☆❤');
});

test('words', () => {
    expect(Str.words('Taylor Otwell', 1)).toBe('Taylor...');
    expect(Str.words('Taylor Otwell', 1, '___')).toBe('Taylor___');
    expect(Str.words('Taylor Otwell', 3)).toBe('Taylor Otwell');
    expect(Str.words('Taylor Otwell', -1, '...')).toBe('Taylor Otwell');
    expect(Str.words('', 3, '...')).toBe('');
    expect(Str.words('这是 段中文', 1)).toBe('这是...');
    expect(Str.words('这是 段中文', 1, '___')).toBe('这是___');
    expect(Str.words('这是-段中文', 3, '___')).toBe('这是-段中文');
    expect(Str.words('这是     段中文', 1, '___')).toBe('这是___');
    expect(Str.words(' Taylor Otwell ', 3)).toBe(' Taylor Otwell ');
    expect(Str.words(' Taylor Otwell ', 1)).toBe(' Taylor...');

    const nbsp = '\u00A0';

    expect(Str.words(' ')).toBe(' ');
    expect(Str.words(nbsp)).toBe(nbsp);
    expect(Str.words('   ')).toBe('   ');
    expect(Str.words('\t\t\t')).toBe('\t\t\t');
});

test('wrap', () => {
    expect(Str.wrap('value', '"')).toBe('"value"');
    expect(Str.wrap('-bar-', 'foo', 'baz')).toBe('foo-bar-baz');
});

test('str', () => {
    const string = new Stringable('foo');

    expect(str(string.toString())).toBeInstanceOf(Stringable);
    expect(str('foo').toString()).toBe(string.toString());
});
