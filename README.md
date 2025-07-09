# Тест-ACOOLing - Лендинг для ремонта холодильников

Современный лендинг для услуг ремонта холодильников в Санкт-Петербурге, построенный на Next.js 14 с TypeScript и Tailwind CSS.

## 🚀 Быстрый старт

### Предварительные требования

- Node.js 18+ 
- npm или yarn

### Установка

1. Клонируйте репозиторий или скопируйте файлы проекта
2. Установите зависимости:

\`\`\`bash
npm install
# или
yarn install
\`\`\`

3. Создайте файл `.env.local` на основе `.env.example`:

\`\`\`bash
cp .env.example .env.local
\`\`\`

4. Заполните переменные окружения в `.env.local`:

\`\`\`env
TELEGRAM_BOT_TOKEN=ваш_токен_бота
TELEGRAM_CHAT_ID=ваш_chat_id
\`\`\`

5. Запустите проект в режиме разработки:

\`\`\`bash
npm run dev
# или
yarn dev
\`\`\`

6. Откройте [http://localhost:3000](http://localhost:3000) в браузере

## 📁 Структура проекта

\`\`\`
├── app/
│   ├── api/submit-form/route.ts    # API для отправки форм
│   ├── globals.css                 # Глобальные стили
│   ├── layout.tsx                  # Основной layout
│   └── page.tsx                    # Главная страница
├── components/
│   ├── forms/                      # Компоненты форм
│   ├── layout/                     # Header и Footer
│   ├── sections/                   # Секции лендинга
│   └── ui/                         # UI компоненты
├── hooks/                          # Кастомные хуки
├── lib/                           # Утилиты и API функции
└── public/                        # Статические файлы
\`\`\`

## 🔧 Настройка Telegram бота

1. Создайте бота через @BotFather в Telegram
2. Получите токен бота
3. Добавьте бота в группу или получите свой chat_id
4. Укажите данные в `.env.local`

## 📦 Сборка для продакшена

\`\`\`bash
npm run build
npm run start
\`\`\`

## 🎨 Кастомизация

- Цвета и стили: `tailwind.config.ts` и `app/globals.css`
- Контент секций: файлы в `components/sections/`
- Формы: файлы в `components/forms/`
- SEO: `app/layout.tsx`

## 📱 Возможности

- ✅ Адаптивный дизайн
- ✅ SEO оптимизация
- ✅ Интеграция с Telegram
- ✅ Форматирование телефонных номеров
- ✅ Слайдер галереи
- ✅ FAQ аккордеон
- ✅ Модульная архитектура
- ✅ TypeScript
- ✅ Tailwind CSS
