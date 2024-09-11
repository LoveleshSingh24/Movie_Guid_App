const searchForm =document.querySelector('form');
const movieContainer =document.querySelector('.movie-container');
const inputBox =document.querySelector('.inputBox');


const showMovieData = (data)=>{
    movieContainer.innerHTML="";
    movieContainer.classList.remove('no-background')
    //destructuring the assignment object to astracat propertuies form data object

    const {Title,imdbRating,Genre,Released,Runtime,Actors,Plot,Poster}=data;

    //creating a div
    const movieElement=document.createElement('div');
    movieElement.classList.add('movie-info');
    movieElement.innerHTML=`<h2>${Title}</h2>                     <p><strong>Rating: &#11088</strong>${imdbRating}</p>` 

    //creating a div 
     const movieGenreElement=document.createElement('div');
    movieGenreElement.classList.add('movie-genre');
    
    Genre.split(",").forEach(element =>{
        const p=document.createElement('p');
        p.innerText = element;
        //adding to movieGenreElement div
        movieGenreElement.appendChild(p);
    });

    movieElement.appendChild(movieGenreElement);
    
    movieElement.innerHTML += `<p><strong>Release Data :</strong>${Released}</p>
    <p><strong>Duration :</strong>${Runtime }</p>
    <p><strong>Cast :</strong>${Actors}</p>
    <p><strong>Plot :</strong>${Plot}</p>`

    const moviePosterElement = document.createElement('div');
    moviePosterElement.classList.add('movie-poster');
    moviePosterElement.innerHTML=`<img src="${Poster}" alt="Poster"/>`
    
    movieContainer.appendChild(moviePosterElement);
    movieContainer.appendChild(movieElement);
};

const getMovieInfo = async (movie) => {
    try {
        const url = `/api/getMovieInfo?movie=${movie}`;  // Call the Netlify serverless function
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Unable to fetch Movie Data");
        }
        const data = await response.json();
        showMovieData(data);  // Display movie data
    } catch (error) {
        showErrorMessage("No Movie Found!!!");
    }
};


// function to display error message

const showErrorMessage = (message)=>{
    movieContainer.innerHTML=`<h2>${message}</h2>`
    movieContainer.classList.add('no-background');

}



const handleFormSubmmission =(e)=>{
    e.preventDefault();
    const movieName=inputBox.value.trim();

    if(movieName!==""){
        showErrorMessage("Fetching Movie Information...")
        getMovieInfo(movieName);
    }else{
        
        movieContainer.innerHTML=`<h2>Enter movie name to get movie info</h2>`
        movieContainer.classList.add(no-background)
        
    }
}

// adding event listerner to search form
searchForm.addEventListener('submit',handleFormSubmmission);


