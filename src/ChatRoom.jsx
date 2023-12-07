import {
  addDoc,
  collection,
  limit,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { auth, db } from "./firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { Modal } from "./Modal";

function ChatRoom() {
  const dummy = useRef(); //html을 선택하기 위한 객체
  const [formValue, setFormValue] = useState("");

  // 모달 상태 추가
  const [modalOpen, setModalOpen] = useState(false);
  // 전달정보
  const [userId, setUserId] = useState();

  const messagesRef = collection(db, "messages"); // messages 컬렉션
  const q = query(messagesRef, orderBy("createdAt"), limit(25)); // createdAt으로 정렬하고 최대 25개 출력
  const [messages] = useCollectionData(q); // 실시간으로 메시지 가져오기

  // 모달창
  const showModal = (userId) => {
    setModalOpen(true);
    setUserId(userId);
    //console.log("모달창", modalOpen);
    //console.log(userId);
  };

  // 메시지 전송
  const sendMessage = async (e) => {
    e.preventDefault();
    console.log(auth.currentUser); // 유저정보
    const { uid, photoURL, displayName } = auth.currentUser; // 현재 유저정보 가져옴

    // 저장
    await addDoc(messagesRef, {
      text: formValue,
      createdAt: serverTimestamp(),
      uid,
      photoURL,
      displayName,
    });
    setFormValue("");
  };

  // 채팅 메시지가 창의 마지막까지 내려간 경우 메시지로 자동 스크롤 이동
  useEffect(() => {
    dummy.current.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      <main>
        {messages &&
          messages.map((msg, idx) => (
            <ChatMessage key={idx} message={msg} showModal={showModal} />
          ))}

        <span ref={dummy}></span>
      </main>

      {/* (하단)메시지입력창 */}
      <form onSubmit={sendMessage}>
        <input
          value={formValue}
          onChange={(e) => setFormValue(e.target.value)}
          placeholder="메세지를 입력하세요."
        />

        <button type="submit" disabled={!formValue}>
          ✉
        </button>
      </form>
      {/* 모달창 */}
      {modalOpen && <Modal setModalOpen={setModalOpen} userId={userId} />}
    </>
  );
}

// 채팅메시지함수
function ChatMessage({ message, showModal }) {
  const { text, uid, photoURL, displayName } = message;
  // 본인글(sent) 상대방글(received) 구분
  const messageClass = uid === auth.currentUser.uid ? "sent" : "received";

  const showInfo = () => {
    showModal(uid);
  };

  return (
    <>
      <div className={`message ${messageClass}`}>
        <span className="displayName">{displayName}</span>
      </div>
      <div className={`message ${messageClass}`}>
        <img
          onClick={showInfo}
          src={
            photoURL || "https://api.adorable.io/avatars/23/abott@adorable.png"
          }
        />
        <p>{text}</p>
      </div>
    </>
  );
}

export default ChatRoom;
