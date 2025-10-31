import { useState, useEffect } from 'react'
import './App.css'
import { supabase } from './lib/supabase'
import { Message } from './types'

function App() {
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [loading, setLoading] = useState(false)

  // Загрузка сообщений при монтировании компонента
  useEffect(() => {
    loadMessages()
    
    // Подписка на изменения в реальном времени
    const channel = supabase
      .channel('messages-channel')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'messages' },
        () => {
          loadMessages()
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  const loadMessages = async () => {
    try {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(10)

      if (error) throw error
      setMessages(data || [])
    } catch (error) {
      console.error('Ошибка загрузки сообщений:', error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage.trim()) return

    setLoading(true)
    try {
      const { error } = await supabase
        .from('messages')
        .insert([{ text: newMessage }])

      if (error) throw error
      setNewMessage('')
    } catch (error) {
      console.error('Ошибка отправки сообщения:', error)
      alert('Не удалось отправить сообщение')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="app">
      <div className="container">
        <header>
          <h1>🚀 CI/CD Test Project</h1>
          <p>React + TypeScript + Node.js + Supabase</p>
        </header>

        <div className="card">
          <h2>Сообщения из Supabase</h2>
          <form onSubmit={handleSubmit} className="message-form">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Введите сообщение..."
              disabled={loading}
            />
            <button type="submit" disabled={loading}>
              {loading ? 'Отправка...' : 'Отправить'}
            </button>
          </form>

          <div className="messages">
            {messages.length === 0 ? (
              <p className="empty">Пока нет сообщений</p>
            ) : (
              messages.map((message) => (
                <div key={message.id} className="message">
                  <p>{message.text}</p>
                  <span className="timestamp">
                    {new Date(message.created_at).toLocaleString('ru-RU')}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="info-card">
          <h3>Информация о проекте</h3>
          <ul>
            <li>✅ Frontend: React 18 + TypeScript + Vite</li>
            <li>✅ Backend: Node.js + Express</li>
            <li>✅ База данных: Supabase (PostgreSQL)</li>
            <li>✅ CI/CD: GitHub Actions</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default App

