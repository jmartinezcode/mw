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
      displayPerson(person);
      break;
    case "family":
      // TODO: get person's family
      displayFamily(person, people);
      break;
    case "descendants":
      // TODO: get person's descendants
      displayPeople(displayDescendants(person, people));
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
    var traits = promptFor("Select Search Criteria: (Enter number and choose when finished)\n1. Gender\n2. Date of Birth\n3. Height\n4. Weight\n5. Eye Color\n6. Occupation\n7. Finished", chars);
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
      app(people);
      break;
  }
  return search;
}

function searchByTrait(people){
  var traits = getSearchTraits();
  var values = traits.map(x => promptFor("What is the person's " + x, chars));

  return people.filter(x => people[traits[x]] == people[traits[values]]);
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

function displayFamily(person, people){
  var children = getChildren(person, people);
  var spouse = getSpouse(person, people);
  var parents = getParents(person, people);
  var siblings = getSiblings(person, people);
  displayByFamilyType("Children", children);
  displayByFamilyType("Spouse", spouse);
  displayByFamilyType("Parents", parents);
  displayByFamilyType("Siblings", siblings);
}
function getChildren(person,people){
  var children = people.filter(function(el){
    return el.parents[0] == person.id || el.parents[1] == person.id;

  });
  return children;
}
function getSpouse(person, people){
var spouse = people.filter(function(el){
  return el.currentSpouse == person.id;
  
});
return spouse;
}
function getParents(person, people){
  var parents = people.filter(function(el){
    return el.id == person.parents[0] || el.id == person.parents[1];
  });
  return parents;

}
function getSiblings(person, people){
  var siblings = people.filter(function(el){
    return el.parents[0] == person.parents[0] || el.parents[1] == person.parents[0] || el.parents[0] == person.parents[1] || el.parents[1] == person.parents[1];
  });
  return siblings;
}

function displayDescendants(person, people, descendants = []){
  var members= descendants;
  
  var children = people.filter(function(el){
    if (el.parents[0] == person.id || el.parents[1] == person.id) {
      members.push(el);
      return true;
    }});
    for (let i = 0; i < children.length; i++) {
      displayDescendants(children[i], people, members);
      
    }
    return members; 
    
  
}
function displayByFamilyType(string, members){
  alert(string + "\n" + members.map(function(person){
    return person.firstName + " " + person.lastName;
  }).join("\n"));
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

