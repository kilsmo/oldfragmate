var TextView = function (controller, params) {
	this.controller = controller;
	this.elm = document.createElement("span");
	var intext = params.text;
	if (intext.type === "fm_ref") {
		this.sub = intext.val;
		intext = controller.subscribe(intext.val, this);
	}
	this.elm.innerText = intext;
};

TextView.prototype = {
	valueChanged: function (name, value) {
		if (name === this.sub)
			this.elm.innerText = value;
	},
	
	cleanup: function () {
	}
};

var ButtonView = function (controller, params) {
	this.controller = controller;
	this.elm = document.createElement("span");
	this.elm.setAttribute("class", "button");
	this.elm.innerText = params.text;
	this.elm.view = this;
	
	this.clickType = "simple";
};

ButtonView.prototype = {
	onmousedown: function () {
		this.elm.setAttribute("class", "buttondown button");
	},
	
	onmouseclick: function () {
		this.elm.setAttribute("class", "button");
		this.controller.action("click");
		this.controller.afterEvent();
	},
	
	onmousecancel: function () {
		this.elm.setAttribute("class", "button");
	},
	
	onmouseenter: function () {
		this.elm.setAttribute("class", "buttondown button");
	},
	
	onmouseleave: function () {
		this.elm.setAttribute("class", "buttonoutside button");
	}
};

var before = function () {
	var controller = new fm.Controller();
		controller.addActions({
		counter: "counter",
		click: function () {
			this.set("counter", this.get("counter") + 1);
		}
	});
	controller.set('counter', 0);

	fm.addController("mainController", controller);
	fm.addView("ButtonView", ButtonView);
	fm.addView("TextView", TextView);
};

fm.init({
	before: before,
	controller: "mainController",
	template: "mainTemplate"
});
