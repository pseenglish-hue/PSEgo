import React, { useEffect, useState, useRef } from 'react';
import Reveal from './Reveal';
import { COURSE_LINK } from '../constants';

const PricingSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  const [showNewPrice, setShowNewPrice] = useState(false);
  const [activeDurationStrike, setActiveDurationStrike] = useState(false);
  const [showNewDuration, setShowNewDuration] = useState(false);

  useEffect(() => {
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setTimeout(() => setShowNewPrice(true), 900);
        setTimeout(() => setActiveDurationStrike(true), 1200);
        setTimeout(() => setShowNewDuration(true), 1500);
        io.disconnect();
      }
    }, { threshold: 0.25 });

    if (sectionRef.current) io.observe(sectionRef.current);
    return () => io.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 bg-gray-900 text-white">

      <Reveal className="max-w-4xl mx-auto px-4 text-center">

        <h2 className="text-4xl font-extrabold mb-10 tracking-tight">
          이번이 당신의 마지막 영어 공부가 될 것입니다
        </h2>

        {/* ===== 가격 카드 ===== */}

        <div className="
          bg-white/10 p-10 rounded-3xl backdrop-blur-md border border-white/20
          transition-all duration-500
          hover:bg-white/15 hover:scale-[1.02] hover:shadow-2xl
        ">

          <div className="mb-6 flex justify-center">
            <div className="px-5 py-2 rounded-full bg-yellow-400 text-black font-extrabold shadow-lg animate-pulse">
              🔥 20% 할인 이벤트 중
            </div>
          </div>

          <p className="text-2xl mb-6">기초 완성 (99단) 수강료</p>

          <div className="mb-8">

            <div className="text-3xl opacity-40 line-through">
              375,000원
            </div>

            <div
              className="text-5xl font-black text-yellow-300 transition-all duration-700 drop-shadow-lg"
              style={{
                opacity: showNewPrice ? 1 : 0,
                transform: showNewPrice ? 'translateY(0)' : 'translateY(14px)'
              }}
            >
              300,000원
            </div>

          </div>

          {/* CTA hologram button */}

          <a
            href={COURSE_LINK}
            className="
              relative inline-flex bg-yellow-400 text-black px-8 py-4 rounded-2xl
              font-extrabold overflow-hidden group
              hover:scale-105 transition shadow-xl
            "
          >
            <span className="relative z-10">
              수강 신청하고 영어 독립하기
            </span>

            <span className="
              absolute inset-0 opacity-0 group-hover:opacity-100
              bg-gradient-to-r from-transparent via-white/60 to-transparent
              animate-[shimmer_1.4s_linear]
            "/>
          </a>


          {/* ===== 패키지 구성 ===== */}

          <div className="mt-12 bg-white/5 border border-white/15 rounded-3xl p-8 text-left
                          hover:bg-white/10 transition">

            <h3 className="text-xl font-extrabold mb-5 text-yellow-300">
              📦 구구단 패키지 구성
            </h3>

            <ul className="space-y-3 text-gray-100">
              <li><b>대상 과정 :</b> Essential ~ Lv.4</li>
              <li><b>과정 구성 :</b> 99가지 주제, 273강</li>

              <li>
                <b>수강 기간 :</b>{" "}
                <span className="relative inline-block mr-2 opacity-50">
                  250일
                  <span className={`absolute left-0 top-1/2 h-[2px] bg-red-400 transition-all duration-500
                    ${activeDurationStrike ? 'w-full' : 'w-0'}`} />
                </span>

                <span
                  className="font-black text-yellow-300 transition-all duration-500"
                  style={{
                    opacity: showNewDuration ? 1 : 0,
                    transform: showNewDuration ? 'translateY(0)' : 'translateY(8px)'
                  }}
                >
                  350일 (추가 100일 제공)
                </span>
              </li>

              <li>
                <b>수강료 :</b> 375,000원 →
                <span className="text-yellow-300 font-black">
                  300,000원 (20% 할인)
                </span>
              </li>
            </ul>
          </div>


          {/* ===== 특별 혜택 ===== */}

          <div className="mt-8 bg-indigo-500/10 border border-indigo-300/30 rounded-3xl p-8 text-left
                          hover:bg-indigo-500/20 transition">

            <h3 className="text-xl font-extrabold mb-5">
              🎁 모든 수강생 특별 혜택
            </h3>

            <ul className="space-y-3 text-gray-100">
              <li>✔️ 기본 수강 기간 + 추가 수강 기간 <b>100일 제공</b></li>
              <li>✔️ 온/오프라인 특강 무료 수강</li>
              <li>✔️ 완강 시 20% 수강할인권 제공</li>
            </ul>
          </div>


          {/* ===== 환급 챌린지 (강조 업그레이드) ===== */}

          <div className="
            mt-10 bg-yellow-400 text-black rounded-3xl p-10 text-left shadow-2xl
            transition hover:scale-[1.02]
          ">

            <h3 className="text-2xl font-black mb-4">
              🏁 99일 완성 환급 챌린지
            </h3>

            <p className="font-semibold leading-relaxed mb-4">
              ✔ 매일 한 주제 학습<br/>
              ✔ 주제당 1~3강 수강<br/>
              ✔ 하루 투자 시간 최소 10분 ~ 최대 30분
            </p>

            <div className="bg-black/10 rounded-xl p-6 mb-4">
              <p className="font-semibold">
                시스템이 자동으로 학습 기록을 저장합니다.<br/>
                따로 인증할 필요 없습니다.
              </p>
            </div>

            <div className="text-3xl font-black animate-pulse">
              🎯 목표 달성 시 수강료 50% 환급
            </div>

          </div>

        </div>


        {/* ===== FAQ 아코디언 ===== */}

        <div className="mt-16 text-left max-w-3xl mx-auto">
          <h3 className="text-2xl font-extrabold mb-8 text-center">
            ❓ 수강 전 꼭 확인하세요
          </h3>

          <FaqAccordion q="완전 초보도 가능한가요?"
            a="가능합니다! 영어의 기본 중 기본부터 하나씩 스텝을 밟아나가실 수 있어요." />

          <FaqAccordion q="숙제가 많나요?"
            a="없습니다. 수업 안에서 학습과 복습이 함께 이루어집니다." />

          <FaqAccordion q="전용 학습 앱은 무엇인가요?"
            a="프린서플 어학원 전용 [클래스 카드]를 사용해 문장을 무한 반복하며 연습할 수 있어요!" />

          <FaqAccordion q="기본 혜택은 모든 수강생에게 적용되나요?"
            a="네. 추가 100일, 특강 무료, 20% 할인권은 전원 제공됩니다. 환급 챌린지만 별도로 진행되는 내용입니다." />

          <FaqAccordion q="99일 완성 환급 챌린지가 정확히 무엇인가요?"
            a="구구단 패키지의 수업은 총 99개 주제, 273강 구성입니다. 이 챌린지에 참여 하시기 위해서는 하루 한 주제씩, 주제당 1~3강을 수강하며 하루 10~30분 투자해주시면 됩니다." />

          <FaqAccordion q="참여 방법은?"
            a="자동으로 학습 일자가 기록됩니다. 따로 인증하실 필요 없습니다." />

          <FaqAccordion q="성공하면?"
            a="프린서플 안내데스크(02-539-8963) 또는 프린서플 어학원 카카오톡 공식 페이지로 연락을 주세요. 친절히 안내해 드리겠습니다." />

        </div>

      </Reveal>
    </section>
  );
};


/* ===== FAQ 아코디언 컴포넌트 ===== */

const FaqAccordion = ({ q, a }: { q: string; a: string }) => {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="bg-white/5 border border-white/15 rounded-2xl p-6 mb-4 cursor-pointer hover:bg-white/10 transition"
      onClick={() => setOpen(!open)}
    >
      <div className="flex justify-between items-center">
        <p className="font-bold text-yellow-300">Q. {q}</p>
        <span className={`transition ${open ? 'rotate-180' : ''}`}>⌄</span>
      </div>

      <div className={`
        overflow-hidden transition-all duration-300
        ${open ? 'max-h-40 mt-3' : 'max-h-0'}
      `}>
        <p className="text-gray-200 leading-relaxed">{a}</p>
      </div>
    </div>
  );
};

export default PricingSection;
