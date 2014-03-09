window.App = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    this.router = new this.Routers.Main();
    Backbone.history.start({
      pushState: true
    });

    App.autocompleter = new Autocompleter();
    var ws = new WebSocket('ws://' + window.location.host + window.location.pathname);
    ws.onmessage = function(m) {
      App.autocompleter.add(m.data);
    };
  }
};

App.Routers.Main = Backbone.Router.extend({
  routes: {
    "(/)": "index",

  },


  index: function() {
    $(function() {
      $('#query').on('input', function() {
        App.showUpdate();
      });
    });
    setInterval(function() {
      App.showUpdate();
    }, 300);
  }
});

App.showUpdate = function() {
  $('#query').on('input', function() {
    var query = $('#query').val();
    $('#results').empty();
    resulting_array = App.autocompleter.complete(query);
    _.each(resulting_array, function(item) {

      $('#results').append('<li>' + item + '</li>');

    });
  });
};



$(function() {
  App.initialize();
});