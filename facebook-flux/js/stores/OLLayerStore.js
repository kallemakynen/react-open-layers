var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var AppConstants = require('../constants/AppConstants');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var _features = {};

function create() {
  // Hand waving here -- not showing how this interacts with XHR or persistent
  // server-side storage.
  // Using the current timestamp + random number in place of a real id.
  var id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
  _features[id] = {
    id: id,
    position: Math.floor((Math.random() * 3)),
    x: 14975000 + (Math.floor((Math.random() * 10)) - 5) * 400000,
    y: 4268330 + (Math.floor((Math.random() * 6) - 3) * 400000)
  };
}

function destroy(id) {
  console.log("id", id)
  delete _features[id];
}

var OLLayerStore = assign({}, EventEmitter.prototype, {
  getAll: function() {
    return _features;
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  }
});

AppDispatcher.register(function(action) {

  switch(action.actionType) {
    case AppConstants.CREATE:
      create();
      OLLayerStore.emitChange();
      break;

    case AppConstants.DESTROY:
      destroy(action.id);
      OLLayerStore.emitChange();
      break;

    default:
  }
});

module.exports = OLLayerStore;
