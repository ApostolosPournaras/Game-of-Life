class gameGrid{

	constructor(rows, cols){
		this.rows=rows;
		this.cols=cols;
		this.cells = Array(rows*cols);
		this.cWidth = floor(width/cols);
		this.rHeight = floor(height/rows);


		for(let i=0; i<this.rows; i++){
			for(let j=0; j<this.cols; j++){
				this.cells[j + i*cols] = new gridCell(i,j,this.cWidth, this.rHeight)
			}
		}

	}

	
	play(){
		for(let i=0; i<this.rows; i++){
			for(let j=0; j<this.cols; j++){

				var aliveN = 0
				var deadN = 0
				var neighbor_i
				var neighbor_j

				for(let ii=-1; ii<2; ii++){
					for(let jj=-1; jj<2; jj++){
						
						neighbor_i = i+ii
						neighbor_j = j+jj

						if(neighbor_i===-1 || neighbor_i===this.rows){
							continue;
						}

						if(neighbor_j===-1 || neighbor_j===this.cols){
							continue;
						}

						if(ii===0 && jj===0){
							continue;
						}

						if(this.cells[neighbor_j + neighbor_i*this.cols].isAlive){
							aliveN++;
						}else{
							deadN++;
						}

					}
				}

				this.cells[j + i*this.cols].desideNextState(aliveN, deadN)
			}
		}

		for(let i=0; i<this.rows*this.cols; i++){
			this.cells[i].applyNextState()
		}	
	}

	processMouseClick(x,y){
		var c = floor(x/this.cWidth)
		var r = floor(y/this.rHeight)

		if(c<this.cols && r<this.rows){
			this.cells[c + r*this.cols].toggle()
		}
	}

	randomizeCells(){
		for(let i=0; i<this.rows*this.cols; i++){
			if (random() >= 0.5){
				this.cells[i].setAlive()
			}else{
				this.cells[i].setDead()
			}
		}
	}

	clear(){
		for(let i=0; i<this.rows*this.cols; i++){
			this.cells[i].setDead()
		}
		this.showLines()
		this.showCells()
	}

	showLines(){
		for(let i=0; i<this.rows+1; i++){
			line(0, i*this.rHeight, this.cols*this.cWidth, i*this.rHeight);
		}

		for(let j=0; j<this.cols+1; j++){
			line(j*this.cWidth, 0, j*this.cWidth, this.rows*this.rWidth);
		}
	}

	showCells(){
		for(let i=0; i<this.rows; i++){
			for(let j=0; j<this.cols; j++){
				this.cells[j + i*this.cols].show()
			}
		}
	}

}