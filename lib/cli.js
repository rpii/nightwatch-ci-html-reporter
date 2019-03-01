#! /usr/bin/env node
/*
 * nightwatch-ci-html-reporter
 * https://github.com/jls/nightwatch-html-reporter
 *
 * Copyright (c) 2014 James Smith
 * Licensed under the MIT license.
 */

var fs = require('fs'),
    async = require('async'),
    nconf = require('nconf'),
    renderer = require('./renderer'),
    readdirp = require('readdirp'),
    open = require('opn'),
    path = require('path'),
    xml2js = require('xml2js'),
    parseString = xml2js.parseString,
    normalize = require('./normalize'),
    filenameHelpers = require('./outputFilename');


nconf.argv({
  d: {
    alias: 'report-dir',
    describe: 'Directory where nightwatch reports are stored.',
    demand: true
  },
  t: {
    alias: 'theme',
    describe: 'Name of theme to use.  Should match a directory in lib/themes.',
    default: 'default'
  },
  o: {
    alias: 'output',
    describe: 'Filename to use when saving the generated report.',
    default: 'generatedReport.html'
  },
  u: {
    alias: 'unique-filename',
    describe: 'Appends a timestamp to the end of the generated report filename.',
    default: false
  },
  p: {
    alias: 'prepend-filename',
    describe: 'Prepend filename to the package name in the report.  Helps distinguish between multiple runs/diff browser/same test',
    default: false
  },
  r: {
    alias: 'relative-screenshots',
    describe: 'Convert screenshot paths from absolute to relative to output file.',
    default: false
  },
  b: {
    alias: 'browser',
    describe: 'If true generated report will be opened in the browser.',
    default: true
  },
  'save-nightwatch-report': {
    describe: 'Debug: A filename we use to save the report object passed to us by nightwatch.'
  },
  'save-xml-report': {
    describe: 'Debug: A filename we use to save the parsed XML object from XML reports.'
  }
}).env();

var opts = {
  reportsDirectory: nconf.get('report-dir'),
  themeName: nconf.get('theme'),
  reportFilename: nconf.get('output'),
  openBrowser: nconf.get('browser') === true,
  prependFilename: nconf.get('prepend-filename') === true,
  uniqueFilename: nconf.get('unique-filename') === true,
  hideSuccess: typeof (nconf.get('compact')) !== 'undefined',
  logLevel: nconf.get('log-level'),
  relativeScreenshots: nconf.get('relative-screenshots'),
  debug: {
    saveNightwatch: nconf.get('save-nightwatch-report'),
    saveXML: nconf.get('save-xml-report')
  },
  fromXML: true // Always going to be true for cli.
};


var readOpts = {
  root: path.resolve(opts.reportsDirectory),
  fileFilter: '*.xml',
  entryType: 'files'
};

opts.fullOutputFilename = filenameHelpers.getOutputFilename(opts);

// async.waterfall([
//
//   readdirp.bind(readdirp, readOpts),
//
// });
