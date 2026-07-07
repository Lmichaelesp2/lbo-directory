import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

export const dynamic = 'force-dynamic';

// On-demand ISR revalidation for the org-first city pages. The city pages are
// statically cached for 6h (see each page's `export const revalidate`). That
// keeps ISR write costs down, but on a low-traffic page the first visitor
// after the window can be served a stale snapshot. The weekly events pipeline
// can call this endpoint right after pushing new events (alongside the LBC
// call) so the org "next event" teasers refresh exactly when the data changes.
//
// Auth: send the shared secret as `?token=...` or an `x-revalidate-token`
// header. Set REVALIDATE_TOKEN in the Vercel project env (Production).
//
// Example (from the pipeline, after events are pushed):
//   curl -X POST "https://www.localbusinessorganizations.com/api/revalidate?token=$REVALIDATE_TOKEN"

const PATHS = [
  '/texas',
  '/texas/san-antonio',
  // Uncomment as the events feature rolls out to more cities:
  // '/texas/austin',
  // '/texas/dallas',
  // '/texas/houston',
];

function authorized(req: NextRequest): boolean {
  const secret = process.env.REVALIDATE_TOKEN;
  if (!secret) return false;
  const token =
    req.nextUrl.searchParams.get('token') ??
    req.headers.get('x-revalidate-token');
  return token === secret;
}

function handle(req: NextRequest) {
  if (!authorized(req)) {
    return NextResponse.json({ ok: false, error: 'unauthorized' }, { status: 401 });
  }
  for (const path of PATHS) {
    revalidatePath(path);
  }
  return NextResponse.json({ ok: true, revalidated: PATHS, now: new Date().toISOString() });
}

export async function POST(req: NextRequest) {
  return handle(req);
}

// GET allowed too, so it can be triggered from a browser or a simple cron ping.
export async function GET(req: NextRequest) {
  return handle(req);
}
