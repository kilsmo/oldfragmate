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

onload = function () {
	var controller = new fm.Controller();
	controller.addActions({
		hello: function () {
			return 'Counter';
		},
		hello2: function () {
			return 'Hello';
		},
		click: function () {
			var old = this.get('toggle');
			this.set('toggle', !old);
		},
		on: function () {
			return this.get('toggle');
		}
	});
	controller.set('toggle', false);
	fm.addController('controller', controller);
	fm.addView('textView', TextView);
	fm.addView('buttonView', ButtonView);
	fm.initTemplate('testtemp1', 'controller');
};
