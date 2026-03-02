import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate, useParams } from 'react-router-dom';
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css"; // 必须引入 CSS 样式
// this component is used to edit an article
function EditArticle(props) {
  //
  let navigate = useNavigate();
  // Get the userId param from the URL.
  let { id } = useParams();
  console.log(id)
  //
  const [article, setArticle] = useState({ _id: '', title: '', 
  content: '' });  
  const [showLoading, setShowLoading] = useState(true);
  const apiUrl = "/api/api/articles/" + id;

  // 配置项：可以自定义工具栏、自动聚焦等
  const autofocusOptions = useMemo(() => {
    return {
      autofocus: true,
      spellChecker: false, // 建议关闭拼写检查（中文环境下没用且费性能）
      placeholder: "开始撰写你的精彩故事...",
      // status: ["autosave", "lines", "words", "cursor"], // 底部状态栏显示信息
    };
  }, []);
  
  //runs only once after the first render
  useEffect(() => {
    setShowLoading(false);
    //call api
    const fetchData = async () => {
      const result = await axios(apiUrl);
      setArticle(result.data);
      console.log(result.data);
      setShowLoading(false);
    };

    fetchData();
  }, []);

  const updateArticle = (e) => {
    setShowLoading(true);
    e.preventDefault();
    const data = { title: article.title, content: article.content};
    //mimicks very much REST calls
    axios.put(apiUrl, data)
      .then((result) => {
        console.log('after calling put to update',result.data )
        setShowLoading(false);
        navigate('/admin/posts')
      }).catch((error) => setShowLoading(false));
  };
  //runs when user enters a field
  // 处理普通输入框 (Title)
  const onTitleChange = (e) => {
    // 现在的 React 17+ 已经不需要 e.persist() 了，可以直接删掉
    setArticle({ ...article, title: e.target.value });
  };

  // 处理 Markdown 编辑器 (Content)
  // SimpleMDE 的 onChange 返回的是直接的 value (string)
  const onContentChange = (value) => {
    setArticle({ ...article, content: value });
  };

  // const onChange = (e) => {
  //   e.persist();
  //   setArticle({...article, [e.target.name]: e.target.value});
  // }

  return (
    <div>
      {showLoading && 
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner> 
      } 
        <Form onSubmit={updateArticle}>
          <Form.Group>
            <Form.Label> Title</Form.Label>
            <Form.Control type="text" name="title" id="title" placeholder="Enter article title" value={article.title} onChange={onTitleChange} />
            </Form.Group>
          {/* <Form.Group>
            <Form.Label> Last Name</Form.Label>
            <Form.Control type="text" name="content" id="content" placeholder="Enter article content" value={article.content} onChange={onChange} />
          </Form.Group> */}
          
          {/* 编辑器组件 */}
      <div className="editor-container mb-3">
        <SimpleMDE 
          value={article.content} 
          onChange={onContentChange} 
          options={autofocusOptions} 
        />
      </div>
        
          <Button variant="primary" type="submit">
            Update Article
          </Button>
        </Form>
    </div>
  );
}
//
export default EditArticle;
