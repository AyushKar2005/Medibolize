import { NextResponse } from "next/server";

const GOOGLE_SHEETS_WEB_APP_URL =
  "https://script.google.com/macros/s/AKfycbyBk-gS9f4W8kxbfy8DnegzqjUHfhHvCp_bk5ju5xqhAMdF9KhDNFMgfuBEO6KK9EFMyw/exec";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const res = await fetch(GOOGLE_SHEETS_WEB_APP_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await res.json();

    return NextResponse.json(data, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 }
    );
  }
}
