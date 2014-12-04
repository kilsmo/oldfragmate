function parseTemplateStep2(parseObjs) {

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
            }  else
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
}
