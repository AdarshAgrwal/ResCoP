var firebaseConfig = {
    apiKey: "AIzaSyCIGEr4BXPDgaAD9JI26P8Z5LWJfn4DjUE",
    authDomain: "rescop-85e8f.firebaseapp.com",
    projectId: "rescop-85e8f",
    storageBucket: "rescop-85e8f.appspot.com",
    messagingSenderId: "26066745682",
    appId: "1:26066745682:web:7adcf93a18e52ba820228b"
  };

  firebase.initializeApp(firebaseConfig);
  // firebase.auth().onAuthStateChanged(user => {
  //   if (user) 
  //   {
  //      console.log(user.uid) 
  //      setTimeout(()=>{
  //        window.location="./dashboard.html"
  //      },3000)

      
  //   }
  // })
  // $(document).ready(function() {
  //   validate();
  //   $('input').on('keyup', validate);
  //   $("#submitButton").on('click',getDealerInfo)
  // });
  
  // function validate() {
  //   var inputsWithValues = 0;
    
  //   // get all input fields except for type='submit'
  //   var myInputs = $("input:not([name='dealername'])");
  
  //   myInputs.each(function(e) {
  //     // if it has a value, increment the counter
  //     if ($(this).val()) {
  //       inputsWithValues += 1;
  //     }
  //   });
  
  //   if (inputsWithValues-1 == myInputs.length) {
  //     $("#submitButton").prop("disabled", false);
  //   } else {
  //     $("#submitButton").prop("disabled", true);
  //   }
  // }
   var dealerName="", dealerNo="",dealerLoc=""
  function getDealerInfo(){
    var dealerName = document.getElementById("dealername").value
    // var password = document.getElementById("password").value
    // var confirmpassword = document.getElementById("confirmpassword").value
    // var dealerDate = document.getElementById("dealerdate").value
    // var dealerEmail = document.getElementById("dealeremail").value
    var dealerNo = document.getElementById("dealerno").value
    // var dealerOccupation = document.getElementById("occupation").value
    // var dealerState = document.getElementById("sts").value
    // var dealerCity = document.getElementById("state").value
    // var dealerPincode = document.getElementById("Pincode").value
    var dealerLoc = document.getElementById("loc").value
    var dealerRemark = document.getElementById("remark").value
    console.log(dealerRemark)
   
    
    // console.log(password,confirmpassword)

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

//     if (password===confirmpassword){
//     firebase.auth().createUserWithEmailAndPassword(dealerEmail, password)
//       .then((user) => {
//         alert('Login successfully');
       
//         // Signed in 
//         // ...
//       })
//       .catch((error) => {
//         var errorCode = error.code;
//         var errorMessage = error.message;
//         if (errorCode == 'auth/weak-password') {
//           alert('The password is too weak.');
//         } 
//         else if (errorCode == 'auth/email-already-in-use') {
//           alert('The email is already taken.');
//         } 
//         else {
//           alert("Failed");
//           alert(errorMessage);
//         }
//         alert("failed");
//     });

// }
// else {
//   alert("Passwords don't match")
// }

// firebase.auth().onAuthStateChanged(user => {
//   if (user) 
  
    //  console.log(user.uid) 
    var personalInfo={
      Name: dealerName,
      // DOB:dealerDate,
      // Email:dealerEmail,
      Phone: dealerNo,
      Remark: dealerRemark
   
    
    }
    var location = {
       State:dealerLoc
      // Pincode: dealerPincode
    
    }
    var request = {
      OxygenCylinder:oxygenCylinder,
      EmptyCylinder:emptyCylinder,
      Concentrator:Concentrator,
      Plasma:Plasma,
      Remdisiver:Remdisiver,
      Tocilizumab:Tocilizumab,
      Beds:Beds,
      Meals:Meals
    }
    var data = {PersonalInfo: personalInfo, Location:location, Services:request }
      
      
    sendData(data, dealerNo)
  }

function sendData(data,dealerNo) {
  if (dealerNo != "") {
    console.log(data)
    firebase.database().ref('Dealers/'+dealerNo).set(data,function(){
      console.log("added")
      swal("Thank You!", "You have been successfully Registered! Please Wait someone might contact you shortly", "success")
      setTimeout(function(){
        location.reload()
      },3000)
    }) 
  }
  else {
    alert("Please add a Phone Number")
  }
  }
 