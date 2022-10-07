import {
  doc,
  setDoc,
  collection,
  query,
  where,
  getDoc,
  getDocs,
  deleteDoc,
  updateDoc,
  onSnapshot,
  orderBy,
  DocumentData,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "./firebase";
import { FormRecipient, ListData } from "./interface";

const usersRef = collection(db, "Users");
const issuesRef = collection(db, "Issues");
const branchesRef = collection(db, "Branches");
const LocationsRef = collection(db, "Location");
const chatsRef = collection(db, "Chatrooms");

const firebaseapi = {
  async pushUserToDB(userId: string) {
    await setDoc(doc(usersRef, userId), {
      user_id: `${userId}`,
    });
  },
  async uploadImage(imageUpload: File, userId: string) {
    if (imageUpload == null) return;
    const imageRef = ref(storage, `users/${userId}.jpg`);
    await uploadBytes(imageRef, imageUpload);
    const downloadUrl = await getDownloadURL(imageRef);
    return downloadUrl;
  },
  async updateDB(userid: string, recipient: ListData, imageURL: string) {
    const userRef = doc(usersRef, `${userid}`);
    await updateDoc(userRef, { ...recipient, main_photo: imageURL });
  },
  async searchUserName(userId: string) {
    const q = query(usersRef, where("user_id", "==", userId));
    const querySnapshot = await getDocs(q);
    let temp;
    querySnapshot.forEach((doc) => {
      temp = doc.data();
    });
    return temp;
  },
  async searchUserByName(userName: string) {
    const temp: DocumentData[] = [];
    const q = query(
      collection(db, "Users"),
      where("firstname", "==", userName)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      temp.push(doc.data());
    });
    return temp;
  },
  async readUserData(id: string | undefined) {
    const docRef = doc(usersRef, id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    }
  },
  async readIssueData(id: string | undefined) {
    const docRef = doc(issuesRef, id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      return null;
    }
  },
  async deleteIssue(id: string | undefined) {
    await deleteDoc(doc(issuesRef, id));
  },
  async readAllIssues() {
    const querySnapshot = await getDocs(
      query(issuesRef, orderBy("posted_at", "desc"))
    );
    let temp: unknown[] = [];
    querySnapshot.forEach((doc) => {
      temp.push(doc.data());
    });
    return temp;
  },
  async readStatusIssues(status: string) {
    let temp: DocumentData[] = [];
    const q = query(collection(db, "Issues"), where("status", "==", status));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      temp.push(doc.data());
    });
    return temp;
  },
  async postIssue(
    imageUpload: File,
    newIssueRef: any,
    recipient: FormRecipient
  ) {
    const imageRef = ref(storage, `issues/${newIssueRef.id}.jpg`);
    await uploadBytes(imageRef, imageUpload)
      .then(() => {
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
  getFriendLists(userId: string) {
    onSnapshot(doc(usersRef, userId), (doc) => {
      if (doc.exists()) {
        const getInvitationList = doc.data().friend_request;
        return getInvitationList;
      } else {
        return null;
      }
    });
  },
  sentFriendLists(userId: string) {
    onSnapshot(doc(usersRef, userId), (doc) => {
      if (doc.exists()) {
        const sentInvitationList = doc.data().friend_sent_request;
        return sentInvitationList;
      } else {
        return null;
      }
    });
  },
  async readChatData(id: string | undefined) {
    const docRef = doc(chatsRef, id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      return null;
    }
  },
  async createBranch(
    imageUpload: File,
    newBranchRef: any,
    recipient: FormRecipient
  ) {
    const imageRef = ref(storage, `branches/${newBranchRef.id}.jpg`);
    await uploadBytes(imageRef, imageUpload)
      .then(() => {
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
  async readAllBranches() {
    const querySnapshot = await getDocs(
      query(collection(db, "Branches"), orderBy("date", "desc"))
    );
    let temp: unknown[] = [];
    querySnapshot.forEach((doc) => {
      temp.push(doc.data());
    });
    return temp;
  },
  async readBranchData(id: string | undefined) {
    const docRef = doc(branchesRef, id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      return null;
    }
  },
  async deleteBranch(id: string | undefined) {
    await deleteDoc(doc(branchesRef, id));
  },
  async readBranchLocations() {
    const docRef = doc(LocationsRef, "branches");
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      return null;
    }
  },
  async getBranches(field: string, value: string) {
    const temp: DocumentData[] = [];
    const q = query(collection(db, "Branches"), where(field, "==", value));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      temp.push(doc.data());
    });
    return temp;
  },
  async getIssues(field: string, value: string) {
    const temp: DocumentData[] = [];
    const q = query(collection(db, "Issues"), where(field, "==", value));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      temp.push(doc.data());
    });
    return temp;
  },
};

export default firebaseapi;
