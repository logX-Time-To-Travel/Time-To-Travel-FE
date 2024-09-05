import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Initialization.css';

import navigateIcon from '../../assets/Initialization_navigate.png';
import homeIcon from '../../assets/Initialization_home1.png';
import messageIcon from '../../assets/Initialization_message1.png';
import messageheartIcon from '../../assets/Initialization_messageheart1.png';

function Initialization() {
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  const handlePageClick = () => {
    setCurrentPage((prevPage) => (prevPage === 4 ? 2 : prevPage + 1));
  };

  const renderPage = () => {
    const pages = [
      {
        img: navigateIcon,
        title: 'Time To Travel',
        version: '버전: v1.1.23',
      },
      {
        img: homeIcon,
        text: '모르고 지나쳤던\n주변의 여행 정보를\n알아보세요.',
        button: '계정 만들고 시작하기',
      },
      {
        img: messageIcon,
        text: '다른 사람들의 후기로\n본인에게 잘 맞는\n여행지를 탐색하세요.',
        button: '계정 만들고 시작하기',
      },
      {
        img: messageheartIcon,
        text: '여행지 후기를 작성하여\n많은 여행자들과\n공유하세요.',
        button: '계정 만들고 시작하기',
      },
    ];

    const { img, text, title, version, button } = pages[currentPage - 1];

    return (
      <div className={'Initialization-page'} onClick={handlePageClick}>
        <div
          className={`Initialization-icon-container page-${currentPage}`}
          style={{
            backgroundImage: `url(${img})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        ></div>
        {title && <div className="Initialization-title">{title}</div>}
        {text && <div className="Initialization-text">{text}</div>}
        {version && <div className="Initialization-version">{version}</div>}
        {button && (
          <>
            <button
              className="Initialization-sign-up-button"
              onClick={(e) => {
                e.stopPropagation();
                navigate('/signup');
              }}
            >
              {button}
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
          </>
        )}
      </div>
    );
  };

  return <div className="Initialization-container">{renderPage()}</div>;
}

export default Initialization;
