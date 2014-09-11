require.config({
    paths: {
      moment: '//cdnjs.cloudflare.com/ajax/libs/moment.js/2.8.2/moment.min.js',
      handlebars: '//cdnjs.cloudflare.com/ajax/libs/handlebars.js/2.0.0-alpha.4/handlebars.amd.min.js'
    },
    config: {
        moment: {
            noGlobal: true
        }
    }
});

require(['handlebars', 'moment'], function (handlebars, moment) {
  console.log("Got dependencies:");
  console.log(handlebars.compile);
  console.log(moment);
});