angular.module('DEMO_MODULE').directive('chart', function(){
    var linkFn = function(scope, elem, attrs){
        if(!attrs.id || attrs.id.length==0){
            console.error("Chart element must have an id");
        }
        var chart = new CanvasJS.Chart(attrs.id,scope.options);
        chart.render();
        scope.$watch('options.data', function(newVal, oldVal){
            chart.render();
        }, scope.deepWatchData);

    }
    return {
        link: linkFn,
        scope: {
            options: '=',
            deepWatchData: '=',
        }
    } 
});