import React, { useState, useEffect } from 'react';
import Reveal from './Reveal';
import { COURSE_LINK } from '../constants';

const ComparisonSection: React.FC = () => {
  const [step, setStep] = useState(1);
  
  // --- Step 1 State & Logic (Drag Quiz) ---
  const [bankWords, setBankWords] = useState<string[]>([]); 
  const [placedWords, setPlacedWords] = useState<string[]>([]);
  // 'null' = not checked, 'correct' = correct, 'wrong' = wrong
  const [step1Result, setStep1Result] = useState<'correct' | 'wrong' | null>(null);

  // Initialize words with shuffle
  useEffect(() => {
    if (step === 1 && bankWords.length === 0 && placedWords.length === 0) {
      const words = ['how', 'old', 'are', 'you'];
      // Fisher-Yates shuffle
      for (let i = words.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [words[i], words[j]] = [words[j], words[i]];
      }
      setBankWords(words);
    }
  }, [step, step1Result]);

  const handleWordClick = (word: string, index: number, isBank: boolean) => {
    if (step1Result) return;

    if (isBank) {
      const newBank = [...bankWords];
      newBank.splice(index, 1);
      setBankWords(newBank);
      setPlacedWords([...placedWords, word]);
    } else {
      const newPlaced = [...placedWords];
      newPlaced.splice(index, 1);
      setPlacedWords(newPlaced);
      setBankWords([...bankWords, word]);
    }
  };

  const handleDragStart = (e: React.DragEvent, word: string, index: number, isBank: boolean) => {
    if (step1Result) {
      e.preventDefault();
      return;
    }
    e.dataTransfer.setData('word', word);
    e.dataTransfer.setData('index', index.toString());
    e.dataTransfer.setData('isBank', isBank.toString());
  };

  const handleDragOver = (e: React.DragEvent) => {
    if (step1Result) return;
    e.preventDefault();
  };

  const handleDropOnZone = (e: React.DragEvent) => {
    if (step1Result) return;
    e.preventDefault();
    const word = e.dataTransfer.getData('word');
    const indexStr = e.dataTransfer.getData('index');
    const isBankStr = e.dataTransfer.getData('isBank');

    if (word && indexStr && isBankStr === 'true') {
      const index = parseInt(indexStr, 10);
      handleWordClick(word, index, true);
    }
  };

  const handleDropOnBank = (e: React.DragEvent) => {
    if (step1Result) return;
    e.preventDefault();
    const word = e.dataTransfer.getData('word');
    const indexStr = e.dataTransfer.getData('index');
    const isBankStr = e.dataTransfer.getData('isBank');

    if (word && indexStr && isBankStr === 'false') {
      const index = parseInt(indexStr, 10);
      handleWordClick(word, index, false);
    }
  };

  const checkStep1 = () => {
    const sentence = placedWords.join(' ').toLowerCase();
    if (sentence === 'how old are you') {
      setStep1Result('correct');
    } else {
      setStep1Result('wrong');
    }
  };

  const resetStep1 = () => {
    setPlacedWords([]);
    const words = ['how', 'old', 'are', 'you'];
    for (let i = words.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [words[i], words[j]] = [words[j], words[i]];
    }
    setBankWords(words);
    setStep1Result(null);
  };

  // --- Step 2 State & Logic (Structure Test) ---
  const [input1, setInput1] = useState('');
  const [input2, setInput2] = useState('');
  const [step2Result, setStep2Result] = useState<'correct' | 'wrong' | null>(null);

  const checkStep2 = () => {
    const a1 = input1.trim().toLowerCase().replace(/\?$/, '');
    const a2 = input2.trim().toLowerCase().replace(/\?$/, '');
    const correct1 = 'how tall is he';
    const correct2 = 'how cute is that dog';

    if (a1 === correct1 && a2 === correct2) {
      setStep2Result('correct');
    } else {
      setStep2Result('wrong');
    }
  };

  return (
    <section className="py-24 bg-gray-50/50">
      <Reveal className={`mx-auto px-4 ${step === 3 ? 'max-w-[980px]' : 'max-w-[520px]'}`}>
        
        {/* STEP 1: DRAG QUIZ */}
        {step === 1 && (
          <div className="text-center font-[Pretendard]">
            <h2 className="text-lg md:text-xl font-extrabold mb-3 text-gray-900 leading-tight">다음 질문을 영어로 말해 보세요!</h2>
            <div className="inline-block px-4 py-2 bg-[#eef2ff] rounded-full font-bold text-gray-900 mb-7">
              “너 몇 살이야?”
            </div>

            {/* Drop Zone */}
            <div 
              onDragOver={handleDragOver}
              onDrop={handleDropOnZone}
              className={`min-h-[64px] border-2 border-dashed border-[#6366f1] rounded-[16px] p-[12px] mb-5 flex gap-[10px] justify-center items-center flex-wrap bg-white transition-colors`}
            >
              {placedWords.length === 0 && (
                <span className="text-[#9ca3af] text-sm pointer-events-none select-none">여기에 단어를 순서대로 놓아보세요</span>
              )}
              {placedWords.map((word, i) => (
                <span 
                  key={`placed-${i}`} 
                  draggable={!step1Result}
                  onDragStart={(e) => handleDragStart(e, word, i, false)}
                  onClick={() => handleWordClick(word, i, false)}
                  className="px-[16px] py-[10px] bg-[#4f46e5] text-white rounded-[12px] font-bold cursor-pointer select-none hover:bg-[#4338ca] active:scale-95 transition-all"
                >
                  {word}
                </span>
              ))}
            </div>

            {/* Word Bank */}
            <div 
              onDragOver={handleDragOver}
              onDrop={handleDropOnBank}
              className="flex justify-center gap-[10px] mb-7 flex-wrap min-h-[44px]"
            >
              {bankWords.map((word, i) => (
                <span 
                  key={`bank-${i}`} 
                  draggable={!step1Result}
                  onDragStart={(e) => handleDragStart(e, word, i, true)}
                  onClick={() => handleWordClick(word, i, true)}
                  className="px-[16px] py-[10px] bg-[#4f46e5] text-white rounded-[12px] font-bold cursor-pointer select-none hover:bg-[#4338ca] active:scale-95 transition-all shadow-sm"
                >
                  {word}
                </span>
              ))}
            </div>

            {/* Check Button */}
            {!step1Result && (
              <button 
                onClick={checkStep1}
                className="w-full p-[18px] rounded-full border-none bg-[#fde047] text-[#111827] font-extrabold text-[16px] cursor-pointer shadow-[0_12px_28px_rgba(0,0,0,0.18)] transition-all duration-200 hover:-translate-y-[2px]"
              >
                정답 확인하기
              </button>
            )}

            {/* Simplified Result Box */}
            {step1Result && (
              <div className="mt-8 p-5 rounded-[18px] bg-[#f5f7ff] text-center text-[15px] animate-fadeIn">
                <p className="text-gray-900 font-medium">
                  {step1Result === 'correct' 
                    ? '⭕ 정답입니다! 다음 문제도 도전해 보세요' 
                    : '❌ 아쉽게도 오답이에요. 그래도 다음 문제도 도전해 봅시다!'}
                </p>
                <button 
                  onClick={() => setStep(2)}
                  className="mt-4 bg-transparent border-none text-[#4f46e5] font-extrabold cursor-pointer text-sm hover:underline"
                >
                  다음 문제 도전하기 →
                </button>
              </div>
            )}
          </div>
        )}

        {/* STEP 2: STRUCTURE TEST */}
        {step === 2 && (
          <div className="max-w-[520px] mx-auto font-[Pretendard] animate-fadeIn text-center">
            <h2 className="text-xl font-extrabold mb-7 text-gray-900">
              이 문장들도 만들어 보세요!
            </h2>

            <div className="mb-[18px] text-left">
              <p className="font-bold mb-2 text-gray-900">“걔(남자) 얼마나 키 커?”</p>
              <input 
                id="q1" 
                type="text" 
                placeholder="영어로 입력하세요" 
                value={input1}
                onChange={(e) => setInput1(e.target.value)}
                className="w-full p-[14px] text-[15px] rounded-[12px] border border-[#e5e7eb] focus:outline-none focus:border-[#4f46e5] transition-colors shadow-sm"
                autoComplete="off"
              />
            </div>

            <div className="mb-[18px] text-left">
              <p className="font-bold mb-2 text-gray-900">“그(that) 강아지 얼마나 귀여워?”</p>
              <input 
                id="q2" 
                type="text" 
                placeholder="영어로 입력하세요" 
                value={input2}
                onChange={(e) => setInput2(e.target.value)}
                className="w-full p-[14px] text-[15px] rounded-[12px] border border-[#e5e7eb] focus:outline-none focus:border-[#4f46e5] transition-colors shadow-sm"
                autoComplete="off"
              />
            </div>

            {!step2Result && (
              <button 
                onClick={checkStep2}
                className="w-full mt-6 py-[16px] px-[18px] rounded-full border-none bg-[#4f46e5] text-white font-extrabold text-[16px] cursor-pointer shadow-[0_10px_24px_rgba(79,70,229,0.35)] transition-all duration-200 hover:-translate-y-[2px] hover:shadow-[0_14px_32px_rgba(79,70,229,0.45)]"
              >
                정답 확인하기
              </button>
            )}

            {/* Wrong Result */}
            {step2Result === 'wrong' && (
              <div className="mt-6 p-6 rounded-[18px] bg-[#fff2f2] text-left animate-fadeIn">
                <p className="font-black text-[#dc2626] mb-2 text-base">
                  ❌ 아직 구조가 완전히 잡히지 않았어요.
                </p>

                <p className="text-sm mb-4 text-gray-900 leading-relaxed">
                  사실 이 문장들,<br />
                  <strong className="font-black text-[#ef4444]">“How old are you”와 똑같은</strong> 구조랍니다.
                </p>

                <div className="bg-white rounded-[12px] p-[14px] mb-[18px] text-sm text-gray-900 shadow-sm">
                  <p className="font-bold mb-1">정답:</p>
                  <p>How tall is he?</p>
                  <p>How cute is that dog?</p>
                </div>

                <button 
                  onClick={() => setStep(3)}
                  className="cta-hologram w-full py-[16px] px-[18px] rounded-[14px] border-none text-[16px] font-black text-[#0b0f19] cursor-pointer transition-all duration-300"
                >
                  당신을 위한 단 하나의 수업
                </button>
              </div>
            )}

            {/* Correct Result (Design Updated) */}
            {step2Result === 'correct' && (
              <div className="mt-6 p-6 rounded-[18px] bg-[#eef4ff] text-left animate-fadeIn font-[Pretendard]">
                <p className="font-[900] text-[#2563eb] mb-[14px] text-base">
                  ⭕ 정답입니다! : 영어 구조의 중요성을 알고 계시는군요?
                </p>

                <div className="bg-white rounded-[12px] p-[16px] mb-[18px] text-[14px] leading-[1.6] shadow-sm">
                  <p>How old are you?</p>
                  <p>How tall is he?</p>
                  <p>How cute is that dog?</p>
                </div>

                <button 
                  onClick={() => setStep(3)}
                  className="cta-hologram w-full py-[16px] px-[18px] rounded-[14px] border-none text-[16px] font-black text-[#0b0f19] cursor-pointer transition-all duration-300"
                >
                  당신을 위한 단 하나의 수업
                </button>
              </div>
            )}

            <style>{`
              .cta-hologram {
                background: linear-gradient(120deg, #ffffff, #e8f0ff, #ffe8f6, #e8fff6, #ffffff);
                background-size: 300% 300%;
                box-shadow: 0 12px 30px rgba(0, 0, 0, 0.18), inset 0 0 0 1px rgba(255, 255, 255, 0.7);
                animation: hologramFlow 6s ease infinite;
              }
              .cta-hologram:hover {
                transform: translateY(-2px) scale(1.01);
                box-shadow: 0 18px 40px rgba(0, 0, 0, 0.22), inset 0 0 0 1px rgba(255, 255, 255, 0.9);
              }
              @keyframes hologramFlow {
                0% { background-position: 0% 50%; }
                50% { background-position: 100% 50%; }
                100% { background-position: 0% 50%; }
              }
            `}</style>
          </div>
        )}

        {/* STEP 3: COMPARISON SUMMARY (Updated Design) */}
        {step === 3 && (
          <div className="animate-fadeIn font-[Pretendard] text-center">
            <h2 className="text-[28px] font-[900] mb-[48px] text-gray-900">차이가 느껴지시나요?</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-[28px] max-w-[980px] mx-auto mb-[48px]">
              
              {/* Old Way */}
              <div className="p-[28px] rounded-[22px] bg-[#f1f1f1] opacity-75 text-left shadow-[0_18px_40px_rgba(0,0,0,0.1)] transition-all duration-400">
                <h3 className="text-[18px] font-[800] mb-[16px] text-gray-900">❌ 기존 방식 (단순 표현 암기)</h3>
                <ul className="list-none p-0 text-[15px] leading-[1.8] text-gray-800">
                  <li>너 몇 살이야 → <strong>How old are you!</strong></li>
                  <li>너 얼마나 키 커 → <strong>How tall…?</strong></li>

                  <li className="mt-[10px] text-[#111] text-[16px]">❓ <strong>그 차 얼마나 빨라?</strong></li>
                  <li className="text-[#e11d48] font-[800]">😵 <strong>대답 못함</strong></li>
                  <li className="text-[#b91c1c] font-[800]"><strong>새 질문이 나오면 다시 막힘</strong></li>
                </ul>
              </div>

              {/* New Way */}
              <div className="p-[28px] rounded-[22px] bg-[#e8edff] text-left shadow-[0_18px_40px_rgba(0,0,0,0.1)] transition-all duration-400 hover:-translate-y-[8px] hover:scale-[1.02] hover:shadow-[0_26px_60px_rgba(80,70,255,0.25)] hover:bg-[#dde4ff]">
                <h3 className="text-[18px] font-[800] mb-[16px] text-gray-900">✅ 구구단 패키지 (구조 자동화)</h3>

                <p className="text-[16px] font-[800] mb-[20px] text-[#3730a3]">
                  <strong>How + 형용사 + be + 주어</strong>
                </p>

                {/* Flow Wrapper */}
                <div className="overflow-hidden rounded-[12px] bg-white mb-[20px]">
                  <div className="flex gap-[40px] py-[14px] animate-flow whitespace-nowrap font-[600] text-gray-900">
                     <span>How fast is the car?</span>
                     <span>How cute is that dog?</span>
                     <span>How tall is he?</span>
                     <span>How old are you?</span>
                     <span>How expensive is it?</span>
                     <span>How difficult is this?</span>
                     <span>How far is the station?</span>
                     {/* Duplicate for infinite loop */}
                     <span>How fast is the car?</span>
                     <span>How cute is that dog?</span>
                     <span>How tall is he?</span>
                     <span>How old are you?</span>
                     <span>How expensive is it?</span>
                     <span>How difficult is this?</span>
                     <span>How far is the station?</span>
                  </div>
                </div>

                <p className="text-[14px] leading-[1.6] text-gray-900">
                  “얼마나 ~ 해?”는 결국<br />
                  <strong>이 패턴 하나</strong>라는 것을 깨닫게 됩니다.
                </p>
              </div>
            </div>

            <p className="text-[18px] font-[700] mb-[28px] text-gray-900 leading-relaxed">
              하나를 알면 무한으로 확장되는 영어 문장들.<br />
              이 차이를 만드는 것, <span className="text-[#4f46e5] font-[900]">구구단 패키지</span>로 시작하세요.
            </p>

            <ul className="list-none p-0 max-w-[520px] mx-auto mb-[40px] text-[15px] leading-[1.8] text-left text-gray-900">
              <li>✔️ <strong>기초 · 구조 중심 수업</strong></li>
              <li>✔️ <strong>무한 이용 · 전용 학습 어플리케이션</strong><br />
                  <small className="text-[12px] text-[#555]">(영어 공부 위해 따로 돈 낼 필요 없음)</small>
              </li>
              <li>✔️ <strong>부담스럽지 않은 수업 시간</strong></li>
            </ul>

            <a 
              href={COURSE_LINK}
              className="inline-block py-[16px] px-[36px] rounded-full border-none bg-gradient-to-r from-[#4f46e5] to-[#6366f1] text-white text-[16px] font-[800] cursor-pointer shadow-[0_14px_30px_rgba(79,70,229,0.4)] transition-all duration-300 hover:-translate-y-[4px] hover:shadow-[0_22px_40px_rgba(79,70,229,0.55)] no-underline"
            >
              제대로 영어 공부하고 싶다면?
            </a>

            <div className="mt-8">
              <button 
               onClick={() => {
                 setStep(1);
                 resetStep1();
                 setInput1('');
                 setInput2('');
                 setStep2Result(null);
               }}
               className="text-gray-400 text-sm font-semibold hover:text-gray-600 transition-colors"
             >
               ↺ 처음부터 다시 해보기
             </button>
            </div>

            <style>{`
              @keyframes flow {
                from { transform: translateX(0); }
                to { transform: translateX(-50%); }
              }
              .animate-flow {
                animation: flow 18s linear infinite;
                width: max-content;
              }
            `}</style>
          </div>
        )}

      </Reveal>
    </section>
  );
};

export default ComparisonSection;