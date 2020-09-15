import React /*{ Component }*/ from "react";
import "./App.css";
import LoginButton from "./components/loginbutton";
import styled, { css } from "styled-components";
// import queryString from "query-string";

const textStyle = css`
  color: black;
`;

/* class PlaylistCounter extends Component {
  render() {
    return (
      <div style={{ ...defaultStyle, width: "20%", display: "inline-block" }}>
        <h2>
          {" "}
          {this.props.playlists && this.props.playlists.length} Playlists{" "}
        </h2>
      </div>
    );
  }
}

class HoursCounter extends Component {
  render() {
    let allSongs = this.props.playlists.reduce((songs, eachPlaylist) => {
      return songs.concat(eachPlaylist.songs);
    }, []);
    let totalDuration = allSongs.reduce(
      (sum, eachSong) => sum + eachSong.duration,
      0
    );
    return (
      <div style={{ ...defaultStyle, width: "20%", display: "inline-block" }}>
        <h2> {Math.round(totalDuration / 60)} Hours </h2>
      </div>
    );
  }
}

class Filter extends Component {
  render() {
    return (
      <div style={defaultStyle}>
        <img />
        <input
          type="text"
          onKeyUp={(event) => this.props.onTextChange(event.target.value)}
        />
      </div>
    );
  }
}

class Playlist extends Component {
  render() {
    let playlist = this.props.playlist;
    return (
      <div style={{ ...defaultStyle, width: "20%", display: "inline-block" }}>
        <img />
        <h3>{playlist.name}</h3>
        <ul>
          {playlist.songs.map((song) => (
            <li>{song.name}</li>
          ))}
        </ul>
      </div>
    );
  }
} */

const Wrapper = styled.div`
  text-align: center;
`;

const H1 = styled.h1`
  ${textStyle};
  font-size: 60px;
  color: ${(props) => props.color};
`;

const App = () => {
  return (
    <Wrapper>
      <H1 className="page-title">Playlist Generator</H1>
      <p style={{ fontSize: 28 }}>Please Login with Spotify</p>
      <LoginButton />
    </Wrapper>
  );
};

export default App;
