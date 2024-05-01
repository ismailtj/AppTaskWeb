import React from "react";

const ErrorPage = ({ errorCode, errorMessage }) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="bg-red-500 text-white font-bold rounded-lg border shadow-lg p-10">
        <div className="text-4xl mb-4">{errorCode}</div>
        <div className="text-lg">{errorMessage}</div>
      </div>
    </div>
  );
};

export default ErrorPage;
