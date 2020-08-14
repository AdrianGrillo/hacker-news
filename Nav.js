import React from 'react'
import { ThemeConsumer } from '../contexts/Themes'
import { NavLink } from 'react-router-dom'

const activeStyle = {
    content: {
        color: 'rgb(187, 46, 31)'
    }
}

export default function Nav() {
    return (
        <div>
            <ThemeConsumer>
                {({ theme, toggleTheme }) => (
                    <nav className='row space-between'>
                        <ul className='row nav'>
                            <li>
                                <NavLink
                                    to='/'
                                    exact activeStyle={activeStyle.content}
                                    className='nav-link'
                                >
                                    Top
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to='/new'
                                    exact activeStyle={activeStyle.content}
                                    className='nav-link'
                                >
                                    New
                                </NavLink>
                            </li>
                        </ul>
                        <button
                            className='btn-clear'
                            style={{ fontSize: 30 }}
                            onClick={toggleTheme}
                        >
                            {theme === 'light' ? '🔦' : '💡'}
                        </button>
                    </nav>
                )}
            </ThemeConsumer>
        </div >
    )
}