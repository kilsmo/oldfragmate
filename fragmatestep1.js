function parseTemplateStep1(template) {
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
}
