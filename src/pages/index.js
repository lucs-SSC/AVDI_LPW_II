import React, { useState, useEffect} from "react";

import "./styles.css";

function Home() {
  const [professor, setProfessor] = useState('')
  const [disciplina, setDisciplina] = useState('')
  const [periodo, setPeriodo] = useState('')
  const [carga, setCarga] = useState('')
  const [info, setInfo] = useState([])

  function handleAddClient(event){
    event.preventDefault();
    const data = {
      id: new Date().getTime(),
      professor,
      disciplina,
      periodo,
      carga
    }

    setInfo([...info,data])
    setProfessor('')
    setDisciplina('')
    setPeriodo('')
    setCarga('')
  }
  
  function handleDelete(id){
    setInfo(info.filter(inf => inf.id !== id))
  }

  useEffect(()=>{
    function loadData(){
      const storagedInfo = localStorage.getItem('cadgrade:info')
      if(storagedInfo){
        setInfo(JSON.parse(storagedInfo))
      }
    }
    loadData()
  },[])
  
  useEffect(()=>{
    function saveData(){
      localStorage.setItem('cadgrade:info', JSON.stringify(info))
    }
    saveData()
  }, [info])

  return (
    <>
      <header className="header">
        <h1>Sistemas de Informação</h1>
      </header>
    
      <main className="content">
        <form className="cadastro" onSubmit={handleAddClient}>
          <label className ="form-title">Período</label>
          <select className="select-box" name="periodo" 
            value={periodo}
            onChange={(event) => setPeriodo(event.target.value)}
            required
          >
            <option selected disabled value="" >Selecione o Período</option>
            <option value="1° Período">1° Período</option>
            <option value="2° Período">2° Período</option>
            <option value="3° Período">3° Período</option>
            <option value="4° Período">4° Período</option>
            <option value="5° Período">5° Período</option>
            <option value="6° Período">6° Período</option>
            <option value="7° Período">7° Período</option>
            <option value="8° Período">8° Período</option>
          </select>

          <label className ="form-title">Professor</label>
          <select className="select-box" name="professor"
            value={professor}
            onChange={(event) => setProfessor(event.target.value)}
            required
          >
            <option selected disabled value="">Selecione o Professor</option>
            <option value="Luiz Cláudio">Luiz Cláudio</option>
            <option value="Débora">Débora</option>
            <option value="Rafael">Rafael</option>
            <option value="Marcelo">Marcelo</option>
            <option value="Aurélio">Aurélio</option>
          </select>
          
          <label className ="form-title">Disciplina</label>
          <input name="disciplina"
          type="text"
          placeholder="Informe a Disciplina"
          value={disciplina}
          onChange = {(event) => setDisciplina(event.target.value)} 
          required
          />
          <label className ="form-title">Carga Horária</label>
          <input name="carga"
          type="text"
          placeholder="Informe a Carga Horária"
          value={carga}
          onChange = {(event) => setCarga(event.target.value)} 
          required
          />
          <button type="submit">Enviar</button>
        </form>
        <table>
          <thead>
            <tr>
              <th>Período</th>
              <th>Professor</th>
              <th>Disciplina</th>
              <th>Carga Horária</th>
              <th colSpan={1}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {info.map(inf =>(
                <tr>
                  <td>{inf.periodo}</td>
                  <td>{inf.professor}</td>
                  <td>{inf.disciplina}</td>
                  <td>{inf.carga}</td>
                  <td>
                    <button className="Excluir"
                    onClick = {() => handleDelete(inf.id)}
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
            ))}
          </tbody>
        </table>
      </main>

      <footer className="footer">
        <h1>Feito por: Lucas Corrêa</h1>
      </footer>
    </>
  );
}

export { Home };
