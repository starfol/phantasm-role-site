import { useEffect, useState } from 'react'
import { supabase } from './supabaseClient'

function App() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function initVK() {
      try {
        // Инициализация VK Bridge
        await window.vkBridge.send('VKWebAppInit')

        // Получаем информацию о пользователе
        const userInfo = await window.vkBridge.send('VKWebAppGetUserInfo')
        
        setUser(userInfo)
        console.log('VK User:', userInfo)

        // Можно сразу сохранить vk_id в Supabase позже
      } catch (err) {
        console.error('VK Auth error:', err)
        setError(err.message || 'Не удалось получить данные VK')
      } finally {
        setLoading(false)
      }
    }

    initVK()
  }, [])

  if (loading) {
    return <div style={{ padding: '50px', textAlign: 'center' }}>Загрузка авторизации VK...</div>
  }

  return (
    <div style={{ 
      padding: '40px', 
      textAlign: 'center', 
      fontFamily: 'system-ui',
      backgroundColor: '#0a0a0a',
      color: '#fff',
      minHeight: '100vh'
    }}>
      <h1>Phantasm Role</h1>

      {error ? (
        <div style={{ color: 'red', margin: '20px 0' }}>
          Ошибка: {error}<br />
          Убедись, что открываешь приложение внутри ВКонтакте
        </div>
      ) : user ? (
        <div>
          <img 
            src={user.photo_200 || user.photo_100} 
            alt="Аватар" 
            style={{ width: '120px', height: '120px', borderRadius: '50%', marginBottom: '20px' }}
          />
          <h2>Привет, {user.first_name} {user.last_name}!</h2>
          <p>VK ID: {user.id}</p>
          
          <div style={{ marginTop: '40px' }}>
            <p>Авторизация через VK прошла успешно.</p>
            <p>Можешь начинать создавать профиль и сюжеты.</p>
          </div>
        </div>
      ) : (
        <p>Не удалось получить данные пользователя.</p>
      )}
    </div>
  )
}

export default App