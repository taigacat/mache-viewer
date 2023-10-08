import { Historical } from './historical';

export interface Gift extends Historical {
  streamId: string;
  index: number;
  name: string;
  count: number;
  sender: string;
}

export interface GiftWithPoint extends Gift {
  point: number;
  type: 'smile' | 'point' | 'unknown';
}

export const giftPointMap: {
  [key: string]: { type: 'smile' | 'point'; point: number };
} = {
  またね: { point: 300, type: 'smile' },
  了解: { point: 300, type: 'smile' },
  うんうん: { point: 300, type: 'smile' },
  うれしい: { point: 300, type: 'smile' },
  おやすみ: { point: 300, type: 'smile' },
  おはよう: { point: 300, type: 'smile' },
  おめでとう: { point: 300, type: 'smile' },
  がんばろう: { point: 300, type: 'smile' },
  応援してます: { point: 300, type: 'smile' },
  かわいい: { point: 300, type: 'smile' },
  それな: { point: 300, type: 'smile' },
  かっこいい: { point: 300, type: 'smile' },
  つらたん: { point: 300, type: 'smile' },
  かまちょ: { point: 300, type: 'smile' },
  'ただいま～': { point: 300, type: 'smile' },
  おかえり: { point: 300, type: 'smile' },
  キュンです: { point: 300, type: 'smile' },
  乾杯: { point: 300, type: 'smile' },
  'ビックリ！！': { point: 300, type: 'smile' },
  世界一可愛い: { point: 100, type: 'point' },
  推ししか勝たん: { point: 100, type: 'point' },
  かわいいがすぎる: { point: 100, type: 'point' },
  沼りました: { point: 100, type: 'point' },
  激推し: { point: 100, type: 'point' },
  ワロタ: { point: 1, type: 'smile' },
  萌え: { point: 1, type: 'smile' },
  星: { point: 100, type: 'smile' },
  サイリウム: { point: 200, type: 'smile' },
  バラ: { point: 200, type: 'smile' },
  だるま: { point: 200, type: 'smile' },
  コイン: { point: 200, type: 'smile' },
  花束: { point: 300, type: 'smile' },
  タコ: { point: 300, type: 'smile' },
  アイス: { point: 300, type: 'smile' },
  HP0: { point: 300, type: 'smile' },
  '推しカラーサイリウム（赤）': { point: 300, type: 'smile' },
  '推しカラーサイリウム（青）': { point: 300, type: 'smile' },
  '推しカラーサイリウム（黄）': { point: 300, type: 'smile' },
  '推しカラーサイリウム（緑）': { point: 300, type: 'smile' },
  '推しカラーサイリウム（ピンク）': { point: 300, type: 'smile' },
  ヲタ芸: { point: 1000, type: 'smile' },
  拍手: { point: 1000, type: 'smile' },
  スマイル玉: { point: 10000, type: 'smile' },
  ハート: { point: 100, type: 'point' },
  'ざわ…ざわ…': { point: 100, type: 'point' },
  紙テープ: { point: 500, type: 'point' },
  'Verygood!!': { point: 500, type: 'point' },
  花火: { point: 1000, type: 'point' },
  弾幕: { point: 1000, type: 'point' },
  キター: { point: 1000, type: 'point' },
  'fever!!': { point: 5000, type: 'point' },
  '超fever!!': { point: 10000, type: 'point' },
  銀のエンジェル: { point: 10000, type: 'point' },
  城: { point: 10000, type: 'point' },
  タワー: { point: 10000, type: 'point' },
  金のエンジェル: { point: 20000, type: 'point' },
  レインボーエンジェル: { point: 30000, type: 'point' },
  ゼウス: { point: 50000, type: 'point' },
  スマイル大入り: { point: 100, type: 'smile' },
  大入り袋: { point: 500, type: 'point' },
  世界に1つだけのボイスメッセージ: { point: 3000, type: 'point' },
};
