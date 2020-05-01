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
  db: firebase.database.Database;

  constructor() {
    firebase.initializeApp(config);
    this.auth = firebase.auth();
    this.db = firebase.database();
  }

  logout = () => this.auth.signOut();

  loginWithGoogle = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    try {
      return this.auth
        .signInWithPopup(provider);
    }
    catch (error) {
      console.log("Error login in: ", JSON.stringify(error));
    }
  };

  coins = () => this.db.ref('coins');
  empires = () => this.db.ref('empires');
  locations = () => this.db.ref('locations');
  positions = () => this.db.ref('positions');
}

export default Firebase;
