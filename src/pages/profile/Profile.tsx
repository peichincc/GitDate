import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import {
  getFirestore,
  doc,
  setDoc,
  updateDoc,
  collection,
  onSnapshot,
  collectionGroup,
  query,
  where,
  getDocs,
  DocumentData,
} from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import firebaseapi from "../../utils/firebaseapi";
import Friend from "./FriendRequest";
import PostedIssues from "./PostIssues";
import HostedBranches from "./HostedBranches";
import AttendedBranches from "./AttendedBranches";

import { useSelector, useDispatch } from "react-redux";

const Wrapper = styled.div`
  display: block;
  max-width: 1376px;
  margin: 0 auto;
  margin-bottom: 100px;
`;
const FormGroup = styled.div``;
const FormLabel = styled.div``;
const FormCheck = styled.div``;
const FormCheckInput = styled.input``;
const FormCheckLabel = styled.label``;
const FormText = styled.textarea`
  resize: none;
`;
const FormControl = styled.input``;

const Block = styled.div`
  margin-top: 50px;
`;

const Profile = () => {
  const userData = useSelector((state) => state) as any;
  let navigate = useNavigate();
  const [getUser, setGetUser] = useState("");
  const [imageUpload, setImageUpload] = useState(null);
  const [imageURL, setImageURL] = useState("");
  const db = getFirestore();
  const storage = getStorage();
  // Friend
  const [sentInvitationList, setSentInvitationList] = useState<any>();
  const [getInvitationList, setGetInvitationList] = useState<any>();
  const [openFriend, setOpenFriend] = useState(false);
  const [openIssues, setOpenIssues] = useState(false);
  const [postedIssues, setPostedIssues] = useState<DocumentData>();
  const [hostedIssues, setHostedIssues] = useState<DocumentData>();
  const [attendedIssues, setAttendedIssues] = useState<DocumentData>();
  const [openHostedBranches, setOpenHostedBranches] = useState(false);
  const [openAttendedBranches, setOpenAttendedBranches] = useState(false);

  useEffect(() => {
    const userId = userData.user.user_id;
    console.log(userId);
    if (userId) {
      setGetUser(userId);
      // get friend
      getFriend(userId);
      searchIssues(userId);
      searchHostedBranches(userId);
      searchAttenedBranches(userId);
    }
  }, []);

  // 把使用者放進db
  const pushtodb = async () => {
    await setDoc(doc(collection(db, "Users"), `${getUser}`), {
      user_id: `${getUser}`,
    });
  };

  // 使用者更新資訊
  type ListData = {
    lastname: string;
    firstname: string;
    age: number | undefined;
    gender: string;
    githublink: string;
    details: string;
    gender_interested: string;
    // inerested_gender: [];
    main_photo: string;
    wish_relationship: string;
    friend_list: [];
    friend_request: [];
    friend_sent_request: [];
  };

  const uploadFormGroups = [
    { label: "First Name", key: "firstname" },
    { label: "Last Name", key: "lastname" },
    { label: "Age", key: "age" },
    {
      label: "Gender",
      key: "gender",
      options: [
        { label: "Male", value: "male" },
        { label: "Female", value: "female" },
        { label: "Prefer not to say", value: "not_to_say" },
      ],
    },
    {
      label: "Interested Gender",
      key: "gender_interested",
      options: [
        { label: "Male", value: "interested_male" },
        { label: "Female", value: "interested_female" },
        { label: "Prefer not to say", value: "interested_not_to_say" },
      ],
    },
    { label: "Githublink", key: "githublink" },
    {
      label: "Wish relationship",
      key: "wish_relationship",
      options: [
        { label: "Date", value: "date" },
        { label: "BFF", value: "bff" },
      ],
    },
    { label: "Details", key: "details", textarea: true },
  ];
  const [recipient, setRecipient] = useState<ListData>({
    lastname: "",
    firstname: "",
    age: undefined,
    gender: "",
    githublink: "",
    details: "",
    gender_interested: "",
    main_photo: "",
    wish_relationship: "",
    friend_list: [],
    friend_request: [],
    friend_sent_request: [],
  });
  const uploadFormInputCheck = (
    label: string,
    key: string,
    textarea: boolean | undefined,
    options: any
  ) => {
    if (options) {
      return (options as unknown as any[]).map((option) => (
        <FormCheck key={option.value}>
          <FormCheckInput
            type="radio"
            checked={recipient[key as keyof typeof recipient] === option.value}
            onChange={(e) => {
              if (e.target.checked)
                setRecipient({ ...recipient, [key]: option.value });
            }}
          />
          <FormCheckLabel>{option.label}</FormCheckLabel>
        </FormCheck>
      ));
    } else if (textarea) {
      return (
        <FormText
          value={recipient[key as keyof typeof recipient]}
          onChange={(e) =>
            setRecipient({ ...recipient, [key]: e.target.value })
          }
        />
      );
    } else {
      return (
        <FormControl
          value={recipient[key as keyof typeof recipient]}
          onChange={(e) =>
            setRecipient({ ...recipient, [key]: e.target.value })
          }
        />
      );
    }
  };
  // 上傳照片
  const uploadImage = async () => {
    if (imageUpload == null) return;
    const imageRef = ref(storage, `users/${getUser}.jpg`);
    await uploadBytes(imageRef, imageUpload).then(() => {
      alert("uploaded!");
    });
    const downloadUrl = await getDownloadURL(imageRef);
    setImageURL(downloadUrl);
  };
  // 更新資料庫
  const updateDB = async () => {
    const userRef = doc(collection(db, "Users"), `${getUser}`);
    await updateDoc(userRef, { ...recipient, main_photo: imageURL });
    alert("updated!");
  };

  // 讀取好友邀請(讀DB中的friend_request -> get ID -> Search name -> Display name)
  const getFriend = (id: string) => {
    onSnapshot(doc(collection(db, "Users"), id), (doc) => {
      if (doc.exists()) {
        setSentInvitationList(doc.data().friend_sent_request);
        // console.log(doc.data().friend_sent_request);
        setGetInvitationList(doc.data().friend_request);
        // console.log(doc.data().friend_request);
      }
    });
  };

  // 開啟好友邀請列表
  const handleChange = () => {
    setOpenFriend(true);
  };

  // 開啟Issues列表
  const handleIssues = () => {
    setOpenIssues(true);
  };
  // 搜尋使用者發過的文
  const searchIssues = async (userId: string) => {
    let temp = [] as any;
    const q = query(collection(db, "Issues"), where("posted_by", "==", userId));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      console.log(doc.data());
      temp.push(doc.data());
    });
    setPostedIssues(temp);
  };

  // 開啟Branches列表
  const handleHostedIssues = () => {
    setOpenHostedBranches(true);
  };
  const handleAttendedIssues = () => {
    setOpenAttendedBranches(true);
  };
  // 搜尋使用者的活動
  const searchHostedBranches = async (userId: string) => {
    let temp = [] as any;
    const q = query(
      collection(db, "Branches"),
      where("hosted_by", "==", userId)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      console.log(doc.data());
      temp.push(doc.data());
    });
    setHostedIssues(temp);
  };
  const searchAttenedBranches = async (userId: string) => {
    onSnapshot(doc(collection(db, "Users"), userId), async (doc) => {
      if (doc.exists()) {
        console.log(doc.data().activity_attend);
        const newArr = [] as any;
        for (let i = 0; i < doc.data().activity_attend.length; i++) {
          await firebaseapi
            .readBranchData(doc.data().activity_attend[i])
            .then((res) => {
              console.log(res);
              if (res) {
                console.log(res["title"]);
                console.log(res["main_image"]);
                const tempObj = {
                  id: res["branch_id"],
                  title: res["title"],
                  photo: res["main_image"],
                };
                newArr.push(tempObj);
              }
            });
        }
        // Promise.all(promises).then((res) => console.log(res));
        console.log(newArr);
        setAttendedIssues(newArr);
      }
    });
  };

  return (
    <>
      <Wrapper>
        <button onClick={pushtodb}>Set user</button>
        <Block>
          <h1>Edit profile</h1>
          <div>
            {uploadFormGroups.map(({ label, key, textarea, options }) => (
              <FormGroup key={key}>
                <FormLabel>{label}</FormLabel>
                {uploadFormInputCheck(label, key, textarea, options)}
              </FormGroup>
            ))}
          </div>
          <input
            type="file"
            onChange={(e: any) => {
              setImageUpload(e.target.files[0]);
            }}
          ></input>
          <button onClick={uploadImage}>Upload image</button>
          {imageURL && <img src={imageURL} alt="profile" />}
          <div>
            <button onClick={updateDB}>Update Profile</button>
          </div>
        </Block>
        <Block>
          <h1>Invitations area</h1>
          <button onClick={handleChange}>Open the friend area</button>
          {openFriend && getInvitationList && (
            <Friend
              sentInvitationList={sentInvitationList}
              getInvitationList={getInvitationList}
            />
          )}
        </Block>
        <button
          onClick={() => {
            navigate("/chatlist");
          }}
        >
          To see chatlist (all friend_list: repo/chatroom)
        </button>
        <Block>
          <h1>Issues</h1>
          <button onClick={handleIssues}>Open the issues area</button>
          <br />
          {openIssues && postedIssues && (
            <PostedIssues postedIssues={postedIssues} />
          )}
        </Block>
        <Block>
          <h1>Branches</h1>
          <button onClick={handleHostedIssues}>
            Open the hosted branches area
          </button>
          <br />
          {openHostedBranches && hostedIssues && (
            <HostedBranches hostedIssues={hostedIssues} />
          )}
          <hr></hr>
          <button onClick={handleAttendedIssues}>
            Open the attended branches area
          </button>
          <br />
          {openAttendedBranches && attendedIssues && (
            <AttendedBranches attendedIssues={attendedIssues} />
          )}
        </Block>
      </Wrapper>
    </>
  );
};

export default Profile;
