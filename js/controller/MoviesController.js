app.controller('SearchList',function($scope,$http){

    $scope.movieSearched = {};
    $scope.showLoader = false;
    $scope.results = {};
    $scope.errors = {};
    $scope.searchMovie = function(){
        var url;
            url = 'http://www.omdbapi.com/?t='+$scope.movieSearched.title+'&y='+$scope.movieSearched.year;
            $scope.showLoader = true;
            $http.get(url)
                        .success(function(data,status,headers,config){
                            $scope.showLoader = false;
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
