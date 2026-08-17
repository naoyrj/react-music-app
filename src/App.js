import React from "react";
import Header from "./components/header";
import Song from "./components/song";
import "./App.css";

class App extends React.Component {
  componentDidMount() {
    console.log("La aplicación se ha cargado correctamente.");
  }

  render() {
    return (
      <div className="App">
        <Header />

        <main>
          <Song
            title="Blinding Lights"
            artist="The Weeknd"
            album="After Hours"
            duration="3:20"
          />

          <Song
            title="Adventure of a Lifetime"
            artist="Coldplay"
            album="A Head Full of Dreams"
            duration="4:23"
          />

          <Song
            title="Titanium"
            artist="David Guetta"
            album="Nothing but the Beat"
            duration="4:05"
          />
        </main>
      </div>
    );
  }
}

export default App;