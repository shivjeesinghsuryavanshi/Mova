// import {useState} from 'react';
// import "./index.css";


// function App() {
//   const [selectedUser,setSelectedUser] = useState("");

//   return (
//     <div classname = "App">
//       <h1>Hi Shiv</h1>

//       <lable>select Users: </lable>



//       <select value = {selectedUser}

//       onchange ={(e) => setSelectedUser(e.target.value)}>

//         <option value = "">prabhat</option>

//         <option value = "">prabhat</option>
//         <option value = "">Shikhar</option>
//         <option value = "">Shwetank</option>
//         <option value = "">Shiv</option>
//         <option value = "">Saniya</option>



//       </select>

//       <p>Select user id: {selectedUser || "None"}</p>

//     </div>
//   );

//   } 

//   export default App;





import { useState } from 'react';
import "./index.css";

function App() {
  const [selectedUser, setSelectedUser] = useState("");

  return (
    <div className="App">
      <div classname="BigDiv">

        <h1>Hi Shiv Bhai</h1>

        <lable>select value</lable>


        <select value={selectedUser}
          onchange={(e) => setSelectedUser(e.Target.value)}>

          <option value="">prabhat</option>
          <option value="">prabhat</option>
          <option value="">prabhat</option>
          <option value="">prabhat</option>
          <option value="">prabhat</option>

        </select>

      </div>

    </div>
  );



}

export default App;