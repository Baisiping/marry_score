const inputs = document.querySelectorAll('input[type="number"]');
const remainingScoreElement = document.getElementById('remaining-score');
let remainingScore = 100;

function updateRemainingScore() {
    let totalUsedScore = 0;
    inputs.forEach(input => {
        totalUsedScore += parseInt(input.value) || 0;
    });
    remainingScore = Math.max(0, 100 - totalUsedScore);
    remainingScoreElement.textContent = `剩余分数：${remainingScore}`;
    inputs.forEach(input => {
        input.disabled = remainingScore === 0 && parseInt(input.value) < 100;

        // 彻底禁用文本框输入（包括移除上下箭头以及禁止键盘输入）
        input.readOnly = true;
        input.style.WebkitAppearance = 'none';
        input.style.MozAppearance = 'none';
        input.style.appearance = 'none';

        // 移除之前添加的按钮点击事件监听，避免重复添加
        input.parentNode.querySelectorAll('button').forEach(button => {
            button.removeEventListener('click', handleClickOnButtons);
        });

        // 检查并添加减号按钮（确保减号按钮在左侧）
        let minusButton = input.previousElementSibling;
        if (!minusButton || minusButton.tagName!== 'BUTTON' || minusButton.textContent!== '-') {
            minusButton = document.createElement('button');
            minusButton.textContent = '-';
            minusButton.addEventListener('click', () => {
                let currentValue = parseInt(input.value) || 0;
                currentValue = Math.max(0, currentValue - 1);
                input.value = currentValue;
                updateRemainingScore();
            });
            input.parentNode.insertBefore(minusButton, input);
        }

        // 检查并添加加号按钮（确保加号按钮在右侧）
        let plusButton = input.nextElementSibling;
        if (!plusButton || plusButton.tagName!== 'BUTTON' || plusButton.textContent!== '+') {
            plusButton = document.createElement('button');
            plusButton.textContent = '+';
            plusButton.addEventListener('click', () => {
                if (remainingScore > 0) {
                    let currentValue = parseInt(input.value) || 0;
                    currentValue = Math.min(100, currentValue + 1);
                    input.value = currentValue;
                    updateRemainingScore();
                }
            });
            input.parentNode.insertBefore(plusButton, input.nextSibling);
        }

        // 重新添加按钮点击事件监听
        const buttons = input.parentNode.querySelectorAll('button');
        buttons.forEach(button => {
            button.addEventListener('click', handleClickOnButtons);
        });
    });
}

function handleClickOnButtons(event) {
    const input = event.target.nextElementSibling || event.target.previousElementSibling;
    if (input.tagName === 'INPUT') {
        if (event.target.textContent === '+') {
            if (remainingScore > 0) {
                let currentValue = parseInt(input.value) || 0;
                currentValue = Math.min(100, currentValue + 1);
                input.value = currentValue;
                updateRemainingScore();
            }
        } else if (event.target.textContent === '-') {
            let currentValue = parseInt(input.value) || 0;
                currentValue = Math.max(0, currentValue - 1);
                input.value = currentValue;
                updateRemainingScore();
            }
        }
    }

updateRemainingScore();