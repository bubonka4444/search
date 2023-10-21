import data from './data';
import './App.css';
import { useState } from 'react';

function App() {

  const [searchStarted, setSearchStarted] = useState(false)
  
  //запрос, вводимый пользователем
  let [userRequest, setUserRequest] = useState('')

  let handleUserRequestInput = (e) => {
    setUserRequest(e.target.value)
  }

  //поиск совпадений в заголовках
  function findEquals (request = '') {
    request = request.toLowerCase();
    let topResult = [];
    for (let item of data) {
      let resultTitle = item.title.toLowerCase();
      if (resultTitle.includes(request) &&
      isCorrectLength(request)) {
        topResult.push(item)
      } else continue
    }
    return topResult;
  }
  
  //поиск аббревиатур
  function findAbbreviation (request = '') {
    request = request.toLowerCase();
    let abbreviations = [];
    for (let item of data) {
      let title = item.title.toLowerCase()
      if (isCorrectLength(request)) {
        let ArrForTitle = title.split(' ')
          let titleAbbreviation = makeAbbreviation(ArrForTitle)
          //сравнение введённой аббревиатуры с заголовком
          if (titleAbbreviation.slice(0, request.length) == request) {
            abbreviations.push(item)
          } else continue
        }
    }
    return abbreviations;
  }

  //аббревиатура из заголовка
  function makeAbbreviation (arr) {
    let abbreviation = arr.reduce((prevVal, curWord) => 
    prevVal + (curWord ? curWord[0]: ''), '')
    return abbreviation;
  }

  //поиск начинается, если пользователь ввёл минимум два символа
  function isCorrectLength (str) {
    return (str.length >= 2) ? true : false;
  }
  
  let abbreviations = findAbbreviation(userRequest)
  let topResult = findEquals(userRequest);
  let AbbrTitle = abbreviations[0]?.category;

  return (
    <>
      <input  className="searchBar" type="search"  placeholder="Поиск..."
      onChange={() => searchStarted ? setSearchStarted(searchStarted) : setSearchStarted(!searchStarted)}
      onBlur={() => setSearchStarted(!searchStarted)}
      value={userRequest}
      onInput={handleUserRequestInput} 
      />
      
      <section className={(searchStarted &&
        abbreviations.length > 0 || 
        topResult.length > 0) ? 'active' : 'not-active'}>
        <ul className='abbr'>
          
          <p className='abbr-title'>{AbbrTitle}</p>

          {abbreviations?.map((result, index) => (
            <li key={index}>{result.title}</li>
          ))}
        </ul>
        <ul className='equals'>
          <p className='categories-title'>Рубрики</p>
          {topResult?.map((result, index) => (
            <li key={index}>
              <p>{result.category}</p>
              {result.title}
              </li>
          ))}
        </ul>
      </section>
    </>
  );
  
}

export default App;
