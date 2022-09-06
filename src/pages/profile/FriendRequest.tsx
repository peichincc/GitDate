import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import firebaseapi from "../../utils/firebaseapi";

interface Props {
  sentInvitationList: [];
  getInvitationList: [];
}

const Friend = ({ sentInvitationList, getInvitationList }: Props) => {
  const db = getFirestore();
  const [getAuthor, setGetAuthor] = useState<string[]>([]);
  const [getAuthor2, setGetAuthor2] = useState<string[]>([]);

  // const getRequestName = (listArray: string[]) => {
  //   if (listArray) {
  //     for (let i = 0; i < listArray.length; i++) {
  //       console.log(listArray[i]);
  //       const searchUser = async () => {
  //         const userRef = collection(db, "Users");
  //         const q = query(userRef, where("user_id", "==", listArray[i]));
  //         const querySnapshot = await getDocs(q);
  //         const tempArr: string[] = [];
  //         querySnapshot.forEach((doc) => {
  //           console.log(doc.data().firstname);
  //           // setGetAuthor(doc.data().firstname);
  //           tempArr.push(doc.data().firstname);
  //         });
  //         setGetAuthor(tempArr);
  //       };
  //       searchUser();
  //     }
  //   }
  // };

  // useEffect(() => {
  //   getRequestName(sentInvitationList);
  //   getRequestName(getInvitationList);
  // }, []);
  // getRequestName(sentInvitationList);
  // getRequestName(getInvitationList);

  const getSentRequestName = () => {
    const tempArr: string[] = [];
    if (sentInvitationList) {
      for (let i = 0; i < sentInvitationList.length; i++) {
        console.log(sentInvitationList[i]);
        const searchUser = async () => {
          const userRef = collection(db, "Users");
          const q = query(
            userRef,
            where("user_id", "==", sentInvitationList[i])
          );
          const querySnapshot = await getDocs(q);
          querySnapshot.forEach((doc) => {
            console.log(doc.data().firstname);
            tempArr.push(doc.data().firstname);
          });
        };
        searchUser();
      }
      return tempArr;
    }
    // console.log(tempArr);
    setGetAuthor(tempArr);
  };

  const tempArr: string[] = [];
  const searchUser = async (userID: any) => {
    const userRef = collection(db, "Users");
    const q = query(userRef, where("user_id", "==", userID));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      console.log(doc.data().firstname);
      tempArr.push(doc.data().firstname);
    });
    console.log(tempArr);
    setGetAuthor2(tempArr);
  };
  const getRecievedRequestName = async () => {
    // console.log(getInvitationList);
    const newArr = getInvitationList?.map((temp) => {
      return searchUser(temp);
    });
    await Promise.all(newArr);
    // if (getInvitationList) {
    //   for (let i = 0; i < getInvitationList.length; i++) {
    //     console.log(getInvitationList[i]);
    //   }
    //   return Promise.all(tempArr);
    // }
    // console.log(Promise.all(tempArr));
    // setGetAuthor2(tempArr);
    // console.log(tempArr);
  };

  useEffect(() => {
    getSentRequestName();
    getRecievedRequestName();
  }, []);

  const getID = (e: any) => {
    console.log(e.target.value);
  };

  return (
    <>
      <p>Recieved request:</p>
      {getInvitationList && (
        <div>
          Recieved invitation from
          {getAuthor2.map((item, key) => {
            return (
              <>
                <div>{item}</div>
                <button>Merge</button>
                <button>Close</button>
              </>
            );
          })}
        </div>
      )}
      <p>Sent request:</p>
      {sentInvitationList && (
        <div>
          Sent invitation to
          {getAuthor.map((item) => {
            return (
              <>
                <div>{item}</div>
              </>
            );
          })}
        </div>
      )}
    </>
  );
};

export default Friend;
