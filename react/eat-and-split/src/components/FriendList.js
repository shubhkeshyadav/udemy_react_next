import React from 'react'
import Friend from './Friend'

const FriendList = ({onFriendSelection,friends}) => {
  return (
    <ul>
        {friends && friends.map((f)=>{
            return <Friend onFriendSelection={onFriendSelection} friend={f}/>
        })}
    </ul>
  )
}

export default FriendList