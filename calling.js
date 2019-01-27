'use strict';
var another = require('./detect.js');

exports.detect = function () {

    return another.detect().then(faceId => {

        const request = require('request');

        // Replace <Subscription Key> with your valid subscription key.
        const subscriptionKey = 'fbd46b617b604099b8a85f9f17587013';

        // You must use the same location in your REST call as you used to get your
        // subscription keys. For example, if you got your subscription keys from
        // westus, replace "westcentralus" in the URL below with "westus".
        const uriBase = 'https://southcentralus.api.cognitive.microsoft.com/face/v1.0/findsimilars';

        const imageUrl =
            'https://pbs.twimg.com/profile_images/1066768154368663552/GqnW1MDG_400x400.jpg';

        // Request parameters.
        const params = {
        };

        const options = {
            uri: uriBase,
            qs: params,
            body: '{"faceId": "' + faceId + '",\n"largeFaceListId": "waterman_tamuhack1",\n"maxNumOfCandidatesReturned": ' + 10 + ',\n"mode": "matchFace"}',
            headers: {
                'Content-Type': 'application/json',
                'Ocp-Apim-Subscription-Key': subscriptionKey
            }
        };
        return new Promise((resolve, reject) => {
            request.post(options, (error, response, body) => {
                if (error) {
                    reject(e);
                    return;
                }
                let jsonResponse = JSON.parse(body);
                //console.log('JSON Response\n');
                
                console.log("\n")
                console.log(jsonResponse);
                const pf_Id = jsonResponse[0]["persistedFaceId"];
                //console.log(pf_Id);

                resolve(pf_Id)
            });
        })
    })
}