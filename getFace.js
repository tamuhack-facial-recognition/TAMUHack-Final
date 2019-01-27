'use strict';
var part2 = require('./calling.js');

part2.detect().then(pf_Id => {

    const request = require('request');

    // Replace <Subscription Key> with your valid subscription key.
    const subscriptionKey = 'fbd46b617b604099b8a85f9f17587013';

    // You must use the same location in your REST call as you used to get your
    // subscription keys. For example, if you got your subscription keys from
    // westus, replace "westcentralus" in the URL below with "westus".
    const uriBase = 'https://southcentralus.api.cognitive.microsoft.com/face/v1.0/largefacelists/waterman_tamuhack1/persistedfaces/{9ffac3bc-9235-4a7b-b7af-6440aff25c8d}';

    // Request parameters.
    const params = {
        'largeFaceListId': 'waterman_tamuhack1',
        'persistedFaceId': pf_Id
    };

    const options = {
        uri: uriBase,
        qs: params,
        headers: {
            'Content-Type': 'application/json',
            'Ocp-Apim-Subscription-Key' : subscriptionKey
        }
    };

    request.get(options, (error, response, body) => {
    if (error) {
        console.log('Error: ', error);
        return;
    }
    let jsonResponse = JSON.parse(body);
    //console.log('JSON Response\n');
    console.log("\nBest Match: "+jsonResponse["userData"] + "\n");
    });

})