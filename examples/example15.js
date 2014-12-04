var SimpleButtonView = function (controller, params) {
	this.controller = controller;
	this.elm = document.createElement('button');
	if(params.className)
		this.elm.classList.add(params.className);

	var text = params.text;
	if (text.type == 'fm_ref') {
		this.textSubscribe = params.text.val;
		text = controller.subscribe(this.textSubscribe, this);
	}
	this.elm.textContent = text;

	this.elm.view = this;

	this.elm.onclick = function () {
		this.view.controller.action(params.clickAction);
		this.view.controller.afterEvent();
	}

};

SimpleButtonView.prototype = {
	valueChanged: function (name, value) {
		if (name == this.textSubscribe) {
			this.elm.textContent = value;
		}
	},
	cleanup: function () {
		if (this.textSubscribe)
			this.controller.unsubscribe(this.textSubscribe);
	}
};

var MyCardView = function (controller, params) {
	this.controller = controller;
	this.id = params.id;
	this.klass = params.klass;
	this.elm = document.createElement("div");
	this.elm.className = "mycardview " + this.klass + " hidden";
};

MyCardView.prototype = {
	hide: function () {
		this.elm.className = "mycardview " + this.klass + " hidden";
	},
	
	show: function (width, height) {
		this.setSize(width, height);
		this.elm.className = "mycardview " + this.klass + " visible";
	},
	
	setSize: function (width, height) {
		this.elm.style.width = width + "px";
		this.elm.style.height = height + "px";
	}
};

/*
	activeCard: the card that is active.
	cards: the cards (an object) that are inside the CardView.
	card: the actual view that will be used for each card.
 */
var CardView = function (controller, params) {
	this.controller = controller;
	this.activeCard = params.activeCard;
	this.cards = params.cards;
	this.card = params.card;
	
	this.allCards = controller.subscribe(this.cards, this);
	this.theActiveCard = controller.subscribe(this.activeCard, this);
	this.cardViews = {};
	
	fm.addAfterEventHandler(this);
	fm.addOnloadHandler(this);
	fm.addResizeHandler(this);
	
	this.elm = document.createElement("div");
	this.elm.className = "cardview";
	
	for (var x in this.allCards) {
		this.cardViews[x] = fm.createInternalView(this.controller,
												  this.card,
												  this.allCards[x]);
		this.elm.appendChild(this.cardViews[x].elm);
	}
	
	this.width = this.elm.offsetWidth;
	this.height = this.elm.offsetHeight;
	
	
	if (this.cardViews[this.theActiveCard])
		this.cardViews[this.theActiveCard].show(this.width, this.height);
};

CardView.prototype = {
	valueChanged: function (name, value) {
		if (name == this.cards) {
			// FIXME: implement.
			// The cards have changed.
			// Check if one is added or removed.
		} else if (name == this.activeCard) {
			if (this.cardViews[this.theActiveCard])
				this.cardViews[this.theActiveCard].hide();
			this.theActiveCard = value;
			if (this.cardViews[this.theActiveCard])
				this.cardViews[this.theActiveCard].show(this.width, this.height);
		}
	},
	
	onload: function () {
		this.updateSize();
	},
	
	onresize: function () {
		this.updateSize();
	},
	
	onafterevent: function () {
		this.updateSize();
	},
	
	updateSize: function () {
		if (this.width != this.elm.offsetWidth || this.height == this.elm.offsetHeight) {
			this.width = this.elm.offsetWidth;
			this.height = this.elm.offsetHeight;
			if (this.cardViews[this.theActiveCard])
				this.cardViews[this.theActiveCard].show(this.width, this.height);
		}
	}
};

var before = function () {
	var controller = new fm.Controller();
	controller.set("cards", {});
	controller.setKeyValue("cards", "one", { klass: "red" });
	controller.setKeyValue("cards", "two", { klass: "green" });
	controller.setKeyValue("cards", "three", { klass: "blue" });
	controller.set("activeCard", "one");
	controller.addActions({
		cards: "cards",
		toggleActiveCard: function () {
			var activeCard = this.get("activeCard");
			if (activeCard == "one")
				activeCard = "two";
			else if (activeCard == "two")
				activeCard = "three";
			else if (activeCard == "three")
				activeCard = "one";
			this.set("activeCard", activeCard);
		},
		activeCard: "activeCard"
	});
	controller.ready();
	fm.addController("mainController", controller);
	fm.addView("SimpleButtonView", SimpleButtonView);
	fm.addView("CardView", CardView);
	fm.addView("MyCardView", MyCardView);
};

fm.init({
	before: before,
	controller: "mainController",
	template: "mainTemplate"
});
