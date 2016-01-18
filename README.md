# tivo
A streaming event data server that supports DVR functionality

I often build a class of web apps that display event data, often in (close to) real time. It would be very useful to be able to time-shift, dilate, and compress events in the following ways:

 - Play events from a particular window in the past, i.e. starting and stopping from an arbitrary window
 - Speed up or slow down time, either to fit (say) an entire day into a minute of playback, or to assure that events arrive at a perceptually-salient rate
 - Loop the playback of a window of time, so that patterns can be noticed through repetition

Other event processing systems such as Kafka and Flink make a nod to replay of events, but this is usually for the purposes of debugging, auditing, or data recovery. What's more, these systems do not seem to support the range of operations described above.

Unlike these more general and scalable systems, Tivo is primarily intended to support human perception and interpretation of events through rich visualization experiences. Because many of these will be implemented in the browser (using such technologies as WebGL, D3, three.js, and A-frame), its primary output channel will be Websockets.

Because the event stream is intended to support human consumption and interpretation, there is a natural limit on the rate of events that must be supported. This is something like 100 events per second, several orders of magnitude lower than the [performance of a well-tuned Kafka cluster](https://engineering.linkedin.com/kafka/benchmarking-apache-kafka-2-million-writes-second-three-cheap-machines).

## Connection Interface

Clients access event channels using websocket messages. In typical usage, a client library will handle these connections, as well as the playback controls. A client program can access mutliple channels simultaneously by maintaining several open connections.

## Playback Interface

Playback is also controlled with websocket messages. Again, these will typically be handled by the client library, though they are simple to construct and can be handled manually if desired.

```json
{
    "action": "play",
    "start": "2016-01-15T14:32:24Z",
    "end": "2016-01-15T14:33:24Z",
    "speed": 1,
    "loop": "False"
}
```

## Backing Store

Tivo can pull events from a number of backing stores, and it's not really concerned with how they get there in the first place. At a minimum, it should support Postgres, Redshift, and maybe DynamoDB. The main requirement is that it should be easy and fast to query stored events from a time window, at second resolution.

