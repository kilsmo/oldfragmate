AssertException = function () {
};

function assert (expression) {
    if (!expression)
        throw new AssertException();
}

Tests = {
    test1: function () {
        var controller = new fm.Controller();
        assert(typeof controller.get('one') === 'undefined');
    },

    test2: function () {
        var controller = new fm.Controller();
        controller.set('one', 3);
        assert(controller.get('one') === 3);
    },

    test3: function () {
        var controller = new fm.Controller();
        controller.set('one', 'two');
        assert(controller.get('one') === 'two');
    },

    test4: function () {
        var controller = new fm.Controller();
        controller.set('one', 'two');
        assert(typeof controller.get('two') === 'undefined');
    },

    test5: function () {
        var controller = new fm.Controller();
        controller.set('one', 'two');
        controller.set('one', 2);
        assert(controller.get('one') === 2);
    },

    test6: function () {
        var controller = new fm.Controller();
        controller.set('one', 'two');
        controller.set('two', 2);
        assert(controller.get('one') === 'two');
        assert(controller.get('two') === 2);
    },

    test7: function () {
        var controller = new fm.Controller();
        controller.set('one', []);
        var value = controller.get('one');
        assert(Array.isArray(value) && value.length === 0);
    },

    test8: function () {
        var controller = new fm.Controller();
        controller.set('one', [2, 3]);
        var value = controller.get('one');
        assert(Array.isArray(value) && value.length === 2 && value[0] === 2 && value[1] === 3);
    },

    test9: function () {
        var controller = new fm.Controller();
        controller.set('one', []);
        controller.clear('one');
        var value = controller.get('one');
        assert(Array.isArray(value) && value.length === 0);
    },

    test10: function () {
        var controller = new fm.Controller();
        controller.set('one', [2, 3]);
        controller.clear('one');
        var value = controller.get('one');
        assert(Array.isArray(value) && value.length === 0);
    },

    test11: function () {
        var controller = new fm.Controller();
        controller.set('one', []);
        controller.append('one', 4);
        var value = controller.get('one');
        assert(Array.isArray(value) && value.length === 1);
        assert(value[0] === 4);
    },

    test12: function () {
        var controller = new fm.Controller();
        controller.set('one', [2, 3]);
        controller.append('one', 4);
        var value = controller.get('one');
        assert(Array.isArray(value) && value.length === 3);
        assert(value[0] === 2);
        assert(value[1] === 3);
        assert(value[2] === 4);
    },

    test13: function () {
        var controller = new fm.Controller();
        controller.set('one', []);
        controller.append('one', 4, 5);
        var value = controller.get('one');
        assert(Array.isArray(value) && value.length === 2);
        assert(value[0] === 4);
        assert(value[1] === 5);
    },

    test14: function () {
        var controller = new fm.Controller();
        controller.set('one', [2, 3]);
        controller.append('one', 4, 5);
        var value = controller.get('one');
        assert(Array.isArray(value) && value.length === 4);
        assert(value[0] === 2);
        assert(value[1] === 3);
        assert(value[2] === 4);
        assert(value[3] === 5);
    },

    test15: function () {
        var controller = new fm.Controller();
        controller.set('one', []);
        controller.prepend('one', 4);
        var value = controller.get('one');
        assert(Array.isArray(value) && value.length === 1);
        assert(value[0] === 4);
    },

    test16: function () {
        var controller = new fm.Controller();
        controller.set('one', [2, 3]);
        controller.prepend('one', 4);
        var value = controller.get('one');
        assert(Array.isArray(value) && value.length === 3);
        assert(value[0] === 4);
        assert(value[1] === 2);
        assert(value[2] === 3);
    },

    test17: function () {
        var controller = new fm.Controller();
        controller.set('one', []);
        controller.prepend('one', 4, 5);
        var value = controller.get('one');
        assert(Array.isArray(value) && value.length === 2);
        assert(value[0] === 4);
        assert(value[1] === 5);
    },

    test18: function () {
        var controller = new fm.Controller();
        controller.set('one', [2, 3]);
        controller.prepend('one', 4, 5);
        var value = controller.get('one');
        assert(Array.isArray(value) && value.length === 4);
        assert(value[0] === 4);
        assert(value[1] === 5);
        assert(value[2] === 2);
        assert(value[3] === 3);
    },

    test19: function () {
        var controller = new fm.Controller();
        controller.set('one', [2, 3]);
        controller.remove('one', 1);
        var value = controller.get('one');
        assert(Array.isArray(value) && value.length === 1);
        assert(value[0] === 2);
    },

    test20: function () {
        var controller = new fm.Controller();
        controller.set('one', [2, 3]);
        controller.remove('one', 0);
        var value = controller.get('one');
        assert(Array.isArray(value) && value.length === 1);
        assert(value[0] === 3);
    },

    test21: function () {
        var controller = new fm.Controller();
        controller.set('one', [2, 3]);
        controller.remove('one', 1, 1);
        var value = controller.get('one');
        assert(Array.isArray(value) && value.length === 1);
        assert(value[0] === 2);
    },

    test22: function () {
        var controller = new fm.Controller();
        controller.set('one', [2, 3]);
        controller.remove('one', 0, 1);
        var value = controller.get('one');
        assert(Array.isArray(value) && value.length === 1);
        assert(value[0] === 3);
    },

    test23: function () {
        var controller = new fm.Controller();
        controller.set('one', [2, 3, 4]);
        controller.remove('one', 1, 2);
        var value = controller.get('one');
        assert(Array.isArray(value) && value.length === 1);
        assert(value[0] === 2);
    },

    test24: function () {
        var controller = new fm.Controller();
        controller.set('one', [2, 3, 4]);
        controller.remove('one', 0, 2);
        var value = controller.get('one');
        assert(Array.isArray(value) && value.length === 1);
        assert(value[0] === 4);
    },

    test25: function () {
        var controller = new fm.Controller();
        controller.set('one', [2, 3, 4]);
        controller.remove('one', 1);
        var value = controller.get('one');
        assert(Array.isArray(value) && value.length === 2);
        assert(value[0] === 2);
        assert(value[1] === 4);
    },

    test26: function () {
        var controller = new fm.Controller();
        controller.set('one', [2, 3, 4]);
        controller.remove('one', 0);
        var value = controller.get('one');
        assert(Array.isArray(value) && value.length === 2);
        assert(value[0] === 3);
        assert(value[1] === 4);
    },
	
	test27: function () {
        var controller = new fm.Controller();
        controller.set('one', []);
        controller.insert('one', 0, 2);
        var value = controller.get('one');
        assert(Array.isArray(value) && value.length === 1);
        assert(value[0] === 2);
    },

	test28: function () {
        var controller = new fm.Controller();
        controller.set('one', [2]);
        controller.insert('one', 0, 3);
        var value = controller.get('one');
        assert(Array.isArray(value) && value.length === 2);
        assert(value[0] === 3);
        assert(value[1] === 2);
	},

	test29: function () {
        var controller = new fm.Controller();
        controller.set('one', [2]);
        controller.insert('one', 1, 3);
        var value = controller.get('one');
        assert(Array.isArray(value) && value.length === 2);
        assert(value[0] === 2);
        assert(value[1] === 3);
	},

	test30: function () {
        var controller = new fm.Controller();
        controller.set('one', [2, 3]);
        controller.insert('one', 0, 4);
        var value = controller.get('one');
        assert(Array.isArray(value) && value.length === 3);
        assert(value[0] === 4);
        assert(value[1] === 2);
        assert(value[2] === 3);
	},

	test31: function () {
        var controller = new fm.Controller();
        controller.set('one', [2, 3]);
        controller.insert('one', 1, 4);
        var value = controller.get('one');
        assert(Array.isArray(value) && value.length === 3);
        assert(value[0] === 2);
        assert(value[1] === 4);
        assert(value[2] === 3);
	},

	test32: function () {
        var controller = new fm.Controller();
        controller.set('one', [2, 3]);
        controller.insert('one', 2, 4);
        var value = controller.get('one');
        assert(Array.isArray(value) && value.length === 3);
        assert(value[0] === 2);
        assert(value[1] === 3);
        assert(value[2] === 4);
	},

	test33: function () {
        var controller = new fm.Controller();
        controller.set('one', {});
        controller.setKeyValue('one', 'two', 3);
        var value = controller.get('one');
        assert(value.two === 3);
	},

	test34: function () {
        var controller = new fm.Controller();
        controller.set('one', {});
        controller.setKeyValue('one', 'two', 3);
        controller.setKeyValue('one', 'two', 4);
        var value = controller.get('one');
        assert(value.two === 4);
	},

	test35: function () {
        var controller = new fm.Controller();
        controller.set('one', {});
        controller.setKeyValue('one', 'two', 3);
        controller.setKeyValue('one', 'four', 5);
        var value = controller.get('one');
        assert(value.two === 3);
        assert(value.four === 5);
	},

	test36: function () {
        var controller = new fm.Controller();
        controller.set('one', {});
        controller.setKeyValue('one', 'two', 'three');
        controller.setKeyValue('one', 'four', 'five');
        var value = controller.get('one');
        assert(value.two === 'three');
        assert(value.four === 'five');
	},

	test37: function () {
        var controller = new fm.Controller();
		controller.addActions({
			actionOne: function() {
				this.set('one', 2);
			}
		});
		controller.action('actionOne');
        var value = controller.get('one');
        assert(value === 2);
	},

	test38: function () {
        var controller = new fm.Controller();
		controller.addActions({
			actionOne: function(val) {
				this.set('one', val);
			}
		});
		controller.action('actionOne', 3);
        var value = controller.get('one');
        assert(value === 3);
	},

	test39: function () {
        var controller = new fm.Controller();
		controller.addActions({
			actionOne: function(val1, val2) {
				this.set('one', val1 + val2);
			}
		});
		controller.action('actionOne', 3, 4);
        var value = controller.get('one');
        assert(value === 7);
	},

	test40: function () {
        var controller = new fm.Controller();
		controller.addActions({
			actionOne: function() {
				this.set('one', 2);
			},
			actionTwo: function() {
				this.set('three', 4);
			},
		});
		controller.action('actionOne');
		controller.action('actionTwo');
        var value = controller.get('one');
        assert(value === 2);
        value = controller.get('three');
        assert(value === 4);
	},

	test41: function () {
        var controller = new fm.Controller();
		controller.addActions({
			actionOne: function() {
				return 2;
			}
		});
		var value = controller.action('actionOne');
        assert(value === 2);
	},

	test42: function () {
        var controller = new fm.Controller();
		controller.addActions({
			actionOne: function() {
			}
		});
		var value = controller.action('actionOne');
        assert(typeof value === 'undefined');
	},

	test43: function () {
        var controller = new fm.Controller();
		controller.addActions({
			actionOne: function() {
				return 2;
			}
		});
		var value = controller.subscribe('actionOne');
        assert(value === 2);
	},

	test44: function () {
        var controller = new fm.Controller();
		controller.addActions({
			actionOne: function() {
				return 2;
			}
		});
		controller.subscribe('actionOne');
        var value = controller.subscribe('actionOne');
		assert(value === 2);
	},

	test45: function () {
        var controller = new fm.Controller();
		controller.addActions({
			actionOne: function(val) {
				this.set('one', val);
			},
			
			actionTwo: function() {
				return this.get('one');
			}

		});
		var View = {
			valueChanged: function (name, value) {
				if (name == 'actionTwo')
					this.value = value;
			},
			value: 0
		};
		controller.action('actionOne', 2);
		var value = controller.subscribe('actionTwo', View);
		assert(value === 2);
		controller.action('actionOne', 3);
		assert(View.value === 0);
		controller.afterEvent();
		assert(View.value === 3);
	},

	test46: function () {
        var controller = new fm.Controller();
		controller.addActions({
			actionOne: function(val) {
				this.set('one', val);
			},
			
			actionTwo: function() {
				return this.get('one');
			}

		});
		var View1 = {
			valueChanged: function (name, value) {
				if (name == 'actionTwo')
					this.value = value;
			},
			value: 0
		};
		var View2 = {
			valueChanged: function (name, value) {
				if (name == 'actionTwo')
					this.value = value;
			},
			value: 0
		};
		controller.action('actionOne', 2);
		var value = controller.subscribe('actionTwo', View1);
		assert(value === 2);
		value = controller.subscribe('actionTwo', View2);
		assert(value === 2);
		controller.action('actionOne', 3);
		assert(View1.value === 0);
		assert(View2.value === 0);
		controller.afterEvent();
		assert(View1.value === 3);
		assert(View2.value === 3);
	},

	test47: function () {
        var controller = new fm.Controller();
		controller.addActions({
			actionOne: function(val) {
				this.set('one', val);
			},
			
			actionTwo: function() {
				return this.get('one');
			}

		});
		var View1 = {
			valueChanged: function (name, value) {
				if (name == 'actionTwo')
					this.value = value;
			},
			value: 0
		};
		var View2 = {
			valueChanged: function (name, value) {
				if (name == 'actionTwo')
					this.value = value;
			},
			value: 0
		};
		controller.action('actionOne', 2);
		var value = controller.subscribe('actionTwo', View1);
		assert(value === 2);
		controller.action('actionOne', 3);
		assert(View1.value === 0);
		value = controller.subscribe('actionTwo', View2);
		assert(value === 2);
		controller.afterEvent();
		assert(View1.value === 3);
		assert(View2.value === 3);
	},

	test48: function () {
        var controller = new fm.Controller();
		controller.addActions({
			actionOne: function(val) {
				this.set('one', val);
			},
			
			actionTwo: function() {
				return this.get('one') + this.get('three');
			},

			actionThree: function(val) {
				this.set('three', val);
			}
		});
		var View = {
			valueChanged: function (name, value) {
				if (name == 'actionTwo')
					this.value = value;
			},
			value: 0
		};
		controller.action('actionOne', 2);
		controller.action('actionThree', 4);
		var value = controller.subscribe('actionTwo', View);
		assert(value === 6);
		controller.action('actionOne', 3);
		assert(View.value === 0);
		controller.afterEvent();
		assert(View.value === 7);
	},

	test49: function () {
        var controller = new fm.Controller();
		controller.addActions({
			actionOne: function(val) {
				this.set('one', val);
			},
			
			actionTwo: function() {
				return this.get('one') + this.get('three');
			},

			actionThree: function(val) {
				this.set('three', val);
				this.set('five', val * 2);
			},

			actionFour: function() {
				return this.get('one') + this.get('five');
			}
		});
		var View1 = {
			valueChanged: function (name, value) {
				if (name == 'actionTwo')
					this.value = value;
			},
			value: 0
		};
		var View2 = {
			valueChanged: function (name, value) {
				if (name == 'actionFour')
					this.value = value;
			},
			value: 0
		};
		controller.action('actionOne', 2);
		controller.action('actionThree', 4);
		var value = controller.subscribe('actionTwo', View1);
		assert(value === 6);
		value = controller.subscribe('actionFour', View2);
		assert(value === 10);
		controller.action('actionOne', 3);
		assert(View1.value === 0);
		assert(View2.value === 0);
		controller.afterEvent();
		assert(View1.value === 7);
		assert(View2.value === 11);
	},

	test50: function () {
        var controller = new fm.Controller();
		controller.addActions({
			actionOne: function(val) {
				this.set('one', val);
			},
			
			actionTwo: function() {
				return this.get('one') + this.get('three');
			},

			actionThree: function(val) {
				this.set('three', val);
				this.set('five', val * 2);
			},

			actionFour: function() {
				return this.get('one') + this.get('five');
			}
		});
		var View1 = {
			valueChanged: function (name, value) {
				if (name == 'actionTwo')
					this.value = value;
			},
			value: 0
		};
		var View2 = {
			valueChanged: function (name, value) {
				if (name == 'actionFour')
					this.value = value;
			},
			value: 0
		};
		controller.action('actionOne', 2);
		controller.action('actionThree', 4);
		var value = controller.subscribe('actionTwo', View1);
		assert(value === 6);
		value = controller.subscribe('actionFour', View2);
		assert(value === 10);
		controller.action('actionThree', 3);
		assert(View1.value === 0);
		assert(View2.value === 0);
		controller.afterEvent();
		assert(View1.value === 5);
		assert(View2.value === 8);
	}
	
};


function controllerTests() {
    // Find all the tests.
    var tests = [];
    for (var x in Tests) {
        if (x.indexOf('test') == 0)
            tests.push({ name: x, test: Tests[x] });
    }

    var results = [];
    var testsPass = 0;

    for (var i = 0; i < tests.length; i++) {
        var success = true;
        try {
            tests[i].test();
            testsPass++;
        } catch (e) {
            success = false;
        }
        results.push(success);
    }

    var bodyElm = document.getElementsByTagName('body')[0];
    for (var i = 0; i < results.length; i++) {
        var elm = document.createElement('div');
        elm.innerText = tests[i].name + ': ' + (results[i] ? 'pass' : 'fail');
        bodyElm.appendChild(elm);
    }

    var elm = document.createElement('div');
    elm.innerText = '-------------------------';
    bodyElm.appendChild(elm);

    var elm = document.createElement('div');
    elm.innerText = 'Tests run: ' + results.length;
    bodyElm.appendChild(elm);

    var elm = document.createElement('div');
    elm.innerText = 'Tests pass: ' + testsPass;
    bodyElm.appendChild(elm);

    var elm = document.createElement('div');
    elm.innerText = 'Tests fail: ' + (results.length - testsPass);
    bodyElm.appendChild(elm);

}

onload = function () {
    controllerTests();
};
