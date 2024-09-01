import { useState } from 'react'; // useState 추가
import { useNavigate } from 'react-router-dom';
import './Initialization.css';

import navigateIcon from '../../assets/Initialization_navigate.png';
import homeIcon from '../../assets/Initialization_home.png';
import messageIcon from '../../assets/Initialization_message.png';
import messageheartIcon from '../../assets/Initialization_messageheart.png';

function Initialization() {
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  const handlePageClick = () => {
    if (currentPage === 1) {
      setCurrentPage(2);
    } else if (currentPage === 2) {
      setCurrentPage(3);
    } else if (currentPage === 3) {
      setCurrentPage(4);
    } else if (currentPage === 4) {
      setCurrentPage(2); // 마지막 페이지에서 다시 2페이지로 이동
    }
  };

  const renderPage = () => {
    if (currentPage === 1) {
      return (
        <div
          className="Initialization-page Initialization-page-1"
          onClick={handlePageClick}
        >
          {/* 외곽 다각형을 이미지로 대체 */}
          <div
            className="Initialization-polygon-outer"
            style={{
              backgroundImage: `url(${navigateIcon}`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div className="Initialization-polygon-inner"></div>
          </div>
          <div className="Initialization-title">Time To Travel</div>
          <div className="Initialization-version">버전: v1.1.23</div>
        </div>
      );
    } else if (currentPage === 2) {
      return (
        <div
          className="Initialization-page Initialization-page-2"
          onClick={handlePageClick}
        >
          <div
            className="Initialization-house-container"
            style={{
              backgroundImage: `url(${homeIcon})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          ></div>
          <div className="Initialization-text">
            모르고 지나쳤던{'\n'}
            주변의 여행 정보를{'\n'}
            알아보세요.
          </div>

          <button
            className="Initialization-sign-up-button"
            onClick={(e) => {
              e.stopPropagation();
              navigate('/signup');
            }}
          >
            계정 만들고 시작하기
          </button>
          <div
            className="Initialization-sign-in"
            onClick={(e) => {
              e.stopPropagation();
              navigate('/signin');
            }}
          >
            이미 계정이 있습니다. 로그인
          </div>
        </div>
      );
    } else if (currentPage === 3) {
      return (
        <div
          className="Initialization-page Initialization-page-3"
          onClick={handlePageClick}
        >
          {/* 기존 피드백 버튼 대신 이미지 사용 */}
          <div
            className="Initialization-message-icon"
            style={{
              backgroundImage: `url(${messageIcon})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              width: '109px',
              height: '108px',
            }}
          ></div>
          <div className="Initialization-text">
            다른 사람들의 후기로{'\n'}
            본인에게 잘 맞는{'\n'}
            여행지를 탐색하세요.
          </div>
          <button
            className="Initialization-sign-up-button"
            onClick={(e) => {
              e.stopPropagation();
              navigate('/signup');
            }}
          >
            계정 만들고 시작하기
          </button>
          <div
            className="Initialization-sign-in"
            onClick={(e) => {
              e.stopPropagation();
              navigate('/signin');
            }}
          >
            이미 계정이 있습니다. 로그인
          </div>
        </div>
      );
    } else if (currentPage === 4) {
      return (
        <div
          className="Initialization-page Initialization-page-4"
          onClick={handlePageClick}
        >
          <div className="Initialization-icons-container">
            {/* messageheartIcon 이미지를 두 개의 아이콘 위치에 적용 */}
            <div
              className="Initialization-icon"
              style={{
                backgroundImage: `url(${messageheartIcon})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                width: '54px',
                height: '52px',
              }}
            ></div>
            <div
              className="Initialization-icon"
              style={{
                backgroundImage: `url(${messageheartIcon})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                width: '54px',
                height: '52px',
              }}
            ></div>
          </div>
          <div className="Initialization-text">
            여행지 후기를 작성하여{'\n'}
            많은 여행자들과{'\n'}
            공유하세요.
          </div>
          <button
            className="Initialization-sign-up-button"
            onClick={(e) => {
              e.stopPropagation();
              navigate('/signup');
            }}
          >
            계정 만들고 시작하기
          </button>
          <div
            className="Initialization-sign-in"
            onClick={(e) => {
              e.stopPropagation();
              navigate('/signin');
            }}
          >
            이미 계정이 있습니다. 로그인
          </div>
        </div>
      );
    }
  };

  return <div className="Initialization-container">{renderPage()}</div>;
}

export default Initialization;
