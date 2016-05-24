SOrbit('My SOrbit Extension', function(ext) {
  ext.addBlock({
    name: 'alert %s',
    type: ' ',
    code: function(s) {
      window.alert(s)
    },
    defaults: 'Hello, World!'
  })

  ext.register()
})