# nightwatch-ci-html-reporter


Generates an HTML report of the Nightwatch.js test using the Nightwatch reporter options.  

This package is based upon the work of Denis Denisov https://bl.ocks.org/denji/204690bf21ef65ac7778 to create a html-reporter for nightwatch.  I used the work by James Smith in nightwatch-html-reporter as a basis for the project structure, and utilized the integration into nightwatch demonstrated there.  This project is not a fork of either project but rather an integration of the handlebars technoly to create a nice report.  I was attemping to create reports that are similar to the SeLion java automated test framework. 

## Installation

For **for all versions of Nightwatch**
```
npm install nightwatch-ci-html-reporter
```

## Usage


### Usage as a Built in Nightwatch reporter
_Requires Nightwatch >= 1.0.19._

```javascript
/* In nightwatch/globals.js */
var HtmlReporter = require('nightwatch-ci-html-reporter');
var reporter = new HtmlReporter({
	openBrowser: true,
	reportsDirectory: __dirname + '/reports'
});
module.exports = {
	reporter: reporter.fn
};
```


## Options

```javascript
{
	/* Title of the test report */
	reportTitle: "Your Title Here",    
	/* True or False.  If true the generated html will be opened
		in your browser after the test run. */
	openBrowser: true,

	/* The directory you've set nightwatch to store your reports.
		On the CLI this determines where we read reports from, but on this
		interface it determines where the generated report will be saved. */
	reportsDirectory: __dirname + '/reports',

	/* A prefix inserted in the front of the base filename. */
	reportFilenamePrefix: '',
	
	/* Relative path to custom theme. When this is given,
	`themeName` will be ignored. */
	customTheme: 'relative/path/to/theme.html',
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

You can see examples of all of the available themes below.  You can also create your own theme by copying an existing
theme directory and editing the styles.css file.  If you want to also change the structure of the html generated
you can edit/copy `lib/themes/default/report.pug` which contains the markup for the majority of themes.

Theme options that are available on command line and in the options block:
* default


## Example Reports

---
### Default Theme (default)


## License
Copyright (c) 2019 Rich Peters
Licensed under the MIT license.
