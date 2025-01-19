import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Tab, Tabs } from 'react-bootstrap';
import { toast } from 'react-toastify';

const Tarefa = () => {
    const [nome, setNome] = useState('');
    const [descricao, setDescricao] = useState('');
    const [dataCriacao, setDataCriacao] = useState('');
    const [dataConclusao, setDataConclusao] = useState('');
    const [id_status, setId_status] = useState('');
    const [id_usuario, setId_usuario] = useState('');

    const [tab, setTab] = useState('create');
    const [editTarefa, setEditTarefa] = useState({});
    const [editId, setEditId] = useState('');

    const [viewTarefa, setViewTarefa] = useState([]);
    const [statusTarefa, setStatusTarefa] = useState('');

    //Recuperar o ID do usuário logado
    useEffect(() => {
        const UsuarioId = localStorage.getItem('id_usuario');
        if (UsuarioId) {
            setId_usuario(parseInt(UsuarioId, 10));
        } else {
            throw new Error('ID do usuário não encontrado no localStorage.');
        }
    }, []);

    //Gravar Tarefa
    const gravarTarefa = async (e) => {
        e.preventDefault();
        const currentDate = new Date().toLocaleDateString('en-CA');
        setDataCriacao(currentDate);
        try {
            const response = await axios.post('http://localhost:5000/api/tarefa', {
                nome, descricao, dataCriacao: currentDate, id_status: 1, id_usuario,
            });
            toast.success('Tarefa criada com sucesso.');
            setNome('');
            setDescricao('');
        } catch (error) {
            toast.error('Erro ao tentar criar tarefa.');
            setNome('');
            setDescricao('');
        }
    }

    const buscarTarefa = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/tarefa/${editId}`);
            setEditTarefa(response.data);
            setNome(response.data.nome);
            setDescricao(response.data.descricao);
            setDataCriacao(response.data.dataCriacao);
            setDataConclusao(response.data.dataConclusao);
            setId_status(response.data.id_status);
            setId_usuario(response.data.id_usuario);
        } catch (error) {
            toast.error('Erro ao buscar tarefas.');
        }
    };

    const atualizarTarefa = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:5000/api/tarefa/${editId}`, {
                nome, descricao, dataCriacao, dataConclusao, id_status, id_usuario,
            });
            toast.success('Tarefa atualizada com sucesso.');
            setNome('');
            setDescricao('');
            setDataCriacao('');
            setDataConclusao('');
            setId_status('');
            setId_usuario('');
        } catch (error) {
            toast.error('Error ao tentar atualizar.');
        }
    };

    const exluirTarefa = async () => {
        const confirmacao = window.confirm('Deseja realmente excluir a tarefa?');
        if (confirmacao) {
            try {
                await axios.delete(`http://localhost:5000/api/tarefa/${editId}`);
                toast.success('Tarefa excluida com sucesso.');
                setNome('');
                setDescricao('');
                setDataCriacao('');
                setDataConclusao('');
                setId_status('');
                setId_usuario('');
            } catch (error) {
                toast.error('Erro ao tentar excluir a tarefa.');
            }
        }
    };

    const buscarTarefaStatus = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/tarefa/status/${statusTarefa}`);
            setViewTarefa(Array.isArray(response.data) ? response.data : []);
            if (Array.isArray(response.data) && response.data.length === 0) {
                toast.error('Não há tarefas neste status.');
            }
        } catch (error) {
            toast.error('Erro ao tentar buscar tarefas pelo status.');
        }
    };

    return (
        <div className='container mt-5'>
            <Tabs activeKey={tab} onSelect={(k) => setTab(k)} className='mb-3'>
                <Tab eventKey="create" title="Criar">
                    <form onSubmit={gravarTarefa}>
                        <h3>Criar tarefa</h3>
                        <div className='mb-3 form-group'>
                            <label>Titulo:</label>
                            <div className='form-group'>
                                <input type='text' value={nome} onChange={(e) => setNome(e.target.value)} required />
                            </div>
                        </div>
                        <div className='mb-3 form-group'>
                            <label>Descrição:</label>
                            <div className='form-group'>
                                <input type='text' value={descricao} onChange={(e) => setDescricao(e.target.value)} required />
                            </div>
                        </div>
                        <div className='mb-3 form-group'>
                            <button type='submit' className='btn btn-primary'>Criar</button>
                        </div>
                    </form>
                </Tab>
                <Tab eventKey="edit" title="Editar">
                    <div className='mb-3'>
                        <label>ID da tarefa</label>
                        <input type='text' className='form-control'
                            value={editId} onChange={(e) => setEditId(e.target.value)}
                            placeholder='Digite o ID da Tarefa' />
                        <button className='btn btn-info mt-2' onClick={buscarTarefa}>Buscar</button>
                    </div>
                    {editTarefa && editId && (
                        <form onSubmit={atualizarTarefa}>
                            <h3>Editar tarefa</h3>
                            <div className='mb-3'>
                                <label>Nome:</label>
                                <input type='text' className='form-control' value={nome} onChange={(e) => setNome(e.target.value)} />
                            </div>
                            <div className='mb-3'>
                                <label>Descrição:</label>
                                <input type='text' className='form-control' value={descricao} onChange={(e) => setDescricao(e.target.value)} />
                            </div>
                            <div className='mb-3'>
                                <label>Data de conclusão:</label>
                                <input type='date' className='form-control' value={dataConclusao} onChange={(e) => setDataConclusao(e.target.value)} />
                            </div>
                            <div className='mb-3'>
                                <label>Status:</label>
                                <select className='form-control' value={id_status} onChange={(e) => setId_status(e.target.value)}>
                                    <option value="" disabled>Selecione o status</option>
                                    <option value="1">Novo</option>
                                    <option value="2">Pausado</option>
                                    <option value="3">Agendado</option>
                                    <option value="4">Cancelado</option>
                                    <option value="5">Concluído</option>
                                </select>
                            </div>
                            <button type='submit' className='btn btn-primary'>Atualizar</button>
                            <button type='button' className='btn btn-danger ms-3' onClick={exluirTarefa}>Excluir</button>
                        </form>
                    )}
                </Tab>
                <Tab eventKey='relat' title='Relatorio'>
                    <div className='mb-3'>
                        <label>Status:</label>
                        <select className='form-control' value={statusTarefa} onChange={(e) => setStatusTarefa(e.target.value)}>
                            <option value="" disabled>Selecione o status</option>
                            <option value="1">Novo</option>
                            <option value="2">Pausado</option>
                            <option value="3">Agendado</option>
                            <option value="4">Cancelado</option>
                            <option value="5">Concluído</option>
                        </select>
                        <button className='btn btn-info mt-2' onClick={buscarTarefaStatus}>Buscar</button>
                    </div>
                    {viewTarefa.length > 0 ? (
                        <table className='table table-bordered table-sm'>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Nome</th>
                                    <th>Descrição</th>
                                    <th>Data de criação</th>
                                    <th>Data de conclusão</th>
                                    <th>Status</th>

                                </tr>
                            </thead>
                            <tbody>
                                {viewTarefa.map((tarefa, index) => (
                                    <tr key={index}>
                                        <td>{tarefa.id}</td>
                                        <td>{tarefa.nome}</td>
                                        <td>{tarefa.descricao}</td>
                                        <td>{tarefa.dataCriacao}</td>
                                        <td>{tarefa.dataConclusao}</td>
                                        <td>{tarefa.id_status}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p>Nenhum dado encontrado para esse status.</p>
                    )}
                </Tab>
            </Tabs>
        </div>
    );
};
export default Tarefa;