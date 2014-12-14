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
    this.__controllerPath = "map";
    if (arguments[0]) {
        var __parentSymbol = __processArg(arguments[0], "__parentSymbol");
        {
            __processArg(arguments[0], "$model");
        }
        {
            __processArg(arguments[0], "__itemTemplate");
        }
    }
    var $ = this;
    var exports = {};
    var __alloyId0 = [];
    $.__views.__alloyId1 = Alloy.createController("annotation", {
        title: "Appcelerator",
        id: "__alloyId1",
        __parentSymbol: __parentSymbol
    });
    __alloyId0.push($.__views.__alloyId1.getViewEx({
        recurse: true
    }));
    $.__views.map = require("ti.map").createView({
        top: "50dp",
        animate: true,
        regionFit: true,
        userLocation: false,
        region: {
            latitude: Alloy.Globals.LATITUDE_BASE,
            longitude: Alloy.Globals.LONGITUDE_BASE,
            latitudeDelta: .1,
            longitudeDelta: .1
        },
        annotations: __alloyId0,
        id: "map"
    });
    $.__views.map && $.addTopLevelView($.__views.map);
    exports.destroy = function() {};
    _.extend($, $.__views);
    $.map.addEventListener("click", function(e) {
        !e.annotation || "leftButton" !== e.clicksource && "leftPane" != e.clicksource || $.map.removeAnnotation(e.annotation);
    });
    exports.addAnnotation = function(geodata) {
        var annotation = Alloy.createController("annotation", {
            title: geodata.title,
            latitude: geodata.coords.latitude,
            longitude: geodata.coords.longitude
        });
        $.map.addAnnotation(annotation.getView());
        $.map.setLocation({
            latitude: geodata.coords.latitude,
            longitude: geodata.coords.longitude,
            latitudeDelta: 1,
            longitudeDelta: 1
        });
    };
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;