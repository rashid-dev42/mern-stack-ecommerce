const ToastMessage = ({ success, message, setShowToast }) => {
  const bgColor = success ? "green" : "red";
  
  return (
    <div className="position-fixed bottom-0 end-0 p-3"> 
      <div className="text-light py-3" style={{ backgroundColor: bgColor }}>
        <div className="d-flex">
          <p className="fs-5 m-0 px-3">{message}</p>
          <span role="button" className="fs-5 pe-3" onClick={() => setShowToast(false)}>
            <i className="bi bi-x-lg"></i>
          </span>
        </div>
      </div>
    </div> 
  );
};

export default ToastMessage;