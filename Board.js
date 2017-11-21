class Board {
	constructor (bS, b, p) {
		this.boardSize = bS;
		this.blocks = b;
		this.padding = p;
		this.spacing = this.boardSize / this.blocks;
		this.grid = [];
		this.makeGrid();
	}

	addStone (stone) {
		this.grid[stone.getGridX()][stone.getGridY()] = stone;
	}

	makeGrid() {
		for (var i = 0; i < this.blocks + 1; i++) {
			var curr_row = [];
			for (var j = 0; j < this.blocks + 1; j++) {
				curr_row.push(0);
			}
			this.grid.push(curr_row);
		}
	}

	emptyIntersection(x,y){
		var gridx = Math.round((x - this.padding) / this.spacing);
		var gridy = Math.round((y - this.padding) / this.spacing);
		return this.grid[gridx][gridy] == 0;
	}
}