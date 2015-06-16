angular.module('DEMO_MODULE').factory('Auth', function($http, $q){
    return {
        doLogin: function(auth){
            var deferred = $q.defer();
            console.log(auth);
            $http.post('/api/login',{"auth":auth})
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