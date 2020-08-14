import React from 'react'
import PostMetaInfo from './PostMetaInfo'

export default function Comment({ comment }) {
    return (
        <div className='comment'>
            <PostMetaInfo
                by={comment.by}
                id={comment.id}
                time={comment.time}
            />
            <p dangerouslySetInnerHTML={{ __html: comment.text }} />
        </div>
    )
}