import { useNavigate, useParams } from 'react-router-dom'; // useNavigate 추가
import './Terms.css'; // 스타일 파일 임포트
import BackIcon from '../../assets/Icon_ Back 1.png'; // 뒤로가기 아이콘 임포트

const Terms = () => {
  const { type } = useParams();
  const navigate = useNavigate(); // 페이지 이동을 위한 훅

  const handleBack = () => {
    navigate(-1); // 직전 페이지로 이동
  };

  const renderContent = () => {
    switch (type) {
      case 'terms1':
        return (
          <>
            <div className="Terms-title">
              <div className="Terms-back-btn" onClick={handleBack}>
                <img src={BackIcon} alt="뒤로가기" />
              </div>
              <div className="Terms-square"></div>
              <div className="Terms-title-text">이용약관</div>
            </div>
            <p className="Terms-last-modified">
              최종 수정일: 2024년 7월 3일(GMT 표준시 오전 12시 00분)
            </p>
            <hr className="Terms-divider" />
            <div className="Terms-content">
              <h4>제 1 장 총칙</h4>
              <h5>제 1 조 (목적)</h5>
              <p>
                본 약관은 2023(이하 “팀”이라 합니다)이 운영하는 앱인 ‘Time To
                Travel’ (이하 “앱”이라 합니다)에서 제공하는 온라인 서비스(이하
                “서비스”라 한다)를 이용함에 있어 이용자의 권리, 의무 및
                책임사항을 규정함을 목적으로 합니다.
              </p>
              <h5>제 2 조 (용어의 정의)</h5>
              <p>본 약관에서 사용하는 용어는 다음과 같이 정의한다.</p>
              <p>
                “앱”이란 팀이 재화 또는 용역을 이용자에게 제공하기 위하여 컴퓨터
                등 정보통신설비를 이용하여 텍스트 형태의 글과 이미지를 업로드할
                수 있도록 설정한 가상의 공간을 말합니다. “이용자”란 “앱”에
                접속하여 서비스를 이용하는 회원 및 비회원을 말합니다. “회원”이라
                함은 “앱”에 개인정보를 제공하여 회원등록을 한 자로서, “앱”의
                정보를 지속적으로 제공받으며, “웹사이트”이 제공하는 서비스를
                계속적으로 이용할 수 있는 자를 말합니다. “비회원”이라 함은
                회원에 가입하지 않고, “웹사이트”이 제공하는 서비스를 이용하는
                자를 말합니다. “ID”라 함은 이용자가 회원가입 당시 등록한 사용자
                “개인이용문자”를 말합니다. “멤버십”이라 함은 회원등록을 한
                자로서, 별도의 온/오프라인 상에서 추가 서비스를 제공 받을 수
                있는 회원을 말합니다.
              </p>
              <h5>제 3 조 (약관의 공시 및 효력과 변경)</h5>
              <p>
                본 약관은 회원가입 화면에 게시하여 공시하며 팀은 사정변경 및
                영업상 중요한 사유가 있을 경우 약관을 변경할 수 있으며 변경된
                약관은 공지사항을 통해 공시한다. 본 약관 및 차후 팀 사정에 따라
                변경된 약관은 이용자에게 공시함으로써 효력을 발생한다.
              </p>
              <h5>제 4 조 (약관 외 준칙)</h5>
              <p>
                본 약관에 명시되지 않은 사항이 전기통신기본법, 전기통신사업법,
                정보통신촉진법, ‘전자상거래등에서의 소비자 보호에 관한 법률’,
                ‘약관의 규제에관한법률’, ‘전자거래기본법’, ‘전자서명법’,
                ‘정보통신망 이용촉진등에 관한 법률’, ‘소비자보호법’ 등 기타 관계
                법령에 규정되어 있을 경우에는 그 규정을 따르도록 한다.
              </p>
            </div>
          </>
        );
      case 'terms2':
        return (
          <>
            <div className="Terms-title">
              <div className="Terms-back-btn" onClick={handleBack}>
                <img src={BackIcon} alt="뒤로가기" />
              </div>
              <div className="Terms-square"></div>
              <div className="Terms-title-text">개인정보 처리방침</div>
            </div>
            <p className="Terms-last-modified">
              최종 수정일: 2024년 7월 3일(GMT 표준시 오전 12시 00분)
            </p>
            <hr className="Terms-divider" />
            <div className="Terms-content">
              <p>개인정보 처리방침 내용을 입력하세요.</p>
            </div>
          </>
        );
      case 'terms3':
        return (
          <>
            <div className="Terms-title">
              <div className="Terms-back-btn" onClick={handleBack}>
                <img src={BackIcon} alt="뒤로가기" />
              </div>
              <div className="Terms-square"></div>
              <div className="Terms-title-text">
                게시물 및 댓글 작성 윤리 지침
              </div>
            </div>
            <p className="Terms-last-modified">
              최종 수정일: 2024년 7월 3일(GMT 표준시 오전 12시 00분)
            </p>
            <hr className="Terms-divider" />
            <div className="Terms-content">
              <p>게시물 및 댓글 작성 윤리 지침 내용을 입력하세요.</p>
            </div>
          </>
        );
      case 'terms4':
        return (
          <>
            <div className="Terms-title">
              <div className="Terms-back-btn" onClick={handleBack}>
                <img src={BackIcon} alt="뒤로가기" />
              </div>
              <div className="Terms-square"></div>
              <div className="Terms-title-text">마케팅 정보 수신 동의</div>
            </div>
            <p className="Terms-last-modified">
              최종 수정일: 2024년 7월 3일(GMT 표준시 오전 12시 00분)
            </p>
            <hr className="Terms-divider" />
            <div className="Terms-content">
              <p>마케팅 정보 수신 동의 내용을 입력하세요.</p>
            </div>
          </>
        );
      case 'terms5':
        return (
          <>
            <div className="Terms-title">
              <div className="Terms-back-btn" onClick={handleBack}>
                <img src={BackIcon} alt="뒤로가기" />
              </div>
              <div className="Terms-square"></div>
              <div className="Terms-title-text">버그 자동 전송</div>
            </div>
            <p className="Terms-last-modified">
              최종 수정일: 2024년 7월 3일(GMT 표준시 오전 12시 00분)
            </p>
            <hr className="Terms-divider" />
            <div className="Terms-content">
              <p>버그 자동 전송 내용을 입력하세요.</p>
            </div>
          </>
        );
      default:
        return <p>잘못된 접근입니다.</p>;
    }
  };

  return <div className="Terms-container">{renderContent()}</div>;
};

export default Terms;
