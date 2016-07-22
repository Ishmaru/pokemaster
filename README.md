# PokeMaster

##### Experiment Developing a single page game using API's

__Pokemon is owned by Nintendo. This app is only intended for practice and learning uses only.__

### Technologies:

Angular JS
Node Js
Express
Javascript
CSS
Html
Materialize
Javascript Web Tokens
Mongo DB
Mongoose

### Api's Consumed:

PokeApi
PokeMaster own Api


### Game

Create your trainer, pick your starting Pokemon, and happy collecting!
You will get randomly selected Pokemon from PokeApi (all Pokemon from red - white);
You can battle them to increase your Pokemon level, or capture them with your pokeballs.

#### Battling:
Battles are simple click the attack button to begin a turn.

Turns are a simple attack/counterattack sequence.

The order is dependent on the speed stat of the Pokemon.
The Pokemon with the higher speed goes first.

When attacking the defending Pokemon has a chance to avoid the attack with this algorithm:
 ```Random Number * Defending Pokemon speed > Attacking Pokemon's strength.```

If the attack lands this algorithm is used: 
```Attacking Pokemon Strength - Defending Pokemon's Defense```
If the value is less then ten, ten damage is dealt.

If Defending Pokemon's survives then Defender and Attacker swap and a counter attack commences.

Then turn is over. And the user can input again.

#### Capturing

Click Pokeball to attempt to catch a Pokemon.

Pokeballs have at MOST a 30% chance of successfully capturing a Pokemon.

However, the more Hp a Pokemon have the lower your chance of success. Deal damage to wild Pokemon to lower their Hp and increase your chance of success.

If you fail at capturing the Pokemon, the wild Pokemon will counter attack your Pokemon, so be careful.

#### Switching Pokemon.

At first you only have one Pokemon, but as you play you can obtain more by catching them. You will find them in your Poke Box, click them to swap to that Pokemon. Feel Free to swap as much as you like.

#### Fainting:

When your Pokemon Hp drops below 0, that Pokemon will faint, and be swapped out with the the next in line.

The fainted Pokemon will restore to 1 Hp.

#### Leveling UP

Your Pokemon will gain experience when a wild Pokemon is defeated or captured. When your Pokemon's EXP reaches its Next Level amount, that Pokemon will level up, and all stats will increase. Also that Pokemon will restore its HP to max.

#### Healing
After any player action all Pokemon will recover 5 hp. 

#### Save Pokemon
After a successful capture, or wild Pokemon defeat, your currently selected Pokemon will be saved.
You can also force save your Pokemon by clicking on them while they are in the field.

### PokeMaster Api

|Routes|HTTP|
|:--:|:--:|
|Users|/api/users|
|Show User|/api/users/id|

|Routes|HTTP|
|:--:|:--:|
|Pokemon|/api/pokemon|
|Show user|/api/pokemon/id|
|Get Random Pokemon from PokeApi|/api/pokemon/get|
|All Pokemon from specific User|/api/pokemon/user_id|
