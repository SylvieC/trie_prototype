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
    var keepShowing = setInterval(function() {
      $('#query').on('input', function() {
        var query = $('#query').val();
        if (query.length === 0) {
          $('#results').empty();
        } else {
          resulting_array = App.autocompleter.complete(query);
          _.each(resulting_array, function(item) {

            $('#results').append('<li>' + item + '</li>');

          });
        }
      });
    }, 500);
  }
});



$(function() {
  App.initialize();
});