import React from "react";
function Signup()
{
    function userRegistration(ev)
    {
        ev.preventDefault();
var k=document.getElementsByName('sign');
var d={
    username:k[0].value,
    email:k[1].value,
    password:k[2].value
}
fetch("http://localhost:2100/Register", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    mode: "cors",
    body: JSON.stringify(d),
  })
    
    .then((data) => {
      alert("Registered");
    })
    .catch(err=>alert(err))
    ev.target.reset();
    }
    return(
        <div style={{marginTop:'1.5cm'}}>
<form onSubmit={(e)=>{userRegistration(e)}}>
    <input type="text" placeholder='Username' name='sign'/><br/>
    <input type='text' placeholder='email' name='sign'/><br/>
    <input type='password' placeholder='password' name='sign'/><br/>
    <button>Submit</button>
</form>
        </div>
    )
}
export default Signup;