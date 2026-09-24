import React, { useState } from 'react';
import { ThaiSupportLevel } from '../types';
import { speakEnglish, playClickPop, playSuccessChime } from '../utils/audio';
import { Volume2, Sparkles, Plus, RotateCcw, Shuffle } from 'lucide-react';

interface SentenceWorkshopProps {
  thaiSupport: ThaiSupportLevel;
}

interface ComponentBlock {
  id: string;
  en: string;
  th: string;
  icon?: string;
}

export const SentenceWorkshop: React.FC<SentenceWorkshopProps> = ({ thaiSupport }) => {
  const whoBlocks: ComponentBlock[] = [
    { id: 'w1', en: 'I', th: 'ฉัน' },
    { id: 'w2', en: 'You', th: 'คุณ' },
    { id: 'w3', en: 'The boss', th: 'หัวหน้า/เจ้านาย' },
    { id: 'w4', en: 'My colleague', th: 'เพื่อนร่วมงานของฉัน' },
    { id: 'w5', en: 'The doctor', th: 'คุณหมอ' },
    { id: 'w6', en: 'We', th: 'พวกเรา' },
    { id: 'w7', en: 'The customer', th: 'ลูกค้า' },
  ];

  const actionBlocks: ComponentBlock[] = [
    { id: 'a1', en: 'drink', th: 'ดื่ม' },
    { id: 'a2', en: 'drinks', th: 'ดื่ม (เมื่อประธานคนเดียว)' },
    { id: 'a3', en: 'eat', th: 'กิน' },
    { id: 'a4', en: 'eats', th: 'กิน (เมื่อประธานคนเดียว)' },
    { id: 'a5', en: 'send', th: 'ส่ง' },
    { id: 'a6', en: 'sends', th: 'ส่ง (เมื่อประธานคนเดียว)' },
    { id: 'a7', en: 'need', th: 'ต้องการ/จำเป็นต้องมี' },
    { id: 'a8', en: 'needs', th: 'ต้องการ (เมื่อประธานคนเดียว)' },
    { id: 'a9', en: 'like', th: 'ชอบ' },
    { id: 'a10', en: 'likes', th: 'ชอบ (เมื่อประธานคนเดียว)' },
  ];

  const thingBlocks: ComponentBlock[] = [
    { id: 't1', en: 'hot coffee', th: 'กาแฟร้อน' },
    { id: 't2', en: 'an email', th: 'อีเมล' },
    { id: 't3', en: 'some water', th: 'น้ำเปล่า' },
    { id: 't4', en: 'the medicine', th: 'ยา' },
    { id: 't5', en: 'a discount', th: 'ส่วนลด' },
    { id: 't6', en: 'the ticket', th: 'ตั๋วโดยสาร' },
    { id: 't7', en: 'delicious rice', th: 'ข้าวสวยอร่อย' },
  ];

  const extraBlocks: ComponentBlock[] = [
    { id: 'e1', en: 'every morning', th: 'ทุกเช้า' },
    { id: 'e2', en: 'at the office', th: 'ที่ออฟฟิศ' },
    { id: 'e3', en: 'right now', th: 'ตอนนี้เลย' },
    { id: 'e4', en: 'at the hospital', th: 'ที่โรงพยาบาล' },
    { id: 'e5', en: 'after work', th: 'หลังเลิกงาน' },
  ];

  const [selectedWho, setSelectedWho] = useState<ComponentBlock>(whoBlocks[0]);
  const [selectedAction, setSelectedAction] = useState<ComponentBlock>(actionBlocks[0]);
  const [selectedThing, setSelectedThing] = useState<ComponentBlock>(thingBlocks[0]);
  const [selectedExtra, setSelectedExtra] = useState<ComponentBlock | null>(null);

  // Construct full sentence
  const extraPart = selectedExtra ? ` ${selectedExtra.en}` : '';
  const currentSentence = `${selectedWho.en} ${selectedAction.en} ${selectedThing.en}${extraPart}.`;
  
  const extraThai = selectedExtra ? ` ${selectedExtra.th}` : '';
  const currentThai = `${selectedWho.th} ${selectedAction.th} ${selectedThing.th}${extraThai}`;

  const handleSpeakSentence = () => {
    playClickPop();
    speakEnglish(currentSentence, {
      onEnd: () => {
        playSuccessChime();
      },
    });
  };

  const handleRandomize = () => {
    playClickPop();
    const w = whoBlocks[Math.floor(Math.random() * whoBlocks.length)];
    const isSingular = ['The boss', 'My colleague', 'The doctor', 'The customer'].includes(w.en);
    
    // Pick compatible verb
    const compatibleActions = actionBlocks.filter((a) => {
      const endsWithS = a.en.endsWith('s');
      return isSingular ? endsWithS : !endsWithS;
    });

    const a = compatibleActions[Math.floor(Math.random() * compatibleActions.length)] || actionBlocks[0];
    const t = thingBlocks[Math.floor(Math.random() * thingBlocks.length)];
    const e = Math.random() > 0.4 ? extraBlocks[Math.floor(Math.random() * extraBlocks.length)] : null;

    setSelectedWho(w);
    setSelectedAction(a);
    setSelectedThing(t);
    setSelectedExtra(e);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 sm:py-8 space-y-6 sm:space-y-8">
      
      {/* Header */}
      <div className="text-center space-y-2">
        <span className="px-3.5 py-1 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 rounded-full text-xs font-bold text-emerald-700 dark:text-emerald-300">
          บล็อกสร้างประโยคภาษาอังกฤษ (Sentence Workshop)
        </span>
        <h1 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white">
          Build Real English Sentences
        </h1>
        {thaiSupport !== 'challenge' && (
          <p className="text-xs sm:text-base text-slate-500 dark:text-slate-400 font-medium max-w-xl mx-auto">
            เรียนรู้ไวยากรณ์ด้วยบล็อกสี: ประธาน (สีฟ้า) + กริยา (สีเขียว) + กรรม (สีส้ม) + ส่วนขยาย (สีม่วง)
          </p>
        )}
      </div>

      {/* Sentence Display Showcase Box */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border-2 border-indigo-200 dark:border-indigo-800 shadow-md p-6 sm:p-8 space-y-6 text-center">
        
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-lg sm:text-3xl font-black">
          {/* Who */}
          <span className="px-3 sm:px-4 py-1.5 sm:py-2 bg-sky-100 dark:bg-sky-950/80 text-sky-900 dark:text-sky-200 rounded-2xl border border-sky-300 dark:border-sky-800 shadow-2xs">
            {selectedWho.en}
          </span>

          {/* Action */}
          <span className="px-3 sm:px-4 py-1.5 sm:py-2 bg-emerald-100 dark:bg-emerald-950/80 text-emerald-900 dark:text-emerald-200 rounded-2xl border border-emerald-300 dark:border-emerald-800 shadow-2xs">
            {selectedAction.en}
          </span>

          {/* Thing */}
          <span className="px-3 sm:px-4 py-1.5 sm:py-2 bg-amber-100 dark:bg-amber-950/80 text-amber-900 dark:text-amber-200 rounded-2xl border border-amber-300 dark:border-amber-800 shadow-2xs">
            {selectedThing.en}
          </span>

          {/* Extra */}
          {selectedExtra && (
            <span className="px-3 sm:px-4 py-1.5 sm:py-2 bg-purple-100 dark:bg-purple-950/80 text-purple-900 dark:text-purple-200 rounded-2xl border border-purple-300 dark:border-purple-800 shadow-2xs">
              {selectedExtra.en}
            </span>
          )}
          <span className="text-slate-400">.</span>
        </div>

        {/* Thai Meaning Display */}
        {thaiSupport !== 'challenge' && (
          <div className="p-3 bg-slate-50 dark:bg-slate-800/80 rounded-2xl max-w-lg mx-auto border border-slate-100 dark:border-slate-800">
            <div className="text-xs font-bold text-slate-400 dark:text-slate-400 mb-0.5">
              ความหมายภาษาไทย:
            </div>
            <div className="text-base sm:text-lg font-bold text-slate-700 dark:text-slate-200">
              "{currentThai}"
            </div>
          </div>
        )}

        {/* Controls */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button
            onClick={handleSpeakSentence}
            className="py-3 px-6 bg-indigo-600 hover:bg-indigo-700 text-white font-black text-sm rounded-2xl shadow-xs transition-all flex items-center gap-2 cursor-pointer"
          >
            <Volume2 className="w-5 h-5" />
            <span>ฟังเสียงประโยคเต็ม / Listen</span>
          </button>

          <button
            onClick={handleRandomize}
            className="py-3 px-4 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold text-xs rounded-2xl transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Shuffle className="w-4 h-4" />
            <span>สุ่มประโยคอัตโนมัติ / Random</span>
          </button>
        </div>

      </div>

      {/* Block Selector Tabs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Column 1: WHO (ประธาน) */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-sky-200 dark:border-sky-900/60 p-4 space-y-3 shadow-2xs">
          <div className="flex items-center justify-between border-b border-sky-100 dark:border-sky-900/40 pb-2">
            <span className="text-xs font-black text-sky-700 dark:text-sky-300">
              1. WHO? (ใคร)
            </span>
            <span className="text-[10px] text-slate-400">Subject</span>
          </div>

          <div className="space-y-1.5">
            {whoBlocks.map((b) => (
              <button
                key={b.id}
                onClick={() => {
                  playClickPop();
                  setSelectedWho(b);
                }}
                className={`w-full p-2.5 rounded-xl text-left transition-all cursor-pointer ${
                  selectedWho.id === b.id
                    ? 'bg-sky-500 text-white font-black shadow-xs'
                    : 'bg-sky-50/50 dark:bg-slate-800 hover:bg-sky-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold'
                }`}
              >
                <div className="text-sm">{b.en}</div>
                {thaiSupport !== 'challenge' && (
                  <div className={`text-[11px] ${selectedWho.id === b.id ? 'text-sky-100' : 'text-slate-400'}`}>
                    {b.th}
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Column 2: ACTION (กริยา) */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-emerald-200 dark:border-emerald-900/60 p-4 space-y-3 shadow-2xs">
          <div className="flex items-center justify-between border-b border-emerald-100 dark:border-emerald-900/40 pb-2">
            <span className="text-xs font-black text-emerald-700 dark:text-emerald-300">
              2. ACTION (ทำอะไร)
            </span>
            <span className="text-[10px] text-slate-400">Verb</span>
          </div>

          <div className="space-y-1.5 max-h-80 overflow-y-auto pr-1">
            {actionBlocks.map((b) => (
              <button
                key={b.id}
                onClick={() => {
                  playClickPop();
                  setSelectedAction(b);
                }}
                className={`w-full p-2.5 rounded-xl text-left transition-all cursor-pointer ${
                  selectedAction.id === b.id
                    ? 'bg-emerald-600 text-white font-black shadow-xs'
                    : 'bg-emerald-50/50 dark:bg-slate-800 hover:bg-emerald-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold'
                }`}
              >
                <div className="text-sm">{b.en}</div>
                {thaiSupport !== 'challenge' && (
                  <div className={`text-[11px] ${selectedAction.id === b.id ? 'text-emerald-100' : 'text-slate-400'}`}>
                    {b.th}
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Column 3: THING (สิ่งใด) */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-amber-200 dark:border-amber-900/60 p-4 space-y-3 shadow-2xs">
          <div className="flex items-center justify-between border-b border-amber-100 dark:border-amber-900/40 pb-2">
            <span className="text-xs font-black text-amber-700 dark:text-amber-300">
              3. THING? (สิ่งใด)
            </span>
            <span className="text-[10px] text-slate-400">Object</span>
          </div>

          <div className="space-y-1.5 max-h-80 overflow-y-auto pr-1">
            {thingBlocks.map((b) => (
              <button
                key={b.id}
                onClick={() => {
                  playClickPop();
                  setSelectedThing(b);
                }}
                className={`w-full p-2.5 rounded-xl text-left transition-all cursor-pointer ${
                  selectedThing.id === b.id
                    ? 'bg-amber-500 text-slate-950 font-black shadow-xs'
                    : 'bg-amber-50/50 dark:bg-slate-800 hover:bg-amber-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold'
                }`}
              >
                <div className="text-sm">{b.en}</div>
                {thaiSupport !== 'challenge' && (
                  <div className={`text-[11px] ${selectedThing.id === b.id ? 'text-amber-950' : 'text-slate-400'}`}>
                    {b.th}
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Column 4: EXTRA (ที่ไหน/เมื่อไหร่) */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-purple-200 dark:border-purple-900/60 p-4 space-y-3 shadow-2xs">
          <div className="flex items-center justify-between border-b border-purple-100 dark:border-purple-900/40 pb-2">
            <span className="text-xs font-black text-purple-700 dark:text-purple-300">
              4. EXTRA (ส่วนขยาย)
            </span>
            <span className="text-[10px] text-slate-400">Optional</span>
          </div>

          <div className="space-y-1.5">
            <button
              onClick={() => {
                playClickPop();
                setSelectedExtra(null);
              }}
              className={`w-full p-2.5 rounded-xl text-left transition-all cursor-pointer ${
                selectedExtra === null
                  ? 'bg-purple-600 text-white font-black shadow-xs'
                  : 'bg-slate-50 dark:bg-slate-800 text-slate-400 font-semibold'
              }`}
            >
              <div className="text-xs">[ไม่มีส่วนขยาย]</div>
            </button>

            {extraBlocks.map((b) => (
              <button
                key={b.id}
                onClick={() => {
                  playClickPop();
                  setSelectedExtra(b);
                }}
                className={`w-full p-2.5 rounded-xl text-left transition-all cursor-pointer ${
                  selectedExtra?.id === b.id
                    ? 'bg-purple-600 text-white font-black shadow-xs'
                    : 'bg-purple-50/50 dark:bg-slate-800 hover:bg-purple-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold'
                }`}
              >
                <div className="text-sm">{b.en}</div>
                {thaiSupport !== 'challenge' && (
                  <div className={`text-[11px] ${selectedExtra?.id === b.id ? 'text-purple-100' : 'text-slate-400'}`}>
                    {b.th}
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
