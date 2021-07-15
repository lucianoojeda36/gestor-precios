import React, { useState } from "react";
import "./App.css";
import * as XLSX from "xlsx";
import Detalles from "./components/Detalles";
import './App.sass'

function monthDosCifras() {
  let month = new Date().getMonth()
  return month < 10 ? '0' + `${month + 1}` : month
}


function App() {
  const [items, setItems] = useState([]);
  const [state,setState]=useState('')
  const [porcentaje,setPorcentaje]=useState('')
  const [producto,setProducto]=useState('')

  const readExcel = (file) => {
    const promise = new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);

      fileReader.onload = (e) => {
        const bufferArray = e.target.result;

        const wb = XLSX.read(bufferArray, { type: "buffer" });

        const wsname = wb.SheetNames[0];

        const ws = wb.Sheets[wsname];

        const data = XLSX.utils.sheet_to_json(ws);

        resolve(data);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });

    promise.then((d) => {
      setItems(d);
    });
  };

  function handelSubmit(e){
    e.preventDefault()
    let expresion = new RegExp(`${state}.*`, "i");
    const datos1= items ? items.filter((item) => expresion.test(item[`PRECIOS AL ${new Date().getDate()}/${monthDosCifras()}/${new Date().getFullYear()}`]) || expresion.test(item.__EMPTY) || expresion.test(item.__EMPTY_1)): "Todavia no cargaste el Archivo"
    
    setProducto(datos1)

  }

  
  return (
    <div>
      <form onSubmit={handelSubmit} className="formulario">
        <input placeholder='Codigo' value={state} onChange={(e) => setState(e.target.value)} className="inputcodigo" />
        < input placeholder='porcentaje ganancia ' value={porcentaje} onChange={(e) => setPorcentaje(e.target.value)} className="inputcodigo" />
        <input type='submit' value='buscar' className='buttonInput' />
      </form>
      <input
        type="file"
        onChange={(e) => {
          const file = e.target.files[0];
          readExcel(file);
        }}
      />
      <Detalles Results_Array={producto} porcentaje={porcentaje} />
    </div>
  );
}

export default App;