import React from "react";

const Home = ({user}) => {
    return (
        <div className="container">
            <div className="row">
                <div className="col-sm-10 offset-sm-3 mt-5">
                    <div className="card m-5 mt-5 w-50">
                        <h1>{`Доброго дня, ${user.firstName}`}</h1>
                        <h3>{`JWT Token: ${user.jwtToken}`}</h3>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;