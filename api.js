const api = 'https://hacker-news.firebaseio.com/v0/'
const json = '.json?print=pretty'

function removeDead(posts) {
    return posts.filter(Boolean).filter(({ dead }) => dead !== true)
}

// don't know why this function filters Boolean while the other don't

function removeDeleted(posts) {
    return posts.filter(({ deleted }) => deleted !== true)
}

function onlyComments(posts) {
    return posts.filter(({ type }) => type === 'comment')
}

function onlyPosts(posts) {
    return posts.filter(({ type }) => type === 'story')
}

export function fetchItem(id) {
    return fetch(`${api}/item/${id}${json}`)
        .then((res) => res.json())
}

// this function is a promise that will prompt the API for the object with the same ID
// that's being passed to it

export function fetchComments(ids) {
    return Promise.all(ids.map(fetchItem))
        .then((comments) => removeDeleted(onlyComments(removeDead(comments))))
}

// this function will map the ids to the fetchItem function 50 times and filter everything
// except for comments

export function fetchMainPosts(type) {
    return fetch(`${api}/${type}stories${json}`)
        .then((res) => res.json())
        .then((ids) => {
            if (!ids) {
                throw new Error(`There was a problem fetching ${type} posts`)
            }
            return ids.slice(0, 50)
        })
        .then((ids) => Promise.all(ids.map(fetchItem)))
        .then((posts) => removeDeleted(onlyPosts(removeDead(posts))))
}

// this function prompts the API for a specific type of post then takes the ids from the first 50
// it passes each of those ids to fetchItem 50 times and resolves them all at once using Promise.all
// then filters everything except for posts

export function fetchUser(id) {
    return fetch(`${api}/user/${id}${json}`)
        .then((res) => res.json())
}

export function fetchPosts(ids) {
    return Promise.all(ids.map(fetchItem))
        .then((posts) => removeDeleted(onlyPosts(removeDead(posts))))
}