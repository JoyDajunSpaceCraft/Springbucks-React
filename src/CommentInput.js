import React, { Component } from 'react'
import PropTypes from 'prop-types'
//编写顺序
// static 开头的类属性，如 defaultProps、propTypes。
// 构造函数，constructor。
// getter/setter（还不了解的同学可以暂时忽略）。
// 组件生命周期。
// _ 开头的私有方法。
// 事件监听方法，handle*。
// render*开头的方法，有时候 render() 方法里面的内容会分开到不同函数里面进行，这些函数都以 render* 开头。
// render() 方法。
class CommentInput extends Component {
  static propTypes={
    onSubmit: PropTypes.func
  }
  constructor (){
    super()
    this.state={
      username:'',
      content:''
    }
  }

  componentWillMount (){
    this._loadUsername()
  }

 
  componentDidMount () {
    this.textarea.focus()
  }


  _loadUsername (){
    const username = localStorage.getItem('username')
    if (username){
      this.setState({
        username: username
      })
    }
  }

  _saveUsername (username) {
    //将username作为localStorage 存入
    //所有私有方法都以 _ 开头
    localStorage.setItem('username', username)
  }

  handleUsernameChange (event) {
    this.setState({
      username: event.target.value
    })
  }



  handleContentChange (event) {
    this.setState({
      content:event.target.value
    })
  }

  //handleSubmit 方法会判断 props 中是否传入了 onSubmit 属性。
  //有的话就调用该函数，并且把用户输入的用户名和评论数据传入该函数。
  //然后再通过 setState 清空用户输入的评论内容（但为了用户体验，保留输入的用户名）。
  handleSubmit () {
    if (this.props.onSubmit) {
      //此处用到结构思想 当点击了public后 props会载入 onSubmit 对象 
      //在 CommentApp 调用时
      // const {username, content} = this.state
      this.props.onSubmit({
        username:this.state.username,
        content: this.state.content,
        createdTime: +new Date() //+相当于.valueOf()
        })

    }

    this.setState({
      content:''
    })

  }

  handleUsernameBlur (event){
      this._saveUsername(event.target.value)
  }

  render() {
    return (
      <div className="comment-input">
        <div className="comment-field">
          <span className="comment-field-name"> Username: </span>
          <div className="comment-field-input">
            <input 
              value={this.state.username}
              onBlur={this.handleUsernameBlur.bind(this)}
              onChange={this.handleUsernameChange.bind(this)}
            />
          </div>
        </div>
        <div className='comment-field'>
          <span className='comment-field-name'>Comments：</span>
            <div className='comment-field-input'>
            <textarea
            ref={(textarea) => this.textarea = textarea}//想当于将这个textarea变为变量 在页面DOM挂载完成再执行
            value={this.state.content}
            onChange={this.handleContentChange.bind(this)} />
            </div>
        </div>
        <div className='comment-field-button'>
          <button 
            onClick={this.handleSubmit.bind(this)}>
            Public
          </button>
        </div>
      </div>
      
    )
  }
}

export default CommentInput