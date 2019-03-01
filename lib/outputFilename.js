// Returns the filename of the report that should
// be saved to disk.
var path = require('path');

module.exports = {
  getOutputFilename: function(opts, testRun) {
    var basename = path.basename(opts.reportFilenamePrefix + opts.reportFilename, '.html');
    var dirname = path.dirname(opts.reportFilename);
    var filename = basename + ((opts.uniqueFilename) ? (Math.floor(Date.now() / 1000)) : '') + '.html';
    var outputPath = path.join(opts.reportsDirectory, dirname, filename);
    return outputPath;
  },

  insertSuiteNameIntoFilename: function(fullOutputFilename, suiteName) {
    return fullOutputFilename.replace(/\.html/,'') + '-' + suiteName.replace(/\/|\\/g,'-') + '.html';
  }
};

