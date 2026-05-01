import React, { Component } from 'react'

export default class CharacterCard extends Component {
  handlePick = () => this.props.onPick(this.props.character)

  render() {
    const { character } = this.props
    return (
      <button
        type="button"
        className="card"
        onClick={this.handlePick}
        aria-label={`Pick ${character.name}`}
      >
        <div className="card-img-wrap">
          <img src={character.image} alt="" className="card-img" />
        </div>
        <span className="card-name">{character.name}</span>
      </button>
    )
  }
}
