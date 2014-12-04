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
	this.click = params.click;
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
		this.controller.action(this.click);
		this.controller.afterEvent();
	}
};

var TextFieldView = function (controller, params) {
	this.controller = controller;
	this.textChanged = params.textChanged;
	this.text = params.text;
	if (this.text.type == 'fm_ref') {
		this.textListener = this.text.val;
		this.text = this.controller.subscribe(this.textListener, this);
	}
	this.elm = document.createElement('input');
	this.elm.setAttribute('type', 'text');
	this.elm.setAttribute('value', this.text);
	this.elm.setAttribute('size', params.size);
	this.elm.view = this;
	this.elm.onkeyup = function (e) {
		this.view.onkeyup(e);
		return true;
	};
};

TextFieldView.prototype = {
	valueChanged: function (name, value) {
		if (name == this.textListener) {
			if (this.elm.value != value)
				this.elm.value = value;
		}
	},
	
	cleanup: function () {
	},
	
	onkeyup: function (e) {
		this.controller.action(this.textChanged, this.elm.value);
		this.controller.afterEvent();
	}
};

var ListItemView = function (controller, params) {
	this.controller = controller;
	this.elementClicked = params.elementClicked;
	this.elm = document.createElement('div');
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

ListItemView.prototype = {
	valueChanged: function (name, value) {
		if (name === this.sub)
			this.elm.innerText = value;
	},
	
	cleanup: function () {
	},
	
	onclick: function () {
		var parent = this.elm.parentNode;
		var same = false;
		for (var i = 0; i < parent.childNodes.length; i++) {
			var childElm = parent.childNodes.item(i);
			
			if (childElm.getAttribute('class') === 'clicked') {
				if (childElm === this.elm)
					same = true;
				childElm.setAttribute('class', '');
			}
		}
		if (!same) {
			this.elm.setAttribute('class', 'clicked');
			this.controller.action(this.elementClicked, this.elm.innerText);
		} else {
			this.controller.action(this.elementClicked, '');
		}
	}
};

onload = function () {
	var controller = new fm.Controller();
	controller.addActions({
		list: function () {
			var list = this.get('list');
			var searchValue = this.get('searchValue');
			var newlist = [];
			for (var i = 0; i < list.length; i++) {
				if (searchValue == '' || list[i].indexOf(searchValue) != -1)
					newlist.push(list[i]);
			}
			return newlist;
		},
		searchValue: function () {
			return this.get('searchValue');
		},
		searchValueChanged: function (value) {
			this.set('searchValue', value);
		},
		addItem: function () {
			return this.get('addItem');
		},
		gotoAddTemplate: function () {
			this.set('addItemValue', '');
			this.set('addItem', true);
		},
		addItemValueChanged: function (value) {
			this.set('addItemValue', value);
		},
		addItemAdd: function () {
			this.append('list', this.get('addItemValue'));
			this.set('addItem', false);
		},
		addItemCancel: function () {
			this.set('addItem', false);
		},
		activeElement: function (name) {
			if (name == '')
				this.set('activeElement', null);
			else
				this.set('activeElement', name);
		},
		removeItem: function () {
			var activeElement = this.get('activeElement');
			if (!activeElement)
				return;
			var list = this.get('list');
			var idx = -1;
			for (var i = 0; i < list.length; i++) {
				if (list[i] === activeElement) {
					this.remove('list', i);
					return;
				}
			}
		}
	});
	controller.set('list', ['Fragmate', 'is', 'your', 'best', 'mate']);
	controller.set('searchValue', '');
	controller.set('addItem', false);
	controller.set('activeElement', null);
	fm.addController('mainController', controller);
	fm.addView('TextView', TextView);
	fm.addView('ButtonView', ButtonView);
	fm.addView('TextFieldView', TextFieldView);
	fm.addView('ListItemView', ListItemView);
	fm.initTemplate('mainTemplate', 'mainController');
};
