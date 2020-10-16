import React,{useState, useEffect} from 'react';
import './App.css';
import Axios from'axios';



function App() {

  const[name, setName] = useState('');
  const[Class, setClass] = useState('');
  const[entryList, setEntry] = useState([]);
  const[newClass, setNewClass] = useState('');

  useEffect(() => {
    Axios.get('http://localhost:3001/api/get').then((response) => {
      setEntry(response.data);
    });
  }, [])

  const submit = () => {
    Axios.post('http://localhost:3001/api/insert',{
     name: name,
     Class: Class,
    })
      setEntry([
        ...entryList,
        {name: name, Class: Class}
      ]);
  };

  const handleDelete = (name) => {
    Axios.delete(`http://localhost:3001/api/delete/${name}`); //we can add variable in http request as event pass params 
  }

  const handleUpdate = (kname) => {
    Axios.put('http://localhost:3001/api/update', {
      name: kname,
      Class: newClass,
    });
    setNewClass('');
  };

  return (
    <div className="App">
      <h1>CRUD app</h1>
      <div className="inputs">
          <label>Name</label>
          <input type="text" name="Name" onChange={(e) => setName(e.target.value)}/>
          <label>Class</label>
          <input type="text" name="class" onChange={(e) => setClass(e.target.value)} />
          
          <button onClick={submit}>submit</button>

          <div>
            <h2>Your Entry</h2>
            {entryList.map((list) => {
              return <div key={list.id} className="entry"> 
                <h3>Name: {list.name}</h3> 
                <h4>faculty: {list.Class}</h4>

                <button onClick={() => {handleDelete(list.name)}}>Delete</button> 
                <input id='updateInput' type="text" name='newClass' onChange={(e) => setNewClass(e.target.value)} />
                <button onClick={() => {handleUpdate(list.name)}}>update</button>
              </div>
            })}
          </div>
     
      </div>
    </div>
  );
}

export default App;
