import React, { useContext } from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { Switch } from "react-router";
import Login from "./pages/Login";
import HomeMain from "./pages/HomeMain";
import Register from "./pages/Register";
import User from "./pages/userPages/User";
import Admin from "./pages/adminPages/Admin";
import AdminEdit from "./pages/adminPages/AdminEdit2";
import UserEdit from "./pages/userPages/UserEdit";
import UserViewAll from "./pages/userPages/UserViewAll";
import { Context } from "./context/Context";
import AdminCreate from "./pages/adminPages/AdminCreate";

function App() {
  const { user } = useContext(Context);

  // VARIABLE TO CHECK THE USER STATE
  let adminTrue;
  let userTrue;
  let noUserTrue;

  if (!user.user) {
    noUserTrue = true;
    adminTrue = false;
    userTrue = false;
  } else if (user.user.name === "admin") {
    adminTrue = true;
    userTrue = false;
    noUserTrue = false;
  } else {
    userTrue = true;
    adminTrue = false;
    noUserTrue = false;
  }
  console.log(user.user);

  return (
    <Router>
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/">
          {noUserTrue && <Route exact path="/" component={HomeMain} />}
          {adminTrue && <Redirect exact to="/admin" />}
          {userTrue && <Redirect exact to="/userhome" />}
        </Route>
        <Route exact path="/userhome" component={User} />
        <Route exact path="/useredit" component={UserEdit} />
        <Route exact path="/userviewall" component={UserViewAll} />
        <Route exact path="/admin" component={Admin} />
        <Route exact path="/adminedit/:id" component={AdminEdit} />
        <Route exact path="/admincreate" component={AdminCreate} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/:time/:name/:id" component={Register} />
      </Switch>
    </Router>
  );
}

export default App;
