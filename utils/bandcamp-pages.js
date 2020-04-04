class BandcampPages {
  static get protocol() {
    return 'https';
  }

  static get domain() {
    return 'bandcamp.com';
  }

  static getArtistPage(artist) {
    return `${BandcampPages.protocol}://${artist}.${BandcampPages.domain}`;
  }

  static getArtistReleasesPage(artist) {
    return `${BandcampPages.getArtistPage(artist)}/music`;
  }
}

module.exports = BandcampPages;