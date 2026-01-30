import React, { useEffect, useState } from "react";
import Reveal from "./Reveal";

const reviews = [
  ["맨날 표현만 외우고 실제 상황에서 쓰지를 못했는데,<br>이제는 진짜 말을 해요", "이*주"],
  ["영어 말하기의 두려움이 진짜로 사라지고 있어요", "박*현"],
  ["부담스럽지 않은데 정확해서 좋은 강의예요", "김*민"],
  ["문장이 이어지기 시작했어요", "최*지"],
  ["하루 분량이 부담 없어요", "정*훈"],
  ["말문이 트입니다", "서*연"],
  ["구조 이해가 핵심이네요", "윤*호"],
  ["예전이랑 다릅니다", "장*은"],
  ["실제로 말하게 됩니다", "한*우"],
  ["기초가 진짜 잡혀요", "조*아"]
];

const ReviewsSection: React.FC = () => {

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setIndex(i => (i + 1) % reviews.length);
    }, 2600);
    return () => clearInterval(t);
  }, []);

  const visible = [
    reviews[index],
    reviews[(index + 1) % reviews.length],
    reviews[(index + 2) % reviews.length]
  ];

  return (
    <section className="py-[120px] px-[20px] bg-gradient-to-b from-[#f8faff] to-white">

      <Reveal className="max-w-[1100px] mx-auto">

        {/* ===== 헤더 ===== */}

        <div className="text-center mb-[60px]">

          <h2 className="text-[34px] md:text-[44px] font-[900] tracking-tight">
            수강생 후기
          </h2>

          <p className="mt-3 text-gray-600 font-[700]">
            실제 수강생들이 느낀 변화
          </p>

        </div>

        {/* ===== 카드 영역 ===== */}

        <div className="
          grid grid-cols-1
          md:grid-cols-3
          gap-[22px]
        ">

          {visible.map((r, i) => (
            <ReviewCard key={i} text={r[0]} name={r[1]} />
          ))}

        </div>

      </Reveal>
    </section>
  );
};


const ReviewCard = ({ text, name }: any) => (
  <div className="
    relative rounded-[24px] p-[26px]
    bg-white
    border border-blue-100
    shadow-[0_18px_50px_rgba(40,80,200,0.12)]
    hover:-translate-y-2 hover:shadow-[0_28px_70px_rgba(40,80,200,0.18)]
    transition-all duration-300
    overflow-hidden
  ">

    {/* shimmer */}
    <div className="
      absolute inset-0 opacity-0 hover:opacity-100
      bg-gradient-to-r from-transparent via-blue-100/40 to-transparent
      animate-[shimmer_1.8s_linear]
    "/>

    <div className="relative z-10">

      <div className="text-[15px] md:text-[16px] font-[700] leading-relaxed"
        dangerouslySetInnerHTML={{ __html: text }}
      />

      <div className="mt-4 text-blue-600 font-[900] text-[14px]">
        — {name}
      </div>

    </div>

  </div>
);

export default ReviewsSection;