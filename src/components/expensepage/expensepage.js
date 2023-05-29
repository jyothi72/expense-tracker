import React, { useContext ,useState} from "react";
import AuthContext from "../authprovider/authcontext";
import PageHeader from "./pageheader"
import classes from '../profileform/profileform.module.css'
import ExpenseForm from "../../expenseform/form";
import ExpenseInput from "../../expenseform/input";
function ExpensePage() {

    const authCtx = useContext(AuthContext)
    const [printexpense,setPrintExpense]= useState([])
    const    inputvalueHandler=(expense)=>{
  setPrintExpense((prevexpense)=>{
    return [expense,...prevexpense]
  })
    }
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
    console.log(printexpense,'from expnesepage')
    return (
      <React.Fragment>
        <PageHeader />
        <hr></hr><form  onSubmit={submitHandler}>
          <div className={classes.expensepage}> <label htmlFor="emailverification">Please Verify Your Email..</label>
      <button   >Email Verificatin</button></div>
        </form>
        <ExpenseForm  ondata = {inputvalueHandler}></ExpenseForm>
  <ExpenseInput  printexpense={printexpense}  ></ExpenseInput>
  
      </React.Fragment>
    );
  }
  export default ExpensePage;