import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Question from './Question';
import FetchButton from './FetchButton';

function QuizSettings() {
  const [options, setOptions] = useState(null);

  const loading = useSelector(state => state.options.loading); 
  const questionCategory = useSelector(state => state.options.question_category); 
  const questionDifficulty = useSelector(state => state.options.question_difficulty);
  const questionType = useSelector(state => state.options.question_type);
  const questionAmount = useSelector(state => state.options.amount_of_questions);

  const questionsList = useSelector(state => state.questions);

  const dispatch = useDispatch();

  useEffect(() => {
    const apiUrl = `https://opentdb.com/api_category.php`;

    const handleLoadingChange = value => {
      dispatch({
        type: 'CHANGE_LOADING',
        loading: value
      })
    };

    handleLoadingChange(true);

    fetch(apiUrl)
      .then((resp) => resp.json())
      .then((response) => {
        handleLoadingChange(false);
        setOptions(response.trivia_categories);
      });
  }, [setOptions, dispatch]);

  const handleCategoryChange = event => {
    dispatch({
      type: 'CHANGE_CATEGORY',
      value: event.target.value
    })
  };

  const handleDifficultyChange = event => {
    dispatch({
      type: 'CHANGE_DIFFICULTY',
      value: event.target.value
    })
  };

  const handleTypeChange = event => {
    dispatch({
      type: 'CHANGE_TYPE',
      value: event.target.value
    })
  };

  const handleAmountChange = event => {
    dispatch({
      type: 'CHANGE_AMOUNT',
      value: event.target.value
    })
  };

  if (!loading) {
    return (
      <div>
        {
          (questionCategory !== '' && questionDifficulty !== '' && questionType !== '' && (questionAmount > 0 && questionAmount <= 50)) ? (
            (Object.keys(questionsList).length > 0) ? 
            <Question /> :
            <FetchButton text='Start Quiz...' />
          ) : (
            <div>
              <div>
                <h2>Select Category:</h2>
                <select
                  className='selectInput'
                  value={questionCategory}
                  onChange={handleCategoryChange}
                >
                  <option>All</option>
                  {options &&
                    options.map((option) => (
                      <option value={option.id} key={option.id}>
                        {option.name}
                      </option>
                    ))}
                </select>
              </div>

              <div>
                <h2>Select Difficulty:</h2>
                <select
                  className='selectInput'
                  value={questionDifficulty}
                  onChange={handleDifficultyChange}
                >
                  <option value="" key="difficulty-0">All</option>
                  <option value="easy" key="difficulty-1">Easy</option>
                  <option value="medium" key="difficulty-2">Medium</option>
                  <option value="hard" key="difficulty-3">Hard</option>
                </select>
              </div>

              <div>
                <h2>Select Question Type:</h2>
                <select
                  className='selectInput'
                  value={questionType}
                  onChange={handleTypeChange}
                >
                  <option value="" key="type-0">All</option>
                  <option value="multiple" key="type-1">Multiple Choice</option>
                  <option value="boolean" key="type-2">True/False</option>
                </select>
              </div>

              <div>
                <h2>Amount of Questions:</h2>
                <input
                  className='selectInput'
                  placeholder='Max 50'
                  value={questionAmount}
                  onChange={handleAmountChange}
                />
              </div>
            </div>
          )
        }
      </div>
    );
  }
  return (
    <p>
      LOADING...
    </p>
  );
}
export default QuizSettings;
