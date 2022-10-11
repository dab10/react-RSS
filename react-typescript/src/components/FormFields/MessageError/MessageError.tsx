import React from 'react';
import './MessageError.scss';

type MessageErrorProps = { messageError: string };

const MessageError = (props: MessageErrorProps) => (
  <div className={`hidden ${props.messageError ? 'error' : ''}`}>{props.messageError}</div>
);

export default MessageError;
