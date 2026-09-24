import React, { useState } from 'react';
import { ThaiSupportLevel, VocabularyItem } from '../types';
import { speakEnglish, playClickPop } from '../utils/audio';
import { COMPREHENSIVE_VOCABULARY } from '../data/vocabularyData';
import { Volume2, Search, Filter, Briefcase, Heart, Sparkles, RotateCw } from 'lucide-react';

export const VocabularyExplorer: React.FC<{ thaiSupport: ThaiSupportLevel }> = ({ thaiSupport }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [adultOnlyFilter, setAdultOnlyFilter] = useState(false);
  const [flippedCards, setFlippedCards] = useState<Record<string, boolean>>({});

  const CATEGORY_TABS = [
    { key: 'All', labelEn: 'All', labelTh: 'All / ทั้งหมด' },
    { key: 'Work', labelEn: 'Work & Office', labelTh: '💼 Work & Office / งานออฟฟิศ (20-40)' },
    { key: 'Shopping', labelEn: 'Shopping & Money', labelTh: '🛒 Shopping / ซื้อของและเงิน' },
    { key: 'Health', labelEn: 'Health & Doctor', labelTh: '🏥 Health / สุขภาพและหมอ' },
    { key: 'Travel', labelEn: 'Travel & Directions', labelTh: '✈️ Travel / เดินทางบอกทาง' },
    { key: 'Phrases', labelEn: 'Daily Phrases', labelTh: '💬 Daily Phrases / ประโยคสุภาพ' },
    { key: 'Food', labelEn: 'Food & Drinks', labelTh: '☕ Food & Drinks / อาหารเครื่องดื่ม' },
    { key: 'Family', labelEn: 'Family', labelTh: '👨‍👩‍👧 Family / ครอบครัว' },
    { key: 'Actions', labelEn: 'Actions', labelTh: '🏃 Actions / การกระทำ' },
    { key: 'Animals', labelEn: 'Animals', labelTh: '🐶 Animals / สัตว์' },
  ];

  const filteredCards = COMPREHENSIVE_VOCABULARY.filter((card) => {
    const matchesCategory = selectedCategory === 'All' || card.category === selectedCategory;
    const matchesAdult = !adultOnlyFilter || card.isAdultRelevant;
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      card.word.toLowerCase().includes(q) ||
      card.thai.includes(q) ||
      (card.thaiPhoneticReading && card.thaiPhoneticReading.includes(q)) ||
      card.exampleSentence.toLowerCase().includes(q);
    return matchesCategory && matchesAdult && matchesSearch;
  });

  const toggleFlip = (id: string) => {
    playClickPop();
    setFlippedCards((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleSpeak = (e: React.MouseEvent, text: string) => {
    e.stopPropagation();
    playClickPop();
    speakEnglish(text, { rate: 0.85 }); // slightly slower for optimal clarity across all ages
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 sm:py-8 space-y-6">
      
      {/* Header Banner */}
      <div className="text-center space-y-2">
        <span className="px-3.5 py-1 bg-sky-100 dark:bg-sky-950/50 border border-sky-200 dark:border-sky-800 rounded-full text-xs font-bold text-sky-800 dark:text-sky-300">
          Vocabulary & Daily Life Phrases · คลังคำศัพท์และวลีจำเป็นสำหรับทุกวัย (5-70 ปี)
        </span>
        <h1 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white">
          Vocabulary & Daily Life Phrases
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium max-w-2xl mx-auto">
          Essential workplace, shopping, health, travel, and conversational phrases. Tap to listen to native audio or flip to see Thai explanation.
        </p>
      </div>

      {/* Adult Filter & Search Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 bg-white dark:bg-slate-900 p-4 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xs">
        
        {/* Search */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search word, Thai meaning, or phonetic pronunciation / ค้นหา..."
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-xs sm:text-sm font-medium focus:outline-none focus:border-indigo-500 dark:text-white"
          />
        </div>

        {/* Adult Focus Pill Toggle */}
        <button
          onClick={() => {
            playClickPop();
            setAdultOnlyFilter(!adultOnlyFilter);
          }}
          className={`py-2.5 px-4 rounded-2xl text-xs font-black transition-all flex items-center justify-center gap-2 cursor-pointer shrink-0 ${
            adultOnlyFilter
              ? 'bg-amber-500 text-slate-950 shadow-xs'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
          }`}
        >
          <Briefcase className="w-4 h-4" />
          <span>Workplace & Adult Filter / วัยทำงาน (20-40 ปี)</span>
        </button>

      </div>

      {/* Categories Bar */}
      <div className="flex flex-wrap items-center gap-1.5 pb-1">
        {CATEGORY_TABS.map((cat) => (
          <button
            key={cat.key}
            onClick={() => {
              playClickPop();
              setSelectedCategory(cat.key);
            }}
            className={`py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              selectedCategory === cat.key
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800'
            }`}
          >
            {cat.labelTh}
          </button>
        ))}
      </div>

      {/* Word Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredCards.map((card) => {
          const isFlipped = !!flippedCards[card.id];

          return (
            <div
              key={card.id}
              onClick={() => toggleFlip(card.id)}
              className="min-h-[220px] bg-white dark:bg-slate-900 rounded-3xl border-2 border-slate-200 dark:border-slate-800 hover:border-indigo-400 dark:hover:border-indigo-500 p-5 flex flex-col justify-between shadow-2xs hover:shadow-md transition-all cursor-pointer select-none group"
            >
              {!isFlipped ? (
                /* Card Front (English Focus + Thai Reading) */
                <>
                  <div className="flex items-start justify-between">
                    <span className="text-4xl group-hover:scale-110 transition-transform">
                      {card.icon}
                    </span>
                    <button
                      onClick={(e) => handleSpeak(e, card.word)}
                      className="p-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 rounded-xl transition-colors cursor-pointer"
                      title="Listen to English pronunciation / ฟังเสียงอ่าน"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="space-y-1.5 my-3">
                    <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                      {card.word}
                    </h3>

                    {/* Thai Phonetic reading helper */}
                    {card.thaiPhoneticReading && (
                      <div className="text-xs font-bold text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 px-2 py-0.5 rounded-md inline-block">
                        Sound / อ่านว่า: {card.thaiPhoneticReading}
                      </div>
                    )}

                    <div className="text-[11px] font-mono text-slate-400 dark:text-slate-500">
                      {card.phonetic}
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-400 font-semibold">
                    <span className="truncate max-w-[120px]">{card.category}</span>
                    <span className="text-indigo-600 dark:text-indigo-400 font-bold group-hover:underline flex items-center gap-1">
                      <span>Flip / พลิกดู</span>
                      <RotateCw className="w-3 h-3" />
                    </span>
                  </div>
                </>
              ) : (
                /* Card Back (Thai Meaning & Usage Sentence) */
                <div className="h-full flex flex-col justify-between bg-indigo-50/50 dark:bg-indigo-950/30 -m-5 p-5 rounded-3xl border-2 border-indigo-200 dark:border-indigo-800 animate-pop">
                  <div className="space-y-1">
                    <div className="text-xs font-bold text-indigo-600 dark:text-indigo-400">
                      {card.word.toUpperCase()}
                    </div>
                    <div className="text-xl font-black text-indigo-950 dark:text-indigo-100">
                      {card.thai}
                    </div>
                  </div>

                  <div className="space-y-1 my-2 bg-white dark:bg-slate-800 p-3 rounded-xl border border-indigo-100 dark:border-slate-700">
                    <div className="text-xs font-bold text-slate-800 dark:text-slate-100">
                      "{card.exampleSentence}"
                    </div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400">
                      {card.exampleThai}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <button
                      onClick={(e) => handleSpeak(e, card.exampleSentence)}
                      className="text-xs font-bold text-indigo-700 dark:text-indigo-300 flex items-center gap-1 hover:underline cursor-pointer"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>Hear Sentence / ฟังทั้งประโยค</span>
                    </button>

                    <span className="text-[11px] text-slate-400 dark:text-slate-500 font-bold">
                      Flip Back / พลิกกลับ ↻
                    </span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

    </div>
  );
};
