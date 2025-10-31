
export async function sendResponse(res, statusCode, contentType, data) {
    res.writeHead(statusCode, {'Content-Type': contentType})
    res.end(data)
}
