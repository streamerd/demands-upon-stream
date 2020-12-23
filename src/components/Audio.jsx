import React, { useContext, useEffect, useState } from "react";

import { AppContext, getPlaying, seekTrack } from "../State";

// A really naive fake play routine
const Audio = () => {
  const { state, dispatch } = useContext(AppContext);

  const [handle, setHandle] = useState(null);

  useEffect(() => {
    const playing = getPlaying(state);
    let h;
    if (playing && !playing.paused) {
      clearTimeout(h);
      h = setTimeout(() => {
        dispatch(seekTrack(Math.floor(playing.progress + 1000)));
      }, 1000);
      setHandle(h);
    }

    return () => {
      clearTimeout(h);
    };
  }, [state.playing]);

  return null;
};

export default Audio;
