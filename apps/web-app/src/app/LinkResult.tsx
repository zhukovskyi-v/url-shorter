import axios from 'axios';
import React, { FC, useEffect, useState } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';

const LinkResult: FC<any> = ({ inputValue }) => {
  const [shortenLink, setShortenLink] = useState('');
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetchData = async () => {
    try {
      setError(false);
      setLoading(true);
      const { data } = await axios.post(`http://localhost:6789/api/short`, {
        originalUrl: inputValue,
      });
      setShortenLink(data.shortUrl);
    } catch (err) {
      console.log(err);

      setError(!!err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (inputValue.length) {
      fetchData();
    }
  }, [inputValue]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCopied(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [copied]);

  if (loading) {
    return <p className="noData">Loading...</p>;
  }
  if (error) {
    return <p className="noData">Something wne t wrong :(</p>;
  }

  if (shortenLink) {
    return (
      <div className="result">
        <a href={shortenLink} target="black" className='link'>
          {shortenLink}
        </a>
        <CopyToClipboard text={shortenLink} onCopy={() => setCopied(true)}>
          <button className={copied ? 'copied' : ''}>Copy to Clipboard</button>
        </CopyToClipboard>
      </div>
    );
  }

  return null;
};

export default LinkResult;
