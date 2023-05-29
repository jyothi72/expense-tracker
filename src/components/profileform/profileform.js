import React ,{useRef,useContext}from "react";
import classes from "../expensepage/pageheader.module.css"
import classes1 from "./profileform.module.css"
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import AuthContext from "../authprovider/authcontext";
function ProfilForm() {
    const authCtx = useContext(AuthContext);
  const nameRef = useRef();
  const photourlRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();
    const enteredName = nameRef.current.value;
    const enteredUrl = photourlRef.current.value;
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCk-d_Kex1tSDAdDPakeaEqzdNnLEJ0Uls",
      {
        method: "POST",
        body: JSON.stringify({
          idToken: authCtx.tokenid,
          displayName: enteredName,
          photoUrl: enteredUrl,

          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let erroMessage = "Authentication failed!";
            if (data && data.error && data.error.message) {
              erroMessage = data.error.message;
            }
            throw new Error(erroMessage);
          });
        }
      })
      .then((data) => {
        console.log("success");
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const getdata = JSON.parse(localStorage.getItem("data"));

  return (
    <React.Fragment>
      <header className={classes.pageheader}>
        {" "}
        <div>Winners never quite, Quitters never win.</div>{" "}
        <span>
          Your profile is 64% completes. A complete Profile has Higher chances
          of landing a job.
          <NavLink
            style={{ textDecoration: "none" }}
            to="/ExpensePage:ProfilePage"
          >
            Complete now
          </NavLink>
        </span>{" "}
      </header>
      <hr />
      <form onSubmit={submitHandler}>
        <div className={classes1.profile}>
          <div className={classes1.contact}>
            <h2>Contact Details </h2>
            <span>
              <button>Cancel</button>
            </span>
          </div>
          <div className={classes1.form}>
            <div>
              <label htmlFor="name">Full Name:</label>
            </div>
            <div>
              <input
                type="text"
                ref={nameRef}
                defaultValue={getdata.users[0].displayName}
              ></input>
            </div>
            <div>
              {" "}
              <label htmlFor="img"> Profile Photo URL</label>
            </div>
            <div>
              {" "}
              <input
                type="text"
                ref={photourlRef}
                defaultValue={getdata.users[0].photoUrl}
              ></input>
            </div>
          </div>
          <div>
            <button className={classes1.button}>Update</button>
          </div>
          <hr />
        </div>
      </form>
    </React.Fragment>
  );
}
export default ProfilForm;