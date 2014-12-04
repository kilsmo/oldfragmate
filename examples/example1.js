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

var ButtonView = function (controller, params) {
	this.controller = controller;
	this.elm = document.createElement('button');
	var intext = params.text;
	if (intext.type === 'fm_ref') {
		this.sub = intext.val;
		intext = controller.subscribe(intext.val, this);
	}
	var text = document.createTextNode(intext);
	this.elm.appendChild(text);
	this.elm.view = this;
	this.elm.onclick = function () {
		this.view.onclick();
	};
};
ButtonView.prototype = {
	valueChanged: function (name, value) {
	},
	
	cleanup: function () {
	},
	
	onclick: function () {
		this.controller.action('click');
		this.controller.afterEvent();
	}
};

var before = function () {
	var controller = new fm.Controller();
	controller.addActions({
		counter: 'counter',
		click: function () {
			this.set('counter', this.get('counter') + 1);
		}
	});
	controller.set('counter', 0);
	fm.addController('mainController', controller);
	fm.addView('TextView', TextView);
	fm.addView('ButtonView', ButtonView);
};

fm.init({
	before: before,
	controller: 'mainController',
	template: 'mainTemplate'
});
