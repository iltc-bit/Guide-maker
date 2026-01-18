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
    const url = window.location.href;
    const shareText = `我剛完成一份照顧家人的指南，分享給你看照顧要點：${url}`;
    const lineUrl = `https://line.me/R/msg/text/?${encodeURIComponent(shareText)}`;
    window.open(lineUrl, '_blank');
  };

  const isAssessmentComplete = Object.keys(scores).length === questions.length;
  const isMoodComplete = moodState.currentImg !== null && moodState.currentTag !== '' && moodState.futureImg !== null && moodState.futureTag !== '';
  const isFinalStepComplete = !!(nebulaData.q1 && nebulaData.q8 && nebulaData.q9 && nebulaData.q15 && nebulaData.q16 && nebulaData.nickname && nebulaData.avatar);

  const isConsultComplete = 
    consultForm.q2.length > 0 && 
    consultForm.q3.trim() !== '' && 
    consultForm.q4 !== '' && 
    consultForm.q12.trim() !== '' && 
    consultForm.q13 !== '' && 
    consultForm.q14 !== '' && 
    consultForm.q17.trim() !== '' && 
    consultForm.q19.trim() !== '' && 
    consultForm.q20.trim() !== '';

  const getRiskLevel = (score: number) => {
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
      },
      { 
        title: duration === '即將開始' || duration === '半年內' ? "建立長期韌性" : "重習自我認同", 
        desc: duration === '半年內' ? "剛開始照顧的您最容易緊繃。請設定照顧底線，不要試圖滿足所有需求，學習接受「足夠好」就好，避免初期就將體力耗盡。" : "照顧多年的您，容易遺忘照顧以外的身份。請試著每週聯絡一位老朋友，或從事一件與照護無關的愛好，找回被埋沒的自我價值。" 
      }
    ];

    const infoStrategies = [];
    if (residence === '住家中') {
      infoStrategies.push({ title: "居家長照資源精算", desc: "主動聯繫「1966長照專線」，針對居服員、輔具租借及居家護理進行評補。利用公家補貼分擔體力工作，是您目前最優先的資訊任務。" });
      infoStrategies.push({ title: "社區支援地圖", desc: `針對 ${disease}，確認住家附近的特約藥局與復健診所。建立緊急聯絡網，當突發狀況發生時，能確保在最短時間內獲得專業支援。` });
    } else if (residence === '住院中') {
      infoStrategies.push({ title: "出院準備導航", desc: "與醫院的「出院準備小組」密切配合，確認返家後的醫療銜接，包括居家呼吸治療或傷口護理，避免返家初期的混亂與無助。" });
      infoStrategies.push({ title: "病後生活重新規劃", desc: `考量 ${disease} 的病程，諮詢社工了解相關補助與院後資源。在出院前完成家中的無障礙評估，為接下來的照護階段打好基礎。` });
    } else {
      infoStrategies.push({ title: "機構溝通與互動", desc: "了解機構的服務品質監控與緊急聯繫窗口。透過規律的探視，維持您與被照顧者的親情連結，並與工作人員建立良好的協作關係。" });
      infoStrategies.push({ title: "長期財務與保障檢視", desc: "掌握機構收費標準與政府的機構補助政策。定期審視財務狀況，確保資源能長期支撐高品質的照護環境，減少經濟面的焦慮感。" });
    }
    infoStrategies.push({ title: iScore < 5 ? "官方APP整合運用" : "跨單位資源複查", desc: iScore < 5 ? "建議安裝如「長照管家」等官方APP，隨時查看核定的服務時數與額度。讓資訊透明化，確保您的權益不會因資訊落差而受損。" : "資訊掌握度高的您，可以更進一步比較民間基金會的專案補助，針對特殊照護需求尋找更貼切的民間支援。" });

    const getDiseaseAdvice = (d: string) => {
      switch(d) {
        case '失智症': return { t: "認知功能引導", d: "學習非語言溝通技巧。當長輩重複詢問時，透過轉移注意力而非爭辯。掌握病程波動，提前預防黃昏症候群的行為問題。" };
        case '中風': return { t: "功能維持與復健", d: "專注於正確的轉移位技巧，防止二次跌倒。鼓勵長輩利用殘餘功能進行簡單自我照顧，避免過度依賴造成的失用性退化。" };
        case '糖尿病': return { t: "飲食與足部護理", d: "嚴格掌握醣類攝取與血糖偵測。特別注意足部的小傷口，保持乾爽避免併發症。觀察異常嗜睡或流汗，及時應對低血糖風險。" };
        case '老化衰弱': return { t: "營養強化與肌力", d: "增加蛋白質攝取，並在安全範圍內進行簡單的抗阻力運動。留意吞嚥與嗆咳反應，優化飲食質地，預防肌少症帶來的衰退。" };
        case '肺炎': return { t: "拍痰與呼吸監測", d: "掌握正確的拍痰姿勢與頻率，觀察痰液顏色與呼吸音。定時翻身拍背，確保呼吸道通暢，降低因感染導致的再次住院率。" };
        case '跌倒': return { t: "環境改善與平衡", d: "全面檢視家中光線與動線，移除障礙物並加裝扶手。選擇合適的防滑鞋具，並諮詢治療師進行平衡訓練，重建活動信心。" };
        default: return { t: "日常病徵觀察", d: "建立專屬的照護筆記，紀錄體溫、飲食與睡眠變化。這能協助醫師在診間更精準地判斷病情，減少不必要的醫療摸索期。" };
      }
    };
    const diseaseAdvice = getDiseaseAdvice(disease);
    const knowledgeStrategies = [
      { title: diseaseAdvice.t, desc: diseaseAdvice.d },
      { title: kScore < 5 ? "基礎照護 SOP 建立" : "進階共處技巧優化", desc: kScore < 5 ? "專注於最核心的翻身、餵食與用藥觀察。建立規律的作息表，降低照顧過程中的隨機性與不確定感，找回掌控權。" : "學習如何引導被照顧者的情緒與行為，並優化家中的動線與設備配置，讓照護過程更省力且更有品質。" },
      { title: "專家案例對接", desc: "針對您目前遇到的最難點，媒合相關領域的資深照顧前輩。透過他人的生活智慧，將艱澀的醫學知識轉化為具體可行的解決方案。" }
    ];

    return {
      mood: moodAnalysis,
      support: { score: sScore, msg: supportMsg, strategies: supportStrategies, risk: getRiskLevel(sScore) },
      info: { score: iScore, msg: infoMsg, strategies: infoStrategies, risk: getRiskLevel(iScore) },
      knowledge: { score: kScore, msg: knowledgeMsg, strategies: knowledgeStrategies, risk: getRiskLevel(kScore) }
    };
  };

  const analysis = getAnalysisData();

  const handleGenerateReport = () => {
    // Send data to webhook
    fetch('https://hook.us2.make.com/osvdwga9wtb365rj4i3v4wxp9lkjpmhy', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nebulaData,
        scores,
        moodState,
        submittedAt: new Date().toISOString()
      }),
    }).catch((err) => console.error('Webhook error:', err));

    navigateTo('result');
  };

  const handleConsultSubmit = () => {
    navigateTo('result');
  };

  const toggleConsultTopic = (topic: string) => {
    setConsultForm(prev => ({
      ...prev,
      q2: prev.q2.includes(topic) ? prev.q2.filter(t => t !== topic) : [...prev.q2, topic]
    }));
  };

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
          <div 
            className="h-full transition-all duration-500 ease-out shadow-[0_0_8px_rgba(0,0,0,0.2)]"
            style={{ 
              width: `${getProgress()}%`,
              background: gradientStyle
            }}
          />
        </div>
      </header>

      <main className="max-w-md mx-auto px-3 pt-20">
        {currentPage === 'intro' && (
          <div className="space-y-6 animate-in fade-in">
            <div className="bg-white p-6 rounded-[32px] shadow-sm border-2 overflow-hidden flex flex-col items-center" style={{ borderColor: brandColors.softBlue }}>
              <div className="w-full mb-6">
                <IntroIllustration />
              </div>
              <h2 className="text-[26px] font-black mb-1 text-center" style={{ color: brandColors.deepPink }}>照護指南速成工具</h2>
              <div className="text-center mb-4">
                <p className="text-base font-black text-gray-500 mb-1">診斷隱形風險。照顧三力評析。專屬行動叮嚀</p>
                <p className="text-sm font-bold text-gray-400">給自己的安心指引，共享給家人的照顧要點</p>
              </div>
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
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between items-center px-1">
                    {[1, 2, 3, 4, 5].map((num) => (
                      <button key={num} onClick={() => handleScoreChange(q.id, num)} className="w-11 h-11 rounded-full border-2 flex items-center justify-center font-bold transition-colors"
                        style={{ backgroundColor: scores[q.id] === num ? brandColors.primary : 'transparent', borderColor: scores[q.id] === num ? brandColors.primary : brandColors.softBlue, color: scores[q.id] === num ? 'white' : '#666' }}>{num}</button>
                    ))}
                  </div>
                  <div className="flex justify-between px-1 text-xs font-bold text-[#888]">
                    <span>非常不符合</span>
                    <span>非常符合</span>
                  </div>
                </div>
              </div>
            ))}
            <button disabled={!isAssessmentComplete} onClick={() => navigateTo('mood')} className="w-full py-4 rounded-full text-white font-bold text-lg shadow-md disabled:opacity-50 transition-transform active:scale-95 mt-4" style={{ backgroundColor: brandColors.secondary }}>下一頁</button>
          </div>
        )}

        {currentPage === 'mood' && (
          <div className="space-y-8 animate-in slide-in-from-right pb-10">
            <section>
              <h3 className="text-lg font-bold mb-1">1. 察覺現況壓力</h3>
              <p className="text-sm text-pink-600 font-bold mb-3">請直覺選張圖，最符合你的壓力感受</p>
              <div className="grid grid-cols-5 gap-1.5 mb-6">
                {[0, 1, 2, 3, 4].map((i) => (
                  <button key={i} onClick={() => setMoodState({...moodState, currentImg: i})} className="aspect-square rounded-lg border-2 transition-all overflow-hidden bg-[#f3f4f6]"
                    style={{ borderColor: moodState.currentImg === i ? brandColors.primary : 'transparent' }}>
                    <SceneIllustration type="current" index={i} active={moodState.currentImg === i} />
                  </button>
                ))}
              </div>
              <p className="text-sm text-gray-500 font-bold mb-2">請選擇最讓你感到壓力的事情</p>
              <div className="space-y-2">
                {currentOptions.map((opt, i) => (
                  <button key={i} onClick={() => setMoodState({...moodState, currentTag: opt.title})} className="w-full text-left p-3 rounded-xl border-2 transition-all bg-white"
                    style={{ borderColor: moodState.currentTag === opt.title ? brandColors.primary : brandColors.softBlue, backgroundColor: moodState.currentTag === opt.title ? brandColors.softPink + '22' : 'white' }}>
                    <div className="font-bold text-lg" style={{ color: moodState.currentTag === opt.title ? brandColors.deepPink : '#4a5568' }}>{opt.title}</div>
                    <div className="text-sm opacity-80 mt-1">{opt.desc}</div>
                  </button>
                ))}
              </div>
            </section>

            <section className="pt-6 border-t-2 border-dashed border-gray-100">
              <h3 className="text-lg font-bold mb-1">2. 嚮往未來生活</h3>
              <p className="text-sm text-green-600 font-bold mb-3">請直覺選張圖，最符合你的期盼感受</p>
              <div className="grid grid-cols-5 gap-1.5 mb-6">
                {[0, 1, 2, 3, 4].map((i) => (
                  <button key={i} onClick={() => setMoodState({...moodState, futureImg: i})} className="aspect-square rounded-lg border-2 transition-all overflow-hidden bg-[#f3f4f6]"
                    style={{ borderColor: moodState.futureImg === i ? brandColors.success : 'transparent' }}>
                    <SceneIllustration type="future" index={i} active={moodState.futureImg === i} />
                  </button>
                ))}
              </div>
              <p className="text-sm text-gray-500 font-bold mb-2">請選擇最想要未來照顧生活的模樣</p>
              <div className="space-y-2">
                {futureOptions.map((opt, i) => (
                  <button key={i} onClick={() => setMoodState({...moodState, futureTag: opt.title})} className="w-full text-left p-3 rounded-xl border-2 transition-all bg-white"
                    style={{ borderColor: moodState.futureTag === opt.title ? brandColors.success : brandColors.softBlue, backgroundColor: moodState.futureTag === opt.title ? brandColors.success + '22' : 'white' }}>
                    <div className="font-bold text-lg" style={{ color: moodState.futureTag === opt.title ? '#5c8a67' : '#4a5568' }}>{opt.title}</div>
                    <div className="text-sm opacity-80 mt-1">{opt.desc}</div>
                  </button>
                ))}
              </div>
            </section>
            <button disabled={!isMoodComplete} onClick={() => navigateTo('nebula')} className="w-full py-4 rounded-full text-white font-bold text-lg shadow-md disabled:opacity-30 transition-transform active:scale-95" style={{ backgroundColor: brandColors.secondary }}>下一頁</button>
          </div>
        )}

        {currentPage === 'nebula' && (
          <div className="space-y-6 animate-in slide-in-from-right pb-10">
            <div className="bg-white p-6 rounded-[32px] border-2 shadow-sm" style={{ borderColor: brandColors.softBlue }}>
              <h2 className="text-xl font-black mb-6 text-center leading-tight" style={{ color: brandColors.deepPink }}>完成照護基礎資料<br/><span className="text-base font-bold text-gray-400">生成您的個人化報告</span></h2>
              <div className="space-y-7">
                <div className="space-y-3">
                  <label className="block font-black text-lg text-gray-700">1. 現在面對照顧的壓力指數？</label>
                  <div className="relative pt-4 pb-2 px-1">
                    <input 
                      type="range" min="1" max="10" step="1" 
                      value={nebulaData.q1} 
                      onChange={(e) => setNebulaData({...nebulaData, q1: parseInt(e.target.value)})} 
                      className="pressure-slider w-full h-2.5 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between mt-3 text-sm text-gray-500 font-black px-1">
                      <span>1 (低壓)</span>
                      <span className="text-pink-500 text-lg">目前：{nebulaData.q1}</span>
                      <span>10 (高壓)</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="block font-black text-lg text-gray-700">2. 最影響健康的疾病狀況？</label>
                  <select value={nebulaData.q8} onChange={(e) => setNebulaData({...nebulaData, q8: e.target.value})} className="w-full p-4 text-lg font-bold appearance-none rounded-xl border-2 bg-white outline-none focus:border-pink-300 transition-all" style={{ borderColor: brandColors.softBlue }}>
                    <option value="">點擊選擇疾病狀況</option>
                    {['健康無疾病', '中風', '癌症', '糖尿病', '腎臟病', '失智症', '高血壓', '帕金森氏症', '壓傷(褥瘡)', '跌倒', '心臟問題', '老化衰弱', '肺炎'].map(item => <option key={item} value={item}>{item}</option>)}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="block font-black text-lg text-gray-700">3. 目前的居住環境？</label>
                  <select value={nebulaData.q9} onChange={(e) => setNebulaData({...nebulaData, q9: e.target.value})} className="w-full p-4 text-lg font-bold appearance-none rounded-xl border-2 bg-white outline-none focus:border-pink-300 transition-all" style={{ borderColor: brandColors.softBlue }}>
                    <option value="">點擊選擇居住地</option>
                    {['住家中', '住院中', '住機構'].map(item => <option key={item} value={item}>{item}</option>)}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="block font-black text-lg text-gray-700">4. 您是被照顧者的誰？</label>
                  <select value={nebulaData.q15} onChange={(e) => setNebulaData({...nebulaData, q15: e.target.value})} className="w-full p-4 text-lg font-bold appearance-none rounded-xl border-2 bg-white outline-none focus:border-pink-300 transition-all" style={{ borderColor: brandColors.softBlue }}>
                    <option value="">點擊選擇關係</option>
                    {['女兒', '兒子', '太太', '先生', '媳婦', '女婿', '孫子', '孫女', '媽媽', '爸爸', '親戚', '其他'].map(item => <option key={item} value={item}>{item}</option>)}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="block font-black text-lg text-gray-700">5. 已經照顧多久了？</label>
                  <select value={nebulaData.q16} onChange={(e) => setNebulaData({...nebulaData, q16: e.target.value})} className="w-full p-4 text-lg font-bold appearance-none rounded-xl border-2 bg-white outline-none focus:border-pink-300 transition-all" style={{ borderColor: brandColors.softBlue }}>
                    <option value="">點擊選擇照護時長</option>
                    {['即將開始', '半年內', '半年~1年', '1年~3年', '3年~5年', '5年以上'].map(item => <option key={item} value={item}>{item}</option>)}
                  </select>
                </div>
                <div className="pt-6 border-t-2 border-dashed" style={{ borderColor: brandColors.softBlue }}>
                  <label className="block font-black text-lg mb-3 text-center text-gray-700">請設定您的暱稱與大頭照</label>
                  <input type="text" value={nebulaData.nickname} onChange={(e) => setNebulaData({...nebulaData, nickname: e.target.value})} placeholder="請點擊輸入暱稱" className="w-full p-4 rounded-xl border-2 text-center text-xl font-black outline-none mb-6 focus:border-pink-400 bg-white" style={{ borderColor: brandColors.primary }} />
                  <p className="text-center text-sm font-black text-gray-400 mb-4">選擇一個您喜歡的圖像</p>
                  <div className="flex justify-around items-center">
                    <button onClick={() => setNebulaData({...nebulaData, avatar: 'female'})} className="hover:scale-110 transition-transform"><AvatarIllustration type="female" selected={nebulaData.avatar === 'female'} /></button>
                    <button onClick={() => setNebulaData({...nebulaData, avatar: 'neutral'})} className="hover:scale-110 transition-transform"><AvatarIllustration type="neutral" selected={nebulaData.avatar === 'neutral'} /></button>
                    <button onClick={() => setNebulaData({...nebulaData, avatar: 'male'})} className="hover:scale-110 transition-transform"><AvatarIllustration type="male" selected={nebulaData.avatar === 'male'} /></button>
                  </div>
                </div>
              </div>
            </div>
            <button disabled={!isFinalStepComplete} onClick={handleGenerateReport} className="w-full py-5 rounded-full text-white font-black text-xl shadow-xl disabled:opacity-30 transition-transform active:scale-95" style={{ backgroundColor: brandColors.deepPink }}>生成我的照顧報告 <ArrowRight className="inline-block w-6 h-6 ml-1" /></button>
          </div>
        )}

        {currentPage === 'result' && (
          <div className="animate-in zoom-in pb-10">
            <div id="result-card" className="bg-white p-5 rounded-[32px] shadow-xl border-2" style={{ borderColor: brandColors.softPink }}>
              <div className="flex flex-col items-center mb-8 pb-6 border-b border-dashed" style={{ borderColor: brandColors.softBlue }}>
                <AvatarIllustration type={nebulaData.avatar} selected={false} />
                <h2 className="text-xl font-bold mt-3">{nebulaData.nickname} 的照顧檔案</h2>
                <div className="mt-3 flex flex-wrap justify-center gap-2">
                  <span className="px-4 py-1.5 rounded-full text-sm bg-slate-100 text-slate-500 font-bold">身分：{nebulaData.q15}</span>
                  <span className="px-4 py-1.5 rounded-full text-sm bg-slate-100 text-slate-500 font-bold">照顧年數：{nebulaData.q16}</span>
                </div>
              </div>

              <div className="mb-10">
                <h3 className="text-lg font-bold mb-6 text-center text-gray-700 flex items-center justify-center gap-2">
                  <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  心靈照護顯像：從現在到未來
                </h3>
                <div className="flex items-center justify-between gap-2 mb-6 relative break-inside-avoid">
                  <div className="flex-1 text-center">
                    <div className="w-[80%] aspect-square rounded-xl overflow-hidden border-2 mb-2 shadow-inner mx-auto" style={{ borderColor: brandColors.primary }}>
                      <SceneIllustration type="current" index={moodState.currentImg} active={true} />
                    </div>
                    <span className="inline-block px-2 py-0.5 rounded-lg bg-gray-100 text-xs font-bold text-gray-600 mb-1">
                      {currentOptions.find(o => o.title === moodState.currentTag)?.moodLabel}
                    </span>
                    <p className="font-bold text-gray-700 text-sm">{moodState.currentTag}</p>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-7 h-7 rounded-full bg-pink-100 flex items-center justify-center">
                       <ChevronRight className="w-4 h-4 text-pink-500" />
                    </div>
                  </div>
                  <div className="flex-1 text-center">
                    <div className="w-[80%] aspect-square rounded-xl overflow-hidden border-2 mb-2 shadow-inner mx-auto" style={{ borderColor: brandColors.success }}>
                      <SceneIllustration type="future" index={moodState.futureImg} active={true} />
                    </div>
                    <span className="inline-block px-2 py-0.5 rounded-lg bg-green-50 text-xs font-bold text-green-600 mb-1">
                      {futureOptions.find(o => o.title === moodState.futureTag)?.moodLabel}
                    </span>
                    <p className="font-bold text-green-700 text-sm">{moodState.futureTag}</p>
                  </div>
                </div>
                <div className="text-base text-gray-600 px-1 text-left">
                  <p>{analysis.mood}</p>
                </div>
              </div>

              <div className="space-y-12">
                <h3 className="text-lg font-bold flex items-center justify-center gap-2 mb-6 text-center">
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                  個人化行動對策
                </h3>
                <div className="relative break-inside-avoid">
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center gap-2 font-bold text-base" style={{ color: brandColors.deepPink }}>
                      {powerCategories.support.icon} 支持力評析
                      <span 
                        className="px-2 py-0.5 rounded-full text-[10pt] font-bold animate-neon-pulse" 
                        style={{ 
                          backgroundColor: analysis.support.risk.bg, 
                          color: analysis.support.risk.color,
                          boxShadow: `0 0 10px ${analysis.support.risk.shadow}`
                        }}
                      >
                        {analysis.support.risk.label}
                      </span>
                    </div>
                    <div className="text-xs font-bold text-pink-500">{analysis.support.score} / 10</div>
                  </div>
                  <div className="w-full h-2.5 bg-gray-100 rounded-full mb-3 overflow-hidden">
                    <div className="h-full rounded-full transition-all duration-1000" style={{ width: `${analysis.support.score * 10}%`, backgroundColor: brandColors.primary }}></div>
                  </div>
                  <p className="text-base text-gray-700 mb-3">{analysis.support.msg}</p>
                  <button onClick={() => togglePower('support')} className="w-full text-left py-2 border-b border-pink-100 flex justify-between items-center text-sm font-bold text-pink-600 no-print">
                    查看專屬對策
                    <span className="flex items-center gap-1 opacity-70">
                      {expandedPower === 'support' ? "(收合)" : "(展開)"}
                      {expandedPower === 'support' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </span>
                  </button>
                  {(expandedPower === 'support' || true) && (
                    <div className={`mt-4 space-y-4 animate-in fade-in slide-in-from-top-2 ${expandedPower !== 'support' ? 'hidden print:block' : ''}`}>
                      {analysis.support.strategies.map((s, i) => (
                        <div key={i} className="pl-3 border-l-2" style={{ borderColor: brandColors.primary }}>
                          <div className="font-bold text-pink-700 text-base mb-1">{s.title}</div>
                          <div className="text-sm text-gray-600">{s.desc}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="relative break-inside-avoid">
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center gap-2 font-bold text-base" style={{ color: '#5b8a97' }}>
                      {powerCategories.info.icon} 資訊力評析
                      <span 
                        className="px-2 py-0.5 rounded-full text-[10pt] font-bold animate-neon-pulse" 
                        style={{ 
                          backgroundColor: analysis.info.risk.bg, 
                          color: analysis.info.risk.color,
                          boxShadow: `0 0 10px ${analysis.info.risk.shadow}`
                        }}
                      >
                        {analysis.info.risk.label}
                      </span>
                    </div>
                    <div className="text-xs font-bold text-blue-500">{analysis.info.score} / 10</div>
                  </div>
                  <div className="w-full h-2.5 bg-gray-100 rounded-full mb-3 overflow-hidden">
                    <div className="h-full rounded-full transition-all duration-1000" style={{ width: `${analysis.info.score * 10}%`, backgroundColor: brandColors.secondary }}></div>
                  </div>
                  <p className="text-base text-gray-700 mb-3">{analysis.info.msg}</p>
                  <button onClick={() => togglePower('info')} className="w-full text-left py-2 border-b border-blue-100 flex justify-between items-center text-sm font-bold text-blue-600 no-print">
                    查看專屬對策
                    <span className="flex items-center gap-1 opacity-70">
                      {expandedPower === 'info' ? "(收合)" : "(展開)"}
                      {expandedPower === 'info' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </span>
                  </button>
                  {(expandedPower === 'info' || true) && (
                    <div className={`mt-4 space-y-4 animate-in fade-in slide-in-from-top-2 ${expandedPower !== 'info' ? 'hidden print:block' : ''}`}>
                      {analysis.info.strategies.map((s, i) => (
                        <div key={i} className="pl-3 border-l-2" style={{ borderColor: brandColors.secondary }}>
                          <div className="font-bold text-blue-700 text-base mb-1">{s.title}</div>
                          <div className="text-sm text-gray-600">{s.desc}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="relative break-inside-avoid">
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center gap-2 font-bold text-base" style={{ color: '#5c8a67' }}>
                      {powerCategories.knowledge.icon} 知識力評析
                      <span 
                        className="px-2 py-0.5 rounded-full text-[10pt] font-bold animate-neon-pulse" 
                        style={{ 
                          backgroundColor: analysis.knowledge.risk.bg, 
                          color: analysis.knowledge.risk.color,
                          boxShadow: `0 0 10px ${analysis.knowledge.risk.shadow}`
                        }}
                      >
                        {analysis.knowledge.risk.label}
                      </span>
                    </div>
                    <div className="text-xs font-bold text-green-500">{analysis.knowledge.score} / 10</div>
                  </div>
                  <div className="w-full h-2.5 bg-gray-100 rounded-full mb-3 overflow-hidden">
                    <div className="h-full rounded-full transition-all duration-1000" style={{ width: `${analysis.knowledge.score * 10}%`, backgroundColor: brandColors.success }}></div>
                  </div>
                  <p className="text-base text-gray-700 mb-3">{analysis.knowledge.msg}</p>
                  <button onClick={() => togglePower('knowledge')} className="w-full text-left py-2 border-b border-green-100 flex justify-between items-center text-sm font-bold text-green-600 no-print">
                    查看專屬對策
                    <span className="flex items-center gap-1 opacity-70">
                      {expandedPower === 'knowledge' ? "(收合)" : "(展開)"}
                      {expandedPower === 'knowledge' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </span>
                  </button>
                  {(expandedPower === 'knowledge' || true) && (
                    <div className={`mt-4 space-y-4 animate-in fade-in slide-in-from-top-2 ${expandedPower !== 'knowledge' ? 'hidden print:block' : ''}`}>
                      {analysis.knowledge.strategies.map((s, i) => (
                        <div key={i} className="pl-3 border-l-2" style={{ borderColor: brandColors.success }}>
                          <div className="font-bold text-green-700 text-base mb-1">{s.title}</div>
                          <div className="text-sm text-gray-600">{s.desc}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-14 pt-8 border-t border-dashed no-print" style={{ borderColor: brandColors.softBlue }}>
                <div className="relative flex flex-col items-center">
                  <div className="w-full bg-white p-6 rounded-[30px] border border-pink-100 text-center shadow-sm">
                    <div className="w-12 h-12 bg-pink-50 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Lock className="w-6 h-6 text-pink-400" />
                    </div>
                    <div className="mb-6">
                      <p className="font-bold text-lg text-gray-800 mb-2">解鎖專屬您的具體行動方案</p>
                      <div className="text-sm text-gray-600 leading-relaxed text-left px-2">
                        <span>在您面對照顧家人挑戰，照顧管家真人諮詢能夠協助您，更清楚資訊資源哪裡找、身體疾病怎麼顧、心理壓力如何鬆。針對您的狀況，我們可以先從</span>
                        <span className="blur-[4.5px] select-none opacity-60 inline">針對您目前遇到的最難點，媒合相關領域的資深照顧前輩。透過他人的生活智慧，將艱澀的醫學知識轉化為具體可行的解決方案，讓您在忙碌中也能找到穩定的節奏。</span>
                      </div>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                      <button onClick={() => setShowConsult(true)} className="w-full py-4 rounded-full text-white font-black text-lg shadow-xl flex items-center justify-center gap-2 active:scale-95 transition-all" 
                        style={{ backgroundColor: brandColors.deepPink }}>
                        <MessageSquare className="w-5 h-5" />
                        預約諮詢照顧管家
                      </button>
                      <p className="text-xs font-bold" style={{ color: brandColors.deepPink }}>目前尚有免費名額，想預約要快喔！</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-14 px-2 break-inside-avoid">
                <div className="flex items-center gap-3 mb-4">
                  <MessageSquare className="w-5 h-5 text-pink-400" />
                  <h3 className="text-lg font-bold text-gray-800">照顧管家溫馨叮嚀</h3>
                </div>
                <div className="text-base text-gray-700 space-y-4 leading-relaxed">
                  <p className="font-bold text-pink-600">致親愛的照顧者：</p>
                  <p>照顧是一場漫長的馬拉松，而不是百米衝刺。在我們陪伴親人走這段路的同時，也別忘了您也是需要被照顧、被理解的個體。這份叮嚀是為了提醒您，在忙碌的照護日常中，如何找到一絲喘息的空間與力量。</p>
                  <p>照顧者常會陷入「我做得不夠好」的自責，但請記得，沒有完美的照顧者，只有不斷努力適應現狀的陪伴者。當您感到疲憊時，請允許自己暫停，因為您的身心健康，才是高品質照護的最基本保證。</p>
                  <p>無論遇到什麼困難，請記得您並不孤單，我們始終在這裡，為您的照顧之路提供最溫暖的支持與最專業的建議。</p>
                </div>
                <WarmVideoIllustration />
              </div>

              {showConsult && (
                <div id="consult-section" className="mt-10 pt-10 border-t-2 border-dashed border-pink-100 animate-in fade-in slide-in-from-bottom-8 no-print">
                  <h3 className="text-xl font-black text-center mb-6 text-pink-600">填寫諮詢預約單</h3>
                  <iframe 
                    src="https://www.surveycake.com/s/P8Aza?aka_source=gai_personalcareguideline&aka_medium=endpage"
                    className="w-full h-[800px] rounded-2xl border-2 border-gray-100 shadow-inner bg-gray-50"
                    title="諮詢預約單"
                  />
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-3 mt-6 no-print">
              <button onClick={handleShare} className="flex items-center justify-center gap-2 py-4 rounded-full border-2 border-gray-200 bg-white text-gray-600 font-bold text-base active:scale-95 transition-all">
                <Share2 className="w-4 h-4" /> 分享報告
              </button>
              <button onClick={handleDownload} className="flex items-center justify-center gap-2 py-4 rounded-full border-2 border-gray-200 bg-white text-gray-600 font-bold text-base active:scale-95 transition-all">
                <Download className="w-4 h-4" /> 下載報告
              </button>
            </div>

            <button onClick={handleRestart} className="w-full mt-4 py-4 rounded-full text-base font-bold border-2 bg-white transition-all active:scale-95 no-print" style={{ borderColor: brandColors.primary, color: brandColors.primary }}>
              <RefreshCcw className="inline-block mr-2 w-4 h-4" /> 重新檢測
            </button>
          </div>
        )}

        {currentPage === 'consult' && (
          <div className="animate-in slide-in-from-right pb-10">
            <div className="bg-white rounded-[32px] shadow-sm border-2 overflow-hidden flex flex-col" style={{ borderColor: brandColors.softBlue }}>
              <header className="p-4 border-b border-gray-100 flex justify-between items-center bg-pink-50">
                <button onClick={() => navigateTo('result')} className="p-2 hover:bg-white rounded-md transition-colors flex items-center gap-1 text-gray-400 text-sm font-medium">
                  <ArrowLeft className="w-4 h-4" /> 離開
                </button>
                <h3 className="text-lg font-black text-pink-600">申請星雲計畫諮詢 (免費)</h3>
                <div className="w-10"></div>
              </header>
              
              <div className="p-6 space-y-8">
                <div className="space-y-3">
                  <label className="block font-black text-gray-700">1. 請勾選想要諮詢的議題 (可複選)</label>
                  <div className="grid grid-cols-2 gap-2">
                    {['身體照顧技巧', '互動溝通技巧', '心理支持資源', '社會福利補助', '照顧方式分析', '其他'].map(topic => (
                      <button key={topic} onClick={() => toggleConsultTopic(topic)} 
                        className={`p-3 rounded-xl border-2 text-sm font-bold transition-all ${consultForm.q2.includes(topic) ? 'border-pink-500 bg-pink-50 text-pink-600' : 'border-gray-100 text-gray-500'}`}>
                        {topic}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="block font-black text-gray-700">2. 具體是遇到什麼問題或想諮詢什麼？</label>
                  <textarea value={consultForm.q3} onChange={e => setConsultForm({...consultForm, q3: e.target.value})} placeholder="例如：想知道長照2.0怎麼申請？" className="w-full p-4 rounded-xl border-2 border-gray-100 outline-none focus:border-pink-300 min-h-[100px] text-base" />
                </div>

                <div className="space-y-3">
                  <label className="block font-black text-gray-700">3. 想選擇哪一種服務方案？</label>
                  <div className="space-y-2">
                    {['30天四次線上視訊諮詢', '單次線上視訊諮詢', '文字訊息諮詢 (14天)'].map(plan => (
                      <button key={plan} onClick={() => setConsultForm({...consultForm, q4: plan})} 
                        className={`w-full text-left p-4 rounded-xl border-2 text-base font-bold transition-all ${consultForm.q4 === plan ? 'border-pink-500 bg-pink-50 text-pink-600' : 'border-gray-100 text-gray-500'}`}>
                        {plan}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="block font-black text-gray-700">4. 被照顧者的民國出生年？</label>
                  <input type="text" value={consultForm.q12} onChange={e => setConsultForm({...consultForm, q12: e.target.value})} placeholder="例如：45" className="w-full p-4 rounded-xl border-2 border-gray-100 outline-none focus:border-pink-300 text-base" />
                </div>

                <div className="space-y-3">
                  <label className="block font-black text-gray-700">5. 被照顧者的生理性別？</label>
                  <div className="flex gap-4">
                    {['男', '女'].map(gender => (
                      <button key={gender} onClick={() => setConsultForm({...consultForm, q13: gender})} 
                        className={`flex-1 p-4 rounded-xl border-2 text-base font-bold transition-all ${consultForm.q13 === gender ? 'border-pink-500 bg-pink-50 text-pink-600' : 'border-gray-100 text-gray-500'}`}>
                        {gender}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="block font-black text-gray-700">6. 居住的縣市？</label>
                  <select value={consultForm.q14} onChange={e => setConsultForm({...consultForm, q14: e.target.value})} className="w-full p-4 rounded-xl border-2 border-gray-100 outline-none appearance-none bg-white text-base focus:border-pink-300 transition-all">
                    <option value="">請選擇縣市</option>
                    {cities.map(city => <option key={city} value={city}>{city}</option>)}
                  </select>
                </div>

                <div className="space-y-3">
                  <label className="block font-black text-gray-700">7. 您的姓名？</label>
                  <input type="text" value={consultForm.q17} onChange={e => setConsultForm({...consultForm, q17: e.target.value})} placeholder="請填入姓名" className="w-full p-4 rounded-xl border-2 border-gray-100 outline-none focus:border-pink-300 text-base" />
                </div>

                <div className="space-y-3">
                  <label className="block font-black text-gray-700">8. 您的聯絡電話？</label>
                  <input type="tel" value={consultForm.q19} onChange={e => setConsultForm({...consultForm, q19: e.target.value})} placeholder="請務必填寫正確" className="w-full p-4 rounded-xl border-2 border-gray-100 outline-none focus:border-pink-300 text-base" />
                </div>

                <div className="space-y-3 pb-6">
                  <label className="block font-black text-gray-700">9. 您的 Email？</label>
                  <input type="email" value={consultForm.q20} onChange={e => setConsultForm({...consultForm, q20: e.target.value})} placeholder="請填入 Email" className="w-full p-4 rounded-xl border-2 border-gray-100 outline-none focus:border-pink-300 text-base" />
                </div>

                <footer className="pt-6 border-t border-gray-100">
                  <button 
                    disabled={!isConsultComplete}
                    onClick={handleConsultSubmit} 
                    className={`w-full py-4 rounded-full text-white font-black text-lg shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2 ${isConsultComplete ? '' : 'opacity-40 grayscale'}`}
                    style={{ backgroundColor: brandColors.deepPink }}
                  >
                    確認送出並回到結果頁
                  </button>
                  {!isConsultComplete && (
                    <p className="text-center text-xs text-gray-400 mt-3 font-bold">請填寫完所有題目後即可送出</p>
                  )}
                </footer>
              </div>
            </div>
          </div>
        )}
      </main>

      <footer className="fixed bottom-0 left-0 right-0 h-3 z-50" style={{ background: gradientStyle }}></footer>
    </div>
  );
};

export default App;