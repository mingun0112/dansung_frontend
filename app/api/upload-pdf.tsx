export default async function handler(req, res) {
    try {
        const response = await fetch("http://3.39.193.117:8000/upload-pdf", {
            method: req.method,
            body: req.body,
            headers: {
                "Content-Type": req.headers["content-type"],
            },
        });

        const data = await response.json();
        res.status(response.status).json(data);
    } catch (error) {
        console.error("Upload failed:", error);
        res.status(500).json({ error: "Failed to upload PDF" });
    }
}
