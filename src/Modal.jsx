export const Modal = ({ setModalOpen, userInfo }) => {
  //console.log(userInfo);

  //창닫기
  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="modal-background">
      <div className="modal-container">
        <button onClick={closeModal} className="modal-close">
          X
        </button>
        <h3>유저 정보</h3>
        {userInfo && (
          <div className="modal-content">
            <img
              className="modal-img"
              src={
                userInfo.photoURL ||
                "https://api.adorable.io/avatars/23/abott@adorable.png"
              }
            />
            <div className="userInfo">
              <p>이름: {userInfo.displayName} </p>
              <p>아이디: {userInfo.email}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
