import React from 'react';
import styles from './QuoteCard.module.css';
import { useState, useEffect } from 'react';


function QuoteCard() {
  const [quote, setQuote] = useState([]);
  const [quotesArr, setQuotesArr] = useState([]);
  const [number, setNumber] = useState(0);

  function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  useEffect(() => {
    setQuote(quotesArr[number]);
  }, [number]);

  useEffect(() => {
    const quoteFetch = async () => {
      const quotesArr = JSON.parse(localStorage.getItem('quotes'));
      if (quotesArr) {
        setQuotesArr(quotesArr);
      } else {
        const quotes = await (
          await fetch(
            "https://type.fit/api/quotes"
          )
        ).json();
        localStorage.setItem('quotes', JSON.stringify(quotes));
      }
      setNumber(random(0, quotesArr.length));
      setQuote(quotesArr[number]);
    };
    quoteFetch();
  }, []);

  return (
    <>
      <div className={styles.card}>
        <div className={styles.text}>{quote.text}</div>
        <div className={styles.author}>{quote.author}</div>
        <button className={styles.button} onClick={() => setNumber(random(0, quotesArr.length))}>Click</button>
      </div>
    </>
  );
}

export default QuoteCard;