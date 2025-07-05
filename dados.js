// Este arquivo simula um banco de dados para o nosso aplicativo.

const usuarioSimulado = {
    id: 'uid_maria_silva',
    nome: 'Maria Silva',
    email: 'maria.silva@exemplo.com',
    cidade: 'São Paulo',
    estado: 'SP',
    estatisticas: {
        doados: 12,
        recebidos: 8,
    }
};

const livrosSimulados = [
    {
        id: 1,
        titulo: 'O Alquimista',
        autor: 'Paulo Coelho',
        editora: 'Rocco',
        ano: 1988,
        estadoConservacao: 'Usado',
        status: 'Disponível',
        doadorId: 'uid_outro_usuario_1'
    },
    {
        id: 2,
        titulo: 'A Culpa é das Estrelas',
        autor: 'John Green',
        editora: 'Intrínseca',
        ano: 2012,
        estadoConservacao: 'Usado',
        status: 'Disponível',
        doadorId: 'uid_outro_usuario_2'
    },
    {
        id: 3,
        titulo: 'Dom Quixote',
        autor: 'Miguel de Cervantes',
        editora: 'Penguin Classics',
        ano: 2015,
        estadoConservacao: 'Novo',
        status: 'Reservado',
        doadorId: 'uid_maria_silva' // Livro doado por nossa usuária
    },
    {
        id: 4,
        titulo: 'O Pequeno Príncipe',
        autor: 'Antoine de Saint-Exupéry',
        editora: 'Agir',
        ano: 1943,
        estadoConservacao: 'Usado',
        status: 'Disponível',
        doadorId: 'uid_outro_usuario_3'
    },
    {
        id: 5,
        titulo: '1984',
        autor: 'George Orwell',
        editora: 'Companhia das Letras',
        ano: 2009,
        estadoConservacao: 'Novo',
        status: 'Disponível',
        doadorId: 'uid_outro_usuario_4'
    },
    {
        id: 6,
        titulo: 'Orgulho e Preconceito',
        autor: 'Jane Austen',
        editora: 'Martin Claret',
        ano: 2013,
        estadoConservacao: 'Danificado',
        status: 'Disponível',
        doadorId: 'uid_outro_usuario_5'
    },
    {
        id: 7,
        titulo: 'Cem Anos de Solidão',
        autor: 'Gabriel García Márquez',
        editora: 'Record',
        ano: 1967,
        estadoConservacao: 'Usado',
        status: 'Disponível',
        doadorId: 'uid_outro_usuario_6'
    },
    {
        id: 8,
        titulo: 'Sapiens: Uma Breve História da Humanidade',
        autor: 'Yuval Noah Harari',
        editora: 'L&PM',
        ano: 2015,
        estadoConservacao: 'Novo',
        status: 'Disponível',
        doadorId: 'uid_maria_silva' // Outro livro doado por nossa usuária
    }
];