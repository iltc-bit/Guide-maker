
import React, { useState, useEffect } from 'react';
import { 
  Heart, Users, Calendar, ShieldCheck, BookOpen, Activity, ArrowRight, 
  ChevronDown, CheckCircle2, Lock, MessageSquare, Star, ChevronRight, 
  Share2, Download, ChevronUp, RefreshCcw, ArrowLeft, Sun 
} from 'lucide-react';

import { brandColors, cities, currentOptions, futureOptions, questions, powerCategories } from './constants';
import { AvatarIllustration, IntroIllustration, SceneIllustration, WarmVideoIllustration } from './components/Illustrations';
import { ConsultForm, MoodState, NebulaData } from './types';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<string>('intro'); 
  const [scores, setScores] = useState<Record<number, number>>({});
  const [expandedPower, setExpandedPower] = useState<string | null>(null); 
  const [showConsult, setShowConsult] = useState(false);
  const [moodState, setMoodState] = useState<MoodState>({ 
    currentImg: null, 
    currentTag: '', 
    futureImg: null, 
    futureTag: '' 
  });
  
  const [nebulaData, setNebulaData] = useState<NebulaData>({
    q1: 5,
    q8: '', 
    q9: '', 
    q15: '', 
    q16: '', 
    nickname: '',
    avatar: null
  });

  const [consultForm, setConsultForm] = useState<ConsultForm>({
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
      document.title = `${nebulaData.nickname || '我'}的照顧指南報告`;
    } else {
      document.title = "星雲計畫 - 照護指南";
    }
  }, [currentPage, nebulaData.nickname]);

  useEffect(() => {
    if (showConsult) {
      setTimeout(() => {
        document.getElementById('consult-section')?.scrollIntoView({ behavior: 'smooth' });
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

  const getCategoryScore = (catId: 'support' | 'info' | 'knowledge') => {
    const relevantIds = powerCategories[catId].ids;
    return relevantIds.reduce((sum, id) => sum + (scores[id] || 0), 0);
  };

  const handleScoreChange = (id: number, value: number) => {
    setScores(prev => ({ ...prev, [id]: value }));
  };

  const togglePower = (key: string) => {
    setExpandedPower(expandedPower === key ? null : key);
  };

  const navigateTo = (page: string) => {
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

  const handleDownload = () => {
    window.print();
  };

  const handleShare = () => {
    const url = window.location.origin + window.location.pathname;
    const shareText = `我剛完成一份照顧家人的指南，分享給你看照顧要點：${url}`;
    const lineUrl = `https://line.me/R/msg/text/?${encodeURIComponent(shareText)}`;
    window.open(lineUrl, '_blank');
  };

  const handleGenerateReport = () => {
    // Webhook: 追蹤資料內容
    fetch('https://hook.us2.make.com/osvdwga9wtb365rj4i3v4wxp9lkjpmhy', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nickname: nebulaData.nickname,
        pressure: nebulaData.q1,
        disease: nebulaData.q8,
        residence: nebulaData.q9,
        relationship: nebulaData.q15,
        duration: nebulaData.q16,
        scores: scores,
        currentMood: moodState.currentTag,
        futureMood: moodState.futureTag,
        timestamp: new Date().toISOString()
      }),
    }).catch(e => console.error("Report Tracking Error:", e));

    navigateTo('result');
  };

  const handleConsultClick = () => {
    // Webhook: 預約諮詢按鈕點擊追蹤
    fetch('https://hook.us2.make.com/xp2hobtgm7gcrrep16e0zmniox836s7w', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nickname: nebulaData.nickname,
        action: 'click_consult_button',
        timestamp: new Date().toISOString()
      }),
    }).catch(e => console.error("Consult Tracking Error:", e));

    setShowConsult(true);
  };

  const isAssessmentComplete = Object.keys(scores).length === questions.length;
  const isMoodComplete = moodState.currentImg !== null && moodState.currentTag !== '' && moodState.futureImg !== null && moodState.futureTag !== '';
  const isFinalStepComplete = !!(nebulaData.q1 && nebulaData.q8 && nebulaData.q9 && nebulaData.q15 && nebulaData.q16 && nebulaData.nickname && nebulaData.avatar);

  const getRiskLevel = (score: number) => {
    if (score <= 3) return { label: '高風險', color: '#f87171', bg: '#fee2e2', shadow: 'rgba(248, 113, 113, 0.6)' }; 
    if (score <= 7) return { label: '中風險', color: '#f59e0b', bg: '#fef3c7', shadow: 'rgba(245, 158, 11, 0.6)' }; 
    return { label: '低風險', color: '#10b981', bg: '#d1fae5', shadow: 'rgba(16, 185, 129, 0.6)' }; 
  };

  const analysis = ((): any => {
    const sScore = getCategoryScore('support');
    const iScore = getCategoryScore('info');
    const kScore = getCategoryScore('knowledge');
    const { q1: pressure, q8: disease, q9: residence, q16: duration } = nebulaData;

    return {
      mood: `看著您勾選的「${moodState.currentTag}」，那種辛苦我們都懂。請先對自己說聲「辛苦了」，這份安慰感是您應得的。而對於「${moodState.futureTag}」的期盼，是支持您走下去的微光。`,
      support: { score: sScore, msg: `支持力 ${sScore} 分顯示您在 ${duration} 的照顧中，正承受著 ${pressure} 分的壓力負荷。`, risk: getRiskLevel(sScore), strategies: [] },
      info: { score: iScore, msg: `資訊力 ${iScore} 分反映您目前在「${residence}」環境下，對外部資源的鏈結度。`, risk: getRiskLevel(iScore), strategies: [] },
      knowledge: { score: kScore, msg: `知識力 ${kScore} 分顯示您對「${disease}」專業知識的掌握程度。`, risk: getRiskLevel(kScore), strategies: [] }
    };
  })();

  return (
    <div className="min-h-screen font-sans text-gray-800 pb-16 bg-[#fffafb] text-[15pt] leading-[1.45]">
      <header className="fixed top-0 left-0 right-0 z-50">
        <div className="p-2 text-center shadow-sm flex justify-center items-center" style={{ backgroundColor: brandColors.softPink }}>
          <img 
            src="https://www.ilong-termcare.com/uploads/photos/shares/articles-content/%E6%98%9F%E9%9B%B2%E8%A8%88%E7%95%ABLOGO.png" 
            alt="星雲計畫" 
            className="h-10 w-auto object-contain scale-110" 
          />
        </div>
        <div className="h-1.5 w-full bg-gray-100 overflow-hidden">
          <div className="h-full transition-all duration-500 ease-out shadow-[0_0_8px_rgba(0,0,0,0.2)]" style={{ width: `${getProgress()}%`, background: gradientStyle }} />
        </div>
      </header>

      <main className="max-w-md mx-auto px-3 pt-20">
        {currentPage === 'intro' && (
          <div className="space-y-6 animate-in fade-in">
            <div className="bg-white p-6 rounded-[32px] shadow-sm border-2 flex flex-col items-center" style={{ borderColor: brandColors.softBlue }}>
              <IntroIllustration />
              <h2 className="text-[26px] font-black mb-1 text-center" style={{ color: brandColors.deepPink }}>照護指南速成工具</h2>
              <button onClick={() => navigateTo('assessment')} className="w-full py-5 rounded-full text-white font-black text-xl shadow-lg mt-6 flex items-center justify-center gap-2" style={{ backgroundColor: brandColors.deepPink }}>
                開始吧！GO！ <ArrowRight className="w-6 h-6" />
              </button>
            </div>
          </div>
        )}

        {currentPage === 'assessment' && (
          <div className="space-y-4 animate-in">
            {questions.map((q) => (
              <div key={q.id} className="p-4 rounded-2xl bg-white border-2" style={{ borderColor: scores[q.id] ? brandColors.success : brandColors.softBlue }}>
                <div className="flex items-start gap-3 mb-4">
                  <div className="p-2 rounded-full" style={{ backgroundColor: brandColors.softBlue + '44' }}>{q.icon}</div>
                  <h2 className="text-lg font-medium">{q.text}</h2>
                </div>
                <div className="flex justify-between items-center px-1">
                  {[1, 2, 3, 4, 5].map((num) => (
                    <button key={num} onClick={() => handleScoreChange(q.id, num)} className="w-11 h-11 rounded-full border-2 flex items-center justify-center font-bold"
                      style={{ backgroundColor: scores[q.id] === num ? brandColors.primary : 'transparent', borderColor: scores[q.id] === num ? brandColors.primary : brandColors.softBlue, color: scores[q.id] === num ? 'white' : '#666' }}>{num}</button>
                  ))}
                </div>
              </div>
            ))}
            <button disabled={!isAssessmentComplete} onClick={() => navigateTo('mood')} className="w-full py-4 rounded-full text-white font-bold text-lg mt-4" style={{ backgroundColor: brandColors.secondary }}>下一頁</button>
          </div>
        )}

        {currentPage === 'mood' && (
          <div className="space-y-8 animate-in pb-10">
            <section>
              <h3 className="text-lg font-bold">1. 察覺現況壓力</h3>
              <div className="grid grid-cols-5 gap-1.5 my-4">
                {[0, 1, 2, 3, 4].map((i) => (
                  <button key={i} onClick={() => setMoodState({...moodState, currentImg: i})} className="aspect-square rounded-lg border-2 overflow-hidden" style={{ borderColor: moodState.currentImg === i ? brandColors.primary : 'transparent' }}>
                    <SceneIllustration type="current" index={i} active={moodState.currentImg === i} />
                  </button>
                ))}
              </div>
              <div className="space-y-2">
                {currentOptions.map((opt, i) => (
                  <button key={i} onClick={() => setMoodState({...moodState, currentTag: opt.title})} className="w-full text-left p-3 rounded-xl border-2 transition-all"
                    style={{ borderColor: moodState.currentTag === opt.title ? brandColors.primary : brandColors.softBlue, backgroundColor: moodState.currentTag === opt.title ? brandColors.softPink + '22' : 'white' }}>
                    <div className="font-bold">{opt.title}</div>
                  </button>
                ))}
              </div>
            </section>
            <section>
              <h3 className="text-lg font-bold">2. 嚮往未來生活</h3>
              <div className="grid grid-cols-5 gap-1.5 my-4">
                {[0, 1, 2, 3, 4].map((i) => (
                  <button key={i} onClick={() => setMoodState({...moodState, futureImg: i})} className="aspect-square rounded-lg border-2 overflow-hidden" style={{ borderColor: moodState.futureImg === i ? brandColors.success : 'transparent' }}>
                    <SceneIllustration type="future" index={i} active={moodState.futureImg === i} />
                  </button>
                ))}
              </div>
              <div className="space-y-2">
                {futureOptions.map((opt, i) => (
                  <button key={i} onClick={() => setMoodState({...moodState, futureTag: opt.title})} className="w-full text-left p-3 rounded-xl border-2 transition-all"
                    style={{ borderColor: moodState.futureTag === opt.title ? brandColors.success : brandColors.softBlue, backgroundColor: moodState.futureTag === opt.title ? brandColors.success + '22' : 'white' }}>
                    <div className="font-bold">{opt.title}</div>
                  </button>
                ))}
              </div>
            </section>
            <button disabled={!isMoodComplete} onClick={() => navigateTo('nebula')} className="w-full py-4 rounded-full text-white font-bold" style={{ backgroundColor: brandColors.secondary }}>下一頁</button>
          </div>
        )}

        {currentPage === 'nebula' && (
          <div className="space-y-6 animate-in pb-10">
            <div className="bg-white p-6 rounded-[32px] border-2" style={{ borderColor: brandColors.softBlue }}>
              <div className="space-y-4">
                <input type="text" value={nebulaData.nickname} onChange={(e) => setNebulaData({...nebulaData, nickname: e.target.value})} placeholder="請輸入暱稱" className="w-full p-4 rounded-xl border-2 text-center text-xl font-black" style={{ borderColor: brandColors.primary }} />
                <select value={nebulaData.q8} onChange={(e) => setNebulaData({...nebulaData, q8: e.target.value})} className="w-full p-4 rounded-xl border-2 bg-white">
                    <option value="">選擇疾病狀況</option>
                    {['健康無疾病', '失智症', '中風', '癌症', '糖尿病'].map(item => <option key={item} value={item}>{item}</option>)}
                </select>
                <select value={nebulaData.q9} onChange={(e) => setNebulaData({...nebulaData, q9: e.target.value})} className="w-full p-4 rounded-xl border-2 bg-white">
                    <option value="">選擇居住環境</option>
                    {['住家中', '住院中', '住機構'].map(item => <option key={item} value={item}>{item}</option>)}
                </select>
                <select value={nebulaData.q15} onChange={(e) => setNebulaData({...nebulaData, q15: e.target.value})} className="w-full p-4 rounded-xl border-2 bg-white">
                    <option value="">您是被照顧者的誰？</option>
                    {['女兒', '兒子', '配偶', '其他'].map(item => <option key={item} value={item}>{item}</option>)}
                </select>
                <select value={nebulaData.q16} onChange={(e) => setNebulaData({...nebulaData, q16: e.target.value})} className="w-full p-4 rounded-xl border-2 bg-white">
                    <option value="">照顧多久了？</option>
                    {['半年內', '半年~1年', '1年以上'].map(item => <option key={item} value={item}>{item}</option>)}
                </select>
                <div className="flex justify-around items-center pt-4">
                    <button onClick={() => setNebulaData({...nebulaData, avatar: 'female'})}><AvatarIllustration type="female" selected={nebulaData.avatar === 'female'} /></button>
                    <button onClick={() => setNebulaData({...nebulaData, avatar: 'neutral'})}><AvatarIllustration type="neutral" selected={nebulaData.avatar === 'neutral'} /></button>
                    <button onClick={() => setNebulaData({...nebulaData, avatar: 'male'})}><AvatarIllustration type="male" selected={nebulaData.avatar === 'male'} /></button>
                </div>
              </div>
            </div>
            <button disabled={!isFinalStepComplete} onClick={handleGenerateReport} className="w-full py-5 rounded-full text-white font-black text-xl shadow-xl" style={{ backgroundColor: brandColors.deepPink }}>生成我的照顧報告</button>
          </div>
        )}

        {currentPage === 'result' && (
          <div className="animate-in pb-10">
            <div id="result-card" className="bg-white p-5 rounded-[32px] shadow-xl border-2" style={{ borderColor: brandColors.softPink }}>
              <div className="flex flex-col items-center mb-6">
                <AvatarIllustration type={nebulaData.avatar} selected={false} />
                <h2 className="text-xl font-bold mt-2">{nebulaData.nickname} 的照顧檔案</h2>
              </div>
              <div className="space-y-8">
                <div>
                    <h3 className="font-bold flex items-center gap-2 mb-2"><Star className="w-5 h-5 text-yellow-400" /> 心靈照護顯像</h3>
                    <p className="text-base text-gray-600">{analysis.mood}</p>
                </div>
                <div>
                    <div className="flex justify-between font-bold mb-1">
                        <span>支持力评析</span>
                        <span style={{ color: analysis.support.risk.color }}>{analysis.support.risk.label}</span>
                    </div>
                    <p className="text-sm text-gray-700">{analysis.support.msg}</p>
                </div>
              </div>

              <div className="mt-10 no-print">
                <button onClick={handleConsultClick} className="w-full py-4 rounded-full text-white font-black text-lg shadow-xl flex items-center justify-center gap-2" style={{ backgroundColor: brandColors.deepPink }}>
                  <MessageSquare className="w-5 h-5" /> 預約諮詢照顧管家
                </button>
              </div>

              {showConsult && (
                <div id="consult-section" className="mt-8 no-print">
                  <iframe src="https://www.surveycake.com/s/P8Aza" className="w-full h-[600px] rounded-2xl border-2" title="預約" />
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-3 mt-6 no-print">
              <button onClick={handleShare} className="flex items-center justify-center gap-2 py-4 rounded-full border-2 border-gray-200 bg-white font-bold">
                <Share2 className="w-4 h-4" /> 分享報告
              </button>
              <button onClick={handleDownload} className="flex items-center justify-center gap-2 py-4 rounded-full border-2 border-gray-200 bg-white font-bold">
                <Download className="w-4 h-4" /> 下載報告
              </button>
            </div>
            <button onClick={handleRestart} className="w-full mt-4 py-4 rounded-full font-bold border-2 bg-white no-print" style={{ borderColor: brandColors.primary, color: brandColors.primary }}>重新檢測</button>
          </div>
        )}
      </main>
      <footer className="fixed bottom-0 left-0 right-0 h-3" style={{ background: gradientStyle }}></footer>
    </div>
  );
};

export default App;
