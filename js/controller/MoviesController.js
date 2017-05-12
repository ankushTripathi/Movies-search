app.controller('SearchList',function($scope,$http){

    $scope.movieSearched = {};
    $scope.showLoader = false;
    $scope.results = {};
    $scope.errors = "";
    $scope.hasError = false;
    $scope.hasData = false;
    $scope.movieData = function(){
        var filtered = JSON.parse(JSON.stringify($scope.results));;
        var keys = Object.keys(filtered);
         for(var i=0;i<keys.length;i++){
              if(filtered[keys[i]] === "N/A")
                 delete filtered[keys[i]];
             if(keys[i] == 'Ratings' || keys[i] === 'Plot' || keys[i] === 'Poster')
                 delete filtered[keys[i]];
         }
        return filtered;
    }
    $scope.searchMovie = function(){
        var url = 'http://www.omdbapi.com/?t='+$scope.movieSearched.title+'&y='+$scope.movieSearched.year;
            $scope.showLoader = true;
            $http.get(url)
                        .success(function(data,status,headers,config){
                            $scope.showLoader = false;
                             $scope.hasError = false;
                             $scope.hasData = true;
                                if(data.Response === "False")
                                   { 
                                       $scope.hasError = true;
                                       $scope.hasData = false;
                                       $scope.errors = data.Error;
                                           $scope.movieSearched = {};
                                            $scope.results=  {};
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
         $scope.hasData = false;
        $scope.movieSearched = {};
        $scope.results=  {};
        $scope.errors = {};

    }

});
