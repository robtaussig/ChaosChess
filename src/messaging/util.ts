export const isMessageType = <t>(message: string, type: t): boolean => {
  if (!message) return;

  return message.indexOf(`${type}||`) > -1;
};
