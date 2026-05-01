import React, { Component } from 'react'
import { Icon } from 'nes-react'
import CharacterCard from './CharacterCard'
import CharacterDetail from './CharacterDetail'
import AstrologyData from './AstrologyData.json'

const sortedData = [...AstrologyData].sort((a, b) => a.name.localeCompare(b.name))

export default class App extends Component {
  state = { selected: null }

  pick = (character) => {
    this.setState({ selected: character })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  reset = () => this.setState({ selected: null })

  random = () => {
    const c = sortedData[Math.floor(Math.random() * sortedData.length)]
    this.pick(c)
  }

  render() {
    const { selected } = this.state
    return (
      <div className="app">
        <header className="app-header">
          <h1>
            Mario Kart Astrology{' '}
            <a
              href="https://github.com/StephenRadachy/Mario-Kart-Astrology"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub repo"
            >
              <Icon icon="github" />
            </a>
          </h1>
          <p className="tagline">
            Your chosen Mario Kart player says WAY more about you than a zodiac sign does.
          </p>
          <p className="credit">
            via{' '}
            <a
              href="https://twitter.com/ChloeCondon/status/1108738908999700480"
              target="_blank"
              rel="noopener noreferrer"
            >
              @ChloeCondon
            </a>
          </p>
        </header>

        {selected ? (
          <CharacterDetail
            key={selected.name}
            character={selected}
            onBack={this.reset}
            onRandom={this.random}
          />
        ) : (
          <>
            <p className="prompt">CHOOSE YOUR DRIVER</p>
            <div className="grid">
              <button
                type="button"
                className="card mystery"
                onClick={this.random}
                aria-label="Random character"
              >
                <span className="mystery-mark">?</span>
                <span className="card-name">RANDOM</span>
              </button>
              {sortedData.map((c) => (
                <CharacterCard key={c.name} character={c} onPick={this.pick} />
              ))}
            </div>
            <p className="footnote">
              42 racers. Pick the one you main. Or hit{' '}
              <span className="footnote-mystery">?</span> and let fate decide.
            </p>
          </>
        )}

        <footer className="app-footer">
          <div className="staff-roll">
            <p className="staff-line headline">
              <span className="staff-label">ORIGINAL DEV</span>
              <a
                href="https://github.com/StephenRadachy"
                target="_blank"
                rel="noopener noreferrer"
                className="staff-name"
              >
                STEPHEN RADACHY
              </a>
            </p>
            <p className="staff-line">
              <span className="staff-label">BLURBS FINISHED BY</span>
              <a
                href="https://github.com/nradachy-web"
                target="_blank"
                rel="noopener noreferrer"
                className="staff-name secondary"
              >
                NICK RADACHY
              </a>
            </p>
          </div>
          <div className="staff-credits">
            <p>
              Built with{' '}
              <a href="https://github.com/facebook/create-react-app" target="_blank" rel="noopener noreferrer">CRA</a>
              {' · '}
              <a href="https://github.com/nostalgic-css/NES.css" target="_blank" rel="noopener noreferrer">NES.css</a>
              {' · '}
              <a href="https://github.com/bschulte/nes-react" target="_blank" rel="noopener noreferrer">nes-react</a>
            </p>
            <p>
              Characters and icons from the{' '}
              <a href="https://www.mariowiki.com/Mario_Kart_8_Deluxe#Characters" target="_blank" rel="noopener noreferrer">Super Mario Wiki</a>
            </p>
          </div>
        </footer>
      </div>
    )
  }
}
