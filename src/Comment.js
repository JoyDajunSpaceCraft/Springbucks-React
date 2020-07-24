import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Comment extends Component {

    static propsTyeps = {
        comment: PropTypes.object.isRequired,//comment是object类型的
        onDeleteComment: PropTypes.func,
        index:PropTypes.number
    }

    constructor() {
        super()
        this.state={timeString:''}
    }

    componentWillMount(){
        this._updateTimeString()
        this._timer = setInterval(//设定定时器 每5秒刷新页面
            this._updateTimeString.bind(this),
            5000
        )
    }

    componentWillUnmount(){
        clearInterval(this._timer)
    }

    _updateTimeString(){
        const comment = this.props.comment
        const duration = (+Date.now() - comment.createdTime) / 1000 // +相当于.valueOf();
        let N = 0
        //模板字符串（template string）是增强版的字符串，用反引号（`）标识。
        //它可以当作普通字符串使用，也可以用来定义多行字符串，或者在字符串中嵌入变量。
        duration > 60 ? N = Math.round(duration/60): N = Math.round(Math.max(duration, 1))
        this.setState({
            // ${}包裹一个变量或者表达式
            timeString: duration > 60
            ? `${N} 分钟前`
            :`${N} 秒前`
        })
    }
    _getProcessedContent (content) {
        return content
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;")
        .replace(/`([\S\s]+?)`/g, '<code>$1</code>')
    }

    handleDeleteComment (){
        if(this.props.onDeleteComment){
            this.props.onDeleteComment(this.props.index)
        }
    }

    render() {
        const {comment} = this.props
        
        return (
            <div className='comment'>
                <div className='comment-user'>
                    <span className='comment-username'>
                        {comment.username} </span>：
                </div>
                <p dangerouslySetInnerHTML={{
                    __html:this._getProcessedContent(comment.content)
                }}/>
                <span className='comment-createdtime'>
                    {this.state.timeString}
                </span>
                <span 
                    onClick={this.handleDeleteComment.bind(this)}
                    className='comment-delete'>
                    Delete
                </span>
            </div>
        )
    }
}


export default Comment