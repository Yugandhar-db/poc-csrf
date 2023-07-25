import React, { useState, useEffect } from 'react';


const CSRFToken = () => {
  const [csrftoken, setcsrftoken] = useState('');

  function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
      const cookies = document.cookie.split(';');
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        // Does this cookie string begin with the name we want?
        if (cookie.substring(0, name.length + 1) === name + '=') {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }

    return cookieValue;
  }

  
  useEffect(() => {
    console.log('COOKIE===>',getCookie('csrftoken'))
    setcsrftoken(getCookie('csrftoken'));
  }, []);

  return <input type="hidden" name="csrfmiddlewaretoken" value={csrftoken} />;
};

export default CSRFToken;
