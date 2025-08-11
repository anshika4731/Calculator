window.onload = function() {
    const input = document.querySelector('.input');
    const clearButton = document.querySelector('.button1');
    const equalsButton = document.querySelector('.button2');
    const buttons = document.querySelectorAll('.button');

    let expression = '';

    updateDisplay();

    clearButton.addEventListener('click', function() {
        expression = '';
        updateDisplay();
    });

    equalsButton.addEventListener('click', function() {
        try {
            const finalExpression = expression.replace(/\^/g, '**');
            expression = eval(finalExpression).toString();
            updateDisplay();
        } catch (error) {
            input.value = 'Error';
            expression = '';
        }
    });

    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const value = button.textContent;
            const lastChar = expression.charAt(expression.length - 1);

            if (isOperator(value) && isOperator(lastChar)) {
                expression = expression.slice(0, -1) + value;
            } else {
                if (input.value === '0.0' && !isOperator(value) && value !== '.') {
                    expression = value;
                } else {
                    expression += value;
                }
            }
            updateDisplay();
        });
    });

    function isOperator(char) {
        return ['+', '-', '*', '/', '^'].includes(char);
    }

    function updateDisplay() {
        input.value = expression || '0.0';
    }
};
