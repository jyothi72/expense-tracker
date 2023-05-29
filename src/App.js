import { Route } from "react-router-dom";
import AuthForm from "./components/authform/authform";
import { Switch } from "react-router-dom/cjs/react-router-dom.min";

function App() {
  return (
    <div>
      <Switch>
      <Route path="/"><AuthForm/></Route>
      </Switch>
    </div>
  );
}

export default App;
