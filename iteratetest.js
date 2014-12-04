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

TextView.prototype = {
	valueChanged: function (name, value) {
		if (name === this.sub)
			this.elm.innerText = value;
	},
	
	cleanup: function () {
	}
};

initTestViews = function () {
	fm.addView('textView', TextView);
};

onload = function () {
	initTestViews();
	var controller = new fm.Controller();
	controller.set('one', ['one', 'two', 'three']);
	controller.addActions({
		one: function () {
			return this.get('one');
		}
	});
	fm.addController('controller', controller);
	fm.initTemplate('test60', 'controller');
};
