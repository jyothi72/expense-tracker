import React from "react";
import  classes from './input.module.css'
const ExpenseInput =(props)=>{
 
  console.log(props.item, "from inpuptpage");
  const deleteHandler = (item) => {
    props.onRemove(item);
    const inputid = item.id
    ;
    fetch(
      `https://login-auth-460ac-default-rtdb.firebaseio.com/expenses/${inputid}.json`,{
        method:'DELETE',

      }
    ).then((res)=>{
      console.log(res)
    })
    .catch((err)=>{
      console.log(err.message)
    })
    console.log(inputid, "id from detelfunction expenseform ");
  };
  const EditHandler = async (item)=>{
    const inputid = item.id
try{
  const response = await fetch(
    `https://login-auth-460ac-default-rtdb.firebaseio.com/expenses/${inputid}.json`,{
      method:'DELETE',
      headers:{
        'Content-Type':'application/json'
      },
})
const data = await response.json()
if(response.ok){
  props.EditExpenseHandler(item)
}else{
  throw data.erro
}
}catch(error){
  console.log(error.message)
}
  }

  return (
    <React.Fragment>
      <div className={classes.expenseInput}>

          <ul><li>
              <label>Expense Amount</label>
              <span className={classes.data}>{props.item.enteredExpense} </span>
              <label>Details</label>
              <span className={classes.data}> {props.item.enteredDetails}</span>
              <label>Category</label>
              <span className={classes.data}> {props.item.enteredCategory}</span>
              <span>
                <button onClick={()=>EditHandler(props.item)}>Edit</button>
              </span>
              <span>
                <button  onClick={()=>deleteHandler(props.item)}>Delete</button>
              </span>
              <hr></hr>
              </li></ul>

      </div>
    </React.Fragment>
  );
};
export default ExpenseInput;