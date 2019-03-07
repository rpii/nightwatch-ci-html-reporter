let fs = require('fs');
let path = require('path');
let handlebars = require('handlebars');
let open = require('opn');
let defaults = require('defaults');
filenameHelpers = require('./outputFilename');
RelativePath = require('./RelativePath');

function userAgent(options) {
    if (options && options.desiredCapabilities) {
        var caps = options.desiredCapabilities;
        let browserName = caps.browserName ;
        if (caps.version) {
            browserName +=  '~' + a.version.replace(/ /g, '');
        }
        return browserName;
    } else {
        return '';
    }
};

module.exports = function(opts) {
    const options = defaults(opts, {
        "debug" : false,
        "openBrowser" : false,
        "reportsDirectory" : "test_output",
        "reportFilename": "report",
        "reportFilenamePrefix" : "",
        "reportTitle" : "",
        "uniqueFilename" : true,
        "themeName" : "default",
        "customTheme" : null,
        "browser" : null
    }) ;

    this.setBrowserOptions  = function(browser) {
        options.browser = browser;
    },



    this.fn  = function(results, done) {
        options.fullOutputFilename = filenameHelpers.getOutputFilename(options);
        options.themeFile = options.customTheme
            ? path.join(process.cwd(), opts.customTheme)
            : path.join(__dirname, 'themes', opts.themeName, '/html-reporter.html');

        if (options.debug) {
            console.log('Report Options: ' + JSON.stringify(options));
        }

        // For Debugging
        if (options.debug) {
            fs.writeFile(options.fullOutputFilename + '.json', JSON.stringify(results), (err) => {
                if (err) throw err;
                console.log('Raw file saved!');
            });
        }
        handlebars.registerHelper("debug", function(optionalValue) {
            console.log("Current Context");
            console.log("====================");
            console.log(this);

            if (optionalValue) {
                console.log("Value");
                console.log("====================");
                console.log(optionalValue);
            }
        })

        handlebars.registerHelper('image', function(imageFilename, altText, options) {

            var relativeFilename = imageFilename.replace(/\\/g, '/');
            const i = relativeFilename.search('screenshots');
            if (i > 0) {
                relativeFilename = './' + relativeFilename.substr(i);
            }
            return new handlebars.SafeString(
               "<a href='#' data-featherlight='" + relativeFilename + "' " +
                "class='screenshot-thumbnail'>" + relativeFilename + "</a>"
            );
        });
        handlebars.registerHelper('gallery', function(imageFilename, altText, options) {

            var relativeFilename = imageFilename.replace(/\\/g, '/');
            const i = relativeFilename.search('screenshots');
            if (i > 0) {
                relativeFilename = './' + relativeFilename.substr(i);
            }
            return new handlebars.SafeString(
                "<div class='gallery-column'>" +
                "<a href='" + relativeFilename + "' class='thumbnail gallery'><img class='thumbnail' src='" + relativeFilename + "' alt='" + handlebars.escapeExpression(altText) + "' /></a>" +
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
                html_path: RelativePath(options.fullOutputFilename, __dirname ),
                browser: userAgent(options.browser),
                themeName : options.themeName,
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
