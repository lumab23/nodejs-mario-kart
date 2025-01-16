<p>Este projeto é uma simulação de corrida baseada no universo de Mario Kart, desenvolvido como parte da formação em Node.js da <a href="https://github.com/digitalinnovationone/formacao-nodejs.git">Digital Innovation One (DIO)</a>.</p>

<h2>Como funciona?</h2>
<p>O jogo consiste em uma corrida entre dois jogadores, cada um com atributos específicos (velocidade, manobrabilidade e poder). A cada rodada, um tipo de pista (reta, curva ou confronto) é sorteado, e os jogadores competem com base nos atributos mais adequados para o tipo de pista. O jogador com mais pontos ao final da corrida é declarado vencedor.</p>

<h2>Alterações realizadas</h2>
<ul>
    <li><strong>Escolha de jogador:</strong> Foi implementado um sistema para que o usuário escolha seu personagem antes de iniciar a corrida.</li>
    <li><strong>Adicionado oponente aleatório:</strong> Após a escolha do jogador, um oponente aleatório é selecionado da lista de personagens restantes.</li>
    <li><strong>Novo sistema de turbo:</strong> No tipo de pista "Confronto", há uma chance aleatória de o vencedor ganhar um ponto extra como bônus de turbo.</li>
    <li><strong>Reset de pontos:</strong> Os pontos dos jogadores são redefinidos ao iniciar uma nova corrida.</li>
    <li><strong>Funcionalidade de jogar novamente:</strong> Após o término da corrida, o jogador pode optar por jogar novamente ou encerrar.</li>
</ul>

<h2>Tecnologias utilizadas</h2>
<ul>
    <li><strong>Node.js:</strong> Plataforma principal utilizada para desenvolver o jogo.</li>
    <li><strong>readline:</strong> Biblioteca nativa do Node.js para manipulação de entrada e saída no terminal.</li>
</ul>

<h2>Como executar o projeto?</h2>
<ol>
    <li>Clone este repositório:</li>
    <pre><code>git clone https://github.com/lumab23/nodejs-mario-kart.git</code></pre>
    <li>Navegue até o diretório do projeto:</li>
    <pre><code>cd nodejs-mario-kart</code></pre>
    <li>Execute o projeto com Node.js:</li>
    <pre><code>node src/index.js</code></pre>
</ol>

<h2>Créditos</h2>
<p>O projeto original foi desenvolvido como parte da formação Node.js da <a href="https://github.com/digitalinnovationone/formacao-nodejs.git">Digital Innovation One (DIO)</a>. Este repositório é uma versão modificada e expandida, incorporando novos recursos.</p>
