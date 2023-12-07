import "./App.css";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, googleAuth } from "./firebase";
import { signInWithPopup, signOut } from "firebase/auth";
import ChatRoom from "./ChatRoom";

function App() {
  const [user, loading, error] = useAuthState(auth);
  //console.log(user);

  if (loading) {
    return (
      <div>
        <p>로딩중...</p>
      </div>
    );
  }
  if (error) {
    return (
      <div>
        <p>Error:{error}</p>
      </div>
    );
  }
  return (
    <div className="App">
      <header>
        <h1>Small Talk💬</h1>
        {user && <SignOut />}
      </header>
      <section>{user ? <ChatRoom /> : <SignIn />}</section>
    </div>
  );
}

//로그인 컴포넌트
function SignIn() {
  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleAuth);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <button className="sign-in" onClick={signInWithGoogle}>
        Sign in with Google
      </button>
      <p>🌼 커뮤니티에서 예의를 지켜주세요 🌼</p>
    </>
  );
}

//로그아웃 컴포넌트
function SignOut() {
  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <button className="sign-out" onClick={logout}>
      Sign Out
    </button>
  );
}

export default App;
