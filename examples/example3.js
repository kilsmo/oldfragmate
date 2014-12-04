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

var ArrayView = function (controller, params) {
	this.controller = controller;
	this.arr = params.arr;
	var arr = this.controller.subscribe(this.arr, this);
	this.elm = document.createElement('div');
	this.arrsize = arr.length;
	for (var i = 0; i < this.arrsize; i++) {
		var child = document.createElement('div');
		child.innerText = arr[i];
		this.elm.appendChild(child);
	}
};

ArrayView.prototype = {
	valueChanged: function (name, value, changelog) {
		if (this.arr === name) {
			var pos = this.arrsize;
			for (var i = 0; i < changelog.length; i++) {
				if (changelog[i].command == 'append') {
					for (var j = 0; j < changelog[i].count; j++) {
						var child = document.createElement('div');
						child.innerText = value[pos++];
						this.elm.appendChild(child);
					}
				}
			}
		}
	},
	
	cleanup: function () {
	}
};

onload = function () {
	var controller = new fm.Controller();
	controller.addActions({
		arr: 'arr',
		click: function () {
			this.append('arr', 'something', 'something more');
		}
	});
	controller.set('arr', ['one', 'two', 'three']);
	fm.addController('mainController', controller);
	fm.addView('TextView', TextView);
	fm.addView('ButtonView', ButtonView);
	fm.addView('ArrayView', ArrayView);
	fm.initTemplate('mainTemplate', 'mainController');
};
