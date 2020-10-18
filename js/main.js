// lightbox
$(document).on('click', '[data-toggle="lightbox"]', function (event) {
    event.preventDefault();
    $(this).ekkoLightbox();
});

function log(message) {
    var dateTime = new Date();
    var time = dateTime.toLocaleTimeString();

    console.log(`${time}: ${message}`);
}

// Service Worker Registration
if ('serviceWorker' in navigator) {

    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/js/sw.js').then(function (registration) {
            var serviceWorker;
            if (registration.installing) {
                serviceWorker = registration.installing;
                log("installing");
            } else if (registration.waiting) {
                serviceWorker = registration.waiting;
                log("waiting");
            } else if (registration.active) {
                serviceWorker = registration.active;
                log("active");
            }

            if (serviceWorker) {
                serviceWorker.addEventListener('statechange', e => {
                    log(`state change: ${e.target.state}`);
                });
            }
        }).catch(error => {
            log(error);
        })
    });
} else {
    log(`Current browser doesn't support service workers`)
}

