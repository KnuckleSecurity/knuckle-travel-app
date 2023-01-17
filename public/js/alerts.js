// PRETTIFIED ALERTS.

const alerts = (type, message)=>{

    types = {'primary':"alert alert-primary",
             'secondary':"alert alert-secondary",
             'success':"alert alert-success",
             'danger':"alert alert-danger",
             'warning':"alert alert-warning",
             "info":"alert alert-info",
             "light":"alert alert-light",
             "dark":"alert alert-dark"}

           
    var successAlert = document.createElement("div")
    successAlert.appendChild(document.createTextNode(message))
    successAlert.setAttribute("class", types[type])
    successAlert.setAttribute("id", "alertBox")
    successAlert.setAttribute("role","alert") 
    $("#messagePlaceHolder").append(successAlert)
    $("#alertBox").css({ display: "none"});
   
    $('#alertBox').slideDown()
    setTimeout(() => {
      $('#alertBox').slideUp();
    }, "2000")
    setTimeout(()=>{
      $('#alertBox').remove()
    },"2600")
  
  }
