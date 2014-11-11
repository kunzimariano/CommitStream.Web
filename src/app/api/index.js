(function (api) {
    var importController = require("./importController"),
        queryController = require("./queryController"),
        settingsController = require("./settingsController"),
        jenkinsController = required(".jenkinsController");

	api.init = function (app) {
		importController.init(app);
		queryController.init(app);
        settingsController.init(app);
	    jenkinsController.init(app);
	};
})(module.exports);