import React, { useState } from 'react';
import { ThaiSupportLevel } from '../types';
import { speakPhoneme, speakEnglish, playClickPop, playSuccessChime } from '../utils/audio';
import { Volume2, Sparkles, Play, RotateCcw } from 'lucide-react';

interface PhonicsSoundboardProps {
  thaiSupport: ThaiSupportLevel;
}

interface SoundTile {
  letter: string;
  ipa: string;
  thaiHint: string;
  category: 'vowel' | 'consonant' | 'digraph';
  sampleWord: string;
  sampleIcon: string;
}

const PHONICS_TILES: SoundTile[] = [
  // Short Vowels
  { letter: 'A', ipa: '/æ/', thaiHint: 'สระ แอ สั้น (แอะ)', category: 'vowel', sampleWord: 'apple', sampleIcon: '🍎' },
  { letter: 'E', ipa: '/e/', thaiHint: 'สระ เอะ สั้น', category: 'vowel', sampleWord: 'egg', sampleIcon: '🥚' },
  { letter: 'I', ipa: '/ɪ/', thaiHint: 'สระ อิ สั้น', category: 'vowel', sampleWord: 'ink', sampleIcon: '🖋️' },
  { letter: 'O', ipa: '/ɒ/', thaiHint: 'สระ เอาะ / ออ สั้น', category: 'vowel', sampleWord: 'octopus', sampleIcon: '🐙' },
  { letter: 'U', ipa: '/ʌ/', thaiHint: 'สระ อะ สั้น', category: 'vowel', sampleWord: 'umbrella', sampleIcon: '☂️' },

  // Consonants
  { letter: 'S', ipa: '/s/', thaiHint: 'เสียง ซ ลมลอดไรฟัน', category: 'consonant', sampleWord: 'sun', sampleIcon: '☀️' },
  { letter: 'T', ipa: '/t/', thaiHint: 'เสียง ท/ต ปลายลิ้นแตะปุ่มเหงือก', category: 'consonant', sampleWord: 'top', sampleIcon: '🔝' },
  { letter: 'P', ipa: '/p/', thaiHint: 'เสียง พ/ป ริมฝีปากเป่าลม', category: 'consonant', sampleWord: 'pen', sampleIcon: '🖊️' },
  { letter: 'N', ipa: '/n/', thaiHint: 'เสียง น ลมออกทางจมูก', category: 'consonant', sampleWord: 'net', sampleIcon: '🥅' },
  { letter: 'C', ipa: '/k/', thaiHint: 'เสียง ค/ก ลมระเบิดจากโคนลิ้น', category: 'consonant', sampleWord: 'cat', sampleIcon: '🐱' },
  { letter: 'M', ipa: '/m/', thaiHint: 'เสียง ม เม้มปากแล้วสั่นคอ', category: 'consonant', sampleWord: 'man', sampleIcon: '👨' },
  { letter: 'D', ipa: '/d/', thaiHint: 'เสียง ด ลิ้นแตะปุ่มเหงือกออกเสียง', category: 'consonant', sampleWord: 'dog', sampleIcon: '🐶' },
  { letter: 'B', ipa: '/b/', thaiHint: 'เสียง บ ริมฝีปากระเบิดลมเบาๆ', category: 'consonant', sampleWord: 'bag', sampleIcon: '🎒' },
  { letter: 'H', ipa: '/h/', thaiHint: 'เสียง ฮ เป่าลมหายใจอุ่นๆ', category: 'consonant', sampleWord: 'hat', sampleIcon: '👒' },
  { letter: 'R', ipa: '/r/', thaiHint: 'เสียง ร ลิ้นห่องอ ไม่แตะเพดานปาก', category: 'consonant', sampleWord: 'red', sampleIcon: '🔴' },

  // Digraphs
  { letter: 'SH', ipa: '/ʃ/', thaiHint: 'เสียง ชู่วว์ ปากจู๋พ่นลม', category: 'digraph', sampleWord: 'ship', sampleIcon: '🚢' },
  { letter: 'CH', ipa: '/tʃ/', thaiHint: 'เสียง ช ระเบิดลมสั้น', category: 'digraph', sampleWord: 'chin', sampleIcon: '🧔' },
  { letter: 'TH', ipa: '/θ/', thaiHint: 'แลบปลายลิ้นแตะฟันบน เป่าลม', category: 'digraph', sampleWord: 'three', sampleIcon: '3️⃣' },
  { letter: 'EE', ipa: '/iː/', thaiHint: 'สระ อี ยาว ยิ้มกว้าง', category: 'digraph', sampleWord: 'tree', sampleIcon: '🌳' },
  { letter: 'OO', ipa: '/uː/', thaiHint: 'สระ อู ยาว ปากจู๋', category: 'digraph', sampleWord: 'moon', sampleIcon: '🌙' },
];

export const PhonicsSoundboard: React.FC<PhonicsSoundboardProps> = ({ thaiSupport }) => {
  const [activeTile, setActiveTile] = useState<SoundTile | null>(null);
  const [blendingSequence, setBlendingSequence] = useState<SoundTile[]>([]);
  const [filterCategory, setFilterCategory] = useState<'all' | 'vowel' | 'consonant' | 'digraph'>('all');

  const filteredTiles = PHONICS_TILES.filter(
    (t) => filterCategory === 'all' || t.category === filterCategory
  );

  const handleTileClick = (tile: SoundTile) => {
    playClickPop();
    setActiveTile(tile);
    speakPhoneme(tile.ipa, tile.letter, () => {
      setTimeout(() => {
        speakEnglish(tile.sampleWord);
      }, 350);
    });
  };

  const handleAddToBlending = (tile: SoundTile) => {
    playClickPop();
    if (blendingSequence.length < 5) {
      setBlendingSequence([...blendingSequence, tile]);
      speakPhoneme(tile.ipa, tile.letter);
    }
  };

  const handlePlayBlending = () => {
    playClickPop();
    if (blendingSequence.length === 0) return;

    let idx = 0;
    const playNext = () => {
      if (idx < blendingSequence.length) {
        const item = blendingSequence[idx];
        speakPhoneme(item.ipa, item.letter, () => {
          idx++;
          setTimeout(playNext, 250);
        });
      } else {
        const word = blendingSequence.map((t) => t.letter).join('');
        setTimeout(() => {
          speakEnglish(word, {
            onEnd: () => {
              playSuccessChime();
            },
          });
        }, 300);
      }
    };
    playNext();
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 sm:py-8 space-y-6 sm:space-y-8">
      
      {/* Soundboard Header */}
      <div className="text-center space-y-2">
        <span className="px-3.5 py-1 bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 rounded-full text-xs font-bold text-indigo-700 dark:text-indigo-300">
          ตาราง 44 เสียงสากลและผสมคำ (Phonics Soundboard)
        </span>
        <h1 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white">
          44 English Sounds Explorer
        </h1>
        {thaiSupport !== 'challenge' && (
          <p className="text-xs sm:text-base text-slate-500 dark:text-slate-400 font-medium max-w-xl mx-auto">
            แตะที่ตัวอักษรเพื่อฟังการออกเสียงโฟนิกส์ พร้อมวิธีเทียบเสียงไทยและตำแหน่งปาก
          </p>
        )}
      </div>

      {/* Category Tabs */}
      <div className="flex items-center justify-center gap-2 flex-wrap">
        {[
          { key: 'all', label: 'ทั้งหมด (All Sounds)' },
          { key: 'vowel', label: 'สระเสียงสั้น (Short Vowels)' },
          { key: 'consonant', label: 'พยัญชนะ (Consonants)' },
          { key: 'digraph', label: 'เสียงคู่ (Digraphs)' },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => {
              playClickPop();
              setFilterCategory(tab.key as any);
            }}
            className={`py-2 px-3.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              filterCategory === tab.key
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Interactive Soundboard Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
        {filteredTiles.map((tile) => {
          const isActive = activeTile?.letter === tile.letter;
          let borderHover = 'hover:border-indigo-400 dark:hover:border-indigo-500';

          if (tile.category === 'vowel') {
            borderHover = 'hover:border-rose-400 dark:hover:border-rose-500';
          } else if (tile.category === 'digraph') {
            borderHover = 'hover:border-purple-400 dark:hover:border-purple-500';
          }

          return (
            <div
              key={tile.letter}
              className={`bg-white dark:bg-slate-900 rounded-2xl border-2 p-4 flex flex-col justify-between transition-all group shadow-2xs ${
                isActive
                  ? 'border-indigo-600 dark:border-indigo-400 ring-2 ring-indigo-200 dark:ring-indigo-900'
                  : `border-slate-200 dark:border-slate-800 ${borderHover}`
              }`}
            >
              <div className="flex items-start justify-between">
                <span className="text-3xl font-black text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {tile.letter}
                </span>
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-indigo-700 dark:text-indigo-300">
                  {tile.ipa}
                </span>
              </div>

              <div className="py-2">
                <div className="flex items-center gap-1.5 text-sm font-bold text-slate-800 dark:text-slate-100">
                  <span>{tile.sampleIcon}</span>
                  <span>{tile.sampleWord}</span>
                </div>
                {thaiSupport !== 'challenge' && (
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium truncate mt-0.5">
                    {tile.thaiHint}
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-1.5 pt-2 border-t border-slate-100 dark:border-slate-800">
                <button
                  onClick={() => handleTileClick(tile)}
                  className="py-1.5 px-2 bg-slate-50 dark:bg-slate-800 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 rounded-lg text-xs font-bold transition-colors flex items-center justify-center gap-1 cursor-pointer"
                  title="ฟังเสียงอ่าน"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>ฟังเสียง</span>
                </button>

                <button
                  onClick={() => handleAddToBlending(tile)}
                  className="py-1.5 px-2 bg-indigo-50 dark:bg-indigo-950/50 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 text-indigo-800 dark:text-indigo-300 rounded-lg text-xs font-bold transition-colors flex items-center justify-center gap-1 cursor-pointer"
                  title="เพิ่มเข้าถาดผสมคำ"
                >
                  <span>+ ผสม</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Blending Workbench Tray */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border-2 border-indigo-200 dark:border-indigo-800 shadow-sm p-5 sm:p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
              ถาดฝึกผสมคำแบบโฟนิกส์ (Interactive Sound Blending)
            </h2>
          </div>

          {blendingSequence.length > 0 && (
            <button
              onClick={() => {
                playClickPop();
                setBlendingSequence([]);
              }}
              className="text-xs font-bold text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>ล้างถาด</span>
            </button>
          )}
        </div>

        {thaiSupport !== 'challenge' && (
          <p className="text-xs text-slate-500 dark:text-slate-400">
            แตะปุ่ม "+ ผสม" บนตัวอักษรใดก็ได้ด้านบน เพื่อต่อเสียงเข้าด้วยกัน แล้วกดฟังการสะกดคำ!
          </p>
        )}

        <div className="flex flex-wrap items-center gap-3 min-h-[64px] p-3 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-dashed border-slate-300 dark:border-slate-700">
          {blendingSequence.length === 0 ? (
            <span className="text-xs font-medium text-slate-400 mx-auto">
              ถาดผสมยังว่างอยู่ แตะเลือกตัวอักษร เช่น C + A + T เพื่อฝึกสะกดคำ
            </span>
          ) : (
            blendingSequence.map((item, idx) => (
              <React.Fragment key={idx}>
                {idx > 0 && <span className="text-slate-400 font-bold text-lg">+</span>}
                <div className="px-4 py-2 bg-white dark:bg-slate-800 rounded-xl border border-indigo-200 dark:border-indigo-800 shadow-2xs text-center font-black text-xl text-indigo-900 dark:text-indigo-200">
                  <div>{item.letter}</div>
                  <div className="text-[10px] font-mono text-slate-400 font-normal">{item.ipa}</div>
                </div>
              </React.Fragment>
            ))
          )}
        </div>

        {blendingSequence.length > 0 && (
          <button
            onClick={handlePlayBlending}
            className="w-full py-3.5 px-6 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold rounded-2xl shadow-xs transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <Play className="w-5 h-5 fill-current" />
            <span>ผสมเสียงและอ่านคำ ({blendingSequence.map((t) => t.letter).join('')})</span>
          </button>
        )}
      </div>

    </div>
  );
};
