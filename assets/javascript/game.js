//chooses a random number from 19 - 120 
var targetNum = Math.floor((Math.random() * 120) + 19);
$("#yourTarget").text(targetNum);

//chooses numbers between 1 and 12 by pushing to an empty array and splicing them out to avoid duplicates
var numberOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
var values = [];
//function to replenish values to select a new group of four for each round
function replenishValues(){
    for (i=0; i<4; i++){
        var randomChoice = Math.floor(Math.random() * numberOptions.length);
        values.push(numberOptions[randomChoice]);
        numberPosition = numberOptions.indexOf(numberOptions[randomChoice]);
        numberOptions.splice(numberPosition, 1);
    }
    console.log(values);
}
//function to empty out values before replenishing
function emptyValues(){
    values = [];
}
replenishValues();

//counter variables
var score = 0;
$("#scoredisplay").text(score);
var wins = 0;
$("#winCount").text(wins);
var losses = 0;
$("#lossCount").text(losses);

//for all modals, close when clicking x button
$(".close").click(function () {
    $(this).parents(".modal").css("display", "none");
});

//dynamically generate a crystal for each value in the array and append to crystalCollection
for (i = 0; i < values.length; i++) {
    var crystalHolder = $("<div>");
    crystalHolder.addClass("col-xs-12 col-sm-6 col-md-6 crystalContainer");
    crystalHolder.attr("id", "crystalHolder" + i);
    if (i % 2 === 0) {
        crystalHolder.addClass("even");
        $("#topRow").append(crystalHolder);
    }
    else {
        crystalHolder.addClass("odd");
        $("#bottomRow").append(crystalHolder);
    }
    var crystal = $("<img>");
    crystal.addClass("crystal-image");
    crystal.addClass("img-responsive")
    crystal.attr("id", "crystal" + i);
    crystal.attr("data", values[i]);
    crystalHolder.append(crystal);
}
$("#crystal0").attr("src", "assets/images/crystal1.png");
$("#crystal1").attr("src", "assets/images/crystal2.png");
$("#crystal2").attr("src", "assets/images/crystal3.png");
$("#crystal3").attr("src", "assets/images/crystal4.png");

//when user clicks a crystal, get that crystal's value and add it to the score
$(".crystal-image").click(function () {
    var crystalValue = ($(this).attr("data"));
    crystalValue = parseInt(crystalValue);
    score += crystalValue;
    $("#scoredisplay").text(score);
    if (score === targetNum) {
        //display the won round modal when user gets to the correct number
        $("#wonRound").css("display", "block");
        wins++;
        $("#winCount").text(wins);
    }
    else if (score >= targetNum) {
        //display the lost round modal if score is over
        $("#lostRound").css("display", "block");
        losses++;
        $("#lossCount").text(losses);
    }
});

$(".roundOverClose").click(function(){
    console.log("closed");
    targetNum = Math.floor((Math.random() * 120) + 19);
    $("#yourTarget").text(targetNum);
    emptyValues();
    replenishValues();
    score = 0;
    $("#scoredisplay").text(score);
    if (wins === 5){
        $("#wonGame").css("display", "block");
    }
    
    if (losses === 5){
        $("#lostGame").css("display", "block");
    }
    
    $(".playagain").click(function() {
        location.reload();
    });
});