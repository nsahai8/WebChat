(function() {
    angular
        .module('WebChatApp')
        .filter('propsFilter', function() {

            var skip = false;

            var minimum = function(num1, num2, num3) {
                if (num1 < num2 && num1 < num3)
                    return num1;
                else if (num2 < num3)
                    return num2
                else
                    return num3;
            }

            
            return function(items, props) {
                var out = [];
                var newOut = [];
                var score = {};

                var startTime = new Date();

                if (angular.isArray(items)) {
                    items.forEach(function(item) {
                        var itemMatches = false;
                        var score = -1,
                            maxScore = 10000;

                        if (props.name) {
                            skip = false;
                            if (props.name === item.id) {
                                maxScore = -50000;

                            } else {
                                for (var i = 0; i <= (item.name.length - props.name.length); i++) {
                                    if (props.name) {
                                        score = LevenshteinDistance(props.name, item.name.substr(i, props.name.length), i, skip);
                                    }
                                    if (score < maxScore)
                                        maxScore = score;
                                }
                            }
                        } else {
                            itemMatches = true;
                        }
                        if (maxScore != -1)
                            score = maxScore;

                        if (score <= 0 && score != -1) {
                            itemMatches = true;
                        }

                        if (itemMatches) {
                            item.score = score;
                            out.push(item);
                        }
                    });

                } else {
                    // Let the output be the input untouched
                    out = items;
                }

                if (props.name) {
                    out.sort(function(a, b) {
                        return (a.score < b.score) ? -1 : ((a.score > b.score) ? 1 : 0);
                    });
                } else {
                    out.sort(function(a, b) {
                        return (a.name < b.name) ? -1 : ((a.name > b.name) ? 1 : 0);
                    });
                }
                // out = newOut;

                var timeTaken = new Date() - startTime;
                // console.log("time taken : " + timeTaken);
                return out;
                // return newOut;
            }
        });
})();