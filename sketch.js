
var gridCanvas
var gg;
var isPlaying = true

var btnPlay
var btnProceed
var btnReset
var btnClear

var pRows
var sldrRows

var pCols
var sldrCols

var pFPS

function setup(){

	gridCanvas = createCanvas(900, 600);

	background(51)

	gg = new gameGrid(40,60)

	gg.randomizeCells()

	gg.showLines()
	gg.showCells()

	btnPlay = createButton('pause');
	btnPlay.size(60,20)
	btnPlay.position(20, gridCanvas.position().y + height+20)
  	btnPlay.mousePressed(playPauseGame);

	btnProceed = createButton('proceed');
	btnProceed.size(60,20)
	btnProceed.position(100, gridCanvas.position().y + height+20)
  	btnProceed.mousePressed(proceed);

	btnReset = createButton('reset');
	btnReset.size(60,20)
	btnReset.position(180, gridCanvas.position().y + height+20)
  	btnReset.mousePressed(reset);

	btnClear = createButton('clear');
	btnClear.size(60,20)
	btnClear.position(260, gridCanvas.position().y + height+20)
  	btnClear.mousePressed(clearGrid);

  	sldrRows = createSlider(2, floor(width/4),  gg.rows, 1)
  	sldrRows.position(20, gridCanvas.position().y + height + 50)
  	pRows = createP('Rows:' + gg.rows)
  	pRows.position(sldrRows.x + sldrRows.width + 20, sldrRows.y-10)

  	sldrCols = createSlider(2, floor(gridCanvas.position().y + height/4), gg.cols, 1)
  	sldrCols.position(20, gridCanvas.position().y + height + 80)
  	pCols = createP('Columns:' + gg.cols)
  	pCols.position(sldrCols.x + sldrCols.width + 20, sldrCols.y-10)

  	pFPS = createP('frameRate')
  	pFPS.position(width-100, gridCanvas.position().y + height)
}

function mousePressed(){
	gg.processMouseClick(mouseX,mouseY)
	gg.showCells()
}

function mouseDragged(){
	gg.processMouseClick(mouseX,mouseY)
	gg.showCells()
}

function playPauseGame(){
	isPlaying = isPlaying ^ true

	if(isPlaying){
		btnPlay.elt.innerHTML  = "pause"
	}else{
		btnPlay.elt.innerHTML = "play"
		pFPS.elt.innerHTML = 'Game Paused'
	}

}

function reset(){
	clearGrid()
	gg.randomizeCells()
}

function proceed(){
	gg.play()
	gg.showCells()
}

function clearGrid(){
	gg.clear()
}

function draw(){
	if(isPlaying){

		if(gg.rows != sldrRows.value()){
			pRows.elt.innerHTML = "Rows: " + sldrRows.value()
			clear()
			gg = new gameGrid(sldrRows.value(), gg.cols)
			gg.randomizeCells()
		}

		if(gg.cols != sldrCols.value()){
			pCols.elt.innerHTML = "Columns: " + sldrCols.value()
			clear()
			gg = new gameGrid(gg.rows, sldrCols.value())
			gg.randomizeCells()
		}

		gg.play()
		gg.showCells()
		pFPS.elt.innerHTML = 'frame rate:' + floor(frameRate())
	}
}
