import type { NextApiRequest, NextApiResponse } from "next";

type UploadResponse = {
    success?: boolean;
    error?: string;
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<UploadResponse>
) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method Not Allowed" });
    }

    try {
        const response = await fetch("http://3.39.193.117:8000/upload-pdf", {
            method: "POST",
            body: req.body,
            headers: {
                "Content-Type": req.headers["content-type"] || "application/json",
            },
        });

        const data = await response.json();
        return res.status(response.status).json(data);
    } catch (error) {
        console.error("Upload failed:", error);
        return res.status(500).json({ error: "Failed to upload PDF" });
    }
}
