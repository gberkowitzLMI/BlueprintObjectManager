angular.module('DEMO_MODULE').controller('User', function($scope, User){
    $scope.menuItems = [
        {
            title:"Users",
            location: "/users"
        }
    ];

    User.query(function(data){
        $scope.users = data;
        $scope.currentUser = data[0];
    });

    $scope.showDetails = function(userID){
        if(!$scope.editing){
            for(var u in $scope.users){
                if($scope.users[u]._id == userID)
                    $scope.currentUser = $scope.users[u];
            }
        }
    }

    $scope.newUser = function(){
        $scope.editing = true;
        $scope.currentUser = new User();
        $scope.users.push($scope.currentUser);
    }

    $scope.createUser = function(){
        if(!$scope.currentUser.username || !$scope.currentUser.password)
            alert("Please provide username and password");
        else{
            $scope.currentUser.$save()
            $scope.editing = false;    
        }
    }

    $scope.cancel = function(){
        $scope.editing = false;
        $scope.currentUser = $scope.users[0];
        $scope.users.splice($scope.users.length-1, 1);
    }

});