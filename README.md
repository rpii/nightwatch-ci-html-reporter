# @rpii/nightwatch-html-reporter


This package generates an HTML report of the Nightwatch.js test using the Nightwatch reporter options. 
Initially I looked at the work of Denis Denisov https://bl.ocks.org/denji/204690bf21ef65ac7778 to create a html-reporter for nightwatch. 
It was missing good support for screenshots, but had other good features, such as use of handlebars.
I looked at the  work by James Smith in nightwatch-html-reporter https://www.npmjs.com/package/nightwatch-html-reporter.  
I decided to use this as a basis for the project structure, and utilized the integration into nightwatch demonstrated there.  
This project is not a fork of either project but rather an integration of the handlebars technology into Jame's reporter framework.  

## Installation

**For for all versions of Nightwatch**
```
npm install @rpii/nightwatch-html-reporter
```

## Usage


### Usage as a Built in Nightwatch reporter
_Requires Nightwatch >= 1.0.19._

```javascript
/* Add to  globals.js */
const HtmlReporter = require('@rpii/nightwatch-html-reporter');

const htmlReporter = new HtmlReporter({
    openBrowser: true,
    reportTitle: "Your Portal"
});

module.exports = {

     "reporter" : htmlReporter.fn,
     
     //gets the browser options into the report
     "beforeEach": function(browser, done) {
        htmlReporter.setBrowserOptions( browser.options);
        done();
     }
}
    
```

## Reporter Options

```javascript
{
	/* Title of the test report */
	reportTitle: "Your Title Here",  
	  
	/* True or False.  If true the generated html will be opened
		in your browser after the test run. */
	openBrowser: true,

	/* The directory you've set nightwatch to store your reports. */
	reportsDirectory: __dirname + '/reports',

	/* A prefix inserted in the front of the base filename. */
	reportFilenamePrefix: '',
	
	/* Create unique report names */
	uniqueFilename: true,
	
	/* Boolean.  If true we ensure the generated report filename
		is unique by appending a timestamp to the end. */
	uniqueFilename: false,


	/* The theme that will be used to generate the html report.
		This should match a directory under the lib/themes directory. */
	themeName: 'default',

	/* Relative path to custom theme. When this is given,
	`themeName` will be ignored. */
	customTheme: 'relative/path/to/theme.html',

}
```

## Available Themes

You can see examples of all of the available themes below.  You can also create your own theme by creating a new folder under the them folder and copying the styles.css and html-report.html.
The file 'lib/themes/default/html-report.html` is a handlebars template for the default theme. It is fairly easy to modify. The default uses featherlight for lightboxes for the screenshots.

Theme options that are available on command line and in the options block:
* default
* seLion
* yourtheme
 


## Example Reports

---
### Default Theme (default)


## License
Copyright (c) 2019 Rich Peters
Licensed under the MIT license.
