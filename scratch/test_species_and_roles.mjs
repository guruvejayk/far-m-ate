// scratch/test_species_and_roles.mjs
async function runTests() {
  console.log('=== RUNNING MULTI-SPECIES & DOMAIN SEPARATION TESTS ===\n');

  let passed = 0;
  let total = 0;

  function assert(condition, testName, details) {
    total++;
    if (condition) {
      console.log(`[PASS] ${testName}`);
      passed++;
    } else {
      console.error(`[FAIL] ${testName} - Details:`, details);
    }
  }

  // -------------------------------------------------------------
  // TEST 1: Pest Detector - Human Detection
  // -------------------------------------------------------------
  try {
    const res = await fetch('http://localhost:3000/api/pest/analyze', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        crop: 'Human',
        symptoms: 'Person farmer working in field wearing shirt and cap',
      }),
    });
    const data = await res.json();
    assert(
      data.speciesClassification &&
      data.speciesClassification.speciesCategory === 'human' &&
      data.speciesClassification.isHarmfulToFarm === false,
      'Test 1: Human detected with zero crop harm and PPE safety advice',
      data
    );
  } catch (err) {
    assert(false, 'Test 1: Human detection failed with network error', err.message);
  }

  // -------------------------------------------------------------
  // TEST 2: Pest Detector - Beneficial Species (Ladybird / Honeybee)
  // -------------------------------------------------------------
  try {
    const res = await fetch('http://localhost:3000/api/pest/analyze', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        crop: 'General Farm',
        symptoms: 'Red spotted ladybird beetle foraging on leaf clusters',
      }),
    });
    const data = await res.json();
    assert(
      data.speciesClassification &&
      data.speciesClassification.speciesCategory === 'beneficial' &&
      data.speciesClassification.isHarmfulToFarm === false &&
      (data.recommendedAction.includes('DO NOT SPRAY') || data.recommendedAction.includes('Preserve')),
      'Test 2: Beneficial ladybird beetle recognized as safe/friend with DO NOT SPRAY directive',
      data
    );
  } catch (err) {
    assert(false, 'Test 2: Beneficial species failed with network error', err.message);
  }

  // -------------------------------------------------------------
  // TEST 3: Pest Detector - Harmful Wildlife / Vertebrate Pest (Wild Boar)
  // -------------------------------------------------------------
  try {
    const res = await fetch('http://localhost:3000/api/pest/analyze', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        crop: 'Groundnut / Tuber Field',
        symptoms: 'Wild boar rooting and digging up soil and destroying root systems at night',
      }),
    });
    const data = await res.json();
    assert(
      data.speciesClassification &&
      data.speciesClassification.speciesCategory === 'harmful_wildlife' &&
      data.speciesClassification.isHarmfulToFarm === true &&
      data.recommendedAction.includes('Solar'),
      'Test 3: Harmful wild boar recognized with damage risk and non-lethal deterrence advice',
      data
    );
  } catch (err) {
    assert(false, 'Test 3: Harmful wildlife failed with network error', err.message);
  }

  // -------------------------------------------------------------
  // TEST 4: Pest Detector - Agrochemical Packaging Redirect
  // -------------------------------------------------------------
  try {
    const res = await fetch('http://localhost:3000/api/pest/analyze', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        crop: 'Chemical Input',
        symptoms: 'Pesticide bottle packaging with cap seal and hologram label',
      }),
    });
    const data = await res.json();
    assert(
      data.speciesClassification &&
      data.speciesClassification.speciesCategory === 'agrochemical_packaging' &&
      data.speciesClassification.redirectFeature === 'counterfeit',
      'Test 4: Agrochemical bottle detected in Pest Doctor with clean redirect to Counterfeit Sentinel',
      data
    );
  } catch (err) {
    assert(false, 'Test 4: Packaging detection failed with network error', err.message);
  }

  // -------------------------------------------------------------
  // TEST 5: Domain Boundary - Counterfeit Chat Rejects Pest Questions
  // -------------------------------------------------------------
  try {
    const res = await fetch('http://localhost:3000/api/ai/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: 'My tomato leaves have brown leaf spots and yellow halos, what foliar disease is it?',
        context: { activeFeature: 'counterfeit' },
        language: 'en',
      }),
    });
    const data = await res.json();
    const isRedirect =
      data.text.includes('Plant Doctor') &&
      !data.text.includes('counterfeit tomato') &&
      !data.text.includes('counterfeit leaf');
    assert(
      isRedirect,
      'Test 5: Counterfeit Sentinel rejects leaf disease query and redirects to Plant Doctor without calling leaf counterfeit',
      data
    );
  } catch (err) {
    assert(false, 'Test 5: Counterfeit chat domain boundary failed', err.message);
  }

  // -------------------------------------------------------------
  // TEST 6: Domain Boundary - Pest Doctor Rejects Hologram Verification
  // -------------------------------------------------------------
  try {
    const res = await fetch('http://localhost:3000/api/ai/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: 'Is this pesticide bottle real or counterfeit? Please check the hologram and batch number.',
        context: { activeFeature: 'pest' },
        language: 'en',
      }),
    });
    const data = await res.json();
    const isRedirect =
      data.text.includes('Counterfeit Detector') &&
      !data.text.toLowerCase().includes('this product is counterfeit');
    assert(
      isRedirect,
      'Test 6: Pest Doctor rejects bottle hologram verification and redirects to Counterfeit Sentinel without declaring product counterfeit',
      data
    );
  } catch (err) {
    assert(false, 'Test 6: Pest Doctor domain boundary failed', err.message);
  }

  console.log(`\n=== TEST SUMMARY: ${passed}/${total} TESTS PASSED ===\n`);
}

runTests();
