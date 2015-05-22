angular.module('DEMO_MODULE').factory('Auth', function($http, $q){
    return {
        doLogin: function(username,password){
            var deferred = $q.defer();

            $http.post('/login',{'username':username,'password':password})
                .success(function(d){
                    deferred.resolve(d);
                })
                .error(function(e){
                    deferred.reject(e);
                });

            return deferred.promise;
        },

        isLoggedIn: function(){
            return window.localStorage["auth_token"];
        }
    }
});