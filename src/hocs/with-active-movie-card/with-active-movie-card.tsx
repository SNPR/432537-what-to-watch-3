import * as React from "react";
import {Movie} from "../../types";
import {Subtract} from "utility-types";

const PLAYBACK_DELAY_TIMEOUT = 1000;

type InjectingProps = {
  selectedMovieId: string | null;
  isPlaying: boolean;
  onMovieCardMouseOver: (id: string | number) => void;
  onMovieCardMouseOut: () => void;
};

type withActiveMovieCardState = {
  selectedMovieId: null | number;
  isPlaying: boolean;
};

type withActiveMovieCardProps = {
  movies: Movie[];
  onMovieCardClick: (id: string | number) => void;
};

const withActiveMovieCard = (Component) => {
  type P = React.ComponentProps<typeof Component>;
  type T = withActiveMovieCardProps & Subtract<P, InjectingProps>;

  class WithActiveMovieCard extends React.PureComponent<
    T,
    withActiveMovieCardState
  > {
    private playbackTimeout: NodeJS.Timeout;

    constructor(props) {
      super(props);

      this.playbackTimeout = null;

      this.state = {
        selectedMovieId: null,
        isPlaying: false
      };

      this.handleMovieCardMouseOver = this.handleMovieCardMouseOver.bind(this);
      this.handleMovieCardMouseOut = this.handleMovieCardMouseOut.bind(this);
      this.togglePlay = this.togglePlay.bind(this);
    }

    componentWillUnmount() {
      if (this.playbackTimeout) {
        clearTimeout(this.playbackTimeout);
      }
    }

    togglePlay(selectedMovieId) {
      this.playbackTimeout = setTimeout(() => {
        if (this.state.selectedMovieId === selectedMovieId) {
          this.setState(() => ({
            isPlaying: true
          }));
        }
      }, PLAYBACK_DELAY_TIMEOUT);
    }

    handleMovieCardMouseOver(selectedMovieId) {
      this.setState(
          () => ({
            selectedMovieId
          }),
          () => this.togglePlay(selectedMovieId)
      );
    }

    handleMovieCardMouseOut() {
      this.setState(() => ({
        selectedMovieId: null,
        isPlaying: false
      }));
    }

    render() {
      const {selectedMovieId, isPlaying} = this.state;

      return (
        <Component
          {...this.props}
          selectedMovieId={selectedMovieId}
          isPlaying={isPlaying}
          onMovieCardMouseOver={this.handleMovieCardMouseOver}
          onMovieCardMouseOut={this.handleMovieCardMouseOut}
        />
      );
    }
  }

  return WithActiveMovieCard;
};

export default withActiveMovieCard;
