import { Route } from "react-router-dom";
import AuthForm from "./components/authform/authform";
import { Switch } from "react-router-dom/cjs/react-router-dom.min";
import AuthContext from "./components/authprovider/authcontext";
import React, { useContext } from "react";
import ExpensePage from "./components/expensepage/expensepage";
import ProfilForm from "./components/profileform/profileform";

function App() {
  const authCtx=useContext(AuthContext)
  return (
    <React.Fragment>
    <Switch>
    {authCtx.isLoggedIn && (
      <Route path="/ExpensePage" exact>
        <ExpensePage />
      </Route>
    )}
    <Route path="/ExpensePage:ProfilePage">
<ProfilForm/>
    </Route>

</Switch>
  {!authCtx.isLoggedIn&&<AuthForm/>}
  </React.Fragment>
  );
}

export default App;
