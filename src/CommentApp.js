import React, { Component } from 'react'
import CommentInput from './CommentInput'
import CommentList from './CommentList'
//持久化评论

class CommentApp extends Component {
  constructor (){
    super()
    this.state={
      comments:[]//CommentApp 的 state 中初始化一个数组，
      //来保存所有的评论数据，并且通过 props 把它传递给 CommentList
    }
  }

  componentWillMount (){
    this._loadComments()
  }

  _loadComments (){
    let comments = localStorage.getItem('comments')
    if(comments){
      comments = JSON.parse(comments)
      this.setState({
        comments
      })
    }
  }

  _saveComments(comments){
    localStorage.setItem('comments',JSON.stringify(comments))

  }


  //每当用户发布评论的时候，就把评论数据插入
  // this.state.comments 中，然后通过 setState 把数据更新到页面上
  handleSubmitComment (comment) {
    if (!comment) return
    if (!comment.username) return alert('请输入用户名')
    if (!comment.content) return alert('请输入评论内容')
    const comments = this.state.comments
    comments.push(comment)
    this.setState({ comments })//设置新的comment堆
    this._saveComments(comments)//保存comments到localStorage
  }

  handleDeleteComment (index){
    const comments = this.state.comments
    comments.splice(index, 1)
    this.setState({comments})
    this._saveComments(comments)
  }


  // CommentApp 中给 CommentInput 传入一个 onSubmit 属性，
  //这个属性值是 CommentApp 自己的一个方法 handleSubmitComment。
  //这样 CommentInput 就可以调用 this.props.onSubmit(…) 把数据传给 CommenApp。
  render() {
    return (
      <div className="wrapper">
        <CommentInput onSubmit={this.handleSubmitComment.bind(this)}/>
        <CommentList comments={this.state.comments}
        onDeleteComment={this.handleDeleteComment.bind(this)}/>
      </div>
    )
  }
}
export default CommentApp