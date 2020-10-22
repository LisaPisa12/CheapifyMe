import style from './index.module.css';
import { useState } from 'react';

type Iinput = {
  props?: any;
};

export default function Input({ props }: Iinput) {
  const [text, setText] = useState('');

  return (
    <input
      type="textbox"
      className={style.input}
      data-testid="location-textbox"
      value={text}
      placeholder="Where are you?"
      onChange={(e) => {
        setText(e.target.value);
      }}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          props(text);
        }
      }}
    ></input>
  );
}
