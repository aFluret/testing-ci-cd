import { describe, it, expect } from 'vitest'

// Простой тест для демонстрации
describe('Backend Tests', () => {
  it('должен выполнить базовую проверку', () => {
    expect(1 + 1).toBe(2)
  })

  it('должен проверить работу строк', () => {
    const message = 'CI/CD Test'
    expect(message).toContain('CI/CD')
  })
})

