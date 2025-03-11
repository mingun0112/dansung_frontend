import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const body = await req.formData();

        const response = await fetch("http://3.39.193.117:8000/upload-pdf", {
            method: "POST",
            body: body,
        });

        const data = await response.json();
        return NextResponse.json(data, { status: response.status });
    } catch (error) {
        console.error("Upload failed:", error);
        return NextResponse.json({ error: "Failed to upload PDF" }, { status: 500 });
    }
}
