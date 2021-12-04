// Write your JavaScript code here!

window.addEventListener("load", function() {

   let form = document.querySelector("form");
   form.addEventListener("submit", function(event) {
    event.preventDefault();
    let pilotName = document.querySelector("input[name=pilotName]");
    let copilotName = document.querySelector("input[name=copilotName]");
    let fuelLevel = document.querySelector("input[name=fuelLevel]");
    let cargoMass = document.querySelector("input[name=cargoMass]");

     //Updating Shuttle requirements and validation    
     formSubmission(document, pilotName.value, copilotName.value, fuelLevel.value, cargoMass.value);
   });

   
   let listedPlanets;
   // Set listedPlanetsResponse equal to the value returned by calling myFetch()
   let listedPlanetsResponse = myFetch();
   listedPlanetsResponse.then(function (result) {
       listedPlanets = result;
       console.log(listedPlanets);
   }).then(function () {
       console.log(listedPlanets);
       // Below this comment call the appropriate helper functions to pick a planet fom the list of planets and add that information to your destination.
       let planetChosen = pickPlanet(listedPlanets);
       console.log(planetChosen);
       addDestinationInfo(document, planetChosen.name, planetChosen.diameter, planetChosen.star, planetChosen.distance, planetChosen.moons, planetChosen.image);
   })
   
});