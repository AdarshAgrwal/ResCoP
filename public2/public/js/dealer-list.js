var firebaseConfig = {
    apiKey: "AIzaSyCIGEr4BXPDgaAD9JI26P8Z5LWJfn4DjUE",
    authDomain: "rescop-85e8f.firebaseapp.com",
    databaseURL: "https://rescop-85e8f-default-rtdb.firebaseio.com",
    projectId: "rescop-85e8f",
    storageBucket: "rescop-85e8f.appspot.com",
    messagingSenderId: "26066745682",
    appId: "1:26066745682:web:7adcf93a18e52ba820228b"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  // Getting the Storage Data for the session.

  var localStorageData = []
  let city = ""
  let state = ""
  let no =sessionStorage.getItem("aadharno").toString()
  console.log(no)

  for (let i = 0 ; i < localStorage.length ; i ++){
      var key = localStorage.key(i)
      var value = localStorage.getItem(key)
      localStorageData.push( {
          [key] : value
      })
  }
  localStorageData.forEach((a)=>{
    if(Object.keys(a)[0] === "sts") {
        state = (Object.values(a)[0])
    }
    if(Object.keys(a)[0] === "state") {
        city = (Object.values(a)[0])
    }
})
console.log( city)
console.log(state)

/* Getting the Data from the Firebase Database of Dealers */

 var dealersDb = firebase.database().ref("Dealers");
 var patientDb = firebase.database().ref("Patients")

 var registeredData = {}
 var registeredKeys = []
 var patientData = {}
 var patientKeys =[]

dealersDb.on("value",(data)=>{
    registeredData = (data.val())
    registeredKeys = Object.keys(registeredData)
})

patientDb.on("value",(data)=>{
    patientData = data.val()
    patientKeys = Object.keys(patientData)
})

setTimeout(()=>{
    var rootaf = document.getElementById("rootaf")
    registeredKeys.forEach((key)=>{
        if(registeredData[key].Location.State === state && registeredData[key].Location.City === city ){
            // console.log(true)
            services = []
            if (registeredData[key].Services.Beds === true){
                services.push("Beds")
            }if (registeredData[key].Services.Meals === true){
                services .push("Meals")
            }if (registeredData[key].Services.Oxygen === true){
                services .push("Oxygen")
            }if (registeredData[key].Services.Plasma === true){
                services .push("Plasma")
            }if (registeredData[key].Services.Remdisiver === true){
                services .push("Remdisiver")
            }if (registeredData[key].Services.Tocilizumab === true){
                services .push("Tocilizumab")
            }
            // console.log(services)
            rootaf.innerHTML += `
            <div class=" col-12 col-md-6">
            <div class='card m-3'>
                <div class='card-body'>
                <h4 style="display:none">${registeredData[key].PersonalInfo.Email}<h4>
                    <h4>Name: ${registeredData[key].PersonalInfo.Name}</h4> 
                    <p style="word-break: break-word;">Services: ${services} </p>
                    <button class="btn btn-primary float-right" onclick="apply(this)">Apply</button> 
                </div>
               </div>
            </div>`
        }
    })
},3000)



function apply(elem){   
    // console.log(patientData)zz
    // console.log(patientKeys)
    var dealermail=(elem.parentNode.getElementsByTagName("h4")[0].innerHTML)
    // console.log(dealermail)
    patientKeys.forEach((key)=>{
        if(patientData[key].PersonalInfo.AadharNo === no){
            patientId = (key)
            // console.log(patientId)
        }
    })
    registeredKeys.forEach((key)=>{
        if(registeredData[key].PersonalInfo.Email === dealermail){
            DealerId = (key)
            // console.log(DealerId)
        }
    })
    let dealer_ref = firebase.database().ref('Dealers/' + DealerId + '/Customers/'+Date.now())
    let patient_ref  = firebase.database().ref('Patients/'+patientId)
    patient_ref.on("value", function(data){
              console.log(data.val())
              values = {[patientId]:data.val()}
              dealer_ref.set(values,function(){
                  console.log("added")
              })
    })
    
}