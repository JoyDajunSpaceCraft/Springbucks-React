import React, { Component } from 'react'
import Comment from './Comment'
import PropTypes from 'prop-types'
class CommentList extends Component {
  static defaultProps = {
    comment:[]
  }

  static propTypes = {
    comments:PropTypes.array,
    onDeleteComment:PropTypes.func
  }

  handleDeleteComment(index){
    //如果父层 App将 onDeleteComment方法传下来 而且有值
    if (this.props.onDeleteComment){
      this.props.onDeleteComment(index)
    }
  }

  render() {
    // const comments = [
    //   {username: 'Jerry', content: 'Hello'},
    //   {username: 'Tomy', content: 'World'},
    //   {username: 'Lucy', content: 'Good'}
    // ]

    return (
    //   <div>
    //      {comments.map((comment, i) =><Comment comment={comment} key={i}/>
    //   )}</div>
      <div>
        {this.props.comments.map((comment, i)=>
         <Comment 
            comment={comment}
            key={i}
            index={i}
            onDeleteComment={this.handleDeleteComment.bind(this)}/> 
        )}
      </div>

    )

  }
}

export default CommentList