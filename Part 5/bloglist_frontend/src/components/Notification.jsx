export const Notification = ({ message, style }) => {
  if (!message) return;
  return <div style={style}>{message}</div>;
};
