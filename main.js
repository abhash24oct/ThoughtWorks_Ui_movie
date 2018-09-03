var movieList=[];
var images=[];
var searchMoviesList=[];
function getMovieList(url){
    
    if(window.XMLHttpRequest){
		request= new XMLHttpRequest();
	}else if(window.ActiveXObject){
		request = new ActiveObject("Microsoft.XMLHTTP");
	}
	
	try{
		request.open("GET",url,false);
		request.onreadystatechange=function(){
			if(this.readyState==4 &&  this.status == 200){
	    			
	    			var response= request.responseText;
	    			movieList= JSON.parse(response);
	    			
	    	}	
		};
		request.send(null);
		
	}catch(e){
		console.log("Oops something went wrongn");
    } 
    
};


function getImages(q){

    var url="http://www.omdbapi.com/?apikey=37724d1d&t="+q;

    console.log(url);
    if(window.XMLHttpRequest){
		request= new XMLHttpRequest();
	}else if(window.ActiveXObject){
		request = new ActiveObject("Microsoft.XMLHTTP");
	}
	
	try{
		request.open("GET",url,false);
		request.onreadystatechange=function(){
			if(this.readyState==4 &&  this.status == 200){
	    			
	    			var response= request.responseText;
	    			images= JSON.parse(response);
	    			
	    	}	
		};
		request.send(null);
		
	}catch(e){
		console.log("Oops something went wrongn");
    } 
}

function displayMovieList(displayList){

    console.log("In display list ");
    var  containerDiv = document.getElementById("movies");
    containerDiv.innerText="";
    for (var i in displayList){
        console.log(displayList[i]["movie_title"]);


        var div = document.createElement("div");
        div.setAttribute("class","movieBox");

        var contentdiv = document.createElement("div");
        contentdiv.setAttribute("class","textdiv");
        //Movie title 
        var header = document.createElement("h4");
        var movieTitle= document.createTextNode(displayList[i]["movie_title"]);
         
        

        var imdbLink = document.createElement("a");
        imdbLink.setAttribute("href",movieList[i]["movie_imdb_link"]);
        imdbLink.setAttribute("target","_blank");
        header.appendChild(movieTitle);
        imdbLink.appendChild(header);
        contentdiv.appendChild(imdbLink);

        var line = document.createElement("hr");
        contentdiv.appendChild(line);

        //Movie Actors
        var actors= document.createTextNode(displayList[i]["actor_1_name"]+","+displayList[i]["actor_2_name"]);
        contentdiv.appendChild(actors);
        

        var p = document.createElement("p");
        contentdiv.appendChild(p);

        //Movie director
        var director= document.createTextNode(displayList[i]["director_name"]);
        contentdiv.appendChild(director);

        var p = document.createElement("p");
        contentdiv.appendChild(p);

        //Genres
        var genres= document.createTextNode(displayList[i]["genres"]);
        contentdiv.appendChild(genres);

        var p = document.createElement("p");
        contentdiv.appendChild(p);

        //Language ,Country year
        if(displayList[i]["language"] !="" || displayList[i]["title_year"] != "" || displayList[i]["country"]!=""){
            var langCountryYear= document.createTextNode(displayList[i]["language"]+"|"+displayList[i]["title_year"]+"|"+movieList[i]["country"]);
            contentdiv.appendChild(langCountryYear);
        }

        var br1 = document.createElement("br");
        contentdiv.appendChild(br1);

         var br2 = document.createElement("br");
         contentdiv.appendChild(br2);

         var br3 = document.createElement("br");
         contentdiv.appendChild(br3);


         var line2 = document.createElement("hr");
         contentdiv.appendChild(line2);

        //plot_keywords
        var plotKeywords= document.createTextNode(displayList[i]["plot_keywords"]);
        contentdiv.appendChild(plotKeywords);

        div.appendChild(contentdiv);
        containerDiv.appendChild(div);

        displayImages(displayList[i]["movie_title"],i);

    }
    
}

function searchMovies(movieStr){    

    
   console.log(movieStr);
    for (var i in movieList){

        if(movieList[i]["movie_title"].includes(movieStr)){
            searchMoviesList.push(movieList[i]);
        }
        
    }

    console.log(searchMoviesList);
    
    displayMovieList(searchMoviesList);
    
    
}

document.addEventListener("DOMContentLoaded",function(){

    getMovieList("http://starlord.hackerearth.com/movieslisting");
    displayMovieList(movieList);
    
     var movieInput=document.getElementById("movieName");
   

    movieInput.addEventListener("input",function(){

        console.log("Something entered");

        if((movieInput.value).length>=4){
            searchMoviesList=[];
            searchMovies(movieInput.value);
        }else{
            searchMoviesList=[];
            displayMovieList(movieList);
        }


    });

    var sortbyYear= document.getElementById("sortbyYear");

    sortbyYear.addEventListener("click",function(){
           console.log("Sort the elemnts");
           sortElements("year");
    });
    
    var sortbyCountry= document.getElementById("sortbyCountry");

    sortbyCountry.addEventListener("click",function(){
           console.log("Sort the elemnts ");
           sortElements("country");
    });
   

})

function displayImages(movietitle,i){

        if(i<10){
            getImages(movietitle)
            console.log(images);
            var embeddedUrl =  images["Poster"];

            document.getElementsByClassName("movieBox")[i].style.backgroundImage="url("+embeddedUrl+")";
        }
    
}

function sortElements(attrib){

    
    if(searchMoviesList==""){

        if(attrib=="year"){
            movieList.sort(function (a, b) {
                return a.title_year - b.title_year;
            })    
        } else{
            movieList.sort(function (a, b) {
                var nameA = a.country.toUpperCase(); 
                var nameB = b.country.toUpperCase(); 
                if (nameA < nameB) {
                  return -1;
                }
                if (nameA > nameB) {
                  return 1;
                }
                 // names must be equal
                return 0;
            }
        )  
        }
        console.log(movieList); 
        displayMovieList(movieList);
    }else{
        if(attrib=="year"){
            searchMoviesList.sort(function (a, b) {
                return a.title_year - b.title_year;
            })    
        } else{
            searchMoviesList.sort(function (a, b) {
                var nameA = a.country.toUpperCase(); 
                var nameB = b.country.toUpperCase(); 
                if (nameA < nameB) {
                  return -1;
                }
                if (nameA > nameB) {
                  return 1;
                }
                 // names must be equal
                return 0;
            }
        )  
        }
        console.log(searchMoviesList); 
        displayMovieList(searchMoviesList);
       
    }
}