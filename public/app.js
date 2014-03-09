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
      autocompleter.add(m.data);
    };

  }
};

App.Routers.Main = Backbone.Router.extend({
  routes: {
    "(/)": "index",

  },

  index: function() {
    $('#query').on('input', function() {
      var query = $('#query').val();
      //   if (query.length === 0) {
      //     $('#results').empty();
      //   } else {
      //     $.each(App.autocompleter.complete(query), function(index, item) {
      //       $('#results').append(view.render().el);
      //     });
      //   }

    });
  }

});

$(document).ready(function() {
  App.initialize();
  this.html.render(this);
});