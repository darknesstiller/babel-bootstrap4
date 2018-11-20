// Main JavaScript File

// import modules here

// import Bootstrap 4 JavaScript
import 'bootstrap';
import '../sass/style.scss';

// Immediately-Invoked Function Expression (IIFE)
(function iife() {
	// Bootstrap 4 Popover Example
	$(() => {
		$('[data-toggle="popover"]').popover();
	});
})();
