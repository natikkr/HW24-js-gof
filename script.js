class PubSub {
    constructor() {
      this.handlers = [];
    }
    subscribe(event, handler, context) {
      if (typeof context === 'undefined') { context = handler; }
      this.handlers.push({ event: event, handler: handler.bind(context) });
    }
    publish(event, args) {
      this.handlers.forEach((topic) => {
        if (topic.event === event) {
          topic.handler(args)
        }
      })
    }
  };

class Rose {
constructor() {
    this.pubsub = new PubSub();
    this.pubsub.subscribe('message to Rose', this.emitMessage, this);
}
emitMessage(msg) {
    console.group('PubSub');
    if (msg === 'love letter from Billy') {
    console.log(msg, "Jack, go away!");
    } else if (msg === 'love letter from Jack') {
    console.log(msg, "Billy, go away!");
    }
    console.groupEnd();
}
sendMessage(send) {
    send.pubsub.publish('message from Rose');
    }
};


class Billy {
constructor() {
    this.pubsub = new PubSub();
    this.pubsub.subscribe('message from Rose', this.emitMessage, this);
}
emitMessage(msg) {
    console.group('PubSub');
    console.log(msg, 'I Love you, Rose. Billy');
    console.groupEnd();
}
sendMessage(send) {
    send.pubsub.publish('love letter from Billy');
    }
};

class Jack {
constructor() {
    this.pubsub = new PubSub();
    this.pubsub.subscribe('message from Rose', this.emitMessage, this);
}
emitMessage(msg) {
    console.group('PubSub');
    console.log(msg, 'I love you, Rose. Jack');
    console.groupEnd();
}
sendMessage(send) {
    send.pubsub.publish('love letter from Jack');
    }
};

let rose = new Rose();
let billy = new Billy();
let jack = new Jack();

jack.sendMessage(rose)
