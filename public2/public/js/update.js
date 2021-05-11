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
        var firebaseRef = firebase.database().ref('Dealers/'+user.uid)
        firebaseRef.on("value",(data)=>{
            console.log(data.val())
            document.getElementById('dealername').value = data.val().PersonalInfo.Name
            document.getElementById('dealerdate').value = data.val().PersonalInfo.DOB
            document.getElementById('dealeremail').value = data.val().PersonalInfo.Email
            document.getElementById('dealerno').value = data.val().PersonalInfo.Phone
            // document.getElementById('sts').value = data.val().Location.State
            // document.getElementById('state').value = data.val().Location.City
            // document.getElementById('Pincode').value = data.val().Location.Pincode
            if (data.val().Services.OxygenCylinder == true){
                document.getElementById('oxygencylinder').checked = true
            }
            if (data.val().Services.EmptyCylinder == true){
                document.getElementById('emptycylinder').checked = true
            }
            if (data.val().Services.Concentrator == true){
                document.getElementById('concentrator').checked = true
            }
            if (data.val().Services.Plasma == true){
                document.getElementById('Plasma').checked = true
            }
            if (data.val().Services.Remdisiver == true){
                document.getElementById('remdisiver').checked = true
            }
            if (data.val().Services.Tocilizumab == true){
                document.getElementById('tocilizumab').checked = true
            }
            if (data.val().Services.Beds == true){
                document.getElementById('Beds').checked = true
            }
            if (data.val().Services.Meals == true){
                document.getElementById('Meals').checked = true
            }
        })
    }
})

function updateInfo(){
        firebase.auth().onAuthStateChanged(user => {
            
        var dealerEmail = document.getElementById("dealeremail").value
        var dealerNo = document.getElementById("dealerno").value

        var Remdisiver = document.getElementById("remdisiver")
        if (Remdisiver.checked){
            Remdisiver=true
        console.log(Remdisiver)
        }
        else{
            Remdisiver=false
            console.log(Remdisiver)
        }

        var Tocilizumab = document.getElementById("tocilizumab")
        if (Tocilizumab.checked){
            Tocilizumab=true
        console.log(Tocilizumab)
        }
        else{
            Tocilizumab=false
            console.log(Tocilizumab)
        }

        var oxygenCylinder = document.getElementById("oxygencylinder")
        if (oxygenCylinder.checked){
        oxygenCylinder=true
        console.log(oxygenCylinder)
        }
        else{
        oxygenCylinder=false
        console.log(oxygenCylinder)
        }
        var emptyCylinder = document.getElementById("emptycylinder")
        if (emptyCylinder.checked){
        emptyCylinder=true
        console.log(emptyCylinder)
        }
        else{
        emptyCylinder=false
        console.log(emptyCylinder)
        }
        
        var Concentrator = document.getElementById("concentrator")
        if (Concentrator.checked){
        Concentrator=true
        console.log(Concentrator)
        }
        else{
        Concentrator=false
        console.log(Concentrator)
        }

        var Plasma = document.getElementById("Plasma")
        if (Plasma.checked){
            Plasma=true
        console.log(Plasma)
        }
        else{
            Plasma=false
            console.log(Plasma)
        }

        var Beds = document.getElementById("Beds")
        if (Beds.checked){
            Beds=true
        console.log(Beds)
        }
        else{
            Beds=false
            console.log(Beds)
        }
        var Meals = document.getElementById("Meals")
        if (Meals.checked){
            Meals=true
        console.log(Meals)
        }
        else{
            Meals=false
            console.log(Meals)
        }
        //UPDATING DATA
        if (user) 
        {
            var userRef = firebase.database().ref('Dealers/' + user.uid)
            userRef.child('PersonalInfo').update({
                'Email': dealerEmail,
                'Phone' : dealerNo
            })
            userRef.child('Services').update({
                'OxygenCylinder':oxygenCylinder,
                'EmptyCylinder':emptyCylinder,
                'Concentrator':Concentrator,
                'Plasma':Plasma,
                'Remdisiver':Remdisiver,
                'Tocilizumab':Tocilizumab,
                'Beds':Beds,
                'Meals':Meals
            })
        }
    })
}