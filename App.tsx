import React, { useState, useEffect } from 'react';
import { 
  Heart, Users, Calendar, ShieldCheck, BookOpen, Activity, ArrowRight, 
  ChevronDown, CheckCircle2, Lock, MessageSquare, Star, ChevronRight, 
  Share2, Download, ChevronUp, RefreshCcw, ArrowLeft, Sun 
} from 'lucide-react';

import { brandColors, cities, currentOptions, futureOptions, questions, powerCategories } from './constants.tsx';
import { AvatarIllustration, IntroIllustration, SceneIllustration, WarmVideoIllustration } from './components/Illustrations.tsx';

const App = () => {
  // 核心狀態
  const [currentPage, setCurrentPage] = useState('intro'); 
  const [scores, setScores] = useState({});
  const [expandedPower, setExpandedPower] = useState(null); 
  const [showConsult, setShowConsult] = useState(false);
  const [moodState, setMoodState] = useState({ 
    currentImg: null, 
    currentTag: '', 
    futureImg: null, 
    futureTag: '' 
  });
  
  const [nebulaData, setNebulaData] = useState({
    q1: 5,
    q8: '', 
    q9: '', 
    q15: '', 
    q16: '', 
    nickname: '',
    avatar: null
  });

  const [consultForm, setConsultForm] = useState({
    q2: [], 
    q3: '', 
    q4: '', 
    q12: '', 
    q13: '', 
    q14: '', 
    q17: '', 
    q19: '', 
    q20: ''  
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    if (currentPage === 'result') {
      document.title = (nebulaData.nickname || '我') + '的照顧指南報告';
    } else {
      document.title = "星雲計畫 - 照護指南";
    }
  }, [currentPage, nebulaData.nickname]);

  useEffect(() => {
    if (showConsult) {
      setTimeout(() => {
        const el = document.getElementById('consult-section');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }, [showConsult]);

  const gradientStyle = `linear-gradient(90deg, ${brandColors.primary}, ${brandColors.secondary}, ${brandColors.success}, ${brandColors.accent})`;

  const getProgress = () => {
    switch (currentPage) {
      case 'intro': return 0;
      case 'assessment': return 20;
      case 'mood': return 40;
      case 'nebula': return 60;
      case 'result': return 80;
      case 'consult': return 100;
      default: return 0;
    }
  };

  const getCategoryScore = (catId) => {
    const relevantIds = powerCategories[catId].ids;
    return relevantIds.reduce((sum, id) => sum + (scores[id] || 0), 0);
  };

  const handleScoreChange = (id, value) => {
    setScores(prev => ({ ...prev, [id]: value }));
  };

  const togglePower = (key) => {
    setExpandedPower(expandedPower === key ? null : key);
  };

  const navigateTo = (page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const handleRestart = () => {
    setScores({});
    setExpandedPower(null);
    setShowConsult(false);
    setMoodState({ currentImg: null, currentTag: '', futureImg: null, futureTag: '' });
    setNebulaData({ q1: 5, q8: '', q9: '', q15: '', q16: '', nickname: '', avatar: null });
    setConsultForm({ q2: [], q3: '', q4: '', q12: '', q13: '', q14: '', q17: '', q19: '', q20: '' });
    navigateTo('intro');
  };

  const handleDownload = () => window.print();

  const handleShare = () => {
    const shareText = `我剛完成一份照顧家人的指南，分享給你看照顧要點：${window.location.href}`;
    const lineUrl = `https://line.me/R/msg/text/?${encodeURIComponent(shareText)}`;
    window.open(lineUrl, '_blank');
  };

  const isAssessmentComplete = Object.keys(scores).length === questions.length;
  const isMoodComplete = moodState.currentImg !== null && moodState.currentTag !== '' && moodState.futureImg !== null && moodState.futureTag !== '';
  const isFinalStepComplete = !!(nebulaData.q1 && nebulaData.q8 && nebulaData.q9 && nebulaData.q15 && nebulaData.q16 && nebulaData.nickname && nebulaData.avatar);

  const getRiskLevel = (score) => {
    if (score <= 3) return { label: '高風險', color: '#f87171', bg: '#fee2e2', shadow: 'rgba(248, 113, 113, 0.6)' }; 
    if (score <= 7) return { label: '中風險', color: '#f59e0b', bg: '#fef3c7', shadow: 'rgba(245, 158, 11, 0.6)' }; 
    return { label: '低風險', color: '#10b981', bg: '#d1fae5', shadow: 'rgba(16, 185, 129, 0.6)' }; 
  };

  const getAnalysisData = () => {
    const sScore = getCategoryScore('support');
    const iScore = getCategoryScore('info');
    const kScore = getCategoryScore('knowledge');
    const { q1: pressure, q8: disease, q9: residence, q16: duration } = nebulaData;

    const moodAnalysis = `看著您勾選的「${moodState.currentTag}」，那種辛苦我們都懂。請先對自己說聲「辛苦了」，這份安慰感是您應得的。而對於「${moodState.futureTag}」的期盼，是支持您走下去的微光。讓我們透過檢視當下的能力缺口，將這份願景轉化為具體可行的照顧日常，陪您找回生活的平穩節奏。`;

    const supportMsg = `支持力 ${sScore} 分顯示您在 ${duration} 的照顧中，正承受著 ${pressure} 分的壓力負荷。由於情緒與溝通的需求隨年資累積而深化，這份概況反映了您目前在尋求外援與自我情緒調節間的平衡狀態，亟需強化心理彈性。`;

    const infoMsg = `資訊力 ${iScore} 分反映您目前在「${residence}」環境下，對外部資源的鏈結度。針對「${disease}」的變動，現況顯示您需要更精確地掌握長照或醫療銜接資訊，將零散的情報轉化為穩定的支援網絡，以降低決策時的不安全感。`;

    const knowledgeMsg = `知識力 ${kScore} 分顯示您對「${disease}」專業知識的掌握程度。這項數據不僅代表對病徵的判斷力，更延伸論述了您在臨床照護技巧與醫療選擇上的自信心，是確保被照顧者生活品質並減少突發混亂的核心關鍵。`;

    const supportStrategies = [
      { 
        title: pressure > 7 ? "強制情緒斷開" : "日常微小留白", 
        desc: pressure > 7 ? "您的壓力值已達臨界。請每天強制騰出15分鐘，無論是聽音樂或放空，暫時中斷照顧思考，這不是偷懶，是為了走得更遠。" : "在忙碌中建立儀式感，利用照顧空檔喝杯咖啡或深呼吸。這些微小的留白能協助您在瑣碎的日常中，維持基本的心理彈性。" 
      },
      { 
        title: sScore < 5 ? "具體求助清單" : "尋找同儕共鳴", 
        desc: sScore < 5 ? "別再獨自承擔。試著寫下「能幫忙買午餐」或「代看一小時」的具體需求，向家人或朋友求援。明確的指令能提高他人幫忙的意願。" : "支持力不錯的您，可以試著加入照顧者社群。透過與有相同經驗的人對話，在共鳴中獲得情緒的洗滌，並交換更有效的心靈調適心法。" 
      }
    ];

    const getDiseaseAdvice = (d) => {
      switch(d) {
        case '失智症': return { t: "認知功能引導", d: "學習非語言溝通技巧。掌握病程波動，提前預防黃昏症候群的行為問題。" };
        case '中風': return { t: "功能維持與復健", d: "專注於正確的轉移位技巧，防止二次跌倒。鼓勵長輩利用殘餘功能。" };
        default: return { t: "日常病徵觀察", d: "建立專屬的照護筆記，紀錄體溫、飲食與睡眠變化。" };
      }
    };
    const diseaseAdvice = getDiseaseAdvice(disease);
    const knowledgeStrategies = [
      { title: diseaseAdvice.t, desc: diseaseAdvice.d },
      { title: "進階共處技巧優化", desc: "學習如何引導被照顧者的情緒與行為，優化動線配置讓照護更省力。" }
    ];

    return {
      mood: moodAnalysis,
      support: { score: sScore, msg: supportMsg, strategies: supportStrategies, risk: getRiskLevel(sScore) },
      info: { score: iScore, msg: infoMsg, strategies: [], risk: getRiskLevel(iScore) },
      knowledge: { score: kScore, msg: knowledgeMsg, strategies: knowledgeStrategies, risk: getRiskLevel(kScore) }
    };
  };

  const analysis = getAnalysisData();

  const handleGenerateReport = () => {
    fetch('https://hook.us2.make.com/osvdwga9wtb365rj4i3v4wxp9lkjpmhy', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nickname: nebulaData.nickname, timestamp: new Date().toISOString() }),
    }).catch(e => console.error(e));
    navigateTo('result');
  };

  return (
    <div className="min-h-screen font-sans text-gray-800 pb-16 bg-[#fffafb] text-[15pt] leading-[1.45]">
      <header className="fixed top-0 left-0 right-0 z-50">
        <div className="p-2 text-center shadow-sm flex justify-center items-center" style={{ backgroundColor: brandColors.softPink }}>
          <img src="https://www.ilong-termcare.com/uploads/photos/shares/articles-content/%E6%98%9F%E9%9B%B2%E8%A8%88%E7%95%ABLOGO.png" alt="星雲計畫" className="h-10 w-auto object-contain scale-110" />
        </div>
        <div className="h-1.5 w-full bg-gray-100 overflow-hidden">
          <div className="h-full transition-all duration-500 ease-out shadow-[0_0_8px_rgba(0,0,0,0.2)]" style={{ width: `${getProgress()}%`, background: gradientStyle }} />
        </div>
      </header>

      <main className="max-w-md mx-auto px-3 pt-20">
        {currentPage === 'intro' && (
          <div className="space-y-6 animate-in fade-in">
            <div className="bg-white p-6 rounded-[32px] shadow-sm border-2 overflow-hidden flex flex-col items-center" style={{ borderColor: brandColors.softBlue }}>
              <IntroIllustration />
              <h2 className="text-[26px] font-black mb-1 text-center" style={{ color: brandColors.deepPink }}>照護指南速成工具</h2>
              <button onClick={() => navigateTo('assessment')} className="w-full py-5 rounded-full text-white font-black text-xl shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2" style={{ backgroundColor: brandColors.deepPink }}>
                開始吧！GO！ <ArrowRight className="w-6 h-6" />
              </button>
            </div>
          </div>
        )}

        {currentPage === 'assessment' && (
          <div className="space-y-4 animate-in slide-in-from-right">
            {questions.map((q) => (
              <div key={q.id} className="p-4 rounded-2xl bg-white border-2" style={{ borderColor: scores[q.id] ? brandColors.success : brandColors.softBlue }}>
                <div className="flex items-start gap-3 mb-4">
                  <div className="p-2 rounded-full" style={{ backgroundColor: brandColors.softBlue + '44' }}>{q.icon}</div>
                  <h2 className="text-lg font-medium leading-tight">{q.text}</h2>
                </div>
                <div className="flex justify-between items-center px-1">
                  {[1, 2, 3, 4, 5].map((num) => (
                    <button key={num} onClick={() => handleScoreChange(q.id, num)} className="w-11 h-11 rounded-full border-2 flex items-center justify-center font-bold"
                      style={{ backgroundColor: scores[q.id] === num ? brandColors.primary : 'transparent', borderColor: scores[q.id] === num ? brandColors.primary : brandColors.softBlue, color: scores[q.id] === num ? 'white' : '#666' }}>{num}</button>
                  ))}
                </div>
              </div>
            ))}
            <button disabled={!isAssessmentComplete} onClick={() => navigateTo('mood')} className="w-full py-4 rounded-full text-white font-bold text-lg shadow-md disabled:opacity-50 mt-4" style={{ backgroundColor: brandColors.secondary }}>下一頁</button>
          </div>
        )}

        {currentPage === 'result' && (
          <div className="animate-in zoom-in pb-10">
            <div id="result-card" className="bg-white p-5 rounded-[32px] shadow-xl border-2" style={{ borderColor: brandColors.softPink }}>
              <div className="flex flex-col items-center mb-8 pb-6 border-b border-dashed" style={{ borderColor: brandColors.softBlue }}>
                <AvatarIllustration type={nebulaData.avatar} selected={false} />
                <h2 className="text-xl font-bold mt-3">{nebulaData.nickname} 的照顧檔案</h2>
              </div>
              <div className="mb-10 text-center">
                <p className="text-gray-600">{analysis.mood}</p>
              </div>
              <div className="space-y-8">
                  {['support', 'info', 'knowledge'].map(key => (
                    <div key={key} className="p-4 rounded-xl border" style={{ borderColor: brandColors.softBlue }}>
                      <h3 className="font-bold flex items-center gap-2" style={{ color: brandColors.deepPink }}>
                        {powerCategories[key].icon} {powerCategories[key].label} 評析
                      </h3>
                      <p className="text-sm mt-2">{analysis[key].msg}</p>
                    </div>
                  ))}
              </div>
              <WarmVideoIllustration />
              <button onClick={handleRestart} className="w-full mt-8 py-4 rounded-full border-2 font-bold no-print" style={{ borderColor: brandColors.primary, color: brandColors.primary }}>重新檢測</button>
            </div>
          </div>
        )}
        
        {/* 其他頁面內容略... 如 mood, nebula 等按前述邏輯顯示 */}
        {currentPage === 'mood' && (
           <div className="space-y-8 animate-in slide-in-from-right pb-10">
             <button onClick={() => navigateTo('nebula')} className="w-full py-4 rounded-full text-white font-bold text-lg shadow-md" style={{ backgroundColor: brandColors.secondary }}>下一頁</button>
           </div>
        )}
        {currentPage === 'nebula' && (
           <div className="space-y-8 animate-in slide-in-from-right pb-10">
              <input type="text" value={nebulaData.nickname} onChange={(e) => setNebulaData({...nebulaData, nickname: e.target.value})} placeholder="暱稱" className="w-full p-4 border rounded" />
              <button onClick={handleGenerateReport} className="w-full py-4 rounded-full text-white font-bold text-lg shadow-md" style={{ backgroundColor: brandColors.deepPink }}>生成報告</button>
           </div>
        )}
      </main>

      <footer className="fixed bottom-0 left-0 right-0 h-3 z-50" style={{ background: gradientStyle }}></footer>
    </div>
  );
};

export default App;