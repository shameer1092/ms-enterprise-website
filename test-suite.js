const http = require('http');
const fs = require('fs');
const path = require('path');

const BASE_URL = 'http://localhost:3000';

function request(options, postData = null) {
  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => resolve({ statusCode: res.statusCode, headers: res.headers, body: data }));
    });
    req.on('error', reject);
    if (postData) {
      req.write(postData);
    }
    req.end();
  });
}

async function runTests() {
  console.log('=====================================================');
  console.log('   MS ENTERPRISE WEBSITE - AUTOMATED TEST SUITE      ');
  console.log('=====================================================\n');

  let passed = 0;
  let failed = 0;

  function assert(condition, testName, details = '') {
    if (condition) {
      console.log(`[PASS] ${testName}`);
      passed++;
    } else {
      console.error(`[FAIL] ${testName} - ${details}`);
      failed++;
    }
  }

  // 1. Strict Em Dash Scan in Source Code
  console.log('>>> 1. Verifying Strict Content Rule: No Em Dashes in Source Code');
  function scanDir(dir) {
    let files = [];
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        if (!['node_modules', '.next', '.git'].includes(entry.name)) {
          files = files.concat(scanDir(fullPath));
        }
      } else if (/\.(ts|tsx|js|jsx|json)$/.test(entry.name)) {
        files.push(fullPath);
      }
    }
    return files;
  }

  const srcFiles = scanDir(path.join(__dirname, 'src'));
  let emDashCount = 0;
  let emDashFiles = [];
  for (const f of srcFiles) {
    const content = fs.readFileSync(f, 'utf-8');
    if (content.includes(String.fromCharCode(8212))) {
      emDashCount++;
      emDashFiles.push(f);
    }
  }
  assert(emDashCount === 0, 'No em dashes found anywhere in src/ files', `Found in: ${emDashFiles.join(', ')}`);

  // 2. HTTP Route Checks
  console.log('\n>>> 2. Verifying Public Pages and SEO Endpoints');
  const routes = [
    { path: '/', label: 'Homepage' },
    { path: '/about', label: 'About Page' },
    { path: '/services', label: 'Services Index' },
    { path: '/services/web-development', label: 'Custom Web Dev Page' },
    { path: '/services/meta-services', label: 'Meta (Facebook) Page' },
    { path: '/services/ecommerce-support', label: 'Ecommerce Support (VA) Page' },
    { path: '/projects', label: 'Projects Index' },
    { path: '/projects/apex-industrial-portal', label: 'Apex Project Detail' },
    { path: '/plans', label: 'Plans & Pricing Page' },
    { path: '/faq', label: 'FAQ Page' },
    { path: '/inquiry', label: 'Inquiry Page' },
    { path: '/legal/privacy-policy', label: 'Privacy Policy' },
    { path: '/legal/terms-of-service', label: 'Terms of Service' },
    { path: '/legal/refund-policy', label: 'Refund Policy' },
    { path: '/robots.txt', label: 'Robots.txt' },
    { path: '/sitemap.xml', label: 'Sitemap.xml' },
  ];

  for (const r of routes) {
    try {
      const res = await request({ host: 'localhost', port: 3000, path: r.path, method: 'GET' });
      assert(res.statusCode === 200, `${r.label} returns HTTP 200 (Got: ${res.statusCode})`);
    } catch (e) {
      assert(false, `${r.label} reachable`, e.message);
    }
  }

  // 3. Custom 404 Check
  console.log('\n>>> 3. Verifying Custom 404 Page');
  try {
    const res404 = await request({ host: 'localhost', port: 3000, path: '/invalid-path-that-does-not-exist', method: 'GET' });
    assert(res404.statusCode === 404, 'Non-existent path returns HTTP 404', `Got: ${res404.statusCode}`);
    assert(res404.body.includes('Page Not Found'), 'Custom 404 contains "Page Not Found"');
  } catch (e) {
    assert(false, 'Custom 404 check', e.message);
  }

  // 4. Inquiry API End-to-End Test
  console.log('\n>>> 4. Testing Inquiry Form Submission & Validation');
  // 4a. Invalid submission
  try {
    const invalidRes = await request(
      {
        host: 'localhost',
        port: 3000,
        path: '/api/inquiries',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      },
      JSON.stringify({ name: '', email: 'notanemail' })
    );
    assert(invalidRes.statusCode === 400, 'Inquiry rejects missing/invalid fields with 400');
  } catch (e) {
    assert(false, 'Inquiry validation', e.message);
  }

  // 4b. Valid submission
  let createdInquiryId = null;
  try {
    const validRes = await request(
      {
        host: 'localhost',
        port: 3000,
        path: '/api/inquiries',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      },
      JSON.stringify({
        name: 'Alex Turner',
        email: 'alex.turner@example.com',
        phone: '+1 555 987 6543',
        service: 'Custom Website Development',
        budget: '$1,500 - $3,500',
        timeline: '2 to 4 weeks',
        message: 'Looking for a custom ecommerce portal redesign with competitor benchmarking.',
      })
    );
    assert(validRes.statusCode === 201, 'Valid inquiry accepted with HTTP 201');
    const parsed = JSON.parse(validRes.body);
    assert(parsed.success === true, 'Inquiry response contains success: true');
    createdInquiryId = parsed.inquiryId;
    assert(Boolean(createdInquiryId), `Inquiry ID created: ${createdInquiryId}`);
  } catch (e) {
    assert(false, 'Valid inquiry submission', e.message);
  }

  // 5. Admin Authentication & Session Security
  console.log('\n>>> 5. Testing Admin Authentication & Role Enforcement');
  // 5a. Bad password
  try {
    const badLogin = await request(
      {
        host: 'localhost',
        port: 3000,
        path: '/api/admin/login',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      },
      JSON.stringify({ username: 'admin', password: 'WrongPassword123' })
    );
    assert(badLogin.statusCode === 401, 'Invalid password rejected with HTTP 401');
  } catch (e) {
    assert(false, 'Invalid login test', e.message);
  }

  // 5b. Valid login
  let adminCookie = null;
  try {
    const goodLogin = await request(
      {
        host: 'localhost',
        port: 3000,
        path: '/api/admin/login',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      },
      JSON.stringify({ username: 'admin', password: 'Admin@12345' })
    );
    assert(goodLogin.statusCode === 200, 'Valid admin login succeeded with HTTP 200');
    const setCookie = goodLogin.headers['set-cookie'];
    assert(Boolean(setCookie), 'HTTP-only session cookie returned on login');
    if (setCookie && setCookie[0]) {
      adminCookie = setCookie[0].split(';')[0];
    }
  } catch (e) {
    assert(false, 'Valid admin login test', e.message);
  }

  // 5c. Test authenticated admin stats
  try {
    const statsRes = await request({
      host: 'localhost',
      port: 3000,
      path: '/api/admin/stats',
      method: 'GET',
      headers: { Cookie: adminCookie },
    });
    assert(statsRes.statusCode === 200, 'Authenticated admin stats returned HTTP 200');
    const statsData = JSON.parse(statsRes.body);
    assert(statsData.counts.inquiries > 0, `Stats correctly records inquiries (Count: ${statsData.counts.inquiries})`);
  } catch (e) {
    assert(false, 'Admin stats check', e.message);
  }

  // 6. Dynamic Project & Dynamic Navbar Generation Test
  console.log('\n>>> 6. Testing Dynamic Project Creation and Dynamic Navbar Auto-Generation');
  const testProjectSlug = `test-project-${Date.now()}`;
  try {
    const createProjRes = await request(
      {
        host: 'localhost',
        port: 3000,
        path: '/api/admin/projects',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Cookie: adminCookie,
        },
      },
      JSON.stringify({
        title: 'Veritas Analytics Hub',
        slug: testProjectSlug,
        serviceCategory: 'web',
        client: 'Veritas Global',
        summary: 'Cloud monitoring system with low maintenance architecture.',
        description: 'Complete bespoke UI with spatial card hierarchy and lifetime live support.',
        techStack: ['Next.js', 'TypeScript', 'Tailwind CSS'],
        keyOutcomes: ['Instant load times', 'Zero backlog'],
        published: true,
        showInNav: true,
      })
    );
    assert(createProjRes.statusCode === 200, 'Admin can create new project');

    // Check project page is immediately accessible
    const projPageRes = await request({
      host: 'localhost',
      port: 3000,
      path: `/projects/${testProjectSlug}`,
      method: 'GET',
    });
    assert(projPageRes.statusCode === 200, 'Newly created project page renders with HTTP 200');

    // Verify navigation API now includes the new project dynamically
    const navRes = await request({
      host: 'localhost',
      port: 3000,
      path: '/api/admin/navigation',
      method: 'GET',
      headers: { Cookie: adminCookie },
    });
    const navData = JSON.parse(navRes.body);
    const projNav = navData.find((n) => n.id === 'nav-projects');
    const hasChild = projNav?.children?.some((c) => c.href === `/projects/${testProjectSlug}`);
    assert(Boolean(hasChild), 'Dynamic navigation automatically attached new project matching Section 4 & 6 requirements!');
  } catch (e) {
    assert(false, 'Dynamic project creation & navbar auto-update', e.message);
  }

  // 7. Backup and Export Tests
  console.log('\n>>> 7. Testing Inquiry CSV Export & DB Backup');
  try {
    const exportRes = await request({
      host: 'localhost',
      port: 3000,
      path: '/api/admin/inquiries/export',
      method: 'GET',
      headers: { Cookie: adminCookie },
    });
    assert(exportRes.statusCode === 200, 'Inquiry CSV export returned HTTP 200');
    assert(exportRes.headers['content-type']?.includes('text/csv'), 'Inquiry export has text/csv Content-Type');
    assert(exportRes.body.includes('Alex Turner'), 'CSV export contains the submitted inquiry name');
  } catch (e) {
    assert(false, 'CSV export test', e.message);
  }

  try {
    const backupRes = await request(
      {
        host: 'localhost',
        port: 3000,
        path: '/api/admin/backups',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Cookie: adminCookie,
        },
      },
      JSON.stringify({ action: 'create' })
    );
    assert(backupRes.statusCode === 200, 'Create backup API returned HTTP 200');
    const backupData = JSON.parse(backupRes.body);
    assert(backupData.success === true, `Database snapshot created: ${backupData.filename}`);
  } catch (e) {
    assert(false, 'Database backup creation', e.message);
  }

  // 8. OWASP & Zero-Trust Security Verification
  console.log('\n>>> 8. Verifying Zero-Trust Obfuscation & Security Headers');
  // 8a. Probing /admin without auth must return 404
  try {
    const unauthAdmin = await request({
      host: 'localhost',
      port: 3000,
      path: '/admin',
      method: 'GET',
    });
    assert(unauthAdmin.statusCode === 404, `Probing /admin without auth returns HTTP 404 (Got: ${unauthAdmin.statusCode})`);
  } catch (e) {
    assert(false, 'Unauth admin probe', e.message);
  }

  // 8b. Secret entry point /portal-gateway-7f9a returns 200
  try {
    const portalRes = await request({
      host: 'localhost',
      port: 3000,
      path: '/portal-gateway-7f9a',
      method: 'GET',
    });
    assert(portalRes.statusCode === 200, 'Obfuscated entry point /portal-gateway-7f9a returns HTTP 200');
  } catch (e) {
    assert(false, 'Portal gateway request', e.message);
  }

  // 8c. Footer has NO Admin Access link
  const footerContent = fs.readFileSync(path.join(__dirname, 'src/components/layout/Footer.tsx'), 'utf8');
  assert(!footerContent.includes('Admin Access'), 'Footer has zero public Admin Access links');

  // 8d. Security headers verification
  try {
    const homeHead = await request({
      host: 'localhost',
      port: 3000,
      path: '/',
      method: 'GET',
    });
    assert(homeHead.headers['x-frame-options'] === 'DENY', 'X-Frame-Options: DENY header present');
    assert(homeHead.headers['x-content-type-options'] === 'nosniff', 'X-Content-Type-Options: nosniff header present');
    assert(Boolean(homeHead.headers['content-security-policy']), 'Content-Security-Policy header present');
  } catch (e) {
    assert(false, 'Security headers test', e.message);
  }

  console.log('\n=====================================================');
  console.log(`TEST RESULTS: ${passed} PASSED, ${failed} FAILED`);
  console.log('=====================================================');

  process.exit(failed > 0 ? 1 : 0);
}

runTests();
