interface RateLimitRecord {
  timestamps: number[];
}

const windowMs = 15 * 60 * 1000; // 15 minutes
const maxAttempts = 5; // 5 attempts per window

// In-memory sliding window store
const ipAttempts = new Map<string, RateLimitRecord>();

// Cleanup stale records periodically
setInterval(() => {
  const now = Date.now();
  for (const [ip, record] of ipAttempts.entries()) {
    const validTimestamps = record.timestamps.filter((t) => now - t < windowMs);
    if (validTimestamps.length === 0) {
      ipAttempts.delete(ip);
    } else {
      record.timestamps = validTimestamps;
    }
  }
}, 5 * 60 * 1000);

export function checkLoginRateLimit(ip: string): {
  success: boolean;
  remaining: number;
  retryAfter: number;
} {
  const now = Date.now();
  const record = ipAttempts.get(ip) || { timestamps: [] };

  // Filter timestamps within current sliding window
  const activeTimestamps = record.timestamps.filter((t) => now - t < windowMs);

  if (activeTimestamps.length >= maxAttempts) {
    const oldestTimestamp = activeTimestamps[0];
    const retryAfterSeconds = Math.ceil((oldestTimestamp + windowMs - now) / 1000);
    return {
      success: false,
      remaining: 0,
      retryAfter: Math.max(1, retryAfterSeconds),
    };
  }

  // Record this attempt
  activeTimestamps.push(now);
  ipAttempts.set(ip, { timestamps: activeTimestamps });

  return {
    success: true,
    remaining: maxAttempts - activeTimestamps.length,
    retryAfter: 0,
  };
}

export function resetLoginRateLimit(ip: string): void {
  ipAttempts.delete(ip);
}
