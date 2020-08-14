import React from 'react'
import queryString from 'query-string'
import { fetchUser, fetchPosts } from '../utility/api'
import Loading from './Loading'
import { formatDate } from '../utility/helpers'
import PostsList from './PostsList'

export default class User extends React.Component {
    state = {
        user: null,
        loadingUser: true,
        posts: null,
        loadingPosts: true,
        error: null
    }

    componentDidMount() {
        const { id } = queryString.parse(this.props.location.search)

        fetchUser(id)
            .then((user) => {
                this.setState({ user, loadingUser: false })
                return fetchPosts(user.submitted.slice(0, 30))
            })
            .then((posts) => this.setState({ posts, loadingPosts: false }))
            .catch(({ message }) => this.setState({
                error: message,
                loadingUser: false,
                loadingPosts: false
            }))
    }

    render() {
        const { user, posts, loadingUser, loadingPosts, error } = this.state

        if (error) {
            return <p className='center-text error'>{error}</p>
        }

        return (
            <div>
                {loadingUser === true
                    ? <Loading text='Loading User' />
                    : <div>
                        <h1 className='header'>{user.id}</h1>
                        <div className='meta-info-light'>
                            <span>joined <b>{formatDate(user.created)}</b></span>
                            <span>has <b>{user.karma.toLocaleString()}</b> karma</span>
                        </div>
                        <p dangerouslySetInnerHTML={{ __html: user.about }} />
                    </div>
                }

                {loadingPosts === true
                    ? loadingUser === false && <Loading text='Loading Posts' />
                    : <div>
                        <h2>Posts</h2>
                        <PostsList posts={posts} />
                    </div>
                }
            </div>
        )
    }
}
