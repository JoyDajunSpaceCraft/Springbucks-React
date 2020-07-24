import React,{Component} from 'react'
import ReactDOM from 'react-dom'
import CommentApp from './CommentApp'
import './index.css'

ReactDOM.render(
  <CommentApp />,
  document.getElementById('root')
)
// class Clock extends Component {
//   constructor () {
//     super()
//     this.state = {
//       date: new Date()
//     }
//   }
//   componentWillMount () {
//       this.timer = setInterval(() => {
//         this.setState({ date: new Date() })
//       }, 1000)
//     }
//   componentWillUnmount (){
//     clearInterval(this.timer)
//   }

//   render () {
//     return (
//       <div>
//         <h1>
//           <p>现在的时间是</p>
//           {this.state.date.toLocaleTimeString()}
//         </h1>
//       </div>
//     )
//   }
// }
// class Index extends Component {

//   handleShowOrHide (){
//     this.setState({
//       isShowClick: !this.state.isShowClick
//     })
//   }

//   render () {
//     return (
//       <div>
//         {this.state.isShowClick ? <Clock /> : null}
//         <button onClick={this.handleShowOrHide.bind(this)}>
//           show or hide clickss
//         </button>
//       </div>
//     )
//   }
// }

// ReactDOM.render(
//   <Index />,
//   document.getElementById('root')
// )