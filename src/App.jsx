import { useRef,useEffect,useState } from 'react'
import Header from './komponen/header';




function Musik (){
  const audioRef = useRef(null);
    const [hasInteracted, setHasInteracted] = useState(false);
  
    useEffect(() => {
      if (hasInteracted) {
        // Mulai pemutaran audio setelah pengguna berinteraksi dengan komponen
        audioRef.current.play().catch(error => {
          // Handle kesalahan jika pemutaran gagal
          console.error('Pemutaran audio gagal:', error);
        });
      }
    }, [hasInteracted]);
  
    const handleInteraction = () => {
      // Panggil fungsi ini saat pengguna berinteraksi dengan komponen
      setHasInteracted(true);
    };

    return (
        <div className='musik' onClick={handleInteraction}>
      <button>Play To Musik</button>
      <audio ref={audioRef} autoPlay={false}>
            <source src="/audio/musik.mp3" type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        </div>
      );
}


function Squere({value, onSquereClick}){
  


  return (
  <button className='squere' onClick={onSquereClick}>
    {value}
    </button>
  );
  
}
function Board({sIsNext,squeres,onPlay}) {


  function handleClick(i){

    if(squeres[i] || calculateWinner(squeres))
      return;
    


    const nextSqueres = squeres.slice();
   
    
    nextSqueres[i] = (sIsNext) ? 'S' : 'O' ;
    
    onPlay(nextSqueres);
  }

  const winner = calculateWinner(squeres);
  let status ='';
  if(winner === 'S'){
    status = (
      <div>
        <h1>Selamat kepada Pemenang!</h1>
        <img src="/gif/kucing.gif" alt="Pemenang"  style={{
          width: '200px', // Ubah ukuran lebar sesuai kebutuhan
          height: '150px', // Ubah ukuran tinggi sesuai kebutuhan
        }}/>
        <p>TIM S WIN</p>
      </div>
    );
  }
  else if(winner === 'O'){

    status = (
      <div>
        <h1>Selamat kepada Pemenang!</h1>
        <img src="/gif/kucing.gif" alt="Pemenang"  style={{
          width: '200px', // Ubah ukuran lebar sesuai kebutuhan
          height: '150px', // Ubah ukuran tinggi sesuai kebutuhan
        }} />
        <p>TIM O WIN </p>
      </div>
    );

  }
   else{
    status = 'Next Player :' + (sIsNext ? 'S' : 'O');
  }



  return (

    <>

    < Musik />
    
    < Header/>
    


    <div className='status'>
      {status}
    </div>
   
  
  <div className='board'>

  < Squere value={squeres[0]} onSquereClick={() => handleClick(0)}/>
  < Squere value={squeres[1]} onSquereClick={() => handleClick(1)}/>
  < Squere value={squeres[2]} onSquereClick={() => handleClick(2)}/>
  < Squere value={squeres[3]} onSquereClick={() => handleClick(3)}/>
  < Squere value={squeres[4]} onSquereClick={() => handleClick(4)}/>
  < Squere value={squeres[5]} onSquereClick={() => handleClick(5)}/>
  < Squere value={squeres[6]} onSquereClick={() => handleClick(6)}/>
  < Squere value={squeres[7]} onSquereClick={() => handleClick(7)}/>
  < Squere value={squeres[8]} onSquereClick={() => handleClick(8)}/>


  </div>
  </>
  ); 
  
}

export default function Game(){
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove,setCurrentMove] = useState(0);
  const sIsNext = currentMove % 2 === 0;
  const currentSqueres = history[currentMove];


  function jumpTo(nextMove) {
    setCurrentMove(nextMove);

  }

  function handlePlay(nextSqueres){
    const nextHistory = [...history.slice(0, currentMove + 1), nextSqueres];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);


  }

  const moves = history.map((squeres,move)=> {
    let description ='';
    if(move > 0 ){
      description = 'go to move #' + move;

    } else{
      description = 'Go to game Start';
    }

    return(
      <li key={move}>
        <button onClick={ () => jumpTo(move)}>
          {description}
        </button>
      </li>
    )
  });


  return (
    <div className='game'>
      <div className='game-board'>
        <Board sIsNext={sIsNext} squeres={currentSqueres} onPlay={handlePlay} />
      </div>
      <div className='game-info'>
        <ol>{moves}</ol>


      </div>
    </div>
  );
}


function calculateWinner(squeres) {
  const lines =[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
  ];

  for(let i = 0; i< lines.length; i++){
    const [a,b,c] = lines[i];

    if( squeres[a] && squeres[a] === squeres[b] && squeres[a] === squeres[c]){
      return squeres[a];

    }

  }

  return false;


}


