import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import App from './App'

// Простой тест для демонстрации
describe('App', () => {
  it('рендерит заголовок', () => {
    render(<App />)
    const heading = screen.getByText(/CI\/CD Test Project/i)
    expect(heading).toBeDefined()
  })

  it('отображает информацию о стеке', () => {
    render(<App />)
    const stackInfo = screen.getByText(/React 18 \+ TypeScript \+ Vite/i)
    expect(stackInfo).toBeDefined()
  })
})

