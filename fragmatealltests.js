var testObj = {

	test1: function () {
		var controller = new fm.Controller();
		fm.addController('controller', controller);
		return 'controller';
	},

	test2: function () {
		var controller = new fm.Controller();
		fm.addController('controller', controller);
		return 'controller';
	},
	
	test3: function () {
		var controller = new fm.Controller();
		controller.set('hello', 'Hello world');
		controller.addActions({
			hello: function () {
				return this.get('hello');
			}
		});
		fm.addController('controller', controller);
		return 'controller';
	},

	test4: function () {
		var controller = new fm.Controller();
		fm.addController('controller', controller);
		return 'controller';
	},
	
	test5: function () {
		var controller = new fm.Controller();
		controller.set('hello', 'Hello world');
		controller.addActions({
			hello: function () {
				return this.get('hello');
			}
		});
		fm.addController('controller', controller);
		return 'controller';
	},
	
	eventtest5: function () {
		var controller = fm.getController('controller');
		controller.set('hello', 'Hello you');
		controller.afterEvent();
	},

	test6: function () {
		var controller = new fm.Controller();
		controller.set('one', false);
		controller.addActions({
			one: function () {
				return this.get('one');
			}
		});
		fm.addController('controller', controller);
		return 'controller';
	},

	test7: function () {
		var controller = new fm.Controller();
		controller.set('one', true);
		controller.addActions({
			one: function () {
				return this.get('one');
			}
		});
		fm.addController('controller', controller);
		return 'controller';
	},

	test8: function () {
		var controller = new fm.Controller();
		controller.set('one', false);
		controller.addActions({
			one: function () {
				return this.get('one');
			}
		});
		fm.addController('controller', controller);
		return 'controller';
	},
	
	eventtest8: function () {
		var controller = fm.getController('controller');
		controller.set('one', true);
		controller.afterEvent();
	},
	
	test9: function () {
		var controller = new fm.Controller();
		controller.set('one', true);
		controller.addActions({
			one: function () {
				return this.get('one');
			}
		});
		fm.addController('controller', controller);
		return 'controller';
	},
	
	eventtest9: function () {
		var controller = fm.getController('controller');
		controller.set('one', false);
		controller.afterEvent();
	},
	
	test10: function () {
		var controller = new fm.Controller();
		controller.set('one', true);
		controller.addActions({
			one: function () {
				return this.get('one');
			}
		});
		fm.addController('controller', controller);
		return 'controller';
	},

	test11: function () {
		var controller = new fm.Controller();
		controller.set('one', false);
		controller.addActions({
			one: function () {
				return this.get('one');
			}
		});
		fm.addController('controller', controller);
		return 'controller';
	},
	
	test12: function () {
		var controller = new fm.Controller();
		controller.set('one', true);
		controller.addActions({
			one: function () {
				return this.get('one');
			}
		});
		fm.addController('controller', controller);
		return 'controller';
	},
	
	eventtest12: function () {
		var controller = fm.getController('controller');
		controller.set('one', false);
		controller.afterEvent();
	},

	test13: function () {
		var controller = new fm.Controller();
		controller.set('one', false);
		controller.addActions({
			one: function () {
				return this.get('one');
			}
		});
		fm.addController('controller', controller);
		return 'controller';
	},
	
	eventtest13: function () {
		var controller = fm.getController('controller');
		controller.set('one', true);
		controller.afterEvent();
	},

	test14: function () {
		var controller = new fm.Controller();
		controller.set('one', true);
		controller.addActions({
			one: function () {
				return this.get('one');
			}
		});
		fm.addController('controller', controller);
		return 'controller';
	},

	test15: function () {
		var controller = new fm.Controller();
		controller.set('one', false);
		controller.addActions({
			one: function () {
				return this.get('one');
			}
		});
		fm.addController('controller', controller);
		return 'controller';
	},

	test16: function () {
		var controller = new fm.Controller();
		controller.set('one', true);
		controller.addActions({
			one: function () {
				return this.get('one');
			}
		});
		fm.addController('controller', controller);
		return 'controller';
	},
	
	eventtest16: function () {
		var controller = fm.getController('controller');
		controller.set('one', false);
		controller.afterEvent();
	},
	
	test17: function () {
		var controller = new fm.Controller();
		controller.set('one', false);
		controller.addActions({
			one: function () {
				return this.get('one');
			}
		});
		fm.addController('controller', controller);
		return 'controller';
	},
	
	eventtest17: function () {
		var controller = fm.getController('controller');
		controller.set('one', true);
		controller.afterEvent();
	},
	
	test18: function () {
		var controller = new fm.Controller();
		controller.set('one', true);
		controller.set('two', true);
		controller.addActions({
			one: function () {
				return this.get('one');
			},
			two: function () {
				return this.get('two');
			}
		});
		fm.addController('controller', controller);
		return 'controller';
	},

	test19: function () {
		var controller = new fm.Controller();
		controller.set('one', false);
		controller.set('two', true);
		controller.addActions({
			one: function () {
				return this.get('one');
			},
			two: function () {
				return this.get('two');
			}
		});
		fm.addController('controller', controller);
		return 'controller';
	},

	test20: function () {
		var controller = new fm.Controller();
		controller.set('one', false);
		controller.set('two', false);
		controller.addActions({
			one: function () {
				return this.get('one');
			},
			two: function () {
				return this.get('two');
			}
		});
		fm.addController('controller', controller);
		return 'controller';
	},

	test21: function () {
		var controller = new fm.Controller();
		controller.set('one', true);
		controller.set('two', true);
		controller.addActions({
			one: function () {
				return this.get('one');
			},
			two: function () {
				return this.get('two');
			}
		});
		fm.addController('controller', controller);
		return 'controller';
	},

	eventtest21: function () {
		var controller = fm.getController('controller');
		controller.set('one', false);
		controller.afterEvent();
	},
	
	test22: function () {
		var controller = new fm.Controller();
		controller.set('one', true);
		controller.set('two', true);
		controller.addActions({
			one: function () {
				return this.get('one');
			},
			two: function () {
				return this.get('two');
			}
		});
		fm.addController('controller', controller);
		return 'controller';
	},

	eventtest22: function () {
		var controller = fm.getController('controller');
		controller.set('one', false);
		controller.set('two', false);
		controller.afterEvent();
	},
	
	test23: function () {
		var controller = new fm.Controller();
		controller.set('one', false);
		controller.set('two', true);
		controller.addActions({
			one: function () {
				return this.get('one');
			},
			two: function () {
				return this.get('two');
			}
		});
		fm.addController('controller', controller);
		return 'controller';
	},

	eventtest23: function () {
		var controller = fm.getController('controller');
		controller.set('one', true);
		controller.afterEvent();
	},
	
	test24: function () {
		var controller = new fm.Controller();
		controller.set('one', false);
		controller.set('two', true);
		controller.addActions({
			one: function () {
				return this.get('one');
			},
			two: function () {
				return this.get('two');
			}
		});
		fm.addController('controller', controller);
		return 'controller';
	},

	eventtest24: function () {
		var controller = fm.getController('controller');
		controller.set('two', false);
		controller.afterEvent();
	},
	
	test25: function () {
		var controller = new fm.Controller();
		controller.set('one', true);
		controller.set('two', true);
		controller.addActions({
			one: function () {
				return this.get('one');
			},
			two: function () {
				return this.get('two');
			}
		});
		fm.addController('controller', controller);
		return 'controller';
	},
	
	test26: function () {
		var controller = new fm.Controller();
		controller.set('one', false);
		controller.set('two', true);
		controller.addActions({
			one: function () {
				return this.get('one');
			},
			two: function () {
				return this.get('two');
			}
		});
		fm.addController('controller', controller);
		return 'controller';
	},
	
	test27: function () {
		var controller = new fm.Controller();
		controller.set('one', false);
		controller.set('two', false);
		controller.addActions({
			one: function () {
				return this.get('one');
			},
			two: function () {
				return this.get('two');
			}
		});
		fm.addController('controller', controller);
		return 'controller';
	},
	
	test28: function () {
		var controller = new fm.Controller();
		controller.set('one', true);
		controller.set('two', true);
		controller.addActions({
			one: function () {
				return this.get('one');
			},
			two: function () {
				return this.get('two');
			}
		});
		fm.addController('controller', controller);
		return 'controller';
	},

	eventtest28: function () {
		var controller = fm.getController('controller');
		controller.set('one', false);
		controller.afterEvent();
	},
	
	test29: function () {
		var controller = new fm.Controller();
		controller.set('one', true);
		controller.set('two', true);
		controller.addActions({
			one: function () {
				return this.get('one');
			},
			two: function () {
				return this.get('two');
			}
		});
		fm.addController('controller', controller);
		return 'controller';
	},

	eventtest29: function () {
		var controller = fm.getController('controller');
		controller.set('one', false);
		controller.set('two', false);
		controller.afterEvent();
	},
	
	test30: function () {
		var controller = new fm.Controller();
		controller.set('one', false);
		controller.set('two', true);
		controller.addActions({
			one: function () {
				return this.get('one');
			},
			two: function () {
				return this.get('two');
			}
		});
		fm.addController('controller', controller);
		return 'controller';
	},

	eventtest30: function () {
		var controller = fm.getController('controller');
		controller.set('one', true);
		controller.afterEvent();
	},
	
	test31: function () {
		var controller = new fm.Controller();
		controller.set('one', false);
		controller.set('two', true);
		controller.addActions({
			one: function () {
				return this.get('one');
			},
			two: function () {
				return this.get('two');
			}
		});
		fm.addController('controller', controller);
		return 'controller';
	},

	eventtest31: function () {
		var controller = fm.getController('controller');
		controller.set('two', false);
		controller.afterEvent();
	},
	
	test32: function () {
		var controller = new fm.Controller();
		controller.set('one', false);
		controller.set('two', false);
		controller.addActions({
			one: function () {
				return this.get('one');
			},
			two: function () {
				return this.get('two');
			}
		});
		fm.addController('controller', controller);
		return 'controller';
	},

	eventtest32: function () {
		var controller = fm.getController('controller');
		controller.set('one', true);
		controller.afterEvent();
	},
	
	test33: function () {
		var controller = new fm.Controller();
		controller.set('one', false);
		controller.set('two', false);
		controller.addActions({
			one: function () {
				return this.get('one');
			},
			two: function () {
				return this.get('two');
			}
		});
		fm.addController('controller', controller);
		return 'controller';
	},

	eventtest33: function () {
		var controller = fm.getController('controller');
		controller.set('two', true);
		controller.afterEvent();
	},
	
	test34: function () {
		var controller = new fm.Controller();
		controller.set('one', true);
		controller.set('two', true);
		controller.set('three', true);
		controller.addActions({
			one: function () {
				return this.get('one');
			},
			two: function () {
				return this.get('two');
			},
			three: function () {
				return this.get('three');
			}
		});
		fm.addController('controller', controller);
		return 'controller';
	},
	
	test35: function () {
		var controller = new fm.Controller();
		controller.set('one', false);
		controller.set('two', true);
		controller.set('three', true);
		controller.addActions({
			one: function () {
				return this.get('one');
			},
			two: function () {
				return this.get('two');
			},
			three: function () {
				return this.get('three');
			}
		});
		fm.addController('controller', controller);
		return 'controller';
	},
	
	test36: function () {
		var controller = new fm.Controller();
		controller.set('one', false);
		controller.set('two', false);
		controller.set('three', true);
		controller.addActions({
			one: function () {
				return this.get('one');
			},
			two: function () {
				return this.get('two');
			},
			three: function () {
				return this.get('three');
			}
		});
		fm.addController('controller', controller);
		return 'controller';
	},
	
	test37: function () {
		var controller = new fm.Controller();
		controller.set('one', false);
		controller.set('two', false);
		controller.set('three', false);
		controller.addActions({
			one: function () {
				return this.get('one');
			},
			two: function () {
				return this.get('two');
			},
			three: function () {
				return this.get('three');
			}
		});
		fm.addController('controller', controller);
		return 'controller';
	},

	test38: function () {
		var controller = new fm.Controller();
		controller.set('one', true);
		controller.set('two', true);
		controller.set('three', true);
		controller.addActions({
			one: function () {
				return this.get('one');
			},
			two: function () {
				return this.get('two');
			},
			three: function () {
				return this.get('three');
			}
		});
		fm.addController('controller', controller);
		return 'controller';
	},
	
	eventtest38: function () {
		var controller = fm.getController('controller');
		controller.set('one', false);
		controller.afterEvent();
	},
	
	test39: function () {
		var controller = new fm.Controller();
		controller.set('one', true);
		controller.set('two', true);
		controller.set('three', true);
		controller.addActions({
			one: function () {
				return this.get('one');
			},
			two: function () {
				return this.get('two');
			},
			three: function () {
				return this.get('three');
			}
		});
		fm.addController('controller', controller);
		return 'controller';
	},
	
	eventtest39: function () {
		var controller = fm.getController('controller');
		controller.set('one', false);
		controller.set('two', false);
		controller.afterEvent();
	},
	
	test40: function () {
		var controller = new fm.Controller();
		controller.set('one', true);
		controller.set('two', true);
		controller.set('three', true);
		controller.addActions({
			one: function () {
				return this.get('one');
			},
			two: function () {
				return this.get('two');
			},
			three: function () {
				return this.get('three');
			}
		});
		fm.addController('controller', controller);
		return 'controller';
	},
	
	eventtest40: function () {
		var controller = fm.getController('controller');
		controller.set('one', false);
		controller.set('two', false);
		controller.set('three', false);
		controller.afterEvent();
	},
	
	test41: function () {
		var controller = new fm.Controller();
		controller.set('one', false);
		controller.set('two', true);
		controller.set('three', true);
		controller.addActions({
			one: function () {
				return this.get('one');
			},
			two: function () {
				return this.get('two');
			},
			three: function () {
				return this.get('three');
			}
		});
		fm.addController('controller', controller);
		return 'controller';
	},
	
	eventtest41: function () {
		var controller = fm.getController('controller');
		controller.set('one', true);
		controller.afterEvent();
	},
	
	test42: function () {
		var controller = new fm.Controller();
		controller.set('one', false);
		controller.set('two', true);
		controller.set('three', true);
		controller.addActions({
			one: function () {
				return this.get('one');
			},
			two: function () {
				return this.get('two');
			},
			three: function () {
				return this.get('three');
			}
		});
		fm.addController('controller', controller);
		return 'controller';
	},
	
	eventtest42: function () {
		var controller = fm.getController('controller');
		controller.set('two', false);
		controller.afterEvent();
	},
	
	test43: function () {
		var controller = new fm.Controller();
		controller.set('one', false);
		controller.set('two', true);
		controller.set('three', true);
		controller.addActions({
			one: function () {
				return this.get('one');
			},
			two: function () {
				return this.get('two');
			},
			three: function () {
				return this.get('three');
			}
		});
		fm.addController('controller', controller);
		return 'controller';
	},
	
	eventtest43: function () {
		var controller = fm.getController('controller');
		controller.set('two', false);
		controller.set('three', false);
		controller.afterEvent();
	},
	
	test44: function () {
		var controller = new fm.Controller();
		controller.set('one', false);
		controller.set('two', false);
		controller.set('three', false);
		controller.addActions({
			one: function () {
				return this.get('one');
			},
			two: function () {
				return this.get('two');
			},
			three: function () {
				return this.get('three');
			}
		});
		fm.addController('controller', controller);
		return 'controller';
	},
	
	eventtest44: function () {
		var controller = fm.getController('controller');
		controller.set('one', true);
		controller.afterEvent();
	},
	
	test45: function () {
		var controller = new fm.Controller();
		controller.set('one', false);
		controller.set('two', false);
		controller.set('three', false);
		controller.addActions({
			one: function () {
				return this.get('one');
			},
			two: function () {
				return this.get('two');
			},
			three: function () {
				return this.get('three');
			}
		});
		fm.addController('controller', controller);
		return 'controller';
	},
	
	eventtest45: function () {
		var controller = fm.getController('controller');
		controller.set('two', true);
		controller.afterEvent();
	},
	
	test46: function () {
		var controller = new fm.Controller();
		controller.set('one', false);
		controller.set('two', false);
		controller.set('three', false);
		controller.addActions({
			one: function () {
				return this.get('one');
			},
			two: function () {
				return this.get('two');
			},
			three: function () {
				return this.get('three');
			}
		});
		fm.addController('controller', controller);
		return 'controller';
	},
	
	eventtest46: function () {
		var controller = fm.getController('controller');
		controller.set('three', true);
		controller.afterEvent();
	},
	
	test47: function () {
		var controller = new fm.Controller();
		controller.set('one', true);
		controller.set('two', true);
		controller.set('three', true);
		controller.addActions({
			one: function () {
				return this.get('one');
			},
			two: function () {
				return this.get('two');
			},
			three: function () {
				return this.get('three');
			}
		});
		fm.addController('controller', controller);
		return 'controller';
	},
	
	test48: function () {
		var controller = new fm.Controller();
		controller.set('one', false);
		controller.set('two', true);
		controller.set('three', true);
		controller.addActions({
			one: function () {
				return this.get('one');
			},
			two: function () {
				return this.get('two');
			},
			three: function () {
				return this.get('three');
			}
		});
		fm.addController('controller', controller);
		return 'controller';
	},
	
	test49: function () {
		var controller = new fm.Controller();
		controller.set('one', false);
		controller.set('two', false);
		controller.set('three', true);
		controller.addActions({
			one: function () {
				return this.get('one');
			},
			two: function () {
				return this.get('two');
			},
			three: function () {
				return this.get('three');
			}
		});
		fm.addController('controller', controller);
		return 'controller';
	},
	
	test50: function () {
		var controller = new fm.Controller();
		controller.set('one', false);
		controller.set('two', false);
		controller.set('three', false);
		controller.addActions({
			one: function () {
				return this.get('one');
			},
			two: function () {
				return this.get('two');
			},
			three: function () {
				return this.get('three');
			}
		});
		fm.addController('controller', controller);
		return 'controller';
	},
	
	test51: function () {
		var controller = new fm.Controller();
		controller.set('one', true);
		controller.set('two', true);
		controller.set('three', true);
		controller.addActions({
			one: function () {
				return this.get('one');
			},
			two: function () {
				return this.get('two');
			},
			three: function () {
				return this.get('three');
			}
		});
		fm.addController('controller', controller);
		return 'controller';
	},
	
	eventtest51: function () {
		var controller = fm.getController('controller');
		controller.set('one', false);
		controller.afterEvent();
	},
	
	test52: function () {
		var controller = new fm.Controller();
		controller.set('one', true);
		controller.set('two', true);
		controller.set('three', true);
		controller.addActions({
			one: function () {
				return this.get('one');
			},
			two: function () {
				return this.get('two');
			},
			three: function () {
				return this.get('three');
			}
		});
		fm.addController('controller', controller);
		return 'controller';
	},
	
	eventtest52: function () {
		var controller = fm.getController('controller');
		controller.set('one', false);
		controller.set('two', false);
		controller.afterEvent();
	},
	
	test53: function () {
		var controller = new fm.Controller();
		controller.set('one', true);
		controller.set('two', true);
		controller.set('three', true);
		controller.addActions({
			one: function () {
				return this.get('one');
			},
			two: function () {
				return this.get('two');
			},
			three: function () {
				return this.get('three');
			}
		});
		fm.addController('controller', controller);
		return 'controller';
	},
	
	eventtest53: function () {
		var controller = fm.getController('controller');
		controller.set('one', false);
		controller.set('two', false);
		controller.set('three', false);
		controller.afterEvent();
	},
	
	test54: function () {
		var controller = new fm.Controller();
		controller.set('one', false);
		controller.set('two', true);
		controller.set('three', true);
		controller.addActions({
			one: function () {
				return this.get('one');
			},
			two: function () {
				return this.get('two');
			},
			three: function () {
				return this.get('three');
			}
		});
		fm.addController('controller', controller);
		return 'controller';
	},
	
	eventtest54: function () {
		var controller = fm.getController('controller');
		controller.set('one', true);
		controller.afterEvent();
	},
	
	test55: function () {
		var controller = new fm.Controller();
		controller.set('one', false);
		controller.set('two', true);
		controller.set('three', true);
		controller.addActions({
			one: function () {
				return this.get('one');
			},
			two: function () {
				return this.get('two');
			},
			three: function () {
				return this.get('three');
			}
		});
		fm.addController('controller', controller);
		return 'controller';
	},
	
	eventtest55: function () {
		var controller = fm.getController('controller');
		controller.set('two', false);
		controller.afterEvent();
	},
	
	test56: function () {
		var controller = new fm.Controller();
		controller.set('one', false);
		controller.set('two', true);
		controller.set('three', true);
		controller.addActions({
			one: function () {
				return this.get('one');
			},
			two: function () {
				return this.get('two');
			},
			three: function () {
				return this.get('three');
			}
		});
		fm.addController('controller', controller);
		return 'controller';
	},
	
	eventtest56: function () {
		var controller = fm.getController('controller');
		controller.set('two', false);
		controller.set('three', false);
		controller.afterEvent();
	},
	
	test57: function () {
		var controller = new fm.Controller();
		controller.set('one', false);
		controller.set('two', false);
		controller.set('three', false);
		controller.addActions({
			one: function () {
				return this.get('one');
			},
			two: function () {
				return this.get('two');
			},
			three: function () {
				return this.get('three');
			}
		});
		fm.addController('controller', controller);
		return 'controller';
	},
	
	eventtest57: function () {
		var controller = fm.getController('controller');
		controller.set('one', true);
		controller.afterEvent();
	},
	
	test58: function () {
		var controller = new fm.Controller();
		controller.set('one', false);
		controller.set('two', false);
		controller.set('three', false);
		controller.addActions({
			one: function () {
				return this.get('one');
			},
			two: function () {
				return this.get('two');
			},
			three: function () {
				return this.get('three');
			}
		});
		fm.addController('controller', controller);
		return 'controller';
	},
	
	eventtest58: function () {
		var controller = fm.getController('controller');
		controller.set('two', true);
		controller.afterEvent();
	},
	
	test59: function () {
		var controller = new fm.Controller();
		controller.set('one', false);
		controller.set('two', false);
		controller.set('three', false);
		controller.addActions({
			one: function () {
				return this.get('one');
			},
			two: function () {
				return this.get('two');
			},
			three: function () {
				return this.get('three');
			}
		});
		fm.addController('controller', controller);
		return 'controller';
	},
	
	eventtest59: function () {
		var controller = fm.getController('controller');
		controller.set('three', true);
		controller.afterEvent();
	},

	test60: function () {
		var controller = new fm.Controller();
		controller.set('one', ['one', 'two', 'three']);
		controller.addActions({
			one: function () {
				return this.get('one');
			}
		});
		fm.addController('controller', controller);
		return 'controller';
	},
	
	test61: function () {
		var controller = new fm.Controller();
		controller.set('one', ['one', 'two', 'three']);
		controller.addActions({
			one: function () {
				return this.get('one');
			}
		});
		fm.addController('controller', controller);
		return 'controller';
	},
	
	eventtest61: function () {
		var controller = fm.getController('controller');
		controller.append('one', 'four');
		controller.afterEvent();
	},



};

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

var nextElement = function (rootelm, elm) {
	if (elm.firstChild)
		return elm.firstChild;
	while (elm != rootelm) {
		if (elm.nextSibling)
			return elm.nextSibling;
		elm = elm.parentNode;
	}
	return null;
};

var compareElements = function (elm1, elm2) {
	if (elm1.nodeType != elm2.nodeType)
		return false;
	if (elm1.nodeType == 1) {
		if (elm1.nodeName !== elm2.nodeName)
			return false;
		if (elm1.attributes.length !== elm2.attributes.length)
			return false;
		for (var i = 0; i < elm1.attributes.length; i++) {
			var attribute1 = elm1.attributes.item(i);
			var attribute2 = elm2.attributes.getNamedItem(attribute1.name);
			if (!attribute2)
				return false;
			if (attribute1.value !== attribute2.value)
				return false;
		}
		
	} else if (elm1.nodeType == 3) {
		if (elm1.nodeValue !== elm2.nodeValue)
			return false;
	} else {
		// Other types not supported.
		return false;
	}
	return true;
};

var compareTrees = function (elm1, elm2) {
	var currelm1 = elm1.firstChild;
	var currelm2 = elm2.firstChild;
	while (currelm1 && currelm2) {
		if (!compareElements(currelm1, currelm2))
			return false;
		currelm1 = nextElement(elm1, currelm1);
		currelm2 = nextElement(elm2, currelm2);
	}
	if (currelm1 || currelm2)
		return false;
	return true;
};

var runTest = function (name) {
	fm.clear();
	initTestViews();
	var controller = testObj[name]();
	fm.initTemplate(name, controller);
	var eventname = 'event' + name;
	if (testObj[eventname])
		testObj[eventname]();
	var refname = 'ref' + name;
	var reftest = document.getElementById(refname);
	var refelm;
	if (reftest) {
		refelm = document.createElement('div');
		refelm.innerHTML = reftest.innerHTML;
	}
	return compareTrees(document.getElementsByTagName('body')[0], refelm);
};

onload = function () {
	var tests = [];
	var testResults = [];
	var testsPass = 0;
	for (var x in testObj) {
		if (x.indexOf('test') === 0)
			tests.push(x);
	}
	for (var i = 0; i < tests.length; i++) {
		var pass;
		try {
			pass = runTest(tests[i]);
		} catch (e) {
			pass = false;
		}
		testResults[i] = pass;
		if (pass)
			testsPass++;
	}
	fm.clear();
	var bodyelm = document.getElementsByTagName('body')[0];
	for (var i = 0; i < tests.length; i++) {
		var str = tests[i] + ': ' + (testResults[i] ? 'pass' : 'fail');
		var elm = document.createElement('div');
		elm.innerText = str;
		bodyelm.appendChild(elm);
	}
	var elm = document.createElement('div');
	elm.innerText = '-----------------------------';
	bodyelm.appendChild(elm);
	var elm = document.createElement('div');
	elm.innerText = 'Tests run: ' + tests.length;
	bodyelm.appendChild(elm);
	var elm = document.createElement('div');
	elm.innerText = 'Tests pass: ' + testsPass;
	bodyelm.appendChild(elm);
	var elm = document.createElement('div');
	elm.innerText = 'Tests fail: ' + (tests.length - testsPass);
	bodyelm.appendChild(elm);
};
