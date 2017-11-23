class Board {
	constructor (bS, b, p) {
		this.boardSize = bS;
		this.blocks = b;
		this.padding = p;
		this.spacing = this.boardSize / this.blocks;
		this.grid = [];
		this.makeGrid();
	}

	display() {
		for (var i=0;i<this.grid.length;i++){
			for (var j=0;j<this.grid[i].length;j++){
				if (this.grid[i][j] != 0){
					this.grid[i][j].display();
				}
			}
		}
	}

	addStone(stone) {
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

	emptyIntersection(x,y) {
		var gridx = Math.round((x - this.padding) / this.spacing);
		var gridy = Math.round((y - this.padding) / this.spacing);
		return this.grid[gridx][gridy] == 0;
	}

	addAndCheck(stoneX, stoneY) {
		if (this.emptyIntersection(stoneX, stoneY)){
			var newStone = new Stone(stoneX,stoneY,turn);
			this.addStone(newStone);
			// For each new stone, we check its liberties for a stone of opposite colour.
			// If one exists, we check if if should be taken
			for (var i = 0; i < newStone.liberties.length; i++) {
				var curr_lib = newStone.liberties[i];
				var grid_spot = this.grid[curr_lib[0]][curr_lib[1]]; // The value at the current liberties coordinates
				if (grid_spot != 0) {
					if (grid_spot.colour != newStone.colour) {
						var current_bfs = this.libertyBFS([[curr_lib[0], curr_lib[1]]], curr_lib[0], curr_lib[1], newStone.colour);
						if (this.isArrayInArray(current_bfs, [-1, -1]) == false) { // Determines if the liberties are surrounded
							for (var i = 0; i < current_bfs.length; i++) {
								var curr_bfs_lib = current_bfs[i];
								var curr_stone = this.grid[curr_bfs_lib[0]][curr_bfs_lib[1]];
								if (curr_stone.colour != newStone.colour) {
									this.grid[curr_bfs_lib[0]][curr_bfs_lib[1]] = 0;
									if (turn % 2 == 0) {
										scoreBlack += 2;
									} else {
										scoreWhite += 2;
									}
								}
							}
						}
					}
				}
			}
			turn += 1;
		}
	}

	libertyBFS(seen, x, y, colour) {
	// Function to check if stone should be taken
		var curr_stone = this.grid[x][y];

		if (curr_stone.colour == colour) { // Case for the edge
			return seen;
		} else if (curr_stone == 0) { // Case for the gap
			return [[-1, -1]];
		} else {

			var result = [];
			var newSeen = [];
			var notSeenLiberties = [];

			for (var i = 0; i < seen.length; i++) { // Initialising the new list of seen stones with current seen
				newSeen.push(seen[i]);
			}

			for (var i = 0; i < curr_stone.liberties.length; i++) {
				if (this.isArrayInArray(seen, curr_stone.liberties[i]) == false) { // Add all new stones to the new seen and the list of strictly new stones
					newSeen.push(curr_stone.liberties[i]);
					notSeenLiberties.push(curr_stone.liberties[i]);
				}
			}

			if (notSeenLiberties.length == 0) { // Case for no new stones
				return seen;
			}

			for (var i = 0; i < notSeenLiberties.length; i++) {
				var lib = notSeenLiberties[i];
				var curr_result = this.libertyBFS(newSeen, lib[0], lib[1], colour);
				for (var j = 0; j < curr_result.length; j++) {
					if (this.isArrayInArray(result, curr_result[j]) == false) {
						result.push(curr_result[j]);
					}
				}
			}

			return result;
		}
	}

	isArrayInArray(source, search) {
		// Checks if 2 element array is in 2D array
	    for (var i = 0, len = source.length; i < len; i++) {
	        if (source[i][0] === search[0] && source[i][1] === search[1]) {
	            return true;
	        }
	    }
	    return false;
	}
}