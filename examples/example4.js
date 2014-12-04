var before = function () {
	var controller = new fm.Controller();
	fm.addController('mainController', controller);
};

fm.init({
	before: before,
	controller: 'mainController',
	template: 'mainTemplate'
});
