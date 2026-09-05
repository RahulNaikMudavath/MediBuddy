function ErrorState({ message = 'Unable to load medicines.' }) {
  return <p role="alert">{message}</p>
}

export default ErrorState
