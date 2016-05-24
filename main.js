window.SOrbit = function(name, code) {
  let ext = {
    _shutdown() { },
    _getStatus() {
      return { status: 2, msg: 'Ready' }
    },
    name: name,
    descriptor: { blocks: [], menus: {} },
    register() {
      ScratchExtensions.register(this.name, this.descriptor, this)
    },
    removeDuplicates() {
      
    },

    addBlock(block) {
      if(!(block.type && block.name && block.code)) 
        throw 'Cannot call addBlock with unspecified type, name or code attributes.'
      this[block.name] = block.code
      block.defaults = block.defaults || []
      block.defaults = block.defaults instanceof Array ? block.defaults : [block.defaults]
      this.descriptor.blocks.push(
        [block.type, block.name, block.name, ...block.defaults]
      )
    },
    addBlocks(blocks) {
      blocks.forEach(addBlock)
    }
  }
  return code.call(ext, ext) // Allow using both `this` and the first arg as the extension object.
}