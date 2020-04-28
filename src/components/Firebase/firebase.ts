import firebase from "firebase";

var config = {
  apiKey: "AIzaSyA-dKnonqPsc_ZW3vdHziezZsL8gtmjXwA",
  authDomain: "archeo-pai.firebaseapp.com",
  databaseURL: "https://archeo-pai.firebaseio.com",
  projectId: "archeo-pai",
  storageBucket: "archeo-pai.appspot.com",
  messagingSenderId: "699982653836",
  appId: "1:699982653836:web:896e37000466b5c06c8ea9",
};

class Firebase {
  auth: firebase.auth.Auth;

  constructor() {
    firebase.initializeApp(config);

    this.auth = firebase.auth();
    
    this.auth.onAuthStateChanged(function(user) {
      if (user) {
        console.log("onAuthStateChanged: Logged in as: ", user)
      } else {
        console.log("onAuthStateChanged: No user is logged")
      }
    });
    
  }

  logout = () => this.auth.signOut();

  loginWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    return this.auth
      .signInWithPopup(provider)
      .catch(function (error) {
        console.log("Error login in: ", JSON.stringify(error));
      });
  };

  getCurrentUser = () => this.auth.currentUser;
}

export default Firebase;
