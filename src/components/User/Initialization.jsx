// import { useState } from 'react'; // useState 추가
// import { useNavigate } from 'react-router-dom';
// import './Initialization.css';

// function Initialization() {
//   const [currentPage, setCurrentPage] = useState(1);
//   const navigate = useNavigate();

//   const handlePageClick = () => {
//     if (currentPage === 1) {
//       setCurrentPage(2);
//     } else if (currentPage === 2) {
//       setCurrentPage(3);
//     } else if (currentPage === 3) {
//       setCurrentPage(4);
//     } else if (currentPage === 4) {
//       setCurrentPage(2); // 마지막 페이지에서 다시 2페이지로 이동
//     }
//   };

//   const renderPage = () => {
//     if (currentPage === 1) {
//       return (
//         <div className="page page-1" onClick={handlePageClick}>
//           <div className="polygon-outer">
//             <div className="polygon-inner"></div>
//           </div>
//           <div className="title">Time To Travel</div>
//           <div className="version">버전: v1.1.23</div>
//         </div>
//       );
//     } else if (currentPage === 2) {
//       return (
//         <div className="page page-2" onClick={handlePageClick}>
//           <div className="house-container">
//             <div className="house-body">
//               <div className="door"></div>
//               <div className="windows"></div>
//               <div className="chimney"></div>
//               <div className="roof"></div>
//             </div>
//             <div className="floor"></div>
//           </div>
//           <div className="text">
//             모르고 지나쳤던 주변의 여행 정보를 알아보세요.
//           </div>
//           <button
//             className="sign-up-button"
//             onClick={(e) => {
//               e.stopPropagation();
//               navigate('/signup');
//             }}
//           >
//             계정 만들고 시작하기
//           </button>
//           <div
//             className="sign-in"
//             onClick={(e) => {
//               e.stopPropagation();
//               navigate('/signin');
//             }}
//           >
//             Sign in
//           </div>
//         </div>
//       );
//     } else if (currentPage === 3) {
//       return (
//         <div className="page page-3" onClick={handlePageClick}>
//           <div className="feedback-container">
//             <div className="feedback-smile"></div>
//             <div className="feedback-love"></div>
//             <div className="feedback-heart"></div>
//           </div>
//           <div className="text">
//             다른 사람들의 후기로 본인에게 잘 맞는 여행지를 탐색하세요.
//           </div>
//           <button
//             className="sign-up-button"
//             onClick={(e) => {
//               e.stopPropagation();
//               navigate('/signup');
//             }}
//           >
//             계정 만들고 시작하기
//           </button>
//           <div
//             className="sign-in"
//             onClick={(e) => {
//               e.stopPropagation();
//               navigate('/signin');
//             }}
//           >
//             Sign in
//           </div>
//         </div>
//       );
//     } else if (currentPage === 4) {
//       return (
//         <div className="page page-4" onClick={handlePageClick}>
//           <div className="icons-container">
//             <div className="icon comments"></div>
//             <div className="icon love-it"></div>
//           </div>
//           <div className="text">
//             여행지 후기를 작성하여 많은 여행자들과 공유하세요.
//           </div>
//           <button
//             className="sign-up-button"
//             onClick={(e) => {
//               e.stopPropagation();
//               navigate('/signup');
//             }}
//           >
//             계정 만들고 시작하기
//           </button>
//           <div
//             className="sign-in"
//             onClick={(e) => {
//               e.stopPropagation();
//               navigate('/signin');
//             }}
//           >
//             Sign in
//           </div>
//         </div>
//       );
//     }
//   };

//   return <div className="initialization-container">{renderPage()}</div>;
// }

// export default Initialization;
