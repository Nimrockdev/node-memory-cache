let express = require('express');
const fetch = require('node-fetch');
let {memoryCache} = require('./middlewares/cache');

let server = express();

server.get('/products', memoryCache(10),(req, res) =>{

    const url = `https://devarc.herokuapp.com/products`; 
    console.time('cache');

    getProducts(url).then( products => { 
        //console.log(products);
        res.json(products);       
    }).then( ()=> {
        console.timeEnd('cache');
        console.log('Fin')
    });
});



server.get('/products/search/re', memoryCache(10),(req, res) =>{
    const url = `https://devarc.herokuapp.com/products/search/re`; 
    console.time('cacheByDesc');
    getProducts(url).then( products => { 
        //console.log(products);
        res.json(products);       
    }).then( ()=> {
        console.timeEnd('cacheByDesc');
        console.log('Fin cacheByDesc')
    });
});

server.listen(8080, () =>{
    console.log('Server started');
});


let getProducts = async (url) => {       

    const response = await fetch(url).catch(err => console.error(err));       
    let data =  await response.json();
    data = data.products;
    //console.log(data);   
    return data;
    
};