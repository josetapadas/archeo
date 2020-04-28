import React from 'react';
import { withFirebase } from '../Firebase/context';

class Home extends React.Component<HomeProps> {
    componentDidMount = () => {
        this.props.firebase.auth.onAuthStateChanged(user => )

        onAuthStateChanged(function(user) {
            if (user) {
              console.log("onAuthStateChanged: Logged in as: ", user)
            } else {
              console.log("onAuthStateChanged: No user is logged")
            }
          });
    }
}
const Home = () => <div>HOME</div>;

export default withFirebase(Home);