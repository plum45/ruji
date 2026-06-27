import { useState } from 'react';
import ScrollProgress from './components/ScrollProgress';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import IntroSection from './components/IntroSection';
import GallerySection from './components/GallerySection';
import TopicSection, { type TopicCard } from './components/TopicSection';
import { ThemeProvider, useTheme } from './ThemeContext';

// ── A: Cytoskeletal Components (Overview) ──────────────────────────
const OVERVIEW_CARDS: TopicCard[] = [
  {
    tags: ['3 Types', 'Filaments', 'Network'],
    iconPath: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z',
    title: 'Cytoskeletal Overview',
    body: 'โครงร่างเซลล์ (Cytoskeleton) คือโครงข่ายโปรตีนภายในเซลล์ ประกอบด้วยเส้นใยสามชนิดหลัก ได้แก่ ไมโครฟิลาเมนต์ ไมโครทิวบูล และอินเทอร์มีเดียตฟิลาเมนต์ ซึ่งทำงานร่วมกันเพื่อค้ำจุนโครงสร้าง ขนส่งสาร และควบคุมการเคลื่อนไหว',
  },
  {
    tags: ['Polymerization', 'GTP', 'ATP'],
    iconPath: 'M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46A7.93 7.93 0 0 0 20 12c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8L5.24 7.74A7.93 7.93 0 0 0 4 12c0 4.42 3.58 8 8 8v3l4-4-4-4v3z',
    title: 'Dynamic Assembly',
    body: 'เส้นใยโครงร่างเซลล์มีคุณสมบัติพิเศษคือสามารถสร้างและสลายตัวได้อย่างรวดเร็ว (Dynamic assembly/disassembly) โดยอาศัยพลังงานจาก ATP หรือ GTP ช่วยให้เซลล์ปรับรูปร่างตอบสนองต่อสภาพแวดล้อมได้อย่างรวดเร็ว',
  },
  {
    tags: ['Signaling', 'Scaffolding', 'Mechanosensing'],
    iconPath: 'M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1h-2zm3 18H5V8h14v11z',
    title: 'Functional Integration',
    body: 'โครงร่างเซลล์ไม่ได้ทำหน้าที่เพียงค้ำจุนโครงสร้างเท่านั้น แต่ยังเชื่อมโยงกับเส้นทางส่งสัญญาณ สร้างแรงกล และตอบสนองต่อแรงดันจากภายนอก (Mechanosensing) ทำให้เซลล์รับรู้และตอบสนองต่อสภาพแวดล้อมได้',
  },
  {
    tags: ['Prokaryote', 'Eukaryote', 'Evolution'],
    iconPath: 'M12 2a5 5 0 1 0 0 10A5 5 0 0 0 12 2zm0 12c-5.33 0-8 2.67-8 4v2h16v-2c0-1.33-2.67-4-8-4z',
    title: 'Evolutionary Conservation',
    body: 'โครงร่างเซลล์ไม่ได้จำกัดอยู่เฉพาะในเซลล์ยูคาริโอตเท่านั้น แต่ยังพบโฮโมล็อกในแบคทีเรีย เช่น FtsZ ที่คล้ายทิวบูลิน และ MreB ที่คล้ายแอกทิน แสดงให้เห็นถึงการอนุรักษ์ฟังก์ชันในวิวัฒนาการ',
  },
];

// ── B: Microfilaments ──────────────────────────────────────────────
const MICROFILAMENTS_CARDS: TopicCard[] = [
  {
    tags: ['F-actin', 'G-actin', 'Double Helix'],
    iconPath: 'M5 21q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h14q.825 0 1.413.588T21 5v14q0 .825-.587 1.413T19 21H5Zm1-4h12l-3.75-5-3 4L9 13l-3 4Z',
    title: 'Actin Filaments',
    body: 'ไมโครฟิลาเมนต์หรือเส้นใยแอกทิน เกิดจากโปรตีน G-actin รวมตัวเป็นสายเกลียวคู่ F-actin ขนาดเส้นผ่านศูนย์กลางประมาณ 5–9 นาโนเมตร มีขั้ว (+) ที่ปลายบาร์บ และขั้ว (-) ที่ปลายแหลม ทำให้เส้นใยมีทิศทางการเจริญเติบโตที่แน่นอน',
  },
  {
    tags: ['Arp2/3', 'Lamellipodia', 'Protrusion'],
    iconPath: 'M12 2C8.13 2 5 5.13 5 9c0 3.87 4 10 7 13 3-3 7-9.13 7-13 0-3.87-3.13-7-7-7Zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5Z',
    title: 'Branched Networks',
    body: 'เครือข่ายแบบกิ่งก้านเกิดจากโปรตีนคอมเพล็กซ์ Arp2/3 ที่สร้างกิ่งใหม่ในมุม 70 องศา ก่อให้เกิดโครงสร้างตาข่ายหนาแน่นที่ขอบเซลล์ (Lamellipodia) ซึ่งเป็นแรงขับเคลื่อนหลักของการเคลื่อนที่ของเซลล์ไปข้างหน้า',
  },
  {
    tags: ['Myosin II', 'Contraction', 'Focal Adhesion'],
    iconPath: 'M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z',
    title: 'Stress Fibers',
    body: 'สเตรสไฟเบอร์คือมัดของเส้นใยแอกทินและไมโอซิน II ทอดยาวข้ามเซลล์และยึดกับ Focal adhesion ที่ปลายทั้งสอง สร้างแรงหดตัวเพื่อดึงเซลล์ให้เคลื่อนที่บนพื้นผิวและส่งสัญญาณเชิงกล',
  },
  {
    tags: ['Cell Cortex', 'Shape', 'Tension'],
    iconPath: 'M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z',
    title: 'Cortical Actin',
    body: 'ชั้นแอกทินบางๆ ที่อยู่ใต้เยื่อหุ้มเซลล์โดยตรง ทำหน้าที่รักษารูปร่างเซลล์ ควบคุมความตึงของเยื่อหุ้มเซลล์ และเป็นตัวกลางในการรับรู้แรงจากภายนอก (Mechanosensing) รวมถึงการส่งสัญญาณเข้าสู่เซลล์',
  },
];

// ── C: Intermediate Filaments ──────────────────────────────────────
const IF_CARDS: TopicCard[] = [
  {
    tags: ['Epithelial', 'Desmosomes', 'Barrier'],
    iconPath: 'M12 2a5 5 0 1 0 0 10A5 5 0 0 0 12 2zm0 12c-5.33 0-8 2.67-8 4v2h16v-2c0-1.33-2.67-4-8-4z',
    title: 'Keratin Filaments',
    body: 'เส้นใยเคราตินพบในเซลล์เยื่อบุผิว ประกอบกันเป็นเครือข่ายโยงกับ Desmosome เพื่อยึดเซลล์เข้าหากัน ต้านทานแรงเสียดสีและแรงกดได้ดี เป็นองค์ประกอบหลักของผิวหนัง เส้นผม และเล็บ',
  },
  {
    tags: ['Mesenchymal', 'EMT', 'Cancer Invasion'],
    iconPath: 'M20.5 3l-.16.03L15 5.1 9 3 3.36 4.9c-.21.07-.36.25-.36.48V20.5c0 .28.22.5.5.5l.16-.03L9 18.9l6 2.1 5.64-1.9c.21-.07.36-.25.36-.48V3.5c0-.28-.22-.5-.5-.5z',
    title: 'Vimentin',
    body: 'วิเมนตินเป็นเส้นใยกลางชนิดหลักของเซลล์มีโซนไคมัล มีบทบาทสำคัญในการอพยพของเซลล์และกระบวนการ EMT (Epithelial-Mesenchymal Transition) ซึ่งเกี่ยวข้องกับการแพร่กระจายของมะเร็ง',
  },
  {
    tags: ['Nuclear Envelope', 'Chromatin', 'Laminopathies'],
    iconPath: 'M9 3L5 6.99h3V14h2V6.99h3L9 3zm7 14.01V10h-2v7.01h-3L15 21l4-3.99h-3z',
    title: 'Nuclear Lamins',
    body: 'แลมินเป็นเส้นใยกลางบุด้านในเยื่อหุ้มนิวเคลียส รักษารูปร่างของนิวเคลียสและจัดระเบียบโครมาติน การกลายพันธุ์ของแลมินเกี่ยวข้องกับโรค Progeria (ชราก่อนวัย) และโรคกล้ามเนื้ออ่อนแรง',
  },
  {
    tags: ['Neuron', 'Axon Diameter', 'Signal Speed'],
    iconPath: 'M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z',
    title: 'Neurofilaments',
    body: 'นิวโรฟิลาเมนต์เป็นเส้นใยกลางในเซลล์ประสาท ทำหน้าที่กำหนดขนาดเส้นผ่านศูนย์กลางของแอกซอน ซึ่งส่งผลโดยตรงต่อความเร็วในการนำสัญญาณประสาท แอกซอนที่ใหญ่กว่าจะนำสัญญาณได้เร็วกว่า',
  },
];

// ── D: Microtubules ────────────────────────────────────────────────
const MT_CARDS: TopicCard[] = [
  {
    tags: ['GTP Cap', 'Catastrophe', 'Rescue'],
    iconPath: 'M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 3c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm7 13H5v-.23c0-.62.28-1.2.76-1.58C7.47 15.82 9.64 15 12 15s4.53.82 6.24 2.19c.48.38.76.97.76 1.58V19z',
    title: 'Dynamic Instability',
    body: 'ไมโครทิวบูลมีคุณสมบัติพิเศษ Dynamic instability คือยืดตัวและหดตัวอย่างรวดเร็วสลับกันโดยสุ่ม ขึ้นอยู่กับสถานะ GTP/GDP ที่หัวของทิวบูลิน ช่วยให้เซลล์สามารถค้นหาและจับโครงสร้างต่างๆ ภายในเซลล์ได้อย่างมีประสิทธิภาพ',
  },
  {
    tags: ['Centrosome', 'γ-tubulin', 'Cell Polarity'],
    iconPath: 'M12 2l-5.5 9h11L12 2zm0 3.84L14.53 9h-5.06L12 5.84zM17.5 13c-2.49 0-4.5 2.01-4.5 4.5S15.01 22 17.5 22s4.5-2.01 4.5-4.5-2.01-4.5-4.5-4.5zm0 7a2.5 2.5 0 0 1 0-5 2.5 2.5 0 0 1 0 5zM3 21.5h8v-2H3v2z',
    title: 'Nucleation at MTOC',
    body: 'การสร้างไมโครทิวบูลใหม่เริ่มต้นที่ MTOC (Microtubule-Organizing Center) โดยเฉพาะที่เซนโทรโซม ซึ่งมีโปรตีน γ-TuRC เป็นตัวนำ กำหนดขั้วและทิศทางของไมโครทิวบูล สร้างความเป็นขั้วภายในเซลล์',
  },
  {
    tags: ['MAPs', 'Tau', 'EB1', 'Stability'],
    iconPath: 'M20 2H4v2l4.586 4.586A2 2 0 0 1 9 10v4a2 2 0 0 1-.586 1.414L4 20v2h16v-2l-4.414-4.586A2 2 0 0 1 15 14v-4a2 2 0 0 1 .586-1.414L20 4V2z',
    title: 'Microtubule-Associated Proteins',
    body: 'โปรตีน MAPs ควบคุมการสร้าง การเสถียร และการเชื่อมโยงของไมโครทิวบูล เช่น Tau ในเซลล์ประสาท และ EB1 ที่ติดตามปลาย (+) ที่กำลังเติบโต ความผิดปกติของ Tau เกี่ยวข้องกับโรค Alzheimer',
  },
  {
    tags: ['α-tubulin', 'β-tubulin', 'Post-translational'],
    iconPath: 'M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1v12zm0 5v-3',
    title: 'Tubulin Isotypes',
    body: 'ไมโครทิวบูลสร้างจากทิวบูลิน α และ β ที่รวมกันเป็นไดเมอร์ จากนั้นต่อกันเป็นโปรโตฟิลาเมนต์ 13 เส้นเรียงเป็นหลอด การดัดแปลงหลังการแปล (Post-translational modification) ช่วยควบคุมคุณสมบัติและการทำงานของไมโครทิวบูล',
  },
];

// ── E: Cell Structure Support ──────────────────────────────────────
const STRUCTURE_CARDS: TopicCard[] = [
  {
    tags: ['Rigidity', 'Stiffness', 'Deformation'],
    iconPath: 'M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 14l-5-5 1.41-1.41L12 14.17l7.59-7.59L21 8l-9 9z',
    title: 'Mechanical Scaffolding',
    body: 'โครงร่างเซลล์ทำหน้าที่เป็นโครงเหล็กภายในเซลล์ ต้านทานการเสียรูปร่าง ไมโครทิวบูลมีความแข็งสูง แอกทินมีความยืดหยุ่นปานกลาง ส่วนเส้นใยกลางมีความเหนียวและทนต่อแรงดึง ทั้งสามประเภทเสริมกันเพื่อให้เซลล์คงรูป',
  },
  {
    tags: ['Morphogenesis', 'Polarity', 'Rho GTPase'],
    iconPath: 'M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z',
    title: 'Cell Shape Determination',
    body: 'รูปร่างเซลล์ที่หลากหลาย เช่น เซลล์เม็ดเลือดแดง เซลล์ประสาท หรือเซลล์กล้ามเนื้อ ล้วนเกิดจากการจัดเรียงตัวของโครงร่างเซลล์ที่ต่างกัน ควบคุมโดยปัจจัยการถอดรหัสและสัญญาณ Rho GTPase',
  },
  {
    tags: ['Integrin', 'Focal Adhesion', 'Tensegrity'],
    iconPath: 'M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z',
    title: 'Extracellular Matrix Linkage',
    body: 'เซลล์เชื่อมต่อโครงร่างภายในกับ Extracellular matrix ผ่าน Integrin ที่ Focal adhesion ก่อให้เกิดระบบ Tensegrity ที่แรงตึงและแรงอัดถ่วงดุลกัน ส่งผลต่อพฤติกรรม การแบ่งเซลล์ และการอยู่รอด',
  },
  {
    tags: ['LINC Complex', 'Nuclear Position', 'Chromatin'],
    iconPath: 'M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z',
    title: 'Nuclear Organization',
    body: 'โครงร่างเซลล์ยึดนิวเคลียสให้อยู่ในตำแหน่งที่เหมาะสมผ่านโปรตีน LINC complex ที่เชื่อมระหว่างไซโตสเกลีตันกับแลมินในนิวเคลียส ส่งผลต่อการแสดงออกของยีนผ่านการจัดระเบียบโครมาติน',
  },
];

// ── F: Cell and Organelle Movement ────────────────────────────────
const MOVEMENT_CARDS: TopicCard[] = [
  {
    tags: ['Plus-end', 'Anterograde', 'Cargo'],
    iconPath: 'M13 2.05v2.02c3.95.49 7 3.85 7 7.93 0 3.21-1.81 6-4.72 7.28L13 17v5l5-3-1.22-1.22C19.91 16.03 22 13.07 22 12c0-5.18-3.94-9.45-9-9.95zM11 2.05C5.95 2.55 2 6.82 2 12c0 3.07 2.09 6.03 5.22 7.78L6 21l5 3v-5l-2.28 2.28C6.81 20 5 17.21 5 14c0-4.08 3.05-7.44 7-7.93V2.05z',
    title: 'Kinesin Motors',
    body: 'ไคนีซินเป็นโปรตีนมอเตอร์ที่ "เดิน" บนไมโครทิวบูลไปทางปลาย (+) ขนส่งออร์แกเนลล์ ถุงซินแนปส์ และ mRNA ไปยังส่วนปลายของเซลล์ประสาทและบริเวณรอบนอก ใช้พลังงานจากการสลาย ATP ก้าวละ 8 นาโนเมตร',
  },
  {
    tags: ['Minus-end', 'Retrograde', 'Dynactin'],
    iconPath: 'M21 11H6.83l3.58-3.59L9 6l-6 6 6 6 1.41-1.41L6.83 13H21v-2z',
    title: 'Dynein Motors',
    body: 'ไดนีนเป็นโปรตีนมอเตอร์ขนาดใหญ่ที่เคลื่อนที่ไปทางปลาย (-) ขนส่งสินค้ากลับสู่ใจกลางเซลล์ (Retrograde) และจัดตำแหน่งสปินเดิลในการแบ่งเซลล์ ต้องการโปรตีนช่วย Dynactin ในการทำงาน',
  },
  {
    tags: ['Actin Track', 'Muscle', 'Non-muscle'],
    iconPath: 'M8 5v14l11-7z',
    title: 'Myosin Motors',
    body: 'ไมโอซินทำงานบนเส้นใยแอกทิน มีหลายชนิด เช่น ไมโอซิน II สร้างแรงหดตัวในกล้ามเนื้อและ Stress fiber และ ไมโอซิน V ขนส่งออร์แกเนลล์ผ่านระยะสั้น รวมถึงไมโอซิน VI ที่เคลื่อนที่สวนทางกัน',
  },
  {
    tags: ['Endosome', 'Golgi', 'ER-to-Golgi'],
    iconPath: 'M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4z',
    title: 'Vesicle Trafficking',
    body: 'การขนส่งถุง (Vesicle trafficking) พึ่งพาทั้งไมโครทิวบูลและแอกทิน ถุงเดินทางระยะไกลบนไมโครทิวบูลโดยไคนีซินหรือไดนีน จากนั้นส่งต่อให้ไมโอซินบนแอกทินในระยะสั้นเพื่อส่งถึงปลายทาง',
  },
];

// ── G: Cilia and Flagella ──────────────────────────────────────────
const CILIA_CARDS: TopicCard[] = [
  {
    tags: ['9+2 Arrangement', 'Doublet MT', 'Dynein Arms'],
    iconPath: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z',
    title: 'Axonemal Structure',
    body: 'โครงสร้างแกนกลาง (Axoneme) ของซีเลียและแฟลเจลลาประกอบด้วยไมโครทิวบูล 9 คู่เรียงรอบคู่กลาง 1 คู่ (9+2) แขนไดนีนชั้นนอกและชั้นในที่ยื่นออกมาเป็นตัวสร้างแรงให้เกิดการโค้งงอและเคลื่อนไหว',
  },
  {
    tags: ['Metachronal Wave', 'Mucociliary', 'Power Stroke'],
    iconPath: 'M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1v12zm0 5v-3',
    title: 'Ciliary Beat Pattern',
    body: 'การเต้นของซีเลียเกิดจากการทำงานแบบประสานงาน สร้าง Metachronal wave คล้ายคลื่น ขับเคลื่อนเมือก (Mucus) ตามทางเดินหายใจ หรือขับเคลื่อนเซลล์อสุจิ แบ่งเป็น Power stroke และ Recovery stroke',
  },
  {
    tags: ['IFT Train', 'Kinesin-2', 'Dynein-2'],
    iconPath: 'M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z',
    title: 'Intraflagellar Transport',
    body: 'การขนส่งภายในแฟลเจลลา (IFT) ใช้ขนส่งโปรตีนโครงสร้างและสัญญาณเข้าออกซีเลีย Kinesin-2 ขนสินค้าออกไปปลาย Dynein-2 นำกลับสู่ฐาน จำเป็นต่อการสร้างและรักษาซีเลีย',
  },
  {
    tags: ['Signaling Hub', 'Hedgehog', 'PDGF'],
    iconPath: 'M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1h-2zm3 18H5V8h14v11z',
    title: 'Primary Cilia',
    body: 'ซีเลียปฐมภูมิ (Primary cilia) พบในเซลล์เกือบทุกชนิด ไม่มีการเคลื่อนไหว แต่ทำหน้าที่เป็นเสาอากาศรับสัญญาณ เช่น Hedgehog signaling ซึ่งสำคัญต่อการพัฒนาของร่างกายและเกี่ยวข้องกับมะเร็งหลายชนิด',
  },
];

// ── H: Role in Cell Division ───────────────────────────────────────
const DIVISION_CARDS: TopicCard[] = [
  {
    tags: ['Kinetochore MT', 'Polar MT', 'Astral MT'],
    iconPath: 'M20 2H4v2l4.586 4.586A2 2 0 0 1 9 10v4a2 2 0 0 1-.586 1.414L4 20v2h16v-2l-4.414-4.586A2 2 0 0 1 15 14v-4a2 2 0 0 1 .586-1.414L20 4V2z',
    title: 'Mitotic Spindle',
    body: 'สปินเดิลไมโทซิสสร้างจากไมโครทิวบูล 3 กลุ่ม ได้แก่ Kinetochore MT ดึงโครโมโซม Polar MT ยันสปินเดิลสองข้าง และ Astral MT ยึดสปินเดิลกับผนังเซลล์ ช่วยให้การแยกโครโมโซมถูกต้องแม่นยำ',
  },
  {
    tags: ['Contractile Ring', 'Myosin II', 'Cleavage Furrow'],
    iconPath: 'M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z',
    title: 'Cytokinesis Ring',
    body: 'หลังการแบ่งนิวเคลียส วงแหวนหดตัว (Contractile ring) ประกอบด้วยแอกทินและไมโอซิน II หดตัวรัดเซลล์ตรงกลาง (Cleavage furrow) แบ่งไซโทพลาสซึมออกเป็นสองเซลล์ลูก ควบคุมโดย RhoA GTPase',
  },
  {
    tags: ['Centriole', 'PLK4', 'S-phase'],
    iconPath: 'M12 2l-5.5 9h11L12 2zm0 3.84L14.53 9h-5.06L12 5.84zM17.5 13c-2.49 0-4.5 2.01-4.5 4.5S15.01 22 17.5 22s4.5-2.01 4.5-4.5-2.01-4.5-4.5-4.5zm0 7a2.5 2.5 0 0 1 0-5 2.5 2.5 0 0 1 0 5zM3 21.5h8v-2H3v2z',
    title: 'Centrosome Duplication',
    body: 'เซนโทรโซมต้องจำลองตัวเองก่อนการแบ่งเซลล์ ควบคุมโดย PLK4 kinase กระบวนการนี้สำคัญมาก เพราะถ้าจำนวนเซนโทรโซมผิดปกติจะทำให้เกิดสปินเดิลผิดรูปและโครโมโซมแยกผิดพลาด นำไปสู่มะเร็ง',
  },
  {
    tags: ['SAC', 'Tension', 'Error Correction'],
    iconPath: 'M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 14l-5-5 1.41-1.41L12 14.17l7.59-7.59L21 8l-9 9z',
    title: 'Spindle Assembly Checkpoint',
    body: 'ก่อนโครโมโซมจะแยกออก เซลล์มีกลไกตรวจสอบ SAC ตรวจว่าไคนีโทคอร์ทุกอันถูกดึงจากทั้งสองขั้ว ป้องกันการแบ่งโครโมโซมผิดพลาดที่อาจนำไปสู่มะเร็งชนิดต่างๆ',
  },
];

// ── I: Additional Topics ───────────────────────────────────────────
const ADDITIONAL_CARDS: TopicCard[] = [
  {
    tags: ['Pathology', 'Mutation', 'Therapy'],
    iconPath: 'M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z',
    title: 'Cytoskeletal Diseases',
    body: 'ความผิดปกติของโครงร่างเซลล์เกี่ยวข้องกับโรคหลายชนิด เช่น Laminopathies จากการกลายพันธุ์ของแลมิน โรค Charcot-Marie-Tooth จาก Neurofilament ผิดปกติ และ Actin myopathy จากการกลายพันธุ์ของแอกทิน',
  },
  {
    tags: ['Chemotaxis', 'Haptotaxis', 'Invasion'],
    iconPath: 'M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z',
    title: 'Cell Migration',
    body: 'การอพยพของเซลล์ต้องการการประสานงานของโครงร่างเซลล์ทั้งสามชนิด เซลล์ยื่น Lamellipodia และ Filopodia นำทาง ตามด้วยการหดตัวของ Stress fiber และสุดท้ายปล่อยส่วนหาง (Tail retraction)',
  },
  {
    tags: ['Taxol', 'Vincristine', 'Cytochalasin'],
    iconPath: 'M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1Zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7Z',
    title: 'Drug Targets',
    body: 'โครงร่างเซลล์เป็นเป้าหมายยาสำคัญ Taxol ทำให้ไมโครทิวบูลเสถียรเกินไปจนหยุดการแบ่งเซลล์มะเร็ง Vincristine ยับยั้งการรวมตัวของทิวบูลิน และ Cytochalasin ยับยั้งการต่อยาวของแอกทิน',
  },
  {
    tags: ['Force Sensing', 'YAP/TAZ', 'Stiffness'],
    iconPath: 'M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1h-2zm3 18H5V8h14v11z',
    title: 'Mechanobiology',
    body: 'เซลล์รับรู้ความแข็งของสภาพแวดล้อม (Substrate stiffness) ผ่านโครงร่างเซลล์ และส่งสัญญาณผ่าน YAP/TAZ transcription factors ส่งผลต่อการแบ่งเซลล์ การแยกความเชี่ยวชาญ (Differentiation) และการเกิดมะเร็ง',
  },
];

// ── Color themes per tab ───────────────────────────────────────────
const THEMES = {
  overview:       { accent: '#6366f1', darkBg: '#07071a', lightBg: '#eef0fd', darkOverlay: 'linear-gradient(135deg,rgba(30,27,80,0.85) 0%,rgba(0,0,0,0.3) 100%)', lightOverlay: 'linear-gradient(135deg,rgba(200,200,255,0.4) 0%,rgba(255,255,255,0.1) 100%)' },
  microfilaments: { accent: '#f43f5e', darkBg: '#1a0507', lightBg: '#fff1f2', darkOverlay: 'linear-gradient(135deg,rgba(80,5,20,0.85) 0%,rgba(0,0,0,0.3) 100%)', lightOverlay: 'linear-gradient(135deg,rgba(255,200,210,0.4) 0%,rgba(255,255,255,0.1) 100%)' },
  intermediate:   { accent: '#f59e0b', darkBg: '#1a1007', lightBg: '#fffbeb', darkOverlay: 'linear-gradient(135deg,rgba(80,40,5,0.85) 0%,rgba(0,0,0,0.3) 100%)', lightOverlay: 'linear-gradient(135deg,rgba(255,235,180,0.4) 0%,rgba(255,255,255,0.1) 100%)' },
  microtubules:   { accent: '#06b6d4', darkBg: '#021318', lightBg: '#ecfeff', darkOverlay: 'linear-gradient(135deg,rgba(0,50,65,0.85) 0%,rgba(0,0,0,0.3) 100%)', lightOverlay: 'linear-gradient(135deg,rgba(180,240,255,0.4) 0%,rgba(255,255,255,0.1) 100%)' },
  structure:      { accent: '#10b981', darkBg: '#031a10', lightBg: '#ecfdf5', darkOverlay: 'linear-gradient(135deg,rgba(5,60,30,0.85) 0%,rgba(0,0,0,0.3) 100%)', lightOverlay: 'linear-gradient(135deg,rgba(180,255,220,0.4) 0%,rgba(255,255,255,0.1) 100%)' },
  movement:       { accent: '#8b5cf6', darkBg: '#0d0718', lightBg: '#f5f3ff', darkOverlay: 'linear-gradient(135deg,rgba(40,10,80,0.85) 0%,rgba(0,0,0,0.3) 100%)', lightOverlay: 'linear-gradient(135deg,rgba(220,200,255,0.4) 0%,rgba(255,255,255,0.1) 100%)' },
  cilia:          { accent: '#14b8a6', darkBg: '#031a18', lightBg: '#f0fdfa', darkOverlay: 'linear-gradient(135deg,rgba(5,60,55,0.85) 0%,rgba(0,0,0,0.3) 100%)', lightOverlay: 'linear-gradient(135deg,rgba(180,255,245,0.4) 0%,rgba(255,255,255,0.1) 100%)' },
  division:       { accent: '#ef4444', darkBg: '#1a0303', lightBg: '#fef2f2', darkOverlay: 'linear-gradient(135deg,rgba(80,5,5,0.85) 0%,rgba(0,0,0,0.3) 100%)', lightOverlay: 'linear-gradient(135deg,rgba(255,195,195,0.4) 0%,rgba(255,255,255,0.1) 100%)' },
  additional:     { accent: '#64748b', darkBg: '#0a0b0e', lightBg: '#f8fafc', darkOverlay: 'linear-gradient(135deg,rgba(20,25,35,0.85) 0%,rgba(0,0,0,0.3) 100%)', lightOverlay: 'linear-gradient(135deg,rgba(210,215,225,0.4) 0%,rgba(255,255,255,0.1) 100%)' },
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
        {/* ── Home ── */}
        {activeTab === 'home' && (
          <>
            <Hero />
            <IntroSection />
            <GallerySection />
          </>
        )}

        {/* ── A: Cytoskeletal Components ── */}
        {activeTab === 'overview' && (
          <TopicSection
            id="overview"
            label="// Cytoskeletal Components"
            heading={"The building\nblocks."}
            cards={OVERVIEW_CARDS}
            {...t('overview')}
          />
        )}

        {/* ── B: Microfilaments ── */}
        {activeTab === 'microfilaments' && (
          <TopicSection
            id="microfilaments"
            label="// Microfilaments"
            heading={"Thin, dynamic\nfilaments."}
            cards={MICROFILAMENTS_CARDS}
            {...t('microfilaments')}
          />
        )}

        {/* ── C: Intermediate Filaments ── */}
        {activeTab === 'intermediate' && (
          <TopicSection
            id="intermediate"
            label="// Intermediate Filaments"
            heading={"Resilience\nunder stress."}
            cards={IF_CARDS}
            {...t('intermediate')}
          />
        )}

        {/* ── D: Microtubules ── */}
        {activeTab === 'microtubules' && (
          <TopicSection
            id="microtubules"
            label="// Microtubules"
            heading={"Tracks &\npolarity."}
            cards={MT_CARDS}
            {...t('microtubules')}
          />
        )}

        {/* ── E: Cell Structure Support ── */}
        {activeTab === 'structure' && (
          <TopicSection
            id="structure"
            label="// Cell Structure Support"
            heading={"Form\n& function."}
            cards={STRUCTURE_CARDS}
            {...t('structure')}
          />
        )}

        {/* ── F: Cell and Organelle Movement ── */}
        {activeTab === 'movement' && (
          <TopicSection
            id="movement"
            label="// Cell and Organelle Movement"
            heading={"Directed\nmovement."}
            cards={MOVEMENT_CARDS}
            {...t('movement')}
          />
        )}

        {/* ── G: Cilia and Flagella ── */}
        {activeTab === 'cilia' && (
          <TopicSection
            id="cilia"
            label="// Cilia and Flagella"
            heading={"Beating\nin sync."}
            cards={CILIA_CARDS}
            {...t('cilia')}
          />
        )}

        {/* ── H: Role in Cell Division ── */}
        {activeTab === 'division' && (
          <TopicSection
            id="division"
            label="// Role in Cell Division"
            heading={"Dividing\nwith precision."}
            cards={DIVISION_CARDS}
            {...t('division')}
          />
        )}

        {/* ── I: Additional Topics ── */}
        {activeTab === 'additional' && (
          <TopicSection
            id="additional"
            label="// Additional Topics"
            heading={"Beyond\nthe basics."}
            cards={ADDITIONAL_CARDS}
            {...t('additional')}
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
              k
            </span>
          </div>
          <p className="font-body text-sm" style={{ color: isLight ? 'rgba(0,0,0,0.5)' : 'rgba(255,255,255,0.5)' }}>
            © 2026 Knowledge Hub. All rights reserved.
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
