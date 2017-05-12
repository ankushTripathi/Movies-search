app.controller('SearchList',function($scope,$http){

    $scope.movieSearched = {};
    $scope.showLoader = false;
    $scope.results = {};
    $scope.errors = "";
    $scope.hasError = false;
    $scope.searchMovie = function(){
        var url;
            url = 'http://www.omdbapi.com/?t='+$scope.movieSearched.title+'&y='+$scope.movieSearched.year;
            $scope.showLoader = true;
            $http.get(url)
                        .success(function(data,status,headers,config){
                            $scope.showLoader = false;
                             $scope.hasError = false;
                                console.log(data);
                                if(data.Response === "False")
                                   { 
                                       $scope.hasError = true;
                                       $scope.errors = data.Error;
                                    }
                                else
                                 $scope.results = data;

                        })
                          .error(function(error){
                              console.log(error);
                          });
    }

    $scope.reset = function(){
         $scope.hasError = false;
        $scope.movieSearched = {};
        $scope.results=  {};
        $scope.errors = {};

    }

});
