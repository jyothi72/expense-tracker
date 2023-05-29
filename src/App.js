import { Route } from "react-router-dom";
import AuthForm from "./components/authform/authform";
import { Switch } from "react-router-dom/cjs/react-router-dom.min";
import AuthContext from "./components/authprovider/authcontext";
import { useContext } from "react";
import ExpensePage from "./components/expensepage/expensepage";

function App() {
  const authCtx=useContext(AuthContext)
  return (
    <div>
      <main>
   {authCtx.isLoggedIn &&  <Route path='/ExpensePage'>
        <ExpensePage/>
      </Route>}
     </main>

   {!authCtx.isLoggedIn&&<AuthForm/>}  
    </div>
  );
}

export default App;
