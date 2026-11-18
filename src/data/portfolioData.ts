export type Language = 'zh' | 'en';

export type ProjectCategory = 'all' | 'systems' | 'hardware' | 'spatial';

export interface ProjectItem {
  id: string;
  index: string;
  category: Exclude<ProjectCategory, 'all'>;
  categoryLabel: Record<Language, string>;
  title: Record<Language, string>;
  summary: Record<Language, string>;
  client: string;
  location: string;
  year: string;
  image: string;
  featured?: boolean;
  metrics: {
    label: Record<Language, string>;
    value: string;
  }[];
  challenge: Record<Language, string>;
  architecture: Record<Language, string>;
  outcome: Record<Language, string>;
  specs: {
    key: Record<Language, string>;
    value: string;
  }[];
}

export interface CapabilityItem {
  id: string;
  index: string;
  title: Record<Language, string>;
  subtitle: Record<Language, string>;
  description: Record<Language, string>;
  deliverables: Record<Language, string[]>;
}

export const HERO_IMAGE = '/src/assets/images/hero_studio_desk_1794992961400.jpg';

export const UI_COPY = {
  brand: 'SORA LIN',
  nav: {
    work: { zh: '精选作品', en: 'Work' },
    capabilities: { zh: '核心能力', en: 'Capabilities' },
    lab: { zh: '交互实验室', en: 'Motion Lab' },
    contact: { zh: '联系合作', en: 'Contact' },
  },
  ctaPrimary: { zh: '发起合作', en: 'Start a Project' },
  hero: {
    locationLine: {
      zh: '苏黎世 · 上海 · 东京远程协作',
      en: 'Zurich · Shanghai · Tokyo Remote',
    },
    headline: {
      zh: '以精密科技秩序与灵动交互，构建面向全球的数字产品界面。',
      en: 'Precision tech architecture and fluid interaction for global products.',
    },
    lead: {
      zh: '独立产品设计师与交互系统架构师。专注于跨国设计系统、精密硬件界面与深色高对比度数据工作台，让复杂技术具备直观触感。',
      en: 'Independent Product Designer & Interaction Architect. Crafting cross-border design systems, precision hardware UI, and high-contrast analytical interfaces.',
    },
    exploreBtn: { zh: '浏览精选作品', en: 'Explore Selected Work' },
    labBtn: { zh: '体验交互实验室', en: 'Open Motion Lab' },
    canvasCaption: {
      zh: '工作台视觉 · 精密网格与实体旋钮原型',
      en: 'Studio Workspace · Precision Grid & Tactile Dial Prototyping',
    },
  },
  metrics: [
    {
      value: '42+',
      label: { zh: '已交付全球产品界面', en: 'Global Products Shipped' },
      context: { zh: '涵盖欧洲与亚太市场', en: 'Across Europe & APAC' },
    },
    {
      value: '14',
      label: { zh: '多语言本地化体系', en: 'Localized Markets' },
      context: { zh: '拉丁 / 中日韩 / 阿拉伯语适配', en: 'Latin, CJK & RTL Layouts' },
    },
    {
      value: '99.2%',
      label: { zh: '设计系统组件复用率', en: 'Design Token Adoption' },
      context: { zh: '平均研发交付周期缩短 38%', en: '38% Faster Engineering Handoff' },
    },
    {
      value: '120ms',
      label: { zh: '交互响应预算上限', en: 'Interaction Response Budget' },
      context: { zh: 'GPU 合成层零卡顿动画', en: 'Compositor-Only Smooth Motion' },
    },
  ],
  marqueeItems: {
    zh: [
      '跨国设计系统',
      '精密硬件交互',
      '空间拓扑界面',
      '深空数据工作台',
      '几何精密秩序',
      '微交互动力学',
    ],
    en: [
      'Global Design Systems',
      'Precision Hardware UI',
      'Spatial Mobility Interfaces',
      'Dark-Tech Analytical Workspaces',
      'Geometric Precision',
      'Tactile Motion Architecture',
    ],
  },
  workSection: {
    eyebrow: { zh: '精选案例研究', en: 'Selected Case Studies' },
    title: { zh: '结构精密，交互灵动', en: 'Precision Systems, Agile Motion' },
    filters: [
      { id: 'all' as ProjectCategory, label: { zh: '全部项目', en: 'All Work' } },
      { id: 'systems' as ProjectCategory, label: { zh: '设计系统', en: 'Design Systems' } },
      { id: 'hardware' as ProjectCategory, label: { zh: '硬件界面', en: 'Hardware UI' } },
      { id: 'spatial' as ProjectCategory, label: { zh: '空间与数据', en: 'Spatial & Data' } },
    ],
    viewCase: { zh: '查看架构详情', en: 'Inspect Case Study' },
  },
  modal: {
    overviewTab: { zh: '设计脉络', en: 'Case Overview' },
    specsTab: { zh: '系统规格', en: 'System Specs' },
    challenge: { zh: '核心挑战', en: 'The Challenge' },
    architecture: { zh: '系统架构', en: 'System Architecture' },
    outcome: { zh: '量化成果', en: 'Measurable Outcome' },
    prev: { zh: '上一个项目', en: 'Previous' },
    next: { zh: '下一个项目', en: 'Next' },
    closeHint: { zh: '关闭', en: 'Close' },
  },
  capabilitiesSection: {
    eyebrow: { zh: '方法论与专长', en: 'Capabilities & Craft' },
    title: {
      zh: '从品牌平面逻辑到前端代码级动效的全链路设计',
      en: 'Bridging Swiss flat clarity with production interaction engineering',
    },
    philosophy: {
      zh: '摒弃冗余的拟物装饰与视觉噪音。我坚持 60-30-10 的深空高对比空间配比、严格的 8px 建筑网格以及低于 200ms 的灵动交互反馈，确保产品在不同语言文化与屏幕密度下保持一致的精密质感。',
      en: 'By removing decorative clutter and visual noise, interfaces regain legibility and speed. Every project is governed by an 8px architectural grid, high-contrast dark surfaces, and agile spring physics tuned for immediate comprehension.',
    },
    trustedByLabel: { zh: '合作团队与国际机构', en: 'Collaborated with teams in' },
    hubs: ['Zurich', 'Tokyo', 'Stockholm', 'Shanghai', 'San Francisco'],
  },
  labSection: {
    eyebrow: { zh: '实时交互实验场', en: 'Interactive Motion Lab' },
    title: {
      zh: '亲手测试扁平网格与动效阻尼',
      en: 'Test the flat grid & spring physics live',
    },
    description: {
      zh: '调节底层建筑网格密度或切换物理阻尼曲线，拖动右侧画布中的模块，体验零延迟的微交互吸附与实时坐标反馈。',
      en: 'Adjust grid density or switch motion damping curves, then drag or click modules on the stage to feel crisp compositor-driven feedback.',
    },
    gridDensityLabel: { zh: '网格密度', en: 'Grid Density' },
    physicsLabel: { zh: '动画阻尼预设', en: 'Motion Preset' },
    resetLabel: { zh: '重置模块位置', en: 'Reset Positions' },
    presets: [
      { id: 'crisp', label: { zh: '精密快切 (140ms)', en: 'Crisp Snap (140ms)' } },
      { id: 'fluid', label: { zh: '流体弹性', en: 'Fluid Spring' } },
      { id: 'magnetic', label: { zh: '高阻尼磁吸', en: 'Magnetic Damped' } },
    ],
  },
  contactModal: {
    title: { zh: '开启新项目对话', en: 'Start a New Project' },
    subtitle: {
      zh: '目前开放 2026 Q4 – 2027 Q1 国际产品设计与设计系统咨询档期。',
      en: 'Available for select product design & design system engagements for Q4 2026 – Q1 2027.',
    },
    scopeLabel: { zh: '项目类型', en: 'Project Scope' },
    scopes: [
      { id: 'system', label: { zh: '跨国设计系统', en: 'Design System' } },
      { id: 'product', label: { zh: '数字产品 0→1', en: '0→1 Digital Product' } },
      { id: 'hardware', label: { zh: '智能硬件界面', en: 'Hardware UI' } },
      { id: 'motion', label: { zh: '交互动效架构', en: 'Motion Architecture' } },
    ],
    timelineLabel: { zh: '预期周期', en: 'Target Timeline' },
    timelines: [
      { id: '4w', label: { zh: '4–6 周冲刺', en: '4–6 Weeks' } },
      { id: '3m', label: { zh: '2–3 个月深度合作', en: '2–3 Months' } },
      { id: 'advisory', label: { zh: '长期设计顾问', en: 'Ongoing Advisory' } },
    ],
    nameLabel: { zh: '您的称呼', en: 'Your Name' },
    namePlaceholder: { zh: '例如：Alex Meyer / 陈默', en: 'e.g. Alex Meyer' },
    emailLabel: { zh: '联系邮箱', en: 'Work Email' },
    emailPlaceholder: { zh: 'name@company.com', en: 'name@company.com' },
    briefLabel: { zh: '项目简述', en: 'Project Brief' },
    briefPlaceholder: {
      zh: '请简要描述产品目标、目标市场或当前面临的界面体验挑战…',
      en: 'Share your product goals, target regions, or key interface challenges…',
    },
    submitBtn: { zh: '发送项目意向', en: 'Send Inquiry' },
    successTitle: { zh: '项目意向已记录', en: 'Inquiry Received' },
    successBody: {
      zh: '感谢您的联系。我通常会在 24 小时内（按苏黎世与上海工作时段）通过邮件回复您。',
      en: 'Thank you for reaching out. I typically respond within 24 hours across CET and CST working hours.',
    },
    doneBtn: { zh: '完成返回', en: 'Back to Portfolio' },
  },
  footer: {
    tagline: {
      zh: '精密科技秩序 · 国际化视野 · 灵动交互体验',
      en: 'Precision Tech · Global Perspective · Agile Interaction',
    },
    copyEmail: { zh: '复制邮箱', en: 'Copy Email' },
    copied: { zh: '已复制邮箱', en: 'Email Copied' },
    rights: {
      zh: '© 2026 Sora Lin Studio. 保留所有权利。',
      en: '© 2026 Sora Lin Studio. All rights reserved.',
    },
  },
};

export const PROJECTS: ProjectItem[] = [
  {
    id: 'krono-design-system',
    index: '01',
    category: 'systems',
    categoryLabel: { zh: '跨国设计系统', en: 'Design Systems' },
    title: {
      zh: 'Krono 全球多端金融设计语言',
      en: 'Krono Global Multi-Script Design System',
    },
    summary: {
      zh: '为覆盖 14 个国家的企业级结算平台构建 180+ 扁平高对比度组件与全自动双语排版 Token。',
      en: 'Architected 180+ flat high-contrast UI components and automated Latin/CJK typography tokens across 14 countries.',
    },
    client: 'Krono Clearing AG',
    location: 'Zurich · Singapore',
    year: '2026',
    image: '/src/assets/images/work_design_system_1794992963230.jpg',
    featured: true,
    metrics: [
      { label: { zh: '组件复用率', en: 'Component Reuse' }, value: '99.2%' },
      { label: { zh: '多语言交付提速', en: 'L10n Speedup' }, value: '3.4×' },
      { label: { zh: 'WCAG 对比度达标', en: 'AA Contrast Pass' }, value: '100%' },
    ],
    challenge: {
      zh: '原有界面在英文、德文长词与中文紧凑排版间频繁发生折行溢出，导致欧美与亚太团队维护两套割裂的前端代码库。',
      en: 'Legacy interfaces suffered severe text overflow across German compound nouns and compact CJK layouts, forcing regional teams into fragmented codebases.',
    },
    architecture: {
      zh: '建立了基于逻辑属性（Logical Properties）的 8px 扁平网格规范，统一浅色极简中性色阶与钴蓝单点强调色，将 Figma Variables 与代码 CSS Tokens 双向同步。',
      en: 'Designed a logical-property 8px flat grid with strict daylight contrast tokens, single cobalt focal accents, and bi-directional Figma-to-CSS token compilation.',
    },
    outcome: {
      zh: '6 个月内完成 14 个国家站点统一迁移，工程走查缺陷下降 64%，单页面首次交互响应稳定在 110ms 以内。',
      en: 'Unified 14 regional product surfaces within 6 months, cutting visual QA defects by 64% while maintaining sub-110ms interaction latency.',
    },
    specs: [
      { key: { zh: '网格基准', en: 'Grid Baseline' }, value: '8px / 4px Sub-grid' },
      { key: { zh: '色彩模式', en: 'Color Architecture' }, value: '60-30-10 Cool Daylight' },
      { key: { zh: '字体堆栈', en: 'Typography Stack' }, value: 'Plus Jakarta + Noto Sans' },
      { key: { zh: '无障碍标准', en: 'Accessibility' }, value: 'WCAG 2.2 AA Verified' },
    ],
  },
  {
    id: 'monolith-audio-os',
    index: '02',
    category: 'hardware',
    categoryLabel: { zh: '硬件交互界面', en: 'Hardware UI' },
    title: {
      zh: 'Braun-inspired 模块化声学控制器 OS',
      en: 'Monolith Tactile Audio Controller OS',
    },
    summary: {
      zh: '结合物理阳极氧化铝旋钮与低功耗墨水屏风格浅色波形界面，实现零视觉疲劳的桌面混音控制。',
      en: 'Pairing precision anodized aluminum dials with a crisp daylight e-paper-inspired waveform interface for studio mixing.',
    },
    client: 'Klangwerk Instruments',
    location: 'Berlin · Tokyo',
    year: '2026',
    image: '/src/assets/images/work_audio_hardware_1794992962879.jpg',
    metrics: [
      { label: { zh: '旋钮映射延迟', en: 'Rotary Latency' }, value: '8ms' },
      { label: { zh: '盲操识别准确率', en: 'Eyes-Free Accuracy' }, value: '96%' },
    ],
    challenge: {
      zh: '传统音频设备屏幕充斥高饱和霓虹光谱，在强日光工作室环境下可读性极差，且物理按键与屏幕状态脱节。',
      en: 'Conventional audio hardware relies on saturated dark neon displays that wash out in daylight studios and disconnect physical detents from screen state.',
    },
    architecture: {
      zh: '采用高反差浅灰矢量波形与等宽数字刻度，为每一次物理旋钮阻尼步进设计 1:1 对应的平面几何微动画反馈。',
      en: 'Engineered high-contrast monochrome vector waveforms with tabular numeric readouts and 1:1 geometric feedback synchronized to physical rotary detents.',
    },
    outcome: {
      zh: '荣获 2026 国际工业交互设计精选奖，首批 5,000 台工程样机在东京与柏林一周内售罄。',
      en: 'Featured in the 2026 International Industrial UI Index; initial 5,000 hardware units sold out across Tokyo and Berlin within seven days.',
    },
    specs: [
      { key: { zh: '显示面板', en: 'Display Target' }, value: '120Hz High-Reflectance TFT' },
      { key: { zh: '刻度字体', en: 'Telemetry Type' }, value: 'JetBrains Mono Tabular' },
      { key: { zh: '响应帧率', en: 'Frame Budget' }, value: '8.3ms / Frame' },
      { key: { zh: '交互输入', en: 'Input Coupling' }, value: 'Optical Encoder + Touch' },
    ],
  },
  {
    id: 'nordic-spatial-transit',
    index: '03',
    category: 'spatial',
    categoryLabel: { zh: '空间与出行界面', en: 'Spatial Mobility' },
    title: {
      zh: 'Nordic 城市无人接驳车空间导航屏',
      en: 'Nordic Autonomous Transit Glass Interface',
    },
    summary: {
      zh: '极简扁平矢量拓扑地图与无边框浅色玻璃终端，服务跨国旅客的多语种无障碍实时换乘引导。',
      en: 'Frameless daylight glass terminal rendering flat vector city topography and multi-lingual accessible routing.',
    },
    client: 'Vektor Mobility Lab',
    location: 'Oslo · Stockholm',
    year: '2025',
    image: '/src/assets/images/work_spatial_transit_1794992964138.jpg',
    metrics: [
      { label: { zh: '路线理解速度', en: 'Route Read Time' }, value: '1.8s' },
      { label: { zh: '支持语言数量', en: 'Live Languages' }, value: '12' },
    ],
    challenge: {
      zh: '车厢内不同角度的反光与多语种乘客的快速扫视需求，要求界面在 2 秒内传达路径与到站信息。',
      en: 'Cabin glare and rapid passenger turnover required instant 2-second comprehension across 12 spoken languages.',
    },
    architecture: {
      zh: '剥离 3D 渲染建筑噪点，改用纯平双色等高线与单一钴蓝路径流线，结合平滑过渡镜头缩放降低晕动症风险。',
      en: 'Stripped away 3D building clutter in favor of 2D topographic lines, a single cobalt route vector, and motion-sickness-safe damped camera transitions.',
    },
    outcome: {
      zh: '已部署于奥斯陆 60 辆自动驾驶接驳巴士，乘客问询率下降 52%。',
      en: 'Deployed across 60 autonomous transit shuttles in Oslo, reducing passenger wayfinding inquiries by 52%.',
    },
    specs: [
      { key: { zh: '地图渲染', en: 'Map Vector Engine' }, value: 'Flat SVG / WebGL2 Tile' },
      { key: { zh: '动效安全', en: 'Motion Comfort' }, value: 'Zero-Parallax Pan' },
      { key: { zh: '字体号阶', en: 'Min Legibility' }, value: '24pt at 1.2m Distance' },
      { key: { zh: '环境光适配', en: 'Luminance Mode' }, value: 'High-Key Daylight' },
    ],
  },
  {
    id: 'meridian-analytics-desk',
    index: '04',
    category: 'spatial',
    categoryLabel: { zh: '浅色数据工作台', en: 'Analytical Workspace' },
    title: {
      zh: 'Meridian 机构级浅色量化研究终端',
      en: 'Meridian Light-First Institutional Terminal',
    },
    summary: {
      zh: '颠覆传统暗黑压抑的金融终端，以高呼吸感浅灰画布、等宽数字对齐与流畅图表钻取重构研报工作流。',
      en: 'Replacing fatiguing dark terminals with an airy daylight workspace, tabular financial alignment, and fluid chart inspection.',
    },
    client: 'Meridian Capital Tech',
    location: 'London · Hong Kong',
    year: '2025',
    image: '/src/assets/images/work_fintech_terminal_1794992964101.jpg',
    metrics: [
      { label: { zh: '分析师日均效率', en: 'Workflow Speed' }, value: '+41%' },
      { label: { zh: '视觉疲劳反馈降幅', en: 'Eye Strain Drop' }, value: '-68%' },
    ],
    challenge: {
      zh: '投研团队每天面对屏幕超过 9 小时，高密度暗色表格导致严重的视觉残留与多屏对比失真。',
      en: 'Analysts spent 9+ hours daily scanning dense dark tables, resulting in severe visual fatigue and cross-monitor glare.',
    },
    architecture: {
      zh: '用极细 1px 分割线替代重阴影卡片嵌套，全部财务数字强制启用 tabular-nums 等宽对齐，图表悬停采样响应控制在 16ms 内。',
      en: 'Replaced heavy card boxes with 1px structural hairlines, enforced tabular numerals across all ledgers, and tuned chart scrubbers to 60fps.',
    },
    outcome: {
      zh: '在伦敦与香港两地交易台全面上线，成为团队最受欢迎的日间默认工作台。',
      en: 'Rolled out across London and Hong Kong research desks as the default daytime analytical environment.',
    },
    specs: [
      { key: { zh: '表格密度', en: 'Row Rhythm' }, value: '40px Precision Grid' },
      { key: { zh: '数字对齐', en: 'Numeric Discipline' }, value: 'tabular-nums Strict' },
      { key: { zh: '交互采样', en: 'Scrubber Budget' }, value: '< 16ms Canvas' },
      { key: { zh: '色彩容量', en: 'Surface Delta' }, value: '≤ 6% Lightness Step' },
    ],
  },
];

export const CAPABILITIES: CapabilityItem[] = [
  {
    id: 'cap-systems',
    index: '01.',
    title: {
      zh: '国际化设计系统与 Token 架构',
      en: 'International Design Systems & Tokens',
    },
    subtitle: {
      zh: '从单一视觉稿到跨多语言、多平台的工程级规范',
      en: 'Scalable architecture from Figma variables to production code',
    },
    description: {
      zh: '构建兼顾拉丁字母与中日韩字符排版的弹性组件库，严格定义浅色画布层级、WCAG 对比度标准与无障碍键盘导航路径。',
      en: 'Architecting multi-script component libraries engineered for Latin and CJK typography, strict daylight contrast, and keyboard-first accessibility.',
    },
    deliverables: {
      zh: ['多语种排版与间距 Token', 'Figma / React 代码同步组件库', 'WCAG AA 无障碍审计规范'],
      en: ['Multi-Script Typography Tokens', 'Figma-to-React Component Parity', 'WCAG 2.2 AA Compliance Audits'],
    },
  },
  {
    id: 'cap-interaction',
    index: '02.',
    title: {
      zh: '微交互动力学与前端原型工程',
      en: 'Motion Architecture & Interactive Prototyping',
    },
    subtitle: {
      zh: '使用真实物理曲线与合成层动画验证体验细节',
      en: 'Validating spatial continuity with real spring physics in code',
    },
    description: {
      zh: '拒绝停留在静态切图，直接利用 React 与 Motion 编写可交互的高保真原型，确保每一次状态切换、手势拖拽与模态展开都流畅自然。',
      en: 'Moving beyond static mockups by shipping real interactive React & Motion prototypes where every transition, gesture, and layout shift settles cleanly.',
    },
    deliverables: {
      zh: ['120ms 交互响应规范', '共享元素转场与物理参数表', '可运行前端高保真原型'],
      en: ['Sub-200ms Feedback Budgets', 'Shared-Element Transition Specs', 'Production React Motion Prototypes'],
    },
  },
  {
    id: 'cap-hardware',
    index: '03.',
    title: {
      zh: '软硬件协同与空间数据界面',
      en: 'Hardware-Software UI & Spatial Data',
    },
    subtitle: {
      zh: '面向桌面设备、车载屏与专业仪器的扁平控制语言',
      en: 'Flat operational clarity for physical dials, mobility, and instruments',
    },
    description: {
      zh: '将精密工业设计的减法哲学引入数字屏幕，优化强光环境下的高对比浅色读数与物理旋钮/触控的协同反馈。',
      en: 'Bringing industrial minimalism to embedded displays—optimizing daylight legibility, tabular telemetry, and physical-to-digital input coupling.',
    },
    deliverables: {
      zh: ['嵌入式屏幕信息架构', '矢量地图与波形可视化规范', '硬件旋钮映射状态机'],
      en: ['Embedded HMI Architecture', 'Flat Vector Telemetry & Maps', 'Physical Input State Machines'],
    },
  },
  {
    id: 'cap-zero-to-one',
    index: '04.',
    title: {
      zh: '全球化数字产品 0→1 设计合伙',
      en: '0→1 Global Product Design Direction',
    },
    subtitle: {
      zh: '助力出海团队与科技初创建立清晰可信的国际品牌气质',
      en: 'Helping engineering-led startups ship world-class first impressions',
    },
    description: {
      zh: '与创始人及核心工程师紧密配合，从信息架构梳理、品牌平面视觉统一到首版核心业务界面落地，直接提升产品专业度与转化信任感。',
      en: 'Partnering directly with founders and staff engineers from early information architecture through flagship launch surfaces.',
    },
    deliverables: {
      zh: ['产品叙事与品牌数字语言', '核心工作流 UX 重构', '设计走查与上线交付陪跑'],
      en: ['Product Narrative & Visual Identity', 'Core Workflow UX Architecture', 'Engineering QA & Launch Polish'],
    },
  },
];
