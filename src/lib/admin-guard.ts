import { NextRequest, NextResponse } from 'next/server';
import { getSessionFromRequest, TokenPayload } from './auth';

export function requireAdmin(
  req: NextRequest,
  requiredRole?: 'owner'
): { session: TokenPayload } | { errorResponse: NextResponse } {
  const session = getSessionFromRequest(req);
  if (!session) {
    return {
      errorResponse: NextResponse.json(
        { error: 'Unauthorized: Session missing or expired.' },
        { status: 401 }
      ),
    };
  }

  if (requiredRole && session.role !== requiredRole) {
    return {
      errorResponse: NextResponse.json(
        { error: 'Forbidden: Insufficient permissions for this action.' },
        { status: 403 }
      ),
    };
  }

  return { session };
}
