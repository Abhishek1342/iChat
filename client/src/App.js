import Home from "./component/home/Home";
import Forgetpassword from "./component/loginsignup/Forgetpassword";
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Signuplogin from "./component/loginsignup/Signuplogin";
import Profile from "./component/loginsignup/Profile";
function App() {
    return (
        <>
        
         <Router>
         <Switch>
         <Route  exact path="/"><Signuplogin/> </Route>
         <Route  exact path="/forgetpassword"> <Forgetpassword/> </Route>
         <Route  exact path="/home"><Home/> </Route>
         <Route  exact path="/profile"><Profile/> </Route>
        </Switch>
        </Router>
        </>
    );
}

export default App;
