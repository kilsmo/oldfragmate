var CellView = function (controller, params) {
	this.clickType = "dragdrop";
	this.controller = controller;
	this.data = params.data;
	this.dataType = params.dataType;
	this.grid = params.grid;
	this.elm = document.createElement('div');
	this.elm.innerText = params.data.name;
	this.elm.setAttribute('class', 'cellview');
	this.elm.style.left = this.data.x + 'px';
	this.elm.style.top = this.data.y + 'px';
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

var AbsoluteDropView = function (controller, params) {

	this.dropTypes = ["cell"];
	this.controller = controller;
	
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
	this.elm.setAttribute("class", "absolutedropview");
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
};


AbsoluteDropView.prototype = {
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
	
	dragStarted: function (cellid) {
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
			console.log("Before here");
			fm.setDragData({"cell": this.elements[pos]});
			console.log("Here");
			this.elements.splice(pos, 1);
			this.children.splice(pos, 1);
		}
	},
	
	clicked: function (view) {
		this.controller.action("removeElement", view);
		this.controller.afterEvent();
	},
	
	ondragenter: function () {
		var dragData = fm.getDragData();
		var data = dragData.cell;
		var view = fm.createInternalView(this.controller, this.cellView, {
			grid: this,
			data: data
		});
		fm.changeDragElm(view.elm);
	},
	
	ondragleave: function () {
		
	},
	
	ondragmove: function () {
		// Do nothing.
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
		console.log("appending" + view.elm);
		this.elm.appendChild(view.elm);
		this.children.push(view);
		this.elements.push(data);
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
	}

};

var before = function () {
	var controller = new fm.Controller();
	controller.set("elements", []);
	controller.append("elements", { "x": 100, "y": 100, "name": "Hello", "id": fm.generateId() });
	controller.append("elements", { "x": 200, "y": 200, "name": "World", "id": fm.generateId() });
	controller.append("elements", { "x": 105, "y": 105, "name": "Bye", "id": fm.generateId() });
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
	fm.addView("AbsoluteDropView", AbsoluteDropView);
};

fm.init({
	before: before,
	controller: "mainController",
	template: "mainTemplate"
});
