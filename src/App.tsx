import { useState } from 'react';
import ScrollProgress from './components/ScrollProgress';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import IntroSection from './components/IntroSection';
import GallerySection from './components/GallerySection';
import TopicSection, { type TopicCard } from './components/TopicSection';
import { ThemeProvider, useTheme } from './ThemeContext';


// ── B: กิจกรรม (Activities) ──────────────────────────────
const ACTIVITIES_CARDS: TopicCard[] = [
  {
    tags: ['ประเพณีวัฒนธรรม', 'กิจกรรมชุมชน', 'บุญบั้งไฟ'],
    iconPath: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H7c0-2.76 2.24-5 5-5s5 2.24 5 5c0 1.04-.42 1.99-1.07 2.75z',
    title: 'กิจกรรมบุญบั้งไฟ',
    body: 'เข้าร่วมและมีส่วนร่วมในกิจกรรมประเพณีบุญบั้งไฟ เพื่อส่งเสริมและสืบสานวัฒนธรรมท้องถิ่นร่วมกับชุมชน',
    images: [
      'https://www.dropbox.com/scl/fi/vwdjrbl6n65vo303vhkgo/715305167_1534475648476178_354223048349085859_n.jpg?rlkey=iziofog406o1sef8uh1onrn2d&raw=1',
      'https://www.dropbox.com/scl/fi/43ceq4qzuxvu6jprol613/2.jpg?rlkey=ps96xz1vzbthbgz5gfiwh29y8&raw=1',
      'https://www.dropbox.com/scl/fi/i0w3orzc6t65oclk3vgst/.jpg?rlkey=3yln8xusjp4ev247wvw8xl9bh&raw=1',
    ],
  },
  {
    tags: ['การประชุมวิชาการ', 'การเตรียมความพร้อม', 'เปิดภาคเรียน'],
    iconPath: 'M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z',
    title: 'ประชุมเตรียมความพร้อมเปิดภาคเรียน',
    body: 'เข้าร่วมการประชุมคณะครูและบุคลากรเพื่อเตรียมความพร้อม วางแผนการจัดการเรียนรู้ และรับมอบหมายภารกิจก่อนเปิดภาคเรียน',
    images: [
      'https://www.dropbox.com/scl/fi/m71sd4de5ymmpua0dgn84/696940132_1513148423942234_6542711132573575747_n.jpg?rlkey=y1nhwf1ld15qz871jcj76k1e3&raw=1',
      'https://www.dropbox.com/scl/fi/qkqav6hg5ycow4oxgiivs/697351469_1513150307275379_3091590413808241786_n.jpg?rlkey=5erze8sxmlwv8mt4j5p2jv6n7&raw=1',
      'https://www.dropbox.com/scl/fi/hte9xuz1cxvkrq6sdbbee/699141989_1513152943941782_477116334265431866_n.jpg?rlkey=k97tgghvtzukzw2ogvu97i4sa&raw=1',
    ],
  },
  {
    tags: ['ต้อนรับนักเรียน', 'แนะนำตัว', 'เปิดภาคเรียน'],
    iconPath: 'M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z',
    title: 'ต้อนรับและแนะนำตัวแก่นักเรียนในวันเปิดภาคเรียน',
    body: 'พบปะ ทักทาย และแนะนำตัวต่อผู้เรียนในวันเปิดภาคเรียนแรก เพื่อสร้างความเป็นกันเองและความสัมพันธ์ที่ดี บรรยากาศที่เป็นมิตรต่อการเรียนรู้',
    images: [
      'https://www.dropbox.com/scl/fi/u4wyytkge55oqp9ghlwhe/702652947_1517318753525201_2860933062066954796_n.jpg?rlkey=8fpshfbr9u2liz7i6zc9kiul0&raw=1',
      'https://www.dropbox.com/scl/fi/gbibnb5tw05h2lxi54d2t/702305477_1517957523461324_2327958114495464782_n.jpg?rlkey=fote59p26zlnxjug8pgf2j797&raw=1',
    ],
  },
  {
    tags: ['ประเพณีวัฒนธรรม', 'ร่วมทำบุญ', 'เซิ้งบุญบั้งไฟ'],
    iconPath: 'M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z',
    title: 'ร่วมทำบุญ/เซิ้งบุญบั้งไฟ',
    body: 'ร่วมสืบสานประเพณีอันดีงาม ร่วมทำบุญและร่วมกิจกรรมเซิ้งบุญบั้งไฟ เพื่อสร้างความสุขและความภาคภูมิใจในวัฒนธรรมท้องถิ่นร่วมกับชุมชน',
    aspectRatio: '4/3',
    images: [
      'https://www.dropbox.com/scl/fi/fltuwp39w4qa79vsrl86x/IMG_6933.JPG?rlkey=f7zip06r1jas6dz7mkakzkmft&raw=1',
      'https://www.dropbox.com/scl/fi/27khn8kyizkv6gz3klapf/IMG_0662.jpg?rlkey=7n4e5febt2qodh1seibuw8deq&raw=1',
    ],
  },
  {
    tags: ['จิตอาสา', 'การสนับสนุนงานโรงเรียน', 'ภารกิจครู'],
    iconPath: 'M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z',
    title: 'ช่วยเหลืองานครู/โรงเรียน',
    body: 'การมีส่วนร่วมช่วยเหลือและปฏิบัติภารกิจงานของโรงเรียนร่วมกับคณะครูอย่างเต็มกำลัง เพื่อความเรียบร้อยและการดำเนินงานของสถานศึกษาเป็นไปอย่างมีประสิทธิภาพ',
    images: [
      'https://www.dropbox.com/scl/fi/4fefl6s8v5thx83rgtaf2/.jpg?rlkey=vi3iawbvzehdtgp0w1urg11t0&raw=1',
      'https://www.dropbox.com/scl/fi/9r0lsszu56wiyflqise54/S__11157548_0.jpg?rlkey=j39gpczwh5hd3ix6gbr6ms497&raw=1',
      'https://www.dropbox.com/scl/fi/z3x659sdokf7rnj8odkvy/S__11157545.jpg?rlkey=nx323d159onwv3kyw4qqpgqw3&raw=1',
    ],
  },
];

// ── C: การสอน (Teaching) ──────────────────────────────────────
const TEACHING_CARDS: TopicCard[] = [
  {
    tags: ['บรรยากาศการเรียนรู้', 'การจัดการชั้นเรียน', 'Active Learning'],
    iconPath: 'M12 3L1 9l11 6 9-4.91V17h2V9L12 3zM3.82 9L12 4.53 20.18 9 12 13.47 3.82 9zM5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82z',
    title: 'บรรยากาศการสอน',
    body: 'การจัดบรรยากาศชั้นเรียนเชิงบวก กระตุ้นความสนใจของผู้เรียนผ่านการตั้งคำถาม การลงมือปฏิบัติจริง และการทำงานร่วมกันอย่างมีความสุข',
    images: [
      'https://www.dropbox.com/scl/fi/ogan1ahrtf7c29g774ild/IMG_0637.jpg?rlkey=ilz2sjbb00gbtoyhe457o222g&raw=1',
      'https://www.dropbox.com/scl/fi/zt2y8jutsp2g03xkvm8wj/IMG_0559.jpg?rlkey=qruf7upy1gv6c5be8gspglfbd&raw=1',
      'https://www.dropbox.com/scl/fi/9bwlbpx5lxt13efnmwy5a/IMG_0640.jpg?rlkey=o3wgix0tvhjlq2aa0vhc2fnzd&raw=1',
      'https://www.dropbox.com/scl/fi/epeblqgjbnvtn63liclqw/IMG_0619.jpg?rlkey=4e45bkygxjf4xte6shlojoxhz&raw=1',
      'https://www.dropbox.com/scl/fi/yk3ym87ej74qvf6vaof52/IMG_0618.jpg?rlkey=h0jh20kovt7dg7jd1qx4pgx74&raw=1',
    ],
  },
  {
    tags: ['สื่อนวัตกรรม', 'Generative AI', 'EdTech'],
    iconPath: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14.5v-9l6 4.5-6 4.5z',
    title: 'สื่อการสอนที่ทำจาก AI',
    body: 'การประยุกต์ใช้ปัญญาประดิษฐ์ (AI) ในการออกแบบสื่อนวัตกรรมการเรียนรู้และเว็บบอร์ดตอบคำถามปฏิสัมพันธ์ทางชีววิทยา เพื่อเพิ่มประสิทธิภาพและความกระตือรือร้นในการเรียนรู้ของผู้เรียน',
    webLinks: [
      {
        url: 'https://apt-bice-five.vercel.app/',
        title: 'Action Potential Interactive Learning',
        image: '/ai_media_1.png',
      },
      {
        url: 'https://bio55-ten.vercel.app/',
        title: 'BioExplore 3D - ระบบวิเคราะห์กายวิภาค',
        image: '/ai_media_2.png',
      },
      {
        url: 'https://script.google.com/macros/s/AKfycbzyDwoektNKgmooMEKMKNAuCtUP2BwFtqwws2-gxYyB5O4ItotkuV8CI05kx81wN4Hs/exec',
        title: 'Nerve Race: Quiz Battle',
        image: '/ai_media_3.png',
      },
    ],
  },
  {
    tags: ['สื่อนวัตกรรม', 'เกมการศึกษา', 'EdTech'],
    iconPath: 'M21.58 17.47L20.01 19l-7-7 7-7 1.57 1.53L16.12 12l5.46 5.47zM8 5v14l11-7L8 5z',
    title: 'สื่อการสอนออนไลน์',
    body: 'การประยุกต์ใช้แพลตฟอร์มเกมการศึกษาออนไลน์ (Gamified Learning Platforms) เช่น Blooket และ ZEP QUIZ เพื่อสร้างการมีส่วนร่วมและประเมินความเข้าใจผู้เรียนในรูปแบบเกมสนุกสนาน',
    webLinks: [
      {
        url: 'https://www.blooket.com/',
        title: 'Blooket - Learning Games',
        image: '/web_online_1.png',
      },
      {
        url: 'https://quiz.zep.us/th/public',
        title: 'ZEP QUIZ - เมตาเวิร์สเกมควิซ',
        image: '/web_online_2.png',
      },
      {
        url: 'https://human.biodigital.com/explore',
        title: 'BioDigital Human - 3D Anatomy',
        image: '/web_online_3.png',
      },
    ],
  },
];

// ── D: ข้อมูลบริบทโรงเรียน (School Context) ────────────────────────────────
const SCHOOL_CARDS: TopicCard[] = [
  {
    tags: ['ข้อมูลทั่วไป', 'วิสัยทัศน์', 'โรงเรียนฝึกสอน'],
    iconPath: 'M12 2L1 21h22L12 2zm0 3.99L19.53 19H4.47L12 5.99zM13 16h-2v2h2v-2zm0-6h-2v4h2v-4z',
    title: 'ข้อมูลและประวัติโรงเรียน',
    body: 'ศึกษาข้อมูลวิสัยทัศน์ แผนผังอาคารเรียน นโยบายของโรงเรียนฝึกประสบการณ์วิชาชีพครู เพื่อสร้างความเข้าใจในเป้าหมายการพัฒนาการศึกษาร่วมกัน',
  },
  {
    tags: ['สภาพแวดล้อม', 'แหล่งเรียนรู้', 'ห้องปฏิบัติการ'],
    iconPath: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z',
    title: 'สภาพแวดล้อมและแหล่งเรียนรู้',
    body: 'สำรวจและใช้ประโยชน์จากห้องปฏิบัติการทางวิทยาศาสตร์ ห้องสมุด และเทคโนโลยีสนับสนุนภายในโรงเรียน เพื่ออำนวยความสะดวกในการเรียนการสอนอย่างเหมาะสม',
  },
  {
    tags: ['วิเคราะห์ผู้เรียน', 'ความหลากหลาย', 'บริบทชั้นเรียน'],
    iconPath: 'M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.67-5.33-4-8-4z',
    title: 'บริบทและข้อมูลนักเรียน',
    body: 'เก็บรวบรวมข้อมูลพื้นฐานของนักเรียน วิเคราะห์ความแตกต่างระหว่างบุคคล และสำรวจปัญหาด้านการเรียนรู้ เพื่อวางแผนจัดกิจกรรมที่ตอบรับกับความต้องการของผู้เรียนทุกคน',
  },
  {
    tags: ['ชุมชนสัมพันธ์', 'ผู้ปกครอง', 'การมีส่วนร่วม'],
    iconPath: 'M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 9h12v2H6V9zm0 4h12v2H6v-2zm0-8h12v2H6V5z',
    title: 'ความร่วมมือระหว่างบ้านและชุมชน',
    body: 'ประสานงานกับผู้ปกครองผ่านการเยี่ยมบ้าน การโฮมรูม และกิจกรรมประชุมผู้ปกครอง เพื่ออัปเดตความก้าวหน้า ร่วมมือดูแลพฤติกรรมและการเรียนรู้อย่างใกล้ชิด',
  },
];

// ── Color themes per tab ───────────────────────────────────────────
const THEMES = {
  overview:   { accent: '#6366f1', darkBg: '#07071a', lightBg: '#eef0fd', darkOverlay: 'linear-gradient(135deg,rgba(30,27,80,0.85) 0%,rgba(0,0,0,0.3) 100%)', lightOverlay: 'linear-gradient(135deg,rgba(200,200,255,0.4) 0%,rgba(255,255,255,0.1) 100%)' },
  activities: { accent: '#f43f5e', darkBg: '#1a0507', lightBg: '#fff1f2', darkOverlay: 'linear-gradient(135deg,rgba(80,5,20,0.85) 0%,rgba(0,0,0,0.3) 100%)', lightOverlay: 'linear-gradient(135deg,rgba(255,200,210,0.4) 0%,rgba(255,255,255,0.1) 100%)' },
  teaching:   { accent: '#f59e0b', darkBg: '#1a1007', lightBg: '#fffbeb', darkOverlay: 'linear-gradient(135deg,rgba(80,40,5,0.85) 0%,rgba(0,0,0,0.3) 100%)', lightOverlay: 'linear-gradient(135deg,rgba(255,235,180,0.4) 0%,rgba(255,255,255,0.1) 100%)' },
  school:     { accent: '#06b6d4', darkBg: '#021318', lightBg: '#ecfeff', darkOverlay: 'linear-gradient(135deg,rgba(0,50,65,0.85) 0%,rgba(0,0,0,0.3) 100%)', lightOverlay: 'linear-gradient(135deg,rgba(180,240,255,0.4) 0%,rgba(255,255,255,0.1) 100%)' },
};

function AppInner() {
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const [activeTab, setActiveTab] = useState('home');

  const t = (key: keyof typeof THEMES) => ({
    bgColor:      isLight ? THEMES[key].lightBg  : THEMES[key].darkBg,
    overlayColor: isLight ? THEMES[key].lightOverlay : THEMES[key].darkOverlay,
    accentColor:  THEMES[key].accent,
  });

  return (
    <>
      <ScrollProgress />
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      <main>
        {/* ── Home & ข้อมูลส่วนตัว ── */}
        {(activeTab === 'home' || activeTab === 'overview') && (
          <>
            <Hero setActiveTab={setActiveTab} />
            <IntroSection />
            <GallerySection />
          </>
        )}

        {/* ── กิจกรรม ── */}
        {activeTab === 'activities' && (
          <TopicSection
            id="activities"
            label="// กิจกรรมและการพัฒนาตนเอง"
            heading={"Activities &\nDevelopment."}
            cards={ACTIVITIES_CARDS}
            {...t('activities')}
          />
        )}

        {/* ── การสอน ── */}
        {activeTab === 'teaching' && (
          <TopicSection
            id="teaching"
            label="// การจัดการเรียนการสอน"
            heading={"Instructional\nDesign."}
            cards={TEACHING_CARDS}
            {...t('teaching')}
          />
        )}

        {/* ── ข้อมูลบริบทโรงเรียน ── */}
        {activeTab === 'school' && (
          <TopicSection
            id="school"
            label="// ข้อมูลบริบทโรงเรียน"
            heading={"School Context\n& Environment."}
            cards={SCHOOL_CARDS}
            {...t('school')}
          />
        )}
      </main>

      {/* Footer */}
      <footer
        id="footer"
        style={{
          background: isLight ? '#e8e6e0' : '#000',
          padding: '4rem 2rem',
          textAlign: 'center',
          borderTop: isLight ? '1px solid rgba(0,0,0,0.08)' : '1px solid rgba(255,255,255,0.05)',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
          <div
            className="liquid-glass pointer-events-auto flex items-center justify-center"
            style={{ width: 40, height: 40, borderRadius: '50%' }}
          >
            <span style={{ fontFamily: '"Instrument Serif", serif', fontStyle: 'italic', fontSize: '1rem', color: isLight ? '#111' : '#fff' }}>
              P
            </span>
          </div>
          <p className="font-body text-sm" style={{ color: isLight ? 'rgba(0,0,0,0.5)' : 'rgba(255,255,255,0.5)' }}>
            © 2026 ครูภูริม | E-Portfolio. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppInner />
    </ThemeProvider>
  );
}

export default App;
