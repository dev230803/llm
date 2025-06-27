import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const result = await axios.post('http://localhost:3001/api/generate', { prompt });
      setResponse(result.data.response);
    } catch (err) {
      setError('Failed to get response. Please try again.');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <div className="container">
        <h1>AI Text Generator</h1>
        <form onSubmit={handleSubmit} className="form">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Enter your prompt here..."
            className="prompt-input"
            rows="4"
          />
          <button type="submit" disabled={loading || !prompt.trim()}>
            {loading ? 'Generating...' : 'Generate'}
          </button>
        </form>
        
        {error && <div className="error">{error}</div>}
        
        {response && (
          <div className="response-container">
            <h2>Response:</h2>
            <div className="response">{response}</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
