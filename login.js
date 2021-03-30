firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.

    document.getElementById("user_div").style.display = "block";
    document.getElementById("login_div").style.display = "none";

    var user = firebase.auth().currentUser;

    if(user != null){

      var email_id = user.email;
      document.getElementById("user_para").innerHTML = "Welcome User : " + email_id;

    }

  } else {
    // No user is signed in.

    document.getElementById("user_div").style.display = "none";
    document.getElementById("login_div").style.display = "block";

  }
});

function login(){

  var userEmail = document.getElementById("email_field").value;
  var userPass = document.getElementById("password_field").value;

  firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;

    window.alert("Error : " + errorMessage);
   
    // ...
  });

  firebase.auth().onAuthStateChanged(function(user) {

    if (user) {
    // User is signed in.
    window.location.href = "producer.html";

}

  });

}


function logout(){

  firebase.auth().signOut();

}


function createAccount(){


  var auth = firebase.auth();
  var userName = document.getElementById("user_field").value;
  var userEmail = document.getElementById("email_field").value;
  var userPass = document.getElementById("password_field").value;
 
 


 if(userName != "" && userEmail != "" && userPass != "")
 {

firebase.auth().createUserWithEmailAndPassword(userEmail, userPass).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // ...
}).then(function(){
   window.location.href = "login.html";
});


  firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    var userId = firebase.auth().currentUser.uid;
    var database = firebase.database().ref();
    firebase.database().ref('users/' + userId).set({
    username: userName,
    email: userEmail
  });

  } else {
    // No user is signed in.
    window.alert("please Login your account first!!");
  }
});  

 }

 
}


function resetPasswordViaEmail()
{
  var auth = firebase.auth();
  var emailAddress = document.getElementById("email_field").value;

  auth.sendPasswordResetEmail(emailAddress).then(function() {
    // Email sent.
  window.alert("An Email has been sent to you please check your email including SPAM folder.");

  }).catch(function(error) {
  // An error happened.
    var errorCode = error.code;
    var errorMessage = error.message;

    window.alert("Error : " + errorMessage);
  }).then(function(){

      window.location.href = "producer.html";

  });



}