# Node Frontend + Tailwind + HTML

Dự án mẫu cho frontend HTML thuần, cấu hình Tailwind CSS bằng CLI và PostCSS. Dev server dùng `live-server`.

## Yêu cầu
- Node.js >= 18
- npm >= 9

## Cài đặt
```bash
npm install
```

## Chạy Dev (watch CSS + live reload)
```bash
npm run dev
# Mở: http://localhost:5173
```

## Build CSS cho production
```bash
npm run build
```

## Cấu trúc
```
.
├─ public/
│  ├─ assets/
│  │  └─ tailwind.css   # file build ra
│  └─ index.html
├─ src/
│  └─ styles/
│     └─ input.css      # nơi import @tailwind
├─ package.json
├─ tailwind.config.js
├─ postcss.config.js
└─ README.md
```

## Gợi ý mở rộng
- Thêm `eslint` + `prettier`
- Triển khai lên GitHub Pages / Vercel / Netlify (upload thư mục `public/`)
