/**
 * VendorHub Backend Test Runner
 * ===================================================================
 * Lightweight integration test runner — no external test framework needed.
 * Run: node tests/run.js
 */
const http = require('http');

const BASE_URL = process.env.TEST_URL || 'http://localhost:5000';

let passed = 0;
let failed = 0;

const request = (method, path, body = null, token = null) => {
  return new Promise((resolve, reject) => {
    const url = new URL(path, BASE_URL);
    const options = {
      hostname: url.hostname,
      port: url.port,
      path: url.pathname,
      method,
      headers: { 'Content-Type': 'application/json' }
    };

    if (token) {
      options.headers['Authorization'] = `Bearer ${token}`;
    }

    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, body: JSON.parse(data) });
        } catch {
          resolve({ status: res.statusCode, body: data });
        }
      });
    });

    req.on('error', reject);
    if (body) req.write(JSON.stringify(body));
    req.end();
  });
};

const assert = (label, condition) => {
  if (condition) {
    console.log(`  ✅ PASS: ${label}`);
    passed++;
  } else {
    console.log(`  ❌ FAIL: ${label}`);
    failed++;
  }
};

const run = async () => {
  console.log('\n========================================');
  console.log(' VendorHub Backend Integration Tests');
  console.log('========================================\n');

  // 1. Health check
  console.log('🔹 Health Check');
  try {
    const health = await request('GET', '/');
    assert('Server returns 200', health.status === 200);
    assert('Status is online', health.body.status === 'online');
  } catch (e) {
    assert('Server is reachable', false);
    console.log('    ⚠️  Make sure the server is running on ' + BASE_URL);
    summary();
    return;
  }

  // 2. Auth – Register
  console.log('\n🔹 Auth – Registration');
  const testEmail = `test_${Date.now()}@vendorhub.com`;
  const regRes = await request('POST', '/api/auth/register', {
    name: 'Test Vendor',
    email: testEmail,
    password: 'TestPass123'
  });
  assert('Register returns 201', regRes.status === 201);
  assert('Returns token', !!regRes.body?.data?.token);
  const token = regRes.body?.data?.token;

  // 3. Auth – Login
  console.log('\n🔹 Auth – Login');
  const loginRes = await request('POST', '/api/auth/login', {
    email: testEmail,
    password: 'TestPass123'
  });
  assert('Login returns 200', loginRes.status === 200);
  assert('Login returns token', !!loginRes.body?.data?.token);

  // 4. Templates – public list
  console.log('\n🔹 Templates – Marketplace');
  const tmplRes = await request('GET', '/api/templates');
  assert('Templates list returns 200', tmplRes.status === 200);
  assert('Templates list is array', Array.isArray(tmplRes.body?.data));

  // 5. Websites – create
  console.log('\n🔹 Websites – Create');
  const siteRes = await request('POST', '/api/websites/create', {
    businessName: 'TestBakery',
    businessType: 'bakery'
  }, token);
  assert('Website creation returns 201', siteRes.status === 201);
  const vendorId = siteRes.body?.data?.vendor?._id;
  assert('Vendor object created', !!vendorId);

  // 6. Builder – save state
  if (vendorId) {
    console.log('\n🔹 Builder – Save State');
    const builderRes = await request('POST', '/api/builder/save', {
      vendorId,
      layout: { cols: 12 },
      sections: [{ id: 'test-sec', name: 'Test Section', type: 'hero' }],
      components: {}
    }, token);
    assert('Builder save returns 200', builderRes.status === 200);
  }

  // 7. AI – Generate Website
  console.log('\n🔹 AI – Generate Website');
  const aiRes = await request('POST', '/api/ai/generate-website', {
    vendorId,
    businessName: 'TestBakery',
    prompt: 'A premium bakery store selling sourdough and pastries'
  }, token);
  assert('AI generate returns 200', aiRes.status === 200);
  assert('AI returns layout data', !!aiRes.body?.data);

  // 8. AI – Chatbot
  console.log('\n🔹 AI – Chatbot');
  const chatRes = await request('POST', '/api/ai/chatbot', {
    prompt: 'How do I change my website theme?',
    sessionId: 'test-session-1'
  }, token);
  assert('Chatbot returns 200', chatRes.status === 200);

  // 9. Notifications
  console.log('\n🔹 Notifications');
  const notifRes = await request('GET', '/api/notifications', null, token);
  assert('Notifications list returns 200', notifRes.status === 200);

  // 10. Protected routes – no token
  console.log('\n🔹 Security – Protected Routes');
  const noAuthRes = await request('GET', '/api/notifications');
  assert('Returns 401 without token', noAuthRes.status === 401);

  summary();
};

const summary = () => {
  console.log('\n========================================');
  console.log(` Results: ${passed} passed, ${failed} failed`);
  console.log('========================================\n');
  process.exit(failed > 0 ? 1 : 0);
};

run().catch((err) => {
  console.error('Test runner crashed:', err);
  process.exit(1);
});
