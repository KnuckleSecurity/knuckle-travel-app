

let queryTrips = async (query,force) => {
             
    force = force || '';
    const result = await fetch('/active-trips',{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      }, body: JSON.stringify({"query":query})
    }).then(res=>res.json()) 
    const Trips = result
    if (Trips.length == 0 && force != "forced"){
      alerts("danger","No trips are listed.")
      return
    }
    // console.log(Trips)
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
     
        //if (col[i] == "UsernameEmail"){ columnName="Username or Email"}
        th.innerHTML = columnName;
        tr.appendChild(th);
        if (i==0){
            tr.id="table-header"
        } 
    }
   
    //if(tr.cells.length!=0){
      //let thDel = document.createElement("button"); 
      //thDel.id="delButton"
      //thDel.innerHTML = '<i class="fa fa-minus-circle" aria-hidden="true")></i>'
      //thDel.onclick= function(){
      //  deleteEntry();
      //};
      //tr.appendChild(thDel);
    //}
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
        tr.id=`entry-${i}`;
        if(query == "all"){

            const header = document.getElementById('trips-header')
            header.innerHTML = "Join to Trips"
            tr.insertAdjacentHTML('beforeEnd', `<td>\
            <input value="Join" id = 'tripButton-${i}' onclick=joinTrip('entry-${i}') type='button' /></td>`);
            $("#trips-header").html("Join to Trips")
        }
        if(query == "me"){
            const header = document.getElementById('trips-header')
            header.innerHTML = "My Trips"
            tr.insertAdjacentHTML('beforeEnd', `<td>\
            <input value="Leave" id = 'tripButton-${i}' onclick=leaveTrip('entry-${i}') type='button' /></td>`);
            
        }
        tr.insertAdjacentHTML('beforeEnd', `<td>\
        <input value="Forecast" id = 'weatherButton-${i}' type='button' /></td>`);
       
      }
      const divShowData = document.getElementById('showData');
      const divShowData0 = document.getElementById('showData0');
      divShowData.innerHTML = "";
      divShowData0.innerHTML = "";
      divShowData.appendChild(table);
      divShowData.style.display = "none";
      $('#showData').fadeIn()
      for (let i = 0; i < Trips.length; i++) {
        let locationInfo = Trips[i]["Location Info"]
        let Country = locationInfo.match(regexLoc)[0].replace(/[^a-zA-Z0-9 ]/g, '').trim()
        let City = locationInfo.match(regexLoc)[1].replace(/[^a-zA-Z0-9 ]/g, '').trim()
        let Region = locationInfo.match(regexLoc)[2].replace(/[^a-zA-Z0-9 ]/g, '').trim()
        let locationInfoJson = {"Country":Country, "City":City, "Region":Region}
        document.getElementById(`weatherButton-${i}`).onclick=function (){weatherForecast(locationInfoJson)}
      }
}
queryTrips("all")
