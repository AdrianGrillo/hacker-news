import React from 'react'
import PropTypes from 'prop-types'

const styles = {
    content: {
        fontSize: '35px',
        position: 'absolute',
        left: 0,
        right: 0,
        marginTop: '20px',
        textAlign: 'center'
    }
}

export default class Loading extends React.Component() {
    state = {
        content: this.props.text
    }

    static propTypes = {
        text: PropTypes.string.isRequired,
        speed: PropTypes.number.isRequired
    }

    static defaultProps = {
        text: 'Loading',
        speed: 300
    }

    componentDidMount() {
        const { text, speed } = this.props

        this.interval = window.setInterval(this.setState(
            ({ content }) => ({
                content: content === text + '...'
                    ? text
                    : text + '.'
            })
        ), speed)
    }

    componentWillUnmount() {
        this.interval = window.clearInterval()
    }

    render() {
        return (
            <p
                className={styles.content}
            >
                {this.state.content}
            </p>
        )
    }
}