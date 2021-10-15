 const canvas = document.getElementById('canvas');
 const ctx = canvas.getContext('2d');
 const img = new Image();
 img.src = './media/flappy-bird-set.png';
 
//general settings
 let gamePlaying = false;
 const gravity = .5;
 const speed = 6.2;
 const size = [51, 36];//size de la bird 
 const jump = -10.5;
 const cTenth = (canvas.width / 10);

//Pipe settings
 const pipeWidth = 78;
 const pipeGap = 270;
 //Yon fonction pou genere ranplasman poto yo
 const pipeLoc = () => (Math.random() * ((canvas.height - (pipeGap + pipeWidth)) - pipeWidth)) + pipeWidth;
 
 let index =0,
    bestScore =0,
    currentScore =0,
    pipes = [],
    flight,//Le vol 
    flyHeight; //Hauteur de la Vol

//Fonction Setup 
const setup = () =>{
    currentScore =0;
    flight = jump;
    flyHeight = (canvas.height /2) - (size[1] /2);

    //Kreye tablo de 3 element poto
    pipes = Array(3).fill().map((a, i)=> [canvas.width + (i * (pipeGap + pipeWidth)),pipeLoc()]);
    console.log(pipes);
}    
//fonction pral fè tout animation yo
const render = () => {
    index++;
    
    //background
    ctx.drawImage(img,0,0,canvas.width,canvas.height, -((index * (speed/2))% canvas.width)+ canvas.width, 0 , canvas.width, canvas.height)
     
    ctx.drawImage(img,0,0,canvas.width,canvas.height, -((index * (speed/2))% canvas.width), 0 , canvas.width, canvas.height)
    
    //Si gamePlaying sou true sa vle si gen yon klik ki fèt
    if(gamePlaying){
        //Bird
        ctx.drawImage(img,432,Math.floor((index % 9) / 3)* size[1],...size,cTenth/* axe X */,flyHeight/* axe Y*/,...size);
        //Saut de bird
        flight += gravity;
        flyHeight = Math.min(flyHeight + flight, canvas.height -size[1]);
    }else{
        //Bird
        /* ni sLargeur et sHauteur yo 2 ah nan tableau ...size
        ex: size = [51, 36] */
        ctx.drawImage(img,432,Math.floor((index % 9) / 3)* size[1],...size,((canvas.width / 2) - size[0] / 2),flyHeight, ...size); 
        /* Map defini dHauteur du   canvas map tou centrel */
        flyHeight = (canvas.height / 2) - (size[1] / 2); 
        
        //Ekri sou canvas la 
        ctx.fillText(`Pi bon nòt : ${bestScore}`,88,245);
        ctx.fillText('Klike pou jwe',88,535);
        ctx.font = "bold 30px courier";
    }

    //Affichage des poto
    if(gamePlaying) {
        pipes.map(pipe => {
            pipe[0] -= speed;
            
            //poto anlè yo
            ctx.drawImage(img,432,588 - pipe[1], pipeWidth, pipe[1],pipe[0],0,pipeWidth,pipe[1]);

            //poto anba yo
             ctx.drawImage(img, 432 + pipeWidth, 108, pipeWidth, canvas.height - pipe[1] + pipeGap, pipe[0],pipe[1] + pipeGap, pipeWidth, canvas.height - pipe[1] + pipeGap);

             if(pipe[0] <= -pipeWidth) {
                 currentScore++;
                 bestScore = Math.max(bestScore, currentScore);

                 //remove pipe + create new one
                 pipes = [...pipes.slice(1),[pipes[pipes.length-1][0] + pipeGap + pipeWidth, pipeLoc()]];
                 console.log(pipe);   
             } 
             //if hit the pipe, END
             if([
                 pipe[0] <= cTenth + size[0],
                 pipe[0] + pipeWidth >= cTenth,
                 pipe[1] > flyHeight || pipe[1] + pipeGap < flyHeight + size[1] 
             ].every(elem => elem)){
                 gamePlaying =false;
                 setup();
             }
        })

        
    }
    //afiche score yo
    document.getElementById('bestScore').innerHTML = `Meyè nòt: ${bestScore}`;

    document.getElementById('currentScore').innerHTML = `Kounya: ${currentScore}`;


    //chak fwa fonction render appele methode ap fèl tounen anh boucle  
    window.requestAnimationFrame(render);  
}
 
setup();
img.onload = render;//Nan chargement image la pou render komanse lance
document.addEventListener('click', () => gamePlaying = true);

window.onclick = () => flight = jump;
