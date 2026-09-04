async function testMultilingual() {
  const baseUrl = 'http://localhost:3000';

  console.log('Testing Cross-Chat in Hindi (hi)...');
  const resHindi = await fetch(`${baseUrl}/api/ai/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      message: 'हालिया कीट स्कैन के लिए मुझे क्या उपयोग करना चाहिए?',
      context: {
        crop: 'Tomato',
        diagnosedDisease: 'Early Blight (Alternaria solani)',
        activeFeature: 'recommendation',
        recentPestDiagnosis: {
          crop: 'Tomato',
          diseaseName: 'Early Blight (Alternaria solani)',
          scientificName: 'Alternaria solani',
          symptoms: ['Dark rings on leaves'],
          severity: 'moderate',
          economicThresholdLevel: '5% leaf area affected',
          recommendedAction: 'Prune infected lower foliage and apply Trichoderma viride',
          treatmentOptions: [{ name: 'Trichoderma viride 1.5% WP', type: 'bio' }],
          timestamp: new Date().toISOString(),
          source: 'visual_scan'
        }
      },
      language: 'hi'
    })
  });

  const dataHindi = await resHindi.json();
  console.log('\nHindi Output:');
  console.log(dataHindi.text);
  console.log('No asterisks:', !dataHindi.text.includes('*'));
  console.log('No hashtags:', !dataHindi.text.includes('#'));
}

testMultilingual().catch(console.error);
