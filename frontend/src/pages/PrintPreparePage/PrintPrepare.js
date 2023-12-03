import React, { useState } from "react";

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Link } from 'react-router-dom';

const PrintPrepare = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [pageSize, setPageSize] = useState("A4");
  const [pageCount, setPageCount] = useState(0);
  const [duplex, setDuplex] = useState(2);
  const [copyCount, setCopyCount] = useState(1);
  const [showNotification, setShowNotification] = useState(false);

  const handleFileDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    setSelectedFile(file);
    // Lấy thông số của file
    const fileSize = file.size;
    // Cập nhật thông số của file
    setPageCount(fileSize);
    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
    }, 4000);
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    // Lấy thông số của file
    const fileSize = file.size;
    // Cập nhật thông số của file
    setPageCount(fileSize);
    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
    }, 4000);
  };

  const handlePageSizeChange = (event) => {
    setPageSize(event.target.value);
  };

  const handleDuplexChange = (event) => {
    setDuplex(parseInt(event.target.value));
  };

  const handleCopyCountChange = (event) => {
    setCopyCount(parseInt(event.target.value));
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  return (
    <div className="Container">
      {showNotification && (
        <div className="notification">
          Đã tải file thành công
        </div>
      )}
      <Row>
        <Col className="left" style={{ width: "50%" }}>
          <h3>Tải file lên hệ thống</h3>
          <div className="uploadFrame"
            onDrop={handleFileDrop} onDragOver={handleDragOver}>
            {selectedFile ?
              (<h4 className="uploadText">
                Selected File:
                {selectedFile.name}</h4>
              )
              :
              (<div>
                <h4 className="uploadText">Tải file lên</h4>
                <input className="upload" type="file" onChange={handleFileUpload} />
              </div>
              )}
          </div>
        </Col>
        <Col style={{ width: "50%" }}>
          <Row>
            <h2 className="h2-text">Thông số in</h2>
            <div className="frameConfig">
              <div className="config">
                <form>
                  <Row>
                    <Col>
                      <label>
                        Kich thước trang:
                        <select value={pageSize} onChange={handlePageSizeChange}>
                          <option value="A0">A0</option>
                          <option value="A1">A1</option>
                          <option value="A2">A2</option>
                          <option value="A3">A3</option>
                          <option value="A4">A4</option>
                        </select>
                      </label>
                    </Col>
                    <Col>
                      <label>
                        Số trang:
                        <br />
                        <span className="count">{pageCount}</span>
                      </label>
                    </Col>
                  </Row>
                  <br />
                  <Row>
                    <Col>
                      <label>
                        Số mặt:
                        <select value={duplex} onChange={handleDuplexChange}>
                          <option value={1}>1</option>
                          <option value={2}>2</option>
                        </select>
                      </label>
                    </Col>
                    <Col>
                      <label>
                        Số bản sao:
                        <input type="number" value={copyCount} onChange={handleCopyCountChange} min={1} />
                      </label>
                    </Col>
                  </Row>
                  <br />
                </form>
              </div>
            </div>
          </Row>
          <br />
          <Row>
            <h2 className="h2-text-file">File in</h2>
            <br />
            {selectedFile ?
              (<div>
                <p className="file">{selectedFile.name}</p>
                <div>
                  <label className="sodu">
                    Số dư hiện tại:
                    <span className="count">300</span>
                  </label>
                  <label className="sotrangin">
                    Số dư hiện tại:
                    <span className="count">{pageCount * (2 / duplex)}</span>
                  </label>
                  <br></br>
                  <br></br>
                  <Link to='/listprinter' class="btn-cp">Chọn máy in</Link>
                </div>

              </div>)
              :
              (<div></div>)}
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default PrintPrepare