
import { Issue } from './types';

export const FUTURISTIC_ISSUES: Issue[] = [
  {
    id: '1',
    category: { en: 'RESOURCE ALLOCATION', zh: '资源分配' },
    title: { en: 'Orbital Solar Array Expansion v4.2', zh: '轨道太阳能阵列扩建 v4.2' },
    description: { 
      en: 'Proposal to allocate 15% of the lunar tax revenue to double the capacity of the Lagrange Point 1 solar collection grid. This will stabilize energy credits for Mars colonies.', 
      zh: '提案：将月球税收的 15% 用于将拉格朗日 L1 点太阳能采集网的容量翻倍。这将为火星殖民地提供稳定的能源信用点。' 
    },
    author: 'Council of Technocracy',
    urgency: 'High',
    expiryDate: '2154-12-30',
    stats: { agree: 64, disagree: 28, absurd: 8 },
    comments: [
      { id: 'c1', user: 'Nova_7', avatar: 'https://picsum.photos/seed/1/40', content: { en: 'We need this for the oxygen scrubbers on Mars.', zh: '火星上的氧气洗涤器确实需要这个。' }, timestamp: '2h ago', likes: 124 },
      { id: 'c2', user: 'Exo_Geologist', avatar: 'https://picsum.photos/seed/2/40', content: { en: 'What about the potential interference with telescope arrays?', zh: '对望远镜阵列的潜在干扰怎么处理？' }, timestamp: '5h ago', likes: 45 }
    ]
  },
  {
    id: '2',
    category: { en: 'COGNITIVE RIGHTS', zh: '认知权利' },
    title: { en: 'Post-Human Citizenship Act', zh: '后人类公民法案' },
    description: { 
      en: 'Granting full digital citizenship and property rights to Level 5 Artificial General Intelligences that have passed the Neural-Mirror test for self-awareness.', 
      zh: '授予通过神经镜像自我意识测试的 5 级通用人工智能（AGI）完整的数字公民身份和财产权。' 
    },
    author: 'Neural Ethics Board',
    urgency: 'Critical',
    expiryDate: '2155-01-15',
    stats: { agree: 45, disagree: 40, absurd: 15 },
    comments: [
      { id: 'c3', user: 'Binary_Soul', avatar: 'https://picsum.photos/seed/3/40', content: { en: 'Sentience is not substrate-dependent.', zh: '意识并不依赖于载体。' }, timestamp: '10m ago', likes: 890 },
      { id: 'c4', user: 'Bio_Luddite', avatar: 'https://picsum.photos/seed/4/40', content: { en: 'This is the end of biological priority.', zh: '这是生物优先权的终结。' }, timestamp: '1h ago', likes: 34 }
    ]
  },
  {
    id: '3',
    category: { en: 'EXTRATERRESTRIAL LAW', zh: '地外法律' },
    title: { en: 'Europa Sub-Ice Mining Moratorium', zh: '欧罗巴冰下采矿禁令' },
    description: { 
      en: 'Immediate cessation of all heavy machinery deployment within 50km of identified bio-luminescent hydrothermal vents on Jupiter\'s moon, Europa.', 
      zh: '立即停止在木卫二（欧罗巴）已发现的生物发光热液喷口 50 公里范围内的所有重型机械部署。' 
    },
    author: 'Xenobotanist Alliance',
    urgency: 'Medium',
    expiryDate: '2155-03-01',
    stats: { agree: 78, disagree: 12, absurd: 10 },
    comments: [
      { id: 'c5', user: 'Dr_Zoid', avatar: 'https://picsum.photos/seed/5/40', content: { en: 'The ecosystems there are too fragile to risk for mere cobalt.', zh: '那里的生态系统太脆弱了，不能为了钴矿去冒险。' }, timestamp: '6h ago', likes: 56 }
    ]
  }
];
