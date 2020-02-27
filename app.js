/*
Build all of your functions for displaying and gathering information below (GUI).
*/

// app is the function called to start the entire application
function app(people){

  var searchType = promptFor("Do you know the name of the person you are looking for? Enter 'yes' or 'no'", yesNo).toLowerCase();
  switch(searchType){
    case 'yes':
      // TODO: search by name
      searchByName(people);
      break;
    case 'no':
      // TODO: search by traits
      searchByTrait(people);
      break;
    default:
      alert("Invalid input. Please try again!");
      app(people); // restart app
    break;
  }
}

// Menu function to call once you find who you are looking for
function mainMenu(person, people){

  /* Here we pass in the entire person object that we found in our search, as well as the entire original dataset of people. We need people in order to find descendants and other information that the user may want. */

  if(!person){
    alert("Could not find that individual.");
    return app(people); // restart
  }

  var displayOption = prompt("Found " + person.firstName + " " + person.lastName + " . Do you want to know their 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'");

  switch(displayOption){
    case "info":
      // TODO: get person's info
      displayPerson(person);
      break;
    case "family":
      // TODO: get person's family
      
      break;
    case "descendants":
      // TODO: get person's descendants
      displayDescendants(person, people);
      break;
    case "restart":
      app(people); // restart
      break;
    case "quit":
      return; // stop execution
    default:
      return mainMenu(person, people); // ask again
  }
}

function searchByName(people){
  var firstName = promptFor("What is the person's first name?", chars);
  var lastName = promptFor("What is the person's last name?", chars);

  let filteredPeople = people.filter(function(el) {
    if(el.firstName === firstName && el.lastName === lastName) {
      return el;
    }
  });
  mainMenu(filteredPeople[0], people);
}
//const traits = ["gender", "dob", "height", "weight", "eyeColor", "occupation"];

function getSearchTraits(){
  var parameters = [];
  var searching = true;
  while (searching) {
    var traits = promptFor("Select Search Criteria: (Enter number and choose when finished)"
                            + "\n1. Gender\n2. Date of Birth\n3. Height\n4. Weight"
                            + "\n5. Eye Color\n6. Occupation\n7. Finished");
    if (traits == "7" || traits.toLowerCase() == "finished") {
      searching = false;
      continue;
    } else {
      parameters = enterSearchTraits(parameters, traits); //create seach function
    }
  }
  return parameters;
}

function enterSearchTraits(search, input){
  switch (input) {
    case "1":
      search.push("gender");
      break;
    case "2":
      search.push("dob");
      break;
    case "3":
      search.push("height");
      break;
    case "4":
      search.push("weight");
      break;
    case "5":
      search.push("eyeColor");
      break;
    case "6":
      search.push("occupation")
    default:
      getPush;
      break;
  }
  return search;
}

function searchByTrait(people){
  var trait = promptFor("What trait would you like to search for?", chars);
//map traits
  switch(trait) {
    case "gender":
      break;
    case "dob":
      break;
    case "height":
      break;
    case "weight":
      break;
    case "eyecolor":
      break;
    case "occupation":
      break;
    default:
      return searchByTrait(people);
  }
}

// alerts a list of people
function displayPeople(people){
  alert(people.map(function(person){
    return person.firstName + " " + person.lastName;
  }).join("\n"));
}

function displayPerson(person){
  // print all of the information about a person:
  // height, weight, age, name, occupation, eye color.
  var personInfo = "First Name: " + person.firstName + "\n";
  personInfo += "Last Name: " + person.lastName + "\n";
  personInfo += "Gender: " + person.gender + "\n";
  personInfo += "Date of Birth: " + person.dob + "\n";
  personInfo += "Height: " + person.height + "\n";
  personInfo += "Weight: " + person.weight + "\n";
  personInfo += "Eye Color: " + person.eyeColor + "\n";
  personInfo += "Occupation: " + person.occupation + "\n";
  alert(personInfo);
}
function displayDescendants(person, people){
  
  var members= person;
  members.push(people.filter(function(el){
    for (let i = 0; i < members.length; i++) {
      if (el.parents == members[i].id) {
        return el.
      }
      
    }
    return el.parents[0] == person.map();

  }));
  if (members.length == person.length) {
     displayPeople(members)
  }
  else{
    displayDescendants(members, people);
  }
  
  
  
  
}

// function that prompts and validates user input
function promptFor(question, callback){
  do{
    var response = prompt(question).trim();
  } while(!response || !callback(response));
  return response;
}

// helper function to pass into promptFor to validate yes/no answers
function yesNo(input){
  return input.toLowerCase() == "yes" || input.toLowerCase() == "no";
}

// helper function to pass in as default promptFor validation
function chars(input){
  return true; // default validation only
}
