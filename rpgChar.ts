
// I had some trouble coming up with a setup for this that made sense with interfaces.
// These aren't really necessary; I could have done attackSword attackClub and so on,
// but that didn't seem like it made sense if characters could switch weapons, so I
// implemented what we have below instead. I think what we really need is some sort of
// class specific skill to make the interface make sense. maybe I'll try that. Or a
// class that can't attack, for example? Or varied attack and defend skills? My stat
// system kind of takes care of that. obv having played too many video games is
// possibly leading me to miss the point. I didn't really follow what to put in an interface
// but still remain dry, and if methods appear in the parent class then child classes still obv
// have access to those classes if they don't appear in the interface, like with the decoy duck
// and fly in class. omitting something from the interface line doesn't keep the child from having
// access to that thing...

interface CanAttack {
    attack():number
}

interface CanDefend {
    defend():number
}

interface CanHeal {
    heal():number
}

abstract class RpgChar {

    constructor(protected charName$:string, 
                          public weapon:string, 
                          public equipment:string, 
                          public gold:number, 
                          public hp:number, 
                          public str:number, 
                          public mag:number, 
                          public def:number){}

    get charName():string{
        return this.charName$
    }

    attack():number {
        let damage:number = 0
        if (this.weapon === 'club'){
            damage = 8
        }else if (this.weapon === 'sword'){
            damage = 6
        }else if (this.weapon === 'bow and arrow'){
            damage = 4
        }
        return damage
    }
    
    defend():number {
        let dmgReduction:number = 0
        if (this.equipment === 'shield'){
            dmgReduction = 3
        }else if (this.equipment === 'armor'){
            dmgReduction = 2
        }else if (this.equipment === 'tunic'){
            dmgReduction = 1
        }
        return dmgReduction
    }

    collectGold(addGold:number):void{
        this.gold += addGold
    }
}

class Barbarian extends RpgChar implements CanAttack, CanDefend{

    constructor(charName:string, weapon:string='club', equipment:string='shield', gold:number=0,
                hp:number = 25, str:number=10, mag:number=0, def:number=5){
        super(charName, weapon, equipment, gold, hp, str, mag, def)
    }
}

class Paladin extends RpgChar implements CanAttack, CanDefend{

    constructor(charName:string, weapon:string='sword', equipment:string='armor', gold:number=0,
                hp:number = 30, str:number=7, mag:number=2, def:number=7){
        super(charName, weapon, equipment, gold, hp, str, mag, def)
    }
}

class Ranger extends RpgChar implements CanAttack, CanDefend{

    constructor(charName:string, weapon:string='bow and arrow', equipment:string='tunic', gold:number=0,
                hp:number = 22, str:number=4, mag:number=2, def:number=3){
        super(charName, weapon, equipment, gold, hp, str, mag, def)
    }
}

class Warlock extends RpgChar implements CanAttack, CanDefend, CanHeal{

    constructor(charName:string, weapon:string='club', equipment:string='tunic', gold:number=0,
                hp:number = 10, str:number=1, mag:number=10, def:number=10){
        super(charName, weapon, equipment, gold, hp, str, mag, def)
    }

    heal():number{
        let healAmount = this.mag + 5
        return healAmount
    }
}

const myWarlock1 = new Warlock('Shazaam')
console.log(myWarlock1.gold)
myWarlock1.collectGold(15)
console.log(myWarlock1.gold)