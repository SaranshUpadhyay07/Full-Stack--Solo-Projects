import { sendResponse } from "../utils/sendResponse.js";
import fs from 'node:fs/promises';
import path from 'node:path';
import url from 'node:url';

export async function handlePost(req, res) {
    console.log('Handling POST request for /invest');
    const __filename = url.fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    let body = '';
    req.on('data', chunk => {
        body += chunk;
    });
    req.on('end', async () => {
        console.log(`Received body: ${body} and type = ${typeof body}`);
        let sanitizedBody;
        try {
            const log ={
                amount: JSON.parse(body).amount,
                weight: JSON.parse(body).weight,
                date: new Date().toISOString()
            }
            const pathResource = path.join(__dirname, '..', 'data','logs.txt');
            await fs.appendFile(pathResource, JSON.stringify(log) + '\n');

        } catch (err) {
            return sendResponse(res, 400, 'application/json', JSON.stringify({ error: 'Invalid JSON' }));
        }
        sendResponse(res, 201, 'application/json', JSON.stringify(sanitizedBody));
    });
}