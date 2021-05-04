function includeHTML(include_id) {
	var z, i, elmnt, file, xhttp;
	/*loop through a collection of all HTML elements:*/
	z = document.getElementsByTagName("*");
	for (i = 0; i < z.length; i++) {
		elmnt = z[i];
		/*search for elements with a certain atrribute:*/
		file = elmnt.getAttribute(include_id);
		if (file) {
			/*make an HTTP request using the attribute value as the file name:*/
			xhttp = new XMLHttpRequest();
			xhttp.onreadystatechange = function () {
				if (this.readyState == 4) {
					if (this.status == 200) { elmnt.innerHTML = this.responseText; }
					if (this.status == 404) { elmnt.innerHTML = "Page not found."; }
					/*remove the attribute, and call this function once more:*/
					elmnt.removeAttribute(include_id);
					includeHTML();
				}
			}
			xhttp.open("GET", file, true);
			xhttp.send();
			/*exit the function:*/
			return;
		}
	}
};

function changePage(page) {
	if(page){
		console.log("Change page : " + page)
		var header = document.getElementById('header')
		header.setAttribute("header", "components/" + page + "/header.html")
		header.setAttribute('transition','1s ease-in-out')
		includeHTML("header")
		var content = document.getElementById('content')
		content.setAttribute("main_content", "components/" + page + "/content.html")
		content.setAttribute('transition', '1s ease-in-out')
		includeHTML("main_content")
	}else{
		changePage('na')
	}

	
}

// if ("serviceWorker" in navigator) {
// 	window.addEventListener("load", function () {
// 		navigator.serviceWorker
// 			.register("serviceWorker.js")
// 			.then(res => console.log("service worker registered"))
// 			.catch(err => console.log("service worker not registered", err))
// 	})
// }
