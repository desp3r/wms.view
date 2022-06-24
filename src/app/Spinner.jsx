const Spinner = () => {
    return (
        <>
            <div className="d-flex justify-content-center align-items-center m-5">
                <strong className="me-3" style={{fontSize: "26px"}}>Зачекайте</strong>
                <div className="spinner-grow text-dark ms-1" role="status" style={{ width: "1rem", height: "1rem"}}/>
                <div className="spinner-grow text-dark ms-1" role="status" style={{ width: "2rem", height: "2rem"}}/>
                <div className="spinner-grow text-dark ms-1" role="status" style={{ width: "3rem", height: "3rem"}}/>
            </div>
            <div className="d-flex justify-content-center" />
        </>
    );
}

export default Spinner;