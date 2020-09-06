import React, { Component } from "react";
import "./App.css";
import styled, { css } from "styled-components";
import queryString from "query-string";

const defaultStyle = {
  color: "black",
};

const textStyle = css`
  color: black;
`;

let fakeServerData = {
  user: {
    name: "Pete",
    playlists: [
      {
        name: "Canapes",
        songs: [
          { name: "Lost in Paris", duration: 1234 },
          { name: "Water Baby", duration: 3456 },
          { name: "Heartbreaker", duration: 6789 },
        ],
      },
      {
        name: "R&B",
        songs: [
          { name: "Do For Love", duration: 1234 },
          { name: "Best Friend", duration: 3456 },
          { name: "Just a Lil Bit", duration: 6789 },
        ],
      },
      {
        name: "Runnin'",
        songs: [
          { name: "No One Gets You", duration: 1234 },
          { name: "Free Myself", duration: 3456 },
          { name: "The Drive", duration: 6789 },
        ],
      },
      {
        name: "Dance",
        songs: [
          { name: "7 Days", duration: 1234 },
          { name: "Believe", duration: 3456 },
          { name: "The Bomb", duration: 6789 },
        ],
      },
    ],
  },
};

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

class App extends Component {
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
          <button
            onClick={() => (window.location = "http://localhost:8888/login")}
            style={{ padding: "20px", fontSize: "20px" }}>
            {" "}
            Sign in with Spotify{" "}
          </button>
        )}
      </Wrapper>
    );
  }
}

export default App;
