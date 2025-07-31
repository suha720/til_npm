import { useRecoilState } from "recoil";
import { authStateAtom } from "./atoms/AuthStateAtom";

function AuthState() {
  const [user, setUser] = useRecoilState(authStateAtom);
  const handleLogin = () => {
    const mockUser = {
      id: "suha123",
      name: "수하",
      email: "suha@example.com",
    };
    setUser(mockUser);
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <div>
      {user && (
        <>
          <p>안녕하세요, {user.name}님!</p>
          <button onClick={handleLogout}>로그아웃</button>
        </>
      )}

      {!user && <button onClick={handleLogin}>로그인</button>}
    </div>
  );
}

export default AuthState;
