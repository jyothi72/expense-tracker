import React, { useContext, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import classes from './pageheader.module.css'
import AuthContext from '../authprovider/authcontext'
function PageHeader() {
    const authCtx = useContext(AuthContext)
    useEffect(() => {
      fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyCk-d_Kex1tSDAdDPakeaEqzdNnLEJ0Uls",
        {
          method: "POST",
          body: JSON.stringify({
            idToken: authCtx.tokenid,
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
              let errorMessage = "Authentication failed";
              if (data && data.error && data.error.message) {
                errorMessage = data.error.message;
              }
              throw new Error(errorMessage);
            });
          }
        })
        .then((data) => {
          authCtx.ProfileDetails(data);
          const get =JSON.stringify(data)
        localStorage.setItem('data',get)
        })
        .catch((err) => {
          alert(err.message);
        });
    }, []);
    return (
       <React.Fragment  >
        <header  className={classes.pageheader}> <div >Welcome to Expense Tracker !!!</div> <span>Your profile incomplete.<NavLink 
         style={{textDecoration:'none'}} to="/ExpensePage:ProfilePage">Complete now</NavLink></span> </header>
       </React.Fragment>
    )
  }
  export default PageHeader