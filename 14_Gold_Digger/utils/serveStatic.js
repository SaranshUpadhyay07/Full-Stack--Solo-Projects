import path from "node:path";
import fs from "node:fs/promises";
import { sendResponse } from "./sendResponse.js";
import url from "node:url";
import { getContentType } from "./getContentType.js";
export async function serveStatic(req, res) {
  try {
    const __filename = url.fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    // Remove query params
    const pathname = req.url.split("?")[0];
    let filePath = path.join(__dirname, "..", "public", pathname);

    // Check if the path is a directory → serve index.html inside it
    const stat = await fs.stat(filePath);
    if (stat.isDirectory()) {
      filePath = path.join(filePath, "index.html");
    }

    // Detect MIME type
    const ext = path.extname(filePath).toLowerCase();
    const contentType = getContentType(ext);

    // Read file content
    const data = await fs.readFile(filePath);
    sendResponse(res, 200, contentType, data);
  } catch (error) {
    // Handle file not found or read error
    if (error.code === "ENOENT") {
      const notFoundPagePath = path.join(
        path.dirname(url.fileURLToPath(import.meta.url)),
        "..",
        "public",
        "404.html"
      );
      try {
        const ext = path.extname(notFoundPagePath).toLowerCase();
        const contentType = getContentType(ext);
        const data = await fs.readFile(notFoundPagePath);
        sendResponse(res, 404, contentType, data);
      } catch (error) {
        console.error(error);
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("500 Internal Server Error");
      }
    } else {
      console.error(error);
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end("500 Internal Server Error");
    }
  }
}
