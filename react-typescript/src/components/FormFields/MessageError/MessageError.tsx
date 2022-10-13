import React from 'react';
import './MessageError.scss';
import classNames from 'classnames';

type MessageErrorProps = { messageError: string };

const MessageError = (props: MessageErrorProps) => {
  const hiddenClass = classNames({
    hidden: true,
    error: props.messageError,
  });

  return <div className={`${hiddenClass}`}>{props.messageError}</div>;
};

export default MessageError;
