angular.module('DEMO_MODULE').directive('pager', function(){
    var link = function(scope, elem, attr){
        scope.prev = function() {
            if(scope.page > 1){
                scope.changePage(--scope.page,scope.pageSize);
            }
        }

        scope.next = function() {
            if(scope.count > scope.page * scope.pageSize){
                scope.changePage(++scope.page,scope.pageSize);
            }   
        }

        scope.pageJump = function() {
            if(!(scope.page && scope.page >= 1 && scope.page <= Math.ceil(scope.count / scope.pageSize))) {
                if(!scope.page || scope.page < 1){
                    scope.page = 1;
                }
                else{
                    scope.page = Math.ceil(scope.count / scope.pageSize);
                }
            }
            scope.changePage(scope.page,scope.pageSize);
        };
    }

    return {
        scope: {
            count: '=',
            page: '=',
            pageSize: '=',
            changePage: '='
        },
        templateUrl: 'app/scripts/directives/pager.html',
        link: link
    };
});