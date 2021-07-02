import axios from "axios";

export const apiKey = `${process.env.REACT_APP_APIKEY}`;

const root = `/ws/1.1/`;

export const endpoint = {
  chartTracksGet: `${root}chart.tracks.get`,
  trackSnippetGet: `${root}track.snippet.get`
};

export const fetchQuestions = () => {};
