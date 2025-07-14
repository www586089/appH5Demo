import React, { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Dialog from '@mui/material/Dialog';

const SecureInputKeyboard = ({ inputRef, maxLength = 5 }) => {
    const [open, setOpen] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (!inputRef.current) return;

        const input = inputRef.current;

        const handleFocus = () => {
            input.blur(); // 防止系统键盘弹出
            setOpen(true);
        };

        input.addEventListener('focus', handleFocus);

        return () => {
            input.removeEventListener('focus', handleFocus);
        };
    }, [inputRef]);

    const handleClose = () => {
        setOpen(false);
    };

    const handleKeyPress = (value) => {
        if (!inputRef.current) return;

        const input = inputRef.current;
        const currentValue = input.value;

        // 限制最大长度
        if (currentValue.length >= maxLength) {
            setError(`最多输入${maxLength}个字符`);
            return;
        }

        // 防止以0开头
        if (currentValue === '' && value === '0') {
            setError('金额不能以0开头');
            return;
        }

        // 防止多个小数点
        if (value === '.' && currentValue.includes('.')) {
            setError('只能输入一个小数点');
            return;
        }

        // 防止第五个字符是小数点
        if (currentValue.length === maxLength - 1 && value === '.') {
            setError('小数点不能出现在最后一位');
            return;
        }

        input.value = currentValue + value;
        setError('');

        // 触发input事件
        const event = new Event('input', { bubbles: true });
        input.dispatchEvent(event);
    };

    const handleDelete = () => {
        if (!inputRef.current) return;

        const input = inputRef.current;
        input.value = input.value.slice(0, -1);
        setError('');

        // 触发input事件
        const event = new Event('input', { bubbles: true });
        input.dispatchEvent(event);
    };

    return (
        <Dialog
          open={open}
          onClose={handleClose}
          fullWidth
          maxWidth='xs'
          PaperProps={{
                style: {
                    position: 'fixed',
                    bottom: 0,
                    margin: 0,
                    width: '100%',
                    borderRadius: '10px 10px 0 0'
                }
            }}
        >
            <div style={styles.keyboardContainer}>
                {error && <div style={styles.error}>{error}</div>}
                <div style={styles.keyboard}>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, '.', 0, '←'].map((key) => (
                        <button
                          key={key}
                          style={styles.key}
                          onClick={() => {
                                if (key === '←') handleDelete();
                                else handleKeyPress(key.toString());
                            }}
                        >
                            {key}
                        </button>
                    ))}
                </div>
            </div>
        </Dialog>
    );
};

const styles = {
    keyboardContainer: {
        padding: '10px',
        backgroundColor: '#f5f5f5'
    },
    keyboard: {
        width: '100%',
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '10px',
        marginTop: '10px'
    },
    key: {
        height: '50px',
        fontSize: '20px',
        border: '1px solid #ddd',
        borderRadius: '5px',
        background: '#fff',
        cursor: 'pointer'
    },
    error: {
        color: 'red',
        textAlign: 'center',
        marginBottom: '10px'
    }
};

SecureInputKeyboard.propTypes = {
    inputRef: PropTypes.object.isRequired,
    maxLength: PropTypes.number
};

export default SecureInputKeyboard;