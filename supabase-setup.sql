-- SQL скрипт для настройки Supabase базы данных
-- Выполните этот скрипт в SQL Editor вашего Supabase проекта

-- Создание таблицы для сообщений
CREATE TABLE IF NOT EXISTS messages (
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

-- Опционально: политика для обновления (если нужно)
-- CREATE POLICY "Публичное обновление сообщений"
--   ON messages FOR UPDATE
--   USING (true);

-- Опционально: политика для удаления (если нужно)
-- CREATE POLICY "Публичное удаление сообщений"
--   ON messages FOR DELETE
--   USING (true);

-- Создание индекса для быстрой сортировки по дате
CREATE INDEX IF NOT EXISTS idx_messages_created_at ON messages(created_at DESC);

-- Комментарии к таблице
COMMENT ON TABLE messages IS 'Таблица для хранения сообщений в CI/CD тестовом проекте';
COMMENT ON COLUMN messages.id IS 'Уникальный идентификатор сообщения';
COMMENT ON COLUMN messages.text IS 'Текст сообщения';
COMMENT ON COLUMN messages.created_at IS 'Дата и время создания сообщения';

