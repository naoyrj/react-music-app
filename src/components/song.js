import React from "react";

class Song extends React.Component {
  render() {
    return (
      <div className="song">
        <h2>{this.props.title}</h2>
        <p><strong>Artista:</strong> {this.props.artist}</p>
        <p><strong>Álbum:</strong> {this.props.album}</p>
        <p><strong>Duración:</strong> {this.props.duration}</p>
      </div>
    );
  }
}

export default Song;