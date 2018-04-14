(function(){
	var tiles = [];
	var answer = [];
	var startScreen = document.querySelector("#startScreen");
	startScreen.addEventListener("click", startGame, false);
	var overScreen = document.querySelector("#overScreen");

	for(var i = 1; i < 9; i++){
		var tile = document.querySelector("#n"+i);
		tile.style.background = "url('img/n" + i +".png')";
		tile.addEventListener("click", moveTile,false);
		tiles.push(tile);
	}
	tiles.push(null);
	answer = tiles;
	render();

	function startGame(){
		tiles = randomSort(tiles);
		this.style.opacity = "0";
		this.style.zIndex = "-1";
		this.removeEventListener("click", startGame, false);
		render();
	}

	function randomSort(oldArray) {
		var newArray;
		do{
			newArray = [];
			while(newArray.length < oldArray.length){
				var i = Math.floor(Math.random()*oldArray.length);
				if(newArray.indexOf(oldArray[i]) < 0){
					newArray.push(oldArray[i]);
				}
			}
		}while(!validGame(newArray));
		return newArray;
	}

	function validGame(arr){
		var inversions = 0;
		var len = arr.length;
		 for(var i = 0; i< len-1; i++){
		 	for(var j = i+1; j < len; j++){
		 		if(arr[i] && arr[j] && arr[i].dataset.value > arr[j].dataset.value){
		 			inversions++;
		 		}
		 	}
		 }
		 return inversions % 2 === 0;
	}

	function render(){
		for(var i in tiles){
			var tile = tiles[i];
			if(tile){
				tile.style.left = (i%3) * 100 + 5 + "px";
				if(i<3){
					tile.style.top = "5px";
				}else{
					if(i<6){
						tile.style.top = "105px";
					}else{
						tile.style.top = "205px";
					}
				}
			}
		}
	}
	function moveTile(){
		var index = tiles.indexOf(this);
		//move esquerda
		if(index % 3 !== 0){
			if(!tiles[index-1]){
				tiles[index-1] = this;
				tiles[index] = null;
			}
		}
		//move direita
		if(index % 3 !== 2){
			if(!tiles[index+1]){
				tiles[index+1] = this;
				tiles[index] = null;
			}
		}
		//move cima
		if(index > 2){
			if(!tiles[index-3]){
				tiles[index-3] = this;
				tiles[index] = null;
			}
		}
		//move baixo
		if(index < 6){
			if(!tiles[index+3]){
				tiles[index+3] = this;
				tiles[index] = null;
			}
		}
		render();
		if(chkWin()){
			gameOver();
		}
	}
	function chkWin(){
		for(var i in tiles){
			var a = tiles[i];
			var b = answer[i];
			if(a !== b){
				return false;
			}
		}
		return true;
	}

	function gameOver(){
		overScreen.style.opacity = "1";
		overScreen.style.zIndex = "1";
		setTimeout(function(){
			overScreen.addEventListener("click", startGame, false);
		},500);
	}
}());