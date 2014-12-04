onload = function () {
	if (fm.beforeTemplate) {
		if (Array.isArray(fm.beforeTemplate))
			fm.beforeTemplate.forEach(function (func) {
				func();
			});
		else
			fm.beforeTemplate();
	}

	document.onmousedown = function (e) { return fm.onmousedown(e); };
	document.onmousemove = function (e) { return fm.onmousemove(e); };
	document.onmouseup = function (e) { return fm.onmouseup(e); };
	
	fm.initTemplate(fm.mainTemplate, fm.mainController);
	
	fm.afterOnload();
	
	if (fm.afterTemplate) {
		if (Array.isArray(fm.afterTemplate))
			fm.afterTemplate.forEach(function (func) {
				func();
			});
		else
			fm.afterTemplate();
	}
};

var fm = {
	mainTemplate: null,
	mainController: null,
	beforeTemplate: null,
	afterTemplate: null,
	
	clickData: null,

	templates: {},
	controllers: {},
	views: {},
	isIterating: false,
	iterateValue: null,
	onloadHandlers: [],
	afterEventHandlers: [],
	resizeHandlers: [],
	
	nextId: 1,

	init: function (params) {
		this.beforeTemplate = params.before;
		this.afterTemplate = params.after;
		this.mainController = params.controller;
		this.mainTemplate = params.template;
	},
	
	generateId: function () {
		var id = this.nextId.toString();
		this.nextId++;
		return id;
	},

	changeDragElm: function (elm) {
		var dragelm = document.getElementById('fm_dragelm');
		if (dragelm)
			dragelm.parentNode.removeChild(dragelm);
		if (elm) {
			var bodyelm = document.getElementsByTagName('body')[0];
			elm.setAttribute('id', 'fm_dragelm');
			bodyelm.appendChild(elm, bodyelm);
		}
	},
	
	findDropArea: function (elm) {
		while (elm != null) {
			if (elm.view) {
				var view = elm.view;
				if (view.dropTypes) {
					for (var i = 0; i < view.dropTypes.length; i++) {
						if (this.clickData.dragData[view.dropTypes[i]])
							return view;
					}
				}
			}
			elm = elm.parentNode;
		}
		return null;
	},
	
	getDragData: function () {
		if (!this.clickData)
			return;
		return this.clickData.dragData;
	},

	setDragData: function (dragData) {
		if (!this.clickData)
			return;
		this.clickData.dragData = dragData;
	},
	
	adjustTarget: function (target) {
		var elm = target;
		while (elm) {
			if (elm.view && elm.view == this.clickData.view)
				return elm.parentNode;
			elm = elm.parentNode;
		}
		return target;
	},
	
	updateDragElmPos: function (x, y) {
		var fm_dragelm = document.getElementById('fm_dragelm');
		if (fm_dragelm) {
			fm_dragelm.style.left = x + 'px';
			fm_dragelm.style.top = y + 'px';
		}
	},

	onmousedown: function (e) {
		if (e.button == 0) {
			var elm = e.target;
			while (elm) {
				console.log("view", elm.view != null);
				if (elm.view)
					console.log(elm.view.clickType);
				if (elm.view && elm.view.clickType)
					break;
				elm = elm.parentNode;
			}
			if (!elm)
				return;
			this.clickData = {
				clickType: elm.view.clickType,
				view: elm.view
			};
			if (this.clickData.clickType == "dragdrop") {
				this.clickData.startX = e.pageX;
				this.clickData.startY = e.pageY;
				this.clickData.dragging = false;
			} else if (this.clickData.clickType == "simple") {
				this.clickData.inside = true;
			} else {
				return;
			}
			if (this.clickData.view.onmousedown)
				this.clickData.view.onmousedown();
		}
	},
	
	onmousemove: function (e) {
		if (!this.clickData)
			return;
		if (this.clickData.clickType == "simple") {
			var elm = e.target;
			var inside = false;
			while (elm) {
				if (elm.view && elm.view == this.clickData.view) {
					inside = true;
					break;
				}
				elm = elm.parentNode;
			}
			if (inside && !this.clickData.inside && this.clickData.view.onmouseenter)
				this.clickData.view.onmouseenter();
			if (!inside && this.clickData.inside && this.clickData.view.onmouseleave)
				this.clickData.view.onmouseleave();
			this.clickData.inside = inside;
		} else if (this.clickData.clickType == "dragdrop") {
			var windowX = e.pageX;
			var windowY = e.pageY;
			if (this.clickData.dragging) {
				var dropArea = this.findDropArea(e.target);
				if (dropArea) {
					var boundingRect = dropArea.elm.getBoundingClientRect();
					var x = Math.abs(windowX - boundingRect.left);
					var y = Math.abs(windowY - boundingRect.top);
					if (this.clickData.currDropArea == null) {
						this.clickData.defaultDropArea.onnodropleave();
						this.clickData.currDropArea = dropArea;
						if (dropArea.ondragenter)
							dropArea.ondragenter(x, y, windowX, windowY);
					} else {
						if (dropArea == this.clickData.currDropArea) {
							if (dropArea.ondragmove)
								dropArea.ondragmove(x, y, windowX, windowY);
						} else {
							if (this.clickData.currDropArea.ondragleave)
								this.clickData.currDropArea.ondragleave();
							if (dropArea.ondragenter)
								dropArea.ondragenter(x, y, windowX, windowY);
							this.clickData.currDropArea = dropArea;
						}
					}
				} else {
					if (this.clickData.currDropArea == null) {
						if (this.clickData.defaultDropArea.onnodropmove)
							this.clickData.defaultDropArea.onnodropmove(windowX, windowY);
					} else {
						if (this.clickData.currDropArea.ondragleave)
							this.clickData.currDropArea.ondragleave();
						if (this.clickData.defaultDropArea.onnodropenter)
							this.clickData.defaultDropArea.onnodropenter(windowX, windowY);
						this.clickData.currDropArea = null;
					}
				}
				this.updateDragElmPos(windowX, windowY);
			} else {
				var xdiff = Math.abs(this.clickData.startX - windowX);
				var ydiff = Math.abs(this.clickData.startY - windowY);
				if (xdiff >= 2 || ydiff >= 2 || (xdiff >= 1 && ydiff >= 1)) {
					var adjustedTarget = this.adjustTarget(e.target);
					this.clickData.dragging = true;
					this.clickData.currX = e.pageX;
					this.clickData.currY = e.pageY;
					var viewParent = this.clickData.view.elm.parentNode;
					if (this.clickData.view.ondragstart)
						this.clickData.view.ondragstart(e.offsetX, e.offsetY);
					this.clickData.defaultDropArea = this.findDropArea(viewParent);
					this.clickData.currDropArea = this.findDropArea(adjustedTarget);
					if (this.clickData.currDropArea) {
						var boundingRect = this.clickData.currDropArea.elm.getBoundingClientRect();
						var x = Math.abs(windowX - boundingRect.left);
						var y = Math.abs(windowY - boundingRect.top);
						if (this.clickData.currDropArea.ondragenter)
							this.clickData.currDropArea.ondragenter(x, y, windowX, windowY);
					} else {
						if (this.clickData.startDropArea.onnodropenter)
							this.clickData.startDropArea.onnodropenter(windowX, windowY);
					}
					this.updateDragElmPos(windowX, windowY);
				}
			}
		} else {
			return;
		}
	},
	
	onmouseup: function (e) {
		if (!this.clickData)
			return;
		if (e.button == 0) {
			if (this.clickData.clickType == "simple") {
				var view = this.clickData.view;
				if (this.clickData.inside) {
					if (view.onmouseclick)
						view.onmouseclick();
				} else
					if (view.onmousecancel)
						view.onmousecancel();
				this.clickData = null;
			} else if (this.clickData.clickType == "dragdrop") {
				if (this.clickData.dragging) {
					var windowX = e.pageX;
					var windowY = e.pageY;
					var dropArea = this.findDropArea(e.target);
					if (dropArea) {
						var boundingRect = dropArea.elm.getBoundingClientRect();
						var x = Math.abs(windowX - boundingRect.left);
						var y = Math.abs(windowY - boundingRect.top);
						dropArea.ondrop(x, y, windowX, windowY); // Maybe skip windowX and windowY.
						if (this.clickData.currDropArea) {
							if (this.clickData.currDropArea.ondragleave)
								this.clickData.currDropArea.ondragleave();
						} else {
							if (this.clickData.defaultDropArea.onnodropleave)
								this.clickData.defaultDropArea.onnodropleave();
						}
						if (this.clickData.defaultDropArea.ondragend)
							this.clickData.defaultDropArea.ondragend();
					} else {
						if (this.clickData.currDropArea) {
							if (this.clickData.currDropArea.ondragleave)
								this.clickData.currDropArea.ondragleave();
						} else {
							if (this.clickData.defaultDropArea.onnodropleave)
								this.clickData.defaultDropArea.onnodropleave();
						}
						if (this.clickData.defaultDropArea.ondragcancel)
							this.clickData.defaultDropArea.ondragcancel();
					}
					this.changeDragElm(null);
				} else {
					if (this.clickData.view.onmouseclick)
						this.clickData.view.onmouseclick();
				}
				this.clickData = null;
			} else {
				return;
			}
		}
	},
	
	getController: function (name) {
		return this.controllers[name];
	},
	
	addController: function (name, obj) {
		this.controllers[name] = obj;
	},
	
	getView: function (name) {
		return this.views[name];
	},

	addView: function (name, constructor) {
		this.views[name] = constructor;
	},
	
	addOnloadHandler: function (view) {
		this.onloadHandlers.push(view);
	},
	
	addAfterEventHandler: function (view) {
		this.afterEventHandlers.push(view);
	},

	addResizeHandler: function (view) {
		this.resizeHandlers.push(view);
	},

	removeOnloadHandler: function (view) {
	},
	
	removeAfterEventHandler: function (view) {
	},

	removeResizeHandler: function (view) {
	},
	
	afterOnload: function () {
		for (var i = 0; i < this.onloadHandlers.length; i++)
			this.onloadHandlers[i].onload();
	},

	afterResize: function () {
		for (var i = 0; i < this.resizeHandlers.length; i++)
			this.resizeHandlers[i].onresize();
	},

	Controller: function () {
		this._actions = {};
		this._values = {};
		this._currAction = null;
		this._dirtyValues = {};
	},

	Array: function () {
		this.array = [];
	},
	
	parseTemplate: function (name) {
		var text = document.getElementById(name).innerText;
		var templateObj = this.parseTemplateStep1(text);
		return this.parseTemplateStep2(templateObj);
	},
	
	parseTemplateObject: function (obj) {
		if (obj.type == 'template')
			this.parseTemplateIterative(obj.name);
		else if (obj.type == 'fragment') {
			for (var x in obj.params) {
				var param = obj.params[x];
				if (param.type == 'template')
					this.parseTemplateIterative(param.name);
			}
		}
	},
	
	parseTemplateIterative: function (name) {
		if (this.templates[name])
			return;
		var template = this.templates[name] = this.parseTemplate(name);
		for (var i = 0; i < template.length; i++) {
			var command = template[i];
			this.parseTemplateObject(command.obj);
			if (command.command == 'if') {
				for (var j = 0; j < command.elsif.length; j++)
					this.parseTemplateObject(command.elsif[j].obj);

				if (command.else)
					this.parseTemplateObject(command.else);
			}
		}
	},
	
	parseTemplateStep1: function (template) {
		function ParseException() {
		}

		var commands = [
			{
				command: 'iterate'
			},
			{
				command: 'unless'
			},
			{
				command: 'if'
			},
			{
				command: 'elsif',
				ifStateBefore: true
			},
			{
				command: 'else',
				ifStateBefore: true,
				noString: true
			},
			{
				command: 'object',
				noCommand: true
			}
		];

		var ifStateAfter = function(command) {
			return command == 'if' || command == 'elsif';
		}

		var retVal = [];
		var inIfState = false;
		var inCommand = false;
		var objectStart = -1;
		var lines = template.split('\n');
		for (var i = 0; i < lines.length; i++) {
			var line = lines[i];
			if (inCommand) {
				if (objectStart == -1) {
					if (line.trim().length > 0) {
						if (line.indexOf('{') === 0 && line.trim().length == 1) {
							objectStart = i;
						} else {
							throw new ParseException(1);
						}
					}
				} else {
					if (line.indexOf('}') === 0) {
						if (line.trim().length == 1) {
                            var jsonStr = '';
							for (var j = objectStart; j <= i; j++)
								jsonStr += lines[j] + '\n';
                            var parsedObj = JSON.parse(jsonStr);
							objectStart = -1;
							inCommand = false;
							var command = retVal[retVal.length - 1];
							command.obj = parsedObj;
							inIfState = ifStateAfter(command.command);
						} else {
							throw new ParseException(2);
						}
					}
				}
			} else {
				if (line.trim().length > 0) {
					for (var j = 0; j < commands.length; j++) {
						var command = commands[j];
						var noCommand = command.noCommand;
						if (noCommand) {
							var foundRightChar = line.indexOf('{') === 0;
							if (line.indexOf('{') === 0 && line.trim().length == 1) {
								var cmd = {};
								cmd.command = command.command;
								retVal.push(cmd);
								inCommand = true;
								objectStart = i;
							} else {
								throw new ParseException(3);
							}
						} else {
							if ((inIfState || !command.ifStateBefore) && line.indexOf(command.command) === 0) {
								var name = null;
								if (command.noString) {
									if (line.substring(command.command.length).trim().length > 0) {
										throw new ParseException(5);
									}
								} else {
									name = line.substring(command.command.length).trim();
									var validName = /^[$A-Z_][0-9A-Z_$]*$/i;
									if (!validName.test(name)) {
										throw new ParseException(6);
									}
								}
								var cmd = {};
								cmd.command = command.command;
								if (name)
									cmd.name = name;
								retVal.push(cmd);
								inCommand = true;
								objectStart = -1;
								break;
							}
						}
					}
				}
			}
		}
		if (inCommand)
			throw new ParseException(7);

		return retVal;
	},
	
	parseTemplateStep2: function (parseObjs) {

		function ParseStep2Exception() {
		}

		function parseAView(name, type, view) {
			var retVal = {};
			retVal.type = 'view';
			if (view.$$controller) {
				var controller = view.$$controller;
				if (typeof controller != 'string' || controller.length == 0)
					throw new ParseStep2Exception(4);
				retVal.controller = controller;
			}
			if (view.$$span)
				throw new ParseStep2Exception(4);
			retVal.name = name;
			retVal.obj = {};
			for (var x in view) {
				if (x.indexOf('$$') == 0)
					; // Skip.
				else if (x.indexOf('$') == 0) {
					if (x.length == 1)
						throw new ParseStep2Exception(4);
					var val = {};
					val.type = 'fm_ref';
					val.val = view[x];
					retVal.obj[x.substring(1)] = val;
				} else if (x.indexOf('__') == 0) {
					var val = {};
					val.type = 'fm_iter';
					val.val = view[x];
					retVal.obj[x.substring(2)] = val;
				} else
					retVal.obj[x] = view[x];
			}
			return retVal;
		}

		function parseATemplate(name, type, template) {
			var retVal = {};
			retVal.type = type;
			if (template.$$controller) {
				var controller = template.$$controller;
				if (typeof controller != 'string' || controller.length == 0)
					throw new ParseStep2Exception(4);
				retVal.controller = controller;
			}
			if (template.$$klass)
				retVal.klass = template.$$klass;
			if (template.$$span)
				throw new ParseStep2Exception(4);
			retVal.name = name;
			retVal.obj = {};
			for (var x in template) {
				if (x.indexOf('$$') == 0)
					; // Skip.
				else if (x.indexOf('$') == 0) {
					if (x.length == 1)
						throw new ParseStep2Exception(4);
					var val = {};
					val.type = 'fm_ref';
					val.val = template[x];
					retVal.obj[x.substring(1)] = val;
				} else if (x.indexOf('__') == 0) {
					var val = {};
					val.type = 'fm_iter';
					val.val = view[x];
					retVal.obj[x.substring(2)] = val;
				} else
					retVal.obj[x] = template[x];
			}
			return retVal;
		}

		function parseAFragment(name, type, fragment) {
			var retVal = {};
			retVal.type = type;
			retVal.name = name;
			retVal.params = {};
			if (fragment.$$controller)
				throw new ParseStep2Exception(2);
			if (fragment.$$klass)
				retVal.klass = fragment.$$klass;
			var span = fragment.$$span;
			if (span) {
				if (typeof span != 'boolean')
					throw new ParseStep2Exception(2);
				retVal.span = span;
			}
			for (var x in fragment) {
				if (x.indexOf('$') == 0) {
					// Skip
				} else {
					var val;
					var param = fragment[x];
					var paramname = param.$$name;
					if (!paramname || typeof paramname != 'string' || paramname.length == 0)
						throw new ParseStep2Exception(2);
					var paramtype = param.$$type;
					if (paramtype == 'view')
						val = parseAView(paramname, paramtype, param);
					else if (paramtype == 'template')
						val = parseATemplate(paramname, paramtype, param);
					else {
						throw new ParseStep2Exception(2);
					}
					retVal.params[x] = val;
				}
			}
			return retVal;
		}

		function parseObj(obj) {
			var retVal;
			var name = obj.$$name;
			if (!name || typeof name != 'string' || name.length == 0)
				throw new ParseStep2Exception(3);
			var type = obj.$$type;
			
			if (type == 'view')
				retVal = parseAView(name, type, obj);
			else if (type == 'template')
				retVal = parseATemplate(name, type, obj);
			else if (type == 'fragment')
				retVal = parseAFragment(name, type, obj);
			else
				throw new ParseStep2Exception(3);
			return retVal;
		}

		var retVal = [];
		var inIfState = false;
		var val;
		for (var i = 0; i < parseObjs.length; i++) {
			if (inIfState && parseObjs[i].command == 'elsif') {
				var elsif = {};
				elsif.name = parseObjs[i].name;
				elsif.obj = parseObj(parseObjs[i].obj);
				val.elsif.push(elsif);
			} else if (inIfState && parseObjs[i].command == 'else') {
				val.else = parseObj(parseObjs[i].obj);
				inIfState = false;
			} else {
				if (inIfState) {
					retVal.push(val);
					inIfState = false;
				}
				val = {};
				val.command = parseObjs[i].command;

				if (val.command == 'if') {
					val.name = parseObjs[i].name;
					val.elsif = [];
					val.obj = parseObj(parseObjs[i].obj);
					inIfState = true;
				} else if (val.command == 'unless') {
					val.name = parseObjs[i].name;
					val.obj = parseObj(parseObjs[i].obj);
				} else if (val.command == 'iterate') {
					val.name = parseObjs[i].name;
					val.obj = parseObj(parseObjs[i].obj);
				} else if (val.command == 'object') {
					val.obj = parseObj(parseObjs[i].obj);
				}
			}
			if (!inIfState)
				retVal.push(val);
		}

		if (inIfState)
			retVal.push(val);

		return retVal;
	},
	
	createDOMElementWithClass: function (type, klass) {
        var elm = document.createElement(type);
        elm.setAttribute('class', klass);
        return elm;
    },

    createElement: function (controller, parent, command, idx) {
        var element = null;

        if (command.type == 'template')
            element = this.createTemplate(command, controller);
        else if (command.type == 'fragment')
            element = this.createFragment(command, controller);
        else if (command.type == 'view')
            element = this.createView(command, controller);

        if (idx !== undefined)
            fm.insertChild(parent, element.elm, idx);
        else
            parent.appendChild(element.elm);

        return element;
    },

    createTemplate: function (command, controller) {
        if (command.controller)
            controller = fm.getController(command.controller);
        var name = command.name;
        var params = this.copyObject(command.obj);
        var template = new fm.Template(name, controller, command.klass, params);
        return template;
    },

    createFragment: function (command, controller) {
        var name = command.name;
		var params = this.copyObject(command.params);
		var klass = command.klass;
        var fragment = new fm.Fragment(name, controller, klass, params);
        return fragment;
    },

    createView: function (command, controller) {
        if (command.controller)
            controller = fm.getController(command.controller);
        var name = command.name;
        var constructor = fm.getView(name);
        var params = this.copyObject(command.obj);
        var view = new constructor(controller, params);
        return view;
    },

	createInternalView: function (controller, name, params) {
        var constructor = this.getView(name);
        var view = new constructor(controller, params);
        return view;
	},

	copyObject: function (obj) {
		if (!this.isIterating)
			return obj;

		var copy = {};
		for (var x in obj) {
			if (obj[x].type === 'fm_iter') {
				if (obj[x].val === '')
					copy[x] = this.iterateValue;
				else
					copy[x] = this.iterateValue[obj[x].val];
			} else {
				copy[x] = obj[x];
			}
		}
		return copy;
	},

	insertChild: function (parent, elm, idx) {
        var beforeItem = parent.childNodes.item(idx);
        if (beforeItem)
            parent.insertBefore(elm, beforeItem);
        else
            parent.appendChild(elm);
    },
	
	childIndex: function (elm) {
		var parent = elm.parentNode;
		var childNodes = parent.childNodes;
		for (var i = 0; i < childNodes.length; i++) {
			if (childNodes.item(i) === elm)
				return i;
		}
		return -1;
	},
	
	removeChild: function (parent, idx) {
		var child = parent.childNodes.item(idx);
		parent.removeChild(child);
	},
	
	Template: function (name, controller, klass, params) {
		this.name = name;
		this.controller = controller;
		// TODO: params.
		var parsedTemplate = fm.templates[name];
		if (klass)
			this.elm = fm.createDOMElementWithClass('div', 'fm_template ' + klass);
		else
			this.elm = fm.createDOMElementWithClass('div', 'fm_template');
		this.elements = [];
		this.idxs = [];
		this.subidxs = [];
		this.counts = [];
		this.subscribers = {};
		this.subscriberValues = {};
		var currentIdx = 0;
		for (var i = 0; i < parsedTemplate.length; i++) {
			var command = parsedTemplate[i];
			this.elements.push([]);
			if (command.command == 'object') {
				this.elements[i].push(fm.createElement(this.controller, this.elm, command.obj));
				this.idxs[i] = currentIdx;
				this.counts[i] = 1;
				currentIdx++;
			} else if (command.command == 'unless') {
				var value = this.subscribe(command.name, i, 0);
				if (typeof value != 'boolean')
					; // TODO: Throw an exception.
				this.idxs[i] = currentIdx;
				if (!value) {
					this.elements[i].push(fm.createElement(this.controller, this.elm, command.obj));
					this.counts[i] = 1;
					currentIdx++;
				} else {
					this.counts[i] = 0;
				}
			} else if (command.command == 'iterate') {
				fm.isIterating = true;
				var value = this.subscribe(command.name, i, 0);
				if (Array.isArray(value))
					; // TODO: Throw an exception.
				for (var j = 0; j < value.length; j++) {
					fm.iterateValue = value[j];
					this.elements[i].push(fm.createElement(this.controller, this.elm, command.obj));
				}
				this.idxs[i] = currentIdx;
				this.counts[i] = value.length;
				currentIdx += value.length;
				fm.iterateValue = null;
				fm.isIterating = false;
			} else if (command.command == 'if') {
				var values = [];
				values[0] = this.subscribe(command.name, i, 0);
				for (var j = 0; j < command.elsif.length; j++)
					values[j + 1] = this.subscribe(command.elsif[j].name, i, j + 1);
				var found = -1;
				for (var j = 0; j < values.length; j++) {
					if (typeof values[j] != 'boolean')
						; // Todo, throw an exception.
					if (values[j]) {
						found = j;
						break;
					}
				}
				var count = 1;
				if (found == -1) {
					if (command.else)
						this.elements[i].push(fm.createElement(this.controller, this.elm, command.else));
					else
						count = 0;
				} else if (found == 0)
					this.elements[i].push(fm.createElement(this.controller, this.elm, command.obj));
				else
					this.elements[i].push(fm.createElement(this.controller, this.elm, command.elsif[found - 1].obj));
				this.subidxs[i] = found == -1 ? command.elsif.length + 1 : found;
				this.idxs[i] = currentIdx;
				this.counts[i] = count;
				currentIdx += count;
			}
		}
	},
	
	Fragment: function (name, controller, klass, params) {
		var elm = document.getElementById(name);
		if (klass)
			this.elm = fm.createDOMElementWithClass('div', 'fm_fragment ' + klass);
		else
			this.elm = fm.createDOMElementWithClass('div', 'fm_fragment');
		this.elm.innerHTML = elm.innerHTML;
		this.elements = {};
		var specialElms = [];
		this.parseTree(specialElms);
		for (var i = 0; i < specialElms.length; i++) {
			var specialElm = specialElms[i];
			var idx = fm.childIndex(specialElm.elm);
			var parent = specialElm.elm.parentNode;
			fm.removeChild(parent, idx);
			for (var j = 0; j < specialElm.fragments.length; j++) {
				var frag = specialElm.fragments[j];
				var child;
				if (frag.isRef) {
					var param = params[frag.text];
					if (param) {
						var paramelm = fm.createElement(controller, this.elm, param);
						this.elements[frag.text] = paramelm;
						child = paramelm.elm;
					}
				} else {
					child = document.createTextNode(frag.text);
				}
				fm.insertChild(parent, child, idx + j);
			}
		}
	},
	
	initTemplate: function (name, controller) {
		fm.parseTemplateIterative(name);
		fm.mainController = controller;
		fm.mainTemplate = name;
		fm.mainElm = new fm.Template(name, fm.getController(controller), undefined, {});
		var parent = document.getElementsByTagName('body')[0];
		parent.appendChild(fm.mainElm.elm);
	},
	
	clear: function () {
		var parent = document.getElementsByTagName('body')[0];
		parent.innerHTML = '';
		fm.mainController = null;
		fm.mainTemplate = null;
		fm.mainElm = null;
		fm.templates = {};
		fm.controllers = {};
		fm.views = {};
		fm.isIterating = false,
		fm.iterateValue = null
	}

};

fm.Controller.prototype = {
    _getCachedValue: function (name) {
        this._currAction = name;
        var ret = this._actions[name].action.call(this);
        this._currAction = null;
        return ret;
    },

	ready: function () {
		this._dirtyValues = {};
	},
	
	afterEvent: function () {
        var dirtyActions = {};
        for (var x in this._dirtyValues) {
            for (var y in this._values[x].listeners)
                dirtyActions[y] = true;
        }
        for (var x in dirtyActions) {
			var cachedValue;
			var changelog;
			if ((typeof this._actions[x].action) === 'function') {
				cachedValue = this._getCachedValue(x);
				this._actions[x].cachedValue = cachedValue;
			} else {
				cachedValue = this.get(this._actions[x].action);
				if (Array.isArray(this._dirtyValues[this._actions[x].action]))
					changelog = this._dirtyValues[this._actions[x].action];
			}
			var subscribers = this._actions[x].subscribers;
			for (var i = 0; i < subscribers.length; i++)
				this._actions[x].subscribers[i].valueChanged(x, cachedValue, changelog);
        }
        this._dirtyValues = {};
		for (var i = 0; i < fm.afterEventHandlers.length; i++)
			fm.afterEventHandlers[i].onafterevent();
    },
	
	addActions: function (actions) {
        for (var x in actions) {
            this._actions[x] = {
                action: actions[x],
                subscribers: [],
                cachedValue: undefined
            };
        }
    },

    action: function (name) {
        var act = this._actions[name];
        if (act && act.action) {
			var params = [];
			for (var i = 1; i < arguments.length; i++)
				params.push(arguments[i]);
            return act.action.apply(this, params);
		}
		return null;
    },
	
	subscribe: function (name, listener) {
        var act = this._actions[name];
        if (!act)
            return;
		this._actions[name].subscribers.push(listener);
		if ((typeof this._actions[name].action) === 'function') {
			if (typeof this._actions[name].cachedValue !== 'undefined') {
				return this._actions[name].cachedValue;
			}
			var cachedValue = this._getCachedValue(name);
			this._actions[name].cachedValue = cachedValue;
			return cachedValue;
		} else {
			this._currAction = name;
			var ret = this.get(this._actions[name].action);
			this._currAction = null;
			return ret;
		}
    },

	unsubscribe: function (name, listener) {
		// TODO, should remove the listener.
    },
	
	get: function (name) {
		if (!this._values[name])
            return;
        if (this._currAction)
            this._values[name].listeners[this._currAction] = true;
        return this._values[name].value;
    },
	
	set: function (name, value) {
	    if (!this._values[name]) {
            this._values[name] = { value: value, listeners: {} };
        } else {
            var oldValue = this._values[name].value;
            if (value !== oldValue) {
                this._dirtyValues[name] = true;
                this._values[name].value = value;
            }
        }
    },

	setKeyValue: function (name, key, value) {
        var valueObj = this._values[name];
        if (!valueObj)
            return;
		if ((typeof valueObj.value) !== 'object')
            return;
		if (Array.isArray(valueObj.value))
			return;
		var object = valueObj.value;
		object[key] = value;
        this._dirtyValues[name] = true;
	},

	clear: function (name) {
        var valueObj = this._values[name];
        if (!valueObj)
            return;
        if ((typeof valueObj.value) !== 'object')
            return;
        if (Array.isArray(valueObj.value))
            valueObj.value = [];
        else
            valueObj.value = {};
        this._dirtyValues[name] = true;
    },
	
	append: function (name) {
        var valueObj = this._values[name];
        if (!valueObj)
            return;
        var array = valueObj.value;
        if (!Array.isArray(array))
            return;
		var values = [];
		for (var i = 1; i < arguments.length; i++)
			array.push(arguments[i]);
		if (!Array.isArray(this._dirtyValues[name]))
			this._dirtyValues[name] = [];
		this._dirtyValues[name].push({ command: 'append', count: arguments.length - 1 });
    },
	
	prepend: function (name) {
        var valueObj = this._values[name];
        if (!valueObj)
            return;
        var array = valueObj.value;
        if (!Array.isArray(array))
            return;
		var values = [];
		for (var i = arguments.length - 1; i >= 1; i--)
		    array.unshift(arguments[i]);
		if (!Array.isArray(this._dirtyValues[name]))
			this._dirtyValues[name] = [];
		this._dirtyValues[name].push({ command: 'prepend', count: arguments.length - 1 });
    },
	
	remove: function (name, index, len) {
		if (!len)
			len = 1;
        var valueObj = this._values[name];
        if (!valueObj)
            return;
        var array = valueObj.value;
        if (!Array.isArray(array))
            return;
        valueObj.value = valueObj.value.filter(function (element, idx, array) {
            return idx < index || idx >= index + len;
        });
		if (!Array.isArray(this._dirtyValues[name]))
			this._dirtyValues[name] = [];
		this._dirtyValues[name].push({ command: 'remove', count: len, idx: index });
    },
	
	removeById: function (name, id) {
        var valueObj = this._values[name];
		if (!valueObj)
			return;
		var array = valueObj.value;
        if (!Array.isArray(array))
            return;

		var index = -1;
		valueObj.value = valueObj.value.filter(function (element, idx, array) {
			if (element.id == id) {
				index = idx;
				return false;
			}
            return true;
        });
		if (!Array.isArray(this._dirtyValues[name]))
			this._dirtyValues[name] = [];
		this._dirtyValues[name].push({ command: 'removeById', count: 1, idx: index, id: id });
	},

	insert: function (name, index, value) {
		var valueObj = this._values[name];
        if (!valueObj)
            return;
        var array = valueObj.value;
        if (!Array.isArray(array))
            return;
		if (index > array.length)
			return;
		for (var i = array.length - 1; i >= index; i--)
			array[i + 1] = array[i];
		array[index] = value;
		if (!Array.isArray(this._dirtyValues[name]))
			this._dirtyValues[name] = [];
		this._dirtyValues[name].push({ command: 'insert', count: 1, idx: index });
    }

};

fm.Fragment.prototype = {

    valueChanged: function (name, value) {
    },

    cleanup: function () {
        for (var x in this.elements)
            this.elements[x].cleanup();
    },
	
	parseTree: function (specialElms) {
		var rootelm = this.elm;
		var elm = rootelm.firstChild;
		if (elm) {
			while (elm != rootelm) {
				if (elm.firstChild)
					elm = elm.firstChild;
				else {
					if (elm.nodeType == 3)
						this.parseTextNode(elm, specialElms);
					while (elm != rootelm) {
						if (elm.nextSibling) {
							elm = elm.nextSibling;
							break;
						}
						elm = elm.parentNode;
					}
				}
			}
		}
    },
	
	parseTextNode: function (elm, specialElms) {
		var text = elm.nodeValue;
		var fragments = [];
		var pos = 0;
		var idxStart;
		while ((idxStart = text.indexOf('{{', pos)) >= 0) {
			var idxEnd = text.indexOf('}}', pos);
			if (idxEnd == -1)
				break;
			var str = text.substring(idxStart + 2, idxEnd);
			if (pos < idxStart) {
				fragments.push({
					isRef: false,
					text: text.substr(pos, idxStart)
				});
			}
			fragments.push({
				isRef: true,
				text: str
			});
			pos = idxEnd + 2;
		}
		if (fragments.length > 0) {
			if (pos < text.length) {
				fragments.push({
					isRef: false,
					text: text.substr(pos)
				});
			}
			specialElms.push({ elm: elm, fragments: fragments });
		}
	}
};

fm.Template.prototype = {

    valueChanged: function (name, value) {
        var listeners = this.subscribers[name];
		if (!listeners)
			return;
		
		if (typeof value === 'boolean' && value === this.subscriberValues[name])
			return;
		
		this.subscriberValues[name] = value;

        var parsedTemplate = fm.templates[this.name];

        for (var i = 0; i < listeners.length; i++) {
            var idx = listeners[i].idx;
            var internalidx = listeners[i].internalidx;
            if (parsedTemplate[idx].command == 'unless') {
                if (internalidx != 0)
                    ; // TODO: throw an exception.
                if (typeof value != 'boolean')
                    ; // TODO: throw an exception.
                if (value) {
					fm.removeChild(this.elm, this.idxs[idx]);
                    this.elements[idx][internalidx].cleanup();
                    for (var j = idx; j < this.idxs.length; j++)
                        this.idxs[j] -= 1;
                    this.counts[idx] = 0;
                    this.elements[idx] = [];
                } else {
                    for (var j = idx; j < this.idxs.length; j++)
                        this.idxs[j] += 1;
                    this.counts[idx] = 1;
                    this.elements[idx][0] = fm.createElement(this.controller, this.elm, parsedTemplate[idx].obj, this.idxs[idx]);
                }
            } else if (parsedTemplate[idx].command == 'iterate') {
                if (internalidx != 0)
                    ; // TODO: throw an exception.
                if (!Array.isArray(value))
                    ; // TODO: throw an exception.
				var newCount = value.length;
                var oldCount = this.counts[idx];

                for (var j = 0; j < oldCount; j++) {
					fm.removeChild(this.elm, this.idxs[idx]);
                    this.elements[idx][j].cleanup();
                }
                this.elements[idx] = [];
				fm.isIterating = true;
                for (var j = 0; j < newCount; j++) {
					fm.iterateValue = value[j];
                    this.elements[idx][j] = fm.createElement(this.controller, this.elm, parsedTemplate[idx].obj, this.idxs[idx] + j);
				}
				fm.iterateValue = null;
				fm.isIterating = false;
				this.counts[idx] = newCount;
                var diff = newCount - oldCount;
                for (var j = idx + 1; j < this.idxs.length; j++)
                    this.idxs[j] += diff;
            } else if (parsedTemplate[idx].command == 'if') {
                if (internalidx > parsedTemplate[idx].elsif.length)
                    ; // TODO: throw an exception.
                if (typeof value != 'boolean')
                    ; // TODO: throw an exception.
                if (value) {
					if (internalidx < this.subidxs[idx]) {
						if (this.counts[idx] > 0) {
							fm.removeChild(this.elm, this.idxs[idx]);
							this.elements[idx][0].cleanup();
						} else {
							for (var j = idx + 1; j < this.idxs.length; j++)
								this.idxs[j] += 1;
							this.counts[idx] = 1;
						}
						this.subidxs[idx] = internalidx;
						var obj = internalidx == 0 ? parsedTemplate[idx].obj : parsedTemplate[idx].elsif[internalidx - 1].obj;
						this.elements[idx][0] = fm.createElement(this.controller, this.elm, obj, this.idxs[idx]);
					}
                } else {
					if (this.subidxs[idx] === internalidx) {
						fm.removeChild(this.elm, this.idxs[idx]);
						this.elements[idx][0].cleanup();
						var found = -1;
						for (var j = internalidx; j < parsedTemplate[idx].elsif.length; j++) {
							if (this.subscriberValues[parsedTemplate[idx].elsif[j].name]) {
								found = j;
								break;
							}
						}
						this.subidxs[idx] = found == -1 ? parsedTemplate[idx].elsif.length + 1 : found + 1;
						if (found == -1 && !parsedTemplate[idx].else) {
							this.elements[idx] = [];
							this.counts[idx] = 0;
							for (var j = idx + 1; j < this.idxs.length; j++)
								this.idxs[j] -= 1;
						} else {
							var obj = found == -1 ? parsedTemplate[idx].else : parsedTemplate[idx].elsif[found].obj;
							this.elements[idx][0] = fm.createElement(this.controller, this.elm, obj, this.idxs[idx]);
						}
					}
                }
            }
        }
    },

    cleanup: function () {
        for (var x in this.subscribers)
            this.controller.unsubscribe(x);
        for (var i = 0; i < this.elements.length; i++) {
            var element = this.elements[i];
            for (var j = 0; j < element.length; j++)
                element[j].cleanup();
        }
    },

    subscribe: function (name, idx, internalidx) {
        if (this.subscribers[name]) {
            this.subscribers[name].push({ idx: idx, internalidx: internalidx });
        } else {
            this.subscribers[name] = [{ idx: idx, internalidx: internalidx }];
            this.subscriberValues[name] = this.controller.subscribe(name, this);
        }
        return this.subscriberValues[name];
    }

};

