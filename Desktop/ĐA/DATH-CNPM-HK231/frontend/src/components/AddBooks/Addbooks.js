import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';
import { Formik } from 'formik';
import * as yup from 'yup';
import React, { useState, useRef, useEffect } from 'react';


const Forms = ({ onBookAdded }) => {

    const fileInputRef = useRef(null);

    const handleChooseFileClick = () => {
        fileInputRef.current?.click();
    };

    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const [formData, setFormData] = useState(null);





    const [showSuccessModal, setShowSuccessModal] = useState(false);
    // upload file image

    const [selectedImage, setSelectedImage] = useState(null);

    const handleImageChange = (e, setFieldValue) => {
        const file = e.target.files[0];
        console.log('Selected Image:', file);

        if (file instanceof File) {
            setSelectedImage(file);
            setFieldValue('image', file);
        } else {
            console.error('Invalid file format or no file selected.');
        }
    };


    const handleShowConfirmationModal = () => {
        setShowConfirmationModal(true);
    };

    const handleCloseConfirmationModal = () => {
        setShowConfirmationModal(false);
    };

    const handleShowSuccessModal = () => {
        setShowSuccessModal(true);
    };

    const handleCloseSuccessModal = (resetForm) => {
        setShowSuccessModal(false);
        resetForm();
    };


    const handleFormSubmit = async () => {
        try {
            if (formData) {

                console.log([...formData]);

                const response = await fetch('http://localhost:3001/books', {
                    method: 'POST',
                    body: formData,

                });

                if (response.ok) {
                    console.log('Book created successfully!');
                    handleShowSuccessModal();
                    onBookAdded();
                } else {
                    console.error('Failed to create book');
                }
            } else {
                console.error('Form data is missing.');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };


    const schema = yup.object().shape({
        title: yup.string().required('Vui lòng nhập tiêu đề.'),
        authorName: yup.string().required('Vui lòng nhập tên tác giả.'),
        image: yup
            .mixed()
            .required('Vui lòng chọn một tệp.')
            .test('fileFormat', 'Định dạng tệp không hợp lệ', (value) => {
                if (value) {
                    // console.log("hop le");
                    const allowedFormats = ['image/jpeg', 'image/png', 'image/jpg'];
                    return allowedFormats.includes(value.type);
                }
                return false;
            }),
        publisher: yup.string().required('Vui lòng nhập nhà xuất bản.'),
        publishDate: yup.string().required('Vui lòng nhập năm xuất bản.'),
        noPages: yup.number().required('Vui lòng nhập số trang'),
        ISBN: yup.string().required('Vui lòng nhập ISBN.'),
        desc: yup.string().required('Vui lòng nhập mô tả.'),
        language: yup.string().required('Vui lòng chọn ngôn ngữ.'),
        coverType: yup.string().required('Vui lòng chọn dạng sách.')
    })

    useEffect(() => {
        // console.log("File:", selectedImage);
        // Thực hiện các hành động khác sau khi selectedImage thay đổi
    }, [selectedImage]);

    return (
        <Formik
            validationSchema={schema}
            encType="multipart/form-data"
            onSubmit={() => { }}
            // onSubmit={console.log}

            initialValues={{
                title: '',
                authorName: '',
                // file: null,
                image: null,
                publisher: '',
                publishDate: '',
                ISBN: '',
                noPages: "",
                desc: '',
                coverType: "",
                language: ""
            }}

        >
            {({ handleSubmit, handleChange, setFieldValue, values, touched, errors, resetForm }) => (
                <Form id="yourFormId" noValidate onSubmit={(e) => e.preventDefault()} encType="multipart/form-data">
                    <Row>
                        <Form.Group
                            controlId="validationFormik101"
                            className="position-relative"
                        >
                            <Form.Label>Tiêu đề</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                name="title"
                                value={values.title}
                                onChange={handleChange}
                                placeholder="Nhập tiêu đề..."
                                isInvalid={touched.title && !!errors.title}
                            />
                            <Form.Control.Feedback type="invalid" tooltip>{errors.title}</Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <Row style={{ marginTop: '10px' }}>
                        <Form.Group className="position-relative mb-3">
                            <Form.Label>Bìa sách</Form.Label>
                            {/* Hidden file input */}
                            <Form.Control
                                type="file"
                                name="image"
                                required
                                accept="image/*"
                                style={{ display: 'none' }}
                                ref={fileInputRef}

                                onChange={(e) => handleImageChange(e, setFieldValue)}
                                isInvalid={touched.image && !!errors.image}
                            />
                            {/* Simulated button or div */}
                            <div
                                style={{
                                    width: '150px',
                                    height: '150px',
                                    border: '1px solid #ccc',
                                    position: 'relative',
                                    cursor: 'pointer',
                                }}
                                onClick={handleChooseFileClick}
                            >
                                {selectedImage ? (
                                    <Image
                                        src={URL.createObjectURL(selectedImage)}
                                        alt="Selected"
                                        style={{ width: '100%', height: '100%' }}
                                        thumbnail
                                    />
                                ) : (
                                    <Button variant="outline-primary" style={{ marginTop: '50px', marginLeft: '10px' }}>
                                        Choose File
                                    </Button>
                                )}
                            </div>
                            <Form.Control.Feedback type="invalid" tooltip>
                                {errors.image}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <Row>
                        <Form.Group
                            controlId="validationFormik102"
                            className="position-relative"
                        >
                            <Form.Label>Tác giả</Form.Label>
                            <Form.Control
                                type="text"
                                name="authorName"
                                required
                                value={values.authorName}
                                onChange={handleChange}
                                placeholder="Nhập tên tác giả..."
                                isInvalid={!!errors.authorName}
                            />
                            <Form.Control.Feedback type="invalid" tooltip>{errors.authorName}</Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <Row style={{ marginTop: '10px' }}>
                        <Form.Group
                            controlId="validationFormik103"
                            className="position-relative"
                        >
                            <Form.Label>Nhà xuất bản</Form.Label>
                            <Form.Control
                                type="text"
                                name="publisher"
                                required
                                value={values.publisher}
                                onChange={handleChange}
                                placeholder="Nhập nhà xuất bản..."
                                isInvalid={!!errors.publisher}
                            />
                            <Form.Control.Feedback type="invalid" tooltip>{errors.publisher}</Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <Row style={{ marginTop: '10px' }}>
                        <Form.Group
                            controlId="validationFormik104"
                            className="position-relative"
                        >
                            <Form.Label>Năm xuất bản</Form.Label>
                            <Form.Control
                                type="text"
                                name="publishDate"
                                required
                                value={values.publishDate}
                                onChange={handleChange}
                                placeholder="Nhập năm xuất bản..."
                                isInvalid={!!errors.publishDate}
                            />
                            <Form.Control.Feedback type="invalid" tooltip>{errors.publishDate}</Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <Row style={{ marginTop: '10px' }}>
                        <Form.Group
                            controlId="validationFormik105"
                            className="position-relative"
                        >
                            <Form.Label>ISBN</Form.Label>
                            <Form.Control
                                type="text"
                                name="ISBN"
                                required
                                value={values.ISBN}
                                onChange={handleChange}
                                placeholder="Nhập ISBN..."
                                isInvalid={!!errors.ISBN}
                            />
                            <Form.Control.Feedback type="invalid" tooltip>{errors.ISBN}</Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <Row style={{ marginTop: '10px' }}>
                        <Form.Group
                            controlId="validationFormik105"
                            className="position-relative"
                        >
                            <Form.Label>Số trang</Form.Label>
                            <Form.Control
                                type="number"
                                name="noPages"
                                required
                                value={values.noPages}
                                onChange={handleChange}
                                placeholder="Nhập số trang..."
                                isInvalid={!!errors.noPages}
                            />
                            <Form.Control.Feedback type="invalid" tooltip>{errors.noPages}</Form.Control.Feedback>
                        </Form.Group>
                    </Row>

                    <Row style={{ marginTop: '10px' }}>
                        <Form.Group
                            controlId="validationFormik105"
                            className="position-relative"
                        >
                            <Form.Label>Mô tả</Form.Label>
                            <Form.Control
                                type="text"
                                name="desc"
                                required
                                value={values.desc}
                                onChange={handleChange}
                                placeholder="Nhập mô tả..."
                                isInvalid={!!errors.desc}
                                style={{ width: '100%', height: '100px' }}
                            />
                            <Form.Control.Feedback type="invalid" tooltip>{errors.desc}</Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <Row style={{ marginTop: '10px' }}>
                        <Form.Group controlId="validationFormikLanguage" className="position-relative">
                            <Form.Label>Dạng sách</Form.Label>
                            <Form.Control
                                as="select"
                                name="coverType"
                                value={values.coverType}
                                onChange={handleChange}
                                isInvalid={touched.coverType && !!errors.coverType}
                            >
                                <option value="">Chọn dạng sách</option>
                                <option value="Paperback">Paperback</option>
                                <option value="Hardcover">Hardcover</option>
                                {/* Thêm các ngôn ngữ khác nếu cần */}
                            </Form.Control>
                            <Form.Control.Feedback type="invalid" tooltip>
                                {errors.coverType}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <Row style={{ marginTop: '10px' }}>
                        <Form.Group controlId="validationFormikLanguage" className="position-relative">
                            <Form.Label>Ngôn ngữ</Form.Label>
                            <Form.Control
                                as="select"
                                name="language"
                                value={values.language}
                                onChange={handleChange}
                                isInvalid={touched.language && !!errors.language}
                            >
                                <option value="">Chọn ngôn ngữ</option>
                                <option value="English">English</option>
                                <option value="Vietnamese">Vietnamese</option>
                                {/* Thêm các ngôn ngữ khác nếu cần */}
                            </Form.Control>
                            <Form.Control.Feedback type="invalid" tooltip>
                                {errors.language}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <Row style={{ marginTop: '20px', textAlign: 'center' }}>
                        <Col>
                            <Button
                                variant="outline-danger"
                                onClick={() => {
                                    resetForm();
                                }}
                            >
                                Hủy bỏ
                            </Button>
                        </Col>
                        <Col>
                            <Button variant="outline-success" onClick={(e) => {
                                const formElement = document.getElementById('yourFormId');
                                if (formElement) {
                                    setFormData(new FormData(formElement));
                                    handleShowConfirmationModal();
                                } else {
                                    console.error('Form element not found');
                                }
                            }}>Xác nhận</Button>
                        </Col>
                    </Row>
                    <Modal show={showConfirmationModal} onHide={handleCloseConfirmationModal}>
                        <Modal.Header closeButton>
                            <Modal.Title>Xác nhận</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            Bạn có chắc chắn muốn thêm sách này không?
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleCloseConfirmationModal}>
                                Hủy bỏ
                            </Button>
                            <Button variant="primary" onClick={() => { handleFormSubmit(); handleCloseConfirmationModal(); }}>
                                Xác nhận
                            </Button>
                        </Modal.Footer>
                    </Modal>
                    <Modal show={showSuccessModal} onHide={handleCloseSuccessModal}>
                        <Modal.Header closeButton>
                            <Modal.Title>Thành công</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            Sách đã được thêm thành công!
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="primary" onClick={() => handleCloseSuccessModal(resetForm)}>
                                OK
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </Form>
            )}
        </Formik>
    );
}

export default Forms;

