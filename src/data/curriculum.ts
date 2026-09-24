import { LevelInfo, VocabularyItem, SoundItem, CVCWord } from '../types';

export const ALL_SOUNDS: SoundItem[] = [
  {
    letter: 'S',
    name: 'S',
    ipa: '/s/',
    thaiSoundHint: 'เสียง ส / ซ (พ่นลมยาว ฟู่)',
    thaiExplanation: 'ฟันแตะกันเบาๆ แล้วพ่นลมผ่านฟันออกมาเหมือนเสียงงูขู่ ไม่มีเสียงสั่นในคอ',
    sampleWord: 'sun',
    sampleWordThai: 'พระอาทิตย์',
    sampleIcon: '☀️',
    mouthTipThai: 'ยิ้มเบาๆ ฟันบนล่างชิดกัน พ่นลม sssss'
  },
  {
    letter: 'A',
    name: 'A',
    ipa: '/æ/',
    thaiSoundHint: 'เสียงสระ แอ สั้น (แอะ)',
    thaiExplanation: 'อ้าปากกว้างกว่าสระเอ ลดขากรรไกรลง ลิ้นอยู่ต่ำด้านหน้า เสียง แอะ',
    sampleWord: 'apple',
    sampleWordThai: 'แอปเปิล',
    sampleIcon: '🍎',
    mouthTipThai: 'อ้าปากกว้าง ขากรรไกรล่างตกลง เปล่งเสียง แอะ'
  },
  {
    letter: 'T',
    name: 'T',
    ipa: '/t/',
    thaiSoundHint: 'เสียง ท / ต (ลมกระทบ)',
    thaiExplanation: 'เอาปลายลิ้นแตะปุ่มเหงือกหลังฟันบน แล้วดีดลิ้นลงพร้อมพ่นลม ทึ เบาๆ',
    sampleWord: 'top',
    sampleWordThai: 'ลูกข่าง / ด้านบน',
    sampleIcon: '🔝',
    mouthTipThai: 'แตะลิ้นหลังฟันบน กักลมแล้วปล่อย ทึ!'
  },
  {
    letter: 'P',
    name: 'P',
    ipa: '/p/',
    thaiSoundHint: 'เสียง พ / ป (ลมระเบิดที่ริมฝีปาก)',
    thaiExplanation: 'หุบริมฝีปากทั้งสองแน่น แล้วอ้าปากออกพร้อมพ่นลมระเบิดเบาๆ พึ',
    sampleWord: 'pen',
    sampleWordThai: 'ปากกา',
    sampleIcon: '🖊️',
    mouthTipThai: 'ประกบริมฝีปาก กักลม แล้วปล่อย พึ'
  },
  {
    letter: 'I',
    name: 'I',
    ipa: '/ɪ/',
    thaiSoundHint: 'เสียงสระ อิ สั้น (ผ่อนคลาย)',
    thaiExplanation: 'เสียงสระ อิ สั้นๆ ผ่อนคลายกล้ามเนื้อปาก ไม่ต้องฉีกยิ้มแน่น',
    sampleWord: 'ink',
    sampleWordThai: 'น้ำหมึก',
    sampleIcon: '🖋️',
    mouthTipThai: 'ปากผ่อนคลาย กึ่งกลางระหว่าง อิ กับ เอะ'
  },
  {
    letter: 'N',
    name: 'N',
    ipa: '/n/',
    thaiSoundHint: 'เสียง น (ขึ้นจมูก)',
    thaiExplanation: 'ปลายลิ้นแตะปุ่มเหงือกด้านบน ให้ลมออกทางจมูก อึมม์/อึนน์',
    sampleWord: 'net',
    sampleWordThai: 'ตาข่าย',
    sampleIcon: '🥅',
    mouthTipThai: 'ปลายลิ้นแตะเพดานเหงือก ลมออกจมูก นึ'
  },
  {
    letter: 'C',
    name: 'C',
    ipa: '/k/',
    thaiSoundHint: 'เสียง ค / ก (ลมจากโคนลิ้น)',
    thaiExplanation: 'ยกโคนลิ้นแตะเพดานอ่อนด้านใน แล้วปล่อยลม คึ ออกมา',
    sampleWord: 'cat',
    sampleWordThai: 'แมว',
    sampleIcon: '🐱',
    mouthTipThai: 'กักลมที่โคนลิ้นแล้วปล่อย คึ'
  },
  {
    letter: 'M',
    name: 'M',
    ipa: '/m/',
    thaiSoundHint: 'เสียง ม (ปิดริมฝีปาก ลมออกจมูก)',
    thaiExplanation: 'หุบปากให้แน่น ปล่อยลมออกทางจมูก เกิดเสียง ฮึมม์ ในลำคอ',
    sampleWord: 'mat',
    sampleWordThai: 'เสื่อ / พรมเช็ดเท้า',
    sampleIcon: '🧘',
    mouthTipThai: 'ปิดปากแน่น ลมออกจมูก อึมม์'
  },
  {
    letter: 'D',
    name: 'D',
    ipa: '/d/',
    thaiSoundHint: 'เสียง ด (เส้นเสียงสั่น)',
    thaiExplanation: 'ลิ้นแตะปุ่มเหงือกเหมือน T แต่ต้องมีเสียงสั่นในลำคอ ดึ',
    sampleWord: 'dog',
    sampleWordThai: 'สุนัข / หมา',
    sampleIcon: '🐶',
    mouthTipThai: 'ลิ้นแตะเหงือก คอสั่น ดึ'
  }
];

export const CVC_WORDS_LIBRARY: CVCWord[] = [
  { word: 'at', letters: ['A', 'T'], sounds: ['/æ/', '/t/'], thai: 'ที่ / บน', icon: '📍' },
  { word: 'sat', letters: ['S', 'A', 'T'], sounds: ['/s/', '/æ/', '/t/'], thai: 'นั่งแล้ว (กริยานั่ง)', icon: '🪑' },
  { word: 'pat', letters: ['P', 'A', 'T'], sounds: ['/p/', '/æ/', '/t/'], thai: 'ตบเบาๆ / ลูบ', icon: '👋' },
  { word: 'tap', letters: ['T', 'A', 'P'], sounds: ['/t/', '/æ/', '/p/'], thai: 'แตะเบาๆ / ก๊อกน้ำ', icon: '🚰' },
  { word: 'pan', letters: ['P', 'A', 'N'], sounds: ['/p/', '/æ/', '/n/'], thai: 'กระทะ', icon: '🍳' },
  { word: 'pin', letters: ['P', 'I', 'N'], sounds: ['/p/', '/ɪ/', '/n/'], thai: 'เข็มหมุด', icon: '📌' },
  { word: 'sit', letters: ['S', 'I', 'T'], sounds: ['/s/', '/ɪ/', '/t/'], thai: 'นั่ง', icon: '🧘' },
  { word: 'pit', letters: ['P', 'I', 'T'], sounds: ['/p/', '/ɪ/', '/t/'], thai: 'หลุม / บ่อ', icon: '🕳️' },
  { word: 'tip', letters: ['T', 'I', 'P'], sounds: ['/t/', '/ɪ/', '/p/'], thai: 'ปลายยอด / เคล็ดลับ', icon: '💡' },
  { word: 'cat', letters: ['C', 'A', 'T'], sounds: ['/k/', '/æ/', '/t/'], thai: 'แมว', icon: '🐱' },
  { word: 'mat', letters: ['M', 'A', 'T'], sounds: ['/m/', '/æ/', '/t/'], thai: 'เสื่อ / พรม', icon: '🧘' },
  { word: 'map', letters: ['M', 'A', 'P'], sounds: ['/m/', '/æ/', '/p/'], thai: 'แผนที่', icon: '🗺️' },
  { word: 'cap', letters: ['C', 'A', 'P'], sounds: ['/k/', '/æ/', '/p/'], thai: 'หมวกแก๊ป', icon: '🧢' },
  { word: 'can', letters: ['C', 'A', 'N'], sounds: ['/k/', '/æ/', '/n/'], thai: 'กระป๋อง / สามารถ', icon: '🥫' },
  { word: 'man', letters: ['M', 'A', 'N'], sounds: ['/m/', '/æ/', '/n/'], thai: 'ผู้ชาย', icon: '👨' },
  { word: 'dog', letters: ['D', 'O', 'G'], sounds: ['/d/', '/ɒ/', '/ɡ/'], thai: 'สุนัข', icon: '🐶' },
  { word: 'sun', letters: ['S', 'U', 'N'], sounds: ['/s/', '/ʌ/', '/n/'], thai: 'พระอาทิตย์', icon: '☀️' },
  { word: 'pen', letters: ['P', 'E', 'N'], sounds: ['/p/', '/e/', '/n/'], thai: 'ปากกา', icon: '🖊️' },
];

export const VOCABULARY_LIBRARY: VocabularyItem[] = [
  { id: 'v1', word: 'apple', thai: 'แอปเปิล', phonetic: '/ˈæp.əl/', category: 'Food', type: 'noun', icon: '🍎', exampleSentence: 'I eat an apple.', exampleThai: 'ฉันกินแอปเปิล', syllables: 2 },
  { id: 'v2', word: 'dog', thai: 'สุนัข / หมา', phonetic: '/dɒɡ/', category: 'Animals', type: 'noun', icon: '🐶', exampleSentence: 'The dog runs.', exampleThai: 'สุนัขวิ่ง', syllables: 1 },
  { id: 'v3', word: 'cat', thai: 'แมว', phonetic: '/kæt/', category: 'Animals', type: 'noun', icon: '🐱', exampleSentence: 'The cat sleeps.', exampleThai: 'แมวนอนหลับ', syllables: 1 },
  { id: 'v4', word: 'banana', thai: 'กล้วย', phonetic: '/bəˈnæn.ə/', category: 'Food', type: 'noun', icon: '🍌', exampleSentence: 'She likes banana.', exampleThai: 'เธอชอบกล้วย', syllables: 3 },
  { id: 'v5', word: 'sun', thai: 'พระอาทิตย์', phonetic: '/sʌn/', category: 'Objects', type: 'noun', icon: '☀️', exampleSentence: 'The sun is hot.', exampleThai: 'พระอาทิตย์ร้อน', syllables: 1 },
  { id: 'v6', word: 'book', thai: 'หนังสือ', phonetic: '/bʊk/', category: 'School', type: 'noun', icon: '📖', exampleSentence: 'This is my book.', exampleThai: 'นี่คือหนังสือของฉัน', syllables: 1 },
  { id: 'v7', word: 'water', thai: 'น้ำดื่ม', phonetic: '/ˈwɔː.tər/', category: 'Food', type: 'noun', icon: '💧', exampleSentence: 'I drink water.', exampleThai: 'ฉันดื่มน้ำ', syllables: 2 },
  { id: 'v8', word: 'rice', thai: 'ข้าว', phonetic: '/raɪs/', category: 'Food', type: 'noun', icon: '🍚', exampleSentence: 'We eat rice every day.', exampleThai: 'พวกเรากินข้าวทุกวัน', syllables: 1 },
  { id: 'v9', word: 'run', thai: 'วิ่ง (การกระทำ)', phonetic: '/rʌn/', category: 'Actions', type: 'verb', icon: '🏃', exampleSentence: 'I run in the park.', exampleThai: 'ฉันวิ่งในสวน', syllables: 1 },
  { id: 'v10', word: 'eat', thai: 'กิน / ทาน', phonetic: '/iːt/', category: 'Actions', type: 'verb', icon: '🍽️', exampleSentence: 'I eat rice.', exampleThai: 'ฉันกินข้าว', syllables: 1 },
  { id: 'v11', word: 'sleep', thai: 'นอนหลับ', phonetic: '/sliːp/', category: 'Actions', type: 'verb', icon: '😴', exampleSentence: 'The cat sleeps.', exampleThai: 'แมวนอนหลับ', syllables: 1 },
  { id: 'v12', word: 'big', thai: 'ใหญ่ (บอกลักษณะ)', phonetic: '/bɪɡ/', category: 'Objects', type: 'adjective', icon: '🐘', exampleSentence: 'The elephant is big.', exampleThai: 'ช้างตัวใหญ่', syllables: 1 },
  { id: 'v13', word: 'happy', thai: 'มีความสุข / ดีใจ', phonetic: '/ˈhæp.i/', category: 'People', type: 'adjective', icon: '😊', exampleSentence: 'I am happy.', exampleThai: 'ฉันมีความสุข', syllables: 2 },
  { id: 'v14', word: 'elephant', thai: 'ช้าง', phonetic: '/ˈel.ɪ.fənt/', category: 'Animals', type: 'noun', icon: '🐘', exampleSentence: 'The elephant is big.', exampleThai: 'ช้างตัวใหญ่', syllables: 3 }
];

export const TPR_COMMANDS = [
  { command: 'STAND UP!', thaiMeaning: 'ยืนขึ้น!', icon: '🧍', actionPromptThai: 'ยืนขึ้นช้าๆ ให้คุณครูดู' },
  { command: 'SIT DOWN!', thaiMeaning: 'นั่งลง!', icon: '🪑', actionPromptThai: 'นั่งลงบนเก้าอี้' },
  { command: 'LISTEN!', thaiMeaning: 'ตั้งใจฟัง!', icon: '👂', actionPromptThai: 'เอามือป้องที่หู แล้วเงี่ยหูฟัง' },
  { command: 'LOOK!', thaiMeaning: 'มองดู!', icon: '👀', actionPromptThai: 'ชี้ไปที่ตา หรือมองดูหน้าจอ' },
  { command: 'OPEN YOUR BOOK!', thaiMeaning: 'เปิดหนังสือ!', icon: '📖', actionPromptThai: 'ทำท่าเปิดหนังสือสองมือ' },
  { command: 'CLOSE YOUR BOOK!', thaiMeaning: 'ปิดหนังสือ!', icon: '📕', actionPromptThai: 'ทำท่าประกบมือปิดหนังสือ' },
  { command: 'CLAP YOUR HANDS!', thaiMeaning: 'ปรบมือ!', icon: '👏', actionPromptThai: 'ปรบมือ 2 ครั้ง!' },
  { command: 'TOUCH YOUR NOSE!', thaiMeaning: 'แตะจมูก!', icon: '👃', actionPromptThai: 'เอานิ้วชี้แตะที่จมูก' },
  { command: 'WALK!', thaiMeaning: 'เดิน!', icon: '🚶', actionPromptThai: 'ก้าวเท้าเดินอยู่กับที่' },
  { command: 'STOP!', thaiMeaning: 'หยุด!', icon: '🛑', actionPromptThai: 'ยกมือขึ้นทำท่าหยุดนิ่ง' },
  { command: 'SPEAK!', thaiMeaning: 'พูด!', icon: '🗣️', actionPromptThai: 'ทำท่าขยับปากพูด' },
  { command: 'SMILE!', thaiMeaning: 'ยิ้ม!', icon: '😄', actionPromptThai: 'ยิ้มกว้างๆ อย่างสดใส' }
];

export const CURRICULUM_LEVELS: LevelInfo[] = [
  // LEVEL 0: SURVIVAL ENGLISH
  {
    id: 0,
    title: 'LEVEL 0 — SURVIVAL ENGLISH',
    titleThai: 'ภาษาอังกฤษเอาตัวรอดขั้นพื้นฐาน',
    tagline: 'Start communicating immediately with essential daily phrases',
    taglineThai: 'เริ่มต้นพูดคุยทักทายได้ทันทีแม้ไม่มีพื้นฐานมาก่อน',
    icon: '🌱',
    color: 'emerald',
    lessons: [
      {
        id: 'L0-1',
        levelId: 0,
        lessonNumber: 1,
        title: 'Hello & Goodbye: Greetings',
        titleThai: 'คำทักทายและคำบอกลา',
        description: 'Learn how to greet someone and say goodbye warmly in English.',
        descriptionThai: 'เรียนรู้วิธีกล่าวทักทายและบอกลาอย่างถูกต้องเป็นธรรมชาติ',
        icon: '👋',
        durationMinutes: 20,
        objectives: ['Say Hello and Goodbye', 'Recognize friendly greetings', 'Pronounce greetings clearly'],
        objectivesThai: ['พูด Hello และ Goodbye ได้ถูกต้อง', 'เข้าใจความหมายคำทักทาย', 'ฝึกออกเสียงให้ชัดเจน'],
        steps: [
          {
            id: 's0-1-1',
            type: 'dialogue',
            title: 'Greeting a Friend',
            titleThai: 'การทักทายเพื่อน',
            instruction: 'Listen to the greeting and practice saying it out loud.',
            instructionThai: 'ฟังคำทักทายแล้วฝึกพูดตามออกเสียงดังๆ',
            dialogueData: {
              topic: 'Meeting in the Classroom',
              topicThai: 'เจอกันในห้องเรียน',
              lines: [
                { speaker: 'A', text: 'Hello!', thai: 'สวัสดีครับ/ค่ะ!' },
                { speaker: 'B', text: 'Hi! Good morning!', thai: 'สวัสดี! อรุณสวัสดิ์!' },
                { speaker: 'A', text: 'Goodbye! See you later.', thai: 'ลาก่อนนะ! เจอกันใหม่' },
                { speaker: 'B', text: 'Bye! Have a nice day!', thai: 'บ๊ายบาย! ขอให้เป็นวันที่ดีนะ' }
              ]
            }
          },
          {
            id: 's0-1-2',
            type: 'tpr_action',
            title: 'Action & Greeting',
            titleThai: 'ขยับท่าทางประกอบคำทักทาย',
            instruction: 'Wave your hand and say "Hello!"',
            instructionThai: 'โบกมือแล้วเปล่งเสียงพูดว่า "Hello!"',
            tprData: {
              command: 'WAVE & SAY HELLO!',
              thaiMeaning: 'โบกมือแล้วพูดว่า Hello!',
              icon: '👋',
              actionPromptThai: 'ยกมือโบกแล้วพูดออกเสียง Hello ให้คุณครูได้ยิน'
            }
          },
          {
            id: 's0-1-3',
            type: 'quiz_multiple_choice',
            title: 'Greeting Check',
            titleThai: 'ทดสอบความเข้าใจคำทักทาย',
            instruction: 'When you meet a friend in the morning, what do you say?',
            instructionThai: 'เมื่อพบเพื่อนในตอนเช้า เราควรพูดคำไหน?',
            quizData: {
              question: 'When you meet someone in the morning:',
              questionThai: 'เมื่อพบเจอกันตอนเช้า:',
              options: [
                { text: 'Good morning!', thai: 'อรุณสวัสดิ์!', icon: '🌅', isCorrect: true },
                { text: 'Goodbye!', thai: 'ลาก่อน!', icon: '🚪', isCorrect: false },
                { text: 'Good night!', thai: 'ราตรีสวัสดิ์!', icon: '🌙', isCorrect: false }
              ],
              explanationThai: 'Good morning ใช้ทักทายในตอนเช้า ส่วน Goodbye ใช้เมื่อจะจากกัน'
            }
          }
        ]
      },
      {
        id: 'L0-2',
        levelId: 0,
        lessonNumber: 2,
        title: 'My Name Is... (Introductions)',
        titleThai: 'แนะนำชื่อตนเอง',
        description: 'Ask and answer: "What is your name?" and "My name is..."',
        descriptionThai: 'ฝึกถามและตอบชื่อตนเองอย่างมั่นใจ',
        icon: '🏷️',
        durationMinutes: 25,
        objectives: ['Ask "What is your name?"', 'Answer "My name is..."', 'Say "Nice to meet you"'],
        objectivesThai: ['ถามชื่อ What is your name? ได้', 'ตอบ My name is... ได้', 'พูด Nice to meet you ได้'],
        steps: [
          {
            id: 's0-2-1',
            type: 'dialogue',
            title: 'Introductions Dialogue',
            titleThai: 'บทสนทนาแนะนำตัว',
            instruction: 'Practice the introduction conversation.',
            instructionThai: 'ฝึกซ้อมบทสนทนาแนะนำตัวไปพร้อมกัน',
            dialogueData: {
              topic: 'Meeting for the First Time',
              topicThai: 'พบกันครั้งแรก',
              lines: [
                { speaker: 'A', text: 'Hello! What is your name?', thai: 'สวัสดีครับ คุณชื่ออะไรครับ?' },
                { speaker: 'B', text: 'My name is Anna.', thai: 'ฉันชื่อแอนนาค่ะ' },
                { speaker: 'A', text: 'Nice to meet you, Anna.', thai: 'ยินดีที่ได้รู้จักครับแอนนา' },
                { speaker: 'B', text: 'Nice to meet you too!', thai: 'ยินดีที่ได้รู้จักเช่นกันค่ะ!' }
              ]
            }
          },
          {
            id: 's0-2-2',
            type: 'sentence_builder',
            title: 'Build: My name is...',
            titleThai: 'สร้างประโยค: My name is...',
            instruction: 'Arrange the words to say: My name is Anna.',
            instructionThai: 'เรียงคำในช่องให้ถูกต้องตามประโยค: My name is Anna.',
            sentenceData: {
              targetSentence: 'My name is Anna.',
              targetThai: 'ฉันชื่อแอนนา',
              blocks: [
                { id: 'b1', text: 'My', role: 'who', thaiHint: 'ของฉัน' },
                { id: 'b2', text: 'name', role: 'who', thaiHint: 'ชื่อ' },
                { id: 'b3', text: 'is', role: 'action', thaiHint: 'คือ' },
                { id: 'b4', text: 'Anna', role: 'thing', thaiHint: 'แอนนา' }
              ],
              correctOrder: ['My', 'name', 'is', 'Anna']
            }
          },
          {
            id: 's0-2-3',
            type: 'quiz_multiple_choice',
            title: 'How to respond?',
            titleThai: 'ตอบอย่างไรดี?',
            instruction: 'Someone says: "Nice to meet you." You answer:',
            instructionThai: 'เมื่อมีคนพูดว่า "Nice to meet you." เราควรตอบว่า:',
            quizData: {
              question: '"Nice to meet you!" How do you respond?',
              questionThai: '"ยินดีที่ได้รู้จัก!" คุณจะตอบกลับอย่างไร?',
              options: [
                { text: 'Nice to meet you too!', thai: 'ยินดีที่ได้รู้จักเช่นกันครับ/ค่ะ!', icon: '🤝', isCorrect: true },
                { text: 'No, thank you.', thai: 'ไม่ล่ะ ขอบคุณ', icon: '🙅', isCorrect: false },
                { text: 'Goodbye forever.', thai: 'ลาก่อนตลอดกาล', icon: '👋', isCorrect: false }
              ],
              explanationThai: 'เราเติมคำว่า "too" (เช่นกัน) เพื่อตอบรับความรู้สึกดีๆ กลับไป'
            }
          }
        ]
      },
      {
        id: 'L0-3',
        levelId: 0,
        lessonNumber: 3,
        title: 'Yes, No & Courtesy (Thank You)',
        titleThai: 'ตอบรับ ปฏิเสธ และมารยาทสากล',
        description: 'Polite words: Yes, No, Thank you, You are welcome, and Please.',
        descriptionThai: 'คำสำคัญในชีวิตประจำวัน: ใช่, ไม่ใช่, ขอบคุณ, ไม่เป็นไร, ได้โปรด',
        icon: '🙏',
        durationMinutes: 20,
        objectives: ['Use Yes and No correctly', 'Say Thank you and Please', 'Respond with You are welcome'],
        objectivesThai: ['ใช้ Yes / No ได้ถูกต้อง', 'พูด Thank you และ Please เป็นนิสัย', 'ตอบ You are welcome ได้'],
        steps: [
          {
            id: 's0-3-1',
            type: 'dialogue',
            title: 'Courtesy in Action',
            titleThai: 'การใช้คำสุภาพ',
            instruction: 'Listen to how polite words are used in real life.',
            instructionThai: 'ฟังการใช้คำสุภาพในสถานการณ์จริง',
            dialogueData: {
              topic: 'Offering an Apple',
              topicThai: 'การยื่นแอปเปิลให้เพื่อน',
              lines: [
                { speaker: 'A', text: 'Do you want an apple?', thai: 'คุณอยากได้แอปเปิลไหมครับ?' },
                { speaker: 'B', text: 'Yes, please! Thank you.', thai: 'อยากได้ค่ะ ขอบคุณมากนะคะ' },
                { speaker: 'A', text: 'You are welcome!', thai: 'ยินดีด้วยความเต็มใจครับ!' }
              ]
            }
          },
          {
            id: 's0-3-2',
            type: 'quiz_multiple_choice',
            title: 'Saying Thank You',
            titleThai: 'การขอบคุณ',
            instruction: 'When someone gives you a gift, what do you say?',
            instructionThai: 'เมื่อมีคนมอบของขวัญให้เรา เราควรกล่าวว่าอะไร?',
            quizData: {
              question: 'When someone gives you a gift:',
              questionThai: 'เมื่อมีคนมอบของให้:',
              options: [
                { text: 'Thank you!', thai: 'ขอบคุณครับ/ค่ะ!', icon: '🎁', isCorrect: true },
                { text: 'No!', thai: 'ไม่!', icon: '❌', isCorrect: false },
                { text: 'Goodbye!', thai: 'ลาก่อน!', icon: '🚪', isCorrect: false }
              ],
              explanationThai: 'Thank you คือคำกล่าวแสดงความขอบคุณที่สุภาพที่สุด'
            }
          }
        ]
      }
    ]
  },

  // LEVEL 1: ALPHABET & PHONICS
  {
    id: 1,
    title: 'LEVEL 1 — ALPHABET & PHONICS',
    titleThai: 'ตัวอักษรและระบบเสียงโฟนิกส์',
    tagline: 'Sound → Letter → Blending → Reading your first words',
    taglineThai: 'เข้าใจความเชื่อมโยงของเสียง ตัวอักษร และการผสมคำแรกในชีวิต',
    icon: '🔤',
    color: 'blue',
    lessons: [
      {
        id: 'L1-1',
        levelId: 1,
        lessonNumber: 1,
        title: 'English From Zero: S, A, T, P',
        titleThai: 'บทเรียนที่ 1: ภาษาอังกฤษจากศูนย์ (S, A, T, P)',
        description: 'Understand that English has sounds. Learn letters S, A, T, P and build your first words: at, sat, pat, tap.',
        descriptionThai: 'เข้าใจว่าตัวอักษรภาษาอังกฤษมี "เสียง" เรียนรู้ 4 ตัวอักษรแรก และผสมคำง่ายๆ',
        icon: '🍎',
        durationMinutes: 35,
        objectives: [
          'Understand letter name vs letter sound',
          'Learn sounds /s/, /æ/, /t/, /p/',
          'Blend sounds into words: at, sat, tap, pat',
          'Connect sounds to real meaning'
        ],
        objectivesThai: [
          'เข้าใจความต่างระหว่าง "ชื่อตัวอักษร" กับ "เสียงโฟนิกส์"',
          'ออกเสียง /s/, /æ/, /t/, /p/ ได้ถูกต้อง',
          'ผสมเสียงกลายเป็นคำ: at, sat, tap, pat',
          'จำความหมายและภาพประกอบได้แม่นยำ'
        ],
        steps: [
          // Letter A
          {
            id: 's1-1-1',
            type: 'sound_intro',
            title: 'Letter A and Sound /æ/',
            titleThai: 'ตัวอักษร A กับเสียง /æ/ (แอะ)',
            instruction: 'Click Listen to hear the sound. Say the sound out loud!',
            instructionThai: 'กดปุ่ม Listen เพื่อฟังเสียง แล้วฝึกออกเสียงตามปากเปล่าดังๆ',
            soundData: ALL_SOUNDS[1] // A
          },
          // Letter S
          {
            id: 's1-1-2',
            type: 'sound_intro',
            title: 'Letter S and Sound /s/',
            titleThai: 'ตัวอักษร S กับเสียง /s/ (สสส)',
            instruction: 'Click Listen to hear the hissing sound /s/.',
            instructionThai: 'กดฟังเสียงฟู่เหมือนงู /s/ แล้วฝึกทำเสียง',
            soundData: ALL_SOUNDS[0] // S
          },
          // Letter T
          {
            id: 's1-1-3',
            type: 'sound_intro',
            title: 'Letter T and Sound /t/',
            titleThai: 'ตัวอักษร T กับเสียง /t/ (ทึ)',
            instruction: 'Click Listen to hear the crisp sound /t/.',
            instructionThai: 'กดฟังเสียงดีดลิ้นพ่นลม /t/ สั้นๆ ชัดๆ',
            soundData: ALL_SOUNDS[2] // T
          },
          // Letter P
          {
            id: 's1-1-4',
            type: 'sound_intro',
            title: 'Letter P and Sound /p/',
            titleThai: 'ตัวอักษร P กับเสียง /p/ (พึ)',
            instruction: 'Click Listen to hear the popping sound /p/.',
            instructionThai: 'กดฟังเสียงพ่นลมจากริมฝีปาก /p/',
            soundData: ALL_SOUNDS[3] // P
          },
          // Phonemic awareness: beginning sound
          {
            id: 's1-1-5',
            type: 'sound_discriminate',
            title: 'Beginning Sound Challenge',
            titleThai: 'ค้นหาคำที่ขึ้นต้นด้วยเสียง /æ/',
            instruction: 'Which word starts with the short /æ/ sound?',
            instructionThai: 'คำไหนขึ้นต้นด้วยเสียงสระ แอะ /æ/?',
            soundOptions: {
              targetSound: '/æ/',
              soundPrompt: 'Find the word that starts with /æ/',
              soundPromptThai: 'เลือกคำที่ขึ้นต้นด้วยเสียง /æ/ (แอะ)',
              options: [
                {
                  word: 'apple',
                  thai: 'แอปเปิล',
                  icon: '🍎',
                  isCorrect: true,
                  soundExplanationThai: 'ถูกต้อง! apple ขึ้นต้นด้วยเสียง /æ/'
                },
                {
                  word: 'sun',
                  thai: 'พระอาทิตย์',
                  icon: '☀️',
                  isCorrect: false,
                  soundExplanationThai: 'sun ขึ้นต้นด้วยเสียง /s/ ไม่ใช่ /æ/'
                },
                {
                  word: 'top',
                  thai: 'ลูกข่าง',
                  icon: '🔝',
                  isCorrect: false,
                  soundExplanationThai: 'top ขึ้นต้นด้วยเสียง /t/ ไม่ใช่ /æ/'
                }
              ]
            }
          },
          // Word builder: AT
          {
            id: 's1-1-6',
            type: 'cvc_builder',
            title: 'Word Builder: AT',
            titleThai: 'ประกอบคำแรก: A + T = AT',
            instruction: 'Tap the letter tiles to build the word AT (/æ/ + /t/).',
            instructionThai: 'กดแผ่นตัวอักษรเรียงเป็นคำว่า AT เพื่อฟังเสียงผสม /æ/ + /t/',
            cvcData: {
              word: 'at',
              letters: ['A', 'T'],
              sounds: ['/æ/', '/t/'],
              thai: 'ที่ / อยู่ที่',
              icon: '📍'
            }
          },
          // Word builder: SAT
          {
            id: 's1-1-7',
            type: 'cvc_builder',
            title: 'Word Builder: SAT',
            titleThai: 'ประกอบคำ: S + A + T = SAT',
            instruction: 'Build the word SAT: /s/ + /æ/ + /t/ = SAT!',
            instructionThai: 'กดตัวอักษร S, A, T เพื่อฟังการผสมเสียง /s/ + /æ/ + /t/ = SAT (นั่งแล้ว)',
            cvcData: {
              word: 'sat',
              letters: ['S', 'A', 'T'],
              sounds: ['/s/', '/æ/', '/t/'],
              thai: 'นั่งแล้ว (อดีตของ sit)',
              icon: '🪑'
            }
          },
          // Word builder: TAP
          {
            id: 's1-1-8',
            type: 'cvc_builder',
            title: 'Word Builder: TAP',
            titleThai: 'ประกอบคำ: T + A + P = TAP',
            instruction: 'Build TAP: /t/ + /æ/ + /p/ = TAP.',
            instructionThai: 'เรียง T, A, P เพื่อสร้างคำว่า TAP (แตะเบาๆ)',
            cvcData: {
              word: 'tap',
              letters: ['T', 'A', 'P'],
              sounds: ['/t/', '/æ/', '/p/'],
              thai: 'แตะเบาๆ / ก๊อกน้ำ',
              icon: '🚰'
            }
          },
          // Reading ladder
          {
            id: 's1-1-9',
            type: 'reading_ladder',
            title: 'First Reading Ladder',
            titleThai: 'บันไดการอ่านขั้นแรก',
            instruction: 'Click on each line to listen and read along.',
            instructionThai: 'คลิกที่แต่ละบรรทัดเพื่อฟังเสียงและอ่านตามทีละขั้น',
            readingLadderData: {
              stages: [
                { text: 'A', thai: 'เอ' },
                { text: 'At', thai: 'ที่' },
                { text: 'Pat', thai: 'แพต (ชื่อคน) / ลูบ' },
                { text: 'Pat sat.', thai: 'แพตนั่งแล้ว' }
              ]
            }
          },
          // Mini assessment
          {
            id: 's1-1-10',
            type: 'quiz_multiple_choice',
            title: 'Lesson 1 Assessment',
            titleThai: 'แบบทดสอบประเมินผลบทเรียนที่ 1',
            instruction: 'What word do we get when we blend /s/ + /æ/ + /t/?',
            instructionThai: 'เมื่อนำเสียง /s/ + /æ/ + /t/ มารวมกัน จะได้คำว่าอะไร?',
            quizData: {
              question: 'Blend: /s/ + /æ/ + /t/ = ?',
              questionThai: 'ผสมเสียง: /s/ + /æ/ + /t/ = คำว่าอะไร?',
              options: [
                { text: 'sat', thai: 'นั่งแล้ว', icon: '🪑', isCorrect: true },
                { text: 'tap', thai: 'แตะเบาๆ', icon: '🚰', isCorrect: false },
                { text: 'pat', thai: 'ลูบเบาๆ', icon: '👋', isCorrect: false }
              ],
              explanationThai: 'ถูกต้อง! /s/ + /æ/ + /t/ ผสมเป็นคำว่า sat'
            }
          }
        ]
      },

      {
        id: 'L1-2',
        levelId: 1,
        lessonNumber: 2,
        title: 'Adding Sounds I and N',
        titleThai: 'เพิ่มเสียง I และ N (/ɪ/ & /n/)',
        description: 'Expand your phonics toolkit with letters I and N. Build words: pin, sit, pit, tip, pan.',
        descriptionThai: 'เรียนรู้เสียงสระสั้น /ɪ/ และตัวสะกด /n/ ผสมคำใหม่ๆ',
        icon: '📌',
        durationMinutes: 30,
        objectives: ['Master sound /ɪ/ in ink', 'Master sound /n/ in net', 'Build words pin, sit, pan, tip'],
        objectivesThai: ['ออกเสียง /ɪ/ สั้นได้ชัดเจน', 'ออกเสียง /n/ ขึ้นจมูกได้ถูกต้อง', 'ผสมคำ pin, sit, pan, tip ได้'],
        steps: [
          {
            id: 's1-2-1',
            type: 'sound_intro',
            title: 'Letter I and Sound /ɪ/',
            titleThai: 'ตัวอักษร I กับเสียง /ɪ/ (อิ)',
            instruction: 'Listen to the short /ɪ/ sound as in "ink".',
            instructionThai: 'ฟังเสียงสระ อิ สั้นแบบผ่อนคลายในคำว่า ink',
            soundData: ALL_SOUNDS[4] // I
          },
          {
            id: 's1-2-2',
            type: 'sound_intro',
            title: 'Letter N and Sound /n/',
            titleThai: 'ตัวอักษร N กับเสียง /n/ (นึ)',
            instruction: 'Listen to the nasal sound /n/ as in "net".',
            instructionThai: 'ฟังเสียง นึ ขึ้นจมูกในคำว่า net',
            soundData: ALL_SOUNDS[5] // N
          },
          {
            id: 's1-2-3',
            type: 'cvc_builder',
            title: 'Build: PIN',
            titleThai: 'ผสมคำ: P + I + N = PIN',
            instruction: 'Assemble /p/ + /ɪ/ + /n/ = PIN (เข็มหมุด)',
            instructionThai: 'เรียง P, I, N เพื่อสร้างคำว่า PIN',
            cvcData: {
              word: 'pin',
              letters: ['P', 'I', 'N'],
              sounds: ['/p/', '/ɪ/', '/n/'],
              thai: 'เข็มหมุด',
              icon: '📌'
            }
          },
          {
            id: 's1-2-4',
            type: 'cvc_builder',
            title: 'Build: SIT',
            titleThai: 'ผสมคำ: S + I + T = SIT',
            instruction: 'Assemble /s/ + /ɪ/ + /t/ = SIT (นั่ง)',
            instructionThai: 'เรียง S, I, T เพื่อสร้างคำว่า SIT',
            cvcData: {
              word: 'sit',
              letters: ['S', 'I', 'T'],
              sounds: ['/s/', '/ɪ/', '/t/'],
              thai: 'นั่ง',
              icon: '🧘'
            }
          },
          {
            id: 's1-2-5',
            type: 'quiz_multiple_choice',
            title: 'Sound Discrimination',
            titleThai: 'แยกแยะเสียงสระ',
            instruction: 'Which word has the short /ɪ/ sound?',
            instructionThai: 'คำไหนมีเสียงสระสั้น /ɪ/ (อิ)?',
            quizData: {
              question: 'Which word has the /ɪ/ sound?',
              questionThai: 'คำใดมีเสียงสระ /ɪ/?',
              options: [
                { text: 'pin', thai: 'เข็มหมุด (/ɪ/)', icon: '📌', isCorrect: true },
                { text: 'pan', thai: 'กระทะ (/æ/)', icon: '🍳', isCorrect: false },
                { text: 'sat', thai: 'นั่งแล้ว (/æ/)', icon: '🪑', isCorrect: false }
              ],
              explanationThai: 'pin ใช้เสียงสระสั้น /ɪ/ ส่วน pan และ sat ใช้เสียงสระ /æ/'
            }
          }
        ]
      },

      {
        id: 'L1-3',
        levelId: 1,
        lessonNumber: 3,
        title: 'CVC Mastery: C, M, D (cat, mat, dad)',
        titleThai: 'ผสมคำสามอักษร: C, M, D (cat, mat, dad)',
        description: 'Introduce hard C /k/, M /m/, and D /d/. Make everyday animal and family words.',
        descriptionThai: 'เพิ่มเสียง คึ, มึ, ดึ สร้างคำยอดนิยม cat, mat, dad, map',
        icon: '🐱',
        durationMinutes: 30,
        objectives: ['Learn /k/, /m/, /d/ sounds', 'Build CVC words: cat, mat, map, dad', 'Read simple CVC sentences'],
        objectivesThai: ['เรียนรู้เสียง /k/, /m/, /d/', 'ผสมคำ cat, mat, map, dad', 'อ่านประโยคสั้นๆ จากคำเหล่านี้ได้'],
        steps: [
          {
            id: 's1-3-1',
            type: 'sound_intro',
            title: 'Letter C: /k/',
            titleThai: 'ตัวอักษร C กับเสียง /k/',
            instruction: 'Listen to the sound /k/ as in "cat".',
            instructionThai: 'ฟังเสียง /k/ กักลมในคอแล้วพ่นออกมาเบาๆ',
            soundData: ALL_SOUNDS[6]
          },
          {
            id: 's1-3-2',
            type: 'cvc_builder',
            title: 'Build: CAT',
            titleThai: 'ผสมคำ: C + A + T = CAT',
            instruction: 'Assemble /k/ + /æ/ + /t/ = CAT (แมว)',
            instructionThai: 'เรียงตัวอักษร C, A, T เป็นคำว่า CAT',
            cvcData: {
              word: 'cat',
              letters: ['C', 'A', 'T'],
              sounds: ['/k/', '/æ/', '/t/'],
              thai: 'แมว',
              icon: '🐱'
            }
          },
          {
            id: 's1-3-3',
            type: 'cvc_builder',
            title: 'Build: MAT',
            titleThai: 'ผสมคำ: M + A + T = MAT',
            instruction: 'Assemble /m/ + /æ/ + /t/ = MAT (เสื่อ/พรม)',
            instructionThai: 'เรียง M, A, T เพื่อสร้างคำว่า MAT',
            cvcData: {
              word: 'mat',
              letters: ['M', 'A', 'T'],
              sounds: ['/m/', '/æ/', '/t/'],
              thai: 'เสื่อ / พรมเช็ดเท้า',
              icon: '🧘'
            }
          },
          {
            id: 's1-3-4',
            type: 'reading_ladder',
            title: 'The Cat on the Mat',
            titleThai: 'แมวอยู่บนเสื่อ',
            instruction: 'Read each line step by step.',
            instructionThai: 'อ่านทีละขั้นจากคำสั้นสู่ประโยค',
            readingLadderData: {
              stages: [
                { text: 'A cat', thai: 'แมวหนึ่งตัว' },
                { text: 'The cat sat.', thai: 'แมวนั่งลงแล้ว' },
                { text: 'The cat sat on the mat.', thai: 'แมวนั่งอยู่บนเสื่อ' }
              ]
            }
          }
        ]
      },

      {
        id: 'L1-4',
        levelId: 1,
        lessonNumber: 4,
        title: 'Ending Sounds & Final Consonants',
        titleThai: 'เสียงลงท้าย (Final Consonants)',
        description: 'Crucial for Thai learners! Practice clearly pronouncing final -t, -p, -s, -d without dropping them.',
        descriptionThai: 'จุดสำคัญที่สุดของคนไทย! ฝึกออกเสียงพยัญชนะท้ายคำ -t, -p, -s, -d ให้ชัด ไม่กลืนเสียงหาย',
        icon: '🎯',
        durationMinutes: 30,
        objectives: [
          'Never drop final consonants',
          'Distinguish cap vs cat vs can',
          'Notice how final sounds change the word'
        ],
        objectivesThai: [
          'ไม่ตัดเสียงสะกดท้ายคำในภาษาอังกฤษ',
          'แยกแยะความต่างระหว่าง cap, cat, can',
          'เข้าใจว่าเสียงท้ายเปลี่ยน ความหมายก็เปลี่ยน'
        ],
        steps: [
          {
            id: 's1-4-1',
            type: 'sound_discriminate',
            title: 'Final Consonant: /t/ vs /p/',
            titleThai: 'เสียงลงท้าย /t/ หรือ /p/?',
            instruction: 'Which word ends with the /t/ sound?',
            instructionThai: 'คำไหนลงท้ายด้วยเสียง /t/?',
            soundOptions: {
              targetSound: 'ending /t/',
              soundPrompt: 'Find the word that ends with /t/',
              soundPromptThai: 'เลือกคำที่ลงท้ายด้วยเสียง /t/',
              options: [
                { word: 'cat', thai: 'แมว (ลงท้ายด้วย /t/)', icon: '🐱', isCorrect: true, soundExplanationThai: 'ถูกต้อง! cat ลงท้ายด้วยเสียง /t/' },
                { word: 'cap', thai: 'หมวก (ลงท้ายด้วย /p/)', icon: '🧢', isCorrect: false, soundExplanationThai: 'cap ลงท้ายด้วยเสียง /p/ ริมฝีปาก' },
                { word: 'can', thai: 'กระป๋อง (ลงท้ายด้วย /n/)', icon: '🥫', isCorrect: false, soundExplanationThai: 'can ลงท้ายด้วยเสียง /n/ จมูก' }
              ]
            }
          },
          {
            id: 's1-4-2',
            type: 'quiz_multiple_choice',
            title: 'Thai Learner Tip',
            titleThai: 'ข้อควรระวังสำหรับผู้เรียนไทย',
            instruction: 'In English, what happens if you forget to pronounce the final sound?',
            instructionThai: 'ในภาษาอังกฤษ ถ้าเราไม่ยอมออกเสียงพยัญชนะท้าย จะเกิดอะไรขึ้น?',
            quizData: {
              question: 'Why are final sounds important?',
              questionThai: 'ทำไมเสียงลงท้ายจึงสำคัญมาก?',
              options: [
                { text: 'It can change the whole meaning or confuse listeners.', thai: 'ความหมายจะเปลี่ยน หรือชาวต่างชาติฟังไม่ออก', icon: '💡', isCorrect: true },
                { text: 'Final sounds do not matter.', thai: 'ไม่สำคัญเลย จะออกหรือไม่ก็ได้', icon: '❌', isCorrect: false }
              ],
              explanationThai: 'เช่น cat (แมว) กับ cap (หมวก) ต่างกันแค่เสียงลงท้ายเท่านั้น!'
            }
          }
        ]
      },

      {
        id: 'L1-5',
        levelId: 1,
        lessonNumber: 5,
        title: 'Syllables & Clapping Game',
        titleThai: 'จังหวะพยางค์และการนับเสียง (Syllables)',
        description: 'Understand syllables by clapping: CAT (1 clap), AP-PLE (2 claps), BA-NA-NA (3 claps).',
        descriptionThai: 'เรียนรู้พยางค์คำผ่านการปรบมือจังหวะ: 1 พยางค์, 2 พยางค์, 3 พยางค์',
        icon: '👏',
        durationMinutes: 25,
        objectives: ['Count syllables by clapping', 'Identify 1, 2, and 3 syllable words', 'Rhythm and natural stress'],
        objectivesThai: ['นับจำนวนพยางค์ด้วยการปรบมือได้', 'บอกได้ว่าคำมีกี่พยางค์', 'เข้าใจจังหวะการลงน้ำหนักคำ'],
        steps: [
          {
            id: 's1-5-1',
            type: 'syllable_clapper',
            title: 'Syllable Clap: CAT',
            titleThai: 'ปรบมือนับพยางค์: CAT',
            instruction: 'How many syllables in CAT? Clap and click!',
            instructionThai: 'คำว่า CAT มีกี่พยางค์? ลองปรบมือแล้วเลือกจำนวน',
            syllableData: {
              word: 'CAT',
              thai: 'แมว',
              icon: '🐱',
              count: 1,
              syllableBreak: 'cat (1 clap)'
            }
          },
          {
            id: 's1-5-2',
            type: 'syllable_clapper',
            title: 'Syllable Clap: AP-PLE',
            titleThai: 'ปรบมือนับพยางค์: AP-PLE',
            instruction: 'How many syllables in AP-PLE? Clap and click!',
            instructionThai: 'คำว่า AP-PLE มีกี่พยางค์? ลองปรบมือ 2 ครั้ง',
            syllableData: {
              word: 'APPLE',
              thai: 'แอปเปิล',
              icon: '🍎',
              count: 2,
              syllableBreak: 'ap · ple (2 claps)'
            }
          },
          {
            id: 's1-5-3',
            type: 'syllable_clapper',
            title: 'Syllable Clap: BA-NA-NA',
            titleThai: 'ปรบมือนับพยางค์: BA-NA-NA',
            instruction: 'How many syllables in BA-NA-NA? Clap and click!',
            instructionThai: 'คำว่า BA-NA-NA มีกี่พยางค์? ลองปรบมือ 3 ครั้ง',
            syllableData: {
              word: 'BANANA',
              thai: 'กล้วย',
              icon: '🍌',
              count: 3,
              syllableBreak: 'ba · na · na (3 claps)'
            }
          }
        ]
      },

      {
        id: 'L1-6',
        levelId: 1,
        lessonNumber: 6,
        title: 'Short vs Long Vowels (Magic E)',
        titleThai: 'สระสั้น vs สระยาว (Magic E)',
        description: 'See how adding letter E changes short /æ/ to long /eɪ/: cap → cape, tap → tape.',
        descriptionThai: 'ดูความอัศจรรย์ของตัว E ที่เปลี่ยนสระสั้นเป็นสระยาว',
        icon: '🪄',
        durationMinutes: 30,
        objectives: ['Recognize short /æ/ vs long /eɪ/', 'Understand Magic E rule', 'Read paired words accurately'],
        objectivesThai: ['แยกเสียงสระสั้นและสระยาวได้', 'เข้าใจกฎตัว E วิเศษ', 'อ่านคำคู่เทียบได้อย่างถูกต้อง'],
        steps: [
          {
            id: 's1-6-1',
            type: 'sound_intro',
            title: 'Short A vs Long A',
            titleThai: 'เปรียบเทียบเสียง สระแอะ กับ สระเอ',
            instruction: 'Listen to the difference between cap (หมวก) and cape (ผ้าคลุม).',
            instructionThai: 'ฟังความแตกต่างระหว่างเสียง cap กับ cape',
            soundData: {
              letter: 'A vs A_E',
              name: 'Vowel Shift',
              ipa: '/æ/ vs /eɪ/',
              thaiSoundHint: 'แอะ vs เอ',
              thaiExplanation: 'เมื่อมีตัว e อยู่ข้างหลัง สระจะออกเสียงตามชื่อตัวอักษร คือเสียง "เอ"',
              sampleWord: 'tape',
              sampleWordThai: 'เทปใส / เทปกาว',
              sampleIcon: '📼'
            }
          },
          {
            id: 's1-6-2',
            type: 'quiz_multiple_choice',
            title: 'Magic E Check',
            titleThai: 'ทดสอบความเข้าใจ Magic E',
            instruction: 'Which word has the long /eɪ/ sound (like cape or tape)?',
            instructionThai: 'คำใดออกเสียงสระยาว (เสียง เอ)?',
            quizData: {
              question: 'Which word has the long /eɪ/ sound?',
              questionThai: 'คำใดออกเสียงสระยาว /eɪ/?',
              options: [
                { text: 'tape', thai: 'เทป (เสียงยาว เอ)', icon: '📼', isCorrect: true },
                { text: 'tap', thai: 'แตะ (เสียงสั้น แอะ)', icon: '🚰', isCorrect: false },
                { text: 'pat', thai: 'ลูบ (เสียงสั้น แอะ)', icon: '👋', isCorrect: false }
              ],
              explanationThai: 'tape มีตัว e ท้ายคำ ทำให้ตัว a ออกเสียงยาวเป็น "เอ" (เทป)'
            }
          }
        ]
      },

      {
        id: 'L1-7',
        levelId: 1,
        lessonNumber: 7,
        title: 'Consonant Blends (CCVC: stop, spot, step)',
        titleThai: 'พยัญชนะควบกล้ำต้นคำ (CCVC: stop, spot, step)',
        description: 'Practice 2 consonants together without vowel insertion. No "สะ-ท็อป", say "stop" smoothly!',
        descriptionThai: 'ฝึกออกเสียงควบกล้ำสองตัวติดกัน ไม่ใส่สระอะ เช่น ไม่พูด สะ-ท็อป แต่ควบเป็น stop!',
        icon: '🛑',
        durationMinutes: 30,
        objectives: ['Pronounce ST- blend smoothly', 'Read stop, spot, step, clap', 'Avoid adding extra Thai vowels'],
        objectivesThai: ['ออกเสียงควบ ST- ได้อย่างลื่นไหล', 'อ่านคำ stop, spot, step ได้ถูกต้อง', 'หลีกเลี่ยงการแทรกเสียงสระอะ'],
        steps: [
          {
            id: 's1-7-1',
            type: 'tpr_action',
            title: 'Action Command: STOP!',
            titleThai: 'คำสั่งแอ็กชัน: STOP!',
            instruction: 'Say "STOP!" and hold up your hand.',
            instructionThai: 'เปล่งเสียง "STOP!" พร้อมกับยกมือขึ้นทำท่าหยุด',
            tprData: {
              command: 'STOP!',
              thaiMeaning: 'หยุด!',
              icon: '🛑',
              actionPromptThai: 'ยกมือขวาขึ้น ควบเสียง s+t เป็น stop!'
            }
          },
          {
            id: 's1-7-2',
            type: 'quiz_multiple_choice',
            title: 'Pronunciation Tip',
            titleThai: 'เคล็ดลับการออกเสียง',
            instruction: 'How should you pronounce the word "STOP"?',
            instructionThai: 'เราควรออกเสียงคำว่า "STOP" อย่างไร?',
            quizData: {
              question: 'How to pronounce "STOP"?',
              questionThai: 'การออกเสียงที่ถูกต้องของ "STOP":',
              options: [
                { text: 'Smooth blend: /stɒp/ (สท็อพ)', thai: 'เสียงควบกล้ำต่อเนื่อง ไม่แยกสองคำ', icon: '✅', isCorrect: true },
                { text: 'Two words: "Sa - Top" (สะ-ท็อป)', thai: 'แยกเป็น 2 พยางค์มีสระอะคั่น', icon: '❌', isCorrect: false }
              ],
              explanationThai: 'ในภาษาอังกฤษ เสียง s และ t จะควบเข้าหากันทันที ไม่ต้องมีสระอะคั่นกลาง'
            }
          }
        ]
      },

      {
        id: 'L1-8',
        levelId: 1,
        lessonNumber: 8,
        title: 'Level 1 Phonics Mastery Checkpoint',
        titleThai: 'การทดสอบวัดผลรวมโฟนิกส์ระดับที่ 1',
        description: 'Demonstrate your sound blending, beginning sounds, ending sounds, and reading skills.',
        descriptionThai: 'ทดสอบประมวลความรู้โฟนิกส์ทั้งหมดเพื่อปลดล็อกระดับถัดไป',
        icon: '🏆',
        durationMinutes: 35,
        objectives: ['Score at least 75% on phonics mastery', 'Blend CVC words effortlessly', 'Identify word types and sounds'],
        objectivesThai: ['ทำคะแนนได้อย่างน้อย 75%', 'ผสมเสียงคำสามอักษรได้อย่างคล่องแคล่ว', 'แยกเสียงต้นและเสียงท้ายคำได้'],
        steps: [
          {
            id: 's1-8-1',
            type: 'quiz_multiple_choice',
            title: 'Question 1: Starting Sound',
            titleThai: 'ข้อที่ 1: เสียงขึ้นต้นคำ',
            instruction: 'Which word starts with the sound /p/?',
            instructionThai: 'คำไหนขึ้นต้นด้วยเสียง /p/?',
            quizData: {
              question: 'Which word starts with /p/?',
              questionThai: 'คำไหนขึ้นต้นด้วยเสียง /p/?',
              options: [
                { text: 'pen', thai: 'ปากกา (/p/)', icon: '🖊️', isCorrect: true },
                { text: 'sun', thai: 'พระอาทิตย์ (/s/)', icon: '☀️', isCorrect: false },
                { text: 'top', thai: 'ลูกข่าง (/t/)', icon: '🔝', isCorrect: false }
              ],
              explanationThai: 'pen ขึ้นต้นด้วยตัว P และเสียง /p/'
            }
          },
          {
            id: 's1-8-2',
            type: 'quiz_multiple_choice',
            title: 'Question 2: Ending Sound',
            titleThai: 'ข้อที่ 2: เสียงลงท้ายคำ',
            instruction: 'Which word ends with the sound /t/?',
            instructionThai: 'คำไหนลงท้ายด้วยเสียง /t/?',
            quizData: {
              question: 'Which word ends with /t/?',
              questionThai: 'คำไหนลงท้ายด้วยเสียง /t/?',
              options: [
                { text: 'cat', thai: 'แมว', icon: '🐱', isCorrect: true },
                { text: 'can', thai: 'กระป๋อง', icon: '🥫', isCorrect: false },
                { text: 'cap', thai: 'หมวก', icon: '🧢', isCorrect: false }
              ],
              explanationThai: 'cat ลงท้ายด้วยตัว t'
            }
          },
          {
            id: 's1-8-3',
            type: 'reading_ladder',
            title: 'Checkpoint Reading Passage',
            titleThai: 'ฝึกอ่านข้อความสรุปผล',
            instruction: 'Read this mini story with the words you have mastered!',
            instructionThai: 'อ่านเรื่องสั้นที่แต่งจากคำศัพท์ที่คุณได้เรียนรู้มาแล้ว',
            readingLadderData: {
              stages: [
                { text: 'A cat.', thai: 'แมวหนึ่งตัว' },
                { text: 'The cat sat.', thai: 'แมวนั่งลงแล้ว' },
                { text: 'The cat sat on the mat.', thai: 'แมวนั่งอยู่บนเสื่อ' },
                { text: 'Pat can tap the cat.', thai: 'แพตสามารถลูบแมวเบาๆ ได้' }
              ]
            }
          }
        ]
      }
    ]
  },

  // LEVEL 2: WORDS & VOCABULARY
  {
    id: 2,
    title: 'LEVEL 2 — WORDS & VOCABULARY',
    titleThai: 'คำศัพท์รอบตัวและการจำแนกคำ',
    tagline: 'Connect concrete objects, daily actions, and word types (Noun / Verb / Adjective)',
    taglineThai: 'เชื่อมโยงสิ่งของ กิริยาการกระทำ และเข้าใจประเภทของคำด้วยสีสัน',
    icon: '🧩',
    color: 'amber',
    lessons: [
      {
        id: 'L2-1',
        levelId: 2,
        lessonNumber: 1,
        title: 'Animals & Nature',
        titleThai: 'สัตว์และธรรมชาติรอบตัว',
        description: 'Learn core animal words: dog, cat, bird, fish, sun, tree with full audio and sentences.',
        descriptionThai: 'คำศัพท์สัตว์และสิ่งแวดล้อม: สุนัข แมว นก ปลา พระอาทิตย์ ต้นไม้',
        icon: '🐶',
        durationMinutes: 25,
        objectives: ['Learn 6 core nature words', 'Say simple sentences with each word', 'Match pictures to words'],
        objectivesThai: ['จดจำคำศัพท์ธรรมชาติ 6 คำ', 'พูดประโยคสั้นๆ กับแต่ละคำได้', 'จับคู่คำกับภาพได้อย่างแม่นยำ'],
        steps: [
          {
            id: 's2-1-1',
            type: 'vocab_intro',
            title: 'Vocabulary: DOG',
            titleThai: 'คำศัพท์: DOG (สุนัข)',
            instruction: 'Click Listen to hear the word and the example sentence.',
            instructionThai: 'คลิกปุ่ม Listen เพื่อฟังเสียงคำศัพท์และประโยคตัวอย่าง',
            vocabData: VOCABULARY_LIBRARY[1]
          },
          {
            id: 's2-1-2',
            type: 'vocab_intro',
            title: 'Vocabulary: CAT',
            titleThai: 'คำศัพท์: CAT (แมว)',
            instruction: 'Listen to CAT and its example sentence.',
            instructionThai: 'ฟังคำว่า CAT และประโยค The cat sleeps.',
            vocabData: VOCABULARY_LIBRARY[2]
          },
          {
            id: 's2-1-3',
            type: 'quiz_multiple_choice',
            title: 'Animal Picture Match',
            titleThai: 'ทายคำศัพท์จากภาพ',
            instruction: 'What is this animal? 🐶',
            instructionThai: 'สัตว์ในภาพนี้คืออะไร? 🐶',
            quizData: {
              question: 'What is this animal? 🐶',
              questionThai: 'สัตว์ในภาพนี้คืออะไร?',
              options: [
                { text: 'DOG', thai: 'สุนัข', icon: '🐶', isCorrect: true },
                { text: 'CAT', thai: 'แมว', icon: '🐱', isCorrect: false },
                { text: 'FISH', thai: 'ปลา', icon: '🐟', isCorrect: false }
              ],
              explanationThai: '🐶 คือ DOG (สุนัข)'
            }
          }
        ]
      },

      {
        id: 'L2-2',
        levelId: 2,
        lessonNumber: 2,
        title: 'Food & Daily Drinks',
        titleThai: 'อาหารและเครื่องดื่มในชีวิตประจำวัน',
        description: 'Rice, water, apple, banana, bread, milk. Learn words you see every single day!',
        descriptionThai: 'ข้าว น้ำ แอปเปิล กล้วย ขนมปัง นม คำศัพท์ที่เราใช้ทุกมื้อ',
        icon: '🍚',
        durationMinutes: 25,
        objectives: ['Express what you eat and drink', 'Learn rice, water, apple, banana', 'Use "I eat..." and "I drink..."'],
        objectivesThai: ['บอกสิ่งที่เรากินและดื่มได้', 'รู้คำศัพท์ข้าว น้ำ แอปเปิล กล้วย', 'ใช้โครงสร้าง I eat... และ I drink...'],
        steps: [
          {
            id: 's2-2-1',
            type: 'vocab_intro',
            title: 'Vocabulary: RICE',
            titleThai: 'คำศัพท์: RICE (ข้าว)',
            instruction: 'Listen to the word RICE and how to use it.',
            instructionThai: 'ฟังคำว่า RICE และประโยค "We eat rice every day."',
            vocabData: VOCABULARY_LIBRARY[7]
          },
          {
            id: 's2-2-2',
            type: 'vocab_intro',
            title: 'Vocabulary: WATER',
            titleThai: 'คำศัพท์: WATER (น้ำดื่ม)',
            instruction: 'Listen to the word WATER and "I drink water."',
            instructionThai: 'ฟังคำว่า WATER และประโยค "I drink water."',
            vocabData: VOCABULARY_LIBRARY[6]
          },
          {
            id: 's2-2-3',
            type: 'sentence_builder',
            title: 'Build: I eat rice',
            titleThai: 'สร้างประโยค: ฉันกินข้าว',
            instruction: 'Arrange: I + eat + rice.',
            instructionThai: 'เรียงคำในช่อง: I + eat + rice.',
            sentenceData: {
              targetSentence: 'I eat rice.',
              targetThai: 'ฉันกินข้าว',
              blocks: [
                { id: 'b1', text: 'I', role: 'who', thaiHint: 'ฉัน (ประธาน)' },
                { id: 'b2', text: 'eat', role: 'action', thaiHint: 'กิน (กริยา)' },
                { id: 'b3', text: 'rice', role: 'thing', thaiHint: 'ข้าว (กรรม)' }
              ],
              correctOrder: ['I', 'eat', 'rice']
            }
          }
        ]
      },

      {
        id: 'L2-3',
        levelId: 2,
        lessonNumber: 3,
        title: 'Actions & Daily Verbs',
        titleThai: 'คำกริยาและการกระทำ (Actions & Verbs)',
        description: 'Verbs bring language to life! Eat, drink, run, walk, sleep, read.',
        descriptionThai: 'คำกริยาคือการกระทำ: กิน ดื่ม วิ่ง เดิน นอน อ่านหนังสือ',
        icon: '🏃',
        durationMinutes: 30,
        objectives: ['Identify action words (verbs)', 'Use verbs in real sentences', 'Match movements to verbs'],
        objectivesThai: ['จำแนกคำบอกการกระทำ (กริยา) ได้', 'ใช้กริยาในประโยคจริงได้', 'ทำท่าทางประกอบคำกริยาได้'],
        steps: [
          {
            id: 's2-3-1',
            type: 'vocab_intro',
            title: 'Action: RUN',
            titleThai: 'กริยา: RUN (วิ่ง)',
            instruction: 'Listen to the verb RUN and see how it works in a sentence.',
            instructionThai: 'ฟังคำกริยา RUN และประโยคตัวอย่าง "I run in the park."',
            vocabData: VOCABULARY_LIBRARY[8]
          },
          {
            id: 's2-3-2',
            type: 'tpr_action',
            title: 'Physical Action: WALK!',
            titleThai: 'ขยับท่าทาง: WALK! (เดิน)',
            instruction: 'Walk on the spot and say "I walk!"',
            instructionThai: 'ก้าวเท้าเดินอยู่กับที่แล้วพูดว่า "I walk!"',
            tprData: {
              command: 'WALK!',
              thaiMeaning: 'เดิน!',
              icon: '🚶',
              actionPromptThai: 'ก้าวเท้าสลับกันเหมือนกำลังเดิน'
            }
          },
          {
            id: 's2-3-3',
            type: 'sentence_builder',
            title: 'Build: The dog runs',
            titleThai: 'สร้างประโยค: สุนัขวิ่ง',
            instruction: 'Arrange: The + dog + runs.',
            instructionThai: 'เรียงคำ: The + dog + runs.',
            sentenceData: {
              targetSentence: 'The dog runs.',
              targetThai: 'สุนัขวิ่ง',
              blocks: [
                { id: 'b1', text: 'The', role: 'extra', thaiHint: 'ชี้เฉพาะ' },
                { id: 'b2', text: 'dog', role: 'who', thaiHint: 'สุนัข' },
                { id: 'b3', text: 'runs', role: 'action', thaiHint: 'วิ่ง' }
              ],
              correctOrder: ['The', 'dog', 'runs']
            }
          }
        ]
      },

      {
        id: 'L2-4',
        levelId: 2,
        lessonNumber: 4,
        title: 'Describing Things: Adjectives',
        titleThai: 'คำคุณศัพท์บอกลักษณะ (Adjectives: big, happy, hot)',
        description: 'Learn how to describe things: big elephant, happy boy, hot sun.',
        descriptionThai: 'เรียนรู้วิธีบอกลักษณะของสิ่งต่างๆ: ช้างตัวใหญ่ เด็กมีความสุข แดดร้อน',
        icon: '🎨',
        durationMinutes: 25,
        objectives: ['Learn adjectives big, small, hot, happy', 'Place adjective before noun or after is', 'Expand sentences'],
        objectivesThai: ['รู้จักคำคุณศัพท์ big, small, hot, happy', 'วางคำคุณศัพท์หน้าคำนามหรือหลัง is', 'แต่งประโยคให้เห็นภาพชัดเจน'],
        steps: [
          {
            id: 's2-4-1',
            type: 'vocab_intro',
            title: 'Adjective: BIG',
            titleThai: 'คำคุณศัพท์: BIG (ใหญ่)',
            instruction: 'Listen to BIG and "The elephant is big."',
            instructionThai: 'ฟังคำว่า BIG และประโยค "The elephant is big."',
            vocabData: VOCABULARY_LIBRARY[11]
          },
          {
            id: 's2-4-2',
            type: 'sentence_builder',
            title: 'Build: The cat is big',
            titleThai: 'สร้างประโยค: แมวตัวใหญ่',
            instruction: 'Arrange: The + cat + is + big.',
            instructionThai: 'เรียงคำ: The + cat + is + big.',
            sentenceData: {
              targetSentence: 'The cat is big.',
              targetThai: 'แมวตัวใหญ่',
              blocks: [
                { id: 'b1', text: 'The', role: 'extra', thaiHint: 'ตัวนั้น' },
                { id: 'b2', text: 'cat', role: 'who', thaiHint: 'แมว' },
                { id: 'b3', text: 'is', role: 'action', thaiHint: 'คือ/เป็น' },
                { id: 'b4', text: 'big', role: 'thing', thaiHint: 'ตัวใหญ่' }
              ],
              correctOrder: ['The', 'cat', 'is', 'big']
            }
          }
        ]
      },

      {
        id: 'L2-5',
        levelId: 2,
        lessonNumber: 5,
        title: 'Word Types Sorter (Noun, Verb, Adjective)',
        titleThai: 'จำแนกประเภทคำ: คำนาม, คำกริยา, คำคุณศัพท์',
        description: 'Understand grammar visually with color coding: NOUN (things), VERB (actions), ADJECTIVE (descriptions).',
        descriptionThai: 'เข้าใจไวยากรณ์ผ่านสี: คำนาม (ส้ม), คำกริยา (เขียว), คำคุณศัพท์ (ฟ้า)',
        icon: '🏷️',
        durationMinutes: 30,
        objectives: ['Categorize words by type', 'Recognize NOUN = person/place/thing', 'Recognize VERB = action'],
        objectivesThai: ['แยกประเภทคำได้ถูกต้อง', 'เข้าใจว่า NOUN คือ คน สัตว์ สิ่งของ', 'เข้าใจว่า VERB คือ กิริยาการกระทำ'],
        steps: [
          {
            id: 's2-5-1',
            type: 'word_type_sort',
            title: 'Sort the Words',
            titleThai: 'ลากหรือเลือกคำใส่กล่องประเภท',
            instruction: 'Identify which word is a Noun, Verb, or Adjective.',
            instructionThai: 'บอกว่าคำต่อไปนี้เป็นคำนาม คำกริยา หรือคำคุณศัพท์',
            wordTypeData: {
              words: [
                { word: 'dog', thai: 'สุนัข (สิ่งมีชีวิต)', icon: '🐶', type: 'noun' },
                { word: 'run', thai: 'วิ่ง (การกระทำ)', icon: '🏃', type: 'verb' },
                { word: 'big', thai: 'ใหญ่ (บอกลักษณะ)', icon: '🐘', type: 'adjective' },
                { word: 'eat', thai: 'กิน (การกระทำ)', icon: '🍽️', type: 'verb' },
                { word: 'apple', thai: 'แอปเปิล (สิ่งของ)', icon: '🍎', type: 'noun' }
              ]
            }
          },
          {
            id: 's2-5-2',
            type: 'quiz_multiple_choice',
            title: 'Word Type Check',
            titleThai: 'ตรวจสอบความเข้าใจประเภทคำ',
            instruction: 'What type of word is "RUN"?',
            instructionThai: '"RUN" (วิ่ง) จัดเป็นคำประเภทใด?',
            quizData: {
              question: '"RUN" is which word type?',
              questionThai: '"RUN" คือคำประเภทใด?',
              options: [
                { text: 'VERB (Action)', thai: 'คำกริยา (บอกการกระทำ)', icon: '🏃', isCorrect: true },
                { text: 'NOUN (Person/Thing)', thai: 'คำนาม (คน/สิ่งของ)', icon: '📦', isCorrect: false },
                { text: 'ADJECTIVE (Description)', thai: 'คำคุณศัพท์ (บอกลักษณะ)', icon: '🎨', isCorrect: false }
              ],
              explanationThai: 'RUN แปลว่า วิ่ง ซึ่งเป็นการกระทำ จึงจัดเป็นคำกริยา (Verb)'
            }
          }
        ]
      }
    ]
  },

  // LEVEL 3: SENTENCE BUILDING
  {
    id: 3,
    title: 'LEVEL 3 — SENTENCE BUILDING',
    titleThai: 'การประกอบประโยคอย่างเป็นระบบ',
    tagline: 'Master WHO + ACTION + THING block logic',
    taglineThai: 'ฝึกเรียงลำดับประโยค ประธาน + กริยา + กรรม อย่างมั่นใจ',
    icon: '📝',
    color: 'emerald',
    lessons: [
      {
        id: 'L3-1',
        levelId: 3,
        lessonNumber: 1,
        title: 'Stage 1: WHO + ACTION (Simple Sentences)',
        titleThai: 'ขั้นที่ 1: ใคร + ทำอะไร (WHO + ACTION)',
        description: 'Start with the simplest 2-part sentences: I eat. Dogs run. Birds fly.',
        descriptionThai: 'เริ่มต้นด้วยประโยค 2 ส่วนที่เรียบง่ายที่สุด: ฉันกิน สุนัขวิ่ง นกบิน',
        icon: '🧱',
        durationMinutes: 25,
        objectives: ['Construct 2-word sentences', 'Connect subject to verb', 'Pronounce complete thoughts'],
        objectivesThai: ['สร้างประโยค 2 คำได้ถูกต้อง', 'เชื่อมประธานเข้ากับกริยา', 'เปล่งเสียงประโยคสมบูรณ์'],
        steps: [
          {
            id: 's3-1-1',
            type: 'sentence_builder',
            title: 'Build: I eat',
            titleThai: 'สร้างประโยค: ฉันกิน',
            instruction: 'Arrange: I + eat.',
            instructionThai: 'เรียงคำ: I (ใคร) + eat (ทำอะไร)',
            sentenceData: {
              targetSentence: 'I eat.',
              targetThai: 'ฉันกิน',
              blocks: [
                { id: 'b1', text: 'I', role: 'who', thaiHint: 'ฉัน (WHO)' },
                { id: 'b2', text: 'eat', role: 'action', thaiHint: 'กิน (ACTION)' }
              ],
              correctOrder: ['I', 'eat']
            }
          },
          {
            id: 's3-1-2',
            type: 'sentence_builder',
            title: 'Build: Dogs run',
            titleThai: 'สร้างประโยค: สุนัขวิ่ง',
            instruction: 'Arrange: Dogs + run.',
            instructionThai: 'เรียงคำ: Dogs (ใคร) + run (ทำอะไร)',
            sentenceData: {
              targetSentence: 'Dogs run.',
              targetThai: 'สุนัขวิ่ง',
              blocks: [
                { id: 'b1', text: 'Dogs', role: 'who', thaiHint: 'สุนัขทั้งหลาย' },
                { id: 'b2', text: 'run', role: 'action', thaiHint: 'วิ่ง' }
              ],
              correctOrder: ['Dogs', 'run']
            }
          }
        ]
      },

      {
        id: 'L3-2',
        levelId: 3,
        lessonNumber: 2,
        title: 'Stage 2: WHO + ACTION + THING',
        titleThai: 'ขั้นที่ 2: ใคร + ทำอะไร + กับสิ่งไหน (S + V + O)',
        description: 'Add the object: I eat rice. She likes apples. They play football.',
        descriptionThai: 'เพิ่มกรรมของประโยค: ฉันกินข้าว เธอชอบแอปเปิล พวกเขาเล่นฟุตบอล',
        icon: '📦',
        durationMinutes: 30,
        objectives: ['Master SVO sentence structure', 'Compare English word order with Thai', 'Build 5 different sentences'],
        objectivesThai: ['เข้าใจโครงสร้าง ประธาน + กริยา + กรรม', 'เปรียบเทียบการเรียงคำกับภาษาไทย', 'แต่งประโยคได้หลากหลาย'],
        steps: [
          {
            id: 's3-2-1',
            type: 'sentence_builder',
            title: 'Build: I eat rice',
            titleThai: 'สร้างประโยค: I eat rice',
            instruction: 'Arrange: WHO (I) + ACTION (eat) + THING (rice).',
            instructionThai: 'เรียงคำ: I + eat + rice.',
            sentenceData: {
              targetSentence: 'I eat rice.',
              targetThai: 'ฉันกินข้าว',
              blocks: [
                { id: 'b1', text: 'I', role: 'who', thaiHint: 'ฉัน (WHO)' },
                { id: 'b2', text: 'eat', role: 'action', thaiHint: 'กิน (ACTION)' },
                { id: 'b3', text: 'rice', role: 'thing', thaiHint: 'ข้าว (THING)' }
              ],
              correctOrder: ['I', 'eat', 'rice']
            }
          },
          {
            id: 's3-2-2',
            type: 'sentence_builder',
            title: 'Build: She likes apples',
            titleThai: 'สร้างประโยค: เธอชอบแอปเปิล',
            instruction: 'Arrange: She + likes + apples.',
            instructionThai: 'เรียงคำ: She + likes + apples.',
            sentenceData: {
              targetSentence: 'She likes apples.',
              targetThai: 'เธอชอบแอปเปิล',
              blocks: [
                { id: 'b1', text: 'She', role: 'who', thaiHint: 'เธอ (WHO)' },
                { id: 'b2', text: 'likes', role: 'action', thaiHint: 'ชอบ (ACTION)' },
                { id: 'b3', text: 'apples', role: 'thing', thaiHint: 'แอปเปิล (THING)' }
              ],
              correctOrder: ['She', 'likes', 'apples']
            }
          }
        ]
      },

      {
        id: 'L3-3',
        levelId: 3,
        lessonNumber: 3,
        title: 'Stage 3: Adding WHERE & WHEN',
        titleThai: 'ขั้นที่ 3: เพิ่มสถานที่และเวลา (at home, every day)',
        description: 'Expand your sentences: I eat rice at home. She reads books every day.',
        descriptionThai: 'ขยายประโยคให้สมบูรณ์ขึ้น: ฉันกินข้าวที่บ้าน เธออ่านหนังสือทุกวัน',
        icon: '🏡',
        durationMinutes: 30,
        objectives: ['Add location prepositions (at home, in the park)', 'Add frequency (every day)', 'Build complex thoughts'],
        objectivesThai: ['ใส่คำบอกสถานที่ได้ถูกต้อง', 'ใส่คำบอกเวลาได้เป็นธรรมชาติ', 'สร้างประโยคที่ให้ข้อมูลครบถ้วน'],
        steps: [
          {
            id: 's3-3-1',
            type: 'sentence_builder',
            title: 'Build: I eat rice at home',
            titleThai: 'สร้างประโยค: ฉันกินข้าวที่บ้าน',
            instruction: 'Arrange: I + eat + rice + at home.',
            instructionThai: 'เรียงคำ: I + eat + rice + at home.',
            sentenceData: {
              targetSentence: 'I eat rice at home.',
              targetThai: 'ฉันกินข้าวที่บ้าน',
              blocks: [
                { id: 'b1', text: 'I', role: 'who', thaiHint: 'ฉัน' },
                { id: 'b2', text: 'eat', role: 'action', thaiHint: 'กิน' },
                { id: 'b3', text: 'rice', role: 'thing', thaiHint: 'ข้าว' },
                { id: 'b4', text: 'at home', role: 'extra', thaiHint: 'ที่บ้าน' }
              ],
              correctOrder: ['I', 'eat', 'rice', 'at home']
            }
          }
        ]
      },

      {
        id: 'L3-4',
        levelId: 3,
        lessonNumber: 4,
        title: 'Stage 4: Negative Sentences (do not / does not)',
        titleThai: 'ขั้นที่ 4: ประโยคปฏิเสธ (do not / does not)',
        description: 'How to say NO in English: I do not eat meat. He does not run.',
        descriptionThai: 'การสร้างประโยคปฏิเสธอย่างถูกต้องในภาษาอังกฤษ',
        icon: '🛑',
        durationMinutes: 25,
        objectives: ['Use "do not" for I/You/We/They', 'Use "does not" for He/She/It', 'Express things you do not do'],
        objectivesThai: ['ใช้ do not กับ I/You/We/They', 'ใช้ does not กับ He/She/It', 'บอกสิ่งที่เราไม่ทำได้อย่างถูกต้อง'],
        steps: [
          {
            id: 's3-4-1',
            type: 'sentence_builder',
            title: 'Build: I do not run',
            titleThai: 'สร้างประโยค: ฉันไม่ได้วิ่ง',
            instruction: 'Arrange: I + do not + run.',
            instructionThai: 'เรียงคำ: I + do not + run.',
            sentenceData: {
              targetSentence: 'I do not run.',
              targetThai: 'ฉันไม่ได้วิ่ง',
              blocks: [
                { id: 'b1', text: 'I', role: 'who', thaiHint: 'ฉัน' },
                { id: 'b2', text: 'do not', role: 'action', thaiHint: 'ไม่' },
                { id: 'b3', text: 'run', role: 'action', thaiHint: 'วิ่ง' }
              ],
              correctOrder: ['I', 'do not', 'run']
            }
          }
        ]
      },

      {
        id: 'L3-5',
        levelId: 3,
        lessonNumber: 5,
        title: 'Sentence Building Master Challenge',
        titleThai: 'ความท้าทายประมวลผลการสร้างประโยค',
        description: 'Put all stages together! Unscramble, build, and read complete thoughts.',
        descriptionThai: 'ทดสอบรวมการแต่งประโยคทุกขั้น เพื่อวัดผลความเข้าใจอย่างแท้จริง',
        icon: '🌟',
        durationMinutes: 30,
        objectives: ['Score at least 75% on sentence building', 'Arrange multi-part blocks with ease', 'Fluency in English word order'],
        objectivesThai: ['ผ่านเกณฑ์อย่างน้อย 75%', 'เรียงประโยคหลายส่วนได้อย่างคล่องแคล่ว', 'เข้าใจลำดับคำแบบภาษาอังกฤษ'],
        steps: [
          {
            id: 's3-5-1',
            type: 'sentence_builder',
            title: 'Challenge: They play football in the park',
            titleThai: 'โจทย์ท้าทาย: พวกเขาเล่นฟุตบอลในสวน',
            instruction: 'Arrange all blocks in proper order.',
            instructionThai: 'เรียงบล็อกคำทั้งหมดให้ถูกต้องตามหลักภาษาอังกฤษ',
            sentenceData: {
              targetSentence: 'They play football in the park.',
              targetThai: 'พวกเขาเล่นฟุตบอลในสวน',
              blocks: [
                { id: 'b1', text: 'They', role: 'who', thaiHint: 'พวกเขา' },
                { id: 'b2', text: 'play', role: 'action', thaiHint: 'เล่น' },
                { id: 'b3', text: 'football', role: 'thing', thaiHint: 'ฟุตบอล' },
                { id: 'b4', text: 'in the park', role: 'extra', thaiHint: 'ในสวน' }
              ],
              correctOrder: ['They', 'play', 'football', 'in the park']
            }
          },
          {
            id: 's3-5-2',
            type: 'quiz_multiple_choice',
            title: 'Word Order Rule',
            titleThai: 'กฎลำดับคำในภาษาอังกฤษ',
            instruction: 'In English, which order is correct?',
            instructionThai: 'ในภาษาอังกฤษ ลำดับใดถูกต้อง?',
            quizData: {
              question: 'Which order is standard English?',
              questionThai: 'ลำดับคำมาตรฐานในภาษาอังกฤษ:',
              options: [
                { text: 'WHO + ACTION + THING (I eat rice)', thai: 'ประธาน + กริยา + กรรม', icon: '✅', isCorrect: true },
                { text: 'ACTION + WHO + THING (Eat I rice)', thai: 'กริยา + ประธาน + กรรม', icon: '❌', isCorrect: false },
                { text: 'THING + ACTION + WHO (Rice eat I)', thai: 'กรรม + กริยา + ประธาน', icon: '❌', isCorrect: false }
              ],
              explanationThai: 'ภาษาอังกฤษเรียง: ประธาน (Who) + กริยา (Action) + กรรม (Thing)'
            }
          }
        ]
      }
    ]
  },

  // LEVEL 4: BASIC GRAMMAR
  {
    id: 4,
    title: 'LEVEL 4 — BASIC GRAMMAR',
    titleThai: 'ไวยากรณ์พื้นฐานที่จำเป็น',
    tagline: 'Pronouns, Verb To Be (is/am/are), Have/Has, and Articles',
    taglineThai: 'สรรพนาม กริยา Verb to be คำบอกความเป็นเจ้าของ และคำนำหน้านาม a/an',
    icon: '📚',
    color: 'purple',
    lessons: [
      {
        id: 'L4-1',
        levelId: 4,
        lessonNumber: 1,
        title: 'Pronouns & Verb To Be (am, is, are)',
        titleThai: 'สรรพนามและ Verb to be (is, am, are)',
        description: 'Master pairings: I am, You are, He is, She is, It is, We are, They are.',
        descriptionThai: 'จับคู่สรรพนามกับรูปกริยาได้อย่างแม่นยำไม่มีสะดุด',
        icon: '👥',
        durationMinutes: 30,
        objectives: ['Match subject to is/am/are', 'Understand singular vs plural subjects', 'Say sentences with feeling'],
        objectivesThai: ['จับคู่ประธานกับ is/am/are ได้ถูกต้อง', 'เข้าใจประธานเอกพจน์และพหูพจน์', 'ออกเสียงประโยคได้อย่างเป็นธรรมชาติ'],
        steps: [
          {
            id: 's4-1-1',
            type: 'sentence_builder',
            title: 'Build: I am happy',
            titleThai: 'สร้างประโยค: ฉันมีความสุข',
            instruction: 'Arrange: I + am + happy.',
            instructionThai: 'เรียงคำ: I + am + happy.',
            sentenceData: {
              targetSentence: 'I am happy.',
              targetThai: 'ฉันมีความสุข',
              blocks: [
                { id: 'b1', text: 'I', role: 'who', thaiHint: 'ฉัน' },
                { id: 'b2', text: 'am', role: 'action', thaiHint: 'เป็น/อยู่' },
                { id: 'b3', text: 'happy', role: 'thing', thaiHint: 'มีความสุข' }
              ],
              correctOrder: ['I', 'am', 'happy']
            }
          },
          {
            id: 's4-1-2',
            type: 'sentence_builder',
            title: 'Build: She is a student',
            titleThai: 'สร้างประโยค: เธอเป็นนักเรียน',
            instruction: 'Arrange: She + is + a student.',
            instructionThai: 'เรียงคำ: She + is + a student.',
            sentenceData: {
              targetSentence: 'She is a student.',
              targetThai: 'เธอเป็นนักเรียน',
              blocks: [
                { id: 'b1', text: 'She', role: 'who', thaiHint: 'เธอ' },
                { id: 'b2', text: 'is', role: 'action', thaiHint: 'เป็น' },
                { id: 'b3', text: 'a student', role: 'thing', thaiHint: 'นักเรียนหนึ่งคน' }
              ],
              correctOrder: ['She', 'is', 'a student']
            }
          }
        ]
      }
    ]
  },

  // LEVEL 5: SPEAKING & QUESTIONS
  {
    id: 5,
    title: 'LEVEL 5 — SPEAKING & QUESTIONS',
    titleThai: 'การตั้งคำถามและการพูดสื่อสาร',
    tagline: 'What? Who? Where? When? Why? How? + Real Questions',
    taglineThai: 'สร้างประโยคคำถามเพื่อหาคำตอบในชีวิตจริง',
    icon: '❓',
    color: 'indigo',
    lessons: [
      {
        id: 'L5-1',
        levelId: 5,
        lessonNumber: 1,
        title: 'Asking "What is this?" and "Where is it?"',
        titleThai: 'ถาม "นี่คืออะไร?" และ "อยู่ที่ไหน?"',
        description: 'Ask and answer basic questions with clarity.',
        descriptionThai: 'ฝึกถามและตอบคำถามเบื้องต้นในห้องเรียนและชีวิตประจำวัน',
        icon: '🔍',
        durationMinutes: 30,
        objectives: ['Ask "What is this?"', 'Answer "It is a..."', 'Ask "Where is the cat?"'],
        objectivesThai: ['ถาม What is this? ได้', 'ตอบ It is a... ได้', 'ถาม Where is... ได้'],
        steps: [
          {
            id: 's5-1-1',
            type: 'question_builder',
            title: 'Build Question: What is this?',
            titleThai: 'สร้างประโยคคำถาม: นี่คืออะไร?',
            instruction: 'Arrange: What + is + this + ?',
            instructionThai: 'เรียงคำเพื่อสร้างคำถาม: What + is + this + ?',
            questionData: {
              targetQuestion: 'What is this?',
              targetThai: 'นี่คืออะไร?',
              answer: 'It is a book.',
              answerThai: 'มันคือหนังสือหนึ่งเล่ม',
              blocks: ['What', 'is', 'this', '?'],
              correctOrder: ['What', 'is', 'this', '?']
            }
          }
        ]
      }
    ]
  },

  // LEVEL 6: READING & WRITING
  {
    id: 6,
    title: 'LEVEL 6 — READING & WRITING',
    titleThai: 'การพัฒนาการอ่านและเขียน',
    tagline: 'Step-by-step ladder from single words to complete stories',
    taglineThai: 'บันไดพัฒนาทักษะจากคำ สู่ประโยค และเรื่องราวที่อ่านเข้าใจได้เอง',
    icon: '📖',
    color: 'teal',
    lessons: [
      {
        id: 'L6-1',
        levelId: 6,
        lessonNumber: 1,
        title: 'Reading Ladder: Tom and His Dog',
        titleThai: 'บันไดการอ่าน: ทอมกับสุนัขของเขา',
        description: 'Read progressively: Tom → Tom has a dog → The dog is brown.',
        descriptionThai: 'อ่านทีละขั้นจากคำสั้นจนเข้าใจเรื่องสั้นได้ทั้งเรื่อง',
        icon: '🐕',
        durationMinutes: 30,
        objectives: ['Read with fluency', 'Click any word to hear pronunciation', 'Answer 3 comprehension questions'],
        objectivesThai: ['อ่านได้อย่างคล่องแคล่ว', 'กดฟังเสียงคำที่ไม่มั่นใจได้', 'ตอบคำถามความเข้าใจได้ถูกต้อง'],
        steps: [
          {
            id: 's6-1-1',
            type: 'reading_ladder',
            title: 'Tom and His Dog',
            titleThai: 'เรื่อง ทอมกับสุนัขของเขา',
            instruction: 'Read each line aloud. Click any line to listen.',
            instructionThai: 'ฝึกอ่านออกเสียงทีละบรรทัด คลิกเพื่อฟังเสียงได้ตลอดเวลา',
            readingLadderData: {
              stages: [
                { text: 'Tom is a boy.', thai: 'ทอมเป็นเด็กผู้ชาย' },
                { text: 'Tom has a dog.', thai: 'ทอมมีสุนัขหนึ่งตัว' },
                { text: 'The dog is brown and big.', thai: 'สุนัขตัวใหญ่และมีสีน้ำตาล' },
                { text: 'Tom likes to play with his dog.', thai: 'ทอมชอบเล่นกับสุนัขของเขา' }
              ]
            }
          }
        ]
      }
    ]
  },

  // LEVEL 7: PARAGRAPHS
  {
    id: 7,
    title: 'LEVEL 7 — PARAGRAPHS',
    titleThai: 'การสร้างย่อหน้า (Paragraph Builder)',
    tagline: 'Group sentences around one main idea with a topic sentence',
    taglineThai: 'รวมประโยคเข้าด้วยกันโดยมีประโยคใจความหลักและรายละเอียดสนับสนุน',
    icon: '📄',
    color: 'cyan',
    lessons: [
      {
        id: 'L7-1',
        levelId: 7,
        lessonNumber: 1,
        title: 'Building a Paragraph: My Dog Max',
        titleThai: 'การประกอบย่อหน้า: สุนัขของฉันชื่อแม็กซ์',
        description: 'Arrange sentences logically: Topic sentence → Supporting details → Conclusion.',
        descriptionThai: 'เรียนรู้โครงสร้างย่อหน้า: ประโยคเปิดใจความหลัก + ประโยคขยาย + ประโยคปิด',
        icon: '🐾',
        durationMinutes: 30,
        objectives: ['Understand what a paragraph is', 'Arrange 4 sentences in logical order', 'Read the full paragraph smoothly'],
        objectivesThai: ['เข้าใจความหมายของย่อหน้า', 'เรียงประโยค 4 ประโยคตามลำดับความคิด', 'อ่านย่อหน้ารวมได้อย่างสละสลวย'],
        steps: [
          {
            id: 's7-1-1',
            type: 'paragraph_builder',
            title: 'Paragraph Builder: My Dog Max',
            titleThai: 'ประกอบย่อหน้า: สุนัขของฉัน',
            instruction: 'Arrange the sentences in the right order to tell a clear story.',
            instructionThai: 'เรียงลำดับประโยคให้เป็นย่อหน้าที่สละสลวยและมีใจความชัดเจน',
            paragraphData: {
              topic: 'MY DOG MAX',
              topicThai: 'สุนัขของฉันชื่อแม็กซ์',
              explanationThai: 'ย่อหน้าคือกลุ่มประโยคที่พูดถึงความคิดหลักเดียวกัน โดยเริ่มจากประโยคเปิดใจความหลัก',
              sentences: [
                { id: 'p1', text: 'I have a pet dog.', thai: 'ฉันมีสัตว์เลี้ยงเป็นสุนัขตัวหนึ่ง' },
                { id: 'p2', text: 'His name is Max.', thai: 'เขาชื่อแม็กซ์' },
                { id: 'p3', text: 'He is brown and friendly.', thai: 'เขามีสีน้ำตาลและเป็นมิตรมาก' },
                { id: 'p4', text: 'He likes to play with me every day.', thai: 'เขาชอบเล่นกับฉันทุกๆ วัน' }
              ],
              correctOrder: ['p1', 'p2', 'p3', 'p4']
            }
          }
        ]
      }
    ]
  },

  // LEVEL 8: READING COMPREHENSION
  {
    id: 8,
    title: 'LEVEL 8 — READING COMPREHENSION',
    titleThai: 'การอ่านจับใจความ (Reading Comprehension)',
    tagline: 'Read short passages and answer who, what, where, and why',
    taglineThai: 'อ่านบทความสั้นและตอบคำถาม ใคร ทำอะไร ที่ไหน อย่างไร',
    icon: '🧐',
    color: 'rose',
    lessons: [
      {
        id: 'L8-1',
        levelId: 8,
        lessonNumber: 1,
        title: 'A Sunny Day at School',
        titleThai: 'วันแดดสดใสที่โรงเรียน',
        description: 'Read a short story and answer questions about the characters and actions.',
        descriptionThai: 'อ่านเรื่องราวสั้นๆ แล้วตอบคำถามเพื่อทดสอบความเข้าใจ',
        icon: '🏫',
        durationMinutes: 30,
        objectives: ['Identify main characters', 'Locate specific details in the text', 'Infer feelings and outcomes'],
        objectivesThai: ['ระบุตัวละครหลักได้', 'ค้นหาข้อมูลเฉพาะในเนื้อเรื่องได้', 'เข้าใจความรู้สึกและผลลัพธ์ของเรื่อง'],
        steps: [
          {
            id: 's8-1-1',
            type: 'comprehension',
            title: 'Story & Comprehension',
            titleThai: 'เนื้อเรื่องและคำถามจับใจความ',
            instruction: 'Read the story carefully, then answer the questions below.',
            instructionThai: 'อ่านเรื่องสั้นอย่างตั้งใจ แล้วเลือกคำตอบที่ถูกต้องที่สุด',
            comprehensionData: {
              storyTitle: 'A Sunny Day at School',
              storyTitleThai: 'วันแดดสดใสที่โรงเรียน',
              passage: 'Tom is a student. Today is Monday. The sun is shining. Tom walks to school with his friend Anna. In the classroom, they read a book about animals. Tom likes the big elephant, but Anna likes the friendly cat.',
              passageThai: 'ทอมเป็นนักเรียน วันนี้คือวันจันทร์ พระอาทิตย์ส่องแสงสดใส ทอมเดินไปโรงเรียนกับเพื่อนของเขาชื่อแอนนา ในห้องเรียน พวกเขาอ่านหนังสือเกี่ยวกับสัตว์ ทอมชอบช้างตัวใหญ่ แต่แอนนาชอบแมวที่เป็นมิตร',
              questions: [
                {
                  question: 'Who walks to school with Tom?',
                  questionThai: 'ใครเดินไปโรงเรียนกับทอม?',
                  options: ['Anna', 'Max the dog', 'The teacher'],
                  correctIndex: 0,
                  explanationThai: 'จากเนื้อเรื่อง: "Tom walks to school with his friend Anna."'
                },
                {
                  question: 'Which animal does Anna like?',
                  questionThai: 'แอนนาชอบสัตว์ชนิดใด?',
                  options: ['The friendly cat', 'The big elephant', 'A bird'],
                  correctIndex: 0,
                  explanationThai: 'จากเนื้อเรื่อง: "...but Anna likes the friendly cat."'
                }
              ]
            }
          }
        ]
      }
    ]
  },

  // LEVEL 9: STORY BUILDING
  {
    id: 9,
    title: 'LEVEL 9 — STORY BUILDING',
    titleThai: 'การสร้างเรื่องราว (Story Building)',
    tagline: 'Character + Place + Problem + Action + Ending',
    taglineThai: 'โครงสร้างการเล่าเรื่อง: ตัวละคร + สถานที่ + ปัญหา + การกระทำ + บทสรุป',
    icon: '📕',
    color: 'orange',
    lessons: [
      {
        id: 'L9-1',
        levelId: 9,
        lessonNumber: 1,
        title: 'The Lost Red Ball',
        titleThai: 'ลูกบอลสีแดงที่หายไป',
        description: 'Sequence images and sentences to tell a complete narrative.',
        descriptionThai: 'เรียงลำดับภาพและประโยคเพื่อเล่าเรื่องราวอย่างเป็นลำดับขั้นตอน',
        icon: '⚽',
        durationMinutes: 30,
        objectives: ['Learn the 5 story components', 'Order problem and resolution', 'Retell the story in English'],
        objectivesThai: ['เข้าใจ 5 องค์ประกอบของเรื่องเล่า', 'เรียงลำดับปัญหาและการแก้ไขปัญหา', 'เล่าเรื่องซ้ำด้วยภาษาอังกฤษ'],
        steps: [
          {
            id: 's9-1-1',
            type: 'paragraph_builder',
            title: 'Story Sequence',
            titleThai: 'ลำดับเรื่องราว',
            instruction: 'Put the story in order from beginning to ending.',
            instructionThai: 'เรียงลำดับเรื่องราวตั้งแต่ต้นจนจบ',
            paragraphData: {
              topic: 'THE LOST BALL',
              topicThai: 'ลูกบอลที่หายไป',
              explanationThai: 'เรื่องราวที่ดีต้องมี: ตัวละคร → ปัญหา → การแก้ปัญหา → บทสรุปที่มีความสุข',
              sentences: [
                { id: 'st1', text: '1. A boy has a red ball.', thai: '1. เด็กชายคนหนึ่งมีลูกบอลสีแดง' },
                { id: 'st2', text: '2. The ball rolls into the garden.', thai: '2. ลูกบอลกลิ้งเข้าไปในสวน' },
                { id: 'st3', text: '3. The boy looks under a big green tree.', thai: '3. เด็กชายมองหาใต้ต้นไม้ใหญ่' },
                { id: 'st4', text: '4. He finds his ball and smiles happily.', thai: '4. เขาพบลูกบอลแล้วยิ้มอย่างมีความสุข' }
              ],
              correctOrder: ['st1', 'st2', 'st3', 'st4']
            }
          }
        ]
      }
    ]
  },

  // LEVEL 10: EVERYDAY CONVERSATION
  {
    id: 10,
    title: 'LEVEL 10 — EVERYDAY CONVERSATION',
    titleThai: 'บทสนทนาในชีวิตจริง (Everyday English)',
    tagline: 'Roleplay: Meeting people, ordering food, and asking directions',
    taglineThai: 'สวมบทบาทการสนทนา: สั่งอาหาร ขอความช่วยเหลือ และพูดคุยในชีวิตประจำวัน',
    icon: '🗣️',
    color: 'sky',
    lessons: [
      {
        id: 'L10-1',
        levelId: 10,
        lessonNumber: 1,
        title: 'Ordering Food at a Cafe',
        titleThai: 'การสั่งอาหารและเครื่องดื่มในร้าน',
        description: 'Practice ordering: "Can I have...", "How much is it?", "Thank you."',
        descriptionThai: 'ฝึกสั่งอาหารอย่างมั่นใจและสุภาพ: "ขอรับเป็น...", "ราคาเท่าไหร่ครับ/ค่ะ"',
        icon: '☕',
        durationMinutes: 30,
        objectives: ['Order food politely', 'Ask about the price', 'Complete a full roleplay'],
        objectivesThai: ['สั่งอาหารได้อย่างสุภาพ', 'ถามราคาได้ถูกต้อง', 'สนทนาตอบโต้ได้ครบถ้วน'],
        steps: [
          {
            id: 's10-1-1',
            type: 'dialogue',
            title: 'Cafe Roleplay',
            titleThai: 'บทสนทนาสั่งเครื่องดื่ม',
            instruction: 'Listen and practice speaking as Person A or Person B.',
            instructionThai: 'ฟังและฝึกพูดโต้ตอบในฐานะลูกค้าหรือพนักงาน',
            dialogueData: {
              topic: 'At the Cafe',
              topicThai: 'ที่ร้านกาแฟ',
              lines: [
                { speaker: 'A', text: 'Hello! What would you like to drink?', thai: 'สวัสดีครับ รับเครื่องดื่มอะไรดีครับ?', role: 'Barista' },
                { speaker: 'B', text: 'Hello. Can I have water and an apple, please?', thai: 'สวัสดีค่ะ ขอน้ำเปล่ากับแอปเปิลหนึ่งลูกค่ะ', role: 'Customer' },
                { speaker: 'A', text: 'Sure! That is two dollars, please.', thai: 'ได้เลยครับ ทั้งหมด 2 ดอลลาร์ครับ', role: 'Barista' },
                { speaker: 'B', text: 'Here you are. Thank you very much!', thai: 'นี่ค่ะ ขอบคุณมากๆ นะคะ', role: 'Customer' }
              ]
            }
          }
        ]
      }
    ]
  },

  // LEVEL 11: INTERMEDIATE ENGLISH
  {
    id: 11,
    title: 'LEVEL 11 — INTERMEDIATE ENGLISH',
    titleThai: 'บันไดสู่ภาษาอังกฤษระดับกลาง',
    tagline: 'Past simple, future with will, and expanding conversational fluency',
    taglineThai: 'การพูดถึงอดีต อนาคต และการต่อยอดทักษะสู่ระดับสากล',
    icon: '🚀',
    color: 'violet',
    lessons: [
      {
        id: 'L11-1',
        levelId: 11,
        lessonNumber: 1,
        title: 'Talking About Yesterday: Past Simple',
        titleThai: 'การเล่าเรื่องเมื่อวานนี้ (Past Simple: sat, ate, went)',
        description: 'Notice how verbs change in the past: eat → ate, sit → sat, go → went.',
        descriptionThai: 'สังเกตการเปลี่ยนรูปของคำกริยาเมื่อเล่าเรื่องราวในอดีต',
        icon: '⏳',
        durationMinutes: 35,
        objectives: ['Recognize past tense verbs', 'Say what you did yesterday', 'Compare present vs past'],
        objectivesThai: ['จำกริยาช่องอดีตที่ใช้บ่อยได้', 'เล่าสิ่งที่ทำเมื่อวานได้', 'เปรียบเทียบปัจจุบันกับอดีตได้ชัดเจน'],
        steps: [
          {
            id: 's11-1-1',
            type: 'sentence_builder',
            title: 'Build: Yesterday I ate rice',
            titleThai: 'สร้างประโยค: เมื่อวานนี้ฉันกินข้าว',
            instruction: 'Arrange: Yesterday + I + ate + rice.',
            instructionThai: 'เรียงคำ: Yesterday + I + ate + rice.',
            sentenceData: {
              targetSentence: 'Yesterday I ate rice.',
              targetThai: 'เมื่อวานนี้ฉันกินข้าว',
              blocks: [
                { id: 'b1', text: 'Yesterday', role: 'extra', thaiHint: 'เมื่อวานนี้' },
                { id: 'b2', text: 'I', role: 'who', thaiHint: 'ฉัน' },
                { id: 'b3', text: 'ate', role: 'action', thaiHint: 'กินแล้ว (อดีตของ eat)' },
                { id: 'b4', text: 'rice', role: 'thing', thaiHint: 'ข้าว' }
              ],
              correctOrder: ['Yesterday', 'I', 'ate', 'rice']
            }
          },
          {
            id: 's11-1-2',
            type: 'quiz_multiple_choice',
            title: 'Past Tense Check',
            titleThai: 'ทดสอบกริยาอดีต',
            instruction: 'Which sentence talks about the PAST?',
            instructionThai: 'ประโยคใดพูดถึงสิ่งที่เกิดขึ้นในอดีตแล้ว?',
            quizData: {
              question: 'Which sentence is in the PAST?',
              questionThai: 'ประโยคใดเป็นอดีต?',
              options: [
                { text: 'Yesterday I sat on the chair.', thai: 'เมื่อวานฉันนั่งบนเก้าอี้ (sat เป็นอดีต)', icon: '⏳', isCorrect: true },
                { text: 'I eat an apple right now.', thai: 'ฉันกำลังกินแอปเปิลตอนนี้ (ปัจจุบัน)', icon: '🍎', isCorrect: false }
              ],
              explanationThai: 'คำว่า Yesterday (เมื่อวาน) และ sat (อดีตของ sit) บอกว่าเกิดขึ้นแล้วในอดีต'
            }
          }
        ]
      }
    ]
  }
];
