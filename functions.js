const defaultCharacter = {
    name: "",
    life: 1,
    maxLife: 1,
    attack: 0,
    defense: 0
}

const createKnight = (name) => {
    return {
        ...defaultCharacter,
        name,
        life: 100,
        maxLife: 100,
        attack: 10,
        defense: 8
    }
}

const createSorcerer = (name) => {
    return {
        ...defaultCharacter,
        name,
        life: 50,
        maxLife: 50,
        attack: 14,
        defense: 3
    }
}

const createLittleMonster = () => {
    return {
        ...defaultCharacter,
        name: "Little Monster",
        life: 40,
        maxLife: 40,
        attack: 4,
        defense: 4
    }
}

const createBigMonster = () => {
    return {
        ...defaultCharacter,
        name: "Big Monster",
        life: 120,
        maxLife: 120,
        attack: 16,
        defense: 6
    }
}

const stage = {
    fighter1: null,
    fighter2: null,
    fighter1Elements: null,
    fighter2Elements: null,

    start(fighter1, fighter2, fighter1Elements, fighter2Elements) {
        this.fighter1 = fighter1
        this.fighter2 = fighter2
        this.fighter1Elements = fighter1Elements
        this.fighter2Elements = fighter2Elements

        this.fighter1Elements.querySelector(".attackButton").addEventListener("click", () => this.doAttack(this.fighter1, this.fighter2))
        this.fighter2Elements.querySelector(".attackButton").addEventListener("click", () => this.doAttack(this.fighter2, this.fighter1))

        this.update()
    },

    update() {
        //Fighter 1
        this.fighter1Elements.querySelector(".name").innerHTML = `${this.fighter1.name} - ${this.fighter1.life.toFixed(2)} HP`
        let f1Perc = (this.fighter1.life / this.fighter1.maxLife) * 100
        this.fighter1Elements.querySelector(".bar").style.width = `${f1Perc}%`

        //Fighter 2
        this.fighter2Elements.querySelector(".name").innerHTML = `${this.fighter2.name} - ${this.fighter2.life.toFixed(2)} HP`
        let f2Perc = (this.fighter2.life / this.fighter2.maxLife) * 100
        this.fighter2Elements.querySelector(".bar").style.width = `${f2Perc}%`
    },
    
    doAttack(attacking, attacked) {
        if(attacking.life <= 0 || attacked.life <= 0) {
            log.addMessage("Já foi de vasco =/")
            return
        }

        const attackFactor = (Math.random() * 2).toFixed(2)
        const defenseFactor = (Math.random() * 2).toFixed(2)
        const actualAttack = attacking.attack * attackFactor
        const actualDefense = attacked.defense * defenseFactor

        if(actualAttack > actualDefense) {
            attacked.life -= actualAttack
            attacked.life = attacked.life < 0 ? 0 : attacked.life
            log.addMessage(`${attacking.name} causou ${actualAttack.toFixed(2)} de dano em ${attacked.name}`)
        } else {
            log.addMessage(`${attacked.name} conseguiu defender...`)
        }

        this.update()
    },
}

const log = {
    list: [],
    addMessage(msg) {
        this.list.push(msg)
        this.render()
    },

    render() {
        const logElements = document.querySelector(".log")

        logElements.innerHTML = ""

        for(let i in this.list) {
            logElements.innerHTML += `<li>${this.list[i]}</li>`
        }
    }

}