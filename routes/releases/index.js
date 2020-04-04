const express = require('express');
const router = express.Router();

const BandcampScraper = require('../../utils/bandcamp-scraper');

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Releases' });
});

router.get('/:artist', function(req, res, next) {
  const {artist} = req.params;
  BandcampScraper.scrapReleases(artist).then((data) => res.send(data)).catch(next);
});

module.exports = router;
