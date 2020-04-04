const scrapeIt = require("scrape-it");

const BandcampPages = require('../utils/bandcamp-pages');

class BandcampScraper {
  static get SCRAP_RELEASE_MAP() {
    return {
      mainArtist: '#band-name-location .title',
      releases: {
        listItem: 'li.music-grid-item',
        data: {
          // Can be used to embed release
          embed: {
            attr: 'data-item-id'
          },
          title: {
            selector:'p.title',
            texteq: 0
          },
          artist: 'p.title .artist-override',
          link: {
            selector: 'a',
            attr: 'href'
          },
          img: {
            selector: 'div.art img',
            data: {
              // Provide origin of image even for lazy loaded images
              src: {
                attr: 'src'
              },
              dataOriginal: {
                attr: 'data-original'
              }
            }
          }
        }
      }
    }
  }

  static scrapReleases(artist) {
    return new Promise((resolve, reject) => {
      scrapeIt(BandcampPages.getArtistReleasesPage(artist), BandcampScraper.SCRAP_RELEASE_MAP)
        .then(({data}) => {
          const {mainArtist, releases} = data;
          const artistPage = BandcampPages.getArtistPage(artist);
          resolve(releases.map((release) => BandcampScraper.normalizeRelease(release, artistPage, mainArtist)));
        })
        .catch(reject);
    });
  }

  static normalizeRelease(release, artistPage, fallbackArtist = '') {
    const {artist, img: {dataOriginal, src}, embed, link} = release;

    const normalized = {
      artist: artist || fallbackArtist,
      img: dataOriginal || src,
      embed: `${embed}`.replace('-', '='),
      link: `${artistPage}${link}`
    };

    return Object.assign({...release}, normalized);
  }
}

module.exports = BandcampScraper;
