const fs = require('fs');


const requesthandler = (req, res) => {

    const url = req.url;
    const method = req.method;
    if( url === '/'){
        res.write('<html>');
        res.write('<head><title>NodeJs</title></head>');
        res.write('<body><form action="/message" method="POST"><input type="text" name="message"/><button type="submit">Send</button></form></body>');
        res.write('</html>');  
        return res.end();  
    }
    if(url === '/message' && method === 'POST'){
        const body = [];
        req.on('data', (chunk) => {
            console.log(chunk);
            body.push(chunk);
        } );
        req.on('end', () => {
            const parseBody = Buffer.concat(body).toString();
            const message = parseBody.split('=')[1];
            fs.writeFile('message.txt',message, (err) => {
                res.statusCode = 302;
                res.setHeader('Location','/');
                return res.end();
            });
            // fs.writeFileSync('message.txt','DUMMY');
            
            // console.log(parseBody);
        });
        
        //fs.writeHead(302, {});
    }
    res.setHeader('Content-Type','text/html');
    res.write('<html>');
    res.write('<head><title>NodeJs</title></head>');
    res.write('<body><h1>Hello from NodeJS!</h1></body>');
    res.write('</html>');
    res.end();
}


// module.exports = {
//     handlre : requesthandler,
//     someText : 'Some hard coded text'

// };

// module.exports.handler = requestHandler;
// module.exports.someText = 'Some hard coded text';

exports.handler = requesthandler;

exports.someText = 'Some hard coded text';  