import {
    io
} from '../index'
import {
    logger
} from '../src/modules/logger/logger';
import {
    getUsersBattleService,
    joinBattleService,
    endBattleService,
    recordBattleService,
    disconnectBattleService
} from '../src/modules/battle/services/BattleService'

io.on('connection', (client) => {

    console.log('Socket  ID: ', client.id)

    client.emit('connected', () => {
        console.log('User conectado');
    });

    client.on('newUser', (token) => {

        joinBattleService(token, client.id).then((battle) => {
            getUsersBattleService(battle.id).then((data) => {
                let usersBattle = data[0].users
                let roundTime = 60;
                let socket_1;
                let user1;
                let user2;
                let time = 1000
                let messages = []
                let words = ['pico', 'pala', 'pelota', 'casa', 'television', 'hipocresia', 'gracia', 'alto']
                let channel = data[0].dataValues.id

                client.join(channel)

                if (usersBattle.length === 2) {

                    if (usersBattle[1].dataValues.user_battle.socket_id === client.id) {
                        socket_1 = usersBattle[0].dataValues.user_battle.socket_id
                        user1 = usersBattle[0].dataValues
                        user2 = usersBattle[1].dataValues
                    } else {
                        socket_1 = usersBattle[1].dataValues.user_battle.socket_id
                        user1 = usersBattle[1].dataValues
                        user2 = usersBattle[0].dataValues
                    }

                    messages = [
                        `Es el turno de ${user2.nickname}`,
                        `Es el turno de ${user1.nickname}`,
                        "Se desconectó el contrincante",
                        "La batalla comienza en 20 segundos"
                    ]

                }

                let beatRound1 = {
                    beat: "https://battletime.s3.us-east-2.amazonaws.com/beats/SX+Producciones+-+Noches+bajo+el+puente+-+www.hhgroups.com.mp3",
                    usersBattle
                }

                let beatRound2 = {
                    beat: "https://battletime.s3.us-east-2.amazonaws.com/beats/Misio+-30d.mp3",
                    usersBattle
                }

                let applause =
                    'https://battletime.s3.us-east-2.amazonaws.com/beats/applause-%5BAudioTrimmer.com%5D.mp3'

                //Verificar que los user esten en live true
                if (usersBattle.length === 2) {

                    logger.info('Entro el Usuario 2 START BATTLE')
                    io.to(channel).emit('startBattle', battle.id, roundTime, words);
                    io.to(channel).emit('messageToShow', messages[3]);

                    recordBattleService(channel.toString(), 0)

                    setTimeout(() => {
                        io.to(channel).emit('preStart', user2.id, applause);
                    }, time * 3);

                    setTimeout(() => {
                        logger.info(messages[0])
                        io.to(channel).emit('messageToShow', messages[0]);
                        io.to(client.id).emit('startUserRound', beatRound1);
                    }, time * 10);

                    setTimeout(() => {
                        io.to(channel).emit('startRound');
                    }, time * 20);

                    setTimeout(() => {
                        logger.info('Finaliza ', messages[0])
                        io.to(channel).emit('finishRound');
                        io.to(client.id).emit('finishUserRound', data);
                    }, time * 80);

                    setTimeout(() => {
                        logger.info(messages[1])
                        io.to(channel).emit('messageToShow', messages[1]);
                        io.to(socket_1).emit('startUserRound', beatRound1);
                    }, time * 82);

                    setTimeout(() => {
                        io.to(channel).emit('startRound');
                    }, time * 92);

                    setTimeout(() => {
                        logger.info('Finaliza ', messages[1])
                        io.to(channel).emit('finishRound');
                        io.to(socket_1).emit('finishUserRound');
                    }, time * 152);

                    setTimeout(() => {
                        logger.info(messages[0])
                        io.to(channel).emit('messageToShow', messages[0]);
                        io.to(client.id).emit('startUserRound', beatRound2);
                    }, time * 154);

                    setTimeout(() => {
                        io.to(channel).emit('startRound');
                    }, time * 164);

                    setTimeout(() => {
                        logger.info('Finaliza ', messages[0])
                        io.to(channel).emit('finishRound');
                        io.to(client.id).emit('finishUserRound');
                    }, time * 224);

                    setTimeout(() => {
                        logger.info(messages[1])
                        io.to(channel).emit('messageToShow', messages[1]);
                        io.to(socket_1).emit('startUserRound', beatRound2);
                    }, time * 226);

                    setTimeout(() => {
                        io.to(channel).emit('startRound');
                    }, time * 236);

                    setTimeout(() => {
                        logger.info('Finaliza la batalla')
                        io.to(channel).emit('finishRound');
                        io.to(channel).emit('finishBattle', applause);
                    }, time * 296);

                    setTimeout(async () => {
                        io.to(channel).emit('closeBattle', data);
                        endBattleService(channel)
                    }, time * 300);

                }

                client.on('disconnect', () => {
                    logger.info(messages[2])
                    io.to(channel).emit('messageToShow', messages[2]);
                    disconnectBattleService(channel)
                    client.leave(channel);
                });

            });
        });

    });

    client.on('disconnect', (client) => {
        //message = "Se desconecto " + client.id

        logger.info('User disconnect');
    });

});
