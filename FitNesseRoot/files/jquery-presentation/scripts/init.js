$(document).ready(function () {
	$('body').addClass('andrena');
});

if ('undefined' !== typeof showPresentation && showPresentation) {
	$(document).ready(function () {
		var cssFiles = ['/files/css/fitnesse.css', '/files/jquery-presentation/stylesheets/presentation.css'];
		var switcher = new PresentationModeSwitcher(cssFiles); // that is F9, ESC
		switcher.bindToKey(120, 27);
		switcher.toggle();
	});
}

function PresentationModeSwitcher(cssFiles) {
	$('#slides').presentation();

	var showPresentation = false;
	var self = this;
	
	function loadStyleSheet(cssFile) {
		// hack for ie
		// http://stackoverflow.com/questions/3007669/changing-stylesheet-href-with-jquery-doesnt-quite-work
		if (document.createStyleSheet) {
			if ($('link[media="screen"]').size()) {
				$('link[media="screen"]').remove();
			} else {
				$('link').last().remove();
			}
			document.createStyleSheet(cssFile);
		} else {
			$('link[media="screen"]').attr('href', cssFile);
		}
	}

	this.toggle = function () {
		showPresentation = !showPresentation;
		if (showPresentation) {
			loadStyleSheet(cssFiles[1]);
		} else {
			$('#slides').children('.slide').show();
			loadStyleSheet(cssFiles[0]);
		}
	};
	
	this.bindToKey = function (key, escapeKey) {
		$(document).keyup(function (event) {
			var keyPressed = $(event.which).get(0);
			if (keyPressed == key) {
				self.toggle();
			}
			if (keyPressed == escapeKey) {
				toggleIndex = 1;
				self.toggle();
			}
		});
	};
}

