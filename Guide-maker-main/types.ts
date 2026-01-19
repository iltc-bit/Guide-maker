import React from 'react';

export interface MoodState {
  currentImg: number | null;
  currentTag: string;
  futureImg: number | null;
  futureTag: string;
}

export interface NebulaData {
  q1: number;
  q8: string;
  q9: string;
  q15: string;
  q16: string;
  nickname: string;
  avatar: 'female' | 'neutral' | 'male' | null;
}

export interface ConsultForm {
  q2: string[];
  q3: string;
  q4: string;
  q12: string;
  q13: string;
  q14: string;
  q17: string;
  q19: string;
  q20: string;
}

export interface Question {
  id: number;
  text: string;
  icon: React.ReactNode;
}

export interface Option {
  title: string;
  desc: string;
  moodLabel: string;
}

export interface PowerCategory {
  label: string;
  ids: number[];
  color: string;
  icon: React.ReactNode;
}