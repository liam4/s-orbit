'use strict'

Sorbit('Sorbit Example')
  .block.stack(           // add stack block
    'alert %s',           // name of block
    'Hello!',             // any default parameters

    function(something) { // callback
      alert(something)    // ...
    }                     // ...
  )
.inject()