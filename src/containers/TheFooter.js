import React, { Component } from 'react'
import { CFooter } from '@coreui/react'

class TheFooter extends Component {
  render() {
    return (
      <CFooter fixed={true}>
        <div>
          <a href="https://inuinsane.github.io" target="_blank" rel="noopener noreferrer">learning4ever</a>
          <span className="ml-1">&copy; 2020</span>
        </div>
        <div className="mfs-auto">
          <span className="mr-1">Powered by</span>
          <a href="https://coreui.io/react" target="_blank" rel="noopener noreferrer">CoreUI for React</a>
        </div>
      </CFooter>
    )
  }
}

export default React.memo(TheFooter)
