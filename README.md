# sense-space

## running

```bash
python -m SimpleHTTPServer
```

## keys!

```
pub-c-f86007fc-87f8-49f5-91b1-a2ab4ed186cc
sub-c-f6602896-6cce-11e4-b8ca-02ee2ddab7fe
```


## Service APIs

\* = optional

### message service
```javacscript
subscribe(channel, *onMessage, *onConnect)
sendMessage(message, *callback)
sendLocation(location)
tagUser(otheruser)
getUUID
watchParticipation(callback, *seconds)
```

### player service
```javascript
addPlayer(uuid)
removePlayer(uuid)
getPlayer(uuid)
batchUpdate(allPaticipants)
updatePlayerLocation(uuid, location)
getAllPlayers()
```

### stats service
```javasrcipt
createStats(uuid)
updateDistance(location)
wasTagged()
taggedPlayer(otherPlayer)
```
