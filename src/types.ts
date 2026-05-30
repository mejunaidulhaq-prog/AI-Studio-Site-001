/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type AppView =
  | 'home'
  | 'story'
  | 'garden'
  | 'cake'
  | 'letter'
  | 'companion'
  | 'constellation'
  | 'games'
  | 'dua'
  | 'ending';

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
}

export interface GuestWish {
  id: string;
  author_name: string;
  message: string;
  created_at: string;
  is_approved: boolean;
}

export interface GameScore {
  id: string;
  game_name: string;
  score: number;
  player_name?: string;
  created_at: string;
}
