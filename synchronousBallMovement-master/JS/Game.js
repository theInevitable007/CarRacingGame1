class Game {
    constructor(){
        
    }
    getState(){
        var gameStateref = database.ref("gameState");
        gameStateref.on("value",function(data){
            gameState = data.val();
        })
    }
    update(state){
        database.ref("/").update({
            gameState : state
        })
               
    }
    async start(){
        if(gameState === 0){
            player = new Player();
            var playerCountRef = await database.ref("playerCount").once("value");
            
            if(playerCountRef.exists()){
                playerCount = playerCountRef.val();
                player.getCount();
            }
            
            form = new Form();
            form.display();
        }
    }
    play(){
        form.hide();
        
        textSize(30);
        text("Game Start",120,100);

        Player.getPlayerinfo();

        if(allPlayers !== undefined){
            var y = 130;

            for(var plr in allPlayers){
                if(plr === "player" + player.index){
                    fill("red");
                }
                else{
                    fill("black");
                }
                y = y + 20;
                
                textSize(15);
                text(allPlayers[plr].name + ":" + allPlayers[plr].distance,120,y);
            }
        }
        if(keyDown(UP_ARROW) && player.index !== null){
            player.distance += 50;
            player.update();
        }
    }
}