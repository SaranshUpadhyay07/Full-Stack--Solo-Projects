
export function getContentType(ext){
    const mimeTypes = {
          ".html": "text/html",
          ".json": "application/json",
          ".css": "text/css",
          ".js": "application/javascript",
          ".jpg": "image/jpeg",
          ".jpeg": "image/jpeg",
          ".png": "image/png",
          ".gif": "image/gif",
          ".svg": "image/svg+xml",
          ".ico": "image/x-icon",
          ".webp": "image/webp",
          ".mp4": "video/mp4",
          ".webm": "video/webm",
          ".ogg": "audio/ogg",
          ".mp3": "audio/mpeg",
          ".wav": "audio/wav",
          ".pdf": "application/pdf",
          ".txt": "text/plain",
          ".woff": "font/woff",
          ".woff2": "font/woff2",
          ".ttf": "font/ttf",
          ".eot": "application/vnd.ms-fontobject",
        };
        const contentType = mimeTypes[ext] || "application/octet-stream";
    return contentType;
}