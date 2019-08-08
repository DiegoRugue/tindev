import React, { useState } from 'react'
import logo from '../img/logo.svg'
import api from '../services/api'
import './Login.css'

export default function Login({ history }) {
    const [ username, setUsername ] = useState('');

    async function handleSubimit(e) {
        e.preventDefault()

        const response = await api.post('/dev', { username })

        const { _id } = response.data

        history.push(`/dev/${_id}`)
    }

    return (
        <div className="login-container">
            <form onSubmit={handleSubimit}>
                <img src={logo} alt="Tindev" />
                <input 
                    placeholder="Entre com seu usuário do GitHub"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                />
                <button type="submit">Entrar</button>
            </form>
        </div>
    )
}