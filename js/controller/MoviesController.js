app.controller('SearchList',function($scope,$http){

    $scope.movieSearched = {};
    
    $scope.results = {};
    $scope.errors ;
    $scope.searchMovie = function(){
            $http.get('http://www.omdbapi.com/?t='+$scope.movieSearched.title+'&y='+$scope.movieSearched.year)
                        .success(function(data,status,headers,config){
                            $scope.results = data;
                        })
                          .error(function(error){
                              console.log(error);
                          });
    }

    $scope.reset = function(){
        $scope.movieSearched = {};
        $scope.results=  {};

    }

});
