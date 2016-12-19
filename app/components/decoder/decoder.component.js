'use strict';

angular.module('myApp.decoder.decoder-component', [])

.component('decoder', {
    templateUrl: 'components/decoder/decoder.template.html',
    // require: {
    //     encoder: '^encoder'
    // },
    controller: ['weirdText', '$rootScope', function DecoderController(weirdText, $rootScope) {
        function decode(encoded) {
            let encodedLines = encoded.split('\n');
            let separatorLine = weirdText.separator.replace(/\n/g, "");

            console.log(encodedLines);

            if (encodedLines[1] !== separatorLine)
                throw Error("Don't recognize the encoding!");
            
            let originalWordsLine = encodedLines[encodedLines.length - 1];
            let originalWords = originalWordsLine.split(" ");

            let encodedText = encodedLines.slice(2, encodedLines.length - 2).join("\n");
            
            let tokens = encodedText.split(/(\w+)/);
            let word;

            let decodedTokens = tokens.map((token) => {
                if (weirdText.isTokenEncodable(token)) {
                    for (let i = 0; i < originalWords.length; ++i) {
                        word = originalWords[i];
                        if (weirdText.isEncodedEqualOriginal(token, word)) {
                            token = word;
                            break;
                        }
                    }
                }
                return token;
            });
            
            return decodedTokens.join("");
        }

        this.decode = (encoded) => {
            let decoded = decode(encoded);
            console.log(decoded);  
            $rootScope.$broadcast('decode', decoded);
        };

        $rootScope.$on('encode', (event, data) => {
            console.log(data);
            this.encoded = data;
        });

        this.display = (encoded) => {
            this.encoded = encoded;
        };
    }]
});