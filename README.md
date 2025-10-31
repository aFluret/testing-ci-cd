# 🚀 CI/CD Test Project

Легкий проект для тестирования возможностей CI/CD с использованием современного стека технологий.

## 📋 Стек технологий

- **Frontend**: React 18 + TypeScript + Vite
- **Backend**: Node.js + Express + TypeScript
- **База данных**: Supabase (PostgreSQL)
- **CI/CD**: GitHub Actions

## 🏗️ Структура проекта

```
.
├── frontend/          # React приложение
│   ├── src/
│   │   ├── App.tsx   # Главный компонент
│   │   ├── lib/      # Утилиты (Supabase клиент)
│   │   └── types/    # TypeScript типы
│   └── package.json
├── backend/          # Node.js API
│   ├── src/
│   │   └── index.ts  # Express сервер
│   └── package.json
├── .github/
│   └── workflows/
│       └── ci-cd.yml # CI/CD пайплайн
└── README.md
```

## 🚀 Быстрый старт

### 1. Клонирование и установка зависимостей

```bash
# Клонируйте репозиторий
git clone <ваш-репозиторий>
cd СICD

# Установите все зависимости
npm install
npm run install:all
```

### 2. Настройка Supabase

1. Создайте проект на [supabase.com](https://supabase.com)
2. Перейдите в SQL Editor и выполните следующий запрос для создания таблицы:

```sql
-- Создание таблицы для сообщений
CREATE TABLE messages (
  id BIGSERIAL PRIMARY KEY,
  text TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Включение Row Level Security (RLS)
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- Политика: разрешить всем читать сообщения
CREATE POLICY "Публичное чтение сообщений"
  ON messages FOR SELECT
  USING (true);

-- Политика: разрешить всем создавать сообщения
CREATE POLICY "Публичное создание сообщений"
  ON messages FOR INSERT
  WITH CHECK (true);
```

3. Получите URL и ключи проекта:
   - Перейдите в Settings → API
   - Скопируйте `Project URL` и `anon public` key

### 3. Настройка переменных окружения

#### Frontend

Создайте файл `frontend/.env`:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

#### Backend

Создайте файл `backend/.env`:

```env
PORT=3001
SUPABASE_URL=your_supabase_project_url
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

### 4. Запуск в режиме разработки

```bash
# Запустить frontend и backend одновременно
npm run dev
```

Приложение будет доступно:
- Frontend: http://localhost:3000
- Backend API: http://localhost:3001

## 📖 Как работает CI/CD

### Обзор процесса

CI/CD пайплайн автоматизирует процессы разработки:

1. **Continuous Integration (CI)** - автоматическое тестирование и сборка
2. **Continuous Deployment (CD)** - автоматический деплой после успешной сборки

### GitHub Actions пайплайн

Пайплайн находится в `.github/workflows/ci-cd.yml` и включает следующие этапы:

#### 1. Frontend Job (`frontend`)
```yaml
- Проверка кода (checkout)
- Настройка Node.js
- Установка зависимостей
- Запуск линтера
- Запуск тестов
- Сборка проекта
- Сохранение артефактов
```

#### 2. Backend Job (`backend`)
```yaml
- Проверка кода
- Настройка Node.js
- Установка зависимостей
- Запуск тестов
- Сборка проекта
- Сохранение артефактов
```

#### 3. Root Check Job (`root-check`)
```yaml
- Проверка установки всех workspace зависимостей
```

#### 4. Deploy Job (`deploy`)
```yaml
- Загружает собранные артефакты
- Выполняет деплой (в реальном проекте здесь будет деплой на сервер)
- Запускается только при push в main ветку
```

### Когда запускается пайплайн?

Пайплайн запускается автоматически при:
- **Push** в ветки `main` или `develop`
- **Pull Request** в ветки `main` или `develop`

### Настройка секретов GitHub

Для работы сборки с Supabase, добавьте секреты в настройках репозитория:

1. Перейдите в Settings → Secrets and variables → Actions
2. Добавьте следующие секреты:
   - `VITE_SUPABASE_URL` - URL вашего Supabase проекта
   - `VITE_SUPABASE_ANON_KEY` - Anon ключ Supabase

### Просмотр результатов CI/CD

1. Перейдите на вкладку **Actions** в вашем GitHub репозитории
2. Выберите последний запуск пайплайна
3. Просмотрите логи каждого job'а

## 🔧 Команды проекта

### Корневой уровень

```bash
npm run dev          # Запуск frontend и backend в режиме разработки
npm run build        # Сборка всех проектов
npm run test         # Запуск всех тестов
npm run install:all  # Установка всех зависимостей
```

### Frontend

```bash
cd frontend
npm run dev      # Запуск dev сервера (http://localhost:3000)
npm run build    # Сборка для production
npm run preview  # Просмотр production сборки
npm run lint     # Запуск линтера
npm run test     # Запуск тестов
```

### Backend

```bash
cd backend
npm run dev      # Запуск в режиме разработки с hot reload
npm run build    # Сборка TypeScript в JavaScript
npm start        # Запуск production версии
npm run test     # Запуск тестов
```

## 📝 Что делает приложение?

### Frontend

- React приложение с красивым UI
- Интеграция с Supabase для работы с базой данных
- Real-time обновления через Supabase subscriptions
- Отправка и отображение сообщений из базы данных

### Backend

- REST API на Express
- Health check endpoint (`/api/health`)
- Информационный endpoint (`/api/info`)

## 🎯 Как тестировать CI/CD?

### 1. Локальная проверка

```bash
# Убедитесь, что проект собирается
npm run build

# Проверьте линтер
cd frontend && npm run lint
```

### 2. Тестирование в GitHub

1. Создайте новую ветку:
   ```bash
   git checkout -b feature/test-cicd
   ```

2. Внесите небольшое изменение (например, добавьте комментарий в код)

3. Commit и push:
   ```bash
   git add .
   git commit -m "test: проверка CI/CD"
   git push origin feature/test-cicd
   ```

4. Создайте Pull Request в `main` ветку

5. Пайплайн запустится автоматически

6. Проверьте результаты в разделе **Actions**

### 3. Тестирование деплоя

После успешного merge PR в `main`, job `deploy` автоматически запустится.

## 🛠️ Расширение функциональности

### Добавление новых тестов

Создайте тесты в соответствующих папках:
- Frontend тесты: `frontend/src/**/*.test.tsx`
- Backend тесты: `backend/src/**/*.test.ts`

### Настройка реального деплоя

В job `deploy` можно добавить:

1. **Деплой frontend** на Vercel/Netlify:
   ```yaml
   - name: Deploy to Vercel
     uses: amondnet/vercel-action@v20
     with:
       vercel-token: ${{ secrets.VERCEL_TOKEN }}
   ```

2. **Деплой backend** на Railway/Heroku/AWS:
   ```yaml
   - name: Deploy to Railway
     run: |
       # Команды деплоя
   ```

## 📚 Полезные ссылки

- [React Documentation](https://react.dev/)
- [TypeScript Documentation](https://www.typescriptlang.org/)
- [Supabase Documentation](https://supabase.com/docs)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Vite Documentation](https://vitejs.dev/)

## 🤝 Вклад в проект

1. Fork проекта
2. Создайте feature ветку (`git checkout -b feature/amazing-feature`)
3. Commit изменения (`git commit -m 'Add amazing feature'`)
4. Push в ветку (`git push origin feature/amazing-feature`)
5. Откройте Pull Request

## 📄 Лицензия

MIT License

---

**Создано для обучения CI/CD практикам** 🚀

