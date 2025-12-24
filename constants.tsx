
import { Character, GameItem } from './types';

// 使用官方透明背景像素贴图
export const SPRITES = {
  WOOPER: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/194.png",
  GOOMY: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/704.png",
  CORPHISH: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/341.png",
  PIPLUP: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/393.png",
  WINE_STALL: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/429.png",
  GINGER_STALL: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/67.png",
  TREE: "https://api.iconify.design/twemoji:christmas-tree.svg",
};

/**
 * 核心配置：
 * 如果本地读取一直失败，请将此处的字符串替换为你的 GitHub 图片链接
 */
export const FINAL_POLAROID_IMAGE = "https://github.com/Drill78/merry-cirsis/blob/main/crisis.jpg?raw=true";

/**
 * 背景音乐配置：
 * 请将 "bgm.mp3" 替换为你实际上传的文件名或远程链接
 */
export const BGM_URL = "https://github.com/Drill78/merry-cirsis/raw/refs/heads/main/58~558~55588.mp3";

export const ITEMS: Record<string, GameItem> = {
  STARRY_SHELL: {
    id: 'starry_shell',
    name: '星星碎片',
    description: '在雪地里捡到的形似基拉祈的流星，听说可以吸引无限的财富。',
    icon: '🌟'
  },
  GOLDEN_CLAW: {
    id: 'golden_claw',
    name: '钳子',
    description: '龙虾小兵自断一臂，为跟随乌波大王献上的供奉',
    icon: '🦞'
  },
  ICE_CRYSTAL: {
    id: 'ice_crystal',
    name: '冰！！！',
    description: '波加曼每天都溜的冰，永不融化。',
    icon: '🧊'
  },
  MULLED_WINE: {
    id: 'mulled_wine',
    name: '香料热红酒',
    description: '暖洋洋的红酒，甜甜的，带有肉桂和橙子的香气，喝完身体好像有一些奇怪的变化。',
    icon: '🍷'
  },
  GINGERBREAD: {
    id: 'gingerbread',
    name: '乌波姜饼',
    description: '有着30年老师傅独门秘诀的美味姜饼，做成了乌波的形状！',
    icon: '🥨'
  }
};

export const CHARACTERS: Character[] = [
  {
    id: 'goomy',
    name: '黏黏宝',
    type: 'friend',
    triggerY: 600,
    sprite: SPRITES.GOOMY,
    dialogue: {
      speaker: '黏宝大王',
      lines: ['嘿！乌波大王！今天的雪好大呀。','圣！诞！快！乐！', '带上这个幸运的星星碎片，我们一起去寻找大圣诞树吧！']
    },
    gift: ITEMS.STARRY_SHELL
  },
  {
    id: 'wine_stall',
    name: '热红酒摊',
    type: 'stall',
    triggerY: 1200,
    sprite: SPRITES.WINE_STALL,
    dialogue: {
      speaker: '面带笑容的女巫婆婆',
      lines: ['要来杯热红酒暖暖身子吗？', '这是加了很多魔法小料的特制女巫红酒，送给你吧。']
    },
    gift: ITEMS.MULLED_WINE
  },
  {
    id: 'corphish',
    name: '龙虾小b',
    type: 'friend',
    triggerY: 1800,
    sprite: SPRITES.CORPHISH,
    dialogue: {
      speaker: '龙虾小b',
      lines: ['哦～帅～','嘿！等等我！别跑那么快！', '我想当挂件！带上我吧！']
    },
    gift: ITEMS.GOLDEN_CLAW
  },
  {
    id: 'ginger_stall',
    name: '姜饼摊',
    type: 'stall',
    triggerY: 2400,
    sprite: SPRITES.GINGER_STALL,
    dialogue: {
      speaker: '筋力强健的面包师',
      lines: ['新鲜的姜饼人出炉喽！', '嘿，可爱的乌波，拿个新鲜出炉的热姜饼补充些能量吧。']
    },
    gift: ITEMS.GINGERBREAD
  },
  {
    id: 'piplup',
    name: '波加man～',
    type: 'friend',
    triggerY: 3000,
    sprite: SPRITES.PIPLUP,
    dialogue: {
      speaker: '波加man～',
      lines: ['噢噢噢噢噢','太，太，太，太正了！！！', '一会儿得给圣诞老人也溜点儿']
    },
    gift: ITEMS.ICE_CRYSTAL
  }
];

export const WORLD_LENGTH = 3600;
