var io = require('socket.io')

module.exports = function SocketFactory() {
  var socket = io.connect()

  socket.scoped = function($scope) {
    var listeners = []

    $scope.$on('$destroy', function() {
      listeners.forEach(function(listener) {
        socket.removeListener(listener.event, listener.handler)
      })
    })

    return {
      on: function(event, handler) {
        listeners.push({
          event: event
        , handler: handler
        })
        socket.on(event, handler)
        return this
      }
    }
  }

  return socket
}
