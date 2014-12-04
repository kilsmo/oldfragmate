var CellView = function (controller, params) {
	this.clickType = "dragdrop";
	this.controller = controller;
	this.data = params.data;
	this.dataType = params.dataType;
	this.grid = params.grid;
	this.elm = document.createElement('div');
	this.elm.innerText = params.data.name;
	this.elm.setAttribute('class', 'cellview');
	this.elm.view = this;
};

CellView.prototype = {
	ondragstart: function () {
		console.log("ondragstart: " + this.data.id);
		this.grid.dragStarted(this.data.id);
	},
	
	onmousedown: function () {
	},
	
	onmouseclick: function () {
		this.grid.clicked(this.data.id);
	},
	
	cleanup: function () {
	}
};

/*
	"controller" :
				current controller for the GridView.
	"params" :
				elementWidth		: Width in pixels for each cell.
				elementHeight		: Height in pixels for each cell.
				elementMarginLeft	: The margin to the left of the grid.
				elementMarginRight	: The margin to the right of the grid.
				elementMarginTop	: The margin above the grid.
				elementMarginBottom	: The margin below the grid.
				elementMarginX		: The margin between each cell in a row.
				elementMarginY		: The margin between each cell in a column.
				clickAction			: Click action that is defined in "controller".
				removeCellAction	: Remove cell action defined in "controller".
				elements			: Either an array, or a reference to an action in "controller".
									  The elements of the grid.
				cellView			: The name of the view, that will be created for each cell.
*/
var GridView = function (controller, params) {
	this.dropTypes = ["cell"];
	this.controller = controller;
	
	this.elementWidth = params.elementWidth;
	this.elementHeight = params.elementHeight;
	this.elementMarginLeft = params.elementMarginLeft;
	this.elementMarginRight = params.elementMarginRight;
	this.elementMarginTop = params.elementMarginTop;
	this.elementMarginBottom = params.elementMarginBottom;
	this.elementMarginX = params.elementMarginX;
	this.elementMarginY = params.elementMarginY;
	
	this.clickAction = params.clickAction;
	this.removeCellAction = params.removeCellAction;
	
	var elms = params.elements;
	if (elms.type == "fm_ref") {
		this.subscribeElementsName = elms.val;
		elms = controller.subscribe(this.subscribeElementsName, this);
	}
	
	this.elements = [];
	for (var i = 0; i < elms.length; i++) {
		this.elements[i] = { id: elms[i].id, name: elms[i].name };
	}
	
	this.elm = document.createElement("div");
	this.elm.setAttribute("class", "gridview");
	this.elm.view = this;

	this.cellView = params.cellView;
	
	this.children = [];
	for (var i = 0; i < this.elements.length; i++) {
		var child = fm.createInternalView(controller, this.cellView, {
			grid: this,
			data: elms[i]
		});
		this.elm.appendChild(child.elm);
		this.children[i] = child;
	}

	this.inside = false;
	this.reflow();

};

GridView.prototype = {
	valueChanged: function (name, value, changelog) {
		console.log('valueChanged : ' + name + value + changelog);
		if (name == this.subscribeElementsName) {
			for (var i = 0; i < changelog.length; i++) {
				if (changelog[i].command == "removeById") {
					var elmlen = this.elements.length;
					for (var j = 0; j < elmlen; j++) {
						if (this.elements[j].id == changelog[i].id) {
							this.elm.removeChild(this.children[j].elm);
							console.log('remove changelog[i].id');
							this.children[j].cleanup();
							this.elements.splice(j, 1);
							this.children.splice(j, 1);
							break;
						}
					}
				}
			}
		}
	},
	
	removeCell: function (cellid, isDragging) {
		console.log("dragStarted");
		var pos;
		var elmlen = this.elements.length;
		console.log("element length" + elmlen);
		for (var i = 0; i < elmlen; i++) {
			if (this.elements[i].id == cellid) {
				console.log("id found");
				pos = i;
				break;
			}
		}
		var foundit = false;
		//check if the element is a child
		for (var i = 0; i < this.elm.childNodes.length; i++) {
			if (this.children[pos].elm == this.elm.childNodes[i]) {
				foundit = true;
				break;
			}
		}

		if(foundit == false)
			debugger;
		if (pos < this.elements.length) {
			console.log("removing " + pos);
			this.elm.removeChild(this.children[pos].elm);
			this.children[pos].cleanup();
			if (isDragging)
				fm.setDragData({"cell": this.elements[pos]});
			this.elements.splice(pos, 1);
			this.children.splice(pos, 1);
		}
	},
	
	dragStarted: function (cellid) {
		this.removeCell(cellid, true);
	},
	
	clicked: function (id) {
		this.removeCell(id, false);
		this.reflow();
		this.controller.action(this.removeCellAction, id);
		this.controller.afterEvent();
	},
	
	reflow: function (x, y) {
		console.log("reflow");
		if (this.inside) {
			var elementsPerLine = this.getElementsPerLine();
			var yPos = this.elementMarginTop;
			var xPos = this.elementMarginLeft; // TODO: adjust.
			var numChildren = this.children.length + 1;
			var rows = Math.ceil(numChildren / elementsPerLine);
			var skipColumn = -1;
			xPos -= this.elementMarginX / 2;
			for (var i = 0; i < elementsPerLine; i++) {
				xPos += this.elementWidth + this.elementMarginX;
				if (xPos > x) {
					skipColumn = i;
					break;
				}
			}
			if (skipColumn == -1)
				skipColumn = elementsPerLine - 1;
			var skipRow = -1;
			yPos -= this.elementMarginY / 2;
			for (var i = 0; i < rows; i++) {
				yPos += this.elementHeight + this.elementMarginY;

				if (yPos > y) {
					skipRow = i;
					break;
				}
			}
			if (skipRow == -1)
				skipRow = rows - 1;
			var skipPos = elementsPerLine * skipRow + skipColumn;
			if (skipPos >= numChildren)
				skipPos = numChildren - 1;
			var yPos = this.elementMarginTop;
			var xPos = this.elementMarginLeft; // TODO: adjust.
			var elementsLeft = elementsPerLine;
			for (var i = 0; i < numChildren; i++) {
				if (i < skipPos) {
					this.children[i].elm.style.left = xPos + 'px';
					this.children[i].elm.style.top = yPos + 'px';
				} else if (i == skipPos) {
				} else {
					this.children[i - 1].elm.style.left = xPos + 'px';
					this.children[i - 1].elm.style.top = yPos + 'px';
				}
				xPos += this.elementWidth + this.elementMarginX;
				elementsLeft--;
				if (elementsLeft == 0) {
					yPos += this.elementMarginY + this.elementHeight;
					xPos = this.elementMarginLeft;
					elementsLeft = elementsPerLine;
				}
			}
		} else {
			var elementsPerLine = this.getElementsPerLine();
			var yPos = this.elementMarginTop;
			var xPos = this.elementMarginLeft; // TODO: adjust.
			var elementsLeft = elementsPerLine;
			for (var i = 0; i < this.children.length; i++) {
				console.log("reflow: " + i + ", xPos: " + xPos + ", yPos: " + yPos);
				this.children[i].elm.style.left = xPos + 'px';
				this.children[i].elm.style.top = yPos + 'px';
				xPos += this.elementWidth + this.elementMarginX;
				elementsLeft--;
				if (elementsLeft == 0) {
					yPos += this.elementMarginY + this.elementHeight;
					xPos = this.elementMarginLeft;
					elementsLeft = elementsPerLine;
				}
			}
		}
	},

	ondragenter: function (x, y) {
		this.inside = true;
		var dragData = fm.getDragData();
		var data = dragData.cell;
		var view = fm.createInternalView(this.controller, this.cellView, {
			grid: this,
			data: data
		});
		fm.changeDragElm(view.elm);
		console.log('ondragenter here' + x);
		this.reflow(x, y);
	},
	
	ondragleave: function () {
		this.inside = false;
		this.reflow();
	},
	
	ondragmove: function (x, y) {
		this.reflow(x, y);
	},
	
	ondrop: function (x, y) {
		console.log("ondrop");
		var dragData = fm.getDragData();
		var data = dragData.cell;
		data.x = x;
		data.y = y;
		var view = fm.createInternalView(this.controller, this.cellView, {
			grid: this,
			data: data
		});
		// This is the part that should change.
		// Needs to insert the element in order.
		var elementsPerLine = this.getElementsPerLine();
		var yPos = this.elementMarginTop;
		var xPos = this.elementMarginLeft; // TODO: adjust.
		var numChildren = this.children.length + 1;
		var rows = Math.ceil(numChildren / elementsPerLine);
		var insertColumn = -1;
		xPos -= this.elementMarginX / 2;
		for (var i = 0; i < elementsPerLine; i++) {
			xPos += this.elementWidth + this.elementMarginX;
			if (xPos > x) {
				insertColumn = i;
				break;
			}
		}
		if (insertColumn == -1)
			insertColumn = elementsPerLine - 1;
		var insertRow = -1;
		yPos -= this.elementMarginY / 2;
		for (var i = 0; i < rows; i++) {
			yPos += this.elementHeight + this.elementMarginY;
			if (yPos > y) {
				insertRow = i;
				break;
			}
		}
		if (insertRow == -1)
			insertRow = rows - 1;
		var insertPos = elementsPerLine * insertRow + insertColumn;
		if (insertPos >= numChildren)
			insertPos = numChildren - 1;
		if (insertPos >= this.children.length) {
			this.elm.appendChild(view.elm);
			this.children.push(view);
			this.elements.push(data);
		} else {
			this.elm.insertBefore(view.elm, this.elm.childNodes.item(insertPos));
			this.children.splice(insertPos, 0, view);
			this.elements.splice(insertPos, 0, data);
		}
		console.log("ondrop done");
	},
	
	ondragend: function () {
	},
	
	ondragcancel: function () {
	},
	
	onnodropenter: function () {
	},
	
	onnodropleave: function () {
	},
	
	onnodropmove: function () {
	},
	
	getElementsPerLine: function () {
		return 3; // FIXME: implement.
	}

};

var before = function () {
	var controller = new fm.Controller();
	controller.set("elements", []);
	controller.append("elements", { "name": "Hello", "id": fm.generateId() });
	controller.append("elements", { "name": "World", "id": fm.generateId() });
	controller.append("elements", { "name": "Bye", "id": fm.generateId() });
	controller.append("elements", { "name": "One", "id": fm.generateId() });
	controller.append("elements", { "name": "Two", "id": fm.generateId() });
	controller.append("elements", { "name": "Three", "id": fm.generateId() });
	controller.append("elements", { "name": "Four", "id": fm.generateId() });
	controller.append("elements", { "name": "Five", "id": fm.generateId() });
	controller.addActions({
		elements: "elements",
		removeElement: function (id) {
			console.log("removeElement"+id);
			this.removeById("elements", id);
		}
	});
	controller.ready();
	fm.addController("mainController", controller);
	fm.addView("CellView", CellView);
	fm.addView("GridView", GridView);
};

fm.init({
	before: before,
	controller: "mainController",
	template: "mainTemplate"
});
