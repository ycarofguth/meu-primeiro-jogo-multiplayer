export default function createGame() {
            const state = {
                players: {},
                fruits: {},
                screen: {
                    width: 10,
                    height: 10,
                },
            };

            function addPlayer(command) {
                const { playerId } = command;
                const { playerX } = command;
                const { playerY } = command;

                state.players[playerId] = {
                    x: playerX,
                    y: playerY,
                }
            }

            function removePlayer(command) {
                const { playerId } = command;

                delete state.players[playerId];
            }

            function addFruit(command) {
                const { fruitId } = command;
                const { fruitX } = command;
                const { fruitY } = command;

                state.fruits[fruitId] = {
                    x: fruitX,
                    y: fruitY,
                }
            }

            function removeFruit(command) {
                const { fruitId } = command;

                delete state.fruits[fruitId];
            }

            function movePlayer(command) {
                const aceptedMoves = {
                    ArrowUp(player) {
                        if(player.y - 1 >= 0){
                            player.y = player.y - 1
                        }
                    },
                    ArrowRight(player) {
                        if(player.x + 1 < state.screen.width){
                            player.x = player.x + 1
                        }
                    },
                    ArrowDown(player) {
                        if(player.y + 1 < state.screen.height){
                            player.y = player.y + 1
                        }
                    },
                    ArrowLeft(player) {
                        if(player.x - 1 >= 0){
                            player.x = player.x - 1
                        }
                    },
                }

                const { keyPressed } = command;
                const { playerId } = command;
                const player = state.players[command.playerId];
                const moveFunction = aceptedMoves[keyPressed];

                if(player && moveFunction){
                    moveFunction(player);
                    checkForFruitColision(playerId);
                }
            }

            function checkForFruitColision(playerId) {
                    const player = state.players[playerId];

                    for(const fruitId in state.fruits) {
                        const fruit = state.fruits[fruitId];
                        console.log(`Checking ${playerId} and ${fruitId}`);

                        if(player.x === fruit.x && player.y === fruit.y) {
                            console.log(`😋COLLISION😋 between ${playerId} and ${fruitId}`);
                            removeFruit({ fruitId });
                        }
                    }
            }

            return {
                addPlayer,
                removePlayer, 
                addFruit,
                removeFruit, 
                movePlayer,
                state

            }
        }