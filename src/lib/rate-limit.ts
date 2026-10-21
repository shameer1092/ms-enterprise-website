// Lightweight in-memory rate limiter for form submissions and login attempts
const ipRequestCounts = new Map<string, { count: number; resetTime: number }>();

export function checkRateLimit(ip: string, limit = 10, windowMs = 60000): { allowed: boolean; remaining: number } {
  const now = Date.now();
  const record = ipRequestCounts.get(ip);

  if (!record || now > record.resetTime) {
    ipRequestCounts.set(ip, { count: 1, resetTime: now + windowMs });
    return { allowed: true, remaining: limit - 1 };
  }

  if (record.count >= limit) {
    return { allowed: false, remaining: 0 };
  }

  record.count += 1;
  return { allowed: true, remaining: limit - record.count };
}

// Clean up stale rate limit entries periodically
if (typeof setInterval !== 'undefined') {
  setInterval(() => {
    const now = Date.now();
    ipRequestCounts.forEach((record, ip) => {
      if (now > record.resetTime) {
        ipRequestCounts.delete(ip);
      }
    });
  }, 300000);
}
