# solace [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url] [![Coverage percentage][coveralls-image]][coveralls-url]
> Alternative to the console log which automatically beautifies the output

## Installation

```sh
$ npm install --save solace
```

## Usage

```js
import solaceCreator from 'solace';

const solace = solaceCreator({
  standardOut: process.stdout,
  standardErr: process.stderr,
  defaultTheme: 'beautiful'
});

const value = {
  a: 12
  b: ['jan', 'feb', 'mar'],
  c: true,
  d: new Date()
};

solace.log('Some data nicely arranged:');
solace.log(value, {title: 'title', theme: 'outline'});

```

### Themes

* machine: Format the output in a compact manner easily readable by a machine.
* beautiful: Format the output in a beautiful manner.
* outline: Format the output with the main outlines.


## License

MIT © [flarebyte](https://github.com/flarebyte)


[npm-image]: https://badge.fury.io/js/solace.svg
[npm-url]: https://npmjs.org/package/solace
[travis-image]: https://travis-ci.org/flarebyte/solace.svg?branch=master
[travis-url]: https://travis-ci.org/flarebyte/solace
[daviddm-image]: https://david-dm.org/flarebyte/solace.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/flarebyte/solace
[coveralls-image]: https://coveralls.io/repos/flarebyte/solace/badge.svg?branch=master&service=githubs
[coveralls-url]: https://coveralls.io/github/flarebyte/solace?branch=master
