'use strict';

angular.module('myApp.weird-text', [])

.factory('weirdText', [function() {
    let separator = '\n---weird---\n';

    function isTokenEncodable(token) {
        if (token.length < 4) return false;
        if (/\w/.test(token[0]) === false) return false;

        let letter = token[1];
        for (let i = 2; i < token.length - 1; ++i) {
            if (token[i] !== letter) {
                return true;
            }
        }
        return false;
    }

    function isEncodedEqualOriginal(encoded, original) {
        if (encoded.length !== original.length) return false;
        let length = encoded.length;

        if (encoded[0] !== original[0]) return false;
        if (encoded[length - 1] !== original[length - 1]) return false;

        let randomizedLetters = encoded.slice(1, length - 1);
        let originalLetters = original.slice(1, length - 1);

        let sortedRandomized = randomizedLetters.split("").sort().join("");
        let sortedOriginal = originalLetters.split("").sort().join("");

        if (sortedRandomized !== sortedOriginal) return false;

        return true;
    }

    return {
        isTokenEncodable,
        isEncodedEqualOriginal,
        separator
    }
}]);