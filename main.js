var movieList=[];
var images=[];
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

        //Movie title 
        var header = document.createElement("h4");
        var movieTitle= document.createTextNode(displayList[i]["movie_title"]);
         
        

        var imdbLink = document.createElement("a");
        imdbLink.setAttribute("href",movieList[i]["movie_imdb_link"]);
        imdbLink.setAttribute("target","_blank");
        header.appendChild(movieTitle);
        imdbLink.appendChild(header);
        div.appendChild(imdbLink);

        var line = document.createElement("hr");
        div.appendChild(line);

        //Movie Actors
        var actors= document.createTextNode(displayList[i]["actor_1_name"]+","+displayList[i]["actor_2_name"]);
        div.appendChild(actors);
        

        var p = document.createElement("p");
        div.appendChild(p);

        //Movie director
        var director= document.createTextNode(displayList[i]["director_name"]);
        div.appendChild(director);

        var p = document.createElement("p");
        div.appendChild(p);

        //Genres
        var genres= document.createTextNode(displayList[i]["genres"]);
        div.appendChild(genres);

        var p = document.createElement("p");
        div.appendChild(p);

        //Language ,Country year
        if(displayList[i]["language"] !="" || displayList[i]["title_year"] != "" || displayList[i]["country"]!=""){
            var langCountryYear= document.createTextNode(displayList[i]["language"]+"|"+displayList[i]["title_year"]+"|"+movieList[i]["country"]);
            div.appendChild(langCountryYear);
        }

        var br1 = document.createElement("br");
        div.appendChild(br1);

         var br2 = document.createElement("br");
        div.appendChild(br2);

         var br3 = document.createElement("br");
        div.appendChild(br3);


         var line2 = document.createElement("hr");
        div.appendChild(line2);

        //plot_keywords
        var plotKeywords= document.createTextNode(displayList[i]["plot_keywords"]);
        div.appendChild(plotKeywords);


        containerDiv.appendChild(div);

        displayImages(displayList[i]["movie_title"],i);

    }
}

function searchMovies(movieStr){

    var searchMovies =[];

    for (var i in movieList){

        if(movieList[i]["movie_title"].includes(movieStr)){
            searchMovies.push(movieList[i]);
        }
        
    }

    console.log(searchMovies);
    displayMovieList(searchMovies);
    
    
}

document.addEventListener("DOMContentLoaded",function(){

    getMovieList("http://starlord.hackerearth.com/movieslisting");
    displayMovieList(movieList);
    
     var movieInput=document.getElementById("movieName");
   

    movieInput.addEventListener("input",function(){

        console.log("Something entered");

        if((movieInput.value).length>=4){
            searchMovies(movieInput.value);
        }else{
            displayMovieList(movieList);
        }


    });

    /*var sortForm= document.getElementById("sortForm");

    sortForm.addEventListener("click",function(){
           console.log("Sort the elemnts");
    });
    */
   

})

function displayImages(movietitle,i){

        if(i<10){
            getImages(movietitle)
            console.log(images);
            var embeddedUrl =  images["Poster"];

            document.getElementsByClassName("movieBox")[i].style.backgroundImage="url("+embeddedUrl+")";
        }
    
}