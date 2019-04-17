self.addEventListener('install', (event) => {
    console.log('Установлен');
});

self.addEventListener('activate', (event) => {
    console.log('Активирован');
});

self.addEventListener('fetch', (event) => {
    console.log('Происходит запрос на сервер');
});

self.addEventListener('notificationclick', function(event) {
    console.log('Notification Cliccccccck.');
    if (!event.action) {
        clients.openWindow("https://jameshfisher.com/");
        // Was a normal notification click
        console.log('Notification Click.');
        return;
    }

    switch (event.action) {
        case 'coffee-action':
            console.log('User ❤️️\'s coffee.');
            break;
        case 'doughnut-action':
            console.log('User ❤️️\'s doughnuts.');
            break;
        case 'gramophone-action':
            console.log('User ❤️️\'s music.');
            break;
        case 'atom-action':
            console.log('User ❤️️\'s science.');
            break;
        default:
            console.log(`Unknown action clicked: '${event.action}'`);
            break;
    }
});


