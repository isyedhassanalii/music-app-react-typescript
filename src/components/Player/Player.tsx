import '../../App.scss';
type Props = {
  songs: any;
  postLikes: any;
};
const Player = ({ songs, postLikes }: Props) => {
  return (
    <>
      {songs.map((song: any) => (
        <div className="card" key={song.id}>
          <div className="current-song">
         
            <div className="box1 animated infinite rotate-full">
              <img src={song.cover_image_path} alt={song.name} />
            </div>
            <div className="like">
              <span className="song-name">{song.name}</span>
              <div className="controls">
                <button
                  className="next prev-next current-btn"
                  onClick={() => postLikes(song.id)}
                >
                  {' '}
                  <i className="fas fa-heart"></i> Like
                </button>
              </div>
            </div>

            <span className="song-autor">{song.description}</span>

            <div className="custom__audio">
              <audio controls style={{ display: 'block !impotant' }}>
                <source src="horse.ogg" type="audio/ogg" />
                <source src={song.music_file_path} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default Player;
