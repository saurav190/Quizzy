import React from "react";

function QuizResult(props) {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
        {/* Current Score Section */}
        {props.attemptCount < 6 && (
          <div className="bg-gray-50 rounded-lg p-4">
            <h2 className="text-2xl font-semibold mb-4">Your Current Score</h2>
            <div className="flex flex-col items-center">
              <p className="text-2xl border-2 rounded p-3">
                Your Score: {props.score}
              </p>
              <p className="text-2xl border-2 rounded p-3 mt-4">
                Total Score: {props.totalScore}
              </p>
            </div>
          </div>
        )}
        {/* User History Section */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h2 className="text-2xl font-semibold mb-4">
            Your Previous History about the Quiz
          </h2>
          <div className="flex flex-col items-center">
            {props.userAttemptHistory.map((attempt, index) => (
              <p key={index} className="text-lg mb-2">
                Attempt {index + 1}: Time: {attempt.timestamp} Score:{" "}
                {attempt.score}
              </p>
            ))}
            {props.attemptCount < 6 &&
            <p className="text-lg mt-4">
                `You have attempted this Quiz ${props.attemptCount} times out of the 5 times.`
            </p>
            }
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center mt-6">
        <button
          onClick={props.Gotoquizzes}
          className="border border-[#385A64]  text-[#385A64] shadow-md px-4 py-2 rounded text-lg hover:bg-[#385A64] hover:text-white"
        >
          Go to the quizzes
        </button>
      </div>
    </>
  );
}

export default QuizResult;
