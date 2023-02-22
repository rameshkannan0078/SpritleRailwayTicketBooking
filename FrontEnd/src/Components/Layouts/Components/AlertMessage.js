import Alert from 'react-bootstrap/Alert';

function AlertMessage(props) {
  const { variant, message } = props;
  console.log(variant)
  return (
    <Alert variant={variant}>
      {message}
    </Alert>
  );
}

export default AlertMessage;
