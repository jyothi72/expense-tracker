import { Route } from "react-router-dom";
import AuthForm from "./components/authform/authform";
import { Switch,Redirect } from "react-router-dom/cjs/react-router-dom.min";
import AuthContext from "./components/authprovider/authcontext";
import React, { useContext } from "react";
import ExpensePage from "./components/expensepage/expensepage";
import ProfilForm from "./components/profileform/profileform";
import Logoutpage from "./components/logout/logoutpage";

function App() {
  const authCtx=useContext(AuthContext)
  return (
    <React.Fragment>
    <Route path = '*'>
  <Redirect to="/Authpage"/>
</Route>
       {authCtx.isLoggedIn && <Logoutpage/>} 
        <Switch>
        {authCtx.isLoggedIn && (
          <Route path="/ExpensePage" exact>
            <ExpensePage />
          </Route>
        )}
       {authCtx.isLoggedIn&&( <Route path="/ExpensePage:ProfilePage">
<ProfilForm/>
        </Route>)}
       {!authCtx.isLoggedIn&&<Route path='/Authpage'><AuthForm/></Route>}


</Switch>
  </React.Fragment>
  );
}

export default App;
