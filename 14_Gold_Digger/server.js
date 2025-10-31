import http from 'node:http'
import { serveStatic } from './utils/serveStatic.js' 
import { getRandomPrice } from './utils/getPrice.js'
import { handlePost } from './handlers/handlersFunction.js'
const PORT = 8000

const server = http.createServer(async (req,res) =>{

    console.log(`Incoming request: ${req.method} ${req.url}`);
    if(req.url === '/live-price'){
        res.writeHead(200, {
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive',
            'Access-Control-Allow-Origin': '*'
        })

        const interval = setInterval(() => {
            const price = getRandomPrice();
            res.write(`data: ${price}\n\n`);
        }, 10000);

        req.on('close', () => {
            clearInterval(interval);
            res.end();
        })
    }
    else if(req.url.startsWith('/')&& req.method === 'GET'){
        serveStatic(req,res)
    }else if(req.url.startsWith('/invest')&& req.method === 'POST'){
       return await handlePost(req,res)
    }
})

server.listen(PORT,()=>console.log(`Server is running on port ${PORT}`))