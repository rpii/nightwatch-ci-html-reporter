let fs = require('fs');
let path = require('path');
let handlebars = require('handlebars');
let open = require('opn');
let defaults = require('defaults');
filenameHelpers = require('./outputFilename');
RelativePath = require('./RelativePath');

module.exports = function(opts) {
    const options = defaults(opts, {
        "themeName" : "default",
        "debug" : false,
        "openBrowser" : false,
        "reportsDirectory" : "test_output",
        "reportFilename": "report",
        "reportFilenamePrefix" : "",
        "customTheme" : null,
        "uniqueFilename" : true,
        "reportTitle" : ""
    }) ;

    this.fn  = function(results, done) {
        options.fullOutputFilename = filenameHelpers.getOutputFilename(options);
        options.themeFile = options.customTheme
            ? path.join(process.cwd(), opts.customTheme)
            : path.join(__dirname, 'themes', opts.themeName, '/html-reporter.html');
        console.log('Report Options: ' + JSON.stringify(options));


        // For Debugging
        if (options.debug) {
            fs.writeFile(fullOutputFilename + '.json', JSON.stringify(results), (err) => {
                if (err) throw err;
                console.log('Raw file saved!');
            });
        }

        handlebars.registerHelper('image', function(imageFilename, options) {

            var relativeFilename = imageFilename.replace(/\\/g, '/');
            const i = relativeFilename.search('screenshots');
            if (i > 0) {
                relativeFilename = './' + relativeFilename.substr(i);
            }
            return new handlebars.SafeString(
               "<a href='#' data-featherlight='" + relativeFilename + "' class='screenshot-thumbnail'>" + relativeFilename + "</a>"
            );
        });
        handlebars.registerHelper('gallery', function(imageFilename, options) {

            var relativeFilename = imageFilename.replace(/\\/g, '/');
            const i = relativeFilename.search('screenshots');
            if (i > 0) {
                relativeFilename = './' + relativeFilename.substr(i);
            }
            return new handlebars.SafeString(
                "<div class='gallery-column'>" +
                "<a href='" + relativeFilename + "' class='thumbnail gallery'><img class='thumbnail' src='" + relativeFilename + "'/></a>" +
                "</div>"
            );
        });
        // read the html template

        fs.readFile(options.themeFile , function(err, data) {
            if (err) throw err;

            let template = data.toString();

            // merge the template with the test results data
            let html = handlebars.compile(template)({
                results: results,
                options: options,
                timestamp: new Date().toString(),
                html_path: RelativePath(options.fullOutputFilename, __dirname + "/reports"),
                // browser: options.filename_prefix.split('_').join(' '),
                title: options.reportTitle
            });

            // write the html to a file
            fs.writeFile(options.fullOutputFilename, html, function(err) {
                if (err) throw err;
                console.log('Report generated: ' + options.fullOutputFilename);
                done();
                if (options.openBrowser) {
                    open(options.fullOutputFilename);
                }
            });
        });
    };

};
