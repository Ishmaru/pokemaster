# PokeMaster

##### Experiment Developing a single page game using API's

Pokemon is owned by Nintendo. This app is only intended for practice and learning uses only.

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


### Game

Create your trainer, pick your starting pokemon, and happy collecting!
You will get randomly selected pokemon from PokeApi (all pokemon from red - white);
You can battle them to increase your pokemons level, or capture them with your pokeballs.

#### Battling:
Battles are simple click the attack button to begin a turn.

Turns are a simple attack/counterattack sequence.

The order is dependent on the speed stat of the pokemon.
The pokemon with the higher speed goes first.

When attacking the defending pokemon has a chance to avoid the attack with this algorithm:
 ```Random Number * Defending Pokemon speed > Attacking Pokemon's strength.```

If the attack lands this algorithm is used: 
```Attacking Pokemon Strength - Defending Pokemon's Defense```
If the value is less then one, only one dammage is dealt.

If Defending Pokemon's survives then Defender and Attacker swap and a counter attack commences.

Then turn is over. And the user can input again.

#### Capturing

Click Pokeball to attempt to catch a Pokemon.

Pokeballs have at MOST a 30% chance of successfully capturing a pokemon.

However, the more Hp a pokemon have the lower your chance of success. Deal dammage to wild pokemon to lower their Hp and increase your chance of success.

#### Switching Pokemon.

At first you only have one Pokemon, but as you play you can obtain more by catching them. You will find them in your Poke Box, click them to swap to that pokemon. Feel Free to swap as much as you like.

#### Fainting:

When your Pokemon Hp drops below 0, that pokemon will faint, and be swapped out with the the next in line.

#### Leveling UP

Your Pokemon will gain experence when a wild Pokemon is defeated or captured. When your Pokemon's EXP reaches its Next Level ammount, that pokemon will level up, and all stats will increase. Also that pokemon will restore its HP to max.




