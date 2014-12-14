function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "index";
    if (arguments[0]) {
        {
            __processArg(arguments[0], "__parentSymbol");
        }
        {
            __processArg(arguments[0], "$model");
        }
        {
            __processArg(arguments[0], "__itemTemplate");
        }
    }
    var $ = this;
    var exports = {};
    $.__views.index = Ti.UI.createWindow({
        top: Alloy.Globals.winTop,
        backgroundColor: "#fff",
        fullscreen: false,
        exitOnClose: true,
        id: "index"
    });
    $.__views.index && $.addTopLevelView($.__views.index);
    $.__views.addAddress = Alloy.createController("addAddress", {
        id: "addAddress",
        __parentSymbol: $.__views.index
    });
    $.__views.addAddress.setParent($.__views.index);
    $.__views.map = Alloy.createController("map", {
        id: "map",
        __parentSymbol: $.__views.index
    });
    $.__views.map.setParent($.__views.index);
    exports.destroy = function() {};
    _.extend($, $.__views);
    $.addAddress.on("addAnnotation", function(e) {
        $.map.addAnnotation(e.geodata);
    });
    $.index.open();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;