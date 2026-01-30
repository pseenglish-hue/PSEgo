import React, { useEffect, useState } from "react";
import Reveal from "./Reveal";

const words = ["old", "tall", "fast", "big", "small", "busy", "far", "cute"];

const CurriculumStepsSection: React.FC = () => {

  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setWordIndex(i => (i + 1) % words.length);
    }, 1200);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="py-[120px] px-[20px] bg-gradient-to-b from-white to-[#eef2ff]">

      <Reveal className="max-w-[1200px] mx-auto">

        {/* ===== 헤더 ===== */}

        <div className="text-center mb-[70px]">

          <h2 className="text-[36px] md:text-[46px] font-[900] tracking-tight">
            학습 방식
          </h2>

          {/* ✅ 스크롤 제거 / 줄 나열 버전 */}

          <div className="mt-6 flex justify-center">

            <div className="
              flex flex-wrap items-center justify-center gap-2
              px-5 py-4 rounded-[26px]
              bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500
              text-white
              font-[800]
              text-[13px] md:text-[16px]
              shadow-[0_10px_30px_rgba(59,108,255,0.35)]
              max-w-[640px]
            ">

              <span className="opacity-90 basis-full mb-1">
                모든 단계 방식 동일
              </span>

              <Flow>구조</Flow>
              <Arrow />
              <Flow>단어</Flow>
              <Arrow />
              <Flow>문장</Flow>
              <Arrow />
              <Flow>자동화</Flow>

            </div>

          </div>

        </div>

        {/* ===== 스텝 ===== */}

        <div className="
          grid grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-4
          gap-[18px]
        ">

          {/* STEP 1 — USAGE */}

          <Card accent="blue" step="1" badge="USAGE" title="구조 이해">

            <p>
              <b>“얼마나 ~ 해?”</b> 라는 문장은
            </p>

            <div className="mt-2 font-[900] text-blue-600">
              How + 형용사 + be동사 + 주어
            </div>

            <p className="mt-3 text-[14px]">
              How old are you? = 너 몇 살이야?<br/>
              → 얼마나 나이를 먹었냐는 의미입니다.
            </p>

            <p className="mt-3 text-[14px] font-[700]">
              이 구조는 전부 “얼마나 ~ 해?”로 해석됩니다.
            </p>

          </Card>


          {/* STEP 2 — VOCAB */}

          <Card accent="indigo" step="2" badge="VOCAB" title="단어 확장">

            <p className="mb-2 text-[14px]">
              형용사를 넣으면 뜻이 완전히 달라집니다
            </p>

            <div className="flex flex-wrap gap-2 text-[13px] font-[700]">
              {words.map(w => (
                <span key={w} className="px-2 py-1 bg-indigo-100 rounded">
                  {w}
                </span>
              ))}
            </div>

            <div className="mt-4 text-center text-[18px] font-[900]">
              How <span className="text-indigo-600 animate-pulse">{words[wordIndex]}</span> are you?
            </div>

          </Card>


          {/* STEP 3 — PRACTICE */}

          <Card accent="purple" step="3" badge="PRACTICE" title="문장 만들기">

            <ul className="text-[14px] space-y-2 font-[600]">
              <li>그거 얼마나 커? → How big is it?</li>
              <li>그거 얼마나 빨라? → How fast is it?</li>
              <li>그거 얼마나 작아? → How small is it?</li>
            </ul>

            <p className="mt-3 text-[13px] text-purple-700 font-[700]">
              구조 + 단어 = 문장 생성
            </p>

          </Card>


          {/* PLUS */}

          <Card accent="yellow" step="+" badge="PLUS" title="자동화">

            <p className="font-[700] text-[14px]">
              전용 앱 반복 훈련<br/>
              → 말하기 자동화<br/>
              → 구조 체화
            </p>

          </Card>

        </div>

      </Reveal>
    </section>
  );
};


/* ===== Flow / Arrow ===== */

const Flow = ({ children }: any) => (
  <span className="
    bg-white/15 px-2 py-1
    rounded-full
    text-white
    font-[900]
    text-[12px] md:text-[14px]
    backdrop-blur-sm
  ">
    {children}
  </span>
);

const Arrow = () => (
  <span className="opacity-80 font-[900] text-[12px] md:text-[14px]">
    →
  </span>
);


/* ===== 카드 ===== */

const Card = ({ step, badge, title, accent, children }: any) => {

  const colorMap: any = {
    blue: "from-blue-50 to-blue-100 border-blue-200",
    indigo: "from-indigo-50 to-indigo-100 border-indigo-200",
    purple: "from-purple-50 to-purple-100 border-purple-200",
    yellow: "from-yellow-50 to-yellow-100 border-yellow-300"
  };

  return (
    <div className={`
      rounded-[22px] border
      bg-gradient-to-br ${colorMap[accent]}
      p-[22px]
      shadow-[0_14px_40px_rgba(30,60,160,0.12)]
      hover:-translate-y-2 hover:shadow-[0_30px_80px_rgba(30,60,160,0.18)]
      transition-all duration-300
    `}>

      <div className="flex items-center gap-3 mb-3">
        <div className="w-[30px] h-[30px] rounded-full bg-black text-white text-[13px]
                        font-[900] flex items-center justify-center">
          {step}
        </div>

        <span className="text-[12px] font-[900] tracking-widest text-gray-700">
          {badge}
        </span>
      </div>

      <div className="font-[900] text-[18px] mb-3">
        {title}
      </div>

      {children}

    </div>
  );
};

export default CurriculumStepsSection;
