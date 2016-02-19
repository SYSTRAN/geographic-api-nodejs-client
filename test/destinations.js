// Copyright (c) 2016 SYSTRAN S.A.

var setup = require('../setup');

describe('Destinations', function() {
  this.timeout(10000);
  describe('Get list of destinations', function() {
    it('should get the list of destinations without error', function(done) {
      var result = setup.geographicClient.getGeographicDestinationsList();
      setup.parseResponse(result, done);
    });

    it('should get the list of destinations with limit result', function(done) {
      var limit = 3;
      var result = setup.geographicClient.getGeographicDestinationsList({limit: limit});
      setup.parseResponse(result, done);
    });
  });

  describe('Get a specific Destination', function() {
    it('should get all information about a specific destination', function(done) {
      var result = setup.geographicClient.getGeographicDestinationsList({limit: 1});
      setup.parseResponse(result, function(err, res, body) {
        if (err) {
          done(new Error(err));
          return;
        }

        if (!body || !body.destinations || !body.destinations.length || !body.destinations[0]) {
          done(new Error('Unexpected response'));
          return;
        }

        var id = body.destinations[0].id;
        var result = setup.geographicClient.getGeographicDestinationsGet({id: id});
        setup.parseResponse(result, done);
      });
    });
  });
});