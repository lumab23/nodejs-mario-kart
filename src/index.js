const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

async function prompt(question) {
    return new Promise((resolve) => rl.question(question, resolve));
}

// arr de jogadores
const players = [
  { name: "Mario", speed: 4, maneuverability: 3, power: 3, points: 0 },
  { name: "Peach", speed: 3, maneuverability: 4, power: 2, points: 0 },
  { name: "Yoshi", speed: 2, maneuverability: 4, power: 3, points: 0 },
  { name: "Bowser", speed: 5, maneuverability: 2, power: 5, points: 0 },
  { name: "Luigi", speed: 3, maneuverability: 4, power: 4, points: 0 },
  { name: "Donkey Kong", speed: 2, maneuverability: 2, power: 5, points: 0 },
]

// lançamento do dado 
async function rollDice() {
  return Math.floor(Math.random() * 6) + 1
}

// bloco aleatório
async function getRandomBlock() {
  let random = Math.random();
  let result;

  switch (true) {
      case random < 0.33:
          result = "RETA";
          break;
      case random < 0.66:
          result = "CURVA"
          break;
      default:
          result = "CONFRONTO"
  }

  return result; 
}

// lançamento do dado
async function logRoll(player, block, dice, att) {
  console.log(`${player.name} 🎲 rolou um dado de ${block}: ${dice} + ${att} = ${dice + att}`)
}

// escolha do usuário 
async function getPlayerChoice(players) {
  console.log("\n🏁Simulação de corridas de Mario Kart!🏁\n")
  console.log("------------------------------------------------")
  console.log("Jogadores: \n");
  players.forEach(player => { 
    console.log(` - ${player.name} (Velocidade: ${player.speed}, Manobrabilidade: ${player.maneuverability}, Poder: ${player.power}, Pontos: ${player.points})`)
  });

  let playerName;
  while (true) {
    playerName = await prompt("\nDigite o nome do jogador: ");
    const isValid = players.some(player => player.name.toLowerCase() === playerName.toLowerCase());
    if (isValid) {
      break;
    } else {
      console.log("Nome inválido. Escolha um dos jogadores listados.")
    }
  }

  const playerChoice = players.find(player => player.name.toLowerCase() === playerName.toLowerCase());
  const remainingPlayers = players.filter(player => player !== playerChoice);
  const randomPlayer = remainingPlayers[Math.floor(Math.random() * remainingPlayers.length)];

  console.log(`\nVocê escolheu ${playerChoice.name}.`);
  console.log(`Oponente: ${randomPlayer.name}\n`);

  return [playerChoice, randomPlayer];
}

async function playRound(selectedPlayers) {
  const block = await getRandomBlock();
  console.log(`🏁 Block: ${block}`);

  const results = [] 

  for (const player of selectedPlayers) {
      const dice = await rollDice();
      let att = 0;

      if (block === "RETA") {
          att = player.speed;
      } else if (block === "CURVA") {
          att = player.maneuverability;
      } else if (block === "CONFRONTO") {
          att = player.power;
      }

      await logRoll(player, block.toLowerCase(), dice, att);
      results.push(dice + att);
  }

  if (block === "CONFRONTO") {
      if (results[0] > results[1]) {
          console.log(`${selectedPlayers[0].name} vence o confronto! ${selectedPlayers[1].name} perdeu um ponto.`);
          if (selectedPlayers[1].points > 0) selectedPlayers[1].points--;

          // extra: TURBO
          if (Math.random() < 0.5) {
            selectedPlayers[0].points++;
            console.log(`${selectedPlayers[0].name} ganhou um TURBO(+1 ponto)`);
          }
      } else if (results[1] > results[0]) {
          console.log(`${selectedPlayers[1].name} vence o confronto! ${selectedPlayers[0].name} perdeu um ponto.`);
          if (selectedPlayers[0].points > 0) selectedPlayers[0].points--;

          // extra: TURBO
          if (Math.random() < 0.5) {
            selectedPlayers[0].points++;
            console.log(`${selectedPlayers[0].name} ganhou um TURBO(+1 ponto)`);
          }
      } else {
          console.log("Confronto empatado! Nnehum ponto foi perdido.");
      }
  } else {
      const winnerInd = results[0] > results[1] ? 0 : results[1] > results[0] ? 1 : -1;
      if (winnerInd !== -1) {
          console.log(`${selectedPlayers[winnerInd].name} marcou um ponto!`);
          selectedPlayers[winnerInd].points++;
      } else {
          console.log("É um empate.");
      }
  }

  console.log("-----------------------------------------------------------");
}

async function declareWinner(players) {
  console.log("\nResultado final:");
  players.forEach(player => {
      console.log(`${player.name}: ${player.points} ponto(s)`);
  });

  if (players[0].points === players[1].points) {
      console.log("A corrida terminou empatada!");
  } else {
      const winner = players.reduce((prev, curr) => (prev.points > curr.points) ? prev : curr);
      console.log(`${winner.name} venceu a corrida! 🎉`);
  }
}

async function askPlayAgain() {
  while (true) {
    const choice = await prompt("Você quer jogar novamente? (sim/não): ");
    if (choice.toLowerCase() === "sim") return true;
    if (choice.toLowerCase() === "não") return false;
    console.log("Inválido. Digite 'sim' ou 'não'.");
  }
}

// main function
(async function main() {
  let playAgain = true;

  while (playAgain) {
    players.forEach((player) => (player.points = 0)); // reset points
    const selectedPlayers = await getPlayerChoice(players);
    console.log(`🏁🚨 Corrida entre ${selectedPlayers[0].name} e ${selectedPlayers[1].name} começa!`);

    for (let round = 1; round <= 5; round++) {
      console.log(`Rodada ${round}`);
      await playRound(selectedPlayers);
    }

    await declareWinner(selectedPlayers);
    playAgain = await askPlayAgain();
  }

  console.log("Obrigado por jogar!");
  rl.close();
})();