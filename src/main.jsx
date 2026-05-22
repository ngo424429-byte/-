import React, { useEffect, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import {
  ArrowRight,
  BadgeCheck,
  Boxes,
  CheckCircle2,
  ChevronDown,
  ClipboardCheck,
  Factory,
  FileCheck2,
  Globe2,
  Mail,
  Menu,
  MessageCircle,
  PackageCheck,
  Phone,
  SearchCheck,
  Settings2,
  ShieldCheck,
  Sparkles,
  Wrench,
  X,
} from 'lucide-react'
import { motion, useMotionValue, useReducedMotion, useSpring, useTime, useTransform } from 'framer-motion'
import './styles.css'

const copy = {
  company: '东莞市宏途运动用品有限公司',
  companyEn: 'Dongguan Hongtu Sporting Goods Co., Ltd.',
  contact: '提交合作需求',
  email: '906714419@qq.com',
  phone: '15360031954',
  contactPerson: '戴先生',
  address: '中国广东省东莞市',
}

const navItems = [
  { id: 'top', label: '首页', href: '/#top', type: 'section' },
  { id: 'about', label: '公司实力', href: '/#about', type: 'section' },
  { id: 'gallery', label: '产品图库', href: '/gallery', type: 'page' },
  { id: 'factory', label: '生产能力', href: '/#factory', type: 'section' },
  { id: 'certs', label: '认证体系', href: '/#certs', type: 'section' },
  { id: 'custom', label: '定制服务', href: '/#custom', type: 'section' },
  { id: 'contact', label: '联系我们', href: '/#contact', type: 'section' },
]

const languageOptions = [
  ['zh', '中文'],
  ['en', 'English'],
  ['es', 'Español'],
  ['fr', 'Français'],
  ['de', 'Deutsch'],
  ['ja', '日本語'],
  ['ko', '한국어'],
  ['ru', 'Русский'],
]

function translateUrl(lang) {
  if (typeof window === 'undefined') return '#'
  if (lang === 'zh') return `${window.location.origin}${window.location.pathname}${window.location.hash}`
  return `https://translate.google.com/translate?sl=zh-CN&tl=${lang}&u=${encodeURIComponent(window.location.href)}`
}

const img = {
  hero: '/hongtu-new/optimized/hero-factory-building.jpg',
  reception: '/hongtu-new/optimized/company-reception-clean.jpg',
  rd: '/hongtu-new/optimized/rd-screen.jpg',
  forming: '/hongtu-new/optimized/forming-line.jpg',
  machine: '/hongtu-new/optimized/machine-room.jpg',
  screenPrint: '/hongtu-new/optimized/screen-print.jpg',
  workshop: '/hongtu-new/optimized/workshop-wide.jpg',
  equipment: '/hongtu-new/optimized/equipment-room.jpg',
  logo: '/hongtu-assets/hongtu-072.png',
  wechatQr: '/hongtu-new/wechat-qr-dai.jpg',
  lifestyleGallery: '/hongtu-new/optimized/lifestyle-gallery-hero.jpg',
  lifestyleRiding: '/hongtu-new/optimized/lifestyle-riding-pair.jpg',
  lifestyleFemale: '/hongtu-new/optimized/lifestyle-female-rider.jpg',
  lifestyleDuo: '/hongtu-new/optimized/lifestyle-duo-standing.jpg',
}

const stats = [
  ['2015', '成立时间'],
  ['10,000㎡', '工厂占地约'],
  ['60+', '出口国家与地区'],
  ['BSCI', '工厂体系认证'],
  ['ODM / OEM', '品牌定制与量产支持'],
]

const companyIntro = [
  '东莞市宏途运动用品有限公司成立于 2015 年，工厂占地约 10000 平方米，拥有 BSCI 认证，以及 CE / CPSC / ASTM 等多项认证检测资料。',
  '公司拥有完整的运动头盔生产链，依靠自身创新开发技术及生产能力，制造自行车骑行头盔、滑雪头盔、儿童头盔、平衡车头盔、轮滑头盔、攀岩头盔等产品。',
  '宏途产品远销国内外市场，覆盖欧美、亚非、大洋洲等地区，并与全球多家品牌商、贸易批发商、自行车实体店开展长期合作，承接各类 OEM / ODM 订单。',
  '公司设有设计部门和专业测试人员，对产品质量、安全、外观等环节进行测试与把控。从设计开发、生产到出厂，宏途坚持严格质量管理，交付让客户放心的产品。',
]

const capabilities = [
  ['研发与打样', '支持外观设计、结构评估、样品制作与定制方案确认。', Wrench, img.rd],
  ['模具与生产', '基于成熟运动头盔产品线，支持不同市场和使用场景的产品开发与批量生产。', Factory, img.forming],
  ['品质检测', '覆盖原料、结构、冲击、防护、装配与出货检验，保障批量交付稳定性。', ClipboardCheck, img.machine],
  ['出口与交付', '服务品牌客户、跨境卖家与渠道客户，支持长期订单协作与出口包装交付。', PackageCheck, img.workshop],
]

const projectStartItems = [
  ['01', '目标款式', '产品类型、参考图片或图库编号'],
  ['02', '销售市场', '欧洲、美国、日本或其他目标区域'],
  ['03', '定制需求', 'LOGO、颜色、内衬、织带、包装'],
  ['04', '订单预期', '预计数量、认证需求和期望交期'],
]

const products = [
  ['自行车头盔', '适合骑行品牌、跨境渠道和运动零售客户。', '城市骑行、公路入门、日常运动', 'LOGO、颜色、内衬、织带、包装', '可配合 CE / CPSC 等测试需求', '支持现有模具快速打样', ['/hongtu-selected/road-70ld-blue-01.jpg', '/hongtu-selected/road-70ld-white-01.jpg', '/hongtu-selected/road-72ld-dark-side.jpg', '/hongtu-selected/bike-black-front.jpg', '/hongtu-selected/bike-white-side.jpg']],
  ['城市通勤头盔', '适合城市骑行、日常通勤、轻运动品牌与跨境渠道客户。', '城市通勤、共享出行、日常骑行', 'LOGO、颜色、内衬、织带、包装', '可根据目标市场配合测试', '支持现有模具快速打样', ['/hongtu-selected/city-black-visor.jpg', '/hongtu-selected/city-white-visor.jpg', '/hongtu-selected/city-white-shell.jpg', '/hongtu-selected/bike-white-side.jpg', '/hongtu-selected/road-70ld-white-side.jpg']],
  ['公路骑行头盔', '适合骑行装备品牌、俱乐部渠道和训练入门产品线。', '公路骑行、周末训练、运动渠道', '外壳配色、LOGO、内衬、织带', '可配合 CE / CPSC 等测试需求', '可按项目评估开发方式', ['/hongtu-selected/road-72ld-dark-side.jpg', '/hongtu-selected/road-72ld-white-side.jpg', '/hongtu-selected/road-72ld-black-side.jpg', '/hongtu-selected/road-70ld-black-gold.jpg', '/hongtu-selected/road-70ld-blue-01.jpg']],
  ['儿童头盔', '适合儿童运动、防护用品、平衡车和礼品渠道客户。', '儿童骑行、平衡车、滑行运动', '图案、尺码、内衬、包装', '按目标市场配合儿童产品测试', '现有款可快速评估打样', ['/hongtu-selected/kid-animal-blue.jpg', '/hongtu-selected/kid-unicorn-orange.jpg', '/hongtu-selected/kid-unicorn-green.jpg', '/hongtu-selected/skate-black-pink.jpg', '/hongtu-selected/skate-black-gold.jpg']],
  ['滑雪头盔', '适合雪具品牌、户外渠道和季节性运动产品采购。', '滑雪、户外运动、防护用品', 'LOGO、内衬、风镜、包装', '可配合 ASTM / CE 等测试需求', '根据结构配置评估打样', ['/hongtu-selected/snow-black-side.jpg', '/hongtu-selected/snow-white-side.jpg', '/hongtu-selected/snow-pink-side.jpg', '/hongtu-selected/city-white-shell.jpg', '/hongtu-selected/city-black-visor.jpg']],
  ['轮滑 / 滑板头盔', '适合青少年运动、线下零售、跨境平台和渠道客户。', '轮滑、滑板、平衡车、轻运动', '颜色、LOGO、织带、包装', '可根据销售区域配合测试', '支持批量与多尺码方案', ['/hongtu-selected/skate-black-pink.jpg', '/hongtu-selected/skate-black-gold.jpg', '/hongtu-selected/kid-animal-blue.jpg', '/hongtu-selected/kid-unicorn-green.jpg', '/hongtu-selected/city-white-shell.jpg']],
]

const galleryItems = products.flatMap(([category, desc, scene, custom, cert, dev, gallery], categoryIndex) =>
  gallery.map((src, imageIndex) => ({
    id: `HT-${String(categoryIndex + 1).padStart(2, '0')}-${String(imageIndex + 1).padStart(2, '0')}`,
    category,
    desc,
    scene,
    custom,
    cert,
    dev,
    src,
  })),
)

const galleryCategories = ['全部', ...products.map(([category]) => category)]

const gallerySummaryMap = {
  自行车头盔: '适合骑行品牌、跨境渠道和入门产品线。',
  城市通勤头盔: '适合城市骑行、日常通勤与轻运动场景。',
  公路骑行头盔: '适合公路入门、俱乐部渠道和训练产品线。',
  儿童头盔: '适合儿童骑行、滑板和日常安全防护。',
  滑雪头盔: '适合滑雪、户外运动与冬季装备渠道。',
  '轮滑 / 滑板头盔': '适合滑板、轮滑、校园和运动渠道。',
}

const galleryTagMap = {
  自行车头盔: ['骑行品牌', 'LOGO 定制', 'CE / CPSC', 'ODM / OEM'],
  城市通勤头盔: ['城市骑行', '包装定制', 'LOGO 定制', '快速打样'],
  公路骑行头盔: ['公路入门', '运动渠道', 'CE / CPSC', '配色定制'],
  儿童头盔: ['儿童骑行', '图案定制', '包装定制', '测试配合'],
  滑雪头盔: ['滑雪户外', '风镜配置', 'ASTM / CE', '冬季渠道'],
  '轮滑 / 滑板头盔': ['滑板轮滑', '多尺码', 'LOGO 定制', '渠道客户'],
}

function gallerySummary(item) {
  return gallerySummaryMap[item.category] || item.desc
}

function galleryTags(item) {
  return (galleryTagMap[item.category] || ['ODM / OEM', 'LOGO 定制', '包装定制', '测试配合']).slice(0, 4)
}

const homeProductTagMap = {
  自行车头盔: ['ODM / OEM', 'LOGO 定制', 'CE / CPSC'],
  城市通勤头盔: ['城市骑行', '包装定制', '快速打样'],
  公路骑行头盔: ['公路入门', '配色定制', 'CE / CPSC'],
  儿童头盔: ['儿童防护', '图案定制', '包装定制'],
  滑雪头盔: ['滑雪装备', '风镜配置', '测试配合'],
  '轮滑 / 滑板头盔': ['滑板轮滑', '多尺码', 'ODM / OEM'],
}

function homeProductTags(name) {
  return homeProductTagMap[name] || ['ODM / OEM', 'LOGO 定制', '包装定制']
}

const heroShowcaseItems = [
  {
    index: '01',
    tag: 'ROAD SERIES',
    label: '公路骑行头盔',
    src: '/hongtu-selected/road-72ld-dark-side.jpg',
    href: '/gallery',
    kind: 'product',
    tier: 'anchor',
    mobileOrder: 0,
    x: 4,
    y: 10,
    z: 228,
    rx: 3,
    ry: -6,
    rz: 0,
    scale: 1.3,
  },
  {
    index: '02',
    tag: 'URBAN SERIES',
    label: '城市通勤头盔',
    src: '/hongtu-selected/city-white-visor.jpg',
    href: '/gallery',
    kind: 'product',
    tier: 'satellite',
    mobileOrder: 1,
    x: -172,
    y: -108,
    z: 86,
    rx: 7,
    ry: 14,
    rz: -7,
    scale: 0.86,
  },
  {
    index: '03',
    tag: 'SNOW SERIES',
    label: '滑雪头盔',
    src: '/hongtu-selected/snow-white-side.jpg',
    href: '/gallery',
    kind: 'product',
    tier: 'satellite',
    mobileOrder: 2,
    x: 188,
    y: -104,
    z: 72,
    rx: -4,
    ry: -15,
    rz: 6,
    scale: 0.84,
  },
  {
    index: '04',
    tag: 'KIDS SERIES',
    label: '儿童防护头盔',
    src: '/hongtu-selected/kid-unicorn-green.jpg',
    href: '/gallery',
    kind: 'product',
    tier: 'satellite',
    mobileOrder: 3,
    x: -196,
    y: 96,
    z: 34,
    rx: 8,
    ry: 18,
    rz: 7,
    scale: 0.82,
  },
  {
    index: '05',
    tag: 'SKATE SERIES',
    label: '轮滑滑板头盔',
    src: '/hongtu-selected/skate-black-gold.jpg',
    href: '/gallery',
    kind: 'product',
    tier: 'satellite',
    mobileOrder: 4,
    x: 206,
    y: 88,
    z: 108,
    rx: 4,
    ry: -13,
    rz: -5,
    scale: 0.8,
  },
]

const heroMarqueeItems = [
  'BICYCLE HELMET',
  'URBAN HELMET',
  'SNOW HELMET',
  'KIDS HELMET',
  'ODM / OEM',
  'GALLERY',
]

const productionSteps = [
  ['01', '需求确认', '确认产品类型、目标市场、参考款式、定制方向和预计数量。'],
  ['02', '打样确认', '确认颜色、LOGO、结构配置、内衬、织带和包装细节。'],
  ['03', '测试与生产', '按目标市场配合测试需求，样品确认后进入生产排期。'],
  ['04', '质检与出货', '完成外观、装配、包装和出货抽检，支持出口包装交付。'],
]

const productionPrep = [
  '产品类型与参考图片',
  '目标销售市场',
  '预计采购数量',
  'LOGO / 颜色 / 包装需求',
  '认证或测试要求',
  '期望交期与联系方式',
]

const certMatrix = [
  ['欧洲市场', 'CE / EN1078', '可配合认证测试'],
  ['美国市场', 'CPSC / ASTM', '可配合认证测试'],
  ['儿童产品', '按目标市场要求', '按项目评估测试'],
  ['滑雪产品', 'ASTM / CE 等', '按产品类型配合'],
  ['其他市场', '第三方检测机构', '按销售区域配合'],
]

const certDocs = [
  ['SGS EN1078', '自行车头盔', 'SGS', '欧洲市场', '证书资料展示，最终以原件确认为准', '/hongtu-assets/hongtu-080.png'],
  ['SGS CPSC', '骑行头盔', 'SGS', '美国市场', '证书资料展示，最终以原件确认为准', '/hongtu-assets/hongtu-081.png'],
  ['Intertek Report', '运动头盔', 'Intertek', '出口市场', '测试报告展示，具体适用范围需项目确认', '/hongtu-assets/hongtu-085.png'],
  ['SOR Report', '运动防护产品', '第三方机构', '客户指定市场', '资料展示，具体标准以客户市场要求为准', '/hongtu-assets/hongtu-086.png'],
]

const customServices = [
  ['LOGO 定制', '支持头盔表面标识、贴标、丝印等品牌呈现方式。', BadgeCheck],
  ['颜色定制', '支持壳体、织带、内衬、调节器等配色方案。', Sparkles],
  ['结构配置', '支持帽檐、风镜、内衬、调节系统等配置选择。', Settings2],
  ['包装定制', '支持彩盒、说明书、吊牌、外箱标签等包装方案。', Boxes],
  ['样品确认', '支持定制样品打样与批量生产前确认。', SearchCheck],
  ['批量交付', '支持订单排期、质量抽检和出口包装交付。', PackageCheck],
]

const faqs = [
  ['是否支持来样开发？', '可以根据客户样品、设计图或目标产品方向进行评估，确认结构、成本、模具和生产可行性。'],
  ['是否支持小批量定制？', '可以根据产品类型和定制复杂度评估起订量，现有模具产品通常更适合快速打样和小批量试单。'],
  ['打样周期一般多久？', '常规打板周期约 7 天。若涉及新结构、复杂外观、特殊包装或模具开发，周期会根据项目难度进一步确认。'],
  ['是否可以做自己的品牌包装？', '可以支持彩盒、说明书、吊牌、外箱标签等包装定制。'],
  ['是否可以配合目标市场认证？', '可以根据客户销售市场配合 CE、CPSC、ASTM 等相关测试需求，具体以产品类型和目标市场为准。'],
  ['模具是否可以定制开发？', '支持模具定制开发。我们可以根据客户的产品定位、外观设计、结构要求和目标市场进行评估，确认开模方案、开发周期、成本和量产可行性。'],
  ['适合哪些客户合作？', '适合运动品牌、骑行品牌、跨境卖家、渠道商、线下零售客户及希望开发自有头盔产品的品牌方。'],
]

const inquiryChecklist = [
  '产品类型',
  '目标市场',
  '预计数量',
  '是否需要 LOGO 定制',
  '是否需要包装定制',
  '是否需要认证',
  '参考图片或产品编号',
  '期望交期',
  '联系方式',
]

const inquiryMailBody = [
  'Product type:',
  'Target market:',
  'Estimated quantity:',
  'Customization needs:',
  'Certification requirements:',
  'Reference model or image:',
  'Expected delivery time:',
  'Contact name:',
  'Phone / WhatsApp / WeChat:',
].join('\n')

const mailtoInquiry = `mailto:${copy.email}?subject=${encodeURIComponent('Helmet ODM/OEM Inquiry')}&body=${encodeURIComponent(inquiryMailBody)}`

function setMetaDescription(content) {
  if (typeof document === 'undefined') return
  let meta = document.querySelector('meta[name="description"]')
  if (!meta) {
    meta = document.createElement('meta')
    meta.name = 'description'
    document.head.appendChild(meta)
  }
  meta.setAttribute('content', content)
}

function productInquiryHref(item) {
  const body = [
    `Product ID: ${item.id}`,
    `Product category: ${item.category}`,
    'Target market:',
    'Estimated quantity:',
    'Customization needs:',
    'Certification requirements:',
    'Expected delivery time:',
    'Contact name:',
    'Phone / WhatsApp / WeChat:',
  ].join('\n')

  return `mailto:${copy.email}?subject=${encodeURIComponent(`Helmet ODM/OEM Inquiry - ${item.id}`)}&body=${encodeURIComponent(body)}`
}

function procurementFields({ name, scene, custom, cert, dev }) {
  const marketMap = {
    自行车头盔: '欧洲 / 美国 / 日本 / 其他市场',
    城市通勤头盔: '城市通勤、跨境平台、线下渠道',
    公路骑行头盔: '骑行品牌、运动渠道、俱乐部客户',
    儿童头盔: '儿童用品、平衡车、礼品及防护渠道',
    滑雪头盔: '雪具品牌、户外渠道、季节性采购',
    '轮滑 / 滑板头盔': '青少年运动、线下零售、跨境渠道',
  }

  return [
    ['适用客户', name.includes('儿童') ? '儿童运动品牌、渠道商、礼品客户' : '品牌方、采购商、跨境卖家、渠道客户'],
    ['适用市场', marketMap[name] || '按目标市场确认'],
    ['外壳工艺', '按具体款式确认'],
    ['尺寸范围', '按具体款式确认'],
    ['重量范围', '按产品和配置确认'],
    ['可定制内容', custom],
    ['认证方向', cert],
    ['起订量', '按款式、定制复杂度和包装需求确认'],
    ['打样周期', dev.includes('快速') ? '常规打样约 7 天，复杂项目另行确认' : '按产品和定制复杂度确认'],
    ['包装方式', '彩盒、说明书、吊牌、外箱标签可评估定制'],
    ['适用场景', scene],
  ]
}

function scrollToSection(event, id) {
  event.preventDefault()
  const target = document.getElementById(id)
  if (!target) return
  target.scrollIntoView({ behavior: 'smooth', block: 'start' })
  window.history.pushState(null, '', `#${id}`)
}

function goToHomeContact(event) {
  event.preventDefault()
  window.location.href = '/#contact'
}

function handleSectionLink(event, id) {
  if (window.location.pathname !== '/') {
    event.preventDefault()
    window.location.href = `/#${id}`
    return
  }
  scrollToSection(event, id)
}

function Reveal({ children, className = '', delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10%' }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

function SectionHead({ eyebrow, title, text }) {
  return (
    <Reveal className="section-head">
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      {text && <p className="lead">{text}</p>}
    </Reveal>
  )
}

function Nav() {
  const [open, setOpen] = useState(false)
  const handleJump = (event, item) => {
    setOpen(false)
    if (item.type === 'page') return
    handleSectionLink(event, item.id)
  }

  return (
    <header className="site-nav">
      <nav>
        <a href="/#top" className="brand" onClick={(event) => handleJump(event, navItems[0])}>
          <img src={img.logo} alt="Hongtu Sport logo" />
          <span>HONGTU</span>
        </a>
        <div className="nav-links">
          {navItems.map((item) => (
            <a key={item.id} href={item.href} onClick={(event) => handleJump(event, item)}>{item.label}</a>
          ))}
        </div>
        <LanguageSelector />
        <a className="nav-cta" href="/#contact" onClick={(event) => handleJump(event, navItems[6])}>获取报价</a>
        <button className="nav-toggle" onClick={() => setOpen(!open)} aria-label="打开导航菜单">
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>
      {open && (
        <motion.div
          className="nav-mobile"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          {navItems.map((item) => (
            <a key={item.id} href={item.href} onClick={(event) => handleJump(event, item)}>{item.label}</a>
          ))}
          <div className="nav-mobile-languages">
            <LanguageSelector />
          </div>
          <a className="nav-mobile-cta" href="/#contact" onClick={(event) => handleJump(event, navItems[6])}>提交合作需求</a>
        </motion.div>
      )}
    </header>
  )
}

function useCompactHero(breakpoint = 760) {
  const [compact, setCompact] = useState(false)

  useEffect(() => {
    const media = window.matchMedia(`(max-width: ${breakpoint}px)`)
    const update = () => setCompact(media.matches)
    update()
    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [breakpoint])

  return compact
}

function LanguageSelector() {
  const handleLanguageChange = (event) => {
    const lang = event.target.value
    window.location.href = translateUrl(lang)
  }

  return (
    <div className="language-selector">
      <Globe2 size={15} />
      <select defaultValue="zh" onChange={handleLanguageChange} aria-label="选择语言">
        {languageOptions.map(([code, label]) => (
          <option key={code} value={code}>{label}</option>
        ))}
      </select>
      <ChevronDown size={14} />
    </div>
  )
}

function Hero() {
  const viewMode = 'spiral'
  const [activeCard, setActiveCard] = useState(null)
  const prefersReducedMotion = useReducedMotion()
  const compactHero = useCompactHero()
  const stageRef = useRef(null)
  const time = useTime()
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const smoothX = useSpring(mouseX, { stiffness: 32, damping: 22 })
  const smoothY = useSpring(mouseY, { stiffness: 32, damping: 22 })
  const mouseRotateY = useTransform(smoothX, [-1, 1], [-11, 11])
  const mouseRotateX = useTransform(smoothY, [-1, 1], [8, -8])
  const idleRotateY = useTransform(time, (t) => Math.sin(t / 2200) * (prefersReducedMotion ? 2.5 : 6))
  const idleRotateX = useTransform(time, (t) => Math.cos(t / 2800) * (prefersReducedMotion ? 1.8 : 4.5))
  const fieldRotateY = useTransform([mouseRotateY, idleRotateY], ([mouse, idle]) => mouse + idle)
  const fieldRotateX = useTransform([mouseRotateX, idleRotateX], ([mouse, idle]) => mouse + idle)
  const heroSpiralActive = viewMode === 'spiral' && !compactHero
  const floatHeight = prefersReducedMotion ? 6 : 12
  const showcaseItems = compactHero
    ? [...heroShowcaseItems].sort((a, b) => a.mobileOrder - b.mobileOrder)
    : heroShowcaseItems

  const handleMouseMove = (event) => {
    if (!heroSpiralActive || !stageRef.current) return
    const rect = stageRef.current.getBoundingClientRect()
    mouseX.set(((event.clientX - rect.left) / rect.width - 0.5) * 2)
    mouseY.set(((event.clientY - rect.top) / rect.height - 0.5) * 2)
  }

  const resetMouse = () => {
    mouseX.set(0)
    mouseY.set(0)
    setActiveCard(null)
  }

  const handleCardClick = (event, href) => {
    if (!href.startsWith('#')) return
    event.preventDefault()
    scrollToSection(event, href.slice(1))
  }

  const orbitSlots = [
    { x: 0, y: -2, z: 360, rx: 0, ry: 0, rz: -0.8, scale: 1.22, opacity: 1, frontness: 1 },
    { x: 206, y: -86, z: 170, rx: -2, ry: -4.5, rz: 5.2, scale: 0.9, opacity: 0.88, frontness: 0.78 },
    { x: 156, y: 112, z: 42, rx: 2.6, ry: -3.8, rz: -5.2, scale: 0.78, opacity: 0.72, frontness: 0.5 },
    { x: -156, y: 110, z: 30, rx: 2.8, ry: 3.8, rz: 5.4, scale: 0.76, opacity: 0.68, frontness: 0.46 },
    { x: -208, y: -86, z: 160, rx: -2.2, ry: 4.8, rz: -5.6, scale: 0.88, opacity: 0.84, frontness: 0.74 },
  ]
  const orbitTimes = [0, 0.2, 0.4, 0.6, 0.8, 1]
  const orbitDuration = prefersReducedMotion ? 18 : 10.5
  const getOrbitSequence = (index) => {
    const total = orbitSlots.length
    return Array.from({ length: total + 1 }, (_, step) => orbitSlots[(index + step) % total])
  }
  const getSlotFilter = (slot) => `blur(${(1 - slot.frontness) * 0.42}px) saturate(${0.84 + slot.frontness * 0.18}) brightness(${0.9 + slot.frontness * 0.12})`
  const buildSpiralAnimation = (index, focused) => {
    if (focused) {
      return {
        x: 0,
        y: -4,
        z: 440,
        rotateX: 0,
        rotateY: 0,
        rotateZ: 0,
        scale: 1.34,
        opacity: 1,
        zIndex: 900,
        filter: 'blur(0px) saturate(1.06) brightness(1.02)',
      }
    }

    const sequence = getOrbitSequence(index)
    return {
      x: sequence.map((slot) => slot.x),
      y: sequence.map((slot) => slot.y),
      z: sequence.map((slot) => slot.z),
      rotateX: sequence.map((slot) => slot.rx),
      rotateY: sequence.map((slot) => slot.ry),
      rotateZ: sequence.map((slot) => slot.rz),
      scale: sequence.map((slot) => slot.scale),
      opacity: sequence.map((slot) => slot.opacity),
      zIndex: sequence.map((slot) => Math.round(slot.z + 520)),
      filter: sequence.map((slot) => getSlotFilter(slot)),
    }
  }

  const renderShowcaseCard = (item, index) => {
    const focused = !compactHero && activeCard === index
    const spiralAnimate = buildSpiralAnimation(index, focused)
    const cardClassName = [
      'hero-portfolio-card',
      item.kind === 'photo' ? 'is-photo' : 'is-product',
      item.tier === 'anchor' ? 'is-anchor' : 'is-satellite',
      focused ? 'is-focused' : '',
    ].filter(Boolean).join(' ')
    const cardBody = (
      <>
        <span className="hero-portfolio-card-index" aria-hidden="true">{item.index}</span>
        <div className="hero-portfolio-card-media">
          <img src={item.src} alt={`${item.label}预览`} loading={index > 1 ? 'lazy' : undefined} />
        </div>
        <span className="hero-portfolio-card-meta">
          <small>{item.tag}</small>
          <strong>{item.label}</strong>
        </span>
      </>
    )
    if (compactHero) {
      return (
        <motion.a
          key={`${item.index}-${item.src}`}
          className={cardClassName}
          href={item.href}
          aria-label={`前往${item.label}`}
          onClick={(event) => handleCardClick(event, item.href)}
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 6.8 + index * 0.3, repeat: Infinity, ease: 'easeInOut', delay: index * 0.18 }}
          style={{ zIndex: Math.round(item.z + 200) }}
        >
          <div className="hero-portfolio-card-inner">{cardBody}</div>
        </motion.a>
      )
    }

    return (
      <motion.a
        key={`${item.index}-${item.src}`}
        className={cardClassName}
        href={item.href}
        aria-label={`前往${item.label}`}
        onClick={(event) => handleCardClick(event, item.href)}
        onMouseEnter={() => setActiveCard(index)}
        onFocus={() => setActiveCard(index)}
        onMouseLeave={() => setActiveCard(null)}
        onBlur={() => setActiveCard(null)}
        initial={false}
        animate={viewMode === 'spiral' ? spiralAnimate : { x: 0, y: 0, z: 0, rotateX: 0, rotateY: 0, rotateZ: 0, scale: 1, opacity: 1, filter: 'blur(0px) saturate(1)' }}
        transition={focused
          ? { type: 'spring', stiffness: 150, damping: 18, mass: 0.82 }
          : { duration: orbitDuration, repeat: Infinity, ease: 'easeInOut', times: orbitTimes }}
        style={{ zIndex: focused ? 900 : undefined, transformStyle: 'preserve-3d' }}
      >
        <motion.div
          className="hero-portfolio-card-inner"
          animate={viewMode === 'spiral' ? {
            y: [0, item.tier === 'anchor' ? -floatHeight : -floatHeight * 0.72, 0],
            rotateZ: [0, index % 2 === 0 ? 2.4 : -2.6, 0],
          } : { y: 0, rotateZ: 0 }}
          transition={{
            duration: 6.8 + (index % 3) * 0.7,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: index * 0.14,
          }}
        >
          {cardBody}
        </motion.div>
      </motion.a>
    )
  }

  return (
    <section id="top" className="hero hero-industrial section-offset">
      <div className="hero-bg-image" aria-hidden="true" />
      <div className="hero-bg-overlay" aria-hidden="true" />
      <div className="hero-bg-light" aria-hidden="true" />
      <div className="hero-bg-grid" aria-hidden="true" />
      <div className="hero-shell hero-content">
        <div className="hero-copy hero-copy-animated">
          <p className="eyebrow hero-eyebrow">{copy.companyEn}</p>
          <div className="hero-kicker">
            <span>Helmet Manufacturing</span>
            <strong>ODM / OEM</strong>
          </div>
          <h1>
            <span>运动头盔</span>
            <span>ODM/OEM 定制与量产工厂</span>
          </h1>
          <p className="hero-sub">面向品牌方、跨境卖家与渠道客户的运动头盔制造工厂。选型、打样、认证与量产，一站对接。</p>
          <div className="actions">
            <a className="btn light" href="#contact" onClick={(event) => scrollToSection(event, 'contact')}>发送需求，获取报价<ArrowRight size={16} /></a>
            <a className="btn ghost" href="/gallery">查看现有款式</a>
          </div>
        </div>
        <div
          ref={stageRef}
          className={`hero-portfolio-stage ${viewMode === 'list' ? 'is-list' : 'is-spiral'}${compactHero ? ' is-compact' : ''}`}
          aria-label="运动头盔首屏档案"
          onMouseMove={handleMouseMove}
          onMouseLeave={resetMouse}
        >
          <div className="hero-portfolio-backdrop" style={{ backgroundImage: 'url("/hongtu-selected/road-72ld-dark-side.jpg")' }} aria-hidden="true" />
          <div className="hero-portfolio-orbit" aria-hidden="true" />
          <div className="hero-portfolio-haze" aria-hidden="true" />
          {viewMode === 'spiral' ? (
            <motion.div
              className="hero-portfolio-field"
              style={heroSpiralActive ? { rotateX: fieldRotateX, rotateY: fieldRotateY } : undefined}
            >
              <motion.div
                className="hero-portfolio-spiral-orbit"
                style={{ transformStyle: 'preserve-3d' }}
                animate={heroSpiralActive ? { y: [-8, 8, -8], rotateZ: [-1.2, 1.1, -1.2] } : { y: 0, rotateZ: 0 }}
                transition={heroSpiralActive ? { duration: 13, repeat: Infinity, ease: 'easeInOut' } : undefined}
              >
                {showcaseItems.map((item, index) => renderShowcaseCard(item, index))}
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              className="hero-portfolio-list-grid"
              aria-label="站内板块预览"
              initial="hidden"
              animate="visible"
              variants={{ visible: { transition: { staggerChildren: 0.07 } } }}
            >
              {heroShowcaseItems.map((item) => (
                <motion.a
                  key={`list-${item.index}`}
                  className={`hero-portfolio-card ${item.kind === 'photo' ? 'is-photo' : 'is-product'}${item.tier === 'anchor' ? ' is-anchor' : ' is-satellite'}`}
                  href={item.href}
                  aria-label={`前往${item.label}`}
                  variants={{ hidden: { opacity: 0, y: 18, scale: 0.96 }, visible: { opacity: 1, y: 0, scale: 1 } }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={prefersReducedMotion ? undefined : { y: -4, scale: 1.02 }}
                  onClick={(event) => handleCardClick(event, item.href)}
                >
                  <span className="hero-portfolio-card-index" aria-hidden="true">{item.index}</span>
                  <div className="hero-portfolio-card-media">
                    <img src={item.src} alt={`${item.label}预览`} loading="lazy" />
                  </div>
                  <span className="hero-portfolio-card-meta">
                    <small>{item.tag}</small>
                    <strong>{item.label}</strong>
                  </span>
                </motion.a>
              ))}
            </motion.div>
          )}
          <div className="hero-portfolio-marquee" aria-hidden="true">
            <div className="hero-portfolio-marquee-track">
              {[...heroMarqueeItems, ...heroMarqueeItems].map((item, index) => (
                <span key={`${item}-${index}`}>{item}</span>
              ))}
            </div>
          </div>
          <p className="hero-portfolio-caption">
            <span>产品选型档案 · 点击查看更多款式</span>
          </p>
        </div>
        <div className="hero-industrial-stats" aria-label="核心信任数据">
          {['2015 年成立', '约 10000㎡ 工厂', 'BSCI 工厂认证', 'CE / CPSC / ASTM 支持', 'ODM / OEM 定制量产'].map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      </div>
      <div className="hero-scroll-bridge" aria-hidden="true" />
    </section>
  )
}

function TrustStats() {
  return (
    <section className="trust-strip section-offset" aria-label="信任数据">
      {stats.map(([num, label], index) => (
        <Reveal key={label} delay={index * 0.04} className="stat-card">
          <strong>{num}</strong>
          <span>{label}</span>
        </Reveal>
      ))}
    </section>
  )
}

function CompanyIntro() {
  return (
    <section className="intro-panel section-offset" aria-label="公司简介">
      <Reveal className="intro-card">
        <p className="eyebrow">Company Profile</p>
        <h2>真实工厂背景，支撑长期 ODM / OEM 合作</h2>
        <div className="intro-text">
          {companyIntro.map((text) => <p key={text}>{text}</p>)}
        </div>
      </Reveal>
    </section>
  )
}

function FactoryEvidence() {
  return (
    <section className="project-start-section section-offset" aria-label="项目启动资料">
      <div className="project-start-inner">
        <Reveal className="project-start-copy">
          <p className="eyebrow">Project Start</p>
          <h2>项目启动前，先确认四类关键信息</h2>
          <p>把目标款式、销售市场、定制需求和订单预期说清楚，可以更快完成选型、报价、打样和认证判断。</p>
        </Reveal>
        <div className="project-start-grid">
          {projectStartItems.map(([num, title, text], index) => (
            <Reveal key={title} delay={index * 0.035} className="project-start-card">
              <span>{num}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function About() {
  return (
    <section id="about" className="section section-offset">
      <div className="about-layout about-industrial-layout">
        <div>
          <SectionHead
            eyebrow="Company Capability"
            title="从产品开发到批量交付的完整制造能力"
            text="宏途服务品牌客户、跨境卖家与渠道客户，围绕运动头盔产品提供研发打样、生产制造、品质检验和出口交付支持。"
          />
          <div className="capability-grid capability-lines">
            {capabilities.map(([title, text, Icon], index) => (
              <Reveal key={title} delay={index * 0.04} className="capability-card">
                <span className="capability-index">{String(index + 1).padStart(2, '0')}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function Products() {
  return (
    <section id="products" className="section section-offset dark-band">
      <SectionHead
        eyebrow="Product Lines"
        title="多品类运动头盔产品线"
        text="覆盖自行车头盔、城市通勤头盔、公路骑行头盔、儿童头盔、滑雪头盔等产品方向，支持 LOGO、颜色、内衬、包装和认证测试配合。"
      />
      <div className="product-line-panel">
        <div className="product-line-grid">
          {products.map(([name, desc, scene, custom, cert, dev, gallery], index) => (
            <ProductLineCard
              key={name}
              delay={index * 0.035}
              product={{ name, desc, scene, custom, cert, dev, gallery }}
            />
          ))}
        </div>
        <Reveal className="product-gallery-entry">
          <div>
            <p>需要查看更多款式？</p>
            <span>进入完整产品图库，按类别查看更多现有款式，适合选型、打样和询盘前沟通。</span>
          </div>
          <a className="btn light" href="/gallery">查看完整产品图库<ArrowRight size={16} /></a>
        </Reveal>
      </div>
    </section>
  )
}

function ProductLineCard({ product, delay }) {
  const { name, desc, gallery } = product

  return (
    <Reveal delay={delay} className="product-line-card">
      <a href="/gallery" aria-label={`查看${name}更多产品`}>
        <img src={gallery[0]} alt={`${name}代表产品`} loading="lazy" />
      </a>
      <div>
        <span>ODM / OEM PROCUREMENT FILE</span>
        <h3>{name}</h3>
        <p>{desc}</p>
        <div className="product-line-tags" aria-label={`${name}快速标签`}>
          {homeProductTags(name).map((tag) => <em key={tag}>{tag}</em>)}
        </div>
        <a className="product-line-link" href="/gallery">查看该类更多款式<ArrowRight size={15} /></a>
      </div>
    </Reveal>
  )
}

function ProductCard({ product, delay }) {
  const [active, setActive] = useState(0)
  const { name, desc, scene, custom, cert, dev, gallery } = product

  const changeImage = (event, direction) => {
    event.preventDefault()
    event.stopPropagation()
    setActive((current) => (current + direction + gallery.length) % gallery.length)
  }

  return (
    <Reveal delay={delay} className="product-card">
      <div className="product-gallery">
        <div className="product-image product-image-main">
          <img src={gallery[active]} alt={`${name}产品图 ${active + 1}`} loading="lazy" />
        </div>
        <button className="gallery-btn gallery-prev" type="button" onClick={(event) => changeImage(event, -1)} aria-label={`查看上一张${name}图片`}>
          ‹
        </button>
        <button className="gallery-btn gallery-next" type="button" onClick={(event) => changeImage(event, 1)} aria-label={`查看下一张${name}图片`}>
          ›
        </button>
        <div className="gallery-dots" aria-label={`${name}图片进度`}>
          {gallery.map((src, index) => (
            <button
              key={src}
              type="button"
              className={index === active ? 'active' : ''}
              onClick={(event) => {
                event.preventDefault()
                event.stopPropagation()
                setActive(index)
              }}
              aria-label={`切换到第 ${index + 1} 张${name}图片`}
            />
          ))}
        </div>
      </div>
      <div className="product-copy">
        <h3>{name}</h3>
        <p>{desc}</p>
        <dl>
          <div><dt>适用场景</dt><dd>{scene}</dd></div>
          <div><dt>可定制内容</dt><dd>{custom}</dd></div>
          <div><dt>认证支持</dt><dd>{cert}</dd></div>
          <div><dt>开发方式</dt><dd>{dev}</dd></div>
        </dl>
      </div>
    </Reveal>
  )
}

function ApplicationScenarios() {
  const scenarios = [
    ['Road Cycling', '公路骑行与入门训练', img.lifestyleRiding],
    ['Urban Active', '城市通勤与轻运动', img.lifestyleFemale],
    ['Brand Visual', '品牌拍摄与渠道展示', img.lifestyleDuo],
  ]

  return (
    <section id="scenarios" className="section scenario-section section-offset">
      <div className="scenario-layout">
        <Reveal className="scenario-copy">
          <p className="eyebrow">Application Scenarios</p>
          <h2>从样品开发到真实骑行场景</h2>
          <p className="lead">运动头盔不仅要看结构、认证和产能，也要看佩戴状态、视觉比例和目标用户场景。宏途可配合品牌客户完成不同骑行场景下的产品选型、配色、LOGO 与包装方案。</p>
          <div className="scenario-points">
            <span><CheckCircle2 size={16} />公路骑行、城市通勤、轻运动场景</span>
            <span><CheckCircle2 size={16} />男女款式、颜色和视觉风格匹配</span>
            <span><CheckCircle2 size={16} />支持渠道客户进行产品选型和样品确认</span>
          </div>
          <a className="btn ghost" href="/gallery">进入产品图库</a>
        </Reveal>
        <div className="scenario-media">
          {scenarios.map(([title, text, src], index) => (
            <Reveal key={title} delay={index * 0.04} className={index === 0 ? 'scenario-card scenario-card-large' : 'scenario-card'}>
              <img src={src} alt={`${text}场景图`} loading="lazy" />
              <div>
                <span>{title}</span>
                <strong>{text}</strong>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function FactorySection() {
  return (
    <section id="factory" className="section section-offset">
      <SectionHead
        eyebrow="Manufacturing Process"
        title="从样品确认到批量交付"
        text="把 ODM/OEM 项目拆成清楚的合作节点，让客户知道什么时候确认方案、什么时候打样、什么时候进入生产。"
      />
      <div className="process-layout">
        <div className="process-roadmap">
          {productionSteps.map(([num, title, text], index) => (
            <Reveal key={title} delay={index * 0.035} className="process-step-card">
              <span>{num}</span>
              <div>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.08} className="process-client-panel">
          <p className="eyebrow">Before Quote</p>
          <h3>客户先准备这些信息，报价和方案会更快。</h3>
          <ul>
            {productionPrep.map((item) => (
              <li key={item}><CheckCircle2 size={16} />{item}</li>
            ))}
          </ul>
          <a className="btn primary" href="#contact">发送需求，获取报价</a>
        </Reveal>
      </div>
    </section>
  )
}

function Certs() {
  const [preview, setPreview] = useState(null)

  return (
    <section id="certs" className="section section-offset cert-section">
      <SectionHead
        eyebrow="Certification Support"
        title="面向不同市场的认证与测试支持"
        text="认证信息需要按产品型号、销售区域和测试机构最终确认。页面仅展示现有资料和可配合方向，不虚构证书编号。"
      />
      <div className="cert-matrix">
        {certMatrix.map(([market, standard, status], index) => (
          <Reveal key={market} delay={index * 0.035} className="matrix-card">
            <Globe2 size={18} />
            <h3>{market}</h3>
            <strong>{standard}</strong>
            <span>{status}</span>
          </Reveal>
        ))}
      </div>
      <div className="cert-doc-grid">
        {certDocs.map(([name, product, lab, market, status, src], index) => (
          <Reveal key={name} delay={index * 0.035} className="cert-doc-card">
            <button type="button" className="cert-thumb" onClick={() => setPreview([name, src])} aria-label={`查看${name}证书资料`}>
              <img src={src} alt={`${name}证书资料`} loading="lazy" />
            </button>
            <div>
              <FileCheck2 size={19} />
              <h3>{name}</h3>
              <p>适用产品：{product}</p>
              <p>测试机构：{lab}</p>
              <p>适用市场：{market}</p>
              <span>{status}</span>
            </div>
          </Reveal>
        ))}
      </div>
      {preview && (
        <div className="cert-modal" role="dialog" aria-modal="true" aria-label={`${preview[0]}证书预览`}>
          <button className="cert-modal-backdrop" type="button" onClick={() => setPreview(null)} aria-label="关闭证书预览" />
          <div className="cert-modal-panel">
            <button className="cert-modal-close" type="button" onClick={() => setPreview(null)} aria-label="关闭">
              <X size={20} />
            </button>
            <img src={preview[1]} alt={`${preview[0]}证书放大预览`} />
            <p>{preview[0]} · 资料预览，正式合作请以原件和项目适用范围确认为准。</p>
          </div>
        </div>
      )}
    </section>
  )
}

function Custom() {
  return (
    <section id="custom" className="section section-offset">
      <SectionHead
        eyebrow="ODM / OEM Service"
        title="支持从品牌贴牌到包装出货的一站式定制"
        text="不把定制做成电商详情页，而是围绕品牌客户真正关心的标识、配色、配置、包装、样品和批量交付展开。"
      />
      <div className="service-grid">
        {customServices.map(([title, text, Icon], index) => (
          <Reveal key={title} delay={index * 0.035} className="service-card">
            <Icon size={22} />
            <h3>{title}</h3>
            <p>{text}</p>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

function FAQ() {
  const [open, setOpen] = useState(0)

  return (
    <section id="faq" className="section section-offset faq-section">
      <SectionHead
        eyebrow="FAQ"
        title="常见问题"
        text="把客户最常问的起订量、打样、包装、认证和开发方式先讲清楚，减少前期沟通不确定性。"
      />
      <div className="faq-list">
        {faqs.map(([question, answer], index) => (
          <Reveal key={question} delay={index * 0.025} className="faq-item">
            <button type="button" onClick={() => setOpen(open === index ? -1 : index)}>
              <span>{question}</span>
              <ChevronDown className={open === index ? 'rotate' : ''} size={18} />
            </button>
            {open === index && (
              <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.25 }}
              >
                {answer}
              </motion.p>
            )}
          </Reveal>
        ))}
      </div>
    </section>
  )
}

function Contact() {
  return (
    <section id="contact" className="contact-section section-offset">
      <img src={img.equipment} alt="宏途生产设备与车间环境" loading="lazy" />
      <div className="contact-mask" />
      <div className="contact-layout">
        <Reveal className="contact-copy">
          <p className="eyebrow">Send Inquiry</p>
          <h2>获取产品选型与报价建议</h2>
          <p>请通过邮箱、微信或 WhatsApp 发送产品类型、目标市场、预计数量、定制需求和参考图片。我们会基于现有产品线、认证要求和生产能力，协助评估合适方案。</p>
          <div className="contact-info">
            <a href={`mailto:${copy.email}`}><Mail size={17} />{copy.email}</a>
            <a href={`tel:${copy.phone}`}><Phone size={17} />{copy.phone}（{copy.contactPerson}）</a>
            <span><Globe2 size={17} />{copy.address}</span>
            <span><ClipboardCheck size={17} />适合品牌方、采购商、跨境卖家、渠道商、贸易公司及自有品牌项目咨询。</span>
          </div>
          <div className="contact-actions">
            <a className="btn light" href={mailtoInquiry}>发送邮件询盘<ArrowRight size={16} /></a>
            <a className="btn ghost" href="/gallery">查看现有款式</a>
          </div>
        </Reveal>
        <Reveal delay={0.08} className="direct-contact-card">
          <div className="inquiry-checklist">
            <p className="eyebrow">Inquiry Checklist</p>
            <h3>建议客户发送以下信息</h3>
            <div className="checklist-grid">
              {inquiryChecklist.map((item) => (
                <span key={item}><CheckCircle2 size={15} />{item}</span>
              ))}
            </div>
          </div>
          <div className="qr-card">
            <img src={img.wechatQr} alt="微信二维码" loading="lazy" />
            <div>
              <strong>微信咨询</strong>
              <span>扫码添加微信，发送产品图片、产品编号、目标市场、预计数量和定制需求。</span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer>
      <div className="footer-brand">
        <strong>{copy.company}</strong>
        <p>{copy.companyEn}</p>
        <span>ODM / OEM Helmet Manufacturer</span>
      </div>
      <div className="footer-links">
        <p className="footer-label">Quick Links</p>
        {navItems.slice(1).map((item) => (
          <a
            key={item.id}
            href={item.href}
            onClick={(event) => {
              if (item.type === 'section') handleSectionLink(event, item.id)
            }}
          >
            {item.label}
          </a>
        ))}
      </div>
      <div className="footer-contact">
        <p className="footer-label">Contact</p>
        <a href={`mailto:${copy.email}`}>{copy.email}</a>
        <p>{copy.contactPerson}：{copy.phone}</p>
        <p>{copy.address}</p>
        <span className="consumer-link">消费者购买入口｜微信小店 / 小程序即将上线</span>
      </div>
      <div className="footer-bottom">
        <p>(c) 2026 Hongtu Sporting Goods. All rights reserved.</p>
      </div>
    </footer>
  )
}

function MobileContactBar() {
  const [wechatOpen, setWechatOpen] = useState(false)

  return (
    <>
      <div className="mobile-contact-bar" aria-label="移动端快速联系">
        <button type="button" onClick={() => setWechatOpen(true)}>
          <MessageCircle size={17} />
          <span>微信咨询</span>
        </button>
        <a href={mailtoInquiry}>
          <Mail size={17} />
          <span>发送邮件</span>
        </a>
        <a href={`tel:${copy.phone}`}>
          <Phone size={17} />
          <span>电话联系</span>
        </a>
        <a href="/gallery">
          <SearchCheck size={17} />
          <span>查看图库</span>
        </a>
      </div>
      {wechatOpen && (
        <div className="wechat-modal" role="dialog" aria-modal="true" aria-label="微信咨询">
          <button className="wechat-modal-backdrop" type="button" onClick={() => setWechatOpen(false)} aria-label="关闭微信咨询弹窗" />
          <div className="wechat-modal-panel">
            <button className="wechat-modal-close" type="button" onClick={() => setWechatOpen(false)} aria-label="关闭">
              <X size={20} />
            </button>
            <p className="eyebrow">Wechat Inquiry</p>
            <h2>微信咨询</h2>
            <p>扫码添加微信，请发送产品类型、目标市场、预计数量和参考图片。</p>
            <img src={img.wechatQr} alt="微信咨询二维码" />
            <button className="btn light" type="button" onClick={() => setWechatOpen(false)}>关闭</button>
          </div>
        </div>
      )}
    </>
  )
}

function GalleryPage() {
  const [category, setCategory] = useState('全部')
  const [preview, setPreview] = useState(null)
  const [copiedId, setCopiedId] = useState('')
  const visibleItems = category === '全部' ? galleryItems : galleryItems.filter((item) => item.category === category)

  useEffect(() => {
    document.title = '运动头盔产品图库｜自行车头盔、儿童头盔、滑雪头盔 ODM/OEM 款式选型'
    setMetaDescription('查看宏途运动头盔部分现有产品款式，覆盖自行车头盔、城市通勤头盔、儿童头盔、滑雪头盔、轮滑滑板头盔，支持 LOGO、颜色、包装、认证测试与 ODM/OEM 定制。')
  }, [])

  function handleCopyProductId(id) {
    if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(id).catch(() => {})
    }
    setCopiedId(id)
    window.setTimeout(() => setCopiedId(''), 1600)
  }

  return (
    <main>
      <header className="gallery-nav">
        <a href="/" className="brand">
          <img src={img.logo} alt="Hongtu Sport logo" />
          <span>HONGTU</span>
        </a>
        <div>
          <a href="/">返回首页</a>
          <LanguageSelector />
          <a className="nav-cta" href="/#contact" onClick={goToHomeContact}>获取报价</a>
        </div>
      </header>
      <section className="gallery-hero">
        <div className="gallery-hero-layout">
          <Reveal>
            <p className="eyebrow">Product Gallery</p>
            <h1>
              <span>完整产品图库</span>
              <span>按类别快速选型</span>
            </h1>
            <p>以下展示部分现有运动头盔款式，适合品牌方、采购商和跨境卖家在打样前进行方向筛选。具体颜色、LOGO、结构、包装和认证要求可进一步沟通确认。</p>
            <div className="gallery-hero-actions">
              <a className="btn light" href="/#contact" onClick={goToHomeContact}>联系工厂获取报价<ArrowRight size={16} /></a>
              <a className="btn ghost" href="/">返回官网首页</a>
            </div>
          </Reveal>
          <Reveal delay={0.08} className="gallery-hero-image">
            <img src={img.lifestyleGallery} alt="宏途骑行头盔真实骑行场景" loading="eager" />
            <div>
              <span>REAL RIDING SCENARIO</span>
              <strong>Product selection with market-ready visual reference.</strong>
            </div>
          </Reveal>
        </div>
      </section>
      <section className="gallery-section">
        <div className="gallery-section-inner">
          <div className="gallery-filter" aria-label="产品分类筛选">
            {galleryCategories.map((item) => (
              <button key={item} type="button" className={item === category ? 'active' : ''} onClick={() => setCategory(item)}>
                {item}
              </button>
            ))}
          </div>
          <div className="gallery-count">
            <span>{visibleItems.length} 款图片 · 点击图片可放大查看</span>
            <a href="/#contact" onClick={goToHomeContact}>发送目标款式编号，获取报价</a>
          </div>
          <div className="gallery-grid">
            {visibleItems.map((item, index) => (
              <Reveal key={`${item.id}-${item.src}`} delay={index * 0.01} className="gallery-item">
                <button className="gallery-image-button" type="button" onClick={() => setPreview(item)} aria-label={`查看${item.id}大图`}>
                  <img src={item.src} alt={`${item.category} ${item.id}`} loading="lazy" />
                </button>
                <div className="gallery-card-body">
                  <div className="gallery-card-head">
                    <div>
                      <span>{item.id}</span>
                      <h3>{item.category}</h3>
                    </div>
                  </div>
                  <p className="gallery-card-summary">{gallerySummary(item)}</p>
                  <div className="gallery-tags" aria-label={`${item.id}产品标签`}>
                    {galleryTags(item).map((tag) => <span key={tag}>{tag}</span>)}
                  </div>
                  <div className="gallery-card-actions">
                    <button className="gallery-copy-btn" type="button" onClick={() => handleCopyProductId(item.id)}>
                      {copiedId === item.id ? '产品编号已复制' : '复制产品编号'}
                    </button>
                    <a className="gallery-mail-btn" href={productInquiryHref(item)}>发送此款询盘</a>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal className="gallery-inquiry-panel">
            <div>
              <p className="eyebrow">Inquiry Guidance</p>
              <h2>没有找到完全匹配的款式？</h2>
              <span>可以发送参考图片、目标市场、预计数量、LOGO / 包装需求。宏途可基于现有模具快速选型，也可评估来样开发和模具定制方案。</span>
            </div>
            <a className="btn light" href="/#contact" onClick={goToHomeContact}>查看联系方式<ArrowRight size={16} /></a>
          </Reveal>
        </div>
      </section>
      {preview && (
        <div className="cert-modal" role="dialog" aria-modal="true" aria-label={`${preview.id}产品预览`}>
          <button className="cert-modal-backdrop" type="button" onClick={() => setPreview(null)} aria-label="关闭产品预览" />
          <div className="gallery-modal-panel">
            <button className="cert-modal-close" type="button" onClick={() => setPreview(null)} aria-label="关闭">
              <X size={20} />
            </button>
            <img src={preview.src} alt={`${preview.category} ${preview.id}大图`} />
            <div>
              <span>{preview.id}</span>
              <h3>{preview.category}</h3>
              <p>{preview.desc}</p>
              <dl>
                <div><dt>产品编号</dt><dd>{preview.id}</dd></div>
                <div><dt>产品类别</dt><dd>{preview.category}</dd></div>
                <div><dt>适用场景</dt><dd>{preview.scene}</dd></div>
                <div><dt>可定制内容</dt><dd>{preview.custom}</dd></div>
                <div><dt>认证支持</dt><dd>{preview.cert}</dd></div>
                <div><dt>目标市场</dt><dd>按客户销售区域与目标标准确认</dd></div>
                <div><dt>开发方式</dt><dd>{preview.dev}</dd></div>
                <div><dt>包装方式</dt><dd>支持彩盒、说明书、吊牌、外箱标签等方案</dd></div>
              </dl>
              <div className="gallery-modal-actions">
                <button className="gallery-copy-btn" type="button" onClick={() => handleCopyProductId(preview.id)}>
                  {copiedId === preview.id ? '产品编号已复制' : '复制产品编号'}
                </button>
                <a className="btn light" href={productInquiryHref(preview)}>发送此款询盘<ArrowRight size={16} /></a>
              </div>
            </div>
          </div>
        </div>
      )}
      <Footer />
      <MobileContactBar />
    </main>
  )
}

function HomePage() {
  useEffect(() => {
    if (!window.location.hash) return
    const id = window.location.hash.slice(1)
    window.setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 80)
  }, [])

  return (
    <main>
      <Nav />
      <Hero />
      <CompanyIntro />
      <FactoryEvidence />
      <Products />
      <ApplicationScenarios />
      <TrustStats />
      <About />
      <FactorySection />
      <Certs />
      <Custom />
      <FAQ />
      <Contact />
      <Footer />
      <MobileContactBar />
    </main>
  )
}

function NotFound() {
  useEffect(() => {
    document.title = '页面不存在｜宏途运动头盔 ODM/OEM 工厂'
    setMetaDescription('页面不存在。你可以返回宏途运动头盔 ODM/OEM 工厂官网首页、进入产品图库，或联系工厂获取合作报价。')
  }, [])

  return (
    <main>
      <section className="not-found-page">
        <div className="not-found-panel">
          <p className="eyebrow">404 / Not Found</p>
          <h1>页面不存在</h1>
          <p>你访问的地址可能已变更，或链接输入有误。</p>
          <div className="not-found-actions">
            <a className="btn light" href="/">返回首页</a>
            <a className="btn ghost" href="/gallery">进入产品图库</a>
            <a className="btn ghost" href="/#contact">联系工厂</a>
          </div>
        </div>
      </section>
      <MobileContactBar />
    </main>
  )
}

function App() {
  const { pathname } = window.location

  if (pathname === '/galleryfe') {
    window.location.replace('/gallery')
    return null
  }

  if (pathname === '/') return <HomePage />
  if (pathname === '/gallery') return <GalleryPage />

  return <NotFound />
}

createRoot(document.getElementById('root')).render(<App />)
