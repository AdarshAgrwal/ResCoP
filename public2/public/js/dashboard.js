var firebaseConfig = {
    apiKey: "AIzaSyCIGEr4BXPDgaAD9JI26P8Z5LWJfn4DjUE",
    authDomain: "rescop-85e8f.firebaseapp.com",
    projectId: "rescop-85e8f",
    storageBucket: "rescop-85e8f.appspot.com",
    messagingSenderId: "26066745682",
    appId: "1:26066745682:web:7adcf93a18e52ba820228b"
  };

  firebase.initializeApp(firebaseConfig);
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      console.log(user.uid)
      dealerDetails(user.uid)
    }
  })
  // `Your requested dealer has seen your request and will contact you shortly. Please find attached the details:
  // Name: ${dealername}, Email: ${dealeremail}, Contact: ${dealerno}`
function logout() {
    firebase.auth().signOut().then(() => {
      // Sign-out successful.
      window.location = "./index.html";
    }).catch((error) => {
      // An error happened.
    });
  }

  var k = ""

  function dealerDetails(uid){
   
    var table = document.getElementById("patientTable")
  var firebaseRef = firebase.database().ref('Dealers/'+uid+'/Customers')
  firebaseRef.on("child_added", (snapshot)=>{
     k=snapshot.key

     var dated = new Date(parseInt(k,10)).toDateString("MMM dd");

    snapshot.forEach(function(data){
        services = []
        if (data.val().Request.Beds === true){
            services.push("Beds")
        }if (data.val().Request.Meals === true){
            services .push("Meals")
        }if (data.val().Request.Oxygen === true){
            services .push("Oxygen")
        }if (data.val().Request.Plasma === true){
            services .push("Plasma")
        }if (data.val().Request.Remdisiver === true){
            services .push("Remdisiver")
        }if (data.val().Request.Tocilizumab === true){
            services .push("Tocilizumab")
        }
        table.innerHTML+=
      `  <div class="card m-3">
      <div class='card-body'>
      <p><b>Date:</b> ${dated}</p> 
      <p style="display:none">${k}</p>
          <p><b>Name:</b> ${data.val().PersonalInfo.Name}</p> 
          <p><b>Email:</b> ${data.val().PersonalInfo.Email} </p>
          <p><b>Phone:</b> ${data.val().PersonalInfo.Phone} </p>
          <p><b>Aadhar No:</b> ${data.val().PersonalInfo.AadharNo} </p>
          <p><b>Blood Group:</b> ${data.val().PersonalInfo.BloodGrp} </p>
          <p style="word-break: break-word;"><b>Services:</b> ${services} </p>
          <button type="button" class="btn"style="background-color:#6C63FF;color:white" onclick="accept(this)">Accept</button>
          <button type="button" class="btn" style="background-color:#EC7580;color:white" onclick="reject(this)">Reject</button>
          <button type="button" class="btn"style="background-color:#F9A826;color:white" onclick="deleteUser(this)">Delete</button>
      </div>
  </div>` 

    })
       
  }) 

}

function accept(elem){
   
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
     var userRef = firebase.database().ref("Dealers/"+user.uid+"/PersonalInfo")
     userRef.on("value", function(data){
       var dealername = data.val().Name
       var dealeremail = data.val().Email
       var dealerno = data.val().Phone

       var mailId =(elem.parentNode.getElementsByTagName('p')[3].innerHTML)
  console.log(mailId.slice(start=6).trim())
  Email.send({
    SecureToken : "0a6a150b-87aa-425f-a2cb-f268b9169d32",
    To : mailId,
    From : "rescop6@gmail.com",
    Subject : "Dealer Request",
    Body :  `Your requested dealer is ready to be contacted. Please find attached the details:<br> Name: ${dealername}<br> Email: ${dealeremail}<br> Contact: ${dealerno}`
}).then(
  message => alert(message)
);
     })
     
    }
  })
}

function reject(elem){
   
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
     var userRef = firebase.database().ref("Dealers/"+user.uid+"/PersonalInfo")
     userRef.on("value", function(data){
       var dealername = data.val().Name
       

       var mailId =(elem.parentNode.getElementsByTagName('p')[3].innerHTML)
  console.log(mailId.slice(start=6).trim())
    Email.send({
      SecureToken : "0a6a150b-87aa-425f-a2cb-f268b9169d32",
      To : mailId,
      From : "rescop6@gmail.com",
      Subject : "Dealer Request",
      Body : `We are Sorry for the Inconvenience <br>
      ${dealername} is unable to meet your requirements.`
  }).then(
    message => alert("Email Sent")
  );
     })
    }
  })
}


function deleteUser(elem){
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      custKey = (elem.parentNode.getElementsByTagName('p')[1].innerHTML)
      var userref = firebase.database().ref('Dealers/'+user.uid+'/Customers/'+custKey)
      userref.remove()
      window.location.reload()
    }
  })
}
