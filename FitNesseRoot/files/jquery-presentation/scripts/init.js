$(document).ready(function () {
	$('body').addClass('andrena');
	resizeCartoonImages();
});

if ('undefined' !== typeof showPresentation && showPresentation) {
	$(document).ready(function () {
		var cssFiles = ['/files/css/fitnesse.css', '/files/jquery-presentation/stylesheets/presentation.css'];
		var switcher = new PresentationModeSwitcher(cssFiles);
		switcher.bindToKey(120, 27); // that is F9, ESC
		switcher.toggle();
	});
}

function resizeCartoonImages() {
	$('img.cartoon').each(function() {
		var cartoon = $(this).get(0);
		$cartoon = $(cartoon);
		var size = $cartoon.data('size');
		if (size) {
			resizeCartoon($(cartoon), size)
		} else {
			// http://stackoverflow.com/questions/318630/get-real-image-width-and-height-with-javascript-in-safari-chrome
			$("<img/>").attr("src", $(cartoon).attr("src")).load(function() {
				size = {width: this.width, height: this.height};
				resizeCartoon($(cartoon), size)
				$cartoon.data('size', size);
			});
		}
	});
}

function resizeCartoon($cartoon, size) {
	var width = size.width;
	var height = size.height;
	var viewportwidth = $(window).width();
	var viewportheight = $(window).height();
	var factor = 0.8 * Math.min(viewportwidth / width, viewportheight / height * 0.9);
	$cartoon.width(factor * width);
	$cartoon.height(factor * height);
	console.log($cartoon + " " + $cartoon.width() + "x" + $cartoon.height());
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
		resizeCartoonImages();
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

