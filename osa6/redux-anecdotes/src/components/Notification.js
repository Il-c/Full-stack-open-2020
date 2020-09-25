import React from 'react'
import { connect } from 'react-redux'

const Notification = (props) => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
  //  visibility: 'hidden',
  }
  if (!props.notification.show){
    return null
  }
  /*if (props.notification.show){
    style.visibility='visible'
  }*/
  return (
    <div style={style}  >
      {props.notification.message}
    </div>
  )
}
  const mapStateToProps = (state) => {
    return { notification: state.notification }

}
const ConnectedNotification = connect(mapStateToProps)(Notification)
export default ConnectedNotification