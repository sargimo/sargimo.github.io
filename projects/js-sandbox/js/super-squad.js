var membersEl = document.querySelector('.members');

//this is our data
var squad = {
    squadName: "Super hero squad",
    homeTown: "Metro City",
    formed: 2016,
    secretBase: "Super tower",
    active: true,
    members: [
      {
        name: "Molecule Man",
        imageUrl: "images/djskjdsf.jpeg",
        age: 29,
        secretIdentity: "Dan Jukes",
        powers: ["Radiation resistance", "Turning tiny", "Radiation blast"]
      },
      {
        name: "Madame Uppercut",
        age: 39,
        secretIdentity: "Jane Wilson",
        powers: [
          "Million tonne punch",
          "Damage resistance",
          "Superhuman reflexes"
        ]
      },
      {
        name: "Eternal Flame",
        age: 1000000,
        secretIdentity: "Unknown",
        powers: [
          "Immortality",
          "Heat Immunity",
          "Inferno",
          "Teleportation",
          "Interdimensional travel"
        ]
      }
    ]
  };
  
  
  function getMemberHTMLListItem(member){
      
    return `<li>
            <h3>${member.name}</h3>
            <p>${member.age}</p>
            <p>${member.secretIdentity}</p>
            <p>${member.powers}</p>
            </li>`; //TODO
  }
  
  function displayMembers() {
    //TODO Hint: You can concatenate (join together) strings of HTML list items
    //and then add the HTML to the DOM using the innerHTML property of the unordered 
    //list HTML element
    let membersString = "";
    for (var i = 0; i < squad.members.length; i++) {
        let member = squad.members[i];
        membersString = membersString + getMemberHTMLListItem(member);        
    }
    membersEl.innerHTML = membersString;
  }
  
  displayMembers();