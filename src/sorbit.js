/* jshint ignore:start */

window.Sorbit = (function Sorbit(name) {
  'use strict'

  let ext = {
    name: name,
    _shutdown: function() {},
    status: ['Green', 'Ready'],
    _getStatus: function() {
      let status = ext.status
      let light = status[0]

      switch(status[0].toLowerCase()) {
        case 'red':
          light = 0
        break

        case 'err':
          light = 0
        break

        case 'yellow':
          light = 1
        break

        case 'amber':
          light = 1
        break

        case 'orange':
          light = 1
        break

        case 'warn':
          light = 1
        break

        case 'green':
          light = 2
        break

        case 'ok':
          light = 2
        break
      }

      return { status: light, msg: status[1] }
    },

    descriptor: {
      blocks: [],
      menus: {}
    }
  }

  // generic block-adder
  const addBlock = function(type, block, defaults, callback) {
    // generate a *unique* identifier for this block
    let uniqName = 'block_' + block.replace(' ', '_')
    while(ext[uniqName]) uniqName += '_'

    // create block descrip'Hello!'tor
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

  // chainable methods
  let chain = {
    block: {
      stack: function(name) {
        let args = [].splice.call(arguments, 1)
        let callback = args.pop()

        addBlock(' ', name, args, callback)

        return chain
      },

      hat: function(name) {
        let args = [].splice.call(arguments, 1)
        let callback = args.pop()

        addBlock('h', name, args, callback)

        return chain
      },

      reporter: function(name) {
        let args = [].splice.call(arguments, 1)
        let callback = args.pop()

        addBlock('r', name, args, callback)

        return chain
      },

      hat: function(name) {
        let args = [].splice.call(arguments, 1)
        let callback = args.pop()

        addBlock('h', name, args, callback)

        return chain
      }
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

      console.log(ext)

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