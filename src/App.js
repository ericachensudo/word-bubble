import React, { useState, useEffect } from 'react';
import WordCloudVisualization from './components/WordCloudVisualization';

function App() {
  const [text, setText] = useState('');
  const [storedValues, setStoredValues] = useState(() => {
    const stored = localStorage.getItem('inputValues');
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem('inputValues', JSON.stringify(storedValues));
  }, [storedValues]);

  const handleChange = (event) => {
    setText(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (text.trim() !== '') {
      setStoredValues((prevValues) => [...prevValues, text]);
      setText('');
    }
  };

  return (
    <div>
      <h1>What are you grateful for right now?</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={text}
          onChange={handleChange}
          placeholder="Type something..."
          style={{ padding: '10px', fontSize: '16px', marginBottom: '20px' }}
        />
        <button type="submit">Submit</button>
      </form>

      <div className="App">
        <h1>Word Cloud Visualization</h1>
        <WordCloudVisualization words={storedValues} />
      </div>
    </div>
  );
}

export default App;
