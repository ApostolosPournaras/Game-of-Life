class gridCell{

	constructor(r, c, w, h){
		this.r = r
		this.c = c
		this.w = w
		this.h = h
		this.isAlive = false
		this.isAliveNextRound = false
		this.aliveRounds = 0
		this.col = color(51)
	}

	setAlive(){
		this.isAlive = true
		this.aliveRounds++
		this.col = color(50,100, min(5*this.aliveRounds,255))
	}

	setDead(){
		this.isAlive = false
		this.aliveRounds=0
		this.col = color(51)
	}

	toggle(){
		if (this.isAlive){
			this.setDead()
		}else{
			this.setAlive()
		}
	}

	desideNextState(aliveN, deadN){

		if(this.isAlive && aliveN<2){
			this.isAliveNextRound = false

		}else if(this.isAlive && (aliveN===2 || aliveN===3)){
			this.isAliveNextRound = true

		}else if(this.isAlive && aliveN>3){
			this.isAliveNextRound = false

		}else if(!this.isAlive && aliveN===3){
			this.isAliveNextRound = true

		}else{
			this.isAliveNextRound = false
		}
	}

	applyNextState(){
		if(this.isAliveNextRound){
			this.setAlive()
		}else{
			this.setDead()
		}
	}

	show(){
		fill(this.col)
		rect(this.w*this.c, this.h*this.r, this.w, this.h);
	}
}