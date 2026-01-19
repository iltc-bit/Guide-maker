import React from 'react';
import { Heart, Users, Calendar, ShieldCheck, BookOpen, Activity } from 'lucide-react';
import { PowerCategory, Question, Option } from './types';

export const brandColors = {
  primary: '#ecacbc',
  secondary: '#a7d4e0',
  success: '#9bcba6',
  accent: '#f3f0b8',
  softBlue: '#d2e8f1',
  softPink: '#f4d0da',
  deepPink: '#d98a9d'
};

export const powerCategories: Record<string, PowerCategory> = {
  support: { label: '支持力', ids: [1, 2], color: '#ecacbc', icon: <Heart className="w-5 h-5" /> },
  info: { label: '資訊力', ids: [3, 4], color: '#a7d4e0', icon: <Calendar className="w-5 h-5" /> },
  knowledge: { label: '知識力', ids: [5, 6], color: '#9bcba6', icon: <BookOpen className="w-5 h-5" /> }
};

export const questions: Question[] = [
  { id: 1, text: '我能覺察自己的情緒極限，並在體力或精神透支前主動尋求喘息。', icon: <Heart className="w-6 h-6" style={{ color: brandColors.primary }} /> },
  { id: 2, text: '我能讓周邊的人準確理解我的處境，避免因照顧問題產生衝突或孤立。', icon: <Users className="w-6 h-6" style={{ color: brandColors.secondary }} /> },
  { id: 3, text: '我能有效整合政府或民間各項資源，建立穩定的日常支援系統。', icon: <Calendar className="w-6 h-6" style={{ color: brandColors.success }} /> },
  { id: 4, text: '我對日常照顧流程有明確規劃，即使發生突發狀況也知道如何處理。', icon: <ShieldCheck className="w-6 h-6" style={{ color: '#88b091' }} /> },
  { id: 5, text: '我掌握被照顧者疾病的關鍵知識，能準確判斷其生理或行為變化的情況。', icon: <BookOpen className="w-6 h-6" style={{ color: brandColors.primary }} /> },
  { id: 6, text: '在面臨醫療選擇或治療方案時，我能清楚衡量利弊並做出合適的決定。', icon: <Activity className="w-6 h-6" style={{ color: brandColors.secondary }} /> }
];

export const currentOptions: Option[] = [
  { title: '體力透支', desc: '長期疲累身心已達極限', moodLabel: '沉重、倦怠' },
  { title: '孤軍奮戰', desc: '獨自支撐缺乏分擔對象', moodLabel: '孤寂、無助' },
  { title: '資訊焦慮', desc: '知識雜亂找不到正確方向', moodLabel: '迷惘、不安' },
  { title: '決策重擔', desc: '面對重大選擇壓力極大', moodLabel: '緊繃、壓力' },
  { title: '失去生活', desc: '被照顧填滿沒了自我未來', moodLabel: '壓抑、封閉' }
];

export const futureOptions: Option[] = [
  { title: '掌控現狀', desc: '掌控病況應對不再慌亂', moodLabel: '安穩、自信' },
  { title: '靈活調度', desc: '善用資源建立支援系統', moodLabel: '輕盈、流動' },
  { title: '適度喘息', desc: '定期留白休息沒有罪惡', moodLabel: '自在、呼吸' },
  { title: '溝通和諧', desc: '互動順暢減少對立衝突', moodLabel: '溫慢、流暢' },
  { title: '生活平衡', desc: '照顧與工作兼顧生活不脫軌', moodLabel: '和諧、完整' }
];

export const cities = ['臺北市', '新北市', '基隆市', '桃園市', '新竹縣', '新竹市', '苗栗縣', '台中市', '南投縣', '彰化縣', '雲林縣', '嘉義縣', '嘉義市', '台南市', '高雄市', '屏東縣', '宜蘭縣', '花蓮縣', '台東縣', '澎湖縣', '金門縣', '連江縣'];