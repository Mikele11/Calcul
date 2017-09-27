/*
Code Style - JavaScript Standard Style;
*/
function isDigit1 (ch) {
  if (((ch >= '0') && (ch <= '9')) || (ch === '.')) {
    return true;
  } else return false;
};

function isChar (ch) {
  if ((ch == '+') || (ch == '-') || (ch == '*') || (ch == '/') || (ch == '(') || (ch == ')')) {
    return true;
  } else return false;
};

/*
count -функция которая считает строку без скобок
*/
function count (mathExpression) {
  let i;
  let count;
  let j = 0;
  let js = 0;
  let Sum = 0;
  let ter = '';
  let Numb = [];
  let Symb = [];
  const Exp = mathExpression;
  try {
    for (i = 0; i < Exp.length; i++) {
      while (isDigit1(Exp[i])) {
        ter = ter + Exp[i];
        i++;
      };
      if (ter === '') {
        continue;
      } else {
        Numb[j] = Number(ter);
        if (((Exp[0] === '-') && (j === 0)) || ((j > 0) && (Exp[i - 2] === '-') && ((Exp[i - 3] === '*') || (Exp[i - 3] === '/')))) {
          Numb[j] = Numb[j] * (-1);
        };
        ter = '';
        j = j + 1;
      };

      if (isChar(Exp[i])) {
        if ((i === 0) && (Exp[i] === '-')) {
          continue;
        } else {
          Symb[js] = Exp[i];
          js++;
        };
      };
    };// for

    for (i = 0; i < Symb.length; i++) {
      if ((Symb[i] === '+') || (Symb[i] === '-')) {
        continue;
      } else {
        if (Symb[i] === '*') {
          Numb[i + 1] = Numb[i + 1] * Numb[i];
          Numb[i] = null;
          Symb[i] = null;
        }
        if (Symb[i] === '/') {
          Numb[i + 1] = Numb[i] / Numb[i + 1];
          Numb[i] = null;
          Symb[i] = null;
        };// if
      };// else
    };// for
    i = 0;
    while (i < Symb.length) {
      if ((Symb[i] === '+') && (Symb[i] != null)) {
        count = 0;
        for (j = 0; j < Numb.length; j++) {
          if ((Numb[j] !== null) && (count !== 2)) {
            if (count === 0) {
              Sum = Numb[j];
              Numb[j] = null;
              Symb[j] = null;
            };
            if (count === 1) {
              Numb[j] = Sum + Numb[j];
            };
            count++;
          };
        };
      };// if

      if (Symb[i] === '-') {
        count = 0;
        for (j = 0; j < Numb.length; j++) {
          if ((Numb[j] !== null) && (count !== 2)) {
            if (count === 0) {
              Sum = Numb[j];
              Numb[j] = null;
              Symb[j] = null;
            };
            if (count === 1) {
              Numb[j] = Sum - Numb[j];
            };
            count++;
          };
        };
      };// if -
      i++
    };
  } catch (e) {
    alert('Произошла ошибка');
  }
  for (i = 0; i < Numb.length; i++) {
    if (Numb[i] !== null) {
      return Numb[i];
      break;
    };
  }
};// end function count
/*
brackets -функция, которая считает выражение внутри скобок
и возвращает арифметическую строку без скобок
*/
function brackets (Expression) {
  let Exp1 = Expression;
  let copyStr;
  let copyStrLeft;
  let copyStrRight;
  let copyDigit;
  let j;
  let k;
  if (((Exp1.includes(')')) && (Exp1.indexOf(')') < Exp1.indexOf('(')))) {
    alert('Ошибка');
    return 0;
  };

  while (Exp1.includes(')')) {
    for (j = 0; j < Exp1.length; j++) {
      if (Exp1[j] === ')') {
        for (k = Exp1.indexOf(')'); k >= 0; k--) {
          if (Exp1[k] === '(') {
            copyStrLeft = '';
            copyStrRight = '';
            copyStr = '';
            copyDigit = '';
            copyStr = Exp1.substring(k + 1, Exp1.indexOf(')'))
            copyStrLeft = Exp1.substring(0, k)
            if (Exp1[Exp1.length] !== ')') {
              copyStrRight = Exp1.substring(Exp1.indexOf(')') + 1, Exp1.length);
            } else copyStrRight = Exp1.substring(Exp1.indexOf(')') + 1, Exp1.length - 1);
            copyDigit = String(count(copyStr));
            Exp1 = copyStrLeft + copyDigit + copyStrRight;
            if (!Exp1.includes(')')) {
              return Exp1;
              break;
            } else break;
          };
        };
      } else continue;
    };
    if (!Exp1.includes(')')) {
      return Exp1;
    };
  }
  return Exp1;
};// end function brackets
