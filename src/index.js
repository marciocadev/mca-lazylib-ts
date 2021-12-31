"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
// #!/usr/bin/env node
var fs = require("fs");
var projen_1 = require("projen");
var yargs = require("yargs");
var project = new projen_1.Project({
    name: 'mca-lazylib'
});
function createSchema(name, partitionKey, props) {
    var basename = name.toLowerCase();
    var model = ts("./" + basename + "/model.ts");
    model.open("export interface " + name + " {");
    model.line('/**');
    model.line("* **_" + partitionKey.key + "_** field is the **partition key**");
    model.line('*');
    model.line('* @attribute');
    model.line('*/');
    model.line("readonly " + partitionKey.key + ": string; // key");
    if (props && props.sortKey) {
        model.line('/**');
        model.line("* **_" + props.sortKey.key + "_** field is the **sort key**");
        model.line('*');
        model.line('* @attribute');
        model.line('*/');
        model.line("readonly " + props.sortKey.key + ": " + props.sortKey.type + "; // sort key");
    }
    if (props && props.fields) {
        for (var _i = 0, _a = props.fields; _i < _a.length; _i++) {
            var field = _a[_i];
            model.line('/**');
            model.line('*');
            model.line('* @attribute');
            model.line('*/');
            model.line("readonly " + field.key + "?: " + field.type + ";");
        }
    }
    ;
    model.close('};');
}
function ts(path) {
    var src = new projen_1.SourceCode(project, path);
    src.line("// " + projen_1.FileBase.PROJEN_MARKER);
    return src;
}
function entity(name, partitionKey, props) {
    // Create Schema
    createSchema(name, partitionKey, props);
    // Create Table Construct
    // createTableConstruct(name, partitionKey, props);
    // Create client
    // createClient(name, partitionKey, props);
}
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var ya, args;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    ya = yargs;
                    ya.recommendCommands();
                    ya.strictCommands();
                    ya.showHelpOnFail(false);
                    ya.wrap(yargs.terminalWidth());
                    ya.option('n', { type: 'string', "default": true, desc: 'Name of the model' });
                    ya.completion();
                    ya.help();
                    ya.version(false);
                    ya.option('version', { type: 'boolean', description: 'Show version number', global: false });
                    return [4 /*yield*/, ya.argv];
                case 1:
                    args = _a.sent();
                    entity(args.n, { key: 'username', type: 'string' });
                    project.synth();
                    fs.unlinkSync('.gitignore');
                    fs.rmdirSync('.projen', { recursive: true });
                    return [2 /*return*/];
            }
        });
    });
}
// async function main() {
//   console.log('oiiiiiiiiii');
// }
main()["catch"](function (e) {
    console.error(e.stack);
    process.exit(1);
});
