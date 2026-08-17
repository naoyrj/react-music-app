import React, { useEffect, useState } from "react";
import Header from "./components/Header/Header";
import SearchResults from "./components/SearchResults/SearchResults";
import Library from "./components/Library/Library";
import "./App.css";

function App() {
  const [searchResults] = useState([
    {
      id: 1,
      title: "Blinding Lights",
      artist: "The Weeknd",
      album: "After Hours",
      duration: "3:20"
    },
    {
      id: 2,
      title: "Adventure of a Lifetime",
      artist: "Coldplay",
      album: "A Head Full of Dreams",
      duration: "4:23"
    },
    {
      id: 3,
      title: "Titanium",
      artist: "David Guetta",
      album: "Nothing but the Beat",
      duration: "4:05"
    }
  ]);

  const [library, setLibrary] = useState([]);

  const addToLibrary = (song) => {
    const alreadyAdded = library.some(
      (librarySong) => librarySong.id === song.id
    );

    if (!alreadyAdded) {
      setLibrary([...library, song]);
    }
  };

  useEffect(() => {
    console.log("La biblioteca se ha actualizado.");
    console.log("Canciones en la biblioteca:", library);
  }, [library]);

  return (
    <div className="App">
      <Header title="🎵 Mi Biblioteca Musical" />

      <main>
        <SearchResults
          songs={searchResults}
          onAdd={addToLibrary}
        />

        <Library songs={library} />
      </main>
    </div>
  );
}

export default App;