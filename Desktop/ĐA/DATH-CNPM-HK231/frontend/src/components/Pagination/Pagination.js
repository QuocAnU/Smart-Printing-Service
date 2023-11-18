
import React from 'react';
import Button from '@mui/material/Button';

const Pagination = ({ currentPage, totalPages, onPageChange, onPreviousPage, onNextPage }) => {
    const pageNumbers = generatePageNumbers(currentPage, totalPages);

    return (
        <div>
            <Button
                variant="outlined"
                color="success"
                style={{ marginRight: '10px' }}
                onClick={onPreviousPage}
                disabled={currentPage === 1}
            >
                Previous
            </Button>
            {pageNumbers.map((number, index) => (
                <React.Fragment key={index}>
                    {number === '...' ? (
                        <span style={{ marginRight: '10px' }}>{number}</span>
                    ) : (
                        <Button
                            variant={number === currentPage ? 'contained' : 'outlined'}
                            color="success"
                            style={{ marginRight: '10px' }}
                            onClick={() => onPageChange(number)}
                        >
                            {number}
                        </Button>
                    )}
                </React.Fragment>
            ))}
            <Button
                variant="outlined"
                color="success"
                onClick={onNextPage}
                disabled={currentPage === totalPages}
            >
                Next
            </Button>
        </div>
    );
};

// Hàm để tạo danh sách trang cần hiển thị
const generatePageNumbers = (currentPage, totalPages) => {
    const maxPageNumbers = 5; // Số trang tối đa hiển thị (bao gồm cả "...")
    const pageNumbers = [];

    if (totalPages <= maxPageNumbers) {
        for (let i = 1; i <= totalPages; i++) {
            pageNumbers.push(i);
        }
    } else {
        const halfMaxPageNumbers = Math.floor(maxPageNumbers / 2);

        if (currentPage <= halfMaxPageNumbers) {
            for (let i = 1; i <= maxPageNumbers - 1; i++) {
                pageNumbers.push(i);
            }
            pageNumbers.push('...');
            pageNumbers.push(totalPages);
        } else if (currentPage >= totalPages - halfMaxPageNumbers) {
            pageNumbers.push(1);
            pageNumbers.push('...');
            for (let i = totalPages - maxPageNumbers + 2; i <= totalPages; i++) {
                pageNumbers.push(i);
            }
        } else {
            pageNumbers.push(1);
            pageNumbers.push('...');
            for (let i = currentPage - halfMaxPageNumbers + 1; i <= currentPage + halfMaxPageNumbers - 1; i++) {
                pageNumbers.push(i);
            }
            pageNumbers.push('...');
            pageNumbers.push(totalPages);
        }
    }

    return pageNumbers;
};

export default Pagination;
