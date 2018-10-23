var membersEl = document.querySelector('.grid');

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
        imageUrl: "https://images.unsplash.com/photo-1417436026361-a033044d901f?ixlib=rb-0.3.5&amp;q=80&amp;fm=jpg&amp;crop=entropy&amp;w=1080&amp;fit=max&amp;s=faa4e192f33e0d6b7ce0e54f15140e42",
        age: 29,
        secretIdentity: "Dan Jukes",
        powers: ["Radiation resistance", " Turning tiny", " Radiation blast"]
      },
      {
        name: "Madame Uppercut",
        imageUrl: "https://images.unsplash.com/photo-1417436026361-a033044d901f?ixlib=rb-0.3.5&amp;q=80&amp;fm=jpg&amp;crop=entropy&amp;w=1080&amp;fit=max&amp;s=faa4e192f33e0d6b7ce0e54f15140e42",
        age: 39,
        secretIdentity: "Jane Wilson",
        powers: [
          "Million tonne punch",
          " Damage resistance",
          " Superhuman reflexes"
        ]
      },
      {
        name: "Eternal Flame",
        imageUrl: "https://images.unsplash.com/photo-1417436026361-a033044d901f?ixlib=rb-0.3.5&amp;q=80&amp;fm=jpg&amp;crop=entropy&amp;w=1080&amp;fit=max&amp;s=faa4e192f33e0d6b7ce0e54f15140e42",
        age: 1000000,
        secretIdentity: "Unknown",
        powers: [
          "Immortality",
          " Inferno",
          " Interdimensional travel"
        ]
      }
    ]
  };
  
  
  function getMemberHTMLListItem(member){
      
    return `<div class='grid--item'>
                <div class='img' style='background-image: url(${member.imageUrl});'></div>
                <div class='container'>
                    <h2>${member.name}</h2>
                    <div class='desc'><ul>
                        <li>Age: <span class="listtext">${member.age}</span></li>
                        <li>Secret ID: <span class="listtext">${member.secretIdentity}</span></li>
                        <li>Powers: <span class="listtext">${member.powers}</span></li>
                        </ul>
                    </div>
                </div>
            </div>`; //TODO
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