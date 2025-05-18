

interface BLSRequestBody {
    seriesid: string[];
    startyear: string;
    endyear: string;
}

interface BLSApiRequestBody extends BLSRequestBody {
    registrationKey: string;
}

interface BLSApiResponse {
    status: string;
    responseTime: number;
    message: string[];
    Results: unknown;
}

export async function POST(request: Request): Promise<Response> {
    const BLS_API_URL = 'https://api.bls.gov/publicAPI/v2/timeseries/data/';
    const API_KEY = '2c9a631e710d4fbf91de4679e533d3eb'; // store your key securely in .env

    const body: BLSRequestBody = await request.json();

    try {
        const response: Response = await fetch(BLS_API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                seriesid: body.seriesid,
                startyear: body.startyear,
                endyear: body.endyear,
                registrationKey: API_KEY,
            } as BLSApiRequestBody),
        });

        const data: BLSApiResponse = await response.json();
        console.log(data)
        return new Response(JSON.stringify(data), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ error: 'Failed to fetch BLS data' }), { status: 500 });
    }
}
