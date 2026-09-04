async function runTest() {
  const baseUrl = 'http://localhost:3000';

  console.log('1. Health check...');
  const healthRes = await fetch(`${baseUrl}/api/health`);
  console.log('Health status:', healthRes.status, await healthRes.json());

  console.log('\n2. Testing Cross-Chat Agronomic Continuity:');
  console.log('Simulating scenario: Farmer diagnosed Tomato Early Blight in Pest Doctor.');
  console.log('Farmer opens Recommendation AI Chat and asks:');
  console.log('"what should i use for the problem that was the most recent scan in pest detector"');

  const contextWithRecentPestScan = {
    crop: 'Tomato',
    diagnosedDisease: 'Early Blight (Alternaria solani)',
    activeFeature: 'recommendation',
    recentPestDiagnosis: {
      crop: 'Tomato',
      diseaseName: 'Early Blight (Alternaria solani)',
      scientificName: 'Alternaria solani',
      symptoms: ['Concentric dark target-board rings', 'Chlorotic foliar margins'],
      severity: 'moderate',
      economicThresholdLevel: '5% leaf area affected on lower canopy',
      recommendedAction: 'Prune infected lower foliage and apply bio-fungicide Trichoderma viride',
      treatmentOptions: [
        { name: 'Trichoderma viride 1.5% WP', type: 'bio' },
        { name: 'Copper Hydroxide 77% WP', type: 'chemical' },
        { name: 'Azoxystrobin 23% SC', type: 'chemical' }
      ],
      timestamp: new Date().toISOString(),
      source: 'visual_scan'
    }
  };

  const chatRes1 = await fetch(`${baseUrl}/api/ai/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      message: 'what should i use for the problem that was the most recent scan in pest detector',
      context: contextWithRecentPestScan,
      language: 'en'
    })
  });

  const chatData1 = await chatRes1.json();
  console.log('\nAI Response 1 (Recommendation for recent pest scan):');
  console.log(chatData1.text);
  console.log('\nSource:', chatData1.source);

  // Check assertions:
  const text1 = chatData1.text;
  const mentionsEarlyBlight = /early blight|alternaria/i.test(text1);
  const mentionsTomato = /tomato/i.test(text1);
  const offersTankChoice = /tank|capacity|5l|10l|12l|15l|16l|20l|200l/i.test(text1);
  const hasNoAsterisks = !text1.includes('*');
  const hasNoHashtags = !text1.includes('#');

  console.log('\n--- Assertion Results ---');
  console.log('Mentions Early Blight:', mentionsEarlyBlight);
  console.log('Mentions Tomato:', mentionsTomato);
  console.log('Offers Sprayer Tank Calculation Choice:', offersTankChoice);
  console.log('No Asterisks (*):', hasNoAsterisks);
  console.log('No Hashtags (#):', hasNoHashtags);

  console.log('\n3. Farmer asks for 15L tank instructions...');
  const chatRes2 = await fetch(`${baseUrl}/api/ai/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      message: 'yes, give me the mixing instructions and calculations for my 15L tank',
      context: {
        ...contextWithRecentPestScan,
        ...(chatData1.context || {})
      },
      language: 'en'
    })
  });

  const chatData2 = await chatRes2.json();
  console.log('\nAI Response 2 (15L Tank Calculations & Mixing Instructions):');
  console.log(chatData2.text);

  const text2 = chatData2.text;
  const mentions15L = /15\s*l|15\s*litre|15\s*liter/i.test(text2);
  const givesMixing = /mix|water|pre-dissolve|bucket|stir/i.test(text2);
  console.log('Mentions 15L Tank:', mentions15L);
  console.log('Gives Mixing Instructions:', givesMixing);
  console.log('No Asterisks (*):', !text2.includes('*'));
  console.log('No Hashtags (#):', !text2.includes('#'));
}

runTest().catch(console.error);
