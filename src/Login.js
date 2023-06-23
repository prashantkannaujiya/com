import React, { useState } from "react";
function Login(props){
    var [y,sety]=useState(null);
    function userLogin(ev)
    {
        ev.preventDefault();
        var k=document.getElementsByName('log');
        var d={
            username:k[0].value,
           
            password:k[1].value
        }
        fetch("http://localhost:2100/Login", {
            method: "post",
            headers: {
              "Content-Type": "application/json",
            },
            mode: "cors",
            body: JSON.stringify(d),
          })
            .then((res) => res.json())
            .then((data) => {
             if(data.message=='success')
             {
                var n=data.username;
                console.log(n)
                sety(n);
                alert('Welcome '+n)
                props.u(n);
             }
            })
            .catch(err=>alert(err))
            ev.target.reset();
    }
    return(
      
<div style={{marginTop:'1.5cm'}}>
    <form onSubmit={(e)=>{userLogin(e)}}>
        <input type="text" placeholder="Username" name='log'/><br/>
        <input type='password' placeholder='Password' name='log'/><br/>
        <button>Submit</button>
    </form>
</div>
    )
}
export default Login;