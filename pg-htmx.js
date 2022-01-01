$(function () {
    $('body').one('pinegrow-ready', function (e, pinegrow) {
      let type_prefix = 'pg-htmx';
  
      var framework = new PgFramework(type_prefix, 'HTMXforPG');
  
      framework.type = 'htmx';
      framework.allow_single_type = true;
  
      framework.description = 'This framework adds support for the HTMX library to Pinegrow.';
      framework.author = "'Bo' @ springhilldesign.net";
      framework.author_link = 'https://plugins.springhilldesign.net';
  
      framework.has_actions = true;
  
      pinegrow.addFramework(framework);
  
      //Uncomment the line below to get the inspector window to automatically open
      require('nw.gui').Window.get().showDevTools();
    });
});