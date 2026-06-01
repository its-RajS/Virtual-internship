# EmpBoard — Employee Management Dashboard

A modern, responsive CRUD-based Employee Management Dashboard built with **Next.js 15**, **TypeScript**, and **Tailwind CSS**.

## ✨ Features

- **Dashboard Overview** — Real-time stats showing total, active, and inactive employees
- **Full CRUD** — Create, Read, Update, and Delete employees
- **Live Search** — Search employees by name or email instantly
- **Form Validation** — Client-side validation with inline error messages
- **Delete Confirmation** — Safety modal before destructive actions
- **Responsive Design** — Optimized for mobile, tablet, and desktop
- **Empty State** — Clean fallback UI when no employees exist
- **Modern UI** — Linear/Vercel-inspired minimal design with subtle animations

## 🛠 Tech Stack

| Technology     | Purpose               |
| -------------- | --------------------- |
| Next.js 15     | React framework       |
| TypeScript     | Type safety           |
| Tailwind CSS   | Styling               |
| React State    | State management      |

## 📁 Project Structure

```
src/
├── app/
│   ├── globals.css        # Global styles & animations
│   ├── layout.tsx         # Root layout with Inter font
│   └── page.tsx           # Main dashboard page (CRUD logic)
├── components/
│   ├── dashboard-cards.tsx # Overview stat cards
│   ├── employee-form.tsx  # Add/Edit modal form
│   ├── employee-table.tsx # Responsive table + mobile cards
│   └── search-bar.tsx     # Search input + add button
├── data/
│   └── employees.ts       # Seed/dummy employee data
└── types/
    └── employee.ts        # TypeScript interfaces
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
# Clone the repository
git clone <repo-url>
cd challenge1/day1

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## 📸 Screenshots

_Add screenshots here after running the project._

## 📄 License

MIT
