# 📚 Holy Writ High School and Junior College – Quiz App 🎓

> "KAUN BANEGA HOLY WRIT HIGH SCHOOL AND JUNIOR COLLEGE VIJETA 2025"

An engaging, audio-visual interactive quiz application designed specifically for Holy Writ High School and Junior College. This application is used for classroom competitions across different grades and groups, managed by teachers with complete control over quiz flow, results, and announcements.

---

## 🌟 Features

### 🏫 Welcome Page
- Full-screen welcome page with **school logo**.
- Background: HD image of the school campus.
- Auto-playing **introductory audio**: _"Welcome to Holy Writ High School and Junior College"_.
- “Enter” button navigates to the quiz introduction.

### 🎤 Quiz Introduction
- Displays event title: **"Kaun Banega Holy Writ High School Vijeta 2025"**.
- Plays audio welcome message _(no text visible)_ welcoming **students, teachers, coordinators, and principal**.
- Shows the rules of the quiz clearly.

### 🔐 Teacher Login
- Minimal login with password: `123`
- Prevents unauthorized access to quiz management.

### 🎯 Group Selection
- Teachers can select from multiple class groups:
  - **Class 1st to 2nd (Groups A–D)**
  - **Class 3rd to 5th (Groups A–D)**
  - **Class 6th to 8th (Groups A–D)**
  - **Class 9th to 12th (Groups A–D)**

### ❗ Group Quiz Lock
- If a group has already taken the quiz, a message displays:  
  ❌ _“Quiz already attempted by this group.”_

### 🚀 Start Quiz Flow
- Audio cue: _“अब ध्यान दीजिए, पहला प्रश्न यह रहा आपकी स्क्रीन पर”_ plays before each question.
- Questions include:
  - Image-based
  - Listening-based
  - Reading-based
  - Grammar-based
  - General Knowledge

### 📊 Result Management
- Results are stored **class-wise**.
- **Students don't see the result** directly.
- **Only teachers** can access and announce final scores through the dashboard.

### 📈 Smart Question Scaling (AI)
- Future-ready design: uses AI for dynamic difficulty adjustment based on group performance (can be extended with Gemini/Genkit API).

---

## 🛠 Tech Stack

| Stack        | Tech Used                      |
|--------------|--------------------------------|
| Frontend     | Next.js, TypeScript            |
| Styling      | Tailwind CSS                   |
| Audio/Media  | HTML5 Audio + Static Assets    |
| Backend (basic) | In-app storage / local DB   |
| Fonts        | Alegreya (serif)               |
| Deployment   | Vercel / GitHub Pages compatible|

---

## 🖼️ UI/UX Details

- Logo URL:  
  `https://mychildmate.in/AdmissionForm/img/holywritlogo_512_512.png`

- Background Image:  
  `https://www.edustoke.com/assets/uploads-new/916b0d49-5b7f-4d79-94c1-a45185516924.jpg`

- Fonts: **'Alegreya'**, for an elegant academic look.

- Animations: Subtle transitions between pages (e.g., fade-in, slide).

---

## 🚀 Getting Started (Local Setup)

```bash
# 1. Clone the repository
git clone https://github.com/YOUR-USERNAME/holy-writ-quiz-app.git
cd holy-writ-quiz-app

# 2. Install dependencies
npm install

# 3. Run the development server
npm run dev
