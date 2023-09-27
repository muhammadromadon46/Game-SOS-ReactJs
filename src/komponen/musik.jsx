export default function Musik () {
    return (
        <div>
          
          <audio autoPlay>
            <source src="/audio/musik.mp3" type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        </div>
      );
}