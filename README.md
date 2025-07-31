# 카카오 로그인

- CRA 로 리액트 프로젝트 생성한 경우
  - 환경설정 즉, `.env` 사용법이 다름
- Vite 로 리액트 프로젝트 생성한 경우
  - 환경설정 즉, `.env` 사용법이 다름

## 1. 카카오 개발자 등록하기/로그인하기

- https://developers.kakao.com/
- https://developers.kakao.com/docs/latest/ko/kakaologin/rest-api

## 2. 새로운 애플리케이션 등록하기

- 상단의 주메뉴에서 `앱` 선택 후 이동
  <img width="1920" height="1040" alt="Image" src="https://github.com/user-attachments/assets/b7cd644a-8a7e-4905-bdbf-39f9585d373e" />
- 내용 작성하기
  <img width="1920" height="1040" alt="Image" src="https://github.com/user-attachments/assets/281f8098-0c75-4a8a-95ef-f34a737abc7b" />
  <img width="1920" height="1040" alt="Image" src="https://github.com/user-attachments/assets/002a4885-e41c-4d2b-9154-02eee96ec529" />
- 목록 확인하기
  <img width="1749" height="870" alt="Image" src="https://github.com/user-attachments/assets/98ccb612-9803-4ba5-88ec-199205a1cb37" />
- 비즈앱 등록하기
  <img width="1303" height="714" alt="Image" src="https://github.com/user-attachments/assets/5c49981d-a5ae-4c16-947e-28f80e7021a0" />
  - 처음, 약관 동의하기
    <img width="1518" height="656" alt="Image" src="https://github.com/user-attachments/assets/a4e60a64-b530-4a2f-93a1-365458448557" />
  - 인증하기
    <img width="891" height="730" alt="Image" src="https://github.com/user-attachments/assets/51108579-ad0c-4a0b-8695-844c6f418c9c" />
    <img width="1301" height="679" alt="Image" src="https://github.com/user-attachments/assets/0d1315c7-b784-49ea-859d-bdcc66f0508b" />
    <img width="754" height="502" alt="Image" src="https://github.com/user-attachments/assets/7541344b-1493-4fb8-8d10-90130cad5803" />

## 3. Rest API 및 JS 키 관리

- `외부노출 금지`
- / 폴더에 `.env` 파일 생성
- `생성되는 파일 위치 절대 주의
  <img width="341" height="330" alt="Image" src="https://github.com/user-attachments/assets/bd2d4629-390b-4d40-8ace-6cd1b41b6cd7" />

### 3.1. 접두어는 `REACT_APP_` 으로 `약속`됨

- 예) CRA 프로젝트에서는 `REACT_APP_원하는이름=본인키`
  `=` 붙여쓰기
- 예) Next.js 프로젝트에서는 `NEXT_APP_` 으로 약속됨
- 예) Vite 프로젝트에서는 `VITE_` 로 약속됨

```txt
REACT_APP_KKO_LOGIN_REST_API_KEY=본인키
REACT_APP_KKO_LOGIN_JS_API_KEY=본인키
```

### 3.2. `.gitignore` 확인

- `.env` 내용으로 작성확인
  <img width="413" height="516" alt="Image" src="https://github.com/user-attachments/assets/2365d9eb-757d-4929-83a3-1afa0313557f" />

## 4. 카카오 로그인 플랫폼 연결하기

<img width="1430" height="839" alt="Image" src="https://github.com/user-attachments/assets/4cf28725-6f01-4cf3-a661-c88fa81530bb" />

### 4.1. 리다이렉트 URL 설정

- http://localhost:3000 : CRA 버전
- http://localhost:5173 : Vite 버전
- https://www.도메인.com : 개인 도메인
  <img width="782" height="530" alt="Image" src="https://github.com/user-attachments/assets/5c82264e-d0c0-4056-a34e-226bbae4816f" />
  <img width="1008" height="433" alt="Image" src="https://github.com/user-attachments/assets/ddab30ea-9bf4-439c-9788-c84b86f8368e" />

## 5. 동의항목 설정

  <img width="1719" height="361" alt="Image" src="https://github.com/user-attachments/assets/34e71d59-b336-49e7-a23d-4df4be0611b1" />
  <img width="704" height="782" alt="Image" src="https://github.com/user-attachments/assets/532e43b4-5344-440f-8bcc-1152bb724db0" />
  <img width="1126" height="352" alt="Image" src="https://github.com/user-attachments/assets/df921a6e-c857-4c5c-83eb-45ee18dd0906" />

## 6. 카카오 로그인 구현

- /src/kko 폴더 생성
- /src/kko/kkoapi.js 생성

### 6.1. 1단계

```js
// git 에 key 값 공개금지
const rest_api_key = process.env.REACT_APP_KKO_LOGIN_REST_API_KEY;

// 카카오 로그인 성공시 이동할 URL
const redirect_uri = "http://localhost:3000/member/kko";

// 카카오 로그인시 API 호출 경로 : token 활용
const auth_code_path = "https://kauth.kakao.com/oauth/authorize";

// 카카오 로그인 이후 사용자 정보 API 경로
const kko_user_api = "https://kapi.kakao.com/v2/user/me";

// 카카오 로그인 시도시 활용할 URL 자동 생성
export const getKakaoLoginLink = () => {
  const kakaoURL = `${auth_code_path}?client_id=${rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`;
  return kakaoURL;
};
```

### 6.2. 2단계 : Access Token 활용

```js
// access 토큰 요청
const access_token_url = `https://kauth.kakao.com/oauth/token`;
export const getAccessToken = async authCode => {
  const params = new URLSearchParams({
    grant_type: "authorization_code",
    client_id: rest_api_key,
    redirect_uri: redirect_uri,
    code: authCode,
  });

  const response = await fetch(access_token_url, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
    },
    body: params.toString(),
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.error("토큰 요청 실패:", errorData);
    throw new Error("Access Token 요청 실패");
  }

  const data = await response.json();
  return data.access_token;
};

// 사용자 정보 요청
export const getMemberWithAccessToken = async accessToken => {
  try {
    const response = await fetch(kko_user_api, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("사용자 정보 요청 실패:", errorData);
      return errorData;
    }

    const userData = await response.json();
    console.log(userData);
    return userData;
  } catch (error) {
    console.error("fetch 에러:", error);
    return error;
  }
};
```

### 6.3. 전체 코드(`추후 axios 로 변경 권장`)

```js
// git 에 key 값 공개금지
const rest_api_key = process.env.REACT_APP_KKO_LOGIN_REST_API_KEY;
// 카카오 로그인 성공시 이동할 URL
const redirect_uri = "http://localhost:3000/member/kko";
// 카카오 로그인시 API 호출 경로 : token 활용
const auth_code_path = "https://kauth.kakao.com/oauth/authorize";
// 카카오 로그인 이후 사용자 정보 API 경로
const kko_user_api = "https://kapi.kakao.com/v2/user/me";
// 카카오 로그인 시도시 활용할 URL 자동 생성
export const getKakaoLoginLink = () => {
  const kakaoURL = `${auth_code_path}?client_id=${rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`;
  return kakaoURL;
};

// access 토큰 요청
const access_token_url = `https://kauth.kakao.com/oauth/token`;
export const getAccessToken = async authCode => {
  const params = new URLSearchParams({
    grant_type: "authorization_code",
    client_id: rest_api_key,
    redirect_uri: redirect_uri,
    code: authCode,
  });

  const response = await fetch(access_token_url, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
    },
    body: params.toString(),
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.error("토큰 요청 실패:", errorData);
    throw new Error("Access Token 요청 실패");
  }

  const data = await response.json();
  return data.access_token;
};

// 사용자 정보 요청
export const getMemberWithAccessToken = async accessToken => {
  try {
    const response = await fetch(kko_user_api, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("사용자 정보 요청 실패:", errorData);
      return errorData;
    }

    const userData = await response.json();
    console.log(userData);
    return userData;
  } catch (error) {
    console.error("fetch 에러:", error);
    return error;
  }
};
```

## 6.4. 코드 반영

- /src/pages/LoginPage.jsx 생성

```jsx
import { Link } from "react-router-dom";
import { getKakaoLoginLink } from "../kko/kkoapi";

function LoginPage() {
  // 카카오 로그인 URL 만들기
  const kkoLoginUrl = getKakaoLoginLink();
  console.log(kkoLoginUrl);
  return (
    <div>
      <h1>LoginPage</h1>
      <Link to={kkoLoginUrl}>카카오 로그인</Link>
    </div>
  );
}

export default LoginPage;
```

- /src/pages/member 폴더 생성
- /src/pages/member/After.jsx 파일생성

```jsx
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getAccessToken, getMemberWithAccessToken } from "../../kko/kkoapi";

const After = () => {
  // 사용자 정보 관리
  const [userInfo, setUserInfo] = useState(null);

  // 카카오 인증키 알아내기
  const [URLSearchParams, setURLSearchParams] = useSearchParams();
  const authCode = URLSearchParams.get("code");

  // 인가 키를 받아서 액세스 토큰을 요청한다.
  const getAccessTokenCall = async () => {
    const accessKey = await getAccessToken(authCode);
    // console.log("accessKey : ", accessKey);
    // 사용자 정보 호출
    const info = await getMemberWithAccessToken(accessKey);
    console.log(info);
    setUserInfo(info);
  };

  useEffect(() => {
    getAccessTokenCall();
  }, [authCode]);
  return (
    <div>
      <h1>KKO 로그인 후 </h1>
      <h2>{authCode}</h2>
      <div>닉네임 : {userInfo?.kakao_account.profile.nickname}</div>
      <div>이메일 : {userInfo?.kakao_account.email}</div>
      <div>
        <img src={userInfo?.kakao_account.profile.thumbnail_image_url} />
      </div>
    </div>
  );
};

export default After;
```

### 6.4.1. Router 세팅

- /src/App.js

```js
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import After from "./pages/member/After";

function App() {
  return (
    <Router>
      <LoginPage />
      <Routes>
        <Route path="member/kko" element={<After />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
```

## 7. Recoil 활용해 보기

- /src/kkoLoginAtom.js

```js
import { atom } from "recoil";

export const kkoLoginAtom = atom({
  key: "kkoLoginAtom",
  default: {
    id: "",
    nickname: "",
    thumbnail_image_url: "",
    email: "",
  },
});
```

## 8. 로그아웃 처리

```js
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
```

## 9. 로그인 없이 페이지 접근시 처리

- 강제로 navigate("/)
- 조건문으로 안내메시지 및 버튼으로 이동권장