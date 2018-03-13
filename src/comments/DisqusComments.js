import React from 'react'
const DISQUS_CONFIG = ['shortname', 'identifier', 'title', 'url', 'category_id', 'onNewComment', 'language']
let __disqusAdded = false
/* global DISQUS */

function copyProps(context, props) {
    const {
        onNewComment,
        language,
        ...rest // Those props have to be set on context.page
    } = props

    for (const prop in rest) {
        context.page[prop] = rest[prop]
    }

    // Setting the language - if none is provided, the default one is used
    context.language = language

    if (onNewComment) {
        context.callbacks = {
            onNewComment: [onNewComment]
        }
    }
}

class DisqusComments extends React.Component {
    componentDidMount() {
        this.loadDisqus()
    }

    componentDidUpdate() {
        this.loadDisqus()
    }

    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.identifier !== this.props.identifier
    }

    render() {
        const props = Object.keys(this.props).reduce(
            (memo, key) => (DISQUS_CONFIG.some(config => config === key) ? memo : { ...memo, [key]: this.props[key] }),
            {}
        )

        return (
            <div {...props}>
                <div id="disqus_thread" />
            </div>
        )
    }

    addDisqusScript() {
        if (__disqusAdded) {
            return
        }

        const child = (this.disqus = document.createElement('script'))
        const parent = document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]

        child.async = true
        child.type = 'text/javascript'
        child.src = '//' + this.props.shortname + '.disqus.com/embed.js'

        parent.appendChild(child)
        __disqusAdded = true
    }

    loadDisqus() {
        const props = {}

        // Extract Disqus props that were supplied to this component
        DISQUS_CONFIG.forEach(prop => {
            // prop "shortname" is only necessary for loading the script, not for the config itself
            if (prop !== 'shortname' && !!this.props[prop]) {
                props[prop] = this.props[prop]
            }
        })

        // If Disqus has already been added, reset it
        if (typeof DISQUS !== 'undefined') {
            console.log('DISQUS.reset')
            DISQUS.reset({
                reload: true,
                config: function() {
                    copyProps(this, props)
                    this.page.url = window.location.href
                }
            })
        } else {
            // Otherwise add Disqus to the page
            window.disqus_config = function() {
                copyProps(this, props)
            }
            this.addDisqusScript()
        }
    }
}

export default DisqusComments
