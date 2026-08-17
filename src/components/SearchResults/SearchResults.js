import React from "react";
import Song from "../Song/Song";
import "./styles.css"

function SearchResults ({songs, onAdd}) {
    return (
        <section className="search-results">
            <h2>Resultados de Búsqueda</h2>

            <div className="search-Results_list">
                {songs.map ((song) => (
                    <Song
                    key={song.id}
                    title={song.title}
                    artist={song.artist}
                    album={song.album}
                    duration={song.duration}
                    showButton={true}
                    onAdd={()=> onAdd(song)}
                    />
                ))}
            </div>
        </section>
    );
}

export default SearchResults;