/*
* Name:  Daniel Hope
* Assignment:  Assignment 3
* Date:  Feb. 13, 2017
* 
* Page Description: This page includes all variables and functions to  
* allow the Rock, Paper, Scissors game to work.
* Files: index.html - source of the image container and basic HTML layout
*        style.css - source of the styles for the Rock, Paper, Scissors game
*/

// initialize playing field on page load
document.addEventListener("DOMContentLoaded", init);

// results array that will be used to display out comes of game
var results = ["You Win!", "You Lose!", "It's a Tie!"];

// counter for computer score to be displayed in score box
var compScore = 0;

// counter for player score to be displayed in score box
var playerScore = 0;

// function to populate tags, text, and images in index.html page
function init() {

    // re-usable variable for elements
    var elem;

    // variable to access the image container 
    var imgContainer = document.getElementById("img-container");

    // variable to access the score box
    var scoreBox = document.getElementById("score");

    // create <header> tag with re-usable variable 
    elem = document.createElement("header");

    // place header in body above image container
    document.body.appendChild(elem);
    
    // create <h1> tag for game title
    elem = document.createElement("h1");

    // add text for game title to <h1> tag
    elem.appendChild(document.createTextNode("Rock, Paper, Scissors!"));

    // place <h1> tag inside <header> tag
    document.body.firstElementChild.appendChild(elem);

    // create div element for weapon selection
    elem = document.createElement("div");

    // add div element to html under header
    document.body.insertBefore(elem, document.getElementById("img-container"));

    // add class attribute to div
    elem.className = "game-header";

    // add text to div element
    elem.appendChild(document.createTextNode("Choose your method of \n\
        destruction:"));

    // add images to image container with id and src attributes using the pics
    // array, and register images with click events to allow winning scenarios
    // to be calcuated and displayed
    for (i = 0; i < 3; i++) {
        elem = document.createElement("img");
        imgContainer.appendChild(elem);
        elem.className = "rps-img no-img-border";
        elem.id = pics[i];
        elem.src = "images/" + pics[i] + ".png";
        elem.addEventListener("click", getComputerMove);
        elem.addEventListener("click", move);
    }

    // create div for computer's choice
    elem = document.createElement("div");

    // insert div into html below rock, paper, scissor selections
    document.body.appendChild(elem);

    // assign class to new div
    elem.className = "game-header";

    // add text to new div as a title for computer's choice
    elem.appendChild(document.createTextNode("The computer chooses:"));

    // create table element to display computer's choice
    elem = document.createElement("table");

    // insert table under computer's choice title
    document.body.appendChild(elem);
    
    // create a row for the table and insert into table
    elem.appendChild(document.createElement("tr"));

    // assign row of table to variable
    elem = elem.firstChild;

    // create columns for table
    for (i = 0; i < 2; i++) {
        elem.appendChild(document.createElement("td"));
    }

    // assign first column to variable
    elem = elem.firstElementChild;

    // add image to first column
    elem.appendChild(document.createElement("img"));

    // add class and id names for image in first column
    elem.firstChild.className = "rps-img";
    elem.firstChild.id = "comp-img";

    // add class to last column
    elem.nextElementSibling.className = "vert-center";

    // add div to last column
    elem.nextElementSibling.appendChild(document.createElement("div"));

    // add id to div in last column
    elem.nextElementSibling.firstChild.id = "output";

    // create new div to contain score box
    elem = document.createElement("div");

    // insert new div below table
    document.body.appendChild(elem);
    
    // add id to score box
    elem.id = "score";

    // create 3 div's within score box
    for (i = 0; i < 3; i++) {
        elem.appendChild(document.createElement("div"));
    }
    // add title to score box
    elem.firstChild.appendChild(document.createTextNode("Score:"));

    // add text for user score
    elem.firstChild.nextElementSibling
            .appendChild(document.createTextNode("You:"));

    // add span to next div in score box to show user score
    elem.firstChild.nextElementSibling
            .appendChild(document.createElement("span"));

    // assign second div in score box to variable
    elem = elem.firstChild.nextElementSibling;

    // add id to span tag inside div
    elem.firstElementChild.id = "user-score";
    
    // set user score to zero for start of game
    document.getElementById("user-score")
            .appendChild(document.createTextNode("0"));

    // add text for computer's score
    elem.nextElementSibling.appendChild(document.createTextNode("Computer:"));

    // add span tag to last div in score box
    elem.nextElementSibling.appendChild(document.createElement("span"));

    // assign last div in score box to variable
    elem = elem.nextElementSibling.firstChild;

    // add id to span tag in last div
    elem.nextElementSibling.id = "comp-score";
    
    // set computer score to zero for start of game
    document.getElementById("comp-score")
            .appendChild(document.createTextNode("0"));
    
    // create footer tag
    elem = document.createElement("footer");

    // place footer above script tag to appear at bottom of page
    document.body.appendChild(elem);
    
    // add text to footer tag
    elem.innerHTML = "Copyright &copy 2017 Daniel Hope";
}

// function creates a randomized number to represent computer's choice and 
// displays corrisponding pics from pics array then returns the random number
// to be used in winning scenario calculation
function getComputerMove() {
    
    // generate random number for computer's "choice"
    var compMove = Math.floor((Math.random() * 3));

    // assign and display pic of computer's choice from pics array
    var pic = document.getElementById("comp-img");
    pic.src = "images/" + pics[compMove] + ".png";;

    return compMove;
}

// applies a hightlighted border for player's selection and checks winning
// scenarios
function move() {
    
    // temp variable to hold return value of computer's move to be used in 
    // determining a winner
    var compMove = getComputerMove();
    
    // access images in img-container and set their borders(using for loop) to 
    // no-image giving the apperance of a de-selected item
    elem = document.getElementById("img-container");
    for (i = 0; i < 3; i++) {
        document.querySelector("#" + pics[i]).className = "rps-img no-img-border";
    }
    
    // change class name to highlight the players choice after click
    this.className = "rps-img img-border";
    elem = pics.indexOf(this.id);
    
    
    // check winning scenarios(rock beats scissors, paper beats rock, scissors
    // beats paper)
    if (compMove === elem) // tie
        index = 2;
    else
        if (compMove === 0) // rock
            if (elem === 1) // paper
                index = 0; // player win
            else 
                index = 1; // comp win
        else if (compMove === 1) // paper
            if (elem === 2) // scissors
                index = 0; // player win
            else
                index = 1; // comp win
        else if (compMove === 2) // scissors
            if (elem === 0) // rock
                index = 0; // player win
            else
                index = 1; // comp win
    
    // Add to win count of computer or player(unless it's a tie) 
    // and display score as well as a message as to who won that round
    document.getElementById("output").innerHTML = results[index];
    if (index === 0) {
        playerScore++;
        document.getElementById("user-score").innerHTML = playerScore;
    } else if (index === 1) {
        compScore++;
        document.getElementById("comp-score").innerHTML = compScore;
    }
}


// DON'T TOUCH THESE LINES --------------
// array of moves/ids
var pics = ["rock", "paper", "scissors"];
// load the page elements
document.addEventListener("DOMContentLoaded", init(), false);
// --------------------------------------