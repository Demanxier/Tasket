Realizai um projeto parecido com java, mas gostaria de aplicar com NodeJS e o frontEnd com React.

```mermaid
classDiagram
    role {
        int id PK
        varchar nome
    }
    
    usuario {
        int id PK
        varchar nome
        varchar email
        varchar senha
        int id_role FK
    }
    
    status {
        int id PK
        varchar nome
    }
    
    consultor {
        int id PK
        varchar nome
        varchar email
        decimal custoHora
    }
    
    chamados {
        int id PK
        varchar titulo
        varchar descricao
        int id_status FK
        int ticket_id UNIQUE
        varchar ticket_titulo
        varchar ticket_status
        date ticket_dataCriacao
        varchar ticket_resposavel
        varchar ticket_time
        varchar ticket_cliente
    }
    
    atendimento {
        int id PK
        date data
        time horaInicio
        time horaFim
        varchar resumo
        int id_consultor FK
        int id_chamado FK
    }
    
    tarefa {
        int id PK
        varchar nome
        varchar descricao
        date dataCriacao
        date dataConclusao
        int id_status FK
        int id_usuario FK
    }
    
    role --> usuario : usuario
    usuario "1" --> "1..*" tarefa : tarefa
    status --> chamados : chamados
    status --> tarefa : tarefa
    consultor --> atendimento : atendimento
    chamados --> atendimento : atendimento
    status --> atendimento : atendimento
```
