$(function(){
	var s = '';
	for(var i = 0 ; i < 20; i++){
		for(var j = 0; j < 20; j++ ){
			var id = i+'_'+j;
			s += '<div id="'+id+'" class="block"></div>'
		}
	}
	$('#sence').html(s);
	var snake = [ {x:0,y:0},{x:0,y:1},{x:0,y:2} ];
	var data =  {'0_0':true,'0_1':true,'0_2':true};
	var huashe  = function(){
		$.each(snake,function(index,value){
			$('#'+ value.x + '_'+ value.y).css({background:'red'});
		})
	}
	huashe();

	var dropFood = function() {
		var x = Math.floor(Math.random()*20);		
		var y = Math.floor(Math.random()*20);		
		while( data[x+'_'+y] ){
			x = Math.floor(Math.random()*20);		
			y = Math.floor(Math.random()*20);		
		}
		$('#'+x+'_'+y).css({background:'green'});
		return {x:x,y:y};
	}	
	var food = dropFood();
	var fangxiang = 39;
	var move = function () {
		var oldTou = snake[snake.length-1];
		if(fangxiang == 39){
			var newTou = {x:oldTou.x,y:oldTou.y+1};
		}
		if(fangxiang == 40 ){
			var newTou = {x:oldTou.x+1,y:oldTou.y};
		}
		if(fangxiang == 37){
			var newTou = {x:oldTou.x,y:oldTou.y-1};
		}
		if(fangxiang == 38){
			var newTou = {x:oldTou.x-1,y:oldTou.y};
		}
		if(newTou.x<0||newTou.y<0||newTou.x>19||newTou.y>19||data[newTou.x+'_'+newTou.y]){
			alert('在玩一次');
			clearInterval(timerId);
			return;
		}
		if(newTou.x == food.x && newTou.y == food.y){
			food = dropFood();
		}else{
			var weiba = snake.shift();
			delete data[weiba.x+'_'+weiba.y];
			$('#'+weiba.x+'_'+weiba.y).css({background:'white'});
		}
		snake.push(newTou)
		data[newTou.x + '_' + newTou.y] = true;
		$('#'+newTou.x + '_' + newTou.y).css({background:'red'})
	}	
	var timerId = setInterval(move,500);

	$(document).keydown(function(e){
		if( Math.abs(e.keyCode - fangxiang) == 2 ){
			return;
		}
		if( !(e.keyCode>=37 && e.keyCode<=40 ) ){
			return;
		}
	    fangxiang = e.keyCode;
	})	
})