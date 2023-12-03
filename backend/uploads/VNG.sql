DROP DATABASE IF EXISTS `VNG`;
CREATE DATABASE `VNG`;

USE `VNG`;

-- Tạo bảng Branch
CREATE TABLE IF NOT EXISTS Branch (
    branch_id INT PRIMARY KEY AUTO_INCREMENT,
    branch_name VARCHAR(255),
    location VARCHAR(255),
    employee_count INT
);

-- Tạo bảng Employee
CREATE TABLE IF NOT EXISTS Employee (
    employee_id INT PRIMARY KEY AUTO_INCREMENT,
    employee_name VARCHAR(255),
    age INT,
    position VARCHAR(255),
    phone_number VARCHAR(15),
    description TEXT,
    department VARCHAR(255),
    gender VARCHAR(10),
    branch_id INT,
    FOREIGN KEY (branch_id) REFERENCES Branch(branch_id)
);

-- Tạo bảng Article
CREATE TABLE IF NOT EXISTS Article (
    article_id INT PRIMARY KEY AUTO_INCREMENT,
    type VARCHAR(255),
    title VARCHAR(255),
    time_published DATETIME,
    author_id INT,
    content TEXT,
    FOREIGN KEY (author_id) REFERENCES Employee(employee_id)
);

-- Tạo bảng Content
CREATE TABLE IF NOT EXISTS Content (
    article_id INT,
    title VARCHAR(255),
    content TEXT,
    link VARCHAR(255),
    PRIMARY KEY (article_id, title),
    FOREIGN KEY (article_id) REFERENCES Article(article_id)
);

-- Tạo bảng Customer
CREATE TABLE IF NOT EXISTS Customer (
    customer_id INT PRIMARY KEY AUTO_INCREMENT,
    customer_name VARCHAR(255),
    age INT,
    email VARCHAR(255),
    gender VARCHAR(10)
);

-- Tạo bảng Product
CREATE TABLE IF NOT EXISTS Product (
    product_id INT PRIMARY KEY AUTO_INCREMENT,
    category VARCHAR(255),
    date_added DATE,
    price DECIMAL(10, 2),
    name VARCHAR(255),
    image VARCHAR(255)
);

-- Tạo bảng Comment
CREATE TABLE IF NOT EXISTS Comment (
    employee_id INT,
    article_id INT,
    content TEXT,
    time_commented DATETIME,
    PRIMARY KEY(employee_id, article_id, time_commented),
    FOREIGN KEY (employee_id) REFERENCES Employee(employee_id),
    FOREIGN KEY (article_id) REFERENCES Article(article_id)
);

-- Tạo bảng Review
CREATE TABLE IF NOT EXISTS Review (
    customer_id INT,
    article_id INT,
    rating INT,
    time_reviewed DATETIME,
    PRIMARY KEY (customer_id, article_id),
    FOREIGN KEY (customer_id) REFERENCES Customer(customer_id),
    FOREIGN KEY (article_id) REFERENCES Article(article_id)
);

-- Tạo bảng CustomerComment
CREATE TABLE IF NOT EXISTS CustomerComment (
    customer_id INT,
    article_id INT,
    content TEXT,
    time_commented DATETIME,
    PRIMARY KEY (customer_id, article_id, time_commented),
    FOREIGN KEY (customer_id) REFERENCES Customer(customer_id),
    FOREIGN KEY (article_id) REFERENCES Article(article_id)
);

-- Tạo bảng Purchase
CREATE TABLE IF NOT EXISTS Purchase (
    customer_id INT,
    product_id INT,
    number INT,
    purchase_date DATE,
    PRIMARY KEY (customer_id, product_id, purchase_date),
    FOREIGN KEY (customer_id) REFERENCES Customer(customer_id),
    FOREIGN KEY (product_id) REFERENCES Product(product_id)
);
-- Thêm dữ liệu cho bảng Branch
INSERT INTO Branch (branch_name, location, employee_count) VALUES
('Chi nhánh 1', 'Địa điểm 1', 50),
('Chi nhánh 2', 'Địa điểm 2', 30),
('Chi nhánh 3', 'Địa điểm 3', 25),
('Chi nhánh 4', 'Địa điểm 4', 40),
('Chi nhánh 5', 'Địa điểm 5', 60);

-- Thêm dữ liệu cho bảng Employee
INSERT INTO Employee (employee_name, age, position, phone_number, description, department, gender, branch_id) VALUES
('Nhân viên 1', 25, 'Chức vụ 1', '123456789', 'Mô tả 1', 'Bộ phận 1', 'Nam', 1),
('Nhân viên 2', 30, 'Chức vụ 2', '987654321', 'Mô tả 2', 'Bộ phận 2', 'Nữ', 2),
('Nhân viên 3', 28, 'Chức vụ 3', '456789123', 'Mô tả 3', 'Bộ phận 3', 'Nam', 1),
('Nhân viên 4', 35, 'Chức vụ 4', '789123456', 'Mô tả 4', 'Bộ phận 4', 'Nữ', 3),
('Nhân viên 5', 32, 'Chức vụ 5', '321654987', 'Mô tả 5', 'Bộ phận 5', 'Nam', 2);

-- Thêm dữ liệu cho bảng Article
INSERT INTO Article (type, title, time_published, author_id, content) VALUES
('Doanh nghiệp', 'VNG là công ty gì? Thông tin về VNG có thể bạn chưa biết', NOW(), 1, 'VNG (VNG Corporation) là công ty cổ phần công nghệ hàng đầu và cũng là kỳ lân công nghệ đầu tiên của Việt Nam, được thành lập từ năm 2004. VNG phát triển với sứ mệnh “Kiến tạo công nghệ và Phát triển con người. Từ Việt Nam vươn tầm thế giới.”. Các sản phẩm phong phú của VNG đã tạo ra những giá trị tích cực trong trải nghiệm và tương tác của người dùng tại Việt Nam cũng như trên toàn thế giới. Công ty cổ phần VNG hiện có gần 4000 nhân viên đang làm việc tại 10 thành phố trên toàn cầu.'),
('Doanh nghiệp', 'VNG là công ty gì? Thông tin về VNG có thể bạn chưa biết', NOW(), 2, 'VNG (VNG Corporation) là công ty cổ phần công nghệ hàng đầu và cũng là kỳ lân công nghệ đầu tiên của Việt Nam, được thành lập từ năm 2004. VNG phát triển với sứ mệnh “Kiến tạo công nghệ và Phát triển con người. Từ Việt Nam vươn tầm thế giới.”. Các sản phẩm phong phú của VNG đã tạo ra những giá trị tích cực trong trải nghiệm và tương tác của người dùng tại Việt Nam cũng như trên toàn thế giới. Công ty cổ phần VNG hiện có gần 4000 nhân viên đang làm việc tại 10 thành phố trên toàn cầu.'),
('Con Người', 'UpRace 2022: Cùng nhau chạy 500 vòng quanh Trái đất vì những điều tử tế', NOW(), 3, 'VNG (VNG Corporation) là công ty cổ phần công nghệ hàng đầu và cũng là kỳ lân công nghệ đầu tiên của Việt Nam, được thành lập từ năm 2004. VNG phát triển với sứ mệnh “Kiến tạo công nghệ và Phát triển con người. Từ Việt Nam vươn tầm thế giới.”. Các sản phẩm phong phú của VNG đã tạo ra những giá trị tích cực trong trải nghiệm và tương tác của người dùng tại Việt Nam cũng như trên toàn thế giới. Công ty cổ phần VNG hiện có gần 4000 nhân viên đang làm việc tại 10 thành phố trên toàn cầu.'),
('Doanh nghiệp', 'VNGGames xuất sắc nhận 3 giải thưởng tại MMA SMARTIES Awards Vietnam 2023', NOW(), 4, 'VNG (VNG Corporation) là công ty cổ phần công nghệ hàng đầu và cũng là kỳ lân công nghệ đầu tiên của Việt Nam, được thành lập từ năm 2004. VNG phát triển với sứ mệnh “Kiến tạo công nghệ và Phát triển con người. Từ Việt Nam vươn tầm thế giới.”. Các sản phẩm phong phú của VNG đã tạo ra những giá trị tích cực trong trải nghiệm và tương tác của người dùng tại Việt Nam cũng như trên toàn thế giới. Công ty cổ phần VNG hiện có gần 4000 nhân viên đang làm việc tại 10 thành phố trên toàn cầu.'),
('Loại 5', 'Tiêu đề 5', NOW(), 5, "");

-- Thêm dữ liệu cho bảng Content
INSERT INTO Content (article_id, title, content, link) VALUES
(1, 'VNG là gì?', 'VNG (VNG Corporation) là công ty cổ phần công nghệ hàng đầu và cũng là kỳ lân công nghệ đầu tiên của Việt Nam, được thành lập từ năm 2004. VNG phát triển với sứ mệnh “Kiến tạo công nghệ và Phát triển con người. Từ Việt Nam vươn tầm thế giới.”. Các sản phẩm phong phú của VNG đã tạo ra những giá trị tích cực trong trải nghiệm và tương tác của người dùng tại Việt Nam cũng như trên toàn thế giới. Công ty cổ phần VNG hiện có gần 4000 nhân viên đang làm việc tại 10 thành phố trên toàn cầu.', 'https://corp.vcdn.vn/products/upload/vng/source/News/cong-ty-vng-la-gi-1.jpg'),
(1, 'VNG hoạt động trong lĩnh vực gì?', 'Khởi đầu với tựa game Võ Lâm Truyền Kỳ, VNG được biết đến trong vai trò nhà phát hành và phát triển nhiều thể loại game phổ biến tại Việt Nam cũng như các nước Đông Nam Á. Tính đến tháng 06/2023, VNGGames đã có hơn 170 tựa game trên hơn 40 thị trường. Ngoài ra, VNG còn phát triển hơn 60+ tựa game thông qua nền tảng ZingPlay.', 'https://corp.vcdn.vn/products/upload/vng/source/News/VNG%20daily%20news/kahoot%206.png'),
(1, 'Nền Tảng Kết Nối', 'VNG mở rộng danh mục sản phẩm của mình sang những dịch vụ kỹ thuật số khác bao gồm ứng dụng nhắn tin số 1 Việt Nam - Zalo. Đến cuối năm 2022, Zalo đã ghi nhận 75 triệu người dùng thường xuyên và trở thành ứng dụng thiết yếu hàng đầu đối với người Việt Nam (theo dữ liệu của Bộ Thông tin và Truyền thông).', 'https://corp.vcdn.vn/products/upload/vng/source/News/cong-ty-vng-la-gi-3.png'),
(1, 'Thanh Toán Điện Tử', 'Là một trong bốn mảng kinh doanh của VNG, ví điện tử ZaloPay cung cấp dịch vụ thanh toán di động được ra mắt vào năm 2017. ZaloPay đã có những bước đi tiên phong trong thị trường ví điện tử với QR đa năng, tài khoản chứng khoán và là đại diện duy nhất lọt Top 200 công ty fintech toàn cầu được công bố bởi CNBC. ', 'https://corp.vcdn.vn/products/upload/vng/source/News/cong-ty-vng-la-gi-4.png'),

(2, 'Tiêu đề 2', 'Nội dung 2', 'https://example.com/link2'),
(3, 'Tiêu đề 3', 'Nội dung 3', 'https://example.com/link3'),
(4, 'Tiêu đề 4', 'Nội dung 4', 'https://example.com/link4'),
(5, 'Tiêu đề 5', 'Nội dung 5', 'https://example.com/link5');

-- Thêm dữ liệu cho bảng Customer
INSERT INTO Customer (customer_name, age, email, gender) VALUES
('Khách hàng 1', 30, 'kh1@example.com', 'Nam'),
('Khách hàng 2', 25, 'kh2@example.com', 'Nữ'),
('Khách hàng 3', 28, 'kh3@example.com', 'Nam'),
('Khách hàng 4', 35, 'kh4@example.com', 'Nữ'),
('Khách hàng 5', 32, 'kh5@example.com', 'Nam');

-- Thêm dữ liệu cho bảng Product
INSERT INTO Product (category, date_added, price, name, image) VALUES
('Nhập vai', '2023-11-30', 100.000, "Tây du VNG: Đại náo tam giới", "https://vnggames.com/_next/image?url=https%3A%2F%2Fcdn.omnirise.com%2Fcms%2Fbanner_3_1_7081f4ba66.png%3Fw%3D427%26h%3D240%26q%3D100%26lossless%3Dtrue&w=1920&q=100"),
('Hàng động', '2023-12-1', 520.000, "Metal Slug: Awakening", "https://vnggames.com/_next/image?url=https%3A%2F%2Fcdn.omnirise.com%2Fcms%2Fmsvn_published_4b6823fde2.webp%3Fw%3D427%26h%3D240%26q%3D100%26lossless%3Dtrue&w=1920&q=100"),
('Chiến lược', '2023-11-30', 400.000, "Chiên thần AFK", "https://vnggames.com/_next/image?url=https%3A%2F%2Fcdn.omnirise.com%2Fcms%2Fthumbnail_2_d43591c277.png%3Fw%3D427%26h%3D240%26q%3D100%26lossless%3Dtrue&w=1920&q=100"),
('Nhập vai', '2023-12-1', 200.000, "Kiếm thê Origin", "https://vnggames.com/_next/image?url=https%3A%2F%2Fcdn.omnirise.com%2Fcms%2Fkto_banner_5bcf056a8f.png%3Fw%3D427%26h%3D240%26q%3D100%26lossless%3Dtrue&w=1920&q=100"),
('Hàng động', '2023-11-30', 500.000, "Ravelation: thiên du", "https://vnggames.com/_next/image?url=https%3A%2F%2Fcdn.omnirise.com%2Fcms%2FHighlight_program_Banner_b59b31bd06.png%3Fw%3D427%26h%3D240%26q%3D100%26lossless%3Dtrue&w=1920&q=100"),
('Nhập vai', '2023-11-30', 550.000, "Võ Lâm Nhàn Hiệp", "https://vnggames.com/_next/image?url=https%3A%2F%2Fcdn.omnirise.com%2Fcms%2FVL_950_340x192_992f06f797.jpg%3Fw%3D427%26h%3D240%26q%3D100%26lossless%3Dtrue&w=1920&q=100"),
('Chiến lược', '2023-11-30', 650.000, "Liên Minh Huyền Thoại", "https://vnggames.com/_next/image?url=https%3A%2F%2Fcdn.omnirise.com%2Fcms%2FLOL_KA_22_BANNER_BAN_LOGO_1080x462_J_Diaz_v001_2_4f721d3ce2.png%3Fw%3D427%26h%3D240%26q%3D100%26lossless%3Dtrue&w=1920&q=100"),
('Chiến lược', '2023-11-30', 500.000, "Thiên Long Bác Bộ 2", "https://vnggames.com/_next/image?url=https%3A%2F%2Fcdn.omnirise.com%2Fcms%2FTLBB_2_1360x768_1_8360203c77.png%3Fw%3D427%26h%3D240%26q%3D100%26lossless%3Dtrue&w=1920&q=100"),
('Nhập vai', '2023-12-1', 540.000, "Võ Lâm Truyền Kì", "https://vnggames.com/_next/image?url=https%3A%2F%2Fcdn.omnirise.com%2Fcms%2Fjxm_banner_fb0eb1d5b5.png%3Fw%3D427%26h%3D240%26q%3D100%26lossless%3Dtrue&w=1920&q=100"),
('Hàng động', '2023-12-1', 500.000, "Giất Mộng Giang Hồ", "https://vnggames.com/_next/image?url=https%3A%2F%2Fcdn.omnirise.com%2Fcms%2Fthumbnail_94ea6b46fa.jpeg%3Fw%3D427%26h%3D240%26q%3D100%26lossless%3Dtrue&w=1920&q=100"),
('Nhập vai', '2023-11-30', 500.000, "Tân OMG3Q-VNG", "https://vnggames.com/_next/image?url=https%3A%2F%2Fcdn.omnirise.com%2Fcms%2F1360x768_512c736aad.jpg%3Fw%3D427%26h%3D240%26q%3D100%26lossless%3Dtrue&w=1920&q=100"),
('Chiến lược', '2023-12-1', 520.000, "Võ Lâm Truyền Kì", "https://vnggames.com/_next/image?url=https%3A%2F%2Fcdn.omnirise.com%2Fcms%2Fjx1m_banner_830551a971.png%3Fw%3D427%26h%3D240%26q%3D100%26lossless%3Dtrue&w=1920&q=100"),
('Nhập vai', '2023-11-30', 580.000, "Võ Lâm Nhàn Hiệp", "https://vnggames.com/_next/image?url=https%3A%2F%2Fcdn.omnirise.com%2Fcms%2FVL_950_340x192_992f06f797.jpg%3Fw%3D427%26h%3D240%26q%3D100%26lossless%3Dtrue&w=1920&q=100"),
('Chiến lược', '2023-11-30', 500.000, "Liên Minh Huyền Thoại", "https://vnggames.com/_next/image?url=https%3A%2F%2Fcdn.omnirise.com%2Fcms%2FLOL_KA_22_BANNER_BAN_LOGO_1080x462_J_Diaz_v001_2_4f721d3ce2.png%3Fw%3D427%26h%3D240%26q%3D100%26lossless%3Dtrue&w=1920&q=100"),
('Chiến lược', '2023-11-30', 500.000, "Thiên Long Bác Bộ 2", "https://vnggames.com/_next/image?url=https%3A%2F%2Fcdn.omnirise.com%2Fcms%2FTLBB_2_1360x768_1_8360203c77.png%3Fw%3D427%26h%3D240%26q%3D100%26lossless%3Dtrue&w=1920&q=100");

-- Thêm dữ liệu cho bảng Comment
INSERT INTO Comment (employee_id, article_id, content, time_commented) VALUES
(1, 1, 'Bình luận 1', NOW()),
(2, 2, 'Bình luận 2', NOW()),
(3, 3, 'Bình luận 3', NOW()),
(4, 4, 'Bình luận 4', NOW()),
(5, 5, 'Bình luận 5', NOW());

-- Thêm dữ liệu cho bảng Review
INSERT INTO Review (customer_id, article_id, rating, time_reviewed) VALUES
(1, 1, 4, NOW()),
(2, 2, 5, NOW()),
(3, 3, 3, NOW()),
(4, 4, 4, NOW()),
(5, 5, 5, NOW());

-- Thêm dữ liệu cho bảng CustomerComment
INSERT INTO CustomerComment (customer_id, article_id, content, time_commented) VALUES
(1, 1, 'Bình luận khách hàng 1', NOW()),
(2, 2, 'Bình luận khách hàng 2', NOW()),
(3, 3, 'Bình luận khách hàng 3', NOW()),
(4, 4, 'Bình luận khách hàng 4', NOW()),
(5, 5, 'Bình luận khách hàng 5', NOW());

-- Thêm dữ liệu cho bảng Purchase
INSERT INTO Purchase (customer_id, product_id, purchase_date, number) VALUES
(1, 1, '2023-11-30', 5),
(2, 2, '2023-11-29', 5),
(3, 3, '2023-11-28', 5),
(4, 4, '2023-11-27', 5),
(5, 5, '2023-11-26', 5);
