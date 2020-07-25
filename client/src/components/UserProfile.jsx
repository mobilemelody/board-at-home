import React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

class UserProfile extends React.Component {
  render() {
    return (
      <div>Hi</div>
    )
  }
}

// class _UserProfile extends React.Component {
//   constructor(props) {
//     super(props)
//   }

//   render() {
//     const { user } = this.props

//     return (
//       <div>
//         Yo suhh dude
//       </div>
//     )
//   }
// }

export default UserProfile;


// export const UserProfile = connect(state => {
//   const { user } = state
//   return { state }
// }, null)(_UserProfile);