const API_URL = 'https://unstoppabledomains.g.alchemy.com/domains/';
const API_KEY = 'UD07rKAnLUu7S25dFgpytUGXmuEihNv7';

function getDomainInfo(domain) {

    return new Promise((resolve, reject) => {

        let onLoad = function (e) {
            let response = JSON.parse(e.currentTarget.responseText);
            resolve(response);
        };
    
        let onError = function (e) {
            console.error('API Error', e);
            reject(e);
        };
    
        let xhr = new XMLHttpRequest();
        xhr.open("GET", API_URL + domain);
        xhr.setRequestHeader("Authorization", "Bearer " + API_KEY);	
        xhr.addEventListener('load', onLoad);
        xhr.addEventListener('error', onError);
        xhr.send();
    });
}

export { getDomainInfo };