let cache = require('memory-cache');


let memoryCache = (duration) => {

    return (req, res, next) => {
    
        let key = '_express_' + req.url;
        //console.log(key)
        let cachedBody = cache.get(key);
        
        if (cachedBody) {     
            res.send(cachedBody)        
            return;      
        } else {
            res.sendResponse = res.send;
            res.send = (body) => {
                cache.put(key, body, duration * 1000);                
                res.sendResponse(body);        
            };       
            next();        
        }; 

        console.log(cache.keys())  ; 
    };    
};

module.exports = { memoryCache };