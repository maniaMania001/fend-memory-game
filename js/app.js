// cards array holds all cards
var list = ['fa fa-diamond','fa fa-diamond','fa fa-paper-plane-o','fa fa-paper-plane-o','fa fa-anchor','fa fa-anchor','fa fa-bolt','fa fa-bolt','fa fa-cube','fa fa-cube','fa fa-leaf','fa fa-leaf','fa fa-bicycle','fa fa-bicycle','fa fa-bomb','fa fa-bomb']
// declaring move variable
let moves=0;
let count=document.querySelector(".moves");
// declaring variables for matchedCards
let match=document.querySelector(".match");
// declaring variable for star icons
let stars=5;
// arry for opened cards
var openCard=[];
// @description for shuffles cards
// @returns shuffledarray
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
};

// deck of all cards in game

$(".deck .card").click(function(){
    $(this).addClass("open show disabled")
    $(this).children().attr('class');
    if(openCard.length===0){
        var card1=$(this).children().attr('class');
        openCard.push(card1);
          moveCounter();
    }else if(openCard.length===1){
        var card2=$(this).children().attr('class');
        openCard.push(card2);
       

        // @description for cards match
        if(openCard[0] === openCard[1]){
            $('.'+openCard[0].slice(3)).parent().attr('class','card match').css({'pointer-events':'none'});
            $('.'+openCard[1].slice(3)).parent().attr('class','card match').css({'pointer-events':'none'});
            openCard.pop();
            openCard.pop();
            matched();
        } 
        // description when cards don't match
        else if(openCard[0] !== openCard[1]){
         setTimeout(function(){
            $('.'+openCard[0].slice(3)).parent().attr('class','card unmatched');
            $('.'+openCard[1].slice(3)).parent().attr('class','card unmatched');     
            openCard.pop();
            openCard.pop();
          },200);
        }
    }
});

// description for game timer

var second = 0, minute = 0;
var timer = document.querySelector(".timer");
var interval;
function startTimer(){
    interval = setInterval(function(){
        timer.innerHTML = minute+':'+second;
        second++;
        if(second == 60){
            minute++;
            second = 0;
        }
    },1000);
}

// @description function to start a new play

function startgame(){
    // shuffle deck
    $('.deck li').attr("class","card")
    deck = shuffle(list);
    var index = 0;
    $.each($(".card i"),function(){
        $(this).attr("class",deck[index]);
        index++;
    });
};

//@description for count player's moves and  setting star ratings based on moves

function moveCounter(){
    moves++;
    if(moves==1){
        startTimer();
    }
    console.log(moves)
    count.innerHTML = moves;
    if(moves==15){
        $('.fa-star').last().attr('class'," fa fa-star-o");
        stars--;
    }
    else if(moves==20){
        $('.fa-star').last().attr('class'," fa fa-star-o");
        stars--;
    }
    else if(moves==25){
        $('.fa-star').last().attr('class'," fa fa-star-o");
        stars--;
    }
    else if(moves==30){
        $('.fa-star').last().attr('class'," fa fa-star-o");
        stars--;
    }
}

//@description to rest moves

function clearCount(){
    moves=0;
    count.innerHTML= moves;
}

//@description to restart game

function restart(){
    $('.fa-star-o').attr('class','fa fa-star');
    $(".card1").css({'pointer-events':'none'});
    startgame();
    clearCount();
    clearTimeInterval();
    openCard=[];
}

//@description reset timer

function clearTimeInterval(){
    second = 0, minute = 0;
    timer.innerHTML="0:0";
    clearInterval(interval);
}

// @description congratulations when all cards match, show modal and moves, time and rating

function matched(){
    match++;
    match.innerHTML=match;
    if (match==8) {
        var time =timer.innerHTML;
        swal({
          title:'your score',
          text: `moves:${moves}\n time:${time}\n starrating:${stars}`,
          button: {
            text: "ok lets play again",
            closeModal: true,
            id:'btn'
          }
        });
        
        $('.swal-button').on('click',function(){
          $(restart);           
        });
        match=0;
        clearInterval(interval);
    }
}

$(startgame);

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
