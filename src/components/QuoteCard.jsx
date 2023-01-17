import React from 'react';
import styles from './QuoteCard.module.css';
import { useState, useEffect } from 'react';

const colors = ['#f7e3df', '#f2d7c9', '#e1ab99', '#deb5b3', '#9d7a73'];


function QuoteCard() {
  const [quote, setQuote] = useState([]);
  const [quotesArr, setQuotesArr] = useState([]);
  const [color, setColor] = useState(colors[0]);

  function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

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
      setColor(colors[random(0, colors.length - 1)]);
      setQuote(quotesArr[random(0, quotesArr.length - 1)]);

    };
    quoteFetch();
  }, []);

  function clickHandle() {
    setQuote(quotesArr[random(0, quotesArr.length - 1)]);
    setColor(colors[random(0, colors.length - 1)]);

  }


  return (
    <>
      <div className={styles.card} style={{ backgroundColor: color }}>
        <div className={styles.text}>{quote.text}</div>
        <div className={styles.author}>{quote.author}</div>
        <button className={styles.button} onClick={() => clickHandle()}>New quote</button>
      </div>
    </>
  );
}

export default QuoteCard;