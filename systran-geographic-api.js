// Copyright (c) 2016 SYSTRAN S.A.

/*jshint -W069 */
/**
 * ### Introduction

REST API to retrieve geographic point of interests.

### Cross Domain

Geographic API supports cross-domain requests through the JSONP or the CORS mechanism.

Geographic API also supports the Silverlight client access policy file
(clientaccesspolicy.xml) and the Adobe Flash cross-domain policy file (crossdomain.xml) that handles cross-domain requests.

#### JSONP Support

Geographic API supports JSONP by providing the name of the callback function as a parameter. The response body will be contained in the parentheses:

```javascript
callbackFunctionName(/* response body as defined in each API section *\/);
```

For example, for a supportedLanguages call with the callback set to supportedLanguagesCallback, the response body will be similar to the following:

```javascript
supportedLanguagesCallback({
  "languages": ["en", "fr"]
});
```

#### CORS

Geographic API supports the CORS mechanism to handle cross-domain requests. The server will correctly handle the OPTIONS requests used by CORS.

The following headers are set as follows:

```
Access-Control-Allow-Origin: *
Access-Control-Allow-Headers: X-Requested-With,Content-Type,X-HTTP-METHOD-OVERRIDE
    ```


### Escaping of the input text

The input text passed as a URL parameter will be escaped with an equivalent of the javascript 'encodeURIComponent' function.

### Encoding of the input text

The input text must be encoded in UTF-8.

### Encoding of the output text

The output text will be encoded in UTF-8.

### Mobile API keys

** iOS **: If you use an iOS API key, you need to add the following parameter to each request:
* `bundleId`: Your application bundle ID

<br />

** Android **: If you use an Android API key, you need to add the following parameters to each request:
* `packageName`: Your application package name
* `certFingerprint`: Your application certificate fingerprint

 * @class SystranGeographicApi
 * @param {(string|object)} [domainOrOptions] - The project domain or options object. If object, see the object's optional properties.
 * @param {string} [domainOrOptions.domain] - The project domain
 * @param {object} [domainOrOptions.token] - auth token - object with value property and optional headerOrQueryName and isQuery properties
 */
var SystranGeographicApi = (function() {
    'use strict';

    var request = require('request');
    var Q = require('q');

    function SystranGeographicApi(options) {
        var domain = (typeof options === 'object') ? options.domain : options;
        this.domain = domain ? domain : '';
        if (this.domain.length === 0) {
            throw new Error('Domain parameter must be specified as a string.');
        }
        this.token = (typeof options === 'object') ? (options.token ? options.token : {}) : {};
    }

    /**
     * Set Token
     * @method
     * @name SystranGeographicApi#setToken
     * @param {string} value - token's value
     * @param {string} headerOrQueryName - the header or query name to send the token at
     * @param {boolean} isQuery - true if send the token as query param, otherwise, send as header param
     *
     */
    SystranGeographicApi.prototype.setToken = function(value, headerOrQueryName, isQuery) {
        this.token.value = value;
        this.token.headerOrQueryName = headerOrQueryName;
        this.token.isQuery = isQuery;
    };

    /**
     * Get a list of `Point of interests`.

    The main criteria can be:
    * a position and a radius
    * a bounding box
    * a textual search

    Additional critera can be added.

     * @method
     * @name SystranGeographicApi#getGeographicPoiList
     * @param {number} latitude - Latitude location. Musts be used together with `longitude` and `radius` parameters.
     * @param {number} longitude - Longitude location. Musts be used together with `latitude` and `radius` parameters.
     * @param {number} radius - Radius in meters. Musts be used together with `latitude` and `longitude` parameters.
     * @param {number} maximumLatitude - Latitude of the top (northernmost) side of the bounding box. Musts be used together with `maximumLongitude`, `minimumLatitude` and `minimumLongitude` parameters.
     * @param {number} maximumLongitude - Longitude of the right (easternmost) side of the bounding box. Musts be used together with `maximumLatitude`, `minimumLatitude` and `minimumLongitude` parameters.
     * @param {number} minimumLatitude - Latitude of the bottom (southernmost) side of the bounding box. Musts be used together with `maximumLatitude`, `maximumLongitude` and `minimumLongitude` parameters.
     * @param {number} minimumLongitude - Longitude of the left (westernmost) side of the bounding box. Musts be used together with `maximumLatitude`, `maximumLongitude` and `minimumLatitude` parameters.
     * @param {array} filter - Filter on all relevent POI data (name, type, address, ...)
     * @param {array} name - POI name
     * @param {string} mainType - POI main type
     * @param {array} type - POI type
     * @param {string} address - POI address
     * @param {string} country - POI country
     * @param {string} state - POI state
     * @param {string} county - POI county
     * @param {string} city - POI city
     * @param {string} postalCode - POI postal code
     * @param {string} street - POI street
     * @param {string} rankBy - Ranking criteria
     * @param {boolean} openNow - Only open for business POI
     * @param {integer} minimumRating - Minimum rating (from 1 to 5)
     * @param {integer} maximumRating - Maximum rating (from 1 to 5)
     * @param {integer} minimumPrice - Minimum price level (from 0 to 3)
     * @param {integer} maximumPrice - Maximum price level (from 0 to 3)
     * @param {integer} limit - Pagination limit
     * @param {integer} offset - Pagination offset
     * @param {string} acceptLanguage - Preferred languages for response localization.

    See [Accept-Language header specification for HTTP
    1.1](http://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.4)

     * @param {string} callback - Javascript callback function name for JSONP Support

     * 
     */
    SystranGeographicApi.prototype.getGeographicPoiList = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

        var domain = this.domain;
        var path = '/geographic/poi/list';

        var body;
        var queryParameters = {};
        var headers = {};
        var form = {};

        if (this.token.isQuery) {
            queryParameters[this.token.headerOrQueryName] = this.token.value;
        } else if (this.token.headerOrQueryName) {
            headers[this.token.headerOrQueryName] = this.token.value;
        } else {
            headers['Authorization'] = 'Bearer ' + this.token.value;
        }

        if (parameters['latitude'] !== undefined) {
            queryParameters['latitude'] = parameters['latitude'];
        }

        if (parameters['longitude'] !== undefined) {
            queryParameters['longitude'] = parameters['longitude'];
        }

        if (parameters['radius'] !== undefined) {
            queryParameters['radius'] = parameters['radius'];
        }

        if (parameters['maximumLatitude'] !== undefined) {
            queryParameters['maximumLatitude'] = parameters['maximumLatitude'];
        }

        if (parameters['maximumLongitude'] !== undefined) {
            queryParameters['maximumLongitude'] = parameters['maximumLongitude'];
        }

        if (parameters['minimumLatitude'] !== undefined) {
            queryParameters['minimumLatitude'] = parameters['minimumLatitude'];
        }

        if (parameters['minimumLongitude'] !== undefined) {
            queryParameters['minimumLongitude'] = parameters['minimumLongitude'];
        }

        if (parameters['filter'] !== undefined) {
            queryParameters['filter'] = parameters['filter'];
        }

        if (parameters['name'] !== undefined) {
            queryParameters['name'] = parameters['name'];
        }

        if (parameters['mainType'] !== undefined) {
            queryParameters['mainType'] = parameters['mainType'];
        }

        if (parameters['type'] !== undefined) {
            queryParameters['type'] = parameters['type'];
        }

        if (parameters['address'] !== undefined) {
            queryParameters['address'] = parameters['address'];
        }

        if (parameters['country'] !== undefined) {
            queryParameters['country'] = parameters['country'];
        }

        if (parameters['state'] !== undefined) {
            queryParameters['state'] = parameters['state'];
        }

        if (parameters['county'] !== undefined) {
            queryParameters['county'] = parameters['county'];
        }

        if (parameters['city'] !== undefined) {
            queryParameters['city'] = parameters['city'];
        }

        if (parameters['postalCode'] !== undefined) {
            queryParameters['postalCode'] = parameters['postalCode'];
        }

        if (parameters['street'] !== undefined) {
            queryParameters['street'] = parameters['street'];
        }

        if (parameters['rankBy'] !== undefined) {
            queryParameters['rankBy'] = parameters['rankBy'];
        }

        if (parameters['openNow'] !== undefined) {
            queryParameters['openNow'] = parameters['openNow'];
        }

        if (parameters['minimumRating'] !== undefined) {
            queryParameters['minimumRating'] = parameters['minimumRating'];
        }

        if (parameters['maximumRating'] !== undefined) {
            queryParameters['maximumRating'] = parameters['maximumRating'];
        }

        if (parameters['minimumPrice'] !== undefined) {
            queryParameters['minimumPrice'] = parameters['minimumPrice'];
        }

        if (parameters['maximumPrice'] !== undefined) {
            queryParameters['maximumPrice'] = parameters['maximumPrice'];
        }

        if (parameters['limit'] !== undefined) {
            queryParameters['limit'] = parameters['limit'];
        }

        if (parameters['offset'] !== undefined) {
            queryParameters['offset'] = parameters['offset'];
        }

        if (parameters['acceptLanguage'] !== undefined) {
            headers['Accept-Language'] = parameters['acceptLanguage'];
        }

        if (parameters['callback'] !== undefined) {
            queryParameters['callback'] = parameters['callback'];
        }

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters)
                .forEach(function(parameterName) {
                    var parameter = parameters.$queryParameters[parameterName];
                    queryParameters[parameterName] = parameter;
                });
        }

        var req = {
            method: 'GET',
            uri: domain + path,
            qs: queryParameters,
            headers: headers,
            body: body,
            encoding: null
        };
        if (Object.keys(form).length > 0) {
            req.formData = form;
        }
        if (typeof(body) === 'object' && !(body instanceof Buffer)) {
            req.json = true;
        }
        request(req, function(error, response, body) {
            if (error) {
                deferred.reject(error);
            } else {
                if (/^application\/(.*\\+)?json/.test(response.headers['content-type'])) {
                    try {
                        body = JSON.parse(body);
                    } catch (e) {

                    }
                }
                if (response.statusCode === 204) {
                    deferred.resolve({
                        response: response
                    });
                } else if (response.statusCode >= 200 && response.statusCode <= 299) {
                    deferred.resolve({
                        response: response,
                        body: body
                    });
                } else {
                    deferred.reject({
                        response: response,
                        body: body
                    });
                }
            }
        });

        return deferred.promise;
    };
    /**
     * Get a specific `Point of interest`.
     * @method
     * @name SystranGeographicApi#getGeographicPoiGet
     * @param {string} id - POI identifier
     * @param {string} acceptLanguage - Preferred languages for response localization.

    See [Accept-Language header specification for HTTP
    1.1](http://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.4)

     * @param {string} callback - Javascript callback function name for JSONP Support

     * 
     */
    SystranGeographicApi.prototype.getGeographicPoiGet = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

        var domain = this.domain;
        var path = '/geographic/poi/get';

        var body;
        var queryParameters = {};
        var headers = {};
        var form = {};

        if (this.token.isQuery) {
            queryParameters[this.token.headerOrQueryName] = this.token.value;
        } else if (this.token.headerOrQueryName) {
            headers[this.token.headerOrQueryName] = this.token.value;
        } else {
            headers['Authorization'] = 'Bearer ' + this.token.value;
        }

        if (parameters['id'] !== undefined) {
            queryParameters['id'] = parameters['id'];
        }

        if (parameters['id'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: id'));
            return deferred.promise;
        }

        if (parameters['acceptLanguage'] !== undefined) {
            headers['Accept-Language'] = parameters['acceptLanguage'];
        }

        if (parameters['callback'] !== undefined) {
            queryParameters['callback'] = parameters['callback'];
        }

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters)
                .forEach(function(parameterName) {
                    var parameter = parameters.$queryParameters[parameterName];
                    queryParameters[parameterName] = parameter;
                });
        }

        var req = {
            method: 'GET',
            uri: domain + path,
            qs: queryParameters,
            headers: headers,
            body: body,
            encoding: null
        };
        if (Object.keys(form).length > 0) {
            req.formData = form;
        }
        if (typeof(body) === 'object' && !(body instanceof Buffer)) {
            req.json = true;
        }
        request(req, function(error, response, body) {
            if (error) {
                deferred.reject(error);
            } else {
                if (/^application\/(.*\\+)?json/.test(response.headers['content-type'])) {
                    try {
                        body = JSON.parse(body);
                    } catch (e) {

                    }
                }
                if (response.statusCode === 204) {
                    deferred.resolve({
                        response: response
                    });
                } else if (response.statusCode >= 200 && response.statusCode <= 299) {
                    deferred.resolve({
                        response: response,
                        body: body
                    });
                } else {
                    deferred.reject({
                        response: response,
                        body: body
                    });
                }
            }
        });

        return deferred.promise;
    };
    /**
     * Get available `Point of interest` types.
     * @method
     * @name SystranGeographicApi#getGeographicPoiTypes
     * @param {string} acceptLanguage - Preferred languages for response localization.

    See [Accept-Language header specification for HTTP
    1.1](http://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.4)

     * @param {string} callback - Javascript callback function name for JSONP Support

     * 
     */
    SystranGeographicApi.prototype.getGeographicPoiTypes = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

        var domain = this.domain;
        var path = '/geographic/poi/types';

        var body;
        var queryParameters = {};
        var headers = {};
        var form = {};

        if (this.token.isQuery) {
            queryParameters[this.token.headerOrQueryName] = this.token.value;
        } else if (this.token.headerOrQueryName) {
            headers[this.token.headerOrQueryName] = this.token.value;
        } else {
            headers['Authorization'] = 'Bearer ' + this.token.value;
        }

        if (parameters['acceptLanguage'] !== undefined) {
            headers['Accept-Language'] = parameters['acceptLanguage'];
        }

        if (parameters['callback'] !== undefined) {
            queryParameters['callback'] = parameters['callback'];
        }

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters)
                .forEach(function(parameterName) {
                    var parameter = parameters.$queryParameters[parameterName];
                    queryParameters[parameterName] = parameter;
                });
        }

        var req = {
            method: 'GET',
            uri: domain + path,
            qs: queryParameters,
            headers: headers,
            body: body,
            encoding: null
        };
        if (Object.keys(form).length > 0) {
            req.formData = form;
        }
        if (typeof(body) === 'object' && !(body instanceof Buffer)) {
            req.json = true;
        }
        request(req, function(error, response, body) {
            if (error) {
                deferred.reject(error);
            } else {
                if (/^application\/(.*\\+)?json/.test(response.headers['content-type'])) {
                    try {
                        body = JSON.parse(body);
                    } catch (e) {

                    }
                }
                if (response.statusCode === 204) {
                    deferred.resolve({
                        response: response
                    });
                } else if (response.statusCode >= 200 && response.statusCode <= 299) {
                    deferred.resolve({
                        response: response,
                        body: body
                    });
                } else {
                    deferred.reject({
                        response: response,
                        body: body
                    });
                }
            }
        });

        return deferred.promise;
    };
    /**
     * Get a list of languages in which geographic data can be localized.
     * @method
     * @name SystranGeographicApi#getGeographicSupportedLanguages
     * @param {string} callback - Javascript callback function name for JSONP Support

     * 
     */
    SystranGeographicApi.prototype.getGeographicSupportedLanguages = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

        var domain = this.domain;
        var path = '/geographic/supportedLanguages';

        var body;
        var queryParameters = {};
        var headers = {};
        var form = {};

        if (this.token.isQuery) {
            queryParameters[this.token.headerOrQueryName] = this.token.value;
        } else if (this.token.headerOrQueryName) {
            headers[this.token.headerOrQueryName] = this.token.value;
        } else {
            headers['Authorization'] = 'Bearer ' + this.token.value;
        }

        if (parameters['callback'] !== undefined) {
            queryParameters['callback'] = parameters['callback'];
        }

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters)
                .forEach(function(parameterName) {
                    var parameter = parameters.$queryParameters[parameterName];
                    queryParameters[parameterName] = parameter;
                });
        }

        var req = {
            method: 'GET',
            uri: domain + path,
            qs: queryParameters,
            headers: headers,
            body: body,
            encoding: null
        };
        if (Object.keys(form).length > 0) {
            req.formData = form;
        }
        if (typeof(body) === 'object' && !(body instanceof Buffer)) {
            req.json = true;
        }
        request(req, function(error, response, body) {
            if (error) {
                deferred.reject(error);
            } else {
                if (/^application\/(.*\\+)?json/.test(response.headers['content-type'])) {
                    try {
                        body = JSON.parse(body);
                    } catch (e) {

                    }
                }
                if (response.statusCode === 204) {
                    deferred.resolve({
                        response: response
                    });
                } else if (response.statusCode >= 200 && response.statusCode <= 299) {
                    deferred.resolve({
                        response: response,
                        body: body
                    });
                } else {
                    deferred.reject({
                        response: response,
                        body: body
                    });
                }
            }
        });

        return deferred.promise;
    };
    /**
     * Current version for geographic apis

     * @method
     * @name SystranGeographicApi#getGeographicApiVersion
     * @param {string} callback - Javascript callback function name for JSONP Support

     * 
     */
    SystranGeographicApi.prototype.getGeographicApiVersion = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

        var domain = this.domain;
        var path = '/geographic/apiVersion';

        var body;
        var queryParameters = {};
        var headers = {};
        var form = {};

        if (this.token.isQuery) {
            queryParameters[this.token.headerOrQueryName] = this.token.value;
        } else if (this.token.headerOrQueryName) {
            headers[this.token.headerOrQueryName] = this.token.value;
        } else {
            headers['Authorization'] = 'Bearer ' + this.token.value;
        }

        if (parameters['callback'] !== undefined) {
            queryParameters['callback'] = parameters['callback'];
        }

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters)
                .forEach(function(parameterName) {
                    var parameter = parameters.$queryParameters[parameterName];
                    queryParameters[parameterName] = parameter;
                });
        }

        var req = {
            method: 'GET',
            uri: domain + path,
            qs: queryParameters,
            headers: headers,
            body: body,
            encoding: null
        };
        if (Object.keys(form).length > 0) {
            req.formData = form;
        }
        if (typeof(body) === 'object' && !(body instanceof Buffer)) {
            req.json = true;
        }
        request(req, function(error, response, body) {
            if (error) {
                deferred.reject(error);
            } else {
                if (/^application\/(.*\\+)?json/.test(response.headers['content-type'])) {
                    try {
                        body = JSON.parse(body);
                    } catch (e) {

                    }
                }
                if (response.statusCode === 204) {
                    deferred.resolve({
                        response: response
                    });
                } else if (response.statusCode >= 200 && response.statusCode <= 299) {
                    deferred.resolve({
                        response: response,
                        body: body
                    });
                } else {
                    deferred.reject({
                        response: response,
                        body: body
                    });
                }
            }
        });

        return deferred.promise;
    };
    /**
     * Get a list of `Destinations`.

    The main criteria can be:
    * a position and a radius
    * a textual search

    Additional critera can be added.

     * @method
     * @name SystranGeographicApi#getGeographicDestinationsList
     * @param {number} latitude - Latitude location. Musts be used together with `longitude` and `radius` parameters.
     * @param {number} longitude - Longitude location. Musts be used together with `latitude` and `radius` parameters.
     * @param {number} radius - Radius in meters. Musts be used together with `latitude` and `longitude` parameters.
     * @param {string} address - Address
     * @param {string} country - Country
     * @param {string} state - State
     * @param {string} county - County
     * @param {string} city - City
     * @param {string} postalCode - Postal Code
     * @param {integer} limit - Pagination limit
     * @param {integer} offset - Pagination offset
     * @param {string} acceptLanguage - Preferred languages for response localization.

    See [Accept-Language header specification for HTTP
    1.1](http://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.4)

     * @param {string} callback - Javascript callback function name for JSONP Support

     * 
     */
    SystranGeographicApi.prototype.getGeographicDestinationsList = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

        var domain = this.domain;
        var path = '/geographic/destinations/list';

        var body;
        var queryParameters = {};
        var headers = {};
        var form = {};

        if (this.token.isQuery) {
            queryParameters[this.token.headerOrQueryName] = this.token.value;
        } else if (this.token.headerOrQueryName) {
            headers[this.token.headerOrQueryName] = this.token.value;
        } else {
            headers['Authorization'] = 'Bearer ' + this.token.value;
        }

        if (parameters['latitude'] !== undefined) {
            queryParameters['latitude'] = parameters['latitude'];
        }

        if (parameters['longitude'] !== undefined) {
            queryParameters['longitude'] = parameters['longitude'];
        }

        if (parameters['radius'] !== undefined) {
            queryParameters['radius'] = parameters['radius'];
        }

        if (parameters['address'] !== undefined) {
            queryParameters['address'] = parameters['address'];
        }

        if (parameters['country'] !== undefined) {
            queryParameters['country'] = parameters['country'];
        }

        if (parameters['state'] !== undefined) {
            queryParameters['state'] = parameters['state'];
        }

        if (parameters['county'] !== undefined) {
            queryParameters['county'] = parameters['county'];
        }

        if (parameters['city'] !== undefined) {
            queryParameters['city'] = parameters['city'];
        }

        if (parameters['postalCode'] !== undefined) {
            queryParameters['postalCode'] = parameters['postalCode'];
        }

        if (parameters['limit'] !== undefined) {
            queryParameters['limit'] = parameters['limit'];
        }

        if (parameters['offset'] !== undefined) {
            queryParameters['offset'] = parameters['offset'];
        }

        if (parameters['acceptLanguage'] !== undefined) {
            headers['Accept-Language'] = parameters['acceptLanguage'];
        }

        if (parameters['callback'] !== undefined) {
            queryParameters['callback'] = parameters['callback'];
        }

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters)
                .forEach(function(parameterName) {
                    var parameter = parameters.$queryParameters[parameterName];
                    queryParameters[parameterName] = parameter;
                });
        }

        var req = {
            method: 'GET',
            uri: domain + path,
            qs: queryParameters,
            headers: headers,
            body: body,
            encoding: null
        };
        if (Object.keys(form).length > 0) {
            req.formData = form;
        }
        if (typeof(body) === 'object' && !(body instanceof Buffer)) {
            req.json = true;
        }
        request(req, function(error, response, body) {
            if (error) {
                deferred.reject(error);
            } else {
                if (/^application\/(.*\\+)?json/.test(response.headers['content-type'])) {
                    try {
                        body = JSON.parse(body);
                    } catch (e) {

                    }
                }
                if (response.statusCode === 204) {
                    deferred.resolve({
                        response: response
                    });
                } else if (response.statusCode >= 200 && response.statusCode <= 299) {
                    deferred.resolve({
                        response: response,
                        body: body
                    });
                } else {
                    deferred.reject({
                        response: response,
                        body: body
                    });
                }
            }
        });

        return deferred.promise;
    };
    /**
     * Get a specific `Destination`.
     * @method
     * @name SystranGeographicApi#getGeographicDestinationsGet
     * @param {string} id - Destination identifier
     * @param {string} acceptLanguage - Preferred languages for response localization.

    See [Accept-Language header specification for HTTP
    1.1](http://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.4)

     * @param {string} callback - Javascript callback function name for JSONP Support

     * 
     */
    SystranGeographicApi.prototype.getGeographicDestinationsGet = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

        var domain = this.domain;
        var path = '/geographic/destinations/get';

        var body;
        var queryParameters = {};
        var headers = {};
        var form = {};

        if (this.token.isQuery) {
            queryParameters[this.token.headerOrQueryName] = this.token.value;
        } else if (this.token.headerOrQueryName) {
            headers[this.token.headerOrQueryName] = this.token.value;
        } else {
            headers['Authorization'] = 'Bearer ' + this.token.value;
        }

        if (parameters['id'] !== undefined) {
            queryParameters['id'] = parameters['id'];
        }

        if (parameters['id'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: id'));
            return deferred.promise;
        }

        if (parameters['acceptLanguage'] !== undefined) {
            headers['Accept-Language'] = parameters['acceptLanguage'];
        }

        if (parameters['callback'] !== undefined) {
            queryParameters['callback'] = parameters['callback'];
        }

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters)
                .forEach(function(parameterName) {
                    var parameter = parameters.$queryParameters[parameterName];
                    queryParameters[parameterName] = parameter;
                });
        }

        var req = {
            method: 'GET',
            uri: domain + path,
            qs: queryParameters,
            headers: headers,
            body: body,
            encoding: null
        };
        if (Object.keys(form).length > 0) {
            req.formData = form;
        }
        if (typeof(body) === 'object' && !(body instanceof Buffer)) {
            req.json = true;
        }
        request(req, function(error, response, body) {
            if (error) {
                deferred.reject(error);
            } else {
                if (/^application\/(.*\\+)?json/.test(response.headers['content-type'])) {
                    try {
                        body = JSON.parse(body);
                    } catch (e) {

                    }
                }
                if (response.statusCode === 204) {
                    deferred.resolve({
                        response: response
                    });
                } else if (response.statusCode >= 200 && response.statusCode <= 299) {
                    deferred.resolve({
                        response: response,
                        body: body
                    });
                } else {
                    deferred.reject({
                        response: response,
                        body: body
                    });
                }
            }
        });

        return deferred.promise;
    };
    /**
     * Get a list of `Inspirations`.

    The main criteria can be:
    * a position and a radius
    * a textual search

    Additional critera can be added.

     * @method
     * @name SystranGeographicApi#getGeographicInspirationsList
     * @param {number} latitude - Latitude location. Musts be used together with `longitude` and `radius` parameters.
     * @param {number} longitude - Longitude location. Musts be used together with `latitude` and `radius` parameters.
     * @param {number} radius - Radius in meters. Musts be used together with `latitude` and `longitude` parameters.
     * @param {string} address - Address
     * @param {string} country - Country
     * @param {string} state - State
     * @param {string} county - County
     * @param {string} city - City
     * @param {string} postalCode - Postal Code
     * @param {integer} limit - Pagination limit
     * @param {integer} offset - Pagination offset
     * @param {string} acceptLanguage - Preferred languages for response localization.

    See [Accept-Language header specification for HTTP
    1.1](http://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.4)

     * @param {string} callback - Javascript callback function name for JSONP Support

     * 
     */
    SystranGeographicApi.prototype.getGeographicInspirationsList = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

        var domain = this.domain;
        var path = '/geographic/inspirations/list';

        var body;
        var queryParameters = {};
        var headers = {};
        var form = {};

        if (this.token.isQuery) {
            queryParameters[this.token.headerOrQueryName] = this.token.value;
        } else if (this.token.headerOrQueryName) {
            headers[this.token.headerOrQueryName] = this.token.value;
        } else {
            headers['Authorization'] = 'Bearer ' + this.token.value;
        }

        if (parameters['latitude'] !== undefined) {
            queryParameters['latitude'] = parameters['latitude'];
        }

        if (parameters['longitude'] !== undefined) {
            queryParameters['longitude'] = parameters['longitude'];
        }

        if (parameters['radius'] !== undefined) {
            queryParameters['radius'] = parameters['radius'];
        }

        if (parameters['address'] !== undefined) {
            queryParameters['address'] = parameters['address'];
        }

        if (parameters['country'] !== undefined) {
            queryParameters['country'] = parameters['country'];
        }

        if (parameters['state'] !== undefined) {
            queryParameters['state'] = parameters['state'];
        }

        if (parameters['county'] !== undefined) {
            queryParameters['county'] = parameters['county'];
        }

        if (parameters['city'] !== undefined) {
            queryParameters['city'] = parameters['city'];
        }

        if (parameters['postalCode'] !== undefined) {
            queryParameters['postalCode'] = parameters['postalCode'];
        }

        if (parameters['limit'] !== undefined) {
            queryParameters['limit'] = parameters['limit'];
        }

        if (parameters['offset'] !== undefined) {
            queryParameters['offset'] = parameters['offset'];
        }

        if (parameters['acceptLanguage'] !== undefined) {
            headers['Accept-Language'] = parameters['acceptLanguage'];
        }

        if (parameters['callback'] !== undefined) {
            queryParameters['callback'] = parameters['callback'];
        }

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters)
                .forEach(function(parameterName) {
                    var parameter = parameters.$queryParameters[parameterName];
                    queryParameters[parameterName] = parameter;
                });
        }

        var req = {
            method: 'GET',
            uri: domain + path,
            qs: queryParameters,
            headers: headers,
            body: body,
            encoding: null
        };
        if (Object.keys(form).length > 0) {
            req.formData = form;
        }
        if (typeof(body) === 'object' && !(body instanceof Buffer)) {
            req.json = true;
        }
        request(req, function(error, response, body) {
            if (error) {
                deferred.reject(error);
            } else {
                if (/^application\/(.*\\+)?json/.test(response.headers['content-type'])) {
                    try {
                        body = JSON.parse(body);
                    } catch (e) {

                    }
                }
                if (response.statusCode === 204) {
                    deferred.resolve({
                        response: response
                    });
                } else if (response.statusCode >= 200 && response.statusCode <= 299) {
                    deferred.resolve({
                        response: response,
                        body: body
                    });
                } else {
                    deferred.reject({
                        response: response,
                        body: body
                    });
                }
            }
        });

        return deferred.promise;
    };
    /**
     * Get a list of `Inspirations` of type `dossier`.

    The main criteria can be:
    * a position and a radius
    * a textual search

    Additional critera can be added.

     * @method
     * @name SystranGeographicApi#getGeographicInspirationsDossiersList
     * @param {number} latitude - Latitude location. Musts be used together with `longitude` and `radius` parameters.
     * @param {number} longitude - Longitude location. Musts be used together with `latitude` and `radius` parameters.
     * @param {number} radius - Radius in meters. Musts be used together with `latitude` and `longitude` parameters.
     * @param {string} address - Address
     * @param {string} country - Country
     * @param {string} state - State
     * @param {string} county - County
     * @param {string} city - City
     * @param {string} postalCode - Postal Code
     * @param {integer} limit - Pagination limit
     * @param {integer} offset - Pagination offset
     * @param {string} acceptLanguage - Preferred languages for response localization.

    See [Accept-Language header specification for HTTP
    1.1](http://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.4)

     * @param {string} callback - Javascript callback function name for JSONP Support

     * 
     */
    SystranGeographicApi.prototype.getGeographicInspirationsDossiersList = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

        var domain = this.domain;
        var path = '/geographic/inspirations/dossiers/list';

        var body;
        var queryParameters = {};
        var headers = {};
        var form = {};

        if (this.token.isQuery) {
            queryParameters[this.token.headerOrQueryName] = this.token.value;
        } else if (this.token.headerOrQueryName) {
            headers[this.token.headerOrQueryName] = this.token.value;
        } else {
            headers['Authorization'] = 'Bearer ' + this.token.value;
        }

        if (parameters['latitude'] !== undefined) {
            queryParameters['latitude'] = parameters['latitude'];
        }

        if (parameters['longitude'] !== undefined) {
            queryParameters['longitude'] = parameters['longitude'];
        }

        if (parameters['radius'] !== undefined) {
            queryParameters['radius'] = parameters['radius'];
        }

        if (parameters['address'] !== undefined) {
            queryParameters['address'] = parameters['address'];
        }

        if (parameters['country'] !== undefined) {
            queryParameters['country'] = parameters['country'];
        }

        if (parameters['state'] !== undefined) {
            queryParameters['state'] = parameters['state'];
        }

        if (parameters['county'] !== undefined) {
            queryParameters['county'] = parameters['county'];
        }

        if (parameters['city'] !== undefined) {
            queryParameters['city'] = parameters['city'];
        }

        if (parameters['postalCode'] !== undefined) {
            queryParameters['postalCode'] = parameters['postalCode'];
        }

        if (parameters['limit'] !== undefined) {
            queryParameters['limit'] = parameters['limit'];
        }

        if (parameters['offset'] !== undefined) {
            queryParameters['offset'] = parameters['offset'];
        }

        if (parameters['acceptLanguage'] !== undefined) {
            headers['Accept-Language'] = parameters['acceptLanguage'];
        }

        if (parameters['callback'] !== undefined) {
            queryParameters['callback'] = parameters['callback'];
        }

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters)
                .forEach(function(parameterName) {
                    var parameter = parameters.$queryParameters[parameterName];
                    queryParameters[parameterName] = parameter;
                });
        }

        var req = {
            method: 'GET',
            uri: domain + path,
            qs: queryParameters,
            headers: headers,
            body: body,
            encoding: null
        };
        if (Object.keys(form).length > 0) {
            req.formData = form;
        }
        if (typeof(body) === 'object' && !(body instanceof Buffer)) {
            req.json = true;
        }
        request(req, function(error, response, body) {
            if (error) {
                deferred.reject(error);
            } else {
                if (/^application\/(.*\\+)?json/.test(response.headers['content-type'])) {
                    try {
                        body = JSON.parse(body);
                    } catch (e) {

                    }
                }
                if (response.statusCode === 204) {
                    deferred.resolve({
                        response: response
                    });
                } else if (response.statusCode >= 200 && response.statusCode <= 299) {
                    deferred.resolve({
                        response: response,
                        body: body
                    });
                } else {
                    deferred.reject({
                        response: response,
                        body: body
                    });
                }
            }
        });

        return deferred.promise;
    };
    /**
     * Get a list of `Inspirations` of type `event`.

    The main criteria can be:
    * a position and a radius
    * a textual search

    Additional critera can be added.

     * @method
     * @name SystranGeographicApi#getGeographicInspirationsEventsList
     * @param {number} latitude - Latitude location. Musts be used together with `longitude` and `radius` parameters.
     * @param {number} longitude - Longitude location. Musts be used together with `latitude` and `radius` parameters.
     * @param {number} radius - Radius in meters. Musts be used together with `latitude` and `longitude` parameters.
     * @param {string} address - Address
     * @param {string} country - Country
     * @param {string} state - State
     * @param {string} county - County
     * @param {string} city - City
     * @param {string} postalCode - Postal Code
     * @param {integer} limit - Pagination limit
     * @param {integer} offset - Pagination offset
     * @param {string} acceptLanguage - Preferred languages for response localization.

    See [Accept-Language header specification for HTTP
    1.1](http://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.4)

     * @param {string} callback - Javascript callback function name for JSONP Support

     * 
     */
    SystranGeographicApi.prototype.getGeographicInspirationsEventsList = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

        var domain = this.domain;
        var path = '/geographic/inspirations/events/list';

        var body;
        var queryParameters = {};
        var headers = {};
        var form = {};

        if (this.token.isQuery) {
            queryParameters[this.token.headerOrQueryName] = this.token.value;
        } else if (this.token.headerOrQueryName) {
            headers[this.token.headerOrQueryName] = this.token.value;
        } else {
            headers['Authorization'] = 'Bearer ' + this.token.value;
        }

        if (parameters['latitude'] !== undefined) {
            queryParameters['latitude'] = parameters['latitude'];
        }

        if (parameters['longitude'] !== undefined) {
            queryParameters['longitude'] = parameters['longitude'];
        }

        if (parameters['radius'] !== undefined) {
            queryParameters['radius'] = parameters['radius'];
        }

        if (parameters['address'] !== undefined) {
            queryParameters['address'] = parameters['address'];
        }

        if (parameters['country'] !== undefined) {
            queryParameters['country'] = parameters['country'];
        }

        if (parameters['state'] !== undefined) {
            queryParameters['state'] = parameters['state'];
        }

        if (parameters['county'] !== undefined) {
            queryParameters['county'] = parameters['county'];
        }

        if (parameters['city'] !== undefined) {
            queryParameters['city'] = parameters['city'];
        }

        if (parameters['postalCode'] !== undefined) {
            queryParameters['postalCode'] = parameters['postalCode'];
        }

        if (parameters['limit'] !== undefined) {
            queryParameters['limit'] = parameters['limit'];
        }

        if (parameters['offset'] !== undefined) {
            queryParameters['offset'] = parameters['offset'];
        }

        if (parameters['acceptLanguage'] !== undefined) {
            headers['Accept-Language'] = parameters['acceptLanguage'];
        }

        if (parameters['callback'] !== undefined) {
            queryParameters['callback'] = parameters['callback'];
        }

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters)
                .forEach(function(parameterName) {
                    var parameter = parameters.$queryParameters[parameterName];
                    queryParameters[parameterName] = parameter;
                });
        }

        var req = {
            method: 'GET',
            uri: domain + path,
            qs: queryParameters,
            headers: headers,
            body: body,
            encoding: null
        };
        if (Object.keys(form).length > 0) {
            req.formData = form;
        }
        if (typeof(body) === 'object' && !(body instanceof Buffer)) {
            req.json = true;
        }
        request(req, function(error, response, body) {
            if (error) {
                deferred.reject(error);
            } else {
                if (/^application\/(.*\\+)?json/.test(response.headers['content-type'])) {
                    try {
                        body = JSON.parse(body);
                    } catch (e) {

                    }
                }
                if (response.statusCode === 204) {
                    deferred.resolve({
                        response: response
                    });
                } else if (response.statusCode >= 200 && response.statusCode <= 299) {
                    deferred.resolve({
                        response: response,
                        body: body
                    });
                } else {
                    deferred.reject({
                        response: response,
                        body: body
                    });
                }
            }
        });

        return deferred.promise;
    };
    /**
     * Get a list of `Inspirations` of type `news in brief`.

    The main criteria can be:
    * a position and a radius
    * a textual search

    Additional critera can be added.

     * @method
     * @name SystranGeographicApi#getGeographicInspirationsNewsInBriefList
     * @param {number} latitude - Latitude location. Musts be used together with `longitude` and `radius` parameters.
     * @param {number} longitude - Longitude location. Musts be used together with `latitude` and `radius` parameters.
     * @param {number} radius - Radius in meters. Musts be used together with `latitude` and `longitude` parameters.
     * @param {string} address - Address
     * @param {string} country - Country
     * @param {string} state - State
     * @param {string} county - County
     * @param {string} city - City
     * @param {string} postalCode - Postal Code
     * @param {integer} limit - Pagination limit
     * @param {integer} offset - Pagination offset
     * @param {string} acceptLanguage - Preferred languages for response localization.

    See [Accept-Language header specification for HTTP
    1.1](http://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.4)

     * @param {string} callback - Javascript callback function name for JSONP Support

     * 
     */
    SystranGeographicApi.prototype.getGeographicInspirationsNewsInBriefList = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

        var domain = this.domain;
        var path = '/geographic/inspirations/newsInBrief/list';

        var body;
        var queryParameters = {};
        var headers = {};
        var form = {};

        if (this.token.isQuery) {
            queryParameters[this.token.headerOrQueryName] = this.token.value;
        } else if (this.token.headerOrQueryName) {
            headers[this.token.headerOrQueryName] = this.token.value;
        } else {
            headers['Authorization'] = 'Bearer ' + this.token.value;
        }

        if (parameters['latitude'] !== undefined) {
            queryParameters['latitude'] = parameters['latitude'];
        }

        if (parameters['longitude'] !== undefined) {
            queryParameters['longitude'] = parameters['longitude'];
        }

        if (parameters['radius'] !== undefined) {
            queryParameters['radius'] = parameters['radius'];
        }

        if (parameters['address'] !== undefined) {
            queryParameters['address'] = parameters['address'];
        }

        if (parameters['country'] !== undefined) {
            queryParameters['country'] = parameters['country'];
        }

        if (parameters['state'] !== undefined) {
            queryParameters['state'] = parameters['state'];
        }

        if (parameters['county'] !== undefined) {
            queryParameters['county'] = parameters['county'];
        }

        if (parameters['city'] !== undefined) {
            queryParameters['city'] = parameters['city'];
        }

        if (parameters['postalCode'] !== undefined) {
            queryParameters['postalCode'] = parameters['postalCode'];
        }

        if (parameters['limit'] !== undefined) {
            queryParameters['limit'] = parameters['limit'];
        }

        if (parameters['offset'] !== undefined) {
            queryParameters['offset'] = parameters['offset'];
        }

        if (parameters['acceptLanguage'] !== undefined) {
            headers['Accept-Language'] = parameters['acceptLanguage'];
        }

        if (parameters['callback'] !== undefined) {
            queryParameters['callback'] = parameters['callback'];
        }

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters)
                .forEach(function(parameterName) {
                    var parameter = parameters.$queryParameters[parameterName];
                    queryParameters[parameterName] = parameter;
                });
        }

        var req = {
            method: 'GET',
            uri: domain + path,
            qs: queryParameters,
            headers: headers,
            body: body,
            encoding: null
        };
        if (Object.keys(form).length > 0) {
            req.formData = form;
        }
        if (typeof(body) === 'object' && !(body instanceof Buffer)) {
            req.json = true;
        }
        request(req, function(error, response, body) {
            if (error) {
                deferred.reject(error);
            } else {
                if (/^application\/(.*\\+)?json/.test(response.headers['content-type'])) {
                    try {
                        body = JSON.parse(body);
                    } catch (e) {

                    }
                }
                if (response.statusCode === 204) {
                    deferred.resolve({
                        response: response
                    });
                } else if (response.statusCode >= 200 && response.statusCode <= 299) {
                    deferred.resolve({
                        response: response,
                        body: body
                    });
                } else {
                    deferred.reject({
                        response: response,
                        body: body
                    });
                }
            }
        });

        return deferred.promise;
    };
    /**
     * Get a list of `Inspirations` of type `slide show`.

    The main criteria can be:
    * a position and a radius
    * a textual search

    Additional critera can be added.

     * @method
     * @name SystranGeographicApi#getGeographicInspirationsSlideShowsList
     * @param {number} latitude - Latitude location. Musts be used together with `longitude` and `radius` parameters.
     * @param {number} longitude - Longitude location. Musts be used together with `latitude` and `radius` parameters.
     * @param {number} radius - Radius in meters. Musts be used together with `latitude` and `longitude` parameters.
     * @param {string} address - Address
     * @param {string} country - Country
     * @param {string} state - State
     * @param {string} county - County
     * @param {string} city - City
     * @param {string} postalCode - Postal Code
     * @param {integer} limit - Pagination limit
     * @param {integer} offset - Pagination offset
     * @param {string} acceptLanguage - Preferred languages for response localization.

    See [Accept-Language header specification for HTTP
    1.1](http://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.4)

     * @param {string} callback - Javascript callback function name for JSONP Support

     * 
     */
    SystranGeographicApi.prototype.getGeographicInspirationsSlideShowsList = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

        var domain = this.domain;
        var path = '/geographic/inspirations/slideShows/list';

        var body;
        var queryParameters = {};
        var headers = {};
        var form = {};

        if (this.token.isQuery) {
            queryParameters[this.token.headerOrQueryName] = this.token.value;
        } else if (this.token.headerOrQueryName) {
            headers[this.token.headerOrQueryName] = this.token.value;
        } else {
            headers['Authorization'] = 'Bearer ' + this.token.value;
        }

        if (parameters['latitude'] !== undefined) {
            queryParameters['latitude'] = parameters['latitude'];
        }

        if (parameters['longitude'] !== undefined) {
            queryParameters['longitude'] = parameters['longitude'];
        }

        if (parameters['radius'] !== undefined) {
            queryParameters['radius'] = parameters['radius'];
        }

        if (parameters['address'] !== undefined) {
            queryParameters['address'] = parameters['address'];
        }

        if (parameters['country'] !== undefined) {
            queryParameters['country'] = parameters['country'];
        }

        if (parameters['state'] !== undefined) {
            queryParameters['state'] = parameters['state'];
        }

        if (parameters['county'] !== undefined) {
            queryParameters['county'] = parameters['county'];
        }

        if (parameters['city'] !== undefined) {
            queryParameters['city'] = parameters['city'];
        }

        if (parameters['postalCode'] !== undefined) {
            queryParameters['postalCode'] = parameters['postalCode'];
        }

        if (parameters['limit'] !== undefined) {
            queryParameters['limit'] = parameters['limit'];
        }

        if (parameters['offset'] !== undefined) {
            queryParameters['offset'] = parameters['offset'];
        }

        if (parameters['acceptLanguage'] !== undefined) {
            headers['Accept-Language'] = parameters['acceptLanguage'];
        }

        if (parameters['callback'] !== undefined) {
            queryParameters['callback'] = parameters['callback'];
        }

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters)
                .forEach(function(parameterName) {
                    var parameter = parameters.$queryParameters[parameterName];
                    queryParameters[parameterName] = parameter;
                });
        }

        var req = {
            method: 'GET',
            uri: domain + path,
            qs: queryParameters,
            headers: headers,
            body: body,
            encoding: null
        };
        if (Object.keys(form).length > 0) {
            req.formData = form;
        }
        if (typeof(body) === 'object' && !(body instanceof Buffer)) {
            req.json = true;
        }
        request(req, function(error, response, body) {
            if (error) {
                deferred.reject(error);
            } else {
                if (/^application\/(.*\\+)?json/.test(response.headers['content-type'])) {
                    try {
                        body = JSON.parse(body);
                    } catch (e) {

                    }
                }
                if (response.statusCode === 204) {
                    deferred.resolve({
                        response: response
                    });
                } else if (response.statusCode >= 200 && response.statusCode <= 299) {
                    deferred.resolve({
                        response: response,
                        body: body
                    });
                } else {
                    deferred.reject({
                        response: response,
                        body: body
                    });
                }
            }
        });

        return deferred.promise;
    };
    /**
     * Get a list of `Inspirations` of type `test`.

    The main criteria can be:
    * a position and a radius
    * a textual search

    Additional critera can be added.

     * @method
     * @name SystranGeographicApi#getGeographicInspirationsTestsList
     * @param {number} latitude - Latitude location. Musts be used together with `longitude` and `radius` parameters.
     * @param {number} longitude - Longitude location. Musts be used together with `latitude` and `radius` parameters.
     * @param {number} radius - Radius in meters. Musts be used together with `latitude` and `longitude` parameters.
     * @param {string} address - Address
     * @param {string} country - Country
     * @param {string} state - State
     * @param {string} county - County
     * @param {string} city - City
     * @param {string} postalCode - Postal Code
     * @param {integer} limit - Pagination limit
     * @param {integer} offset - Pagination offset
     * @param {string} acceptLanguage - Preferred languages for response localization.

    See [Accept-Language header specification for HTTP
    1.1](http://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.4)

     * @param {string} callback - Javascript callback function name for JSONP Support

     * 
     */
    SystranGeographicApi.prototype.getGeographicInspirationsTestsList = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

        var domain = this.domain;
        var path = '/geographic/inspirations/tests/list';

        var body;
        var queryParameters = {};
        var headers = {};
        var form = {};

        if (this.token.isQuery) {
            queryParameters[this.token.headerOrQueryName] = this.token.value;
        } else if (this.token.headerOrQueryName) {
            headers[this.token.headerOrQueryName] = this.token.value;
        } else {
            headers['Authorization'] = 'Bearer ' + this.token.value;
        }

        if (parameters['latitude'] !== undefined) {
            queryParameters['latitude'] = parameters['latitude'];
        }

        if (parameters['longitude'] !== undefined) {
            queryParameters['longitude'] = parameters['longitude'];
        }

        if (parameters['radius'] !== undefined) {
            queryParameters['radius'] = parameters['radius'];
        }

        if (parameters['address'] !== undefined) {
            queryParameters['address'] = parameters['address'];
        }

        if (parameters['country'] !== undefined) {
            queryParameters['country'] = parameters['country'];
        }

        if (parameters['state'] !== undefined) {
            queryParameters['state'] = parameters['state'];
        }

        if (parameters['county'] !== undefined) {
            queryParameters['county'] = parameters['county'];
        }

        if (parameters['city'] !== undefined) {
            queryParameters['city'] = parameters['city'];
        }

        if (parameters['postalCode'] !== undefined) {
            queryParameters['postalCode'] = parameters['postalCode'];
        }

        if (parameters['limit'] !== undefined) {
            queryParameters['limit'] = parameters['limit'];
        }

        if (parameters['offset'] !== undefined) {
            queryParameters['offset'] = parameters['offset'];
        }

        if (parameters['acceptLanguage'] !== undefined) {
            headers['Accept-Language'] = parameters['acceptLanguage'];
        }

        if (parameters['callback'] !== undefined) {
            queryParameters['callback'] = parameters['callback'];
        }

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters)
                .forEach(function(parameterName) {
                    var parameter = parameters.$queryParameters[parameterName];
                    queryParameters[parameterName] = parameter;
                });
        }

        var req = {
            method: 'GET',
            uri: domain + path,
            qs: queryParameters,
            headers: headers,
            body: body,
            encoding: null
        };
        if (Object.keys(form).length > 0) {
            req.formData = form;
        }
        if (typeof(body) === 'object' && !(body instanceof Buffer)) {
            req.json = true;
        }
        request(req, function(error, response, body) {
            if (error) {
                deferred.reject(error);
            } else {
                if (/^application\/(.*\\+)?json/.test(response.headers['content-type'])) {
                    try {
                        body = JSON.parse(body);
                    } catch (e) {

                    }
                }
                if (response.statusCode === 204) {
                    deferred.resolve({
                        response: response
                    });
                } else if (response.statusCode >= 200 && response.statusCode <= 299) {
                    deferred.resolve({
                        response: response,
                        body: body
                    });
                } else {
                    deferred.reject({
                        response: response,
                        body: body
                    });
                }
            }
        });

        return deferred.promise;
    };
    /**
     * Get a specific `Inspiration`.
     * @method
     * @name SystranGeographicApi#getGeographicInspirationsGet
     * @param {string} id - Inspiration identifier
     * @param {string} acceptLanguage - Preferred languages for response localization.

    See [Accept-Language header specification for HTTP
    1.1](http://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.4)

     * @param {string} callback - Javascript callback function name for JSONP Support

     * 
     */
    SystranGeographicApi.prototype.getGeographicInspirationsGet = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

        var domain = this.domain;
        var path = '/geographic/inspirations/get';

        var body;
        var queryParameters = {};
        var headers = {};
        var form = {};

        if (this.token.isQuery) {
            queryParameters[this.token.headerOrQueryName] = this.token.value;
        } else if (this.token.headerOrQueryName) {
            headers[this.token.headerOrQueryName] = this.token.value;
        } else {
            headers['Authorization'] = 'Bearer ' + this.token.value;
        }

        if (parameters['id'] !== undefined) {
            queryParameters['id'] = parameters['id'];
        }

        if (parameters['id'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: id'));
            return deferred.promise;
        }

        if (parameters['acceptLanguage'] !== undefined) {
            headers['Accept-Language'] = parameters['acceptLanguage'];
        }

        if (parameters['callback'] !== undefined) {
            queryParameters['callback'] = parameters['callback'];
        }

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters)
                .forEach(function(parameterName) {
                    var parameter = parameters.$queryParameters[parameterName];
                    queryParameters[parameterName] = parameter;
                });
        }

        var req = {
            method: 'GET',
            uri: domain + path,
            qs: queryParameters,
            headers: headers,
            body: body,
            encoding: null
        };
        if (Object.keys(form).length > 0) {
            req.formData = form;
        }
        if (typeof(body) === 'object' && !(body instanceof Buffer)) {
            req.json = true;
        }
        request(req, function(error, response, body) {
            if (error) {
                deferred.reject(error);
            } else {
                if (/^application\/(.*\\+)?json/.test(response.headers['content-type'])) {
                    try {
                        body = JSON.parse(body);
                    } catch (e) {

                    }
                }
                if (response.statusCode === 204) {
                    deferred.resolve({
                        response: response
                    });
                } else if (response.statusCode >= 200 && response.statusCode <= 299) {
                    deferred.resolve({
                        response: response,
                        body: body
                    });
                } else {
                    deferred.reject({
                        response: response,
                        body: body
                    });
                }
            }
        });

        return deferred.promise;
    };

    return SystranGeographicApi;
})();

exports.SystranGeographicApi = SystranGeographicApi;