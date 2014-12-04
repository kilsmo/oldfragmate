
var ButtonView = function (controller, params) {
    this.controller = controller;
    this.elm = document.createElement("span");
    this.elm.setAttribute("class", "button");
    this.elm.innerText = params.text;
    this.elm.view = this;
    this.clickType = "simple";
};

ButtonView.prototype = {

    onmouseclick: function () {
        this.elm.setAttribute("class", "button");
        this.controller.action("clickbutton");
        this.controller.afterEvent();
    }
};

var LabelView = function (controller, params) {
    this.controller = controller;
    this.elm = document.createElement("span");
    this.elm.setAttribute("class", "label");
    this.elm.innerText = params.text;
    this.elm.view = this;
    this.clickType = "simple";
    controller.subscribe('counter', this);};

LabelView.prototype = {
    valueChanged: function (name, value) {
        this.elm.innerText = value;
    },

    onmousedown: function () {
        this.elm.setAttribute("class", "buttondown");
    }

};

var before = function () {
    var controller = new fm.Controller();

    controller.addActions({
        counter: "counter",
        clickbutton: function () {

            this.set("counter", this.get("counter") + 1)

            var param = {};
            param.text = "label - text";
            var newView = fm.createInternalView(this, "LabelView", param);
            var controllerRoot = document.getElementsByClassName('fm_template')[0];
            controllerRoot.appendChild(newView.elm);

        }

    });
    controller.set('counter', 0);

    fm.addController("mainController", controller);

    fm.addView("ButtonView", ButtonView);
    fm.addView("LabelView", LabelView);
};

fm.init({
    before: before,
    controller: "mainController",
    template: "mainTemplate"
});
