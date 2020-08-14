import React from 'react'
import { fetchItem, fetchComments } from '../utility/api'
import queryString from 'query-string'
import { Link } from 'react-router-dom'
import Title from './Title'
import PostMetaInfo from './PostMetaInfo'
import Comment from './Comment'
import Loading from './Loading'

export default class Post extends React.Component {
    state = {
        loadingPost: true,
        post: null,
        loadingComments: true,
        comment: null,
        error: null
    }

    componentDidMount() {
        const { id } = queryString.parse(this.props.location.search)

        fetchItem(id)
            .then((post) => {
                this.setState({ post, loadingPost: false })
                return fetchComments(post.kids || [])
            })
            .then((comment) => this.setState({ comment, loadingComments: false }))
            .catch(({ message }) => this.setState({
                error: message,
                loadingPost: false,
                loadingComments: false
            }))
    }

    render() {
        const { post, loadingPost, comment, loadingComments, error } = this.state

        if (error) {
            <p className='center-text error'>{error}</p>
        }

        return (
            <div>
                {loadingPost === true
                    ? <Loading text='Loading Post' />
                    : <div>
                        <h1 className='header'>
                            <Title title={post.title} url={post.url} id={post.id} />
                        </h1>
                        <div className='meta-info-light'>
                            <PostMetaInfo
                                by={post.by}
                                time={post.time}
                                id={post.id}
                                descendants={post.kids.length}
                            />
                        </div>
                    </div>
                }

                {loadingComments === true
                    ? <Loading text='Loading Comments' />
                    : <div>
                        {comment.map((comment) => (
                            <Comment
                                comment={comment}
                                id={comment.id}
                            />
                        ))}
                    </div>
                }

            </div>
        )
    }
}