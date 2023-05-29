import React, { useContext } from "react";
import AuthContext from "../authprovider/authcontext";
import PageHeader from "./pageheader"
import classes from '../profileform/profileform.module.css'
function ExpensePage() {
  const authCtx = useContext(AuthContext)
  const submitHandler =(event)=>{
event.preventDefault()

fetch('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyCk-d_Kex1tSDAdDPakeaEqzdNnLEJ0Uls',{
  method:'POST',
  body:JSON.stringify({
    requestType:"VERIFY_EMAIL",
    idToken:authCtx.tokenid,
  }),
  headers:{
    'Content-Type': "application/json"
  },
}).then((res)=>{
  if(res.ok){
    return  res.json();
  }else{
    return res.json().then((data)=>{
       let errormessage = 'Authentication failed'
       if(data && data.error&& data.error.message){
        errormessage = data.error.message;
       }
       throw new Error(errormessage)
    })
  }
}).then((data)=>{
  console.log(data)
  alert('success')

}).catch((err)=>{
  console.log(err)
  alert(err.message)
})
  }
  return (
    <React.Fragment>
      <PageHeader />
      <hr></hr><form  onSubmit={submitHandler}>
        <div className={classes.expensepage}> <label htmlFor="emailverification">Please Verify Your Email..</label>
    <button   >Email Verificatin</button></div>
      </form>

    </React.Fragment>
  );
}
export default ExpensePage;