import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap';

const Dashboard = () => {
    
    const [tarefas, setTarefas] = useState({ novo: [], pausado: [], agendado: [] });
    const [chamados, setChamados] = useState({novo: [], pausado: [], agendado: [] });
    const [atendimentos, setAtendimentos] = useState([]);

    useEffect(() => {

        const buscarTarefas = async () =>{
            
            const URLnovo = 'http://localhost:5000/api/tarefa/status/1';
            const URLpausado = 'http://localhost:5000/api/tarefa/status/2';
            const URLagendado = 'http://localhost:5000/api/tarefa/status/3';

            try {
                const response = await axios.get(URLnovo);
                const novoArray = Array.isArray(response.data) ? response.data : [response.data];
                setTarefas((prevTarefas) => ({
                    ...prevTarefas,
                    novo: novoArray,
                }));
            } catch (error) {
                if(error.response?.status === 404){
                    return { novo: [] };
                }
                throw error;
            }
            try {
                const response = await axios.get(URLpausado);
                const novoArray = Array.isArray(response.data) ? response.data : [response.data];
                setTarefas((prevTarefas) => ({
                    ...prevTarefas,
                    pausado: novoArray,
                }));
            } catch (error) {
                if(error.response?.status === 404){
                    return { pausado: [] };
                }
                throw error;
            }
            try {
                const response = await axios.get(URLagendado);
                const novoArray = Array.isArray(response.data) ? response.data : [response.data];
                setTarefas((prevTarefas) => ({
                    ...prevTarefas,
                    agendado: novoArray,
                }));
            } catch (error) {
                if(error.response?.status === 404){
                    return { agendado: [] };
                }
                throw error;
            }
        }

        const buscarChamados = async () =>{
            const novoURL = 'http://localhost:5000/api/chamado/status/1';
            const pausadoURL = 'http://localhost:5000/api/chamado/status/2';
            const agendadoURL = 'http://localhost:5000/api/chamado/status/3';

            try {
                const response = await axios.get(novoURL);
                const novoArray = Array.isArray(response.data) ? response.data : [response.data];
                setChamados((prevChamados)=>({
                    ...prevChamados,
                    novo: novoArray,
                }));
            } catch (error) {
                if(error.response?.status === 404){
                    return { novo: [] };
                }
                throw error;
            }
            try {
                const response = await axios.get(pausadoURL);
                const novoArray = Array.isArray(response.data) ? response.data : [response.data];
                setChamados((prevChamados)=>({
                    ...prevChamados,
                    pausado: novoArray,
                }));
            } catch (error) {
                if(error.response?.status === 404){
                    return { pausado: [] };
                }
                throw error;
            }
            try {
                const response = await axios.get(agendadoURL);
                const novoArray = Array.isArray(response.data) ? response.data : [response.data];
                setChamados((prevChamados)=>({
                    ...prevChamados,
                    agendado: novoArray,
                }));
            } catch (error) {
                if(error.response?.status === 404){
                    return { agendado: [] };
                }
                throw error;
            }
        }

        const buscarAtendimentos = async () =>{
            try {
                const hoje = new Date();
                const formatData = hoje.toISOString().split('T')[0]; //Formato yyyy-mm-dd

                const response = await axios.get(`http://localhost:5000/api/atendimento/data/${formatData}`);
                setAtendimentos(Array.isArray(response.data)? response.data : [response.data]);
            } catch (error) {
                if(error.response?.status === 404){
                    return { atendimentos: [] };
                }
                throw error;
            }
        }
        
        buscarTarefas();
        buscarChamados();
        buscarAtendimentos();
    }, []);

    return (
        <div className="container mt-5">
      <header className="mb-4 text-center">
        <h2 className="display-4">Tasket: Organização Pessoal</h2>
      </header>

      <section className="mb-5">
        <h3 className="mb-3">Atendimentos de Hoje</h3>
        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead className="table-dark">
              <tr>
                <th>Título</th>
                <th>Ticket</th>
                <th>Responsável</th>
                <th>Data de Abertura</th>
                <th>Agendamento</th>
                <th>Hora</th>
                <th>Desenvolvedor</th>
              </tr>
            </thead>
            <tbody>
              {atendimentos.map((atendimento) => (
                <tr key={atendimento.id}>
                  <td>{atendimento.titulo}</td>
                  <td>{atendimento.ticket_id}</td>
                  <td>{atendimento.ticket_responsavel}</td>
                  <td>{new Date(atendimento.ticket_dataCriacao).toLocaleDateString()}</td>
                  <td>{new Date(atendimento.data).toLocaleDateString()}</td>
                  <td>{atendimento.horaInicio}</td>
                  <td>{atendimento.nome}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-5">
        <h3 className="mb-3">Tarefas</h3>
        <div className="row">
          {["novo", "pausado", "agendado"].map((status) => (
            <div className="col-md-4 mb-4" key={status}>
              <div className="card shadow-sm">
                <div className="card-header bg-secondary text-white">
                  {status === "novo" ? "Novo" : status === "pausado" ? "Pausado" : "Agendado"}
                </div>
                <div className="card-body">
                  {tarefas[status]?.length > 0 ? (
                    <ul className="list-group">
                      {tarefas[status].map((tarefa) => (
                        <li key={tarefa.id} className="list-group-item">
                          <h6>{tarefa.nome}</h6>
                          <p>{tarefa.descricao}</p>
                          <small className="text-muted">
                            Criado em: {new Date(tarefa.dataCriacao).toLocaleDateString()}
                          </small>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-muted">Sem tarefas neste status.</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h3 className="mb-3">Chamados</h3>
        <div className="row">
          {["novo", "pausado", "agendado"].map((status) => (
            <div className="col-md-4 mb-4" key={status}>
              <div className="card shadow-sm">
                <div className="card-header bg-secondary text-white">
                  {status === "novo" ? "Novo" : status === "pausado" ? "Pausado" : "Agendado"}
                </div>
                <div className="card-body">
                  {chamados[status]?.length > 0 ? (
                    <ul className="list-group">
                      {chamados[status].map((chamado) => (
                        <li key={chamado.id} className="list-group-item">
                          <h6>{chamado.titulo}</h6>
                          <p>Ticket: {chamado.ticket_id}</p>
                          <p>Responsável: {chamado.ticket_responsavel}</p>
                          <small className="text-muted">
                            Abertura: {new Date(chamado.ticket_dataCriacao).toLocaleDateString()}
                          </small>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-muted">Sem chamados neste status.</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
    );
};

export default Dashboard;