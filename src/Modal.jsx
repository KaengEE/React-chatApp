export const Modal = ({ setModalOpen, userId }) => {
  console.log(userId);

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
        <h3>유저정보</h3>
        {userId && (
          <div className="modal-content">
            <img
              className="modal-img"
              src={"https://api.adorable.io/avatars/23/abott@adorable.png"}
            />
            <p>이름: </p>
            <p>아이디: </p>
            <p>uid: {userId}</p>
          </div>
        )}
      </div>
    </div>
  );
};
