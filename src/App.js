import logo from './logo.svg';
import './App.css';
import { db } from './firebase';
import { addDoc, collection, getDocs,doc,deleteDoc,updateDoc } from "firebase/firestore"
import { useEffect, useState } from 'react';
import './main.css'
function App() {
  
  const tbl = collection(db,"users")
  const [record,setRecord]  = useState([]);
  const [name,setName]  = useState("");
  const [editid,setEditid] = useState("");
  const getUser = async() => {
    const data = await getDocs(tbl);
    let ans = data.docs.map((val)=>{
          return({...val.data(),id : val.id})
    })
    setRecord(ans);
  }
  const handleSubmit = async() => {
      let insert = await addDoc(tbl,{name : name,});
      if(insert){
        alert("Record successfully insert")
      }else{
        alert("Record not successfully insert")
      }
      setName("");
      getUser();
  }
  const deleteData = async(id) => {
    const userDoc = doc(db, "users", id);
    let res = await deleteDoc(userDoc);
    alert("user successfully delete");
    getUser();
  }
  const editData = (id,name,) => {
    setEditid(id);
    setName(name);
  }
  const handleUpdate = async() => {
    const userDoc = doc(db, "users", editid);
    const newFields = { name : name};
    await updateDoc(userDoc, newFields); 
    alert("Record successfully update")
    setEditid("");  
    setName(""); 
    getUser();   
  }
    useEffect(()=>{
      getUser();
    },[])
    

  return (
    
    <div className="App">
        <h1>Firebase</h1>
        <center>
          <table border={1}>
            <tr>
              <td>Name :- </td>
              <td><input type='text' name='name' onChange={ (e) => setName(e.target.value) } value={name}/></td>
            </tr>
            <tr>
              
              <td>
                {
                    editid ? ( <input type='button' onClick={ () => handleUpdate() } value="Edit"/>) : ( <input type='button' onClick={ () => handleSubmit() } value="submit"/>)
                }
                  
                </td>
            </tr>
        </table><br></br>
        

        
        <table border={1}>
          <tr>
            <td>Name</td>
            <td>Action</td>
          </tr>
          
          {
            record.map((val)=>{
              return (
                  <tr>
                    <td>{val.name}</td>
                    
                    <td>
                      <button onClick={ () => deleteData(val.id) }>Delete</button>
                      <button onClick={ () => editData(val.id,val.name,) }>Edit</button>
                    </td>
                  </tr>
              )
            })
          }

        </table>
        </center>
    </div>
  );
}

export default App;
