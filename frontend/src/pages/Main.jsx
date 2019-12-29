import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import logo from '../img/logo.svg'
import like from '../img/like.svg'
import dislike from '../img/dislike.svg'
import './Main.css'
import api from '../services/api'

export default function Main({ match }) {
    const [ users, setUsers ] = useState([])

    useEffect(() => {
        async function loadUsers() {
            const response = await api.get('/dev', {
                headers: {
                    user: match.params.id
                }
            })

            setUsers(response.data);
        }
        loadUsers()
    }, [match.params.id])

    async function handleLike(id) {
        await api.post(`/dev/${id}/like`, null, {
            headers: {
                user: match.params.id
            }
        })
        setUsers(users.filter(user => user._id !== id))
    }

    async function handleDislike(id) {
        await api.post(`/dev/${id}/dislike`, null, {
            headers: {
                user: match.params.id
            }
        })
        setUsers(users.filter(user => user._id !== id))
    }

    return (
        <div className="main-container">
            <Link to="/">
                <img src={logo} alt="Tindev" />
            </Link>
            { users.length > 0 ? (
                <ul>
                    { users.map(user => (
                        <li key={ user._id }>
                            <img src={user.avatar} alt={user.name} />
                            <footer>
                                <strong>{user.name}</strong>
                                <p>{user.bio}</p>
                            </footer>

                            <div className="buttons">
                                <button type="submit">
                                    <img src={dislike} alt="Dislike" onClick={() => handleDislike(user._id)} />
                                </button>
                                <button type="submit">
                                    <img src={like} alt="Like" onClick={() => handleLike(user._id)} />
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
                ) : (
                    <div className="empty">Acabou :(</div>
                )
            } 
        </div>
    )
}