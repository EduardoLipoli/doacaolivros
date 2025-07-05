// Espera o documento HTML inteiro ser carregado.
document.addEventListener('DOMContentLoaded', () => {

    // --- FUNÇÕES DE RENDERIZAÇÃO (usando dados do dados.js) ---
    // Estas funções desenham os dados simulados na tela.

    function criarCardLivro(livro, tipo = 'busca') {
        const statusClass = livro.status === 'Disponível' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800';
        const estadoIcone = livro.estadoConservacao === 'Danificado' ? 'fa-exclamation-triangle' : 'fa-info-circle';
        let botoesHTML = '';

        if (tipo === 'meus-livros') {
            botoesHTML = `
                <button onclick="alert('Funcionalidade de exclusão não implementada.')" class="flex-1 bg-red-100 text-red-700 py-2 rounded-lg font-medium">Excluir</button>
                <button onclick="alert('Funcionalidade de edição não implementada.')" class="flex-1 bg-azul-escuro text-white py-2 rounded-lg font-medium">Editar</button>
            `;
        } else {
            botoesHTML = `
                <button onclick="alert('Solicitação para o livro \\'${livro.titulo}\\' enviada!')" class="w-full bg-azul-escuro text-white py-2 rounded-lg font-medium hover:bg-azul-claro transition">Solicitar</button>
            `;
        }

        return `
            <div class="book-card bg-white rounded-xl shadow-md overflow-hidden">
                <div class="p-4">
                    <div class="flex justify-between items-start">
                        <div><h3 class="font-bold text-lg">${livro.titulo}</h3><p class="text-gray-600">${livro.autor}</p></div>
                        <span class="${statusClass} text-xs px-2 py-1 rounded-full">${livro.status}</span>
                    </div>
                    <div class="mt-3 text-sm text-gray-500">
                        <div class="flex mb-2">
                            <span class="mr-4"><i class="fas fa-book mr-1"></i> ${livro.editora}</span>
                            <span><i class="fas fa-calendar mr-1"></i> ${livro.ano}</span>
                        </div>
                        <div><span><i class="fas ${estadoIcone} mr-1"></i> Estado: ${livro.estadoConservacao}</span></div>
                    </div>
                    <div class="mt-4 flex space-x-2">${botoesHTML}</div>
                </div>
            </div>`;
    }

    function criarItemLivroPerfil(livro) {
        const statusClass = livro.status === 'Disponível' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800';
        return `
            <div class="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                <div><h4 class="font-medium">${livro.titulo}</h4><p class="text-sm text-gray-500">${livro.autor}</p></div>
                <span class="${statusClass} text-xs px-2 py-1 rounded-full">${livro.status}</span>
            </div>`;
    }
    
    // --- FUNÇÕES DE AUTENTICAÇÃO (usando Firebase real) ---

    function registerUser() {
        const name = document.getElementById('register-name').value;
        const email = document.getElementById('register-email').value;
        const password = document.getElementById('register-password').value;

        if (!name || !email || !password) {
            alert("Por favor, preencha todos os campos.");
            return;
        }

        auth.createUserWithEmailAndPassword(email, password)
            .then(userCredential => {
                const user = userCredential.user;
                return db.collection("usuarios").doc(user.uid).set({
                    id_usuario: user.uid,
                    nome: name,
                    email: email,
                    tipo_usuario: "leitor",
                    criado_em: new Date()
                });
            })
            .then(() => {
                alert("Conta criada com sucesso! Você será redirecionado para o login.");
                window.location.href = 'login.html';
            })
            .catch(error => {
                console.error("Erro no cadastro:", error);
                if (error.code == 'auth/email-already-in-use') alert("Este e-mail já está em uso.");
                else if (error.code == 'auth/weak-password') alert("A senha é muito fraca. Use pelo menos 6 caracteres.");
                else alert("Ocorreu um erro ao criar a conta.");
            });
    }

    function login() {
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;

        if (!email || !password) {
            alert("Por favor, preencha e-mail e senha.");
            return;
        }
        
        auth.signInWithEmailAndPassword(email, password)
            .catch(error => {
                console.error("Erro de login:", error.code);
                alert("E-mail ou senha incorretos.");
            });
    }

    function logout() {
        auth.signOut().catch(error => console.error("Erro ao fazer logout:", error));
    }

    // --- EXPÕE AS FUNÇÕES PARA O HTML ---
    window.registerUser = registerUser;
    window.login = login;
    window.logout = logout;


    // --- LÓGICA CENTRAL DE AUTENTICAÇÃO E RENDERIZAÇÃO ---
    
    auth.onAuthStateChanged(user => {
        const currentPage = window.location.pathname.split('/').pop();
        const paginasProtegidas = ['home.html', 'donate.html', 'search.html', 'mybooks.html', 'profile.html'];

        if (user) {
            // --- USUÁRIO LOGADO (LÓGICA REAL) ---
            if (currentPage === 'login.html' || currentPage === 'register.html') {
                window.location.href = 'home.html';
            }

            // --- RENDERIZAÇÃO DE DADOS (LÓGICA SIMULADA) ---
            // Uma vez que o usuário está logado, preenchemos a tela com os dados de 'dados.js'
            
            // Personaliza o header com o nome do usuário simulado
            const welcomeText = document.querySelector('p.text-azul-claro.text-sm');
            if(welcomeText) {
                // Usamos o nome do usuário SIMULADO, não o do usuário real que logou.
                welcomeText.textContent = `Bem-vindo(a), ${usuarioSimulado.nome}!`;
            }

            // Lógica de renderização específica para cada página
            if (currentPage === 'home.html') {
                const container = document.getElementById('lista-livros-home');
                if (container.innerHTML === "") { // Evita renderizar múltiplas vezes
                    const livrosHome = [...livrosSimulados].sort(() => 0.5 - Math.random()).slice(0, 4);
                    livrosHome.forEach(livro => container.innerHTML += criarCardLivro(livro, 'busca'));
                }
            }
            if (currentPage === 'search.html') {
                const container = document.getElementById('lista-livros-busca');
                 if (container.innerHTML === "") {
                    livrosSimulados.forEach(livro => container.innerHTML += criarCardLivro(livro, 'busca'));
                 }
            }
            if (currentPage === 'mybooks.html') {
                const container = document.getElementById('lista-meus-livros');
                 if (container.innerHTML === "") {
                    const meusLivros = livrosSimulados.filter(livro => livro.doadorId === usuarioSimulado.id);
                    document.getElementById('contador-meus-livros').textContent = `${meusLivros.length} livros`;
                    meusLivros.forEach(livro => container.innerHTML += criarCardLivro(livro, 'meus-livros'));
                 }
            }
            if (currentPage === 'profile.html') {
                document.getElementById('profile-nome').textContent = usuarioSimulado.nome;
                document.getElementById('profile-email').textContent = usuarioSimulado.email;
                document.getElementById('profile-local').textContent = `${usuarioSimulado.cidade}, ${usuarioSimulado.estado}`;
                document.getElementById('stats-doados').textContent = usuarioSimulado.estatisticas.doados;
                document.getElementById('stats-recebidos').textContent = usuarioSimulado.estatisticas.recebidos;

                const container = document.getElementById('lista-livros-perfil');
                 if (container.innerHTML === "") {
                    const meusLivros = livrosSimulados.filter(livro => livro.doadorId === usuarioSimulado.id);
                    meusLivros.forEach(livro => container.innerHTML += criarItemLivroPerfil(livro));
                 }
            }

        } else {
            // --- USUÁRIO DESLOGADO (LÓGICA REAL) ---
            if (paginasProtegidas.includes(currentPage)) {
                window.location.href = 'login.html';
            }
        }
    });
});