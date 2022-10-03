import React, { useEffect, useState } from "react";

import {
  doc,
  setDoc,
  collection,
  serverTimestamp,
  query,
  where,
  getDoc,
  getDocs,
  getFirestore,
  deleteDoc,
  updateDoc,
  arrayUnion,
  onSnapshot,
  orderBy,
} from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "./firebase";
import { NavigationType } from "react-router-dom";

// const db = getFirestore();
// const storage = getStorage();
const usersRef = collection(db, "Users");
const issuesRef = collection(db, "Issues");
const branchesRef = collection(db, "Branches");
const LocationsRef = collection(db, "Location");
const chatsRef = collection(db, "Chatrooms");
const newBranchRef = doc(collection(db, "Branches"));
const newIssueRef = doc(collection(db, "Issues"));

const firebaseapi = {
  test(msg: string) {
    console.log(`${msg}`);
  },
  // In Issue
  // 尋找使用者名字by id
  async searchUserName(userid: string) {
    const q = query(usersRef, where("user_id", "==", userid));
    const querySnapshot = await getDocs(q);
    let temp;
    querySnapshot.forEach((doc) => {
      temp = doc.data();
    });
    return temp;
  },
  // 讀取Issues中的單篇文章資料
  async readIssueData(id: string | undefined) {
    const docRef = doc(issuesRef, id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      console.log("No such document!");
      return null;
    }
  },
  // 刪除單篇文章Issue
  async deleteIssue(id: string | undefined) {
    await deleteDoc(doc(issuesRef, id))
      .then(() => {
        // alert("Delete successful!");
      })
      .catch((error) => {
        console.error("Error removing document: ", error);
      });
  },
  // In IssuesAll
  // 讀取全部Issues
  async readAllIssues(issuesRef: any) {
    const querySnapshot = await getDocs(
      query(issuesRef, orderBy("posted_at", "desc"))
    );
    let temp = [] as any;
    querySnapshot.forEach((doc) => {
      temp.push(doc.data());
    });
    return temp;
  },
  // Read different status issues
  async readStatusIssues(status: string) {
    let temp = [] as any;
    const q = query(collection(db, "Issues"), where("status", "==", status));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      temp.push(doc.data());
    });
    return temp;
  },
  // In CreateIssue
  // Post Issue
  // imageUpload -> State to store the e.target.files[0]
  // recipient -> State from create issue data form
  async postIssue(imageUpload: File, newIssueRef: any, recipient: any) {
    const imageRef = ref(storage, `issues/${newIssueRef.id}.jpg`);
    await uploadBytes(imageRef, imageUpload)
      .then(() => {
        // alert("uploaded!");
        console.log(newIssueRef);
        console.log(recipient);
        setDoc(newIssueRef, recipient);
      })
      .then(async () => {
        const downloadUrl = await getDownloadURL(imageRef);
        updateDoc(newIssueRef, {
          issue_id: newIssueRef.id,
          main_image: downloadUrl,
        });
      });
  },
  // In Readme
  // 讀取Users中使用者資料
  async readUserData(id: string | undefined) {
    const docRef = doc(usersRef, id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      console.log("No such document!");
    }
  },
  // In Profile
  // 第一次Sign Up時把使用者資料存進DB
  async pushUserToDB(userid: string) {
    await setDoc(doc(usersRef, userid), {
      user_id: `${userid}`,
    });
  },
  // 上傳照片
  // imageUpload -> State to store the e.target.files[0]
  async uploadImage(imageUpload: File, userid: string) {
    if (imageUpload == null) return;
    const imageRef = ref(storage, `users/${userid}.jpg`);
    await uploadBytes(imageRef, imageUpload).then(() => {
      // alert("uploaded!");
    });
    const downloadUrl = await getDownloadURL(imageRef);
    return downloadUrl;
  },
  // 更新資料庫
  // recipient -> State 使用者在Profile更新的資料
  // imageURL -> State 上傳的照片
  async updateDB(userid: string, recipient: any, imageURL: string) {
    const userRef = doc(usersRef, `${userid}`);
    await updateDoc(userRef, { ...recipient, main_photo: imageURL });
    // alert("updated!");
  },
  // In Issue
  // 更新版本:送出好友邀請Update fields in Users collection
  // async updateFriendField(otherUserid: string, userid: string) {
  //   const otherUserRef = doc(db, "Users", otherUserid);
  //   await updateDoc(otherUserRef, {
  //     friend_request: arrayUnion(userid),
  //   });
  //   const userRef = doc(db, "Users", userid);
  //   await updateDoc(userRef, {
  //     friend_sent_request: arrayUnion(otherUserid),
  //   });
  // },
  // 讀取Friend field in user
  // (讀DB中的friend_request -> get ID -> Search name -> Display name)
  getFriendLists(userid: string) {
    onSnapshot(doc(usersRef, userid), (doc) => {
      if (doc.exists()) {
        const getInvitationList = doc.data().friend_request;
        return getInvitationList;
      } else {
        return null;
      }
    });
  },
  sentFriendLists(userid: string) {
    onSnapshot(doc(usersRef, userid), (doc) => {
      if (doc.exists()) {
        const sentInvitationList = doc.data().friend_sent_request;
        return sentInvitationList;
      } else {
        return null;
      }
    });
  },
  // Confirm 交友邀請
  // Merge: 更新DB -> add id/name to friend_list, 從對方DB (friend_sent_request)移除自己, 從自己DB (friend_request)移除對方
  // Chatroom
  // 讀取chatroom doc
  async readChatData(id: string | undefined) {
    const docRef = doc(chatsRef, id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      console.log("No such chatroom!");
      return null;
    }
  },
  // CreateBranch
  async createBranch(imageUpload: File, newBranchRef: any, recipient: any) {
    const imageRef = ref(storage, `branches/${newBranchRef.id}.jpg`);
    await uploadBytes(imageRef, imageUpload)
      .then(() => {
        // alert("uploaded!");
        console.log(newBranchRef);
        console.log(recipient);
        setDoc(newBranchRef, recipient);
      })
      .then(async () => {
        const downloadUrl = await getDownloadURL(imageRef);
        updateDoc(newBranchRef, {
          branch_id: newBranchRef.id,
          main_image: downloadUrl,
        });
      });
  },
  // 讀全部Branches
  async readAllBranches(branchesRef: any) {
    const querySnapshot = await getDocs(
      query(branchesRef, orderBy("date", "desc"))
    );
    let temp = [] as any;
    querySnapshot.forEach((doc) => {
      temp.push(doc.data());
    });
    return temp;
    // const querySnapshot = await getDocs(branchesRef);
    // let temp = [] as any;
    // querySnapshot.forEach((doc) => {
    //   temp.push(doc.data());
    // });
    // return temp;
  },
  // 讀取單一Branch資料
  async readBranchData(id: string | undefined) {
    const docRef = doc(branchesRef, id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      console.log("No such document!");
      return null;
    }
  },
  // 刪除單一Branch
  async deleteBranch(id: string | undefined) {
    await deleteDoc(doc(branchesRef, id))
      .then(() => {
        // alert("Delete successful!");
      })
      .catch((error) => {
        console.error("Error removing document: ", error);
      });
  },
  // 參加活動 git checkout -> 使用者資料更新acitivity_attend(寫入branch id)
  // 讀取活動Branch Location and show on Main Page
  async readBranchLocations() {
    const docRef = doc(LocationsRef, "c4ttDiHr8UCyB0OMOtwA");
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      console.log("No such document!");
      return null;
    }
  },
  // Add branch locations to DB
  // async addBranchLocations(
  //   branch_id: any,
  //   branch_title: any,
  //   location: any
  // ) {
  //   const docRef = doc(LocationsRef, "c4ttDiHr8UCyB0OMOtwA");
  //   updateDoc(docRef, {
  //     arrayUnion({
  //     id: branch_id,
  //     name: branch_title,
  //     position: location,})
  //   });
  // },
  //
  // Search User by name in DB
  async searchUserByName(userName: string) {
    let temp = [] as any;
    const q = query(
      collection(db, "Users"),
      where("firstname", "==", userName)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      temp.push(doc.data());
    });
    return temp;
    // const q = query(usersRef, where("firstname", "==", userName));
    // const querySnapshot = await getDocs(q);
    // let temp;
    // querySnapshot.forEach((doc) => {
    //   temp = doc.data();
    // });
    // return temp;
  },
  // Refactor -> BranchesAll get different type branches
  async getBranches(field: string, value: string) {
    let temp = [] as any;
    const q = query(collection(db, "Branches"), where(field, "==", value));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      temp.push(doc.data());
    });
    return temp;
  },
};

export default firebaseapi;
