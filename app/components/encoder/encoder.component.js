'use strict';

angular.module('myApp.encoder.encoder-component', [])

.component('encoder', {
    templateUrl: "components/encoder/encoder.template.html",
    // require: {
    //     decoder: '^decoder'
    // },
    controller: ['weirdText', '$rootScope', function EncoderController(weirdText, $rootScope) {
        this.decoded ='This is a long looong test sentence,\nwith some big (biiiiig) words!';

        function encode(text) {
            let words = text.split(/(\w+)/);
            console.log(words);
            console.log(weirdText);

            let encodedWords = words.map((word) => {
                let tmp;
                let index;
                let range = [1, word.length - 1];
                let original = word;
                if (weirdText.isTokenEncodable(word)) {
                    while (original === word) {
                        for (let i = range[0]; i <= (range[1] / 2) | 0; ++i) {
                            tmp = word[i];
                            index = ((Math.random() * (range[1] - (word.length / 2) | 0)) | 0) + ((word.length / 2) | 0);
                            word = word.substr(0, i) + word[index] + word.substr(i + 1);
                            word = word.substr(0, index) + tmp + word.substr(index + 1);
                        }
                    }
                }
                return word;
            });

            let sortedWords = words.filter((word) => {
                return weirdText.isTokenEncodable(word);
            }).sort((a, b) => {
                return a.toLowerCase().localeCompare(b.toLowerCase());
            });

            let encoded = weirdText.separator + encodedWords.join("") + weirdText.separator + sortedWords.join(" ");

            return encoded;
        };

        this.encode = (decoded) => {
            console.log('DECODED:', decoded);
            let encoded = encode(decoded);
            console.log(encoded);
            $rootScope.$broadcast('encode', encoded);

            return encoded;
        };

        $rootScope.$on('decode', (event, data) => {
            this.decoded = data;
            console.log(data);
        });

        this.display = (decoded) => {
            this.decoded = decoded;
        };
    }]
});
