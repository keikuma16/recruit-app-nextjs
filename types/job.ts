export type Job = {
    id: string;
    title: string;
    category: string;
    salary: number;
    created_at: string;
};

export const CATEGORIES = [
  "事務",
  "エンジニア",
  "営業",
  "デザイン",
  "マーケティング",
  "財務・経理",
  "人事",
  "カスタマーサポート",
  "製造",
  "医療・介護",
] as const;