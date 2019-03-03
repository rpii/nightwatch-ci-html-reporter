
var moment = require('moment');

// Returns the filename of the report that should be saved to disk.
var path = require('path');

module.exports = {
  getOutputFilename: function(opts, testRun) {
    var basename = path.basename(opts.reportFilenamePrefix + opts.reportFilename);
    var dirname = path.dirname(opts.reportFilename);
    var timeStr = '-' + moment().format('YYYYMMDD-HHmmss.SSS') ;
    var filename = basename + ((opts.uniqueFilename) ?  timeStr  : '') + '.html';
    var outputPath = path.join(opts.reportsDirectory, dirname, filename);
    return outputPath;
  },

};

