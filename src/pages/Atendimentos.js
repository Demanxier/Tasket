import React, { useState } from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import axios from 'axios';
import { toast } from 'react-toastify';

const Atendimentos = () => {
    const [data, setData] = useState('');
    const [horaInicio, setHoraInicio] = useState('');
    const [horaFim, setHoraFim] = useState('');
    const [resumo, setResumo] = useState('');
    const [id_Chamado, setId_Chamado] = useState('');
    const [id_Consultor, setId_Consultor] = useState('');

    const [tab, setTab] = useState('create');
    const [editAtendimento, setEditAtendimento] = useState({});
    const [editId, setEditId] = useState('');

    const [datIni, setDatIni] = useState('');
    const [datFim, setDatFim] = useState('');
    const [viewAtendimento, setViewAtendimento] = useState([]);


    // Função para buscar atendimento por ID
    const fetchAtendimento = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/atendimento/${editId}`);
            setEditAtendimento(response.data);
            setData(response.data.data);
            setHoraInicio(response.data.horaInicio);
            setHoraFim(response.data.horaFim);
            setResumo(response.data.resumo);
            setId_Chamado(response.data.id_chamado);
            setId_Consultor(response.data.id_consultor);
        } catch (error) {
            toast.error('Erro ao buscar atendimento.')
        }
    };

    const gravarAtendimento = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/atendimento', {
                data,
                horaInicio,
                horaFim,
                resumo,
                id_chamado: id_Chamado,
                id_consultor: id_Consultor,
            });
            toast.success('Atendimento criado com sucesso!');
            setData('');
            setHoraInicio('');
            setHoraFim('');
            setResumo('');
            setId_Chamado('');
            setId_Consultor('');
        } catch (error) {
            toast.error('Erro ao tentar criar o atendimento.');
            setData('');
            setHoraInicio('');
            setHoraFim('');
            setResumo('');
            setId_Chamado('');
            setId_Consultor('');
        }
    };

    const atualizarAtendimento = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:5000/api/atendimento/${editId}`, {
                data,
                horaInicio,
                horaFim,
                resumo,
                id_chamado: id_Chamado,
                id_consultor: id_Consultor,
            });
            toast.success('Atendimento atualizado com sucesso.');
        } catch (error) {
            toast.error('Erro ao tentar atualizar o atendimento.')
        }
    };

    const excluirAtendimento = async () => {
        const confirmacao = window.confirm('Deseja realmente excluir o atendimento?');
        if (confirmacao) {
            try {
                await axios.delete(`http://localhost:5000/api/atendimento/${editId}`);
                toast.success('Atendimento excluído com sucesso')
            } catch (error) {
                toast.error('Erro ao tentar excluir o atendimento.');
            }
        }
    };

    const buscarSemana = async () => {
        try {
            //Formato: yyyy-mm-dd
            const formatDatIni = datIni.toString().split('T')[0];
            const formatDatFim = datFim.toString().split('T')[0];
            const response = await axios.get(`http://localhost:5000/api/atendimento/periodo/${formatDatIni}/${formatDatFim}`);
            setViewAtendimento(Array.isArray(response.data) ? response.data : []);
            if (Array.isArray(response.data) && response.data.length === 0) {
                toast.error('Não há informações neste período.');
            }
        } catch (error) {
            toast.error('Erro ao buscar atendimento.')
        }
    };

    const exportToTxt = (data) => {
        // Construa o conteúdo do arquivo TXT
        const txtContent = data
            .map(
                (item) =>
                    `Titulo: ${item.titulo}\n` +
                    `Ticket: ${item.ticket_id}\n` +
                    `Responsável: ${item.ticket_responsavel}\n` +
                    `Data de Criação: ${item.ticket_dataCriacao}\n` +
                    `Data Atendimento: ${item.data}\n` +
                    `Hora Agendada: ${item.horaInicio}\n` +
                    `Desenvolvedor: ${item.nome}\n\n`
            )
            .join('---\n');

        // Crie um blob com o conteúdo do arquivo
        const blob = new Blob([txtContent], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);

        // Crie um link para download
        const a = document.createElement('a');
        a.href = url;
        a.download = 'relatorio_atendimentos.txt';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

        // Limpe o objeto URL
        URL.revokeObjectURL(url);
    };


    return (
        <div className='container mt-5'>
            <Tabs activeKey={tab} onSelect={(k) => setTab(k)} className="mb-3">
                <Tab eventKey="create" title="Criar">
                    <form onSubmit={gravarAtendimento}>
                        <h3>Criar Atendimento</h3>
                        <div className='mb-3 form-group'>
                            <label>Data:</label>
                            <input type='date' className='form-control' value={data} onChange={(e) => setData(e.target.value)} required />
                        </div>
                        <div className='mb-3 form-group'>
                            <label>Hora Início:</label>
                            <input type='time' className='form-control' value={horaInicio} onChange={(e) => setHoraInicio(e.target.value)} required />
                        </div>
                        <div className='mb-3 form-group'>
                            <label>Hora Fim:</label>
                            <input type='time' className='form-control' value={horaFim} onChange={(e) => setHoraFim(e.target.value)} required />
                        </div>
                        <div className='mb-3 form-group'>
                            <label>Resumo:</label>
                            <input type='text' className='form-control' value={resumo} onChange={(e) => setResumo(e.target.value)} />
                        </div>
                        <button type='submit' className='btn btn-primary'>Criar</button>
                    </form>
                </Tab>
                <Tab eventKey="edit" title="Editar">
                    <div className='mb-3'>
                        <label>ID do Atendimento:</label>
                        <input
                            type='text'
                            className='form-control'
                            value={editId}
                            onChange={(e) => setEditId(e.target.value)}
                            placeholder='Digite o ID do atendimento'
                        />
                        <button className='btn btn-info mt-2' onClick={fetchAtendimento}>
                            Buscar Atendimento
                        </button>
                    </div>
                    {editAtendimento && editId && (
                        <form onSubmit={atualizarAtendimento}>
                            <h3>Editar Atendimento</h3>
                            <div className='mb-3'>
                                <label>Data:</label>
                                <input type='date' className='form-control' value={data} onChange={(e) => setData(e.target.value)} />
                            </div>
                            <div className='mb-3'>
                                <label>Hora Início:</label>
                                <input type='time' className='form-control' value={horaInicio} onChange={(e) => setHoraInicio(e.target.value)} />
                            </div>
                            <div className='mb-3'>
                                <label>Hora Fim:</label>
                                <input type='time' className='form-control' value={horaFim} onChange={(e) => setHoraFim(e.target.value)} />
                            </div>
                            <div className='mb-3'>
                                <label>Resumo:</label>
                                <input type='text' className='form-control' value={resumo} onChange={(e) => setResumo(e.target.value)} />
                            </div>

                            <button type='submit' className='btn btn-primary'>Atualizar</button>
                            <button type='button' className='btn btn-danger ms-3' onClick={excluirAtendimento}>Excluir</button>
                        </form>
                    )}
                </Tab>
                <Tab eventKey="relat" title="Relatório">
                    <div className='mb-3'>
                        <label>Data inicial</label>
                        <input type='date' className='form-control' value={datIni} onChange={(e) => setDatIni(e.target.value)} />
                        <label>Data final</label>
                        <input type='date' className='form-control' value={datFim} onChange={(e) => setDatFim(e.target.value)} />
                        <button className='btn btn-info mt-2' onClick={buscarSemana}>Buscar</button>
                    </div>
                    {setViewAtendimento.length > 0 ? (
                        <table className="table table-bordered table-sm">
                            <thead>
                                <tr>
                                    <th>Titulo</th>
                                    <th>Ticket</th>
                                    <th>Responsavel</th>
                                    <th>Data de Criação</th>
                                    <th>Data atendimento</th>
                                    <th>Hora agendada</th>
                                    <th>Desenvolvedor</th>
                                </tr>
                            </thead>
                            <tbody>
                                {viewAtendimento.map((atendimento, index) => (
                                    <tr key={index}>
                                        <td>{atendimento.titulo}</td>
                                        <td>{atendimento.ticket_id}</td>
                                        <td>{atendimento.ticket_responsavel}</td>
                                        <td>{atendimento.ticket_dataCriacao}</td>
                                        <td>{atendimento.data}</td>
                                        <td>{atendimento.horaInicio}</td>
                                        <td>{atendimento.nome}</td>
                                    </tr>
                                ))}
                            </tbody>
                            <button className='btn btn-secondary mt-3' onClick={() => exportToTxt(viewAtendimento)}>Exportar</button>
                        </table>
                    ) : (
                        <p>Nenhum dado encontrado para o periodo selecionado.</p>
                    )}
                </Tab>
            </Tabs>
        </div>
    );
};
export default Atendimentos;