// ! ! !
// Three Bugs
// Bug 1: calling calculateSTI(array[i]) was missing the [i], thus it was passing the same array in each time.
// Bug 2: added Math.round to the output array to round adjusted annual compensation and total bonus values
// Bug 3: getBaseSTI was returning percent - 1.  Should just return percent.
// Hard mode: added .join(" ") to array output to have spaces instead of ,
// Pro mode: set attribute on the ul element identified by 'content' to get rid of bullets
// Replaced employee arrays with employee objects.
// Changed DOM functionality to use jQuery.

//var arrayAtticus = ["Atticus", "2405", "47000", 3];
//var arrayJem = ["Jem", "62347", "63500", 4];
//var arrayBoo = ["Boo", "11435", "54000", 3];
//var arrayScout = ["Scout", "6243", "74750", 5];
var outputObject = {
    employeeName : "",
    percentSTI : 0,
    adjAnnualComp : 0,
    totalBonus : 0,
};
var objectAtticus = {
  employeeName : "Atticus", 
  employeeNumber :"2405", 
  baseSalary : "47000", 
  reviewScore : 3
};
var objectJem = {
  employeeName : "Jem", 
  employeeNumber :"62347", 
  baseSalary : "63500", 
  reviewScore : 4
};
var objectBoo = {
  employeeName : "Boo", 
  employeeNumber :"11435", 
  baseSalary : "54000", 
  reviewScore : 3
};
var objectScout = {
  employeeName : "Scout", 
  employeeNumber :"6243", 
  baseSalary : "74750", 
  reviewScore : 5
};

// add objects into an array
var array = [objectAtticus, objectJem, objectBoo, objectScout];

$(document).ready(function(){

  $("#content").on('click', '.someButton', function() {
    //console.log($(this).parent().find('p').text());
    $(this).parent().remove();
  });

  //Loop the array, extracting each object and writing information to the DOM
  for(var i = 0; i < array.length; i++){
    outputObject = calculateSTI(array[i]); 

    $("#content").append("<div class='userContainer'></div>");

    var $el = $("#content").children().last();
    $el.append("<p>" + outputObject.employeeName +"</p>");
    $el.append("<p>" + outputObject.percentSTI +"</p>");
    $el.append("<p>" + outputObject.adjAnnualComp  +"</p>");
    $el.append("<p>" + outputObject.totalBonus +"</p>");
    $el.append("<button class='someButton'>Click me</button>");
  }
 });

function calculateSTI(empObject){

  var newObject = {
    employeeName : empObject.employeeName,
    percentSTI : 0,
    adjAnnualComp : 0,
    totalBonus : 0
  };

  var employeeNumber = empObject.employeeNumber;
  var baseSalary = empObject.baseSalary;
  var reviewScore = empObject.reviewScore;

  var bonus = getBaseSTI(reviewScore) + getYearAdjustment(employeeNumber) - getIncomeAdjustment(baseSalary);
  if(bonus > 0.13){
    bonus = 0.13;
  }

  newObject.percentSTI = bonus;
  newObject.adjAnnualComp = Math.round(baseSalary * (1.0 + bonus)); //added Math.round
  newObject.totalBonus = Math.round(baseSalary * bonus); //added Math.round
  console.log(newObject.employeeName + " " + newObject.percentSTI + " " + newObject.adjAnnualComp + " " + newObject.totalBonus);
  return newObject;
}

function getBaseSTI(reviewScore){
  var basePercent;
  switch(reviewScore){
    case 1:
      basePercent = 0;
      break;
    case 2:
      basePercent = 0;
      break;
    case 3:
      basePercent = 0.04;
      break;
    case 4:
      basePercent = 0.06;
      break;
    case 5:
      basePercent = 0.10;
      break;
  }
//  return basePercent - 1; (old code)
    return basePercent;
}

function getYearAdjustment(employeeNumber){
  var yearAdjustment = 0;
  if(employeeNumber.length == 4){
    yearAdjustment = 0.05;
  }
  return yearAdjustment;
}

function getIncomeAdjustment(salary){
  var incomeAdjustment = 0;
  salary = parseInt(salary);
  if(salary > 65000){
    incomeAdjustment = 0.01;
  }
  return incomeAdjustment;
}