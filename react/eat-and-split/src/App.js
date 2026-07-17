import { useState } from "react";
import FriendList from "./components/FriendList";
import AddFriendForm from "./components/AddFriendForm";
import BillForm from "./components/BillForm";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

export default function App() {
  const [friends,setFriends] = useState(initialFriends);
  const [selectedFriend,setSelectedFriend] = useState(null);

  const handeAddFriend = (newFriend) => {
    setFriends((e)=>{
      return [...e,newFriend];
    })
  }

  const handleBillSplit = (billData) => {
      const billValue = billData.who_paying == 'user'?billData.friend_expense:-billData.friend_expense;

      setFriends((friends) =>
      friends.map((friend) =>
        friend.id === selectedFriend.id ?{ ...friend, balance: (friend.balance?friend.balance:0) + billValue}: friend
      )
    );
    console.log(billData);
    console.log(selectedFriend.id);
    console.log(friends);

    //setSelectedFriend(null);
  }

  const handeFriendSelection = (friend) => {
    setSelectedFriend(friend);
  }

  return (
    <div className="app">
      <div className="sidebar">
        <FriendList onFriendSelection ={handeFriendSelection} friends={friends}/>
        <AddFriendForm handeAddFriend={handeAddFriend}/>
      </div>
      {selectedFriend &&
        <BillForm selectedFriend={selectedFriend} handleBillSplit={handleBillSplit}/>
      }
    </div>
  );
}

