import { Link, useNavigate } from "react-router-dom";
import { getKakaoLoginLink } from "../kko/kkoapi";
import { useRecoilState } from "recoil";
import { kkoLoginAtom } from "../atoms/kkoLoginAtom";

function LoginPage() {
  const navigate = useNavigate();
  // Recoil State 로 전역 상태 활용하기
  const [userInfo, setUserInfo] = useRecoilState(kkoLoginAtom);
  // 카카오 로그인 URL 만들기
  const kkoLoginUrl = getKakaoLoginLink();
  //   console.log(kkoLoginUrl);

  const LogOut = () => {
    setUserInfo({
      id: "",
      nickname: "",
      thumbnail_image_url: "",
      email: "",
    });
    navigate("/");
  };
  return (
    <div>
      <h1>LoginPage</h1>
      {userInfo.id ? (
        <button onClick={LogOut}>로그아웃</button>
      ) : (
        <Link to={kkoLoginUrl}>카카오 로그인</Link>
      )}
    </div>
  );
}

export default LoginPage;
