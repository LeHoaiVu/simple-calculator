import React from "react";

const Result = (props) => {
    const { result, showResult } = props;
    return (
        <div className="result">
            <span className="result-calculation">{showResult()}</span>
            <span className="result-final">
                {result === 0 ? "Result" : result}
            </span>
        </div>
    );
};

export default Result;
