# 🛠️ Пошаговая инструкция по настройке

## Шаг 1: Подготовка репозитория

1. Создайте новый репозиторий на GitHub
2. Клонируйте его локально:
   ```bash
   git clone <ваш-репозиторий>
   cd СICD
   ```

3. Скопируйте все файлы проекта в папку репозитория

## Шаг 2: Настройка Supabase

### 2.1 Создание проекта

1. Зайдите на [supabase.com](https://supabase.com)
2. Создайте аккаунт (если еще нет)
3. Нажмите "New Project"
4. Заполните данные:
   - Name: `cicd-test-project`
   - Database Password: создайте надежный пароль (сохраните его!)
   - Region: выберите ближайший регион
5. Дождитесь создания проекта (2-3 минуты)

### 2.2 Настройка базы данных

1. В левом меню выберите **SQL Editor**
2. Нажмите **New Query**
3. Скопируйте содержимое файла `supabase-setup.sql`
4. Нажмите **Run** (или F5)
5. Убедитесь, что запрос выполнен успешно

### 2.3 Получение ключей API

1. Перейдите в **Settings** → **API**
2. Найдите секцию **Project URL** - скопируйте это значение
3. Найдите секцию **Project API keys**
   - Скопируйте `anon public` ключ (для frontend)
   - Скопируйте `service_role` ключ (для backend, храните в секрете!)

## Шаг 3: Настройка переменных окружения

### 3.1 Frontend переменные

1. Создайте файл `frontend/.env`:
   ```bash
   cd frontend
   cp .env.example .env
   ```

2. Откройте `frontend/.env` и заполните:
   ```env
   VITE_SUPABASE_URL=https://ваш-проект.supabase.co
   VITE_SUPABASE_ANON_KEY=ваш-anon-ключ
   ```

### 3.2 Backend переменные

1. Создайте файл `backend/.env`:
   ```bash
   cd ../backend
   cp .env.example .env
   ```

2. Откройте `backend/.env` и заполните:
   ```env
   PORT=3001
   SUPABASE_URL=https://ваш-проект.supabase.co
   SUPABASE_SERVICE_ROLE_KEY=ваш-service-role-ключ
   ```

## Шаг 4: Установка зависимостей

```bash
# Вернитесь в корень проекта
cd ..

# Установите зависимости корневого проекта
npm install

# Установите зависимости всех workspace
npm run install:all
```

## Шаг 5: Локальное тестирование

### 5.1 Запуск backend

```bash
cd backend
npm run dev
```

Должно появиться:
```
🚀 Backend server running on http://localhost:3001
```

### 5.2 Запуск frontend

Откройте новое окно терминала:

```bash
cd frontend
npm run dev
```

Должно появиться:
```
  VITE v5.x.x  ready in xxx ms

  ➜  Local:   http://localhost:3000/
```

### 5.3 Проверка работы

1. Откройте браузер: http://localhost:3000
2. Попробуйте отправить сообщение
3. Сообщение должно появиться в списке
4. Проверьте в Supabase Dashboard → Table Editor → messages, что сообщение сохранилось

## Шаг 6: Настройка GitHub Actions

### 6.1 Добавление секретов в GitHub

1. Перейдите в ваш репозиторий на GitHub
2. Откройте **Settings** → **Secrets and variables** → **Actions**
3. Нажмите **New repository secret**
4. Добавьте следующие секреты:

   **VITE_SUPABASE_URL**
   - Name: `VITE_SUPABASE_URL`
   - Secret: ваш Supabase Project URL

   **VITE_SUPABASE_ANON_KEY**
   - Name: `VITE_SUPABASE_ANON_KEY`
   - Secret: ваш Supabase anon public key

### 6.2 Тестирование CI/CD

1. Commit и push все изменения:
   ```bash
   git add .
   git commit -m "Initial commit: CI/CD test project setup"
   git push origin main
   ```

2. Перейдите на вкладку **Actions** в GitHub
3. Дождитесь завершения пайплайна
4. Проверьте, что все jobs прошли успешно (зеленые галочки)

## Шаг 7: Тестирование CI/CD процесса

### 7.1 Тест Pull Request

1. Создайте новую ветку:
   ```bash
   git checkout -b test/ci-cd-workflow
   ```

2. Внесите небольшое изменение (например, в `frontend/src/App.tsx`):
   ```tsx
   <h1>🚀 CI/CD Test Project - Updated!</h1>
   ```

3. Commit и push:
   ```bash
   git add .
   git commit -m "test: проверка CI/CD пайплайна"
   git push origin test/ci-cd-workflow
   ```

4. Создайте Pull Request:
   - На GitHub нажмите "Compare & pull request"
   - Пайплайн автоматически запустится

5. Проверьте вкладку **Checks** в PR - должен появиться статус CI/CD

### 7.2 Тест деплоя

1. После успешного merge PR в `main`
2. Пайплайн автоматически запустится снова
3. Job `deploy` выполнится (в текущей версии это только демонстрация)

## ✅ Проверочный список

- [ ] Supabase проект создан
- [ ] База данных настроена (таблица `messages` создана)
- [ ] Переменные окружения настроены для frontend и backend
- [ ] Зависимости установлены
- [ ] Проект запускается локально
- [ ] Frontend работает и подключается к Supabase
- [ ] Backend API отвечает на запросы
- [ ] GitHub секреты добавлены
- [ ] CI/CD пайплайн проходит успешно

## 🐛 Решение проблем

### Проблема: Frontend не подключается к Supabase

**Решение:**
- Проверьте, что переменные в `frontend/.env` правильно заполнены
- Убедитесь, что файл называется именно `.env` (не `.env.example`)
- Перезапустите dev сервер после изменения `.env`

### Проблема: CI/CD пайплайн падает на сборке

**Решение:**
- Проверьте, что секреты в GitHub правильно добавлены
- Убедитесь, что имена секретов точно совпадают с теми, что в `ci-cd.yml`
- Проверьте логи в GitHub Actions для деталей ошибки

### Проблема: Backend не запускается

**Решение:**
- Проверьте, что порт 3001 свободен
- Убедитесь, что `backend/.env` файл существует и правильно заполнен
- Проверьте логи на наличие ошибок

---

**Готово! Проект настроен и готов к работе.** 🎉

