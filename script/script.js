/**
 * @author Nataliia Skrebets 
 */


/**
 * Array has information about gamemashine in casino
 */
let listGameMashine = [
    { idCasino: 2, nameMashine: "Mashine1", idMashine: 1, money: 2000 },
    { idCasino: 2, nameMashine: "Mashine1", idMashine: 2, money: 1000 },
    { idCasino: 2, nameMashine: "Mashine1", idMashine: 3, money: 3000 }
];

/**
 * Object Casino
 */
let myCasino = {};


let idCasino = 1;
let idGameMashine = 3;

/**
 * function sort object from gamemashine, which has the most, to gamemashine, which has the least money
 * @param {Number} firstNumner
 * @param {Number} lastNumber
 */
let compare = (a, b) => {
    if (a.money < b.money) {
        return 1;
    }
    if (a.money > b.money) {
        return -1;
    }
}

/**
 * class User can start game with gamemashine, and take out money.
 */
class User {
    /**
     * @param {String} name
     * @param {Number} money
     */
    constructor(name, money) {
        this.name = name;
        this.money = money;
    }

    /**
     * Allow user starts play,  gamble(зробити ставку), take out money, if user win, or transfer to gamemashine
     * @param {Number} number
     */
    startGame(number) {
        let chooseDameMashine = prompt(`Enter number of game Mashine (for example -1)`, 0);
        if (chooseDameMashine == null) {
            alert("You cancel this game");
        } else {
            for (let key of listGameMashine) {
                if (Number(chooseDameMashine) == key.idMashine) {
                    let putMoney = prompt("Put your money to mashine");
                    if (putMoney == null) {
                        alert("You cancel this game");
                    } else if (Number(putMoney) > this.money || Number(putMoney) == NaN || Number(putMoney) < 0 || Number(putMoney) == undefined) {
                        alert("You don't have enought sum of money");
                    } else if (Number(putMoney) > 3 * key.money) {
                        alert("GameMashine doesn't have enought sum of money")
                    } else {
                        let userRandomNumber = [];
                        for (let i = 0; i < 3; i++) {
                            let userNumber = prompt("Entre one number", 0);
                            if (userNumber != null) {
                                userRandomNumber.push(Number(userNumber));
                            } else {
                                i--;
                            }
                        }
                        let randomNumber = String(Math.floor(Math.random() * (999 - 100) + 100));
                        let arrRandomNumber = [Number(randomNumber[0]), Number(randomNumber[1]), Number(randomNumber[2])];
                        console.log(`Combination was entered by user        - ${arrRandomNumber}`);
                        console.log(`Combination was created by gamemashine - ${userRandomNumber}`);
                        let count = 0;
                        for (let i = 0; i < userRandomNumber.length; i++) {
                            for (let j = 0; j < arrRandomNumber.length; j++) {
                                if (userRandomNumber[i] == arrRandomNumber[j]) {
                                    count++;
                                    userRandomNumber.splice(i, 1);
                                    arrRandomNumber.splice(j, 1);
                                }
                            }
                        }
                        if (count == 2) {
                            Number(putMoney) *= 2;
                            this.money += Number(putMoney);
                            key.money -= Number(putMoney);
                            alert("You win")
                        } else if (count == 3) {
                            Number(putMoney) *= 2;
                            this.money += Number(putMoney);
                            key.money -= Number(putMoney);
                            alert("You win")
                        } else {
                            key.money += Number(putMoney);
                            this.money -= Number(putMoney);
                            alert("You lose");
                        }
                        console.log(count);
                    }

                }
            }
        }
    }

}

/**
 * class SuperAdmin, child of class User, can creat casino, gamemashine, delete gamemashine, take out/add money for  Gamemashine.
 */
class SuperAdmin extends User {
    /**
     * Create casino
     * @param {String} nameCasino
     */
    createCasino(nameCasino) {
            idCasino++;
            myCasino = { name: nameCasino, id: idCasino, sumMoney: 3000000 };
        }
        /**
         * Create new gameMashine
         * @param {String} nameCasino
         * @param {Number} casinoId
         */
    createGameMashine(nameGameMashine, casinoId) {
        idGameMashine++;
        if (myCasino.id == casinoId) {
            listGameMashine.push({ idCasino: casinoId, nameMashine: nameGameMashine, idMashine: idGameMashine, money: 2000 });
            myCasino.sumMoney -= 2000;
        } else {
            console.log(`Casino with id ${casinoId} doesn't exist`);
        }
    }

    /**
     * transfer money from gamemashine to casino
     * @param {Number} money
     * @return {Number}
     */
    getMoney(money) {
        let sumMoney = 0;
        listGameMashine.sort(compare);
        for (let key of listGameMashine) {
            if (money > 0) {
                if (key.money < money) {
                    sumMoney += key.money;
                    money -= key.money;
                    key.money = 0;

                } else if (key.money >= money) {
                    sumMoney += money;
                    key.money -= money;
                    money = 0;
                }
            }
        }
        myCasino.sumMoney += sumMoney;
        return sumMoney;
    }

    /**
     * transfer money from casino to gamemashine
     * @param {Number} money
     * @param {Number} idMashineGame
     * @return {Number}
     */
    addMoney(money, idMashineGame) {
        for (let key of listGameMashine) {
            console.log(key);
            if (key.idMashine == idMashineGame) {
                key.money += money;
                myCasino.sumMoney -= money;
            }
            // else {
            //     console.log(`GameMashine with id ${idMashineGame} doesn't exist`);
            // }
        }
        return money;
    }

    /**
     * Delete gamemashine
     * @param {Number} idGameMashine
     */
    deleteGameMashine(idGameMashine) {
        let moneyDeletedMashine;
        let posDeteted;

        for (let key = 0; key < listGameMashine.length; key++) {
            if (listGameMashine[key].idMashine == idGameMashine) {
                posDeteted = key;
                moneyDeletedMashine = listGameMashine[key].money;
            }
        }
        listGameMashine.splice(posDeteted, 1);
        for (let key of listGameMashine) {
            key.money += moneyDeletedMashine / listGameMashine.length;
        }

    }
}

/**
 * class Casino can count  sum money from all gamemashine and Casino, count amount of gamemashine
 */

class Casino {
    /**
     * @param {String} name
     */
    constructor(name) {
        this.name = name;
        this.sumMoney = 0;
        this.countGameMashine = 0;
    }

    /**
     * Count sum of money in all gamemashine and casino
     * @return {Number}
     */
    getMoney() {
            for (let key of listGameMashine) {
                this.sumMoney + key.money;
            }
            this.sumMoney += myCasino.sumMoney;
            return this.sumMoney;
        }
        /**
         * Count number of gamemashine
         * @return {Number}
         */
    getMachineCount() {
        this.countGameMashine = listGameMashine.length;
        return this.countGameMashine;
    }
}

/**
 * class GameMashine can count sum of money from all gamemashine, take out money
 */

class GameMashine {
    /**
     * @param {Number} number
     */
    constructor(number) {
        this.number = number;
        this.allMoney = 0;
    }

    /**
     * Count number of gamemashine
     * @return {Number}
     */
    getMoney() {
        for (let key of listGameMashine) {
            this.allMoney += key.money;
        }
        return this.allMoney;
    }

    /**
     * Transfer many from gamemashine to casino
     * @param {Number} number
     */
    takeOutMany(number) {
        let sumMoney = 0;
        for (let key of listGameMashine) {
            if (number > 0) {
                if (key.money < number) {
                    sumMoney += key.money;
                    number -= key.money;
                    key.money = 0;

                } else if (key.money >= number) {
                    sumMoney += number;
                    key.money -= number;
                    number = 0;
                }
            }
        }
        myCasino.sumMoney += sumMoney;
        return number;
    }
}

/**
 * Create Admin
 */
let admin = new SuperAdmin("vasyl", 20000);
/**
 * Admin create Casino
 */
console.log(`Was created new casino`);
admin.createCasino("MyCasino");
/**
 * Take out money from gamesmashine to casino
 */
console.log("Was transfered money from gamemashine to casino")
admin.getMoney(1050);
console.log(listGameMashine);
console.log(myCasino);

/**
 * Create new gamemashine
 */
console.log("Was created new gamemashine")
admin.createGameMashine("Mashine4", 2);
console.log(listGameMashine);
console.log(myCasino);

/**
 * Add money to gamemashine with id №3
 */
console.log("Was transfered money from casino to gamemashine")
admin.addMoney(2000, 3);
console.log(listGameMashine);
console.log(myCasino);

/**
 * Add money to gamemashine with id №3
 */
console.log("Was deleted gamemashine with id №1")
admin.deleteGameMashine(1);
console.log(listGameMashine);

/**
 * Create user and start game
 */
let user = new User("Ivan", 2000);
console.log("User started game")
user.startGame();
console.log(listGameMashine);

/**
 * Create gamemashine
 */
let game = new GameMashine();
console.log("Count sum of money in all gamemashine");
console.log(game.getMoney());
console.log("Transfer money from gamemashine to casino");
game.takeOutMany(300);
console.log(myCasino);

/**
 * Create Casino 
 */
let casino = new Casino("Casino");
console.log("Count sum of money in all gamemashine and casino");
console.log(casino.getMoney());
console.log("Count sum of gamemashine in casino");
console.log(casino.getMachineCount());