// Write your helper functions here!
require('isomorphic-fetch');

function addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl) {
   // Here is the HTML formatting for our mission target div.
   let missionTarget = document.getElementById("missionTarget");
   missionTarget.innerHTML = `
                <h2>Mission Destination</h2>
                    <ol>
                        <li>Name: ${name}</li>
                        <li>Diameter: ${diameter}</li>
                        <li>Star: ${star}</li>
                        <li>Distance from Earth: ${distance}</li>
                        <li>Number of Moons: ${moons}</li>
                    </ol>
                <img src="${imageUrl}">`
}

function validateInput(testInput) {
   if (isNaN(testInput)) {
       return "Not a Number";
   } else if (testInput === "") {
        return "Empty";
   } else {
        return "Is a Number";
   }
}

//took out list as a parameter after document because wasn't sure why it was there at the moment

function formSubmission(document, pilot, copilot, fuelLevel, cargoLevel) {
    //validation 
    if (pilot === "" || copilot === "" || fuelLevel === "" || cargoLevel === "") {
        alert("All fields are required!");
        event.preventDefault();
    } else if (validateInput(pilot) === 'Is a Number' || validateInput(copilot) === 'Is a Number' || validateInput(fuelLevel) === 'Not a Number' || validateInput(cargoLevel) === 'Not a Number') {
        alert("Invalid Input");
        event.preventDefault();
    } else {
        //changing status
        let faultyItems  = document.getElementById("faultyItems");
   faultyItems.innerHTML = `
    <ol>
        <li id="pilotStatus" data-testid="pilotStatus">${pilot} Ready</li>
        <li id="copilotStatus" data-testid="copilotStatus">${copilot} Ready</li>
        <li id="fuelStatus" data-testid="fuelStatus">Fuel level high enough for launch</li>
        <li id="cargoStatus" data-testid="cargoStatus">Cargo mass low enough for launch</li>
    </ol>`;
    document.getElementById("launchStatus").style.color = "green";
    document.getElementById("launchStatus").innerHTML = "Shuttle is ready for launch";
    faultyItems.style.visibility = "hidden";

    if (fuelLevel < 10000) {
        faultyItems.style.visibility = "visible";
        faultyItems.innerHTML = `
            <ol>
                <li id="pilotStatus" data-testid="pilotStatus">${pilot} Ready</li>
                <li id="copilotStatus" data-testid="copilotStatus">${copilot} Ready</li>
                <li id="fuelStatus" data-testid="fuelStatus">Fuel level too low for journey</li>
                <li id="cargoStatus" data-testid="cargoStatus">Cargo mass low enough for launch</li>
            </ol>`;
        document.getElementById("launchStatus").style.color = "red";
        document.getElementById("launchStatus").innerHTML = "Shuttle not ready for launch";
    };

    if (cargoLevel > 10000) {
        faultyItems.style.visibility = "visible";
        faultyItems.innerHTML = `
            <ol>
                <li id="pilotStatus" data-testid="pilotStatus">${pilot} Ready</li>
                <li id="copilotStatus" data-testid="copilotStatus">${copilot} Ready</li>
                <li id="fuelStatus" data-testid="fuelStatus">Fuel level high enough for launch</li>
                <li id="cargoStatus" data-testid="cargoStatus">Cargo mass too high for launch</li>
            </ol>`;
        document.getElementById("launchStatus").style.color = "red";
        document.getElementById("launchStatus").innerHTML = "Shuttle not ready for launch";
    };
    }    
}

async function myFetch() {
    let planetsReturned;

    planetsReturned = await fetch("https://handlers.education.launchcode.org/static/planets.json").then( function(response) {
        return response.json();
        });

    return planetsReturned;
}

function pickPlanet(planets) {
    let index = Math.floor(Math.random()*planets.length);
    return planets[index];
}

module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet; 
module.exports.myFetch = myFetch;
