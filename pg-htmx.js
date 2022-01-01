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

        //Adds a menu item for adding the HTMX script
        framework.on_page_menu = (page, items) => {
            items.push({
                type: 'divider'
            });

            items.push({
                type: 'header',
                label: 'HTMX'
            });

            items.push({
                label: 'Add HTMX script',
                action: function () {
                    addHTMXScript();
                }
            });

            items.push({
                type: 'divider'
            })
        };

        //Function to add HTMX script - ommited version so should load latest
        let addHTMXScript = () => {
            let thePage = pinegrow.getSelectedPage();
            thePage.addScript('https://unpkg.com/htmx.org', true, false, false);
        }
    });

});