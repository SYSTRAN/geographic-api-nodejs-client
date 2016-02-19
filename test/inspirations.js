// Copyright (c) 2016 SYSTRAN S.A.

var setup = require('../setup');

describe('Inspirations', function() {
  this.timeout(10000);
  describe('Get a list of Inspirations', function() {
    it('should get the list of Inspirations', function(done) {
      var result = setup.geographicClient.getGeographicInspirationsList();
      setup.parseResponse(result, done);
    });
  });

  describe('Get a list of dossiers', function() {
    it('should get the list of Inspirations of type dossier', function(done) {
      var result = setup.geographicClient.getGeographicInspirationsDossiersList();
      setup.parseResponse(result, done);
    });
  });

  describe('Get a list of events', function() {
    it('should get the list of Inspirations of type event', function(done) {
      var result = setup.geographicClient.getGeographicInspirationsEventsList();
      setup.parseResponse(result, done);
    });
  });

  describe('Get a list of news in brief', function() {
    it('should get the list of Inspirations of type news in brief', function(done) {
      var result = setup.geographicClient.getGeographicInspirationsNewsInBriefList();
      setup.parseResponse(result, done);
    });
  });

  describe('Get a list of slide shows', function() {
    it('should get the list of Inspirations of type slide show', function(done) {
      var result = setup.geographicClient.getGeographicInspirationsSlideShowsList();
      setup.parseResponse(result, done);
    });
  });

  describe('Get a list of tests', function() {
    it('should get the list of Inspirations of type test', function(done) {
      var result = setup.geographicClient.getGeographicInspirationsSlideShowsList();
      setup.parseResponse(result, done);
    });
  });

  describe('Get a specific inspiration', function() {
    it('should get all information about a specific inspirations', function(done) {
      var result = setup.geographicClient.getGeographicInspirationsList({limit: 1});
      setup.parseResponse(result, function(err, res, body) {
        if (err) {
          done(new Error(err));
          return;
        }

        if (!body || !body.inspirations || !body.inspirations.length || !body.inspirations[0]) {
          done(new Error('Unexpected response'));
          return;
        }

        var id = body.inspirations[0].id;
        var result = setup.geographicClient.getGeographicInspirationsGet({id: id});
        setup.parseResponse(result, done);
      });
    });
  });
});