const ogs = require('open-graph-scraper');

const scrapper = function(url) {
    ogs(
        { url: url },
        function(er, res) {
            return res
        }
    );
};

module.exports = scrapper;