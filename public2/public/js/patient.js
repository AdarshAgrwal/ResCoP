var firebaseConfig = {
  apiKey: "AIzaSyCIGEr4BXPDgaAD9JI26P8Z5LWJfn4DjUE",
  authDomain: "rescop-85e8f.firebaseapp.com",
  projectId: "rescop-85e8f",
  storageBucket: "rescop-85e8f.appspot.com",
  messagingSenderId: "26066745682",
  appId: "1:26066745682:web:7adcf93a18e52ba820228b"
};

firebase.initializeApp(firebaseConfig); 



function getPatientData(){

var patientName = document.getElementById("patientname").value
var patientDate = document.getElementById("patientdate").value
var patientEmail = document.getElementById("patientemail").value
var patientNo = document.getElementById("patientno").value
var patientAadhar = document.getElementById("aadharno").value
var patientOccupation = document.getElementById("Occupation").value
var patientState = document.getElementById("sts").value
var patientCity = document.getElementById("state").value
var patientPincode = document.getElementById("Pincode").value
var patientBloodGrp = document.getElementById("Bloodgrp").value

sessionStorage.setItem("aadharno",patientAadhar)


console.log(patientState,patientCity)
window.localStorage.setItem(document.getElementById("sts").id,patientState)
window.localStorage.setItem(document.getElementById("state").id,patientCity)

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

var Oxygen = document.getElementById("oxygen")
if (Oxygen.checked){
Oxygen=true
console.log(Oxygen)
}
else{
Oxygen=false
console.log(Oxygen)
}

var Plasma = document.getElementById("plasma")
if (Plasma.checked){
Plasma=true
console.log(Plasma)
}
else{
Plasma=false
console.log(Plasma)
}

var Beds = document.getElementById("beds")
if (Beds.checked){
Beds=true
console.log(Beds)
}
else{
Beds=false
console.log(Beds)
}
var Meals = document.getElementById("meals")
if (Meals.checked){
Meals=true
console.log(Meals)
}
else{
Meals=false
console.log(Meals)
}
var firebaseRef = firebase.database().ref("/Patients")


var personalInfo={
Name: patientName,
DOB:patientDate,
Email:patientEmail,
Phone: patientNo,
BloodGrp: patientBloodGrp,
AadharNo: patientAadhar,


}
var location = {
State: patientState,
City:patientCity,
Pincode: patientPincode

}
var request = {
Oxygen:Oxygen,
Plasma:Plasma,
Remdisiver:Remdisiver,
Tocilizumab:Tocilizumab,
Beds:Beds,
Meals:Meals
}
var data = {PersonalInfo: personalInfo, Location:location, Request:request }

firebaseRef.push(data, function(){
   
window.location = "./dealer-list.html"
})


}