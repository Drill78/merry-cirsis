
export interface GameItem {
  id: string;
  name: string;
  description: string;
  icon: string;
}

export interface Dialogue {
  speaker: string;
  lines: string[];
}

export interface Character {
  id: string;
  name: string;
  type: 'friend' | 'stall';
  triggerY: number; // Position on the road (0 to 100)
  dialogue: Dialogue;
  gift?: GameItem;
  sprite: string;
}

export interface GameState {
  wooperY: number;
  collectedFriends: string[];
  inventory: GameItem[];
  activeDialogue: Dialogue | null;
  gameStatus: 'playing' | 'ending' | 'polaroid';
  currentTargetIndex: number;
}
