app.controller('SearchList',function($scope,$http){

    $scope.movieSearched = {};
    $scope.showLoader = false;
    $scope.results = {};
    $scope.errors = "";
    $scope.hasError = false;
    $scope.hasData = false;
    $scope.autoResults = {};
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

    var searchNew;
    $scope.searchNewMovies = function(){
      
      searchNew = setTimeout(fetch, 1000);
    };

    function fetch() {
      $http.get("https://www.omdbapi.com/?s=" + $scope.movieSearched.title + "&type=movie")
       .success(function(response){  $scope.autoResults = response; 
    });
    }

    $scope.searchMovie = function(movie){
        
        var url;
        var title;
        var year;
        if(movie === undefined){
            title = $scope.movieSearched.title;
            year = $scope.movieSearched.year;
        }
        else
        {
            title =  movie.Title;
            year= movie.Year;
        }
         url = 'http://www.omdbapi.com/?t='+title+'&y='+year;
            $scope.showLoader = true;
            $http.get(url)
                        .success(function(data,status,headers,config){
                            $scope.showLoader = false;
                             $scope.hasError = false;
                             $scope.hasData = true;
                                $scope.movieSearched.title = title;
                                $scope.movieSearched.year = year;
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

    $scope.removeSuggestion = function(){
          $scope.autoResults = {};
    }

});
