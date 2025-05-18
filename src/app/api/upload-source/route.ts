import { NextResponse } from 'next/server';
import axios from 'axios';

interface UploadResponse {
  data: any; // Adjust if you know the exact shape
}

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const formData = await request.formData();

    // Optional: check if formData has any entries
    if (!formData || [...formData.entries()].length === 0) {
      return NextResponse.json({ error: "No form data provided." }, { status: 400 });
    }

    // Let axios set Content-Type (with boundary) automatically
    const res = await axios.post<UploadResponse>(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/source/uploads`,
      formData
    );

    const data = res.data;

    return NextResponse.json({ data: data.data || data });

  } catch (err: unknown) {
    console.error("Upload error:", err);

    // More robust error typing for axios
    if (axios.isAxiosError(err)) {
      const message = err.response?.data?.message || err.message || "Unexpected error during upload.";
      return NextResponse.json({ error: message }, { status: 500 });
    }

    const error = err as Error;
    return NextResponse.json({ error: error.message || "Unexpected error during upload." }, { status: 500 });
  }
}
