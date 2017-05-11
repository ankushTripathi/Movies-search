app.controller('SearchList',function($scope,$http){

    $scope.movieSearched = {};
    
    $scope.results = {};
    $scope.errors = {};
    $scope.searchMovie = function(){
        var url;
        if($scope.movieSearched.title===undefined && $scope.movieSearched.year === undefined)
           $scope.errors = {"error": "Enter Movie Title or Year"}; 
        else if($scope.movieSearched.title===undefined)
            url = 'http://www.omdbapi.com/?y='+$scope.movieSearched.year;
        else
            url = 'http://www.omdbapi.com/?t='+$scope.movieSearched.title+'&y='+$scope.movieSearched.year;

            $http.get(url)
                        .success(function(data,status,headers,config){
                            if(status === 200)
                             $scope.results = data;
                             else
                                { 
                                    console.log(data);
                                    $scope.errors = data;
                                }

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
