import React from 'react'
import { fetchItem, fetchMainPosts, fetchPosts } from '../utility/api'

export default class Top extends React.Component {
    state = {
        posts: null,
        error: null,
        loading: true
    }

    componentDidMount() {
        this.handleFetch()
    }

    render() {
        return (
            <p>{this.state.posts}</p>
        )
    }
}