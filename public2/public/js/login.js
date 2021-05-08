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
    if (user) 
    {
       console.log(user.uid) 
       
       window.location="./dashboard.html"
    }
  })
  function ready(){
    email = document.getElementById('emailbox').value;
    password = document.getElementById('passwordbox').value;
  }
  function loginbtn(){
    ready()
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then((user) => {
        window.location="./dashboard.html";
      // Signed in 
      // ...
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      alert("Authentication Error");
    });
  }

  