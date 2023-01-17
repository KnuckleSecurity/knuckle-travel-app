
// CREATE A TABLE IN THE HTML WITH JSON DATA.

let queryUser = async () => {
  const header = document.getElementById('trips-header')
  header.innerHTML = "Travellers"
  const divShowData0 = document.getElementById('showData0');
  var input = document.createElement("input");
  var button = document.createElement('INPUT');
  button.setAttribute("type","submit")
  button.value="Search for a traveller name"
  input.id="inputTraveller"

  button.onclick=async function(){
    var travellerNick = document.getElementById('inputTraveller').value
    if(!travellerNick){alerts("warning","Input a traveller name.")
      return}
    createTable(travellerNick)

  }
  input.type = "text";
  document.getElementById('showData').innerHTML="";
  document.getElementById('showData0').innerHTML="";
  divShowData0.appendChild(input);
  divShowData0.appendChild(button);
}


let createTable = async (query,force) => {
             
    force = force || '';

    const result = await fetch('/tripsData',{
      method:'POST',
      headers:{
        'Content-Type':'application/json',
      },
    body: JSON.stringify({"userID":query})

    }).then(res=>res.json())
    console.log(result)
    const Trips = result
    if (Trips.length == 0 && force != "forced"){
      alerts("danger","User is not interested in any trips or user does not exist.")
      return
    }

    let col = [];
    for (let i = 0; i < Trips.length; i++) {
      for (let key in Trips[i]) {
        if (col.indexOf(key) === -1) {
          col.push(key);
        }
      }
    }
    const table = document.createElement("table");
    table.id="entryTable"
    let tr = table.insertRow(-1);                   // table row.
    for (let i = 0; i < col.length; i++) {
        let th = document.createElement("th");      // table header.
        let columnName = col[i]
        th.innerHTML = columnName;
        tr.appendChild(th);
        if (i==0){
            tr.id="table-header"
        } 
    }
      const regexLoc = new RegExp("\\:(.*?)\\-", 'gm')
      for (let i = 0; i < Trips.length; i++) {
        tr = table.insertRow(-1);
        for (let j = 0; j < col.length; j++) {
          let tabCell = tr.insertCell(-1);
          tabCell.innerHTML = Trips[i][col[j]];
          if (col[j] == "Interested Users"){
            tabCell.onclick = function(){tripsData("user",Trips[i]["Trip ID"])}
            tabCell.style.boxShadow = "0 0 5px #fff"
            tabCell.style.textAlign = "center"
            tabCell.style.fontWeight ="bold"
          }
        }
      }
      const divShowData = document.getElementById('showData');
      divShowData.innerHTML = "";
      divShowData.appendChild(table);
      divShowData.style.display = "none";
      $('#showData').fadeIn()
}
