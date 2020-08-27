import React from 'react'
import Test from './components/Test.jsx'
import UserCreate from './components/UserCreate.jsx'
import UserLogin from './components/UserLogin.jsx'

class App extends React.Component {
  state = {
    currentUser: localStorage.getItem('currentUser'),
    experience: localStorage.getItem('experience')
  }
  setUser = this.setUser.bind(this)
  increaseExp = this.increaseExp.bind(this)

  setUser(data) {
    this.setState({
      currentUser: data.user,
      experience: data.experience
    })
    console.log(data)
    localStorage.setItem('currentUser', data.user)
    localStorage.setItem('experience', data.experience)
    localStorage.setItem('token', data.accessToken)
  }

  increaseExp() {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Bearer " + localStorage.getItem('token'));

    var raw = JSON.stringify({ "username": localStorage.getItem('currentUser') });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

fetch("http://localhost:3003/exercise/experience", requestOptions)
  .then(response => response.json())
  .then(result => {
    localStorage.setItem('experience', result.experience)
    this.setState({
      experience: result.experience
    })
  })
  .catch(error => console.log('error', error));
  }

  render() {
    return (
      <div className="App">
        <Test />
        {this.state.currentUser == null ?
          (<>
            <UserCreate setUser={this.setUser} />
            <UserLogin setUser={this.setUser} />
          </>) :
          (<>
            <br />
            {"Welcome " + this.state.currentUser}
            <br />
            {"Current Experience: " + this.state.experience
            }
            <br />
            <button onClick={this.increaseExp}>Complete Exercise</button>
          </>)
        }
      </div>
    );
  }
}

// Researched on stackOverflow for a way to clear search parameters
// https://stackoverflow.com/questions/39128931/clear-localstorage-on-tab-browser-close-but-not-on-refresh
window.onbeforeunload = function (e) {

  window.localStorage.unloadTime = JSON.stringify(new Date());

};

window.onload = function () {

  let loadTime = new Date();
  let unloadTime = new Date(JSON.parse(window.localStorage.unloadTime));
  let refreshTime = loadTime.getTime() - unloadTime.getTime();

  if (refreshTime > 3000)//3000 milliseconds
  {
    window.localStorage.clear();
  }

};

export default App;
