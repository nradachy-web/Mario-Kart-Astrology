import React, { Component } from 'react'
import { Balloon } from 'nes-react'

const TYPE_SPEED_MS = 18

export default class CharacterDetail extends Component {
  state = { typed: '', done: false }

  componentDidMount() {
    this.startTyping(this.props.character.text)
  }

  componentWillUnmount() {
    clearInterval(this.timer)
  }

  startTyping(text) {
    let i = 0
    this.timer = setInterval(() => {
      i += 1
      if (i >= text.length) {
        clearInterval(this.timer)
        this.setState({ typed: text, done: true })
      } else {
        this.setState({ typed: text.slice(0, i) })
      }
    }, TYPE_SPEED_MS)
  }

  finishTyping = () => {
    if (this.state.done) return
    clearInterval(this.timer)
    this.setState({ typed: this.props.character.text, done: true })
  }

  render() {
    const { character, onBack, onRandom } = this.props
    const { typed, done } = this.state
    return (
      <div className="detail">
        <div className="detail-card">
          <div className="detail-img-wrap">
            <img src={character.image} alt="" className="detail-img" />
            <span className="detail-stars" aria-hidden>
              <span>+</span>
              <span>*</span>
              <span>+</span>
            </span>
          </div>
          <h2 className="detail-name">{character.name}</h2>
          <div
            className="balloon-wrap"
            onClick={this.finishTyping}
            role={done ? undefined : 'button'}
            tabIndex={done ? -1 : 0}
            onKeyDown={(e) => {
              if (!done && (e.key === 'Enter' || e.key === ' ')) this.finishTyping()
            }}
          >
            <Balloon fromLeft>
              {typed}
              {!done && <span className="caret">_</span>}
            </Balloon>
          </div>
        </div>
        <div className="actions">
          <button type="button" className="btn btn-back" onClick={onBack}>
            {'<'} BACK TO GRID
          </button>
          <button type="button" className="btn btn-random" onClick={onRandom}>
            SHUFFLE AGAIN
          </button>
        </div>
      </div>
    )
  }
}
