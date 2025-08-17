console.log("index.js loaded");

var firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
  measurementId: "YOUR_MEASUREMENT_ID",
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const database = firebase.database();

function register() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  if (validate_email(email) == false || validate_password(password) == false) {
    alert("Invalid email or password");
    return;
  }
  auth.createUserWithEmailAndPassword(email, password)
  .then(function(){
      var user = auth.currentUser;
      var database_ref = database.ref();
      var user_data = {
        email: email,
        password: password,
        last_login: Date.now(),
      }
      database_ref.child("users/" + user.uid).update(user_data);
      alert(" signed up successfully");
     })

     .catch(function (error) {
      var error_code = error.code;
      var error_message = error.message;
      alert("Error: " + error_message);
    });
}

function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  if (validate_email(email) == false || validate_password(password) == false) {
    alert("Invalid email or password");
    return;
  }
  auth
    .signInWithEmailAndPassword(email, password)
    .then(function () {
      var user = auth.currentUser;
      var database_ref = database.ref();
      var user_data = {
        last_login: Date.now(),
      };
      database_ref.child("users/" + user.uid).update(user_data);
      alert("Login successful");
    })
    .catch(function (error) {
      var error_code = error.code;
      var error_message = error.message;
      alert("Error: " + error_message);
    });
}

function validate_email(email) {
  const expression = /^[^@]+@\w+(\.\w+)+\w$/;
  if (expression.test(email) == true) {
    return true;
  } else {
    return false;
  }
}

function validate_password(password) {
  if (password.length < 6) {
    return false;
  } else {
    return true;
  }
}

function validate_field(field) {
  if (field == null) {
    return false;
  } else if (field.length <= 0) {
    return false;
  } else {
    return true;
  }
}
