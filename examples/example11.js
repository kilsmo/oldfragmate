var TextView = function (controller, params) {
	this.controller = controller;
	this.elm = document.createElement('span');
	var intext = params.text;
	if (intext.type === 'fm_ref') {
		this.sub = intext.val;
		intext = controller.subscribe(intext.val, this);
	}
	var text = document.createTextNode(intext);
	this.elm.appendChild(text);
};

var before = function () {
	var controller = new fm.Controller();
	controller.ready();
	fm.addController("mainController", controller);
	fm.addView("TextView", TextView);
};

fm.init({
	before: before,
	controller: "mainController",
	template: "mainTemplate"
});
