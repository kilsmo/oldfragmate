var DefaultDropView = function (controller, params) {
	this.elm = document.createElement("div");
	this.elm.setAttribute("class", "defaultdropview");
	this.elm.view = this;
	var dragView = new DragView(controller, {});
	this.elm.appendChild(dragView.elm);
	this.dropTypes = ["droptype1"];
};

DefaultDropView.prototype = {
	ondragenter: function () {
		var elm = document.createElement("div");
		elm.innerText = "Default";
		fm.changeDragElm(elm);
	},
	
	ondragleave: function () {
	},
	
	ondragmove: function () {
	},
	
	onnodropenter: function () {
		var elm = document.createElement("div");
		elm.innerText = "Nodrop";
		fm.changeDragElm(elm);
	},
	
	onnodropleave: function () {
	},
	
	onnodropmove: function () {
	},
	
	ondrop: function () {
		var view = new DragView();
		this.elm.appendChild(view.elm);
	},
	
	ondragend: function () {
	},

	ondragcancel: function () {
		var view = new DragView();
		this.elm.appendChild(view.elm);
	}
};

var SecondaryDropView = function (controller, params) {
	this.elm = document.createElement("div");
	this.elm.setAttribute("class", "secondarydropview");
	this.elm.view = this;
	this.dropTypes = ["droptype2"];
};

SecondaryDropView.prototype = {
	ondragenter: function () {
		var elm = document.createElement("div");
		elm.innerText = "Secondary";
		fm.changeDragElm(elm);
	},
	
	ondragleave: function () {
	},
	
	ondragmove: function () {
	},
	
	onnodropenter: function () {
		var elm = document.createElement("div");
		elm.innerText = "Nodrop";
		fm.changeDragElm(elm);
	},
	
	onnodropleave: function () {
	},
	
	onnodropmove: function () {
	},
	
	ondrop: function () {
		var view = new DragView();
		this.elm.appendChild(view.elm);
	},
	
	ondragend: function () {
	},

	ondragcancel: function () {
		var view = new DragView();
		this.elm.appendChild(view.elm);
	}
};

var DragView = function (controller, params) {
	this.clickType = "dragdrop";
	this.elm = document.createElement("div");
	this.elm.setAttribute("class", "dragview");
	this.elm.innerText = "Dragme";
	this.elm.view = this;
};

DragView.prototype = {
	onmousedown: function () {
	},
	onmouseclick: function () {
	},
	ondragstart: function () {
		var dragelm = this.elm;
		dragelm.parentNode.removeChild(dragelm);
		fm.setDragData({
			droptype1: "one",
			droptype2: "two"
		});
	}
};

var before = function () {
	var controller = new fm.Controller();
	fm.addController("mainController", controller);
	fm.addView("DefaultDropView", DefaultDropView);
	fm.addView("SecondaryDropView", SecondaryDropView);
};

fm.init({
	before: before,
	controller: "mainController",
	template: "mainTemplate"
});
