import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';
import { useNavigate, useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
// this component is used to show a single article
function Post(props) {
  let navigate = useNavigate();
  let { id } = useParams();
  //
  const [data, setData] = useState({});
  const [showLoading, setShowLoading] = useState(true);
  const apiUrl = '/api/api/articles/' + id;

  useEffect(() => {
    setShowLoading(false);
    const fetchData = async () => {
      const result = await axios(apiUrl);
      console.log('result:', result.data.creator.nickName);
      setData(result.data);
      setShowLoading(false);
    };

    fetchData();
  }, []);

  return (
    <div>
      {showLoading && (
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      )}
      <h1 className="fs-4">{data.title}</h1>
      <a className="text-secondary mb-6 text-decoration-none" href="/">
        By {data.creator?.nickName || 'Unknow Author'}
      </a>

      {/* Markdown 渲染区域 */}
      <main className="markdown-body mt-4">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{data.content}</ReactMarkdown>
      </main>
    </div>
  );
}

export default Post;
