import React from 'react'
import axios from 'axios'
import MessageBox from './MessageBox'
import _ from 'lodash'

class MessagesList extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      messageList: [],
      token: ''
    }
  }
  getMessages () {
    let url = 'https://message-list.appspot.com/messages?limit=10'
    if (this.state.token !== '') {
      url += `&pageToken=${this.state.token}`
    }
    axios.get(url)
      .then((res) => {
        const oldMessages = this.state.messageList
        const newMessages = oldMessages.concat(res.data.messages)
        this.setState({
          messageList: newMessages,
          token: res.data.pageToken
        })
      })
      .catch((res) => {
        console.error(res)
      })
    }
  deleteMessage (id) {
    const oldMessages = this.state.messageList
    const newMessages = oldMessages.filter((o) => o.id !== id)
    this.setState({
      messageList: newMessages
    })
  }
  componentDidMount () {
    this.getMessages()
  }
  render () {
    if (this.state.messageList.length > 0) {
      // _.sortBy(collection, [iteratees=[_.identity]])
      const sortedMessages = _.orderBy(this.state.messageList, (o) => o.updated, 'desc')
      return (
        <div className='MessagesList'>
          <button onClick={this.getMessages.bind(this)}>Get More Messages</button>
          <ul>
            {sortedMessages.map((message, i) =>
              <MessageBox
                key={i}
                author={message.author}
                message={message.content}
                date={message.updated}
                onDelete={this.deleteMessage.bind(this, message.id)}
              />
            )}
          </ul>
        </div>
      )
    } else {
      return (
        <div className='MessagesList'>
          <h2>No messages.</h2>
          <button onClick={this.getMessages.bind(this)}>Get More Messages??</button>
        </div>
      )
    }
  }
}

export default MessagesList
