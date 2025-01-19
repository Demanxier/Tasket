import React, { useState } from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import axios from 'axios';
import { toast } from 'react-toastify';

const Chamados = () => {
    const [titulo, setTitulo] = useState('');
    const [descricao, setDescricao] = useState('');
    const [id_status, setId_status] = useState('');
    const [ticket_id, setTicket_id] = useState('');
    const [ticket_titulo, setTicket_titulo] = useState('');
    const [ticket_status, setTicket_status] = useState('');
    const [ticket_dataCriacao, setTicket_dataCriacao] = useState('');
    const [ticket_responsavel, setTicket_responsavel] = useState('');
    const [ticket_time, setTicket_time] = useState('');
    const [ticket_cliente, setTicket_cliente] = useState('');

    const [tab, setTab] = useState('create');
    const [editChamado, setEditChamado] = useState({});
    const [editId, setEditId] = useState('');

    const [viewChamado, setViewChamado] = useState([]);
    const [statusChamado, setStatusChamado] = useState('');

    // Função para buscar informações do ticket no Movidesk
    const buscarTicket = async () => {
        const output = document.getElementById("output");
        if (!ticket_id) {
            toast.error('Por favor, insira o ID do ticket.');
            return;
        }
        const meuToken = '056815C8-FC0D-45BC-BA7B-6C2DCA4D7AE1';
        const apiULR = `https://api.movidesk.com/public/v1/tickets?token=${meuToken}&id=${ticket_id}&$select=id,status,subject,createdDate,owner,ownerTeam&$expand=clients`;

        // const response = await axios.get(apiULR);
        try {
            const response = await fetch(apiULR);
            if (!response.ok) {
                output.innerHTML = response.status;
            }
            const ticket = await response.json();

            if (ticket) {
                setTicket_titulo(ticket.subject);
                setTicket_status(ticket.status);
                setTicket_dataCriacao(ticket.createdDate);
                setTicket_responsavel(ticket.owner?.businessName || "Não informado");
                setTicket_time(ticket.ownerTeam || "Não informado");
                setTicket_cliente(
                    ticket.clients?.[0]?.organization?.businessName || "Não informado"
                );
            } else {
                toast.error('Ticket não encontrado.');
            }
        } catch (error) {
            console.error("Erro ao buscar ticket:", error);
            toast.error('Erro ao buscar ticket. Verifique o console para mais detalhes.');
        }
    };

    //Gravar Chamado
    const gravarChamado = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/chamado', {
                titulo, descricao, id_status: 1,
                ticket_id, ticket_titulo, ticket_status, ticket_dataCriacao, ticket_responsavel, ticket_time, ticket_cliente
            });
            toast.success('Chamado criado com sucesso.');
            setTitulo('');
            setDescricao('');
            setId_status('');
            setTicket_id('');
            setTicket_titulo('');
            setTicket_status('');
            setTicket_dataCriacao('');
            setTicket_responsavel('');
            setTicket_time('');
            setTicket_cliente('');
        } catch (error) {
            toast.error('Erro ao tentar criar chamado.');
        }
    };

    const buscarMeuChamado = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/chamado/ticket/${editId}`);
            setEditChamado(response.data);
            setTitulo(response.data.titulo);
            setDescricao(response.data.descricao);
            setId_status(response.data.id_status);
            setTicket_id(response.data.ticket_id);
            setTicket_titulo(response.data.ticket_titulo);
            setTicket_status(response.data.ticket_status);
            setTicket_dataCriacao(response.data.ticket_dataCriacao);
            setTicket_responsavel(response.data.ticket_responsavel);
            setTicket_time(response.data.ticket_time);
            setTicket_cliente(response.data.ticket_cliente);
        } catch (error) {
            toast.error('Erro ao buscar chamado.');
        }
    };

    const atualizarChamado = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:5000/api/chamado/${editId}`, {
                titulo, descricao, id_status, ticket_id, ticket_titulo,
                ticket_status, ticket_dataCriacao, ticket_responsavel,
                ticket_time, ticket_cliente,
            });
            toast.success('Chamado atualizado com sucesso');
            setTitulo('');
            setDescricao('');
            setId_status('');
            setTicket_id('');
            setTicket_titulo('');
            setTicket_status('');
            setTicket_dataCriacao('');
            setTicket_responsavel('');
            setTicket_time('');
            setTicket_cliente('');
        } catch (error) {
            toast.error('Erro ao atualizar chamado.');
        }
    };

    const excluirChamado = async () => {
        const confirmacao = window.confirm('Deseja realmente excluir o chamado?');
        if (confirmacao)
            try {
                await axios.delete(`http://localhost:5000/api/chamado/${editId}`);
                toast.success('Chamado excluido com sucesso.');
                setTitulo('');
                setDescricao('');
                setId_status('');
                setTicket_id('');
                setTicket_titulo('');
                setTicket_status('');
                setTicket_dataCriacao('');
                setTicket_responsavel('');
                setTicket_time('');
                setTicket_cliente('');
            } catch (error) {
                toast.error('Erro ao tentar excluir chamado.');
            }
    };

    const buscarChamadoStatus = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/chamado/status/${statusChamado}`);
            setViewChamado(Array.isArray(response.data) ? response.data : []);
            if (Array.isArray(response.data) && response.data.length === 0) {
                toast.error('Não há chamados neste status.');
            }
        } catch (error) {
            toast.error('Erro ao tentar buscar chamados pelo status.');
        }

    }

    return (
        <div className='container mt-5'>
            <Tabs activeKey={tab} onSelect={(k) => setTab(k)} className='mb-3'>
                <Tab eventKey='create' title='Criar'>
                    <form onSubmit={gravarChamado}>
                        <h3>Criar chamado</h3>
                        <div className='mb-3 form-group'>
                            <label>Titulo:  </label>
                            <div className='form-group'>
                                <input type='text' value={titulo} onChange={(e) => setTitulo(e.target.value)} required />
                            </div>
                        </div>
                        <div className='mb-3 form-group'>
                            <label>Descricao:  </label>
                            <div className='form-group'>
                                <input type='text' value={descricao} onChange={(e) => setDescricao(e.target.value)} required />
                            </div>
                        </div>

                        {/* Campo de ID do Ticket */}
                        <div className='mb-3 form-group'>
                            <label>ID do Ticket:  </label>
                            <input
                                type="text" placeholder="Digite o ID do ticket" class="form-control"
                                value={ticket_id} onChange={(e) => setTicket_id(e.target.value)} required
                            />
                            <button type="button" class="btn btn-outline-primary" onClick={buscarTicket}>Buscar Ticket</button>
                        </div>
                        {/* Exibição dos Dados do Ticket */}
                        {ticket_titulo && (
                            <div>
                                <h3>Informações do Ticket do Movidesk</h3>
                                <p><strong>Título:</strong> {ticket_titulo}</p>
                                <p><strong>Status:</strong> {ticket_status}</p>
                                <p><strong>Data de Criação:</strong> {new Date(ticket_dataCriacao).toLocaleString()}</p>
                                <p><strong>Responsável:</strong> {ticket_responsavel}</p>
                                <p><strong>Time:</strong> {ticket_time}</p>
                                <p><strong>Cliente:</strong> {ticket_cliente}</p>
                            </div>
                        )}

                        <button type="submit" className='btn btn-primary'>Gravar Chamado</button>
                    </form >
                </Tab>
                <Tab eventKey='edit' title='Editar'>
                    <div className='mb-3'>
                        <label>Numero do chamado:</label>
                        <input type='text' className='form-control' value={editId} onChange={(e) => setEditId(e.target.value)} placeholder='Ticket_id' />
                        <button className='btn btn-info mt-2' onClick={buscarMeuChamado}>Buscar Chamado</button>
                    </div>
                    {editChamado && editId && (
                        <form onSubmit={atualizarChamado}>
                            <h3>Editar Chamado</h3>
                            <div className='mb-3'>
                                <label>Titulo:</label>
                                <input type='text' className='form-control' value={titulo} onChange={(e) => setTitulo(e.target.value)} />
                            </div>
                            <div className='mb-3'>
                                <label>Descrição:</label>
                                <input type='text' className='form-control' value={descricao} onChange={(e) => setDescricao(e.target.value)} />
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
                            <div className='mb-3'>
                                <label>Numero do ticket no movidesk:</label>
                                <input type='text' className='form-control' value={ticket_id} onChange={(e) => setTicket_id(e.target.value)} />
                            </div>
                            <div className='mb-3'>
                                <label>Ticket titulo:</label>
                                <input type='text' className='form-control' value={ticket_titulo} onChange={(e) => setTicket_titulo(e.target.value)} />
                            </div>
                            <div className='mb-3'>
                                <label>Ticket status:</label>
                                <input type='text' className='form-control' value={ticket_status} onChange={(e) => setTicket_status(e.target.value)} />
                            </div>
                            <div className='mb-3'>
                                <label>Data de abertura do ticket:</label>
                                <input type='text' className='form-control' value={ticket_dataCriacao} onChange={(e) => setTicket_dataCriacao(e.target.value)} />
                            </div>
                            <div className='mb-3'>
                                <label>Responsável do ticket:</label>
                                <input type='text' className='form-control' value={ticket_responsavel} onChange={(e) => setTicket_responsavel(e.target.value)} />
                            </div>
                            <div className='mb-3'>
                                <label>Time:</label>
                                <input type='text' className='form-control' value={ticket_time} onChange={(e) => setTicket_time(e.target.value)} />
                            </div>
                            <div className='mb-3'>
                                <label>Cliente:</label>
                                <input type='text' className='form-control' value={ticket_cliente} onChange={(e) => setTicket_cliente(e.target.value)} />
                            </div>
                            <button type='submit' className='btn btn-primary'>Atualizar</button>
                            <button type='button' className='btn btn-danger ms-3' onClick={excluirChamado}>Excluir</button>
                        </form>
                    )}
                </Tab>
                <Tab eventKey='relat' title='Relatório'>
                    <div className='mb-3'>
                        <label>Status:</label>
                        <select className='form-control' value={statusChamado} onChange={(e) => setStatusChamado(e.target.value)}>
                            <option value="" disabled>Selecione o status</option>
                            <option value="1">Novo</option>
                            <option value="2">Pausado</option>
                            <option value="3">Agendado</option>
                            <option value="4">Cancelado</option>
                            <option value="5">Concluído</option>
                        </select>
                        <button className='btn btn-info mt-2' onClick={buscarChamadoStatus}>Buscar</button>
                    </div>
                    {viewChamado.length > 0 ? (
                        <table className='table table-bordered table-sm'>
                            <thead>
                                <tr>
                                    <th>Titulo</th>
                                    <th>Descrição</th>
                                    <th>Status</th>
                                    <th>ID no Movidesk</th>
                                    <th>Titulo no Movidesk</th>
                                    <th>Status no Movidesk</th>
                                    <th>Data de abertura</th>
                                    <th>Responsável</th>
                                    <th>Time</th>
                                    <th>Cliente</th>
                                </tr>
                            </thead>
                            <tbody>
                                {viewChamado.map((chamado, index) => (
                                    <tr key={index}>
                                        <td>{chamado.titulo}</td>
                                        <td>{chamado.descricao}</td>
                                        <td>{chamado.id_status}</td>
                                        <td>{chamado.ticket_id}</td>
                                        <td>{chamado.ticket_titulo}</td>
                                        <td>{chamado.ticket_status}</td>
                                        <td>{chamado.ticket_dataCriacao}</td>
                                        <td>{chamado.ticket_responsavel}</td>
                                        <td>{chamado.ticket_time}</td>
                                        <td>{chamado.ticket_cliente}</td>
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
export default Chamados;