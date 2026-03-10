require('dotenv').config();
const mongoose = require('mongoose');
const Sametha = require('./models/Sametha');

const samethalu = [
  {
    samethaTelugu: 'కోతి చేతికి కొబ్బరికాయ',
    samethaEnglish: 'A coconut in a monkey\'s hand',
    meaningTelugu: 'అర్హత లేని వ్యక్తికి మంచి వస్తువు ఇవ్వడం వల్ల ప్రయోజనం ఉండదు',
    meaningEnglish: 'Giving something valuable to someone who cannot appreciate or use it',
    explanationTelugu: 'కోతి కొబ్బరికాయను సరిగ్గా వాడుకోలేదు. అదే విధంగా అర్హత లేనివారికి మంచి అవకాశలు ఇస్తే వ్యర్థమవుతాయి.',
    exampleTelugu: 'అతనికి ఆ ఉద్యోగం ఇవ్వడం కోతి చేతికి కొబ్బరికాయ లాంటిది.',
    category: 'wisdom',
    tags: ['waste', 'opportunity', 'worthiness'],
    hasEnglish: true,
    isActive: true,
  },
  {
    samethaTelugu: 'చేసిన పాపం చెప్పుకోకు, చేయని పుణ్యం చెప్పుకోకు',
    samethaEnglish: 'Don\'t boast about sin done, don\'t boast about virtue undone',
    meaningTelugu: 'చెడు పనులను గర్వంగా చెప్పుకోవడం తప్పు, చేయని మంచి పనులను చేసినట్టు చెప్పుకోవడం కూడా తప్పు',
    meaningEnglish: 'One should neither brag about wrongdoings nor claim credit for good deeds not done',
    explanationTelugu: 'నైతికంగా జీవించడానికి అవసరమైన సూత్రం. తప్పు పనులను దాచుకోవాలి, మంచి పనులు చేయడమే ముఖ్యం.',
    exampleTelugu: 'అతను చేయని పనులు చేసినట్టు చెప్పుకుంటాడు - చేసిన పాపం చెప్పుకోకు, చేయని పుణ్యం చెప్పుకోకు అన్నట్టు.',
    category: 'life',
    tags: ['morality', 'honesty', 'virtue'],
    hasEnglish: true,
    isActive: true,
  },
  {
    samethaTelugu: 'అడవిలో పుట్టిన చెట్టు అందరికీ నీడ ఇస్తుంది',
    samethaEnglish: 'A tree born in the forest gives shade to all',
    meaningTelugu: 'గొప్ప వ్యక్తి అందరికీ సహాయపడతాడు',
    meaningEnglish: 'A great person helps everyone without discrimination',
    explanationTelugu: 'మంచి మనసు గల వ్యక్తి తన సహాయంలో ఎవరినీ వేరు చేయడు.',
    exampleTelugu: 'ఆ డాక్టర్ గారు పేదలకు కూడా ఉచితంగా వైద్యం చేస్తారు - అడవిలో పుట్టిన చెట్టు అందరికీ నీడ ఇస్తుంది.',
    category: 'wisdom',
    tags: ['generosity', 'kindness', 'service'],
    hasEnglish: true,
    isActive: true,
  },
  {
    samethaTelugu: 'తినే కొద్దీ రుచి, నేర్చే కొద్దీ విద్య',
    samethaEnglish: 'The more you eat, the more the taste; the more you learn, the more the knowledge',
    meaningTelugu: 'జ్ఞానం పెరిగే కొద్దీ మరింత నేర్చుకోవాలనే కోరిక పెరుగుతుంది',
    meaningEnglish: 'The more knowledge one gains, the more one desires to learn',
    explanationTelugu: 'విద్య అనంతమైనది. నేర్చుకోవడం ఒక ప్రయాణం, గమ్యం కాదు.',
    exampleTelugu: 'పుస్తకాలు చదివే కొద్దీ మరిన్ని చదవాలనిపిస్తుంది - తినే కొద్దీ రుచి, నేర్చే కొద్దీ విద్య.',
    category: 'education',
    tags: ['learning', 'knowledge', 'wisdom'],
    hasEnglish: true,
    isActive: true,
  },
  {
    samethaTelugu: 'ఉప్పు తిన్న ఇంట్లో పెళ్ళికి రావద్దు',
    samethaEnglish: '',
    meaningTelugu: 'ఎవరి దగ్గర మేలు పొందారో వారికి కష్టాన్ని కలిగించకూడదు',
    meaningEnglish: '',
    explanationTelugu: 'ఎవరు మనకు ఆతిధ్యం ఇచ్చారో, వారికి చెడు చేయడం తప్పు. కృతజ్ఞత అవసరం.',
    exampleTelugu: 'అతను నీ ఇంట్లో తిన్నాడు, ఇప్పుడు నీకు హాని చేస్తున్నాడు - ఉప్పు తిన్న ఇంట్లో పెళ్ళికి రావద్దు.',
    category: 'life',
    tags: ['gratitude', 'loyalty', 'ethics'],
    hasEnglish: false,
    isActive: true,
  },
  {
    samethaTelugu: 'పదిమందికి వెలుతురు ఇచ్చే దీపం ఒక్కో ఇంటికి వెలుతురు ఇవ్వలేదా?',
    samethaEnglish: '',
    meaningTelugu: 'అందరికీ ఉపయోగపడే వ్యక్తి ఒక్కో కుటుంబానికి కూడా ఉపకరిస్తాడు',
    meaningEnglish: '',
    explanationTelugu: 'విశాలమైన సేవ చేసే వ్యక్తి చిన్న స్థాయిలో కూడా సహాయపడగలడు.',
    exampleTelugu: '',
    category: 'wisdom',
    tags: ['service', 'generosity'],
    hasEnglish: false,
    isActive: true,
  },
  {
    samethaTelugu: 'మాట్లాడేవాడు పండితుడు కాదు, వినేవాడే పండితుడు',
    samethaEnglish: 'Not the speaker, but the listener is wise',
    meaningTelugu: 'మాట్లాడటం కంటే వినడం ముఖ్యం',
    meaningEnglish: 'Listening is more important than speaking',
    explanationTelugu: 'నిజమైన జ్ఞానం వినడంలో ఉంది. మాట్లాడటం ద్వారా మన జ్ఞానం బయటకు వస్తుంది, కానీ వినడం ద్వారా కొత్త జ్ఞానం నేర్చుకుంటాం.',
    exampleTelugu: 'ఆ గురువు ఎక్కువగా వినేవారు, తక్కువగా మాట్లాడేవారు - మాట్లాడేవాడు పండితుడు కాదు, వినేవాడే పండితుడు.',
    category: 'wisdom',
    tags: ['listening', 'wisdom', 'patience'],
    hasEnglish: true,
    isActive: true,
  },
  {
    samethaTelugu: 'చేయి కాల్చుకుని అన్నం తింటారు',
    samethaEnglish: 'One burns their hand to eat the rice',
    meaningTelugu: 'మంచి ఫలితాలు పొందాలంటే కష్టపడాలి',
    meaningEnglish: 'To get good results, one must work hard',
    explanationTelugu: 'జీవితంలో ఏ మంచి విషయమైనా కష్టపడకుండా రాదు. పరిశ్రమ అవసరం.',
    exampleTelugu: 'పరీక్షలో మంచి మార్కులు రావాలంటే చదవాలి - చేయి కాల్చుకుని అన్నం తింటారు.',
    category: 'work',
    tags: ['hardwork', 'effort', 'dedication'],
    hasEnglish: true,
    isActive: true,
  },
  {
    samethaTelugu: 'నూరు బాండ్లు నీళ్ళు తాగినా దప్పిక తీరదు',
    samethaEnglish: '',
    meaningTelugu: 'అసంతృప్తి గల వ్యక్తికి ఎంత ఇచ్చినా సరిపోదు',
    meaningEnglish: '',
    explanationTelugu: 'లోభులకు ఎంత ఐశ్వర్యం వచ్చినా సంతృప్తి ఉండదు.',
    exampleTelugu: 'అతనికి ఎంత ఇచ్చినా చాలదు - నూరు బాండ్లు నీళ్ళు తాగినా దప్పిక తీరదు.',
    category: 'life',
    tags: ['greed', 'satisfaction', 'contentment'],
    hasEnglish: false,
    isActive: true,
  },
  {
    samethaTelugu: 'ఆకలికి అన్నం, జ్వరానికి వైద్యం',
    samethaEnglish: 'Food for hunger, medicine for fever',
    meaningTelugu: 'ప్రతి సమస్యకు తగిన పరిష్కారం ఉంటుంది',
    meaningEnglish: 'Every problem has its appropriate solution',
    explanationTelugu: 'సమస్యను అర్థం చేసుకుని తగిన పరిష్కారం వెతకాలి.',
    exampleTelugu: 'నీ సమస్యకు తగిన సహాయం తీసుకో - ఆకలికి అన్నం, జ్వరానికి వైద్యం.',
    category: 'wisdom',
    tags: ['solution', 'problem-solving'],
    hasEnglish: true,
    isActive: true,
  },
  {
    samethaTelugu: 'ఏడ్చే పిల్లకు పాలు',
    samethaEnglish: 'Milk goes to the crying child',
    meaningTelugu: 'అడిగే వారికే లభిస్తుంది',
    meaningEnglish: 'Only those who ask receive',
    explanationTelugu: 'మన అవసరాలు చెప్పుకోని వారికి ఏమీ దక్కదు.',
    exampleTelugu: 'నీ హక్కుకోసం అడుగు - ఏడ్చే పిల్లకు పాలు.',
    category: 'life',
    tags: ['ask', 'initiative', 'rights'],
    hasEnglish: true,
    isActive: true,
  },
  {
    samethaTelugu: 'నవ్వే నోటికి నాలుగు రాళ్ళు',
    samethaEnglish: '',
    meaningTelugu: 'అనవసరంగా నవ్వేవారు చులకన అవుతారు',
    meaningEnglish: '',
    explanationTelugu: 'అవసరమైన సమయంలో మాట్లాడాలి, అనవసర నవ్వు గౌరవాన్ని తగ్గిస్తుంది.',
    exampleTelugu: '',
    category: 'humor',
    tags: ['respect', 'dignity', 'behavior'],
    hasEnglish: false,
    isActive: true,
  },
  {
    samethaTelugu: 'కాలం కాదు, కష్టం కదా జీవితం',
    samethaEnglish: '',
    meaningTelugu: 'జీవితం సులభంగా గడిపేది కాదు, కష్టపడి సాధించుకోవాలి',
    meaningEnglish: '',
    explanationTelugu: 'కష్టాలు జీవితంలో భాగం. వాటిని అధిగమించడమే నిజమైన జీవితం.',
    exampleTelugu: '',
    category: 'life',
    tags: ['hardship', 'life', 'struggle'],
    hasEnglish: false,
    isActive: true,
  },
  {
    samethaTelugu: 'పెద్దలు చెప్పింది వేదం',
    samethaEnglish: 'What elders say is scripture',
    meaningTelugu: 'పెద్దల అనుభవపూర్వకమైన మాటలు ఎల్లప్పుడూ సత్యమే',
    meaningEnglish: 'The words of elders, born of experience, are always true',
    explanationTelugu: 'పెద్దలు జీవితంలో చాలా అనుభవించి చెప్తారు. వారి మాటలు విలువైనవి.',
    exampleTelugu: 'అమ్మ చెప్పింది వినాల్సింది - పెద్దలు చెప్పింది వేదం.',
    category: 'family',
    tags: ['elders', 'wisdom', 'experience', 'respect'],
    hasEnglish: true,
    isActive: true,
  },
  {
    samethaTelugu: 'చెట్టు పక్షికి నీడ ఇస్తుంది, పక్షి విత్తనాలు చల్లుతుంది',
    samethaEnglish: 'The tree gives shade to the bird, the bird scatters its seeds',
    meaningTelugu: 'ఇచ్చిపుచ్చుకోవడమే జీవితం',
    meaningEnglish: 'Life is about mutual giving and receiving',
    explanationTelugu: 'ప్రకృతిలో అన్నీ ఒకదానిపై మరొకటి ఆధారపడతాయి. పరస్పర సహకారం అవసరం.',
    exampleTelugu: 'మనం ఒకరికొకరం సహాయపడాలి - చెట్టు పక్షికి నీడ ఇస్తుంది, పక్షి విత్తనాలు చల్లుతుంది.',
    category: 'nature',
    tags: ['nature', 'cooperation', 'mutual-help'],
    hasEnglish: true,
    isActive: true,
  },
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB Connected');

    await Sametha.deleteMany({});
    console.log('🗑️  Cleared existing samethalu');

    await Sametha.insertMany(samethalu);
    console.log(`🌱 Seeded ${samethalu.length} samethalu successfully`);

    mongoose.connection.close();
    console.log('🔌 Connection closed');
  } catch (err) {
    console.error('❌ Seed error:', err);
    process.exit(1);
  }
};

seedDB();
