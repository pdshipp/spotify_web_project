import React, { Component } from "react";
import "./App.css";
import LoginButton from "./components/loginbutton";
import styled, { css } from "styled-components";
import queryString from "query-string";

const defaultStyle = {
  color: "black",
};

const textStyle = css`
  color: black;
`;

class PlaylistCounter extends Component {
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
}

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

/* class App extends Component {
  state = { serverData: {}, filterString: "" };
  componentDidMount() {
    let parsed = queryString.parse(window.location.search);
    let accessToken = parsed.access_token;

    fetch("https://api.spotify.com/v1/me", {
      headers: { Authorization: "Bearer " + accessToken },
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
  }
  render() {
    let playlistsToRender = this.state.serverData.user
      ? this.state.serverData.user.playlists.filter((playlist) =>
          playlist.name
            .toLowerCase()
            .includes(this.state.filterString.toLowerCase())
        )
      : [];
    return (
      <Wrapper>
        <H1> Playlist Generator </H1>
        {this.state.serverData.user ? (
          <div>
            <h2 style={{ ...defaultStyle, "font-size": "40px" }}>
              Welcome, {this.state.serverData.user.name}.
            </h2>
            <PlaylistCounter playlists={playlistsToRender} />
            <HoursCounter playlists={playlistsToRender} />
            <Filter
              onTextChange={(text) => this.setState({ filterString: text })}
            />
            {playlistsToRender.map((playlist) => (
              <Playlist playlist={playlist} />
            ))}
          </div>
        ) : (
          <loginButton />
        )}
      </Wrapper>
    );
  }
} */
