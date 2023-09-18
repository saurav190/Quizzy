import React from "react";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <section className="bg-white p-10">
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            <div className="col-sm-10 col-sm-offset-1 text-center">
              <div className=" bg-[url('https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif')] bg-center h-[400px]">
                <h1 className=" text-7xl font-medium text-center">404</h1>
              </div>
              <div className="contant_box_404 text-xl ">
                <h3 className="h2">Look like you're lost</h3>
                <p className="mb-2">
                  The page you are looking for is not available!
                </p>
                <Link
                  to="/"
                  className="py-2 px-5  bg-[#385A64] shadow-lg shadow-teal-500/50 hover:shadow-teal-500/40 text-white font-semibold rounded-lg"
                >
                  Go to Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ErrorPage;
