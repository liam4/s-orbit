/* jshint ignore:start */
'use strict'

window.Sorbit = (function Sorbit(name) {
  'use strict'

  let ext = {
    name: name,
    _shutdown: function() {},
    status: { light: 'Green', msg: 'Ready'},
    _getStatus: function() {
      let light = ext.status.light

      switch(light.toLowerCase()) {
        case 'red':
        case 'err':
          light = 0
        break

        case 'yellow':
        case 'amber':
        case 'orange':
        case 'warn':
          light = 1
        break

        case 'green':
        case 'ok':
          light = 2
        break
      }

      return { status: light, msg: ext.status.msg }
    },

    descriptor: {
      blocks: [], menus: {}
    }
  }

  // generic block-adder
  const addBlock = function(type, block, defaults, callback) {
    // generate a *unique* identifier for this block
    let uniqName = 'block_' + block.replace(' ', '_')
    while(ext[uniqName]) uniqName += '_'

    // create block descriptor
    let blockDesc = [
      type,
      block,
      uniqName
    ]

    // add argument defaults to block descriptor
    defaults.forEach(function(k) {
      blockDesc.push(k)
    })

    // add block to descriptor
    ext.descriptor.blocks.push(blockDesc)

    // add block callback
    ext[uniqName] = callback
  }
 
  // returns a function that helps with creating a block
  let makeBlockFunction = function(fn) {
    return function() {
      let args = Array.prototype.slice.call(arguments)
      let block = {}

      if(args[0] instanceof Object) {
        block = args[0]
        if(!(block.defaults instanceof Array)) block.defaults = [block.defaults]
      } else {
        block.name     = args[0],
        block.defaults = args.slice(1, args.length - 1) || [],
        block.code     = args[args.length - 1]
      }
  
      return fn(block)
    }
  }

  // chainable methods
  let chain = {
    block: {
      stack: makeBlockFunction(function(block) {
        addBlock(' ', block.name, block.defaults, block.code)
        return chain
      }),

      hat: makeBlockFunction(function(block) {
        addBlock('h', block.name, block.defaults, block.code)
        return chain
      }),

      reporter: makeBlockFunction(function(block) {
        addBlock('r', block.name, block.defaults, block.code)
        return chain
      })
    },

    menu: {

    },
  
    url: function(url) {
      ext.descriptor.url = url.toString()
      return chain
    },

    status: function(status) {
      ext.status = status
      return chain
    },

    shutdown: function(fn) {
      ext._shutdown = fn
      return chain
    },

    inject: function() {
      ScratchExtensions.unregister(ext.name)
      ScratchExtensions.register(ext.name, ext.descriptor, ext)

      console.log('Loaded SOrbit extension:', ext)

      chain.injected = true
      return chain
    },

    injected: false
  }

  // aliases
  chain.reload        = chain.inject
  chain.block.command = chain.block.stack
  chain.block.event   = chain.block.hat
  chain.block.bool    = chain.block.reporter

  return chain
})

/* jshint ignore:end */