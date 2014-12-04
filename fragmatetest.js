function outputObject(val) {
    var str = '';

    if (Array.isArray(val)) {
        str += '[\n';
        for (var i = 0; i < val.length; i++) {
            str += outputObject(val[i]);
            if (i + 1 < val.length)
                str += ',';
            str += '\n';
        }
        str += ']\n';
    } else if (typeof val == 'object') {
        str += '{\n';
        var elms = [];
        for (var x in val)
            elms.push(x);
        elms.sort(function (a, b) {
            return a <= b;
        });
        for (var i = 0; i < elms.length; i++) {
            str += elms[i] + ': ';
            str += outputObject(val[elms[i]]);
            if (i + 1 < elms.length)
                str += ',';
            str += '\n';
        }
        str += '}\n';
    } else {
        str += val;
    }

    return str;
}

function compare(val1, val2) {
    function CompareException() {
        this.value = 3;
    }

    function compareObjectDeep(val1, val2) {
        var elms1 = [];
        for (var x in val1)
            elms1.push(x);

        var elms2 = [];
        for (var x in val2)
            elms2.push(x);

        if (elms1.length != elms2.length)
            throw new CompareException();

        elms1.sort(function (a, b) {
            return a <= b;
        });

        elms2.sort(function (a, b) {
            return a <= b;
        });

        for (var i = 0; i < elms1.length; i++) {
            if (elms1[i] != elms2[i])
                throw new CompareException();

            compareDeep(val1[elms1[i]], val2[elms2[i]]);
        }
    }

    function compareArrayDeep(val1, val2) {
        if (val1.length != val2.length)
            throw new CompareException();

        for (var i = 0; i < val1.length; i++)
            compareDeep(val1[i], val2[i]);
    }

    function isArray(obj) {
        return Array.isArray(obj);
    }

    function compareDeep(val1, val2) {
        if (typeof val1 != typeof val2)
            throw new CompareException();


        if (typeof val1 == 'object') {
            if (isArray(val1) && isArray(val2))
                compareArrayDeep(val1, val2);
            else if (!isArray(val1) && !isArray(val2))
                compareObjectDeep(val1, val2);
            else
                throw new CompareException();
        } else {
            if (val1 != val2)
                throw new CompareException();
        }

    }

    var res = true;
    try {
        compareDeep(val1, val2);
    } catch (e) {
        res = false;
    }
    return res;
}

function findAllTests() {
    var elms = document.getElementsByTagName('script');
    var tests = [];
    for (var i = 0; i < elms.length; i++) {
        if (elms[i].id.indexOf('test') == 0)
            tests.push(elms[i]);
    }
    return tests;
}

function runAllTests(parseFn) {
    var results = [];
    var tests = findAllTests();
    for (var i = 0; i < tests.length; i++) {
        var test = tests[i];
        var testName = test.id;
        var reftestName = 'reftest' + testName.substring(4);
        var reftest = document.getElementById(reftestName);
        var failed = false;
        if (!reftest) {
            try {
                var res = parseFn(test.innerText);
                failed = true;
            } catch (e) {
            }
        } else {
            var testObj;
            try {
                testObj = parseFn(test.innerText);
                // alert(outputObject(testObj));
            } catch (e) {
                failed = true;
                console.log('=============================================');
                console.log('Test ' + testName + ' failed while parsing:');
                console.log(outputObject(testObj));
            }
            if (!failed) {
                try {
                    var refTestObj = JSON.parse(reftest.innerText);
                    var res = compare(testObj, refTestObj);
                    // alert(outputObject(reftestObj));
                    failed = !res;
                } catch (e) {
                    failed = true;
                    console.log('=============================================');
                    console.log('Test ' + testName + ' failed while comparing:');
                    console.log(testObj);
                    console.log('with reference object:')
                    console.log(refTestObj);
                }
            }
        }
        results.push({ name: testName, pass: !failed });
    }
    return results;
}

function outputTestResults(results) {

    function appendElement(bodyelm, str) {
        var elm = document.createElement('div');
        elm.innerHTML = str;
        bodyelm.appendChild(elm);
    }

    var numTests = results.length;
    var numFails = 0;
    for (var i = 0; i < numTests; i++) {
        if (!results[i].pass)
            numFails++;
    }
    var bodyelm = document.getElementsByTagName('body')[0];
    for (var i = 0; i < numTests; i++) {
        var str = results[i].name + ': ' + (results[i].pass ? 'pass' : 'fail');
        appendElement(bodyelm, str);
    }
    var str = '-----------------------------';
    appendElement(bodyelm, str);
    str = 'Number of tests run: ' + numTests;
    appendElement(bodyelm, str);
    str = 'Number of tests pass: ' + (numTests - numFails);
    appendElement(bodyelm, str);
    str = 'Number of tests failed: ' + numFails;
    appendElement(bodyelm, str);
}

onload = function () {
    function parseFnStep1(text) {
        return fm.parseTemplateStep1(text);
    }

    function parseFnStep2(text) {
        var templateObj = fm.parseTemplateStep1(text);
        return fm.parseTemplateStep2(templateObj);
    }

    var bodyelm = document.getElementsByTagName('body')[0];
    var parseFn;
    if (bodyelm.id == 'step1')
        parseFn = parseFnStep1;
    else if (bodyelm.id == 'step2')
        parseFn = parseFnStep2;

    outputTestResults(runAllTests(parseFn));
};
