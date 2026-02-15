# PRD: StockVision AI Research

## 1. Product Overview

**Product Name:** StockVision AI Research
**Version:** 1.0
**Type:** Web Application (SPA)
**Target Users:** Stock Photographers, Content Creators, Digital Artists

StockVision AI เป็นเครื่องมือวิจัยตลาดสำหรับช่างภาพ Stock และ Content Creator ใช้ Google Gemini AI ในการวิเคราะห์เทรนด์ และสร้าง Metadata ที่ปรับแต่งสำหรับ SEO (Title, Description, Keywords, Tags) รวมถึง AI Prompt สำหรับสร้างภาพ เพื่อเพิ่มยอดขายบน Stock Image Platforms

---

## 2. Tech Stack

| Layer        | Technology                          |
| ------------ | ----------------------------------- |
| Framework    | React 19 + TypeScript               |
| Build Tool   | Vite 6                              |
| AI Engine    | Google Gemini 3 Flash (`@google/genai`) |
| Styling      | Tailwind CSS (CDN)                  |
| Storage      | Browser localStorage                |
| Deployment   | Google AI Studio / Static Hosting   |

---

## 3. Architecture

```
├── App.tsx                  # Root component, routing, state management
├── index.tsx                # React entry point
├── types.ts                 # TypeScript enums & interfaces
├── components/
│   ├── Dashboard.tsx        # Research form + results display
│   ├── ResultCard.tsx       # Generated metadata & AI prompt viewer
│   ├── History.tsx          # Saved generations library
│   └── Settings.tsx         # App preferences
├── services/
│   └── geminiService.ts     # Gemini API integration
├── .env.local               # API key (GEMINI_API_KEY)
├── package.json
├── vite.config.ts
└── tsconfig.json
```

---

## 4. Core Features

### 4.1 Market Research (Dashboard)
- ผู้ใช้กรอก Topic/Niche ที่ต้องการวิจัย
- เลือก Platform เป้าหมาย (Shutterstock, Adobe Stock, Instagram, Thai Market, Canva)
- เลือก Market Type (Evergreen, Seasonal, Trend)
- เลือก Image Style (Realistic, Vector, Illustration, Watercolor, Minimal)
- กด "Generate Strategy" เพื่อส่งข้อมูลไปยัง Gemini AI

### 4.2 AI-Generated Output (ResultCard)
ผลลัพธ์ที่ได้จาก Gemini AI ประกอบด้วย:
- **Title** — SEO-optimized title (max 70 chars)
- **Description** — รายละเอียดพร้อม keyword ธรรมชาติ
- **Keywords** — 20 คำหลัก SEO (Primary + Secondary)
- **Tags** — Platform-specific tags
- **Theme** — อารมณ์และธีมภาพรวม
- **Commercial Angle** — จุดขายเชิงพาณิชย์
- **Buyer Intent** — กลุ่มเป้าหมายและแรงจูงใจในการซื้อ
- **AI Prompt** — Prompt สำหรับ AI Image Generator (Midjourney, DALL-E)
- ทุกส่วนมีปุ่ม **Copy to Clipboard**

### 4.3 Creative Library (History)
- บันทึกผลลัพธ์ทุกครั้งที่ Generate อัตโนมัติ
- ค้นหาด้วย Topic หรือ Title
- กรองตาม All / Favorites
- Toggle Favorite (หัวใจ)
- ลบรายการ
- คลิก "View Details" เพื่อดูผลลัพธ์เต็ม

### 4.4 Settings
- เปลี่ยนภาษา Output (English / Thai)
- ตั้ง Default Style
- ตั้ง Default Platform
- ล้าง History ทั้งหมด
- แสดงข้อมูล API Configuration

---

## 5. Data Models

### ResearchResult
| Field           | Type        | Description                     |
| --------------- | ----------- | ------------------------------- |
| id              | string      | UUID                            |
| timestamp       | number      | Unix timestamp                  |
| topic           | string      | หัวข้อที่ค้นหา                    |
| platform        | Platform    | แพลตฟอร์มเป้าหมาย                |
| marketType      | MarketType  | ประเภทตลาด                      |
| style           | ImageStyle  | สไตล์ภาพ                        |
| title           | string      | SEO title                       |
| description     | string      | SEO description                 |
| keywords        | string[]    | SEO keywords                    |
| tags            | string[]    | Platform tags                   |
| theme           | string      | อารมณ์/ธีม                       |
| commercialAngle | string      | จุดขายเชิงพาณิชย์                 |
| buyerIntent     | string      | กลุ่มเป้าหมาย                    |
| aiPrompt        | string      | AI image generation prompt       |
| isFavorite      | boolean     | สถานะ favorite                   |

### Enums
- **Platform:** Shutterstock, Adobe Stock, Instagram, Thai Market, Canva
- **MarketType:** Evergreen, Seasonal, Trend
- **ImageStyle:** Realistic, Vector, Illustration, Watercolor, Minimal

---

## 6. Implementation Checklist

### Project Setup
- [x] Initialize React + TypeScript + Vite project
- [x] Configure `tsconfig.json`
- [x] Configure `vite.config.ts`
- [x] Setup `.env.local` with `GEMINI_API_KEY`
- [x] Setup `.gitignore`
- [ ] Install and configure Tailwind CSS properly (currently via CDN)
- [ ] Add ESLint + Prettier configuration
- [ ] Add `package-lock.json` or switch to a lockfile-based workflow

### Data Layer (types.ts)
- [x] Define `Platform` enum
- [x] Define `MarketType` enum
- [x] Define `ImageStyle` enum
- [x] Define `ResearchResult` interface
- [x] Define `AppSettings` interface

### AI Service (geminiService.ts)
- [x] Integrate Google Gemini SDK (`@google/genai`)
- [x] Implement `generateResearch()` with structured JSON schema response
- [x] System instruction for stock image SEO expert persona
- [x] Support bilingual output (English / Thai)
- [ ] Add request timeout handling
- [ ] Add retry logic for transient API failures
- [ ] Add input validation / sanitization before sending to API
- [ ] Add rate limiting (client-side)

### App Shell (App.tsx)
- [x] Tab-based navigation (Dashboard, Library, Settings)
- [x] Desktop navigation (horizontal tabs)
- [x] Mobile bottom navigation bar
- [x] Load/save history from localStorage
- [x] Load/save settings from localStorage
- [x] History CRUD operations (add, toggle favorite, delete)
- [ ] Add error boundary for crash recovery
- [ ] Add loading skeleton / splash screen

### Dashboard (Dashboard.tsx)
- [x] Research input form (Topic, Platform, Market Type, Style)
- [x] Form validation (required topic)
- [x] Loading state with spinner animation
- [x] Error message display
- [x] Empty state with call-to-action
- [x] Display result via `ResultCard`
- [x] Sync form fields when viewing history item
- [ ] Add input character limit / counter
- [ ] Add recent topics suggestion / autocomplete
- [ ] Add bulk generation (multiple topics at once)

### ResultCard (ResultCard.tsx)
- [x] Display Title with copy button
- [x] Display Description with copy button
- [x] Display Keywords as tags with "Copy CSV" button
- [x] Display Commercial Angle section (dark card)
- [x] Display Theme, Style, Buyer Intent metadata
- [x] Display AI Prompt in code-style viewer with copy button
- [x] Pro tip section for AI generation parameters
- [ ] Add "Export as JSON" or "Export as CSV" feature
- [ ] Add "Regenerate" button to re-run with same parameters
- [ ] Add individual keyword copy on click
- [ ] Add character count display for title (SEO compliance)

### History / Library (History.tsx)
- [x] Display saved generations as card grid
- [x] Search by topic and title
- [x] Filter: All / Favorites
- [x] Toggle favorite (heart icon)
- [x] Delete item with confirmation
- [x] "View Details" navigation to Dashboard
- [x] Date formatting
- [x] Empty state message
- [ ] Add sort options (date, platform, style)
- [ ] Add pagination or infinite scroll for large libraries
- [ ] Add bulk delete / bulk export
- [ ] Add delete confirmation modal (currently uses `window.confirm` in Settings)

### Settings (Settings.tsx)
- [x] Language output selector (English / Thai)
- [x] Default style selector
- [x] Default platform selector
- [x] API configuration info display
- [x] Clear all history button with confirmation
- [ ] Add theme mode (light/dark)
- [ ] Add export/import settings & history (backup/restore)
- [ ] Add API key input field (currently env-only)

### UI/UX
- [x] Responsive layout (mobile + desktop)
- [x] Tailwind CSS styling with Indigo color scheme
- [x] Smooth animations (fade-in, slide-in)
- [x] Consistent card-based design system
- [ ] Add dark mode support
- [ ] Add toast notifications (instead of inline messages)
- [ ] Improve accessibility (ARIA labels, keyboard navigation)
- [ ] Add PWA support (offline mode, installable)

### Testing & Quality
- [ ] Add unit tests (Vitest / Jest)
- [ ] Add component tests (React Testing Library)
- [ ] Add E2E tests (Playwright / Cypress)
- [ ] Add TypeScript strict mode
- [ ] Performance audit (Lighthouse)

### Deployment & DevOps
- [x] Vite build configuration
- [ ] Add CI/CD pipeline (GitHub Actions)
- [ ] Add production environment configuration
- [ ] Add error monitoring (Sentry or similar)
- [ ] Add analytics integration

---

## 7. Known Limitations

1. **localStorage only** — ข้อมูลหายเมื่อล้าง Browser data ไม่มี backend/database
2. **No authentication** — ไม่มีระบบ login เหมาะสำหรับ solo creator เท่านั้น
3. **API Key ใน Environment** — ไม่สามารถเปลี่ยน API key ผ่าน UI ได้
4. **No offline support** — ต้องเชื่อมต่อ internet เพื่อใช้ Gemini API
5. **Tailwind via CDN** — ยังไม่ได้ install เป็น dependency อย่างเป็นทางการ

---

## 8. Future Roadmap

| Priority | Feature                                           |
| -------- | ------------------------------------------------- |
| High     | Export ผลลัพธ์เป็น CSV/JSON สำหรับ upload ขึ้น platform |
| High     | Regenerate button พร้อมปรับ parameter               |
| Medium   | Dark mode                                         |
| Medium   | Backend + Database (Supabase/Firebase)             |
| Medium   | User authentication สำหรับ multi-user              |
| Low      | Batch generation (หลาย topics พร้อมกัน)              |
| Low      | Analytics dashboard (keyword performance tracking) |
| Low      | Browser extension สำหรับ copy metadata ลง platform   |
