export const connectSse = (url: string, onMessage: (data: string) => void) => {
  const source = new EventSource(url);
  source.onmessage = (event) => onMessage(event.data);
  return source;
};
