// Copyright (c) 2016 SYSTRAN S.A.

var setup = require('../setup');

describe('POI', function() {
  this.timeout(10000);
  describe('Get api version', function() {
    it('should get api version without error', function(done) {
      var result = setup.geographicClient.getGeographicApiVersion();
      setup.parseResponse(result, done);
    });
  });

  describe('Get supported languages', function() {
    it('should get a list of languages in which geographic data can be localized', function(done) {
      var result = setup.geographicClient.getGeographicSupportedLanguages();
      setup.parseResponse(result, done);
    });
  });

  describe('Get list of Point of interests', function() {
    it('should get the list without parameter', function(done) {
      var result = setup.geographicClient.getGeographicPoiList();
      setup.parseResponse(result, done);
    });

    it('should get a list of POI with some parameters', function(done) {
      var lat = 47.219510;
      var lng = -1.553694;
      var radius = 1000;
      var result = setup.geographicClient.getGeographicPoiList({latitude: lat, longitude: lng, radius: radius});
      setup.parseResponse(result, done);
    });

    it('should get a list of POI with limit result', function(done) {
      var lat = 47.219510;
      var lng = -1.553694;
      var radius = 1000;
      var limit = 10;
      var result = setup.geographicClient.getGeographicPoiList({latitude: lat, longitude: lng, radius: radius, limit: limit});
      setup.parseResponse(result, done);
    });

    it('should get the list of POI by name', function(done) {
      var names = ['OUEST INFO', 'RHUMS ET COCKTAILS', 'LES SENTIERS DE DAKAR'];
      var result = setup.geographicClient.getGeographicPoiList({name: names});
      setup.parseResponse(result, done);
    });

    it('should get the list of POI with filter', function(done) {
      var filter = ['LES SENTIERS DE DAKAR'];
      var result = setup.geographicClient.getGeographicPoiList({filter: filter});
      setup.parseResponse(result, done);
    });
  });

  describe('Get a specific Point of interest', function() {
    it('should get all information about a specific POI', function(done) {
      var limit = 1;
      var result = setup.geographicClient.getGeographicPoiList({limit: limit});
      setup.parseResponse(result, function(err, res, body) {
        if (err) {
          done(new Error(err));
          return;
        }

        if (!body || !body.pointsOfInterest || !body.pointsOfInterest.length || !body.pointsOfInterest[0]) {
          done(new Error('Unexpected response'));
          return;
        }

        var id = body.pointsOfInterest[0].id;
        var result = setup.geographicClient.getGeographicPoiGet({id: id});
        setup.parseResponse(result, done);
      });
    });
  });

  describe('Get available types for Point of interest', function() {
    it('should get available POI types', function(done) {
      var result = setup.geographicClient.getGeographicPoiTypes();
      setup.parseResponse(result, done);
    });
  });
});