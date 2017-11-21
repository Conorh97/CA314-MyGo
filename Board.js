class Board {
	constructor (bS, b, p) {
		this.boardSize = bS;
		this.blocks = b;
		this.padding = p;
		this.spacing = this.boardSize / this.blocks;
		this.grid = [];
		this.makeGrid();
	}

	addStone (x, y, stone) {
		this.grid[x][y] = stone;
	}

	makeGrid() {
		for (i = 0; i < this.blocks + 1; i++) {
			curr_row = [];
			for (j = 0; j < this.blocks + 1; j++) {
				curr_row.push(0);
			}
			this.grid.push(curr_row);
		}
	}

	emptyIntersection(x,y){
		gridx = Math.round((x - padding) / spacing);
		gridy = Math.round((y - padding) / spacing);
		return this.grid[x][y] == 0;
	}
}