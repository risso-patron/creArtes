const fs = require('fs');
const https = require('https');
const path = require('path');

const dir = 'crearte/web';
// Dir already exists based on list_dir output

const images = [
    {
        url: 'https://www.risso-patron.com/assets/images/projects/somosproperties.com/screenshot-desktop.webp',
        name: 'web-somos.webp'
    },
    {
        url: 'https://www.risso-patron.com/assets/images/projects/budget-calculator-react/screenshot-desktop.webp',
        name: 'mkt-budget.webp'
    },
    {
        url: 'https://www.risso-patron.com/assets/images/projects/hostpropanama.com/screenshot-desktop.webp',
        name: 'video-hostpro.webp'
    }
];

images.forEach(img => {
    const file = fs.createWriteStream(path.join(dir, img.name));
    https.get(img.url, function(response) {
        response.pipe(file);
        file.on('finish', function() {
            file.close();
            console.log('Downloaded ' + img.name);
        });
    }).on('error', function(err) {
        fs.unlink(path.join(dir, img.name));
        console.error('Error downloading ' + img.name + ': ' + err.message);
    });
});
