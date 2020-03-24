class MessageDispatcher {
  private subscribers: Set<((message: string) => void)> = new Set();

  public subscribe(handler: (message: string) => void) {    
    this.subscribers.add(handler);

    return () => this.subscribers.delete(handler);
  }

  public dispatch(message: string) {
    this.subscribers.forEach(handler => handler(message));
  }
}

export default new MessageDispatcher();
