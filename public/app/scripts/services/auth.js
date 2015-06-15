angular.module('DEMO_MODULE').factory('Auth', function($http, $q){
    return {
        doLogin: function(auth,acct){
            var deferred = $q.defer();

            $http.post('/login',{'authorization':auth,'accountId':acct})
                .success(function(d){
                    deferred.resolve(d);
                })
                .error(function(e){
                    deferred.reject(e);
                });

            return deferred.promise;
        },

        isLoggedIn: function(){
            return window.localStorage["authorization"] && window.localStorage["accountId"];
        }
    }
});