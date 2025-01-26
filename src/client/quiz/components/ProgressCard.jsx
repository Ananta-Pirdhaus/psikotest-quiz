import React from "react";

const ProgressCard = ({
  questions,
  handleProgressToggle,
  handleLinkFromProgress,
}) => {
  return (
    <div className="flex justify-center">
      <div className="w-full max-w-3xl p-4 bg-white border border-gray-200 rounded-md shadow sm:p-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg sm:text-xl font-bold leading-none text-gray-900">
            Your Progress
          </h2>
          <button
            type="button"
            className="text-white bg-yellow-500 hover:bg-yellow-600 focus:ring-4 focus:ring-yellow-300 font-medium rounded-full text-sm px-7 py-2.5 me-2 mb-2"
            onClick={handleProgressToggle}
          >
            Return to Quiz
          </button>
        </div>

        <div className="relative overflow-x-auto shadow-md sm:rounded-lg max-h-96">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3  w-1/6">
                  Question
                </th>
                <th scope="col" className="px-6 py-3">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {questions.map((question) => (
                <tr
                  key={question.id}
                  onClick={() => handleLinkFromProgress(question.id - 1)}
                  className="bg-white border-b hover:bg-gray-50 hover:underline cursor-pointer"
                >
                  <td
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap text-center"
                  >
                    {question.question}
                  </td>
                  {localStorage.getItem(`question_${question.id}`) != null ? (
                    <td className="px-6 py-4">Answered</td>
                  ) : (
                    <td className="px-6 py-4 font-semibold">Not answered</td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProgressCard;
