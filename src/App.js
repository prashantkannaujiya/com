import React, { useState } from "react";
import './style.css';
import Signup from "./Signup";
import Login from "./Login";

function App() {
  var [log, setlog] = useState(false);
  var [choice, setchoice] = useState(0);
  var [user, setuser] = useState(null);
  var [notes,setnotes]=useState([]);

  function userResponse(n)
  {
    if(n==1)
    {
      setchoice(1);
    }
    else
    {
      setchoice(2);
    }
  }
 
  const userName=(k)=>{
    console.log(k);
   // var z=JSON.stringify(k);
    //console.log(z);
    console.log(typeof k);
    setuser(k);
    setlog(true);
 allNotes(k);
  }
  function allNotes(us){
    var l=document.getElementById('logout');
    l.style.display='inline';
    console.log(user);
    fetch("http://localhost:2100/notes/"+us)
    .then(res=>res.json())
    .then((data)=>{console.log(data);
      if(data.message=='none')
      {
       
      } 
    else
  {
    setnotes(data)
  }})
  }
  function insertNote(ev)
  {
    ev.preventDefault();
    var n=document.getElementsByName('note');
    console.log(n[0].value)
    var t={
      username:user,
      note:n[0].value}

    fetch("http://localhost:2100/submitNotes",{
      
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "cors",
        body: JSON.stringify(t),
    
    }).then(res=>res.json()).then((data)=>{alert('Note inserted ');allNotes(user)})

  }
  function logoff()
  {
    setuser(null);
    setlog(false);
    setchoice(0);
  }
  return (
    <div>
      <div id="header"><span>{log ? 'Welcome '+ user : ""}</span><button id="logout" onClick={logoff}>Logout</button></div>
      {(() => {
        if (log == false) {
        return(  <div id="content">
            <div id="color-box"></div>
            <div id="interact">
             {
              (()=>{
if(choice==0)
{
  return (  <div>
      <div id="bars">
        <h1 className="red-bar"></h1>
        <h1 className="red-bar"></h1>
      </div>
      <h1 id="welcome">Welcome</h1>
      <div id="buttons">
        <button className="button" onClick={()=>{userResponse(1)}}>Sign Up</button>
        <button className="button" onClick={()=>{userResponse(2)}}>Log In</button>
      </div>
    </div>
  )
}
else if(choice==1)
{
  return <Signup></Signup>
}
else
{
  return <Login u={userName}></Login>
}
              })()
             }
            </div>
          </div>
        )
        }
        else{
return(
  <div id='account'>
  <div id="addNote">
    <h1>Add my notes</h1>
    <input type='text' placeholder="Type message here" name='note'/><br/>
    <button onClick={(e)=>{insertNote(e)}}>Save</button>
  </div>
  <div id="allNotes">
    <h1>All notes</h1>
    <div>
    {
      notes.map((a)=>{
        return <p className="noteBox">{a}</p>
      })
    }
    </div>
  </div>
</div>)
        }
      })()}
    </div>
  );
}
export default App;
