# Sorbit
> An easy, chainable api for creation of Scratch extenions.
[![Join the chat at https://gitter.im/kvackkvack/s-orbit](https://badges.gitter.im/kvackkvack/s-orbit.svg)](https://gitter.im/kvackkvack/s-orbit?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)  

Sorbit - *Scratch Orbit* - is a **chainable api for easier creation of [Scratch](https://scratch.mit.edu) extensions**. It is currently being developed by [kvackkvack](https://github.com/kvackkvack) and [nanalan](https://github.com/nanalan) but we welcome anyone to help either in the [Gitter room](https://gitter.im/kvackkvack/s-orbit) or by [creating an issue](https://github.com/kvackkvack/s-orbit/issues/new).

## Examples
```js
Sorbit('Sorbit Example')
  .block.stack(           // add stack block
    'alert %s',           // name of block
    'Hello!',             // any default parameters

    function(something) { // callback
      alert(something)    // ...
    }                     // ...
  )
.inject()
```